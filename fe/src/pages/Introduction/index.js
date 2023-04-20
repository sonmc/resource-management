import React, { useState, useEffect } from 'react';
import { Container, CardBody, Card, CardHeader, Row, Col } from 'reactstrap';
import MetaTags from 'react-meta-tags';
import { co_founders } from './data';
import { Get as GetEmployee } from '../../Services/user.service';
import company_structure_img from '../../assets/images/company-structure.png';

const Introduction = () => {
    const [employees, setEmployees] = useState([]);

    const fetchEmployees = () => {
        const filter = {
            searchTerm: '',
            roleId: 0,
            status: 0,
        };
        GetEmployee(filter).then((res) => {
            setEmployees(res);
        });
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Zen8labs - Tools | Company Introduction</title>
                </MetaTags>
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader className="align-items-center d-flex">
                                    <h4 className="card-title mb-0 flex-grow-1">Company structure</h4>
                                </CardHeader>

                                <CardBody>
                                    <Row>
                                        <div className="col-lg-6">
                                            <img src={company_structure_img} alt="company structure" className="w-100" />
                                        </div>
                                    </Row>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardHeader className="align-items-center d-flex">
                                    <h4 className="card-title mb-0 flex-grow-1">Co-Founders introduction</h4>
                                </CardHeader>

                                <CardBody>
                                    <Row>
                                        {co_founders.map((x, i) => {
                                            return (
                                                <div className="col-lg-4 col-xs-12 gx-5" key={i}>
                                                    <img width="140" height="140" src={x.avatar} alt="" data-ll-status="loaded" />
                                                    <h5 className="mt-3">{x.name}</h5>
                                                    <h6 className="text-muted">{x.responsibility}</h6>
                                                    <p dangerouslySetInnerHTML={{ __html: x.description }}></p>
                                                </div>
                                            );
                                        })}
                                    </Row>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardHeader className="align-items-center d-flex">
                                    <h4 className="card-title mb-0 flex-grow-1">Members introduction</h4>
                                </CardHeader>

                                <CardBody>
                                    <Row>
                                        {employees.map((x, i) => {
                                            return (
                                                <div className="col-lg-6 col-xs-12 gx-5" key={i}>
                                                    <Card className="card-animate p-3">
                                                        <div key={i} className="d-flex align-middle">
                                                            <div style={{ width: `calc(100% - 200px)` }} className="me-3">
                                                                <h6 className="fw-medium text-truncate mb-3">
                                                                    Hello, I'm {x.fist_name} {x.last_name}
                                                                </h6>
                                                                <h6 className="fw-medium text-truncate mb-3">YoB: {x.dob}</h6>
                                                                <h6 className="fw-medium text-truncate mb-3">Phone: {x.phone_number}</h6>
                                                                <p dangerouslySetInnerHTML={{ __html: x.introduce }}></p>
                                                                <h6>Position: {x.roles.map((r) => r.name).join(', ')}</h6>
                                                            </div>
                                                            {x.avatar && (
                                                                <div style={{ width: '200px' }}>
                                                                    <div className="box-img thumbnail h-100">
                                                                        <div className="img">
                                                                            <img src={x.avatar} className="rounded img-fluid" alt=""></img>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </Card>
                                                </div>
                                            );
                                        })}
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Introduction;
