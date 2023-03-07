import React, { useEffect } from 'react';
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

const weeks = ['w1', 'w2', 'w3', 'w4', 'w1', 'w2', 'w3', 'w4', 'w1', 'w2', 'w3', 'w4'];

const Projects = () => {
    const [paging, setPaging] = useState({
        cursor: 1,
        limit: 10,
    });
    const [filter, setFilter] = useState({
        start_date: new Date(),
        project_name: '',
    });

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
            setProjects([...projects, res]);
            setShowFormUpdate(false);
        });
    };

    const addMember = (project_id, user_id, workload, start_Date) => {
        AddMember({
            project_id,
            user_id,
            workload,
            start_Date,
        }).then((res) => {
            const project = projects.find((x) => x.id == project_id);
            project.users.push(res);
            setProjects(projects.map((p) => (p.id == project.id ? project : p)));
            setShowFormAddMember(false);
        });
    };

    const remove = () => {
        setShowFormConfirmModal(false);
    };

    const fetchProject = (filter) => {
        FetchProject({ filter, paging }).then((res) => {
            setProjects(res);
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

    useEffect(() => {
        fetchProject(filter);
    }, [filter]);
    console.log(filter);
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
                                            <button className="btn btn-success add-btn" onClick={() => showFormCreate()}>
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
                                                    onChange={([date]) => {
                                                        handleChangeFilter('start_date', date);
                                                    }}
                                                    options={{
                                                        mode: 'range',
                                                        dateFormat: 'd M, Y',
                                                    }}
                                                />
                                            </div>
                                            <div className="col-xxl-2 col-sm-6">
                                                <div className="search-box">
                                                    <input type="text" onChange={(x) => handleChangeFilter('project_name', x.target.value)} className="form-control search" placeholder="Search by name" />
                                                    <i className="ri-search-line search-icon"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <CardBody>
                                    <div className="table-responsive mt-3">
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
                                                    <th colSpan="4" style={{ textAlign: 'center' }}>
                                                        Month 1
                                                    </th>
                                                    <th colSpan="4" style={{ textAlign: 'center' }}>
                                                        Month 2
                                                    </th>
                                                    <th colSpan="4" style={{ textAlign: 'center' }}>
                                                        Month 3
                                                    </th>
                                                </tr>

                                                <tr>
                                                    {weeks.map((w, key) => {
                                                        return (
                                                            <React.Fragment key={key}>
                                                                <th style={{ textAlign: 'center' }}>{w}</th>
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
                                                                <td colSpan={16}></td>
                                                            </tr>
                                                        )}
                                                        <tr>
                                                            <th rowSpan={x.users.length} style={{ position: 'relative' }}>
                                                                <Link
                                                                    to="#"
                                                                    onClick={() => showFormAddMember(x)}
                                                                    className="link-success fs-100"
                                                                    style={{
                                                                        position: 'absolute',
                                                                        top: '-10px',
                                                                        right: '0px',
                                                                    }}
                                                                >
                                                                    <i className="ri-add-box-fill" style={{ fontSize: '40px' }} />
                                                                </Link>
                                                                <Link to="#" onClick={() => goProjectDetail(x)} className="fs-100" style={{ fontSize: '15px' }}>
                                                                    {x.name}
                                                                </Link>
                                                            </th>
                                                            <td rowSpan={x.users.length} style={{ position: 'relative' }}>
                                                                <NoteControl value={x.note} onChangeNote={(value) => onChangeNote(value, x.id)} />
                                                            </td>
                                                            <td style={{ position: 'relative' }}>
                                                                {x.users[0].username && (
                                                                    <Link
                                                                        to="#"
                                                                        className="link-danger fs-15"
                                                                        onClick={() => showConfirmDeleteModal()}
                                                                        style={{
                                                                            position: 'absolute',
                                                                            top: 0,
                                                                            right: 0,
                                                                        }}
                                                                    >
                                                                        <i className="ri-indeterminate-circle-line" style={{ fontSize: '20px' }} />
                                                                    </Link>
                                                                )}
                                                                {x.users[0].username}
                                                            </td>
                                                            <td style={{ textAlign: 'center' }}>{x.users[0].role?.name}</td>
                                                            {x.users[0].workloads.map((z, key3) => {
                                                                return (
                                                                    <td style={{ textAlign: 'center' }} key={key3}>
                                                                        {z.value} {z.value && <span>%</span>}
                                                                    </td>
                                                                );
                                                            })}
                                                        </tr>
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
                                                                                    top: 0,
                                                                                    right: 0,
                                                                                }}
                                                                            >
                                                                                <i className="ri-indeterminate-circle-line" style={{ fontSize: '20px' }} />
                                                                            </Link>
                                                                            {y.username}
                                                                        </td>
                                                                        <td style={{ textAlign: 'center' }}>{y.role?.name}</td>
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
                    <AddMemberModal addMember={addMember} isShowFormAddMember={isShowFormAddMember} closeFormAddMember={closeFormAddMember} project={project} />
                    <ConfirmDeleteModal confirmed={remove} isShowConfirmModal={isShowConfirmModal} closeConfirmDelete={closeConfirmDelete} />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Projects;
