import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col, Container, Row, Table } from 'reactstrap';
import SwiperCore, { Autoplay } from 'swiper';
import MetaTags from 'react-meta-tags';
import { useRecoilValue } from 'recoil';
import { currentUserAtom } from 'src/Recoil/states/users';

//Images
import profileBg from 'src/assets/images/profile-bg.jpg';
import avatar1 from 'src/assets/images/users/avatar-1.jpg';

const SimplePage = () => {
    SwiperCore.use([Autoplay]);
    const currentUser = useRecoilValue(currentUserAtom);
    const [avatar, setAvatar] = useState(avatar1);
    useEffect(() => {
        setAvatar(currentUser.avatar);
    }, [currentUser]);

    console.log(currentUser);
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Profile | Velzon - React Admin & Dashboard Template</title>
                </MetaTags>
                <Container fluid>
                    <div className="profile-foreground position-relative mx-n4 mt-n4">
                        <div className="profile-wid-bg">
                            <img src={profileBg} alt="" className="profile-wid-img" />
                        </div>
                    </div>
                    <div className="pt-4 mb-4 mb-lg-3 pb-lg-4">
                        <Row className="g-4">
                            <div className="col-auto">
                                <div className="avatar-lg">
                                    <img
                                        src={avatar}
                                        alt="user-img"
                                        className="img-thumbnail rounded-circle"
                                        onError={() => {
                                            setAvatar(avatar1);
                                        }}
                                    />
                                </div>
                            </div>

                            <Col>
                                <div className="p-2">
                                    <h3 className="text-white mb-1">{currentUser.full_name}</h3>
                                    <p className="text-white-75">{currentUser.roles}</p>
                                </div>
                            </Col>

                            <Col xs={12} className="col-lg-auto order-last order-lg-0">
                                <Link to="/profile/setting" className="btn btn-success">
                                    <i className="ri-edit-box-line align-bottom"></i> Edit Profile
                                </Link>
                            </Col>
                        </Row>
                    </div>

                    <Row>
                        <Col xxl={4}>
                            <Card>
                                <CardBody>
                                    <h5 className="card-title mb-3">Info</h5>
                                    <div className="table-responsive">
                                        <Table className="table-borderless mb-0">
                                            <tbody>
                                                <tr>
                                                    <th className="ps-0" scope="row">
                                                        Full Name :
                                                    </th>
                                                    <td className="text-muted">{currentUser.full_name}</td>
                                                </tr>
                                                <tr>
                                                    <th className="ps-0" scope="row">
                                                        Mobile :
                                                    </th>
                                                    <td className="text-muted">{currentUser.phone_number}</td>
                                                </tr>
                                                <tr>
                                                    <th className="ps-0" scope="row">
                                                        E-mail :
                                                    </th>
                                                    <td className="text-muted">{currentUser.email}</td>
                                                </tr>
                                                <tr>
                                                    <th className="ps-0" scope="row">
                                                        Joining Date:
                                                    </th>
                                                    <td className="text-muted">{currentUser.onboarding}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xxl={8}>
                            <Card>
                                <CardBody>
                                    <h5 className="card-title mb-3">Introduce</h5>
                                    <p>
                                        Hi I'm Anna Adame, It will be as simple as Occidental; in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is European languages are members of the same
                                        family.
                                    </p>
                                    <p>
                                        You always want to make sure that your fonts work well together and try to limit the number of fonts you use to three or less. Experiment and play around with the fonts that you already have in the software you’re working with reputable font websites. This may
                                        be the most commonly encountered tip I received from the designers I spoke with. They highly encourage that you use different fonts in one design, but do not over-exaggerate and go overboard.
                                    </p>
                                    <Row>
                                        <Col xs={6} md={4}>
                                            <div className="d-flex mt-3 align-items-center">
                                                <div className="flex-shrink-0 avatar-xs align-self-center me-3">
                                                    <div className="avatar-title bg-light rounded-circle fs-16 text-primary">
                                                        <i className="ri-user-2-fill"></i>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1 overflow-hidden">
                                                    <p className="mb-1">
                                                        Designation : <span className="text-truncate mb-0">{currentUser.roles.map((r) => r)}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default SimplePage;
