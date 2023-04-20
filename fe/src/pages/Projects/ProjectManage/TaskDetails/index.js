import React from 'react';
import { Container, Col, Row, Button } from 'reactstrap';
import Comments from './Comments';
import Summary from './Summary';
import TimeTracking from './TimeTracking';
import MetaTags from 'react-meta-tags';
import { useHistory } from 'react-router-dom';

const TaskDetails = () => {
    const history = useHistory();
    const goBack = () => {
        history.push('projects');
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Tasks Details | Velzon - React Admin & Dashboard Template</title>
                </MetaTags>
                <Container fluid>
                    <Button color="light" onClick={() => goBack()}>
                        Back
                    </Button>
                    <Row>
                        <Col xxl={3}>
                            <TimeTracking />
                        </Col>
                        <Col xxl={9}>
                            <Summary />
                            <Comments />
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default TaskDetails;
