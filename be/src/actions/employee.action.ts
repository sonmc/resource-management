import { EmployeeBasePresenter } from 'src/application/presenter-core/employee-base.presenter';
import { UserEntity } from 'src/domain/entities/user.entity';

export function toEmployeeEntity(employeeP: EmployeeBasePresenter): UserEntity {
    const userE: UserEntity = new UserEntity();

    userE.id = employeeP.id;
    userE.username = employeeP.username;
    userE.dob = employeeP.dob;
    userE.email = employeeP.email;
    userE.phone_number = employeeP.phone_number;
    userE.role_id = employeeP.role_id;
    userE.status = employeeP.status;
    userE.gender = employeeP.gender;
    userE.avatar = employeeP.avatar;
    return userE;
}
