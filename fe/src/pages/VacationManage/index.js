import React from 'react';
import MetaTags from 'react-meta-tags';
import { CardBody, Table, Container } from 'reactstrap';

const Vacations = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Resource management | Vacations</title>
                </MetaTags>
                <Container fluid>
                    <div className="card" id="Vacation">
                        <div className="card-header border-0">
                            <div className="d-flex align-items-center">
                                <h5 className="card-title mb-0 flex-grow-1">Vacations</h5>
                            </div>
                        </div>
                        <div className="card-body pt-0 pb-0">
                            <form>
                                <div className="row">
                                    <div className="col-xxl-2 col-sm-4">
                                        <div className="input-light">
                                            <select className="form-control" data-choices data-choices-search-false name="status" id="slIdStatus">
                                                <option defaultValue="all">Select status</option>
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <CardBody>
                            <div className="table-responsive mt-3">
                                <Table className="table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '20%', textAlign: 'center' }}>Thứ 2</th>
                                            <th style={{ width: '20%', textAlign: 'center' }}>Thứ 3</th>
                                            <th style={{ width: '20%', textAlign: 'center' }}>Thứ 4</th>
                                            <th style={{ width: '20%', textAlign: 'center' }}>Thứ 5</th>
                                            <th style={{ width: '20%', textAlign: 'center' }}>Thứ 6</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <p className="text-center">Ngày 01</p>
                                                <p>Nghỉ: 2</p>
                                                <p>Remote: 3</p>
                                            </td>
                                            <td>
                                                <p className="text-center">Ngày 02</p>
                                                <p>Nghỉ: 2</p>
                                                <p>Remote: 3</p>
                                            </td>
                                            <td>
                                                <p className="text-center">Ngày 03</p>
                                                <p>Remote: 3</p>{' '}
                                            </td>
                                            <td>
                                                <p className="text-center">Ngày 04</p>
                                                <p>Remote: 3</p>
                                            </td>
                                            <td>
                                                <p className="text-center">Ngày 05</p>
                                                <p>Nghỉ: 2</p>
                                                <p>Remote: 3</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="text-center">Ngày 08</p>
                                                <p>Nghỉ: 2</p>
                                                <p>Remote: 3</p>
                                            </td>
                                            <td>
                                                <p className="text-center">Ngày 09</p>
                                                <p>Nghỉ: 2</p>
                                                <p>Remote: 3</p>
                                            </td>
                                            <td>
                                                <p className="text-center">Ngày 10</p>
                                                <p>Nghỉ: 2</p>
                                                <p>Remote: 3</p>
                                            </td>
                                            <td>
                                                <p className="text-center">Ngày 11</p>
                                                <p>Nghỉ: 2</p>
                                                <p>Remote: 3</p>
                                            </td>
                                            <td>
                                                <p className="text-center">Ngày 12</p>
                                                <p>Nghỉ: 2</p>
                                                <p>Remote: 3</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </CardBody>
                    </div>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Vacations;
