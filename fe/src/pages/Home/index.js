import React, { useEffect, useState } from 'react';
import { Container, CardBody, Card, CardHeader, Row, Col, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import MetaTags from 'react-meta-tags';
import News from '../../Components/Home/New';
import CompanyMemberIntroduction from '../../Components/Home/CompanyMemberIntroduction';
import Handbook from '../../Components/Home/Handbook';
import { GetAll } from '../../Services/new.service';

const HomePage = () => {
    const [news, setNews] = useState([]);
    useEffect(() => {
        GetAll({})
            .then((res) => {
                setNews(res);
            })
            .catch(() => {
                setNews([{ id: 1, title: 'Tin 1', created_at: 1681241552, created_by: 'admin' }]);
            });
    }, []);
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Zen8labs - Tools | Lunch Order</title>
                </MetaTags>
                <Container fluid>
                    <Row>
                        <Card>
                            <CardHeader className="align-items-center d-flex">
                                <h4 className="card-title mb-0 flex-grow-1">News</h4>
                            </CardHeader>

                            <CardBody>
                                <News news={news} />
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader className="align-items-center d-flex">
                                <h4 className="card-title mb-0 flex-grow-1">Handbook</h4>
                            </CardHeader>

                            <CardBody>
                                <Row>
                                    <Handbook />
                                </Row>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader className="align-items-center d-flex">
                                <h4 className="card-title mb-0 flex-grow-1">Company and member introduction</h4>
                            </CardHeader>

                            <CardBody>
                                <Row>
                                    <CompanyMemberIntroduction />
                                </Row>
                            </CardBody>
                        </Card>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default HomePage;
