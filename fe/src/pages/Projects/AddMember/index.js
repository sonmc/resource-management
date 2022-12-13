import React, { useState } from "react";
import { Col, Button, Modal, ModalHeader, ModalBody, Input, Label } from "reactstrap";
import Select from "react-select";
import { usersAtom } from "../../../Recoil/states/users";
import { useRecoilValue } from "recoil";
import Flatpickr from "react-flatpickr";

const AddMemberModal = (props) => {
  const users = useRecoilValue(usersAtom);
  const { isShowFormAddMember, closeFormAddMember, addMember, project } = props;

  const [objForm, setObjForm] = useState({
    member: null,
    startDate: new Date(),
    workload: 0,
  });

  const changeField = (event) => {
    let emp = { ...objForm, [event.target.name]: event.target.value };
    setObjForm(emp);
  };

  const update = () => {
    addMember(project.id, objForm.member.id, objForm.workload, objForm.startDate);
  };

  const handleUserChanged = (user) => {
    let obj = { ...objForm, member: user };
    setObjForm(obj);
  };

  return (
    <Modal
      id="flipModal"
      modalClassName="flip"
      isOpen={isShowFormAddMember}
      toggle={() => {
        closeFormAddMember(false);
      }}
      centered
    >
      <ModalHeader className="p-3 bg-soft-info">Add member</ModalHeader>
      <ModalBody>
        <form action="#">
          <div className="row g-3">
            <Col lg={12}>
              <>
                <label htmlFor="choices-single-default" className="form-label">
                  Member
                </label>
                <Select
                  name="choices-single-default"
                  id="choices-single-default"
                  value={objForm.member}
                  onChange={handleUserChanged}
                  getOptionLabel={(option) => {
                    return option.name + " (" + option.role.name + ")";
                  }}
                  getOptionValue={(option) => {
                    return option.id;
                  }}
                  options={users}
                />
              </>
            </Col>
            <Col lg={12}>
              <Label for="duedate-field" className="form-label">
                Start Date
              </Label>
              <Flatpickr
                className="form-control"
                options={{
                  dateFormat: "d M, Y",
                }}
                placeholder="Select Date"
              />
            </Col>

            <Col xxl={12}>
              <>
                <label htmlFor="workload" className="form-label">
                  Workload
                </label>
                <Input type="number" className="form-control" name="workload" onChange={(x) => changeField(x)} />
              </>
            </Col>

            <Col lg={12}>
              <div className="hstack gap-2 justify-content-end">
                <Button color="light" onClick={() => closeFormAddMember(false)}>
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

export default AddMemberModal;
