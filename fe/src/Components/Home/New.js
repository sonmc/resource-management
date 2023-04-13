import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import illustarator from '../../assets/images/user-illustarator-2.png';
import NewDetailModal from './DetailModal/NewDetailModal';
import moment from 'moment';
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
        setObjectNewDetail({ status: false, data: {} });
    };
    return (
        <React.Fragment>
            <Row>
                {news.map((item, key) => (
                    <Col xl={6} md={6} key={key} onClick={() => showNewDetail(item)}>
                        <Card className="card-animate">
                            <CardBody className="p-2">
                                <div className="d-flex align-middle">
                                    {item.image && (
                                        <div style={{ width: '200px' }} className="me-3">
                                            <div className="box-img thumbnail">
                                                <div className="img">
                                                    <img src={item.image} className="rounded img-fluid" alt=""></img>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div style={{ width: `calc(100% - 200px)` }}>
                                        <h6 className="text-uppercase fw-medium text-muted text-truncate mb-3">{item.title}</h6>
                                        <p
                                            style={{ height: 60, overflow: 'hidden' }}
                                            className="mb-1 text-content"
                                            dangerouslySetInnerHTML={{ __html: item.content }}
                                        ></p>
                                        <p className="text-muted fs-12 mb-0">
                                            Posted at {moment().format('MMM DD, YYYY hh:mm A')} by {item.user.username}
                                        </p>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>

            <NewDetailModal objectNewDetail={objectNewDetail} onCloseClick={onCloseClick} />
        </React.Fragment>
    );
};

export default News;
