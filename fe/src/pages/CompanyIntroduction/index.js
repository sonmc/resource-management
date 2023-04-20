import React from 'react';
import { Container, CardBody, Card, CardHeader, Row, Col } from 'reactstrap';
import MetaTags from 'react-meta-tags';
import { datas } from './data';

const CompanyIntroduction = () => {
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
                                    <h4 className="card-title mb-0 flex-grow-1">Company and member introduction</h4>
                                </CardHeader>

                                <CardBody>
                                    <Row>
                                        {datas.map((x, i) => {
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
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default CompanyIntroduction;
