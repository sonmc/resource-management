import React, { useEffect, useCallback } from 'react';
import { CardBody, Col, Container, Table } from 'reactstrap';
import MetaTags from 'react-meta-tags';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FetchProject, Create } from '../../Services/project.service';
import CreateModal from './Create';
import AddMemberModal from './AddMember';
import ConfirmDeleteModal from './ConfirmDelete';
import Flatpickr from 'react-flatpickr';
import NoteControl from '../../Components/Common/Note';
import { Update, AddMember } from '../../Services/project.service';
import { useHistory } from 'react-router-dom';
import { debounce } from 'lodash';
import moment from 'moment';
import { useSetRecoilState } from 'recoil';
import { newWeekInMonthState } from '../../Recoil/states/common';
import { useRecoilState } from 'recoil';
import { roleAtom } from '../../Recoil/states/roles';
// Services
import { Get as getRoles } from '../../Services/role.service';
import { Get as getUsers } from '../../Services/user.service';
import { usersAtom } from '../../Recoil/states/users';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const currentDate = new Date();

const Projects = () => {
    const [_, setRoles] = useRecoilState(roleAtom);
    const [__, setUsers] = useRecoilState(usersAtom);
    const addNewWeekInMonth = useSetRecoilState(newWeekInMonthState);
    const [filter, setFilter] = useState({
        start_date: moment().add(-1, 'year').format('YYYY-MM-DD'),
        end_date: moment().format('YYYY-MM-DD'),
        project_name: '',
    });

    const currentYearMonth = currentDate.getFullYear() + ' ' + months[currentDate.getMonth()];
    const [currentWorkloadDate, setCurrentWorkloadDate] = useState(currentYearMonth);
    const [monthsWorkLoad, setMonthsWorkLoad] = useState([
        {
            month: '',
            year: '',
        },
    ]);
    const [workloadDates, setWorkloadDates] = useState([]);
    const [workloadWeek, setWorkloadWeek] = useState({
        0: [],
        1: [],
        2: [],
    });
    const [isFirstOfMonth, setIsFirstOfMonth] = useState(false);
    const [isLastOfMonth, setIsLastOfMonth] = useState(false);

    const [isShowFormUpdate, setShowFormUpdate] = useState(false);
    const [isShowFormAddMember, setShowFormAddMember] = useState(false);
    const [isShowConfirmModal, setShowFormConfirmModal] = useState(false);
    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState(0);
    let history = useHistory();

    const showFormAddMember = (project) => {
        setProject(project);
        setShowFormAddMember(!isShowFormAddMember);
    };

    const closeFormAddMember = () => {
        setShowFormAddMember(false);
    };

    const showFormCreate = () => {
        setShowFormUpdate(!isShowFormUpdate);
    };

    const closeFormUpdate = () => {
        setShowFormUpdate(false);
    };

    const showConfirmDeleteModal = () => {
        setShowFormConfirmModal(!isShowConfirmModal);
    };

    const closeConfirmDelete = () => {
        setShowFormConfirmModal(false);
    };

    const goProjectDetail = () => {
        history.push('/project-detail');
    };

    const save = (project) => {
        Create(project).then((res) => {
            setProjects([res, ...projects]);
            setShowFormUpdate(false);
        });
    };

    const addMember = (data) => {
        AddMember(data).then((res) => {
            const project = projects.find((x) => x.id === data.project_id);
            project.users = [...project.users, ...res];
            setProjects(projects.map((p) => (p.id === project.id ? project : p)));
            setShowFormAddMember(false);
        });
    };

    const remove = () => {
        setShowFormConfirmModal(false);
    };

    const onChangeNote = (note, projectId) => {
        const project = projects.filter((x) => x.id === projectId);
        project.note = note;
        Update(project);
    };

    const handleChangeFilter = (key, value) => {
        setFilter({ ...filter, [key]: value });
    };

    const triggerSearch = useCallback(
        debounce((params) => {
            FetchProject(params).then((res) => {
                setProjects(res);
            });
        }, 500),
        []
    );

    const onWorkloadDatePrev = () => {
        const month = currentWorkloadDate.split(' ')[1];
        const index = months.indexOf(month);
        if (months[index - 1]) {
            const cwd = currentDate.getFullYear() + ' ' + months[index - 1];
            setCurrentWorkloadDate(cwd);
            if (isLastOfMonth) setIsLastOfMonth(false);
            if (isFirstOfMonth) setIsFirstOfMonth(false);
            setMonthsWorkloadHeader(index - 1);
            calculatorWorkloadWeek(index - 1);
        } else {
            setIsFirstOfMonth(true);
        }
    };

    const onWorkloadDateNext = () => {
        const month = currentWorkloadDate.split(' ')[1];
        const index = months.indexOf(month) + 1;

        if (months[index]) {
            const cwd = currentDate.getFullYear() + ' ' + months[index];
            setCurrentWorkloadDate(cwd);
            if (isLastOfMonth) setIsLastOfMonth(false);
            if (isFirstOfMonth) setIsFirstOfMonth(false);
            setMonthsWorkloadHeader(index);
            calculatorWorkloadWeek(index);
        }
        if (index === 9) {
            setIsLastOfMonth(true);
        }
    };

    const setMonthsWorkloadHeader = (monthIndex) => {
        const monthWorkloads = [
            {
                month: months[monthIndex + 1] ? months[monthIndex] : months[monthIndex - 1],
                year: currentDate.getFullYear(),
            },
            {
                month: months[monthIndex + 1] ? months[monthIndex + 1] : months[monthIndex - 1],
                year: currentDate.getFullYear(),
            },
            {
                month: months[monthIndex + 2] ? months[monthIndex + 2] : months[monthIndex - 1],
                year: currentDate.getFullYear(),
            },
        ];
        setMonthsWorkLoad(monthWorkloads);
    };

    function getWeeksInMonth(year, month) {
        const weeks = [],
            firstDate = new Date(year, month, 1),
            lastDate = new Date(year, month + 1, 0),
            numDays = lastDate.getDate();

        let dayOfWeekCounter = firstDate.getDay();

        for (let date = 1; date <= numDays; date++) {
            if (dayOfWeekCounter === 0 || weeks.length === 0) {
                weeks.push([]);
            }
            weeks[weeks.length - 1].push(date);
            dayOfWeekCounter = (dayOfWeekCounter + 1) % 7;
        }

        return weeks
            .filter((w) => !!w.length)
            .map((w) => ({
                start: w[0] < 10 ? '0' + w[0] : w[0],
                end: w[w.length - 1] < 10 ? '0' + w[w.length - 1] : w[w.length - 1],
            }));
    }

    function getWeekListInMonth(month) {
        const weeks = getWeeksInMonth(currentDate.getFullYear(), month);
        const weeks2 = getWeeksInMonth(currentDate.getFullYear(), month + 1);
        const weeks3 = getWeeksInMonth(currentDate.getFullYear(), month + 2);

        return [weeks, weeks2, weeks3];
    }

    const calculatorWorkloadWeek = (month) => {
        const listWeeks = getWeekListInMonth(month);
        setWorkloadWeek({
            0: listWeeks[0],
            1: listWeeks[1],
            2: listWeeks[2],
        });
        addNewWeekInMonth(listWeeks[0].length + listWeeks[1].length + listWeeks[2].length);
    };

    const onChangeWorkloadMonth = (event) => {
        const value = event.target.value;
        setCurrentWorkloadDate(value);
    };

    function convertYearMonthToMonth(yearMonth) {
        let month = '';
        if (yearMonth) {
            month = yearMonth.split(' ')[1];
            month = months.indexOf(month) + 1;
        }
        return month;
    }

    useEffect(() => {
        const month = convertYearMonthToMonth(currentWorkloadDate);
        const listWeeks = getWeekListInMonth(month);
        const params = { ...filter, weekInCurrentMonth: listWeeks[0].length + listWeeks[1].length + listWeeks[2].length };
        triggerSearch(params);
    }, [filter, currentWorkloadDate]);

    useEffect(() => {
        const currentYearMonths = [];
        months.forEach((month) => {
            currentYearMonths.push(currentDate.getFullYear() + ' ' + month);
        });
        setWorkloadDates(currentYearMonths);
        const currentMonth = currentDate.getMonth();
        setMonthsWorkloadHeader(currentMonth);
        calculatorWorkloadWeek(currentMonth);
    }, []);
    useEffect(() => {
        getRoles().then((res) => {
            setRoles(res);
        });
        getUsers({
            searchTerm: '',
            roleId: 0,
            status: 1,
        }).then((res) => {
            setUsers(res);
        });
    }, [setRoles, setUsers]);
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Resource management | Projects</title>
                </MetaTags>
                <Container fluid>
                    <div className="row">
                        <Col lg={12}>
                            <div className="card" id="tasksList">
                                <div className="card-header border-0">
                                    <div className="d-flex align-items-center">
                                        <h5 className="card-title mb-0 flex-grow-1">Projects</h5>
                                        <div className="flex-shrink-0">
                                            <button className="btn btn-success" onClick={() => showFormCreate()}>
                                                <i className="ri-add-line align-bottom me-1"></i> Create New
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body pt-0 pb-0">
                                    <form>
                                        <div className="row ">
                                            <div className="col-xxl-2 col-sm-6">
                                                <Flatpickr
                                                    placeholder="Select start date"
                                                    className="form-control"
                                                    onChange={(data) => {
                                                        let start_date = moment(data[0]).format('YYYY-MM-DD');
                                                        let end_date = moment(data[1]).format('YYYY-MM-DD');
                                                        setFilter({ ...filter, start_date, end_date });
                                                    }}
                                                    options={{
                                                        mode: 'range',
                                                        dateFormat: 'Y-m-d',
                                                        defaultDate: [filter.start_date, filter.end_date],
                                                    }}
                                                />
                                            </div>
                                            <div className="col-xxl-2 col-sm-6">
                                                <div className="search-box">
                                                    <input
                                                        type="text"
                                                        onChange={(x) => handleChangeFilter('project_name', x.target.value)}
                                                        className="form-control search"
                                                        placeholder="Search by name"
                                                    />
                                                    <i className="ri-search-line search-icon"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <CardBody className="pt-0">
                                    <div className="table-responsive">
                                        <div className="d-flex flex-row-reverse">
                                            <button
                                                type="button"
                                                disabled={isLastOfMonth}
                                                title="Next month"
                                                onClick={() => onWorkloadDateNext()}
                                                aria-pressed="false"
                                                className="fc-next-button btn btn-secondary rounded-0"
                                            >
                                                <span className="fa fa-chevron-left"></span>
                                            </button>
                                            <select
                                                onChange={(value) => onChangeWorkloadMonth(value)}
                                                value={currentWorkloadDate}
                                                className="form-control mb-1 col-md-2 rounded-0 w-25 text-center"
                                            >
                                                {workloadDates.map((d, key) => {
                                                    return (
                                                        <option key={key} value={d}>
                                                            {d}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                            <button
                                                type="button"
                                                title="Previous month"
                                                disabled={isFirstOfMonth}
                                                onClick={() => onWorkloadDatePrev()}
                                                aria-pressed="false"
                                                className="btn btn-secondary fc-prev-button rounded-0"
                                            >
                                                <span className="fa fa-chevron-right"></span>
                                            </button>
                                        </div>
                                        <Table className="align-middle table-bordered">
                                            <thead>
                                                <tr>
                                                    <th rowSpan="2" style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                                        Project name
                                                    </th>
                                                    <th rowSpan="2" style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                                        Notes
                                                    </th>
                                                    <th rowSpan="2" style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                                        Members
                                                    </th>
                                                    <th rowSpan="2" style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                                        Role
                                                    </th>
                                                    {monthsWorkLoad.map((item, key) => {
                                                        return (
                                                            <th key={key} colSpan={workloadWeek[key].length} style={{ textAlign: 'center' }}>
                                                                {item.year + ' ' + item.month}
                                                            </th>
                                                        );
                                                    })}
                                                </tr>

                                                <tr>
                                                    {workloadWeek[0].map((w, key) => {
                                                        return (
                                                            <React.Fragment key={key}>
                                                                <th style={{ textAlign: 'center', fontWeight: 500, fontSize: '11px' }}>
                                                                    {w.start + '-' + w.end}
                                                                </th>
                                                            </React.Fragment>
                                                        );
                                                    })}
                                                    {workloadWeek[1].map((w, key) => {
                                                        return (
                                                            <React.Fragment key={key}>
                                                                <th style={{ textAlign: 'center', fontWeight: 500, fontSize: '11px' }}>
                                                                    {w.start + '-' + w.end}
                                                                </th>
                                                            </React.Fragment>
                                                        );
                                                    })}
                                                    {workloadWeek[2].map((w, key) => {
                                                        return (
                                                            <React.Fragment key={key}>
                                                                <th style={{ textAlign: 'center', fontWeight: 500, fontSize: '11px' }}>
                                                                    {w.start + '-' + w.end}
                                                                </th>
                                                            </React.Fragment>
                                                        );
                                                    })}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {projects.map((x, key) => (
                                                    <React.Fragment key={key}>
                                                        {key > 0 && (
                                                            <tr>
                                                                <td colSpan={currentWorkloadDate + 4}></td>
                                                            </tr>
                                                        )}
                                                        {x.users.length > 0 && (
                                                            <tr>
                                                                <th rowSpan={x.users.length} style={{ position: 'relative' }}>
                                                                    <Link
                                                                        to="#"
                                                                        onClick={() => showFormAddMember(x)}
                                                                        className="link-success fs-100"
                                                                        style={{
                                                                            position: 'absolute',
                                                                            top: '-14px',
                                                                            right: '-4px',
                                                                        }}
                                                                    >
                                                                        <i className="ri-add-box-fill" style={{ fontSize: '40px' }} />
                                                                    </Link>
                                                                    <Link
                                                                        to="#"
                                                                        onClick={() => goProjectDetail(x)}
                                                                        className="fs-100"
                                                                        style={{ fontSize: '15px' }}
                                                                    >
                                                                        {x.name}
                                                                    </Link>
                                                                </th>
                                                                <td rowSpan={x.users.length} style={{ position: 'relative' }}>
                                                                    <NoteControl value={x.note} onChangeNote={(value) => onChangeNote(value, x.id)} />
                                                                </td>
                                                                <td style={{ position: 'relative' }}>
                                                                    {x.users[0]?.username && (
                                                                        <Link
                                                                            to="#"
                                                                            className="link-danger fs-15"
                                                                            onClick={() => showConfirmDeleteModal()}
                                                                            style={{
                                                                                position: 'absolute',
                                                                                top: -6,
                                                                                right: -3,
                                                                            }}
                                                                        >
                                                                            <i
                                                                                className="ri-indeterminate-circle-line"
                                                                                style={{ fontSize: '20px' }}
                                                                            />
                                                                        </Link>
                                                                    )}
                                                                    {x.users[0]?.username}
                                                                </td>
                                                                <td style={{ textAlign: 'center' }}>
                                                                    {(x.users[0]?.roles &&
                                                                        x.users[0].roles.length > 0 &&
                                                                        x.users[0].roles
                                                                            .map((r) => {
                                                                                return r.name;
                                                                            })
                                                                            .join(', ')) ||
                                                                        ''}
                                                                </td>
                                                                {x.users[0].workloads.map((z, key3) => {
                                                                    return (
                                                                        <td style={{ textAlign: 'center' }} key={key3}>
                                                                            {z.value} {z.value && <span>%</span>}
                                                                        </td>
                                                                    );
                                                                })}
                                                            </tr>
                                                        )}
                                                        {x.users.map((y, key2) => {
                                                            return (
                                                                key2 > 0 && (
                                                                    <tr key={key2}>
                                                                        <td style={{ position: 'relative' }}>
                                                                            <Link
                                                                                to="#"
                                                                                className="link-danger fs-15"
                                                                                onClick={() => showConfirmDeleteModal()}
                                                                                style={{
                                                                                    position: 'absolute',
                                                                                    top: -6,
                                                                                    right: -3,
                                                                                }}
                                                                            >
                                                                                <i
                                                                                    className="ri-indeterminate-circle-line"
                                                                                    style={{ fontSize: '20px' }}
                                                                                />
                                                                            </Link>
                                                                            {y.username}
                                                                        </td>
                                                                        <td style={{ textAlign: 'center' }}>
                                                                            {y.roles
                                                                                .map((role) => {
                                                                                    return role.name;
                                                                                })
                                                                                .join(', ')}
                                                                        </td>
                                                                        {y.workloads.map((z, key3) => {
                                                                            return (
                                                                                <td style={{ textAlign: 'center' }} key={key3}>
                                                                                    {z.value} {z.value && <span>%</span>}
                                                                                </td>
                                                                            );
                                                                        })}
                                                                    </tr>
                                                                )
                                                            );
                                                        })}
                                                    </React.Fragment>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                </CardBody>
                            </div>
                        </Col>
                    </div>
                    <CreateModal save={save} isShowFormUpdate={isShowFormUpdate} closeFormUpdate={closeFormUpdate} />
                    <AddMemberModal
                        addMember={addMember}
                        isShowFormAddMember={isShowFormAddMember}
                        closeFormAddMember={closeFormAddMember}
                        project={project}
                    />
                    <ConfirmDeleteModal confirmed={remove} isShowConfirmModal={isShowConfirmModal} closeConfirmDelete={closeConfirmDelete} />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Projects;
