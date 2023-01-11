import React, { useState } from "react";
import { Col, Button, Modal, ModalHeader, ModalBody, Input, Label } from "reactstrap";
import Flatpickr from "react-flatpickr";

const CreateModal = (props) => {
  const { isShowFormUpdate, closeFormUpdate, save } = props;
  const [project, setProject] = useState({
    id: 0,
    name: "",
    start_date: "",
    note: "",
  });

  const changeField = (event) => {
    let proj = { ...project, [event.target.name]: event.target.value };
    setProject(proj);
  };

  const update = () => {
    save(project);
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
      <ModalHeader className="p-3 bg-soft-info">Create Project</ModalHeader>
      <ModalBody>
        <form action="#">
          <div className="row g-3">
            <Col xxl={12}>
              <label htmlFor="userName" className="form-label">
                Project name
              </label>
              <Input type="text" className="form-control" name="name" placeholder="Enter project name" onChange={(x) => changeField(x)} />
            </Col>
            <Col lg={12}>
              <Label for="start-field" className="form-label">
                Start Date
              </Label>
              <Flatpickr
                className="form-control"
                options={{
                  dateFormat: "d M, Y",
                }}
                onChange={([value]) => {
                  changeField({ target: { name: "start_date", value } });
                }}
                placeholder="Select Date"
              />
            </Col>
            <Col lg={12}>
              <label className="form-label">Notes</label>
              <textarea type="text" className="form-control" name="note" placeholder="Enter notes" onChange={(x) => changeField(x)} />
            </Col>
            <Col lg={12}>
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

export default CreateModal;
