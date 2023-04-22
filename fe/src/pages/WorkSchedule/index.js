import React, { useState, useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import { Row, Container, CardBody } from 'reactstrap';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Toolbar from 'react-big-calendar/lib/Toolbar';
import homeSvg from 'src/assets/icons/home.svg';
import profileSvg from 'src/assets/icons/profile.svg';
import { DAY_OF_WEEK } from '../../Constant';
import { GetVacations, Create } from 'src/Services/vacation.service';
import Tooltip from '../../Components/Common/Tooltip';
import { ToastContainer, toast } from 'react-toastify';
import { TOAST_CONFIG, VACATION_TYPES } from '../../Constant';
import TakeALeave from './TakeALeave';
import './index.scss';
import { formatTime } from 'src/helpers/common';

moment.locale('en', {
    week: {
        dow: 1,
    },
});
const localizer = momentLocalizer(moment);

const WorkSchedulePage = (props) => {
    const getData = async () => {
        // const events = await GetEvents();
        const vacations = await GetVacations();
        let data = [];
        vacations.forEach((r) => {
            let user = { id: r.user.id, name: r.user.first_name + ' ' + r.user.last_name, reason: r.user.reason };
            let start = moment(r.start);
            let end = moment(r.end);
            let n = end.diff(start, 'days');
            Array.from(Array(n), (_, i) => i).forEach((x) => {
                let day = moment(start).add(x, 'day');
                let index = data.findIndex((x) => {
                    return x.start.isSame(day);
                });
                let d = {};
                if (index >= 0) {
                    d = data[index];
                } else {
                    d = { start: day, end: day, events: [{}, {}], remotes: [], offs: [] };
                    data.push(d);
                }
                if (r.type === VACATION_TYPES[1].key) {
                    d.remotes.push(user);
                } else {
                    d.offs.push(user);
                }
            });
        });
        setEvents(data);
    };
    const [isShowVacation, setShowVacation] = useState(false);
    const [month, setMonth] = useState(moment()._d);
    const [events, setEvents] = useState([]);

    const createVacation = (vacation) => {
        Create(vacation)
            .then((res) => {
                toast.success('successfully !', TOAST_CONFIG);
                setShowVacation(false);
            })
            .catch((error) => {
                toast.error('Error !', error);
            });
    };

    const showFormCreate = () => {
        setShowVacation(!isShowVacation);
    };

    const closeFormCreate = () => {
        setShowVacation(false);
    };

    useEffect(() => {
        getData();
    }, [month]);

    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Zen8labs - Tools | Vacation Calendar</title>
                </MetaTags>
                <Container fluid>
                    <div className="card" id="Vacation">
                        <div className="card-header border-0">
                            <div className="d-flex align-items-center">
                                <h5 className="card-title mb-0 flex-grow-1">Work schedule</h5>
                                <div className="flex-shrink-0">
                                    <button type="button" onClick={() => showFormCreate()} className="btn btn-success">
                                        Take a leave
                                    </button>
                                </div>
                            </div>
                        </div>
                        <CardBody>
                            <Row>
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
                                                let day = DAY_OF_WEEK.find((x) => x.key == dayNumber + 1);
                                                return <span className="day-title">{day.value}</span>;
                                            },
                                            dateHeader: (e) => {
                                                return <span>{parseInt(e.label)}</span>;
                                            },
                                        },
                                    }}
                                />
                            </Row>
                        </CardBody>
                    </div>
                    <TakeALeave createVacation={createVacation} showFormCreate={isShowVacation} closeFormCreate={closeFormCreate} />
                </Container>
            </div>
            <ToastContainer />
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
                    {formatTime(this.props.date, 'MM/yyyy')}
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
    function pad(d) {
        return d < 10 ? '0' + d.toString() : d.toString();
    }
    return (
        <div>
            {/* {event.events.length > 0 ? (
                <div className="label-event">
                    <div>Event: {pad(event.events.length)}</div>
                </div>
            ) : (
                ''
            )} */}
            {event.remotes.length > 0 ? (
                <>
                    <div className="label-remote">
                        <div>
                            <img src={homeSvg} alt="remote" id={'Tooltip-remote-' + event.start} />
                            {pad(event.remotes.length)}
                        </div>
                    </div>
                    <Tooltip placement="top" target={'Tooltip-remote-' + event.start}>
                        {event.remotes.map((user, key) => {
                            return (
                                <div key={key} style={{ textAlign: 'start' }}>
                                    {user.name}
                                </div>
                            );
                        })}
                    </Tooltip>
                </>
            ) : (
                ''
            )}
            {event.offs.length > 0 ? (
                <>
                    <div className="label-off">
                        <div>
                            <img src={profileSvg} alt="off" id={'Tooltip-off-' + event.start} />
                            {pad(event.offs.length)}
                        </div>
                    </div>
                    <Tooltip placement="top" target={'Tooltip-off-' + event.start}>
                        {event.offs.map((user, key) => {
                            return (
                                <div key={key} style={{ textAlign: 'start' }}>
                                    {user.name}
                                </div>
                            );
                        })}
                    </Tooltip>
                </>
            ) : (
                ''
            )}
        </div>
    );
}
export default WorkSchedulePage;
