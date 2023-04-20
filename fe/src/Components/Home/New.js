import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import NewDetailModal from './DetailModal/NewDetailModal';
import { Swiper, SwiperSlide } from 'swiper/react';
import moment from 'moment';
import { Pagination, Navigation, Scrollbar, EffectFade, EffectCreative, Mousewheel, EffectFlip, EffectCoverflow, Autoplay } from 'swiper';
import 'swiper/css';
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
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                pagination={{
                    el: '.swiper-pagination',
                    clickable: true,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 50,
                    },
                }}
                modules={[Pagination]}
                className="mySwiper swiper responsive-swiper rounded gallery-light pb-4"
            >
                <div className="swiper-wrapper">
                    {news.map((item, key) => (
                        <SwiperSlide key={key}>
                            <div className="gallery-box card">
                                <div className="gallery-container">
                                    <img className="gallery-img img-fluid mx-auto" src={item.image} alt="" />
                                    <div className="gallery-overlay">
                                        <h5 className="overlay-caption">Project discussion with team</h5>
                                    </div>
                                </div>
                                <div className="box-content">
                                    <div className="d-flex align-items-center mt-1">
                                        <div className="flex-grow-1 text-muted">by Erica Kernan</div>
                                        <div className="flex-shrink-0">
                                            <div className="d-flex gap-3">
                                                <button type="button" className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0">
                                                    <i className="ri-thumb-up-fill text-muted align-bottom me-1"></i> 3.4K
                                                </button>
                                                <button type="button" className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0">
                                                    <i className="ri-question-answer-fill text-muted align-bottom me-1"></i> 1.3k
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </div>
            </Swiper>
            <NewDetailModal objectNewDetail={objectNewDetail} onCloseClick={onCloseClick} />
        </React.Fragment>
    );
};

export default News;
