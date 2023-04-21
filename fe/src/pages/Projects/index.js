import React, { useEffect, useCallback } from 'react';
import { CardBody, Container, Table } from 'reactstrap';
import MetaTags from 'react-meta-tags';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FetchProject, Create } from 'src/Services/project.service';
import CreateModal from './Create';
import AddMemberModal from './AddMember';
import ConfirmDeleteModal from './ConfirmDelete';
import Flatpickr from 'react-flatpickr';
import NoteControl from '../../Components/Common/Note';

import { useHistory } from 'react-router-dom';
import { debounce } from 'lodash';
import moment from 'moment';
import { newWeekInMonthState } from 'src/Recoil/states/common';
import { Update, AddMember, RemoveMember } from 'src/Services/project.service';
import { Get as GetEmployee } from 'src/Services/user.service';
import { Get as GetRole } from 'src/Services/role.service';
// Recoid
import { useSetRecoilState } from 'recoil';
import { rolesState } from 'src/Recoil/states/roles';
import { calculatorWorkloadStatus } from '../../helpers/common';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const currentDate = new Date();

const ProjectPage = () => {
    let history = useHistory();
    const setRolesStore = useSetRecoilState(rolesState);

    const setNewWeekInMonth = useSetRecoilState(newWeekInMonthState);

    const [employees, setEmployees] = useState([]);

    const [filter, setFilter] = useState({
        start_date: moment().add(-1, 'year').format('YYYY-MM-DD'),
        end_date: moment().format('YYYY-MM-DD'),
        wl_start_date: '',
        wl_end_date: '',
        project_name: '',
        weekInCurrentMonth: 0,
    });

    const [memberRemove, setMemberRemove] = useState({});
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

    const showConfirmDeleteModal = (project_id, user_id) => {
        setMemberRemove({ project_id, user_id });
        setShowFormConfirmModal(!isShowConfirmModal);
    };

    const closeConfirmDelete = () => {
        setShowFormConfirmModal(false);
    };

    const goProjectDetail = (x) => {
        history.push('/projects/' + x.id);
    };

    const save = (project) => {
        Create(project).then((res) => {
            fetchProject();
            setShowFormUpdate(false);
        });
    };

    const addMember = (data) => {
        AddMember(data).then((res) => {
            // const project = projects.find((x) => x.id === data.project_id);
            // const users = project.users.length === 1 && !project.users[0].id ? [] : project.users;
            // project.users = users.length > 0 ? [...users, ...res] : res;
            // setProjects(projects.map((p) => (p.id === project.id ? project : p)));
            fetchProject();
            setShowFormAddMember(false);
        });
    };

    const remove = () => {
        RemoveMember(memberRemove).then((res) => {
            if (res) {
                const newProjects = projects.map((project) => {
                    if (project.id === memberRemove.project_id) {
                        const users = project.users.filter((x) => x.id !== memberRemove.user_id);
                        if (users.length > 0) {
                            project.users = users;
                        } else {
                            const userDefault = {
                                full_name: '',
                                roles: [{ id: 0, name: '' }],
                                workloads: [],
                            };
                            const totalWeekNumber = workloadWeek[0].length + workloadWeek[1].length + workloadWeek[2].length;
                            let workloadsDefault = [];
                            for (let index = 0; index < totalWeekNumber; index++) {
                                workloadsDefault.push({ value: '', id: 0 });
                            }
                            userDefault.workloads = workloadsDefault;
                            project.users = [userDefault];
                        }

                        return project;
                    }
                    return project;
                });
                setProjects(newProjects);
                setShowFormConfirmModal(false);
            }
        });
    };

    const onChangeNote = (note, projectId) => {
        const project = projects.filter((x) => x.id === projectId);
        project.note = note;
        Update(project);
    };

    const handleChangeFilter = (key, value) => {
        setFilter({ ...filter, [key]: value });
    };

    function getFirstDayOfMonth(year, month) {
        return new Date(year, month, 1);
    }

    function getLastDayOfMonth(year, month) {
        return new Date(year, month + 1, 0);
    }

    const triggerSearch = useCallback(
        debounce((params) => {
            const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
            const lastDayCurrentMonth = getLastDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
            params.wl_start_date = firstDay;
            params.wl_end_date = lastDayCurrentMonth;
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
        let weeks = [];
        const firstDate = new Date(year, month, 1);
        const lastDate = new Date(year, month + 1, 0);
        const numDays = lastDate.getDate();

        let dayOfWeekCounter = firstDate.getDay();

        for (let date = 1; date <= numDays; date++) {
            if (dayOfWeekCounter === 0 || weeks.length === 0) {
                weeks.push([]);
            }
            weeks[weeks.length - 1].push(date);
            dayOfWeekCounter = (dayOfWeekCounter + 1) % 7;
        }

        const newWeek = [];

        weeks = weeks.filter((w) => !!w.length);
        weeks.forEach((w) => {
            const isWeekIsOneDay = checkWeekIsOneDay(w[0], w[w.length - 1]);
            if (!isWeekIsOneDay) {
                const data = {
                    start: w[0] < 10 ? '0' + w[0] : w[0],
                    end: w[w.length - 1] < 10 ? '0' + w[w.length - 1] : w[w.length - 1],
                };
                newWeek.push(data);
            }
        });
        return newWeek;
    }

    function checkWeekIsOneDay(start, end) {
        if (end - start == 0) {
            return true;
        } else {
            return false;
        }
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
        setNewWeekInMonth(listWeeks[0].length + listWeeks[1].length + listWeeks[2].length);
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

    const fetchRoles = () => {
        GetRole({}).then((res) => {
            setRolesStore(res);
        });
    };

    const fetchEmployees = () => {
        const params = {
            searchTerm: '',
            roleId: 0,
            status: 0,
        };
        GetEmployee(params).then((res) => {
            setEmployees(res);
        });
    };

    function fetchProject() {
        const month = convertYearMonthToMonth(currentWorkloadDate);
        const listWeeks = getWeekListInMonth(month);
        const params = { ...filter, weekInCurrentMonth: listWeeks[0].length + listWeeks[1].length + listWeeks[2].length };
        triggerSearch(params);
    }

    useEffect(() => {
        fetchProject();
    }, [filter, currentWorkloadDate]);

    useEffect(() => {
        const currentYearMonths = [];
        months.forEach((month) => {
            currentYearMonths.push(currentDate.getFullYear() + ' ' + month);
        });
        setWorkloadDates(currentYearMonths);
        const currentMonth = currentDate.getMonth();
        calculatorWorkloadWeek(currentMonth);
        setMonthsWorkloadHeader(currentMonth);
        fetchRoles();
        fetchEmployees();
    }, []);

    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Zen8labs - Tools | Projects</title>
                </MetaTags>
                <Container fluid>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card" id="tasksList">
                                <div className="card-header border-0">
                                    <div className="d-flex align-items-center">
                                        <h5 className="card-title mb-0 flex-grow-1">Projects Management</h5>
                                        <div className="flex-shrink-0">
                                            <button className="btn btn-success" onClick={() => showFormCreate()}>
                                                <i className="ri-add-line align-bottom me-1"></i> Create New
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body pt-0">
                                    <div className="row">
                                        <div className="col-sm-3">
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
                                        <div className="col-sm-3">
                                            <div className="search-box">
                                                <input type="text" onChange={(x) => handleChangeFilter('project_name', x.target.value)} className="form-control search" placeholder="Search by name" />
                                                <i className="ri-search-line search-icon"></i>
                                            </div>
                                        </div>
                                        <div className="offset-md-3 col-sm-3">
                                            <div className="d-flex flex-row-reverse">
                                                <button type="button" disabled={isLastOfMonth} title="Next month" onClick={() => onWorkloadDateNext()} aria-pressed="false" className="fc-next-button btn btn-secondary rounded-0">
                                                    <span className="fa fa-chevron-left"></span>
                                                </button>
                                                <select onChange={(value) => onChangeWorkloadMonth(value)} value={currentWorkloadDate} className="form-control mb-1 rounded-0 text-center">
                                                    {workloadDates.map((d, key) => {
                                                        return (
                                                            <option key={key} value={d}>
                                                                {d}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                                <button type="button" title="Previous month" disabled={isFirstOfMonth} onClick={() => onWorkloadDatePrev()} aria-pressed="false" className="btn btn-secondary fc-prev-button rounded-0">
                                                    <span className="fa fa-chevron-right"></span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <CardBody className="pt-0">
                                    <div className="table-responsive" style={{ maxHeight: '700px', overflow: 'scroll' }}>
                                        <Table className="table align-middle table-bordered">
                                            <thead>
                                                <tr>
                                                    <th rowSpan="2" style={{ width: '10%', verticalAlign: 'middle', textAlign: 'center' }}>
                                                        Project's Name
                                                    </th>
                                                    <th rowSpan="2" style={{ width: '10%', verticalAlign: 'middle', textAlign: 'center' }}>
                                                        Notes
                                                    </th>
                                                    <th rowSpan="2" style={{ width: '10%', verticalAlign: 'middle', textAlign: 'center' }}>
                                                        Members
                                                    </th>
                                                    <th rowSpan="2" style={{ width: '10%', verticalAlign: 'middle', textAlign: 'center' }}>
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
                                                                <td
                                                                    style={{
                                                                        textAlign: 'center',
                                                                        fontWeight: 500,
                                                                        fontSize: '11px',
                                                                        padding: '10px 2px 10px 2px',
                                                                    }}
                                                                >
                                                                    {w.start + '-' + w.end}
                                                                </td>
                                                            </React.Fragment>
                                                        );
                                                    })}
                                                    {workloadWeek[1].map((w, key) => {
                                                        return (
                                                            <React.Fragment key={key}>
                                                                <td
                                                                    style={{
                                                                        textAlign: 'center',
                                                                        fontWeight: 500,
                                                                        fontSize: '11px',
                                                                        padding: '10px 2px 10px 2px',
                                                                    }}
                                                                >
                                                                    {w.start + '-' + w.end}
                                                                </td>
                                                            </React.Fragment>
                                                        );
                                                    })}
                                                    {workloadWeek[2].map((w, key) => {
                                                        return (
                                                            <React.Fragment key={key}>
                                                                <td
                                                                    style={{
                                                                        textAlign: 'center',
                                                                        fontWeight: 500,
                                                                        fontSize: '11px',
                                                                        padding: '10px 2px 10px 2px',
                                                                    }}
                                                                >
                                                                    {w.start + '-' + w.end}
                                                                </td>
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
                                                                <td colSpan={workloadWeek[0].length + workloadWeek[1].length + workloadWeek[2].length + 4}></td>
                                                            </tr>
                                                        )}
                                                        {x.users.length > 0 && (
                                                            <tr>
                                                                <td rowSpan={x.users.length} style={{ position: 'relative', width: '10%', padding: '5px 35px 5px 5px' }}>
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
                                                                        <i className="ri-add-box-fill" style={{ fontSize: '35px' }} />
                                                                    </Link>
                                                                    <Link to="#" onClick={() => goProjectDetail(x)} className="fs-100" style={{ fontSize: '15px' }}>
                                                                        {x.name}
                                                                    </Link>
                                                                </td>
                                                                <td rowSpan={x.users.length} style={{ position: 'relative', width: '10%', padding: '5px 5px 5px 5px' }}>
                                                                    <NoteControl value={x.note} onChangeNote={(value) => onChangeNote(value, x.id)} />
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        position: 'relative',
                                                                        width: '10%',
                                                                        padding: '5px 20px 5px 5px',
                                                                        backgroundColor: x.project_leader === x.users[0].id ? '#c8ffc4' : '',
                                                                    }}
                                                                >
                                                                    {x.users[0]?.full_name && (
                                                                        <Link
                                                                            to="#"
                                                                            className="link-danger fs-15"
                                                                            onClick={() => showConfirmDeleteModal(x.id, x.users[0].id)}
                                                                            style={{
                                                                                position: 'absolute',
                                                                                top: -5,
                                                                                right: 0,
                                                                            }}
                                                                        >
                                                                            <i className="ri-indeterminate-circle-line" style={{ fontSize: '20px' }} />
                                                                        </Link>
                                                                    )}
                                                                    {x.users[0]?.full_name}
                                                                </td>
                                                                <td style={{ textAlign: 'center', width: '10%', padding: '5px 5px 5px 5px' }}>
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
                                                                    const colorStatus = calculatorWorkloadStatus(z.value);
                                                                    return (
                                                                        <td className="row-workload-first" style={{ textAlign: 'center', padding: 0, backgroundColor: colorStatus }} key={key3}>
                                                                            {z.value} {z.value && <span>%</span>}
                                                                        </td>
                                                                    );
                                                                })}
                                                            </tr>
                                                        )}
                                                        {x.users.map((y, key2) => {
                                                            return (
                                                                key2 > 0 && (
                                                                    <tr key={key2} className="row-user-data">
                                                                        <td style={{ position: 'relative', padding: '5px 20px 5px 5px' }}>
                                                                            <Link
                                                                                to="#"
                                                                                className="link-danger fs-15"
                                                                                onClick={() => showConfirmDeleteModal(x.id, y.id)}
                                                                                style={{
                                                                                    position: 'absolute',
                                                                                    top: -5,
                                                                                    right: 0,
                                                                                }}
                                                                            >
                                                                                <i className="ri-indeterminate-circle-line" style={{ fontSize: '20px' }} />
                                                                            </Link>
                                                                            {y.full_name}
                                                                        </td>
                                                                        <td style={{ textAlign: 'center', padding: '5px 5px 5px 5px' }}>
                                                                            {y.roles
                                                                                .map((role) => {
                                                                                    return role.name;
                                                                                })
                                                                                .join(', ')}
                                                                        </td>
                                                                        {y.workloads.map((z, key3) => {
                                                                            const colorStatus = calculatorWorkloadStatus(z.value);
                                                                            return (
                                                                                <td
                                                                                    style={{
                                                                                        textAlign: 'center',
                                                                                        padding: 0,
                                                                                        backgroundColor: colorStatus,
                                                                                    }}
                                                                                    key={key3}
                                                                                >
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
                                                {/* <tr>
                                                    <td colSpan={workloadWeek[0].length + workloadWeek[1].length + workloadWeek[2].length + 4}></td>
                                                </tr>
                                                <tr>
                                                    <th colSpan={4} className="font-weight-bold border border-secondary">
                                                        Total efforts
                                                    </th>
                                                    {workloadWeek[0].map((item, i) => {
                                                        return <td className="border border-secondary" key={i}></td>;
                                                    })}
                                                    {workloadWeek[1].map((item, i) => {
                                                        return <td className="border border-secondary" key={i}></td>;
                                                    })}
                                                    {workloadWeek[2].map((item, i) => {
                                                        return <td className="border border-secondary" key={i}></td>;
                                                    })}
                                                </tr> */}
                                            </tbody>
                                        </Table>
                                    </div>
                                </CardBody>
                            </div>
                        </div>
                    </div>
                    <CreateModal save={save} isShowFormUpdate={isShowFormUpdate} closeFormUpdate={closeFormUpdate} employees={employees} />
                    <AddMemberModal addMember={addMember} isShowFormAddMember={isShowFormAddMember} closeFormAddMember={closeFormAddMember} project={project} users={employees} />
                    <ConfirmDeleteModal confirmed={remove} isShowConfirmModal={isShowConfirmModal} closeConfirmDelete={closeConfirmDelete} />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ProjectPage;
