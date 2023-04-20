import React, { useEffect, useState } from 'react';
import NewDetailModal from './DetailModal/NewDetailModal';
import { Swiper, SwiperSlide } from 'swiper/react';
import moment from 'moment';
import { Pagination, Navigation, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './index.scss';

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
                        spaceBetween: 0,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 0,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 0,
                    },
                    1920: {
                        slidesPerView: 5,
                        spaceBetween: 0,
                    },
                }}
                modules={[Pagination, Navigation, Autoplay]}
                navigation={true}
                // autoplay={{ delay: 2500, disableOnInteraction: false }}
                className="mySwiper swiper responsive-swiper rounded gallery-light pb-4"
            >
                <div className="swiper-wrapper">
                    {news.map((item, key) => {
                        let content = item.content.replace(/<[^>]+>/g, '');
                        return (
                            <SwiperSlide
                                key={key}
                                onClick={() => {
                                    showNewDetail(item);
                                }}
                            >
                                <div className="mx-3 card">
                                    <div className="box-img thumbnail">
                                        <div className="img">
                                            <img src={item.image} alt="" />
                                        </div>
                                        {/* <div className="gallery-overlay">
                                        <h5 className="overlay-caption">Project discussion with team</h5>
                                    </div> */}
                                    </div>
                                    <div className="box-content p-4">
                                        <div className="d-flex mt-1">
                                            <h6 className="text-line-3">
                                                <b>{item.title}</b>
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </div>
            </Swiper>
            <NewDetailModal objectNewDetail={objectNewDetail} onCloseClick={onCloseClick} />
        </React.Fragment>
    );
};

export default News;
