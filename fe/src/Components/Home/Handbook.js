import React, { useState } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import HandbookModal from './DetailModal/HandbookModal';
import handbookImg from 'src/assets/images/handbook.png';

const Handbook = () => {
    const [status, setStatus] = useState(false);
    const showHandbookDetail = () => {
        setStatus(true);
    };

    const onCloseClick = () => {
        setStatus(false);
    };
    return (
        <React.Fragment>
            <Col xl={12} md={12}>
                <Card className="card-animate">
                    <CardBody>
                        <div className="d-flex align-middle">
                            <div onClick={() => showHandbookDetail()}>
                                <img className="w-75 h-100" style={{ cursor: 'pointer' }} src={handbookImg} alt="" />
                            </div>
                            <div className="flex-grow-1">
                                <h5 className="mb-1 lh-base">Welcome to be a member of Zen8Labs! The first version of the handbook was written in 2022 when Zen8Labs was 3 years old to summarize the core values of Zen8Labs which helps members:</h5>
                                <ul>
                                    <li>Understand fully & clearly about the core values of our company, navigate behaviors & working style to form the unique culture</li>
                                    <li>Have a common view of our company development strategy</li>
                                    <li>Find and recruit other news members that are appropriate for key values and criteria</li>
                                    <li>Communicate and develop Zen8Labs's branding</li>
                                </ul>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <HandbookModal status={status} onCloseClick={onCloseClick} />
        </React.Fragment>
    );
};

export default Handbook;
