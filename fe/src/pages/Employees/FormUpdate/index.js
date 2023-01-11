import React, { useEffect, useState } from "react";
import { Col, Button, Modal, ModalHeader, ModalBody, Input, Label } from "reactstrap";
import { Get } from "../../../Services/user.service";
import Flatpickr from "react-flatpickr";

const EMPLOYEE_DEFAULT = {
  role_id: 2,
  dob: "2000-01-01",
  name: "",
  email: "",
  phone_number: "",
  status: 1,
  avatar: "",
  gender: 1,
};

const ModalUpdate = (props) => {
  const { isShowFormUpdate, closeFormUpdate, save, employeeId, roles } = props;
  const [employee, setEmployee] = useState(EMPLOYEE_DEFAULT);
  const [title, setTitle] = useState("Create employee");

  const changeField = (event) => {
    let emp = { ...employee, [event.target.name]: event.target.value };
    setEmployee(emp);
  };

  const update = () => {
    employee.gender = employee.gender == 1;
    save(employee, "CREATE");
  };

  useEffect(() => {
    if (employeeId) {
      const params = { id: employeeId };
      Get(params).then((res) => {
        setEmployee(res);
      });
      setTitle("Update employee");
    } else {
      setEmployee({ ...EMPLOYEE_DEFAULT });
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
          <div className="row g-3">
            <Col xxl={6}>
              <div>
                <label htmlFor="name" className="form-label">
                  UserName
                </label>
                <Input value={employee.name} type="text" className="form-control" name="name" placeholder="Enter employee username" onChange={(x) => changeField(x)} />
              </div>
            </Col>
            <Col xxl={6}>
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <Input value={employee.email} type="email" className="form-control" name="email" placeholder="Enter employee email" onChange={(x) => changeField(x)} />
            </Col>

            <Col xxl={6}>
              <Label for="start-field" className="form-label">
                Date of birth
              </Label>
              <Flatpickr
                className="form-control"
                options={{
                  dateFormat: "Y-m-d",
                }}
                onChange={([value]) => {
                  changeField({ target: { name: "dob", value } });
                }}
                value={employee.dob}
                placeholder="Select Date"
              />
            </Col>
            <Col xxl={6}>
              <label htmlFor="dob" className="form-label">
                Role
              </label>
              <select value={employee.role_id} className="form-control" name="role_id" onChange={(x) => changeField(x)}>
                {roles.map((role, key) => {
                  return (
                    <React.Fragment key={key}>
                      <option value={role.id}>{role.name}</option>
                    </React.Fragment>
                  );
                })}
              </select>
            </Col>
            <Col xxl={6}>
              <label htmlFor="phoneNumber" className="form-label">
                Phone number
              </label>
              <Input value={employee.phone_number} type="number" className="form-control" name="phone_number" placeholder="Enter employee phone number" onChange={(x) => changeField(x)} />
            </Col>
            <Col xxl={6}>
              <label htmlFor="phoneNumber" className="form-label">
                Status
              </label>
              <select value={employee.status} className="form-control" name="status" onChange={(x) => changeField(x)}>
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
            </Col>
            <div className="col-lg-12">
              <label className="form-label">Gender</label>
              <div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="gender" checked={employee.gender == 1} value="1" id="inlineRadio1" onChange={(x) => changeField(x)} />
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    Male
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="gender" checked={!employee.gender == 0} value="0" id="inlineRadio2" onChange={(x) => changeField(x)} />
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    Female
                  </label>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="hstack gap-2 justify-content-end">
                <Button color="light" onClick={() => closeFormUpdate(false)}>
                  Close
                </Button>
                <Button color="success" onClick={() => update()}>
                  Save
                </Button>
              </div>
            </div>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default ModalUpdate;
