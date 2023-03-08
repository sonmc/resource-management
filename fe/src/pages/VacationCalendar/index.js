import React from 'react';
import MetaTags from 'react-meta-tags';
import { CardBody, Col, Container } from 'reactstrap';

const VacationCalendar = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Resource management | Vacation Calendar</title>
                </MetaTags>
                <Container fluid>
                    <div className="row">
                        <Col lg={12}>
                            <div className="card" id="Vacation">
                                <CardBody>
                                    <div className="table-responsive mt-3 col-lg-6">VacationCalendar page</div>
                                </CardBody>
                            </div>
                        </Col>
                    </div>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default VacationCalendar;
