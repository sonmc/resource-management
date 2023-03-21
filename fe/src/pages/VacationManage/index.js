import React from 'react';
import MetaTags from 'react-meta-tags';
import { CardBody, Col, Container } from 'reactstrap';

const Vacations = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Resource management | Vacations</title>
                </MetaTags>
                <Container fluid>
                    <div className="card" id="Vacation">
                        <CardBody>
                            <div className="table-responsive mt-3 col-lg-6">Vacations page</div>
                        </CardBody>
                    </div>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Vacations;
