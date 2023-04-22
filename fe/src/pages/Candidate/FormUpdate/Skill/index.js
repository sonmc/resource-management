import React, { useEffect, useState } from 'react';
import { Card, Col, Input, Label } from 'reactstrap';
import Select from 'react-select';

const Skill = (props) => {
    const { skill, updateSkill } = props;
    const [languages, setLanguages] = useState([]);

    return (
        <Card className="p-3">
            <Col xxl={12}>
                <label htmlFor="dob" className="form-label">
                    Technical Abilities
                </label>
                <Input value={skill.first_name} type="text" className="form-control" name="first_name" placeholder="Enter employee first name" onChange={(x) => updateSkill(x)} />
            </Col>
            <Col xxl={12}>
                <label htmlFor="dob" className="form-label">
                    Languages
                </label>
                <Select
                    value={skill.roles}
                    getOptionLabel={(option) => {
                        return option.name;
                    }}
                    getOptionValue={(option) => {
                        return option.id;
                    }}
                    isMulti={true}
                    // onChange={(x) => {
                    //     handleMultiRole(x);
                    // }}
                    options={languages}
                />
            </Col>
            <Col xxl={12}>
                <label htmlFor="dob" className="form-label">
                    Work Method
                </label>
                <Input value={skill.first_name} type="text" className="form-control" name="first_name" placeholder="Enter employee first name" onChange={(x) => updateSkill(x)} />
            </Col>
        </Card>
    );
};

export default Skill;
