import React, { useState, useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import { Col, Row, Container, CardBody, Label, FormGroup } from 'reactstrap';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import './index.scss';
import moment from 'moment';
import Toolbar from 'react-big-calendar/lib/Toolbar';
import homeSvg from '../../assets/icons/home.svg';
import profileSvg from '../../assets/icons/profile.svg';
import { DAY_OF_WEEK } from '../../Constant';
import { GetVacations } from '../../Services/vacation';

moment.locale('en', {
    week: {
        dow: 1,
    },
});
const localizer = momentLocalizer(moment);

const dayOfWeek = DAY_OF_WEEK;

const MyCalendar = (props) => {
    const getData = () => {
        let fake = [
            {
                remote: '04',
                off: '03',
                event: '02',
                start: moment(month),
                end: moment(month),
            },
        ];
        GetVacations()
            .then((res) => {
                setEvents(res);
            })
            .catch(() => {
                setEvents(fake);
            });
    };
    const [month, setMonth] = useState(moment()._d);
    const [events, setEvents] = useState([]);

    const onNavigate = (e) => {
        setMonth(e);
    };

    useEffect(() => {
        getData();
    }, [month]);

    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Resource management | Vacation Calendar</title>
                </MetaTags>
                <Container fluid>
                    <div className="card" id="Vacation">
                        <CardBody>
                            <Calendar
                                localizer={localizer}
                                className="custom-calendar"
                                startAccessor="start"
                                endAccessor="end"
                                style={{ height: `calc(100vh)`, background: '#fff' }}
                                views={{ month: true }}
                                events={events}
                                components={{
                                    toolbar: CustomToolbar,
                                    event: Event,
                                    month: {
                                        header: (e) => {
                                            let dayNumber = e.date.getDay();
                                            if (dayNumber === 0) dayNumber = 7;
                                            let day = dayOfWeek.find((x) => x.key == dayNumber + 1);
                                            return <span className="day-title">{day.value}</span>;
                                        },
                                        dateHeader: (e) => {
                                            return <span>{parseInt(e.label)}</span>;
                                        },
                                    },
                                }}
                            />
                        </CardBody>
                    </div>
                </Container>
            </div>
        </React.Fragment>
    );
};
class CustomToolbar extends Toolbar {
    render() {
        return (
            <div className="rbc-toolbar">
                <span className="rbc-btn-group">
                    <button type="button" onClick={() => this.navigate('PREV')}>
                        Last month
                    </button>
                    <button type="button" onClick={() => this.navigate('NEXT')}>
                        Next month
                    </button>
                </span>
                <span className="rbc-toolbar-label" style={{ position: 'absolute' }}>
                    {moment(this.props.date).format('MM/yyyy')}
                </span>
                <span className="rbc-toolbar-label"></span>
            </div>
        );
    }

    navigate = (action) => {
        this.props.onNavigate(action);
    };
}
function Event({ event }) {
    return (
        <div>
            <div className="label-event">
                <div>Event: {event.event}</div>
            </div>
            <div className="label-remote">
                <div>
                    <img src={homeSvg} alt="remote" />
                    {event.remote}
                </div>
            </div>
            <div className="label-off">
                <div>
                    <img src={profileSvg} alt="off" />
                    {event.off}
                </div>
            </div>
        </div>
    );
}
export default MyCalendar;
