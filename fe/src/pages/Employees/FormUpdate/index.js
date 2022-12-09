import React, { useState } from "react";
import { Col, Button, Modal, ModalHeader, ModalBody, Input } from "reactstrap";

const ModalUpdate = (props) => {
  const { isShowFormUpdate, closeFormUpdate, save, titleForm } = props;
  const [employee, setEmployee] = useState({
    id: 0,
    name: "",
    email: "",
  });

  const changeField = (event) => {
    let emp = { ...employee, [event.target.name]: event.target.value };
    setEmployee(emp);
  };

  const update = () => {
    save(employee);
  };

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
        <h5 className="modal-title">{titleForm}</h5>
      </ModalHeader>
      <ModalBody>
        <form action="#">
          <div className="row g-3">
            <Col xxl={6}>
              <div>
                <label htmlFor="userName" className="form-label">
                  UserName
                </label>
                <Input type="text" className="form-control" name="name" placeholder="Enter username" onChange={(x) => changeField(x)} />
              </div>
            </Col>
            <Col xxl={6}>
              <label htmlFor="emailInput" className="form-label">
                Email
              </label>
              <Input type="email" className="form-control" name="email" placeholder="Enter your email" onChange={(x) => changeField(x)} />
            </Col>
            <div className="col-lg-12">
              <label className="form-label">Gender</label>
              <div>
                <div className="form-check form-check-inline">
                  <Input className="form-check-input" type="radio" name="gender" id="inlineRadio1" value="1" onChange={(x) => changeField(x)} />
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    Male
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <Input className="form-check-input" type="radio" name="gender" id="inlineRadio2" value="0" onChange={(x) => changeField(x)} />
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    Female
                  </label>
                </div>
              </div>
            </div>
            {/* <Col xxl={12}>
            <div>
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <Input type="text" className="form-control" id="lastName" placeholder="Enter lastname" />
            </div>
          </Col> */}
            <div className="col-lg-12">
              <div className="hstack gap-2 justify-content-end">
                <Button color="light" onClick={() => closeFormUpdate(false)}>
                  Close
                </Button>
                <Button color="primary" onClick={() => update()}>
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
