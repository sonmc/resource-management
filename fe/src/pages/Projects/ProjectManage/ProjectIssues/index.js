import React, { useState } from 'react';
import { Button, Col, Table, Input } from 'reactstrap';

const Issues = () => {
    const datas = [
        {
            platform: 'Web',
            issue: 'Bổ sung selected state cho danh sách chuyên khoa, giống như design',
            link: 'https://prnt.sc/PRDAgwyYbVYf',
            note: '',
        },
        {
            platform: 'Web',
            link: 'https://prnt.sc/_1TMhq7nJi11',
            note: '',
            issue: 'Sau khi chọn 1 chuyên khoa => expect: hiển thị button X để có thể clear chuyên khoa (như hiện tại trên production)',
        },
    ];
    const [issues, setIssues] = useState(datas);
    return (
        <div className="row">
            <Col lg={12}>
                <div className="card" id="tasksList">
                    <div className="card-header border-0">
                        <div className="d-flex align-items-center">
                            <h5 className="card-title mb-0 flex-grow-1">All Issues</h5>
                            <div className="flex-shrink-0">
                                <button className="btn btn-success add-btn">
                                    <i className="ri-add-line align-bottom me-1"></i> Create issue
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body border border-dashed border-end-0 border-start-0">
                        <form>
                            <div className="row g-3">
                                <div className="col-xxl-4 col-sm-12">
                                    <div className="search-box">
                                        <input type="text" className="form-control search bg-light border-light" placeholder="Search ..." />
                                        <i className="ri-search-line search-icon"></i>
                                    </div>
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
                            </div>
                        </form>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive mt-3">
                            <Table className="table-hover">
                                <thead>
                                    <tr>
                                        <th style={{ width: 5 }}>No.</th>
                                        <th>Platform</th>
                                        <th>Issue</th>
                                        <th>Status</th>
                                        <th>Verify</th>
                                        <th>Note</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {issues.map((emp, key) => {
                                        return (
                                            <tr key={key}>
                                                <th>{key + 1}</th>
                                                <td>{emp.platform}</td>
                                                <td>
                                                    <a href={emp.link} target="_blank">
                                                        {' '}
                                                        {emp.issue}
                                                    </a>
                                                </td>
                                                <td>
                                                    <select className="form-select w-75 form-select-sm">
                                                        <option value="1">Todo</option>
                                                        <option>Fixed</option>
                                                        <option>Skip</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <div className="form-check form-switch form-switch-success form-switch-md">
                                                        <Input className="form-check-input" type="checkbox" role="switch" id="SwitchCheck3" checked onChange={(x) => {}} />
                                                    </div>
                                                </td>
                                                <td>{emp.note}</td>
                                                <td style={{ textAlign: 'center' }}>
                                                    <Button color="success btn-sm me-2">Update</Button>
                                                </td>
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

export default Issues;
