import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, DropdownItem, DropdownMenu, DropdownToggle, Modal, UncontrolledDropdown } from 'reactstrap';
import SimpleBar from 'simplebar-react';
import { map } from 'lodash';
import moment from 'moment';

const CardTaskBox = (props) => {
    const [modal_delete, setmodal_delete] = useState(false);
    function tog_delete() {
        setmodal_delete(!modal_delete);
    }
    const { data, removeCard } = props;
    const deleteCard = () => {
        setmodal_delete(false);
        removeCard();
    };

    return (
        <React.Fragment>
            <div className="tasks-board mb-3" id="kanbanboard">
                <div className="tasks-list">
                    <SimpleBar className="tasks-wrapper px-3 mx-n3">
                        <div id="unassigned-task" className="tasks">
                            <Card className="tasks-box">
                                <CardBody>
                                    <div className="d-flex mb-2">
                                        <h6 className="fs-15 mb-0 flex-grow-1 text-truncate">{data.name}</h6>
                                        <UncontrolledDropdown direction="start">
                                            <DropdownToggle tag="a" id="dropdownMenuLink1" role="button">
                                                <i className="ri-more-fill" />
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem tag="a" href="/tasks-details">
                                                    <i className="ri-eye-fill align-bottom me-2 text-muted" />
                                                    View
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <i className="ri-edit-2-line align-bottom me-2 text-muted" />
                                                    Edit
                                                </DropdownItem>
                                                <DropdownItem
                                                    onClick={() => {
                                                        tog_delete();
                                                    }}
                                                    to="#deleteRecordModal"
                                                >
                                                    <i className="ri-delete-bin-5-line align-bottom me-2 text-muted" />
                                                    Delete
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </div>
                                    <p className="text-muted">{data.description}</p>
                                    <div className="d-flex align-items-center">
                                        <div className="flex-grow-1">
                                            {map(data.tags, (data, key) => (
                                                <span className="badge badge-soft-primary me-1" key={key}>
                                                    {data.tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex-shrink-0">
                                            <div className="avatar-group">
                                                {map(data.users, (data, key) => (
                                                    <div to="#" className="avatar-group-item" key={key}>
                                                        <img src={data.img} alt="" className="rounded-circle avatar-xxs" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                                {data.estimated_end ? (
                                    <div className="card-footer border-top-dashed">
                                        <div className="d-flex">
                                            <div className="flex-grow-1">
                                                <span className="text-muted">
                                                    <i className="ri-time-line align-bottom"></i>{' '}
                                                    {moment(data.estimated_end * 1000).format('DD/MM/YYYY')}
                                                </span>
                                            </div>
                                            <div className="flex-shrink-0">
                                                {/* <ul className="link-inline mb-0">
                                                <li className="list-inline-item">
                                                    <Link to="#" className="text-muted">
                                                        <i className="ri-eye-line align-bottom" /> {data.view}
                                                    </Link>
                                                </li>
                                                <li className="list-inline-item">
                                                    <Link to="#" className="text-muted">
                                                        <i className="ri-question-answer-line align-bottom" /> {data.message}
                                                    </Link>
                                                </li>
                                                <li className="list-inline-item">
                                                    <Link to="#" className="text-muted">
                                                        <i className="ri-attachment-2 align-bottom" /> {data.file}
                                                    </Link>
                                                </li>
                                            </ul> */}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    ''
                                )}
                            </Card>
                        </div>
                    </SimpleBar>
                </div>
            </div>

            {/* Delete Record Modal */}
            <Modal
                isOpen={modal_delete}
                toggle={() => {
                    tog_delete();
                }}
                centered
                modalClassName="zoomIn"
                id="deleteRecordModal"
            >
                <div className="modal-header">
                    <Button
                        type="button"
                        onClick={() => {
                            setmodal_delete(false);
                        }}
                        className="btn-close"
                        aria-label="Close"
                    ></Button>
                </div>
                <div className="modal-body">
                    <div className="mt-2 text-center">
                        <lord-icon
                            src="https://cdn.lordicon.com/gsqxdxog.json"
                            trigger="loop"
                            colors="primary:#f7b84b,secondary:#f06548"
                            style={{ width: '100px', height: '100px' }}
                        ></lord-icon>
                        <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                            <h4>Are you sure ?</h4>
                            <p className="text-muted mx-4 mb-0">Are you sure you want to remove this tasks ?</p>
                        </div>
                    </div>
                    <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                        <Button color="light" className="w-sm" onClick={() => setmodal_delete(false)}>
                            Close
                        </Button>
                        <Button color="danger" className="w-sm" id="delete-record" onClick={deleteCard}>
                            Yes, Delete It!
                        </Button>
                    </div>
                </div>
            </Modal>
        </React.Fragment>
    );
};

export default CardTaskBox;
