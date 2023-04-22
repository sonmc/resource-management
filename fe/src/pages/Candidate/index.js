import React, { useEffect, useState } from 'react';
import { Col, Container, Table, Button } from 'reactstrap';
import MetaTags from 'react-meta-tags';
import { Get, Upload } from 'src/Services/candidate.service';
import { useHistory } from 'react-router-dom';

const CandidatePage = () => {
    const domain = process.env.REACT_APP_API_URL;
    const [candidates, setCandidates] = useState([]);
    const [idsSelected, setIdsSelected] = useState([]);
    const history = useHistory();
    const redirect = (can) => {
        let url = '';
        if (can?.id) {
            url = '/candidates/edit/' + can.id;
            history.push({
                pathname: url,
                state: { candidate: can },
            });
        } else {
            url = '/candidates/add';
            history.push(url);
        }
    };
    const [filter, setFilter] = useState({
        searchTerm: '',
        status: -1,
    });

    const fetchCandidate = (filter) => {
        Get(filter).then((res) => {
            setCandidates(res);
        });
    };

    const changeFilter = (event) => {
        let value = event.target.value;
        setFilter({ ...filter, [event.target.name]: value });
    };

    const uploadCv = () => {
        let inputTag = document.createElement('input');
        inputTag.type = 'file';
        inputTag.onchange = (_this) => {
            let files = _this.target.files;
            Upload(files)
                .then((res) => {
                    setFilter((x) => ({ ...x }));
                })
                .catch((err) => {});
        };
        inputTag.click();
    };

    const openFile = (path) => {
        window.open(domain + '/' + path, 'blank');
    };

    const selectedAll = () => {
        if (idsSelected.length > 0 && idsSelected.length == candidates.length) {
            setIdsSelected([]);
        } else {
            const newIdsSelected = candidates.map((candidate) => candidate.id);
            setIdsSelected(newIdsSelected);
        }
    };

    const selectedItem = (id) => {
        let newIdsSelected = [];
        if (idsSelected.includes(id)) {
            newIdsSelected = idsSelected.filter((item) => item != id);
        } else {
            newIdsSelected = [...idsSelected, id];
        }
        setIdsSelected(newIdsSelected);
    };

    const updateStatus = (id, isInterview) => {
        const newCandidates = candidates.map((can) => {
            if (can.id === id) {
                can.isInterview = !can.isInterview;
            }
            return can;
        });
        setCandidates(newCandidates);
    };

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
                                        <h5 className="card-title mb-0 flex-grow-1">Candidate Management</h5>
                                        <div className="flex-shrink-0">
                                            <button className="btn btn-success" onClick={() => redirect()}>
                                                <i className="ri-add-line align-bottom me-1"></i> New
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body pt-0 pb-0">
                                    <div className="row">
                                        <div className="col-xxl-3 col-sm-4">
                                            <div className="search-box">
                                                <input
                                                    type="text"
                                                    name="searchTerm"
                                                    onChange={(x) => changeFilter(x)}
                                                    className="form-control search"
                                                    placeholder="Search by name, email, phone"
                                                />
                                                <i className="ri-search-line search-icon"></i>
                                            </div>
                                        </div>

                                        <div className="col-xxl-2 col-sm-4">
                                            <select className="form-control" name="status" onChange={(x) => changeFilter(x)}>
                                                <option value={-1}>Select status</option>
                                                <option value={0}>Not Interview</option>
                                                <option value={1}>Interviewed</option>
                                            </select>
                                        </div>
                                        <div className="col-xxl-2 col-sm-4">
                                            <button
                                                type="button"
                                                onClick={() => uploadCv()}
                                                className="btn btn-success btn-label waves-effect waves-light"
                                            >
                                                <i className="ri-upload-line label-icon align-middle fs-16 me-2"></i> Upload
                                            </button>
                                        </div>
                                    </div>
                                    {idsSelected.length > 0 && (
                                        <div className="row mt-3">
                                            <div className="col-xxl-12 col-sm-12">
                                                <button type="button" className="btn btn-danger btn-label btn-sm waves-effect waves-light me-2">
                                                    <i className="ri-delete-bin-5-line label-icon align-middle fs-16 me-2"></i> Delete
                                                </button>
                                                <button type="button" className="btn btn-success btn-label btn-sm waves-effect waves-light">
                                                    <i className="ri-download-line label-icon align-middle fs-16 me-2"></i> Export
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    <div className="row mt-3">
                                        <div className="table-responsive">
                                            <Table className="table-hover">
                                                <thead>
                                                    <tr>
                                                        <th style={{ width: 5 }}>
                                                            <div className="form-check form-check-success">
                                                                <input
                                                                    onChange={() => selectedAll()}
                                                                    checked={idsSelected.length == candidates.length}
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id="formCheck8"
                                                                />
                                                            </div>
                                                        </th>
                                                        <th style={{ width: 5 }}>No.</th>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Phone number</th>
                                                        <th>Skill</th>
                                                        <th>CV</th>
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
                                                                        <input
                                                                            onChange={() => selectedItem(can.id)}
                                                                            checked={
                                                                                idsSelected.includes(can.id) ||
                                                                                idsSelected.length == candidates.length
                                                                            }
                                                                            className="form-check-input"
                                                                            type="checkbox"
                                                                            id="check-all"
                                                                        />
                                                                    </div>
                                                                </th>
                                                                <th>{key + 1}</th>
                                                                <td>{can.name}</td>
                                                                <td>{can.email}</td>
                                                                <td>{can.phone_number}</td>
                                                                <td>{can.skill}</td>
                                                                <td onClick={() => openFile(can.cv_file_path)}>
                                                                    <a href="#">{can.cv_file_name}</a>
                                                                </td>
                                                                <td>
                                                                    <div
                                                                        style={{ textAlign: 'center' }}
                                                                        className="form-check form-switch form-switch-success form-switch-md"
                                                                    >
                                                                        <input
                                                                            className="form-check-input"
                                                                            onChange={() => updateStatus(can.id, can.isInterview)}
                                                                            type="checkbox"
                                                                            role="switch"
                                                                            id="SwitchCheck3"
                                                                            checked={can.isInterview}
                                                                        />
                                                                    </div>
                                                                </td>
                                                                <td style={{ textAlign: 'center' }}>
                                                                    <Button
                                                                        type="button"
                                                                        title="Download pdf"
                                                                        className="btn 
                                                                btn-sm btn-success me-2"
                                                                    >
                                                                        <i className="ri-download-line"></i>
                                                                    </Button>
                                                                    <Button
                                                                        type="button"
                                                                        onClick={() => redirect(can)}
                                                                        title="Update profile"
                                                                        className="btn btn-sm btn-primary btn-icon waves-effect waves-light "
                                                                    >
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
                </Container>
            </div>
        </React.Fragment>
    );
};

export default CandidatePage;
