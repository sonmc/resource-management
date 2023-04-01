import { Calendar, momentLocalizer } from 'react-big-calendar';
import './index.scss';
import moment from 'moment';
import Toolbar from 'react-big-calendar/lib/Toolbar';
import homeSvg from '../../assets/icons/home.svg';
import profileSvg from '../../assets/icons/profile.svg';
import { DAY_OF_WEEK } from '../../Constant';
moment.locale('en', {
    week: {
        dow: 1,
    },
});
const localizer = momentLocalizer(moment);
let events = [
    {
        remote: '04',
        off: '03',
        event: '02',
        start: moment().add(-3, 'day'),
        end: moment().add(-3, 'day'),
    },
];
const dayOfWeek = DAY_OF_WEEK;
const MyCalendar = (props) => (
    <>
        <div className="page-content" style={{ paddingBottom: 0, background: '#fff' }}>
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
        </div>
    </>
);
class CustomToolbar extends Toolbar {
    render() {
        return (
            <div className="rbc-toolbar">
                <span className="rbc-btn-group">
                    <button type="button" onClick={() => this.navigate('PREV')}>
                        Tháng trước
                    </button>
                    <button type="button" onClick={() => this.navigate('NEXT')}>
                        Tháng sau
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
