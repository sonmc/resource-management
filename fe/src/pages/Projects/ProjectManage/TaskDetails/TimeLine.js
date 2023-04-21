import React from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { DifferentColor } from './TimelineCharts';

const TimeTracking = () => {
    return (
        <React.Fragment>
            <Card>
                <CardHeader>
                    <h4 className="card-title mb-0">Time line</h4>
                </CardHeader>
                <CardBody>
                    <DifferentColor />
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default TimeTracking;
