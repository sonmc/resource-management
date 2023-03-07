import React, { useEffect, useState } from 'react';
import { Col, Button, Modal, ModalHeader, ModalBody, Input, Label } from 'reactstrap';
import { Get } from '../../../Services/user.service';
import Flatpickr from 'react-flatpickr';
import Select from 'react-select';
import { GENDER_MALE, GENDER_FEMALE, STATUS_INACTIVE, STATUS_ACTIVE } from '../../../Constant/index';

const EMPLOYEE_DEFAULT = {
  role_id: 0,
  dob: '2000-01-01',
  username: '',
  email: '',
  phone_number: '',
  status: 1,
  avatar: '',
  gender: 1,
};

const ModalUpdate = (props) => {
  const { isShowFormUpdate, closeFormUpdate, save, employeeId, roles } = props;
  const [employee, setEmployee] = useState(EMPLOYEE_DEFAULT);
  const [title, setTitle] = useState('Create employee');
  const [selectedRoles, setRoles] = useState(null);

  const changeField = (event) => {
    let emp = { ...employee, [event.target.name]: event.target.value };
    setEmployee(emp);
  };

  const update = () => {
    employee.gender = employee.gender == 1;
    save(employee, 'CREATE');
  };

  const handleMulti = (selectedRoles) => {
    setRoles(selectedRoles);
  };

  useEffect(() => {
    let emp = { ...employee, roles: selectedRoles };
    setEmployee(emp);
  }, [selectedRoles]);

  useEffect(() => {
    if (employeeId) {
      const params = { id: employeeId };
      Get(params).then((res) => {
        setEmployee(res);
      });
      setTitle('Update employee');
    } else {
      setEmployee({ ...employee, role_id: roles.length > 0 ? roles[0].id : 0 });
    }
  }, [employeeId]); 
  return (
    <Modal
      id="flipModal"
      modalClassName="flip"
      isOpen={isShowFormUpdate}
      toggle={() => {
        closeFormUpdate(false);
      }}
      centered
    >
      <ModalHeader>
        <Label className="modal-title">{title}</Label>
      </ModalHeader>
      <ModalBody>
        <form action="#">
          <div className="row g-4">
            <Col xxl={6}>
              <div>
                <label htmlFor="name" className="form-label">
                  UserName
                </label>
                <Input value={employee.username} type="text" className="form-control" name="username" placeholder="Enter employee username" onChange={(x) => changeField(x)} />
              </div>
            </Col>
            <Col xxl={6}>
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <Input value={employee.email} type="email" className="form-control" name="email" placeholder="Enter employee email" onChange={(x) => changeField(x)} />
            </Col>
            <Col xxl={6}>
              <label htmlFor="phoneNumber" className="form-label">
                Phone number
              </label>
              <Input value={employee.phone_number} type="number" className="form-control" name="phone_number" placeholder="Enter employee phone number" onChange={(x) => changeField(x)} />
            </Col>
            <Col xxl={6}>
              <Label for="start-field" className="form-label">
                Date of birth
              </Label>
              <Flatpickr
                className="form-control"
                options={{
                  dateFormat: 'Y-m-d',
                }}
                onChange={([value]) => {
                  changeField({ target: { name: 'dob', value } });
                }}
                value={employee.dob}
                placeholder="Select Date"
              />
            </Col>

            <Col xxl={6}>
              <label className="form-label">Status</label>
              <div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="status" checked={employee.status == STATUS_ACTIVE} value={1} onChange={(x) => changeField(x)} />
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    Active
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="status" checked={employee.status == STATUS_INACTIVE} value={0} onChange={(x) => changeField(x)} />
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    Inactive
                  </label>
                </div>
              </div>
            </Col>
            <Col xxl={6}>
              <label className="form-label">Gender</label>
              <div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="gender" checked={employee.gender == GENDER_MALE} value={1} onChange={(x) => changeField(x)} />
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    Male
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="gender" checked={employee.gender == GENDER_FEMALE} value={0} onChange={(x) => changeField(x)} />
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    Female
                  </label>
                </div>
              </div>
            </Col>
            <Col xxl={12}>
              <label htmlFor="dob" className="form-label">
                Role
              </label>
              <Select
                value={selectedRoles}
                getOptionLabel={(option) => {
                  return option.name;
                }}
                getOptionValue={(option) => {
                  return option.id;
                }}
                isMulti={true}
                onChange={(x) => {
                  handleMulti(x);
                }}
                options={roles}
              />
            </Col>
            <Col xxl={12}>
              <div className="hstack gap-2 justify-content-end">
                <Button color="light" onClick={() => closeFormUpdate(false)}>
                  Close
                </Button>
                <Button color="success" onClick={() => update()}>
                  Save
                </Button>
              </div>
            </Col>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default ModalUpdate;
