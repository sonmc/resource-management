import { ProjectPresenter } from 'src/application/controllers/project/presenter/project.presenter';
import { ProjectEntity } from 'src/domain/entities/project.entity';

export function toProjectSchema(projectP: ProjectPresenter): ProjectEntity {
    const projectE: ProjectEntity = new ProjectEntity();
    projectE.id = projectP.id;
    return projectE;
}
