import React, { useState, useEffect, useMemo } from 'react';
//redux
import { Col, Modal, ModalBody, Row, Label, Input, Button, ModalHeader } from 'reactstrap';
import TableContainer from '../../../../Components/Common/TableContainer';
// Import Scroll Bar - SimpleBar
import SimpleBar from 'simplebar-react';
//Import Flatepicker
import Flatpickr from 'react-flatpickr';
import { OrdersId, Project, Tasks, CreateBy, AssignedTo, DueDate, Status, Priority } from './TaskListCol';

import { allTask } from './data';
//Import images
import avatar1 from '../../../../assets/images/users/avatar-1.jpg';
import avatar2 from '../../../../assets/images/users/avatar-2.jpg';
import avatar3 from '../../../../assets/images/users/avatar-3.jpg';
import avatar5 from '../../../../assets/images/users/avatar-5.jpg';
import avatar6 from '../../../../assets/images/users/avatar-6.jpg';
import avatar7 from '../../../../assets/images/users/avatar-7.jpg';
import avatar8 from '../../../../assets/images/users/avatar-8.jpg';
import avatar10 from '../../../../assets/images/users/avatar-10.jpg';
const AllTasks = () => {
    const [taskList, setTaskList] = useState(allTask);

    //Create Modal
    const [modal_standard, setmodal_standard] = useState(false);
    function tog_standard() {
        setmodal_standard(!modal_standard);
    }

    useEffect(() => {}, []);
    const columns = useMemo(
        () => [
            {
                Header: '#',
                Cell: () => {
                    return <input type="checkbox" />;
                },
            },
            {
                Header: 'Order ID',
                accessor: 'taskId',
                filterable: false,
                Cell: (cellProps) => {
                    return <OrdersId {...cellProps} />;
                },
            },
            {
                Header: 'Project',
                accessor: 'project',
                filterable: false,
                Cell: (cellProps) => {
                    return <Project {...cellProps} />;
                },
            },
            {
                Header: 'Tasks',
                accessor: 'task',
                filterable: false,
                Cell: (cellProps) => {
                    return <Tasks {...cellProps} />;
                },
            },
            {
                Header: 'Created By',
                accessor: 'creater',
                filterable: false,
                Cell: (cellProps) => {
                    return <CreateBy {...cellProps} />;
                },
            },
            {
                Header: 'Assigned To',
                accessor: 'subItem',
                filterable: false,
                Cell: (cellProps) => {
                    return <AssignedTo {...cellProps} />;
                },
            },
            {
                Header: 'Due Date',
                accessor: 'dueDate',
                filterable: false,
                Cell: (cellProps) => {
                    return <DueDate {...cellProps} />;
                },
            },
            {
                Header: 'Status',
                accessor: 'status',
                filterable: false,
                Cell: (cellProps) => {
                    return <Status {...cellProps} />;
                },
            },
            {
                Header: 'Priority',
                accessor: 'priority',
                filterable: false,
                Cell: (cellProps) => {
                    return <Priority {...cellProps} />;
                },
            },
        ],
        []
    );

    return (
        <React.Fragment>
            <div className="row">
                <Col lg={12}>
                    <div className="card" id="tasksList">
                        <div className="card-header border-0">
                            <div className="d-flex align-items-center">
                                <h5 className="card-title mb-0 flex-grow-1">All Tasks</h5>
                                <div className="flex-shrink-0">
                                    <button className="btn btn-danger add-btn" onClick={() => tog_standard()}>
                                        <i className="ri-add-line align-bottom me-1"></i> Create Task
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="card-body border border-dashed border-end-0 border-start-0">
                            <form>
                                <div className="row g-3">
                                    <div className="col-xxl-4 col-sm-12">
                                        <div className="search-box">
                                            <input type="text" className="form-control search bg-light border-light" placeholder="Search for tasks or something..." />
                                            <i className="ri-search-line search-icon"></i>
                                        </div>
                                    </div>

                                    <div className="col-xxl-3 col-sm-4">
                                        <Flatpickr
                                            placeholder="Select date range"
                                            className="form-control bg-light border-light"
                                            options={{
                                                mode: 'range',
                                                dateFormat: 'd M, Y',
                                            }}
                                        />
                                    </div>

                                    <div className="col-xxl-3 col-sm-4">
                                        <div className="input-light">
                                            <select className="form-control" data-choices data-choices-search-false name="choices-single-default" id="idStatus">
                                                <option value="">Status</option>
                                                <option defaultValue="all">All</option>
                                                <option value="New">New</option>
                                                <option value="Pending">Pending</option>
                                                <option value="Inprogress">Inprogress</option>
                                                <option value="Completed">Completed</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-xxl-2 col-sm-4">
                                        <button type="button" className="btn btn-primary w-100">
                                            {' '}
                                            <i className="ri-equalizer-fill me-1 align-bottom"></i>
                                            Filters
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="card-body">
                            <TableContainer
                                columns={columns}
                                data={taskList}
                                isGlobalFilter={false}
                                isAddUserList={false}
                                customPageSize={8}
                                className="custom-header-css"
                                divclassName="table-responsive table-card mb-4"
                                tableclassName="align-middle table-nowrap mb-0"
                                theadclassName="table-light table-nowrap"
                                thclassName="table-light text-muted"
                            />
                        </div>
                    </div>
                </Col>
            </div>

            <div className="modal fade zoomIn" id="showModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <Modal
                    isOpen={modal_standard}
                    toggle={() => {
                        tog_standard();
                    }}
                    centered
                    size="lg"
                    className="border-0"
                >
                    <ModalHeader className="p-3 bg-soft-info">
                        Create Task
                        <Button
                            onClick={() => {
                                setmodal_standard(false);
                            }}
                            className="btn-close"
                        ></Button>
                    </ModalHeader>
                    <form>
                        <ModalBody className="modal-body">
                            <Row className="g-3">
                                <Col lg={12}>
                                    <Label for="projectName-field" className="form-label">
                                        Project Name
                                    </Label>
                                    <Input type="text" id="projectName-field" className="form-control" placeholder="Project name" required />
                                </Col>
                                <Col lg={12}>
                                    <div>
                                        <Label for="tasksTitle-field" className="form-label">
                                            Title
                                        </Label>
                                        <Input type="text" id="tasksTitle-field" className="form-control" placeholder="Title" required />
                                    </div>
                                </Col>
                                <Col lg={12}>
                                    <Label for="createName-field" className="form-label">
                                        Client Name
                                    </Label>
                                    <Input type="text" id="createName-field" className="form-control" placeholder="Client name" required />
                                </Col>
                                <Col lg={12}>
                                    <Label className="form-label">Assigned To</Label>
                                    <SimpleBar style={{ maxHeight: '95px' }}>
                                        <ul className="list-unstyled vstack gap-2 mb-0">
                                            <li>
                                                <div className="form-check d-flex align-items-center">
                                                    <Input className="form-check-input me-3" type="checkbox" value="" id="anna-adame" />
                                                    <Label className="form-check-label d-flex align-items-center" for="anna-adame">
                                                        <span className="flex-shrink-0">
                                                            <img src={avatar1} alt="" className="avatar-xxs rounded-circle" />
                                                        </span>
                                                        <span className="flex-grow-1 ms-2">Anna Adame</span>
                                                    </Label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-check d-flex align-items-center">
                                                    <Input className="form-check-input me-3" type="checkbox" value="" id="frank-hook" />
                                                    <Label className="form-check-label d-flex align-items-center" for="frank-hook">
                                                        <span className="flex-shrink-0">
                                                            <img src={avatar3} alt="" className="avatar-xxs rounded-circle" />
                                                        </span>
                                                        <span className="flex-grow-1 ms-2"> Frank Hook</span>
                                                    </Label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-check d-flex align-items-center">
                                                    <Input className="form-check-input me-3" type="checkbox" value="" id="alexis-clarke" />
                                                    <Label className="form-check-label d-flex align-items-center" for="alexis-clarke">
                                                        <span className="flex-shrink-0">
                                                            <img src={avatar6} alt="" className="avatar-xxs rounded-circle" />
                                                        </span>
                                                        <span className="flex-grow-1 ms-2">Alexis Clarke</span>
                                                    </Label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-check d-flex align-items-center">
                                                    <Input className="form-check-input me-3" type="checkbox" value="" id="herbert-stokes" />
                                                    <Label className="form-check-label d-flex align-items-center" for="herbert-stokes">
                                                        <span className="flex-shrink-0">
                                                            <img src={avatar2} alt="" className="avatar-xxs rounded-circle" />
                                                        </span>
                                                        <span className="flex-grow-1 ms-2">Herbert Stokes</span>
                                                    </Label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-check d-flex align-items-center">
                                                    <Input className="form-check-input me-3" type="checkbox" value="" id="michael-morris" />
                                                    <Label className="form-check-label d-flex align-items-center" for="michael-morris">
                                                        <span className="flex-shrink-0">
                                                            <img src={avatar7} alt="" className="avatar-xxs rounded-circle" />
                                                        </span>
                                                        <span className="flex-grow-1 ms-2">Michael Morris</span>
                                                    </Label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-check d-flex align-items-center">
                                                    <Input className="form-check-input me-3" type="checkbox" value="" id="nancy-martino" />
                                                    <Label className="form-check-label d-flex align-items-center" for="nancy-martino">
                                                        <span className="flex-shrink-0">
                                                            <img src={avatar5} alt="" className="avatar-xxs rounded-circle" />
                                                        </span>
                                                        <span className="flex-grow-1 ms-2">Nancy Martino</span>
                                                    </Label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-check d-flex align-items-center">
                                                    <Input className="form-check-input me-3" type="checkbox" value="" id="thomas-taylor" />
                                                    <Label className="form-check-label d-flex align-items-center" for="thomas-taylor">
                                                        <span className="flex-shrink-0">
                                                            <img src={avatar8} alt="" className="avatar-xxs rounded-circle" />
                                                        </span>
                                                        <span className="flex-grow-1 ms-2">Thomas Taylor</span>
                                                    </Label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-check d-flex align-items-center">
                                                    <Input className="form-check-input me-3" type="checkbox" value="" id="tonya-noble" />
                                                    <Label className="form-check-label d-flex align-items-center" for="tonya-noble">
                                                        <span className="flex-shrink-0">
                                                            <img src={avatar10} alt="" className="avatar-xxs rounded-circle" />
                                                        </span>
                                                        <span className="flex-grow-1 ms-2">Tonya Noble</span>
                                                    </Label>
                                                </div>
                                            </li>
                                        </ul>
                                    </SimpleBar>
                                </Col>

                                <Col lg={6}>
                                    <Label for="duedate-field" className="form-label">
                                        Due Date
                                    </Label>
                                    <Flatpickr
                                        className="form-control"
                                        options={{
                                            dateFormat: 'd M, Y',
                                        }}
                                        placeholder="Select Date"
                                    />
                                </Col>
                                <Col lg={6}>
                                    <Label for="ticket-status" className="form-label">
                                        Status
                                    </Label>
                                    <select className="form-control" data-choices data-choices-search-false id="ticket-status">
                                        <option value="">Status</option>
                                        <option value="New">New</option>
                                        <option value="Inprogress">Inprogress</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </Col>
                                <Col lg={12}>
                                    <Label for="priority-field" className="form-label">
                                        Priority
                                    </Label>
                                    <select className="form-control" data-choices data-choices-search-false id="priority-field">
                                        <option value="">Priority</option>
                                        <option value="High">High</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Low">Low</option>
                                    </select>
                                </Col>
                            </Row>
                        </ModalBody>
                        <div className="modal-footer">
                            <div className="hstack gap-2 justify-content-end">
                                <Button
                                    type="button"
                                    onClick={() => {
                                        setmodal_standard(false);
                                    }}
                                    className="btn-light"
                                >
                                    Close
                                </Button>
                                <button type="submit" className="btn btn-success" id="add-btn">
                                    Add Task
                                </button>
                            </div>
                        </div>
                    </form>
                </Modal>
            </div>
        </React.Fragment>
    );
};

export default AllTasks;
