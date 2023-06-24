import { In, getRepository } from 'typeorm';
import { TaskSchema } from './schemas/task.schema';
import { UserSchema } from './schemas/user.schema';
import { format } from 'date-fns';
import { parseFloat } from '../util/number.util';

export interface ITask {
    get(param: any): Promise<any>;
    list(param: any, user: any): Promise<any>;
    delete(id: string): Promise<void>;
    create(task: any): Promise<any>;
    update(task: any): Promise<any>;
    getReport(start: any, end: any): Promise<any>;
}

export class TaskService implements ITask {
    async get(param: any): Promise<any> {
        const taskRepo = getRepository(TaskSchema);
        const task = await taskRepo.findOne(param.taskId);
        return task;
    }
    async getReport(start: any, end: any): Promise<any> {
        const startDate = format(new Date(start), 'yyyy-MM-dd HH:mm:ss');
        const endDate = format(new Date(end), 'yyyy-MM-dd HH:mm:ss');

        const query = getRepository(TaskSchema)
            .createQueryBuilder('task')
            .select('task.implement', 'implement')
            .addSelect('GROUP_CONCAT(task.id)', 'ids')
            .addSelect('GROUP_CONCAT(task.point)', 'points')
            .groupBy('task.implement')
            .where('task.start_date BETWEEN :startDate AND :endDate')
            .setParameter('startDate', startDate)
            .setParameter('endDate', endDate);

        const result = await query.getRawMany();
        const userIds = result.map((item) => item.implement);

        // Get users
        const userRepository = getRepository(UserSchema);
        const users = await userRepository.find({
            where: { id: In(userIds) },
        });

        // Create an object to map userId to user
        const records: any = [];
        users.forEach((user, index) => {
            const totalTask = result[index].points.split(',').length;
            const pointsArray = result[index].points.split(',').map((point: any) => parseInt(point));
            const totalPoint = pointsArray.reduce((sum: any, point: any) => sum + point, 0);
            const taskNumber = totalTask;
            const point = ((totalPoint * 10) / taskNumber).toString();
            const poinPasered = parseFloat(point);
            records.push({ username: user.username, taskNumber: taskNumber, point: poinPasered });
        });

        return records;
    }

    async delete(id: string): Promise<any> {
        return { status: 'success', result: id };
    }

    async list(param: any, user: any): Promise<any> {
        const taskRepo = getRepository(TaskSchema);
        let tasks: any = null;
        if (user.group_ids == '[10]') {
            tasks = await taskRepo.createQueryBuilder('t').where('t.departmentId = :departmentId', { departmentId: param }).andWhere('t.implement = :id', { id: user.id }).getMany();
            const userRepository = getRepository(UserSchema);
            const userList = await userRepository.find();
            tasks.forEach((task: any) => {
                task.user = user;
                task.creator = userList.find((u: any) => u.id === task.creator_id);
            });
        } else {
            tasks = await taskRepo.createQueryBuilder('t').where('t.departmentId = :departmentId', { departmentId: param }).getMany();
            const implementIds = tasks.map((task: any) => task.implement);
            const userRepository = getRepository(UserSchema);
            const users = await userRepository.findByIds(implementIds);
            const userList = await userRepository.find();
            tasks.forEach((task: any) => {
                task.user = users.find((u: any) => u.id === task.implement);
                task.creator = userList.find((u: any) => u.id === task.creator_id);
            });
        }

        return { status: 'success', result: tasks };
    }

    async create(task: any): Promise<any> {
        const taskRepo = getRepository(TaskSchema);
        const taskCreated = await taskRepo.create(task);
        await taskRepo.save(taskCreated);
        return taskCreated;
    }

    async update(task: any): Promise<any> {
        const taskRepo = getRepository(TaskSchema);
        await taskRepo.save(task);
        return task;
    }
}
