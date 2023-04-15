import React from 'react';
import { Container } from 'reactstrap';
import Section from './Section';
import MetaTags from 'react-meta-tags';

const ProjectOverview = () => {
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Zen8labs Tools | Project Overview</title>
                </MetaTags>
                <Container fluid>
                    <Section />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ProjectOverview;
