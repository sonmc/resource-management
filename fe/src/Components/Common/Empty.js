import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import empty from 'src/assets/images/empty.png';
const Index = ({ height, text = 'Không có dữ liệu', data }) => {
    return (
        <React.Fragment>
            {data === 0 ? (
                <Row>
                    <div className="d-flex flex-column align-items-center">
                        <img alt="" src={empty} className="align-self-center" style={{ paddingTop: height + 'px' }} />
                        <p className="text-muted mt-2">{text}</p>
                    </div>
                </Row>
            ) : (
                ''
            )}
        </React.Fragment>
    );
};

export default Index;
