import React from 'react';
import { Row } from 'reactstrap';
import AllTasks from './AllTasks';
import Widgets from './Widgets';
const TaskList = () => {
    return (
        <React.Fragment>
            <Row>
                <Widgets />
            </Row>
            <AllTasks />
        </React.Fragment>
    );
};

export default TaskList;
