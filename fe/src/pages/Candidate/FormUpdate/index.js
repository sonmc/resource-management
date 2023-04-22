import React, { useEffect, useState } from 'react';
import { Col, Button, Modal, ModalHeader, ModalBody, Input, Label, Card } from 'reactstrap';
import { Get } from 'src/Services/user.service';
import { LEVEL_STATUS } from '../../../Constant';
import Education from './Education';
import PersonalInformation from './PersonalInformation';
import Skill from './Skill';

import './index.scss';
import Experience from './WorkExperience';
import Project from '../Projects';

const levelStatus = LEVEL_STATUS;

const ModalUpdate = (props) => {
    const { isShowFormUpdate, closeFormUpdate, save, candidateId, roles } = props;
    const [selectedStatus, setSelectedStatus] = useState(levelStatus[0]);
    const [candidate, setCandidate] = useState([]);
    const [educations, setEducations] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [projects, setProjects] = useState([]);

    const [skill, setSkill] = useState({});
    const [personalInformation, setPersonalInformation] = useState({});
    const [title, setTitle] = useState('Create candidate');

    const changeField = (event) => {
        let emp = { ...candidate, [event.target.name]: event.target.name == 'status' ? +event.target.value : event.target.value };
        setCandidate(emp);
    };

    const update = () => {
        candidate.gender = candidate.gender == 1;
        save(candidate, candidateId ? 'UPDATE' : 'CREATE');
    };

    const handleLevelStatus = (st) => {
        setSelectedStatus(st);
    };

    const addNewEducationForm = () => {
        const edus = [
            ...educations,
            {
                name: '',
                description: '',
                date_start: new Date(),
                date_end: new Date(),
            },
        ];
        setEducations(edus);
    };

    const updateEducation = () => {};
    const updateSkill = () => {};
    const updateExperience = () => {};
    const updateProject = () => {};
    // useEffect(() => {
    //     let emp = { ...employee, roles: selectedRoles, status_level: selectedStatus?.id, chapter_head: selectedChapterHead?.id };
    //     setEmployee(emp);
    // }, [selectedRoles, selectedStatus, selectedChapterHead]);

    useEffect(() => {
        if (candidateId) {
            const params = { id: candidateId };
            Get(params).then((res) => {
                setCandidate(res);
            });
            setTitle('Update candidate');
        }
    }, [candidateId]);

    console.log(educations);
    return (
        <Modal
            id="flipModal"
            size="lg"
            modalclassname="flip"
            isOpen={isShowFormUpdate}
            toggle={() => {
                closeFormUpdate(false);
            }}
            centered
        >
            <ModalHeader className="p-3 bg-soft-info">{title}</ModalHeader>
            <ModalBody>
                <form action="#">
                    <div className="row">
                        <h4 className="pb-2"> Personal information</h4>
                    </div>
                    <PersonalInformation personalInformation={personalInformation} />

                    <div className="row mt-3">
                        <h4 className="pb-2"> Educations</h4>
                    </div>
                    <div className="row g-4">
                        <Card className="p-3">
                            {educations.map((edu, i) => {
                                return <Education key={i} education={edu} updateEducation={updateEducation} />;
                            })}

                            <Col xxl={12} className="mt-0">
                                <button type="button" onClick={() => addNewEducationForm()} className="w-25 btn btn-outline-secondary waves-effect waves-light">
                                    Add
                                </button>
                            </Col>
                        </Card>
                    </div>

                    <div className="row mt-3">
                        <h4 className="pb-2">Work Experience</h4>
                    </div>
                    <div className="row g-4">
                        <Card className="p-3">
                            {educations.map((experience, i) => {
                                return <Experience key={i} experience={experience} updateExperience={updateExperience} />;
                            })}

                            <Col xxl={12} className="mt-0">
                                <button type="button" onClick={() => addNewEducationForm()} className="w-25 btn btn-outline-secondary waves-effect waves-light">
                                    Add
                                </button>
                            </Col>
                        </Card>
                    </div>

                    <div className="row mt-3">
                        <h4 className="pb-2"> Projects</h4>
                    </div>
                    <div className="row g-4">
                        <Card className="p-3">
                            {projects.map((project, i) => {
                                return <Project key={i} project={project} updateproject={updateProject} />;
                            })}

                            <Col xxl={12} className="mt-0">
                                <button type="button" onClick={() => addNewEducationForm()} className="w-25 btn btn-outline-secondary waves-effect waves-light">
                                    Add
                                </button>
                            </Col>
                        </Card>
                    </div>
                    <div className="row mt-3">
                        <h4 className="pb-2"> Skills</h4>
                    </div>
                    <div className="row g-4">
                        <Skill skill={skill} updateSkill={updateSkill} />
                    </div>
                    <div className="row g-4 md-footer mt-3">
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
