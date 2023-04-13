import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import illustarator from '../../assets/images/user-illustarator-2.png';
import NewDetailModal from './DetailModal/NewDetailModal';

const News = (props) => {
    const { news } = props;
    const [objectNewDetail, setObjectNewDetail] = useState({
        status: false,
        data: {},
    });
    const showNewDetail = (post) => {
        setObjectNewDetail({ status: true, data: post });
    };
    const onCloseClick = () => {
        setObjectNewDetail({ status: false, data: null });
    };
    return (
        <React.Fragment>
            {news.map((item, key) => (
                <Col xl={6} md={6} key={key} onClick={() => showNewDetail(item)}>
                    <Card className="card-animate">
                        <CardBody className="p-2">
                            <div className="d-flex align-middle">
                                <div>
                                    <img src={illustarator} className="rounded img-fluid" alt="" style={{ height: '100px' }} />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="text-uppercase fw-medium text-muted text-truncate mb-3">
                                        <a className="text-reset">One stop shop destination</a>
                                    </h6>
                                    <h6 className="mb-1 lh-base">
                                        <p className="text-reset text-muted">One stop shop destination on all the latest news in crypto currencies</p>
                                    </h6>
                                    <p className="text-muted fs-12 mb-0">Posted at Dec 12, 2021 09:22 AM by HienNgo</p>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            ))}
            <NewDetailModal objectNewDetail={objectNewDetail} onCloseClick={onCloseClick} />
        </React.Fragment>
    );
};

export default News;
