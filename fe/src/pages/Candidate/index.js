import React, { useEffect, useState } from 'react';
import { CardBody, Col, Container, Table, Button } from 'reactstrap';
import MetaTags from 'react-meta-tags';
import { Get, Upload } from '../../Services/candidate.service';
import ModalUpdate from './FormUpdate';

const CandidatePage = () => {
    const domain = process.env.REACT_APP_API_URL;
    const [candidates, setCandidates] = useState([]);
    const [candidateId, setCandidateId] = useState(0);
    const [filter, setFilter] = useState({
        searchTerm: '',
        roleId: 0,
        status: 0,
    });
    const [isShowFormUpdate, setShowFormUpdate] = useState(false);
    const fetchCandidate = (filter) => {
        Get(filter).then((res) => {
            setCandidates(res);
        });
    };

    const changeFilter = (event) => {
        let value = event.target.value;
        if (event.target.name === 'status') {
            value = value === 'all' ? 0 : value;
        }
        setFilter({ ...filter, [event.target.name]: value });
    };

    const uploadCv = () => {
        let inputTag = document.createElement('input');
        inputTag.type = 'file';
        inputTag.onchange = (_this) => {
            let files = _this.target.files;
            Upload(files)
                .then((res) => {
                    setCandidates(res);
                })
                .catch((err) => {});
        };
        inputTag.click();
    };
    const openFile = (path) => {
        window.open(domain + '/' + path, 'blank');
    };
    const save = () => {};

    const closeFormUpdate = () => {
        setShowFormUpdate(false);
    };
    const updateStatus = (id, isInterview) => {};

    useEffect(() => {
        fetchCandidate(filter);
    }, [filter]);

    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Zen8labs - Tools | Candidate</title>
                </MetaTags>
                <Container fluid>
                    <div className="row">
                        <Col lg={12}>
                            <div className="card" id="tasksList">
                                <div className="card-header border-0">
                                    <div className="d-flex align-items-center">
                                        <h5 className="card-title mb-0 flex-grow-1">Candidates</h5>
                                        <div className="flex-shrink-0">
                                            <button className="btn btn-success" onClick={() => uploadCv()}>
                                                <i className="ri-add-line align-bottom me-1"></i> Create
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body pt-0 pb-0">
                                    <div className="row">
                                        <div className="col-xxl-3 col-sm-4">
                                            <div className="search-box">
                                                <input type="text" name="searchTerm" onChange={(x) => changeFilter(x)} className="form-control search" placeholder="Search by name, email, phone" />
                                                <i className="ri-search-line search-icon"></i>
                                            </div>
                                        </div>
                                        <div className="col-xxl-2 col-sm-4">
                                            <div className="search-box">
                                                <input type="text" name="searchTerm" onChange={(x) => changeFilter(x)} className="form-control search" placeholder="Search by skill" />
                                                <i className="ri-search-line search-icon"></i>
                                            </div>
                                        </div>
                                        <div className="col-xxl-2 col-sm-4">
                                            <select className="form-control">
                                                <option>Select a option</option>
                                                <option>No</option>
                                                <option>Interviewed</option>
                                            </select>
                                        </div>
                                        <div className="col-xxl-2 col-sm-4">
                                            <button type="button" className="btn btn-success btn-label waves-effect waves-light">
                                                <i className="ri-upload-line label-icon align-middle fs-16 me-2"></i> Upload
                                            </button>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-xxl-12 col-sm-12">
                                            <button type="button" className="btn btn-danger btn-label btn-sm waves-effect waves-light me-2">
                                                <i className="ri-delete-bin-5-line label-icon align-middle fs-16 me-2"></i> Delete
                                            </button>
                                            <button type="button" className="btn btn-success btn-label btn-sm waves-effect waves-light">
                                                <i className="ri-download-line label-icon align-middle fs-16 me-2"></i> Download
                                            </button>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="table-responsive">
                                            <Table className="table-bordered table-hover">
                                                <thead>
                                                    <tr>
                                                        <th style={{ width: 5 }}>
                                                            <div className="form-check form-check-success">
                                                                <input className="form-check-input" type="checkbox" id="formCheck8" />
                                                            </div>
                                                        </th>
                                                        <th style={{ width: 5 }}>No.</th>
                                                        <th>UserName</th>
                                                        <th>Email</th>
                                                        <th>Skill</th>
                                                        <th>Phone number</th>
                                                        <th>Cv</th>
                                                        <th>Status</th>
                                                        <th style={{ width: '10%' }}></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {candidates.map((can, key) => {
                                                        return (
                                                            <tr key={key}>
                                                                <th>
                                                                    <div className="form-check form-check-success">
                                                                        <input className="form-check-input" type="checkbox" id="formCheck8" />
                                                                    </div>
                                                                </th>
                                                                <th>{key + 1}</th>
                                                                <td>{can.name}</td>
                                                                <td>{can.email}</td>
                                                                <td>{can.skill}</td>
                                                                <td>{can.phone_number}</td>
                                                                <td onClick={() => openFile(can.cv_file_path)}>
                                                                    <a href="#">{can.cv_file_name}</a>
                                                                </td>
                                                                <td>
                                                                    <div style={{ textAlign: 'center' }} className="form-check form-switch form-switch-success form-switch-md">
                                                                        <input className="form-check-input" onChange={() => updateStatus(can.id, can.isInterview)} type="checkbox" role="switch" id="SwitchCheck3" checked={can.isInterview} />
                                                                    </div>
                                                                </td>
                                                                <td style={{ textAlign: 'center' }}>
                                                                    <Button
                                                                        type="button"
                                                                        title="Download pdf"
                                                                        className="btn 
                                                                btn-sm btn-success    me-2"
                                                                    >
                                                                        <i className="ri-download-line"></i>
                                                                    </Button>
                                                                    <Button type="button" title="Update profile" className="btn btn-sm btn-primary btn-icon waves-effect waves-light ">
                                                                        <i className="ri-edit-2-fill"></i>
                                                                    </Button>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </div>
                    <ModalUpdate save={save} isShowFormUpdate={isShowFormUpdate} closeFormUpdate={closeFormUpdate} candidateId={candidateId} />
                    {/* <ConfirmDelete deleteEmployee={deleteEmployee} isShowConfirmDelete={isShowConfirmDelete} closeConfirmDelete={closeConfirmDelete} employee={employeeDelete} /> */}
                </Container>
            </div>
        </React.Fragment>
    );
};

export default CandidatePage;
