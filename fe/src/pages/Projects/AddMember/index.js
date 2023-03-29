import React, { useEffect, useState } from 'react';
import { Col, Button, Modal, ModalHeader, ModalBody, Input, Label } from 'reactstrap';
import Select from 'react-select';
import { usersState } from '../../../Recoil/states/users';
import { useRecoilValue } from 'recoil';
import Flatpickr from 'react-flatpickr';
import { newWeekInMonthState } from '../../../Recoil/states/common';

const AddMemberModal = (props) => {
    const weekInMonthValue = useRecoilValue(newWeekInMonthState);
    let _users = useRecoilValue(usersState);

    const [users, setUsers] = useState(_users);
    const { isShowFormAddMember, closeFormAddMember, addMember, project } = props;
    let dateNow = new Date();
    dateNow.setDate(dateNow.getDate() + 7);

    const [objForm, setObjForm] = useState({
        members: [],
        start_date: new Date(),
        end_date: dateNow,
        workload: 100,
        weekInCurrentMonth: '',
    });

    useEffect(() => {
        setUsers(() => {
            return (
                _users?.filter((x) => {
                    return !project?.users?.find((y) => y.id === x.id);
                }) || []
            );
        });
    }, [_users, project]);

    const changeField = (event) => {
        let emp = { ...objForm, [event.target.name]: event.target.value };
        setObjForm(emp);
    };

    const update = () => {
        addMember({ ...objForm, project_id: +project.id, weekInCurrentMonth: weekInMonthValue });
    };

    const handleUserChanged = (users) => {
        let obj = { ...objForm, members: users };
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
                                    value={objForm.members}
                                    onChange={(x) => handleUserChanged(x)}
                                    getOptionLabel={(option) => {
                                        return option.username;
                                    }}
                                    getOptionValue={(option) => {
                                        return option.id;
                                    }}
                                    isMulti={true}
                                    options={users}
                                />
                            </>
                        </Col>
                        <Col lg={6}>
                            <Label for="duedate-field" className="form-label">
                                Start Date
                            </Label>
                            <Flatpickr
                                className="form-control"
                                options={{
                                    dateFormat: 'd M, Y',
                                }}
                                value={objForm.start_date}
                                placeholder="Select start date"
                            />
                        </Col>
                        <Col lg={6}>
                            <Label for="duedate-field" className="form-label">
                                End Date
                            </Label>
                            <Flatpickr
                                className="form-control"
                                options={{
                                    dateFormat: 'd M, Y',
                                }}
                                placeholder="Select end date"
                                value={objForm.end_date}
                            />
                        </Col>
                        <Col xxl={12}>
                            <>
                                <label htmlFor="workload" className="form-label">
                                    Workload
                                </label>
                                <Input type="number" value={objForm.workload} className="form-control" name="workload" onChange={(x) => changeField(x)} />
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
