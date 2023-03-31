import React, { useEffect, useState } from 'react';

import { Container } from 'reactstrap';
import { map } from 'lodash';
import UncontrolledBoard from './UncontrolledBoard';
import { kanbanBoardData } from './data';
import { useParams } from 'react-router-dom';
import { GetById } from '../../../Services/project.service';

const ProjectDetail = () => {
    let params = useParams();
    const [project, setProject] = useState({});
    const data = map(kanbanBoardData, (task) => ({ ...task, cards: task.tasks }));
    data.length = Math.min(data.length, 6);

    const getProjectById = (project_id) => {
        GetById(project_id)
            .then((res) => {
                setProject(res);
            })
            .catch((error) => {});
    };

    useEffect(() => {
        getProjectById(params.id);
    }, [params]);

    console.log(project);
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
