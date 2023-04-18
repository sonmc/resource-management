import React, { useState } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import HandbookModal from './DetailModal/HandbookModal';
import { Link } from 'react-router-dom';
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
            <Card className="overflow-hidden">
                <CardBody className="p-0">
                    <div className="d-flex p-5 flex-column text-white" style={{ background: '#07411E' }}>
                        <div className=" d-flex justify-content-between">
                            <a href="https://www.zen8labs.com/" target="_blank" rel="noreferrer">
                                <img src="https://www.zen8labs.com/wp-content/uploads/2022/05/logo_zen8_white.svg" alt="" />
                            </a>
                            <p className="mb-0">zen8labs.com</p>
                        </div>

                        <h1
                            className="text-uppercase mb-0 text-white"
                            style={{ fontSize: '120px', cursor: 'pointer' }}
                            onClick={() => showHandbookDetail()}
                        >
                            Zen8labs Employee Handbook
                        </h1>
                        <div className=" d-flex justify-content-between">
                            <div className="d-flex flex-column">
                                <a href="mailto:hi@zen8labs.com" className="text-white">
                                    hi@zen8labs.com
                                </a>
                                <a href="tel:(+84)888555918" className="text-white">
                                    (+84) 888 555 918
                                </a>
                            </div>
                            <p className="mb-0 text-uppercase text-white">For internal circulation only</p>
                        </div>
                    </div>
                </CardBody>
            </Card>
            <HandbookModal status={status} onCloseClick={onCloseClick} />
        </React.Fragment>
    );
};

export default Handbook;
