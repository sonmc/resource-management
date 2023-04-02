import React, { useEffect, useState } from 'react';
import './index.scss';
import { Container } from 'reactstrap';
import UncontrolledBoard from './UncontrolledBoard';
import { useParams } from 'react-router-dom';
import { GetById } from '../../../Services/project.service';
import {
    CreateKanbanColumn,
    UpdateKanbanColumn,
    CreateTask,
    UpdateIndexTask,
    DeleteKanbanColumn,
    DeleteTask,
    UpdateIndexColumn,
} from '../../../Services/kanban.service';
const kanbanBoardData = [
    {
        id: 1,
        name: 'Unassigned',
        created_at: '',
        updated_at: '',
        index: 1,
        kanbanId: 1,
        tasks: [
            {
                id: 11,
                created_at: '',
                updated_at: '',
                name: 'abc',
                description: '',
                status: 1,
                estimated_start: 1,
                estimated_end: 1,
                kanbanColumnId: 1,
                index: 0,
            },
        ],
    },
];
const ProjectDetail = () => {
    let params = useParams();
    const [project, setProject] = useState({});
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
    const renameColumn = (kanban_column) => {
        return UpdateKanbanColumn(kanban_column);
    };
    const createColumn = (kanban_column) => {
        return CreateKanbanColumn(kanban_column);
    };
    const createTask = (task) => {
        return CreateTask(task);
    };
    const updateIndexTask = (model) => {
        return UpdateIndexTask(model);
    };
    const deleteKanbanColumn = (model) => {
        return DeleteKanbanColumn(model);
    };
    const deleteTask = (model) => {
        return DeleteTask(model);
    };
    const updateIndexColumn = (model) => {
        return UpdateIndexColumn(model);
    };

    return (
        <React.Fragment>
            <div className="page-content" style={{ paddingBottom: 0 }}>
                <Container fluid>
                    <UncontrolledBoard
                        board={kanbanBoardData}
                        updateColumnName={renameColumn}
                        createColumn={createColumn}
                        createTask={createTask}
                        updateIndexTask={updateIndexTask}
                        deleteKanbanColumn={deleteKanbanColumn}
                        deleteTask={deleteTask}
                        updateIndexColumn={updateIndexColumn}
                    />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ProjectDetail;
