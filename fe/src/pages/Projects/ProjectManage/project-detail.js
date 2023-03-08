import React from 'react';

import { Container } from 'reactstrap';

import { map } from 'lodash';
import UncontrolledBoard from './UncontrolledBoard';
import { kanbanBoardData } from './data';

const ProjectDetail = () => {
    const data = map(kanbanBoardData, (task) => ({ ...task, cards: task.tasks }));
    data.length = Math.min(data.length, 6);

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <UncontrolledBoard board={{ columns: data }} content={kanbanBoardData} />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ProjectDetail;
