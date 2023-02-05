import { generateWorkload } from 'src/actions/workload.action';
import { PagingDataDto } from 'src/domain/dto/paging.dto';
import { UserEntity } from 'src/domain/entities/user.entity';
import { User } from 'src/infrastructure/schemas/user.schema';
import { ProjectEntity } from '../../domain/entities/project.entity';
import { IProjectRepository } from '../../domain/repositories/project-repository.interface';

export class GetProjectsUseCases {
  constructor(private readonly projectRepository: IProjectRepository) {}

  async execute(limit: number, cursor: number): Promise<PagingDataDto> {
    const res = await this.projectRepository.findAll(limit, cursor);
    res.datas.forEach((project) => {
      if (project.users.length > 0) {
        project.users.forEach((user) => {
          if (user.workloads.length == 0) {
            user.workloads = generateWorkload(user.id, '', project.id);
          }
        });
      } else {
        const user = new UserEntity(new User());
        user.workloads = generateWorkload(0, '', project.id);
        project.users.push(user);
      }
    });
    return res;
  }
}
