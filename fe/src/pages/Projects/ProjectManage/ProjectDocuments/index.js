import React from 'react';
import { Col, Container, Table, Button } from 'reactstrap';

const ProjectDocuments = (props) => {
    const { documents } = props;
    return (
        <div className="row">
            <Col lg={12}>
                <div className="card" id="tasksList">
                    <div className="card-header border-0">
                        <div className="d-flex align-items-center">
                            <h5 className="card-title mb-0 flex-grow-1">Documents</h5>
                            <div className="flex-shrink-0">
                                <button className="btn btn-danger add-btn">
                                    <i className="ri-add-line align-bottom me-1"></i> Upload
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive mt-3">
                            <Table className="table-hover">
                                <thead>
                                    <tr>
                                        <th style={{ width: 5 }}>No.</th>
                                        <th>Document name</th>
                                        <th>File attached</th>
                                        <th>Version</th>
                                        <th>Updated date</th>
                                        <th>Updated detail</th>
                                        <th>Notes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {documents.map((emp, key) => {
                                        return (
                                            <tr key={key}>
                                                <th>{key + 1}</th>

                                                <td>{emp.email}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </Col>
        </div>
    );
};

export default ProjectDocuments;
