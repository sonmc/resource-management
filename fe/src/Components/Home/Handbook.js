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
            <Col xl={12} md={12} onClick={() => showHandbookDetail()}>
                <Card className="card-animate">
                    <CardBody>
                        <div className="d-flex align-items-center">
                            <div className="flex-grow-1 overflow-hidden">
                                <img className="w-25 h-100" style={{ cursor: 'pointer' }} src={handbookImg} alt="" />
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
