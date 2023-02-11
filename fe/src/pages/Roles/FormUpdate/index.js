import React, { useEffect, useState } from 'react';
import { Col, Button, Modal, ModalHeader, ModalBody, Input, Label } from 'reactstrap';
import { Get } from '../../../Services/user.service';

const ROLE_DEFAULT = {
  name: '',
  description: '',
};

const ModalUpdate = (props) => {
  const { isShowFormUpdate, closeFormUpdate, save, roleId } = props;
  const [role, setRole] = useState(ROLE_DEFAULT);
  const [title, setTitle] = useState('Create role');

  const changeField = (event) => {
    let emp = { ...role, [event.target.name]: event.target.value };
    setRole(emp);
  };

  const update = () => {
    save(role, 'CREATE');
  };

  useEffect(() => {
    if (roleId) {
      const params = { id: roleId };
      Get(params).then((res) => {
        setRole(res);
      });
      setTitle('Update role');
    } else {
      setRole({ ...ROLE_DEFAULT });
    }
  }, [roleId]);

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
            <Col xxl={12}>
              <div>
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <Input value={role.name} type="text" className="form-control" name="name" placeholder="Enter role username" onChange={(x) => changeField(x)} />
              </div>
            </Col>
            <Col xxl={12}>
              <div>
                <label htmlFor="name" className="form-label">
                  Description
                </label>
                <textarea value={role.description} type="text" className="form-control" name="description" placeholder="Some note" onChange={(x) => changeField(x)} />
              </div>
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
