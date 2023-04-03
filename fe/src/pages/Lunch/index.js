import React, { useEffect, useState } from 'react';
import { CardBody, Col, Container, Table, Button } from 'reactstrap';
import MetaTags from 'react-meta-tags';

const LunchPage = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Resource management | Lunch Order</title>
                </MetaTags>
                <Container fluid>
                    <div className="row">
                        <p>Lunch page</p>
                    </div>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default LunchPage;
