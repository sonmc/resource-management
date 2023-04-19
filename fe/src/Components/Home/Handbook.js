import React, { useState } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import HandbookModal from './DetailModal/HandbookModal';
import handbookImg from '../../assets/images/handbook.png';

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
            <Col xl={6} md={6} onClick={() => showHandbookDetail()}>
                <Card className="card-animate">
                    <CardBody className="p-0">
                        <div className="d-flex align-items-center">
                            <div className="flex-grow-1 overflow-hidden">
                                <img className="w-100 h-100" src={handbookImg} alt="" />
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
