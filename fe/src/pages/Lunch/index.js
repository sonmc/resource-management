import React, { useCallback, useEffect, useState } from 'react';
import { Container, Table, CardBody, Card, CardHeader, Row, Col } from 'reactstrap';
import MetaTags from 'react-meta-tags';
import moment from 'moment';
import Flatpickr from 'react-flatpickr';
import { Get as GetLunch } from 'src/Services/lunch-order.service';
import MonthSelect from 'flatpickr/dist/plugins/monthSelect/index';
import 'flatpickr/dist/plugins/monthSelect/style.css';
import { formatTime } from 'src/helpers/common';
import './index.scss';
import { useRecoilValue } from 'recoil';
import { currentUserAtom } from 'src/Recoil/states';
const checkPi = (value) => {
    return moment(value).startOf('day').set('hour', 10).isBefore(moment());
};

function getDaysArrayByMonth(month) {
    let _month = month.clone();
    var daysInMonth = _month.daysInMonth();
    var arrDays = [];
    while (daysInMonth) {
        var current = _month.clone().startOf('day').date(daysInMonth);
        let dayNumber = current.day();
        if (dayNumber !== 0 && dayNumber !== 6) {
            arrDays.push(current);
        }
        daysInMonth--;
    }
    return arrDays
        .map((x) => {
            let disabled = checkPi(x);
            return { date: x.format('yyyy-MM-DD HH:mm:ss'), title: x.format('DD-MMM'), disabled, classDisabled: disabled ? 'disabled-col' : '' };
        })
        .reverse();
}

const LUNCH_TYPES = [
    {
        name: 'Normal',
        value: 2,
    },
    {
        name: 'Less rice',
        value: 1,
    },
];
const LunchPage = () => {
    const currentUser = useRecoilValue(currentUserAtom);

    const [days, setDays] = useState([]);
    const [totals, setTotal] = useState([]);
    const [emps, setEmp] = useState([]);
    const [month, setMonth] = useState(moment().startOf('day').startOf('month'));

    useEffect(() => {
        setDays(getDaysArrayByMonth(month));
    }, [month]);
    useEffect(() => {
        let lunchs = emps.reduce((prev, current) => {
            return prev.concat(current.lunch_calendars || []);
        }, []);
        let data = days.map((lc) => {
            let lunchByDay = lunchs.filter((ld) => {
                return moment(ld.date).isSame(lc.date);
            });
            return { ...lc, lunchs: lunchByDay };
        });
        setTotal(data);
    }, [days, emps]);

    useEffect(() => {
        if (days.length === 0) return;
        let isAdmin = currentUser.role_ids.includes(1);
        GetLunch()
            .then((res) => {
                let data = res
                    .filter((x) => {
                        return isAdmin || x.user.id === currentUser.id;
                    })
                    .map((x) => {
                        let lunchData = x.lunch_calendars;
                        x.lunch_calendars = days.map((lc) => {
                            let d = lunchData.find((ld) => {
                                return moment(ld.date).isSame(lc.date);
                            });
                            return d
                                ? { ...d, active: true, disabled: isAdmin ? false : lc.disabled, classDisabled: isAdmin ? '' : lc.classDisabled }
                                : {
                                      date: formatTime(lc.date),
                                      value: 0,
                                      active: false,
                                      disabled: isAdmin ? false : lc.disabled,
                                      classDisabled: isAdmin ? '' : lc.classDisabled,
                                  };
                        });

                        return x;
                    });
                setEmp(data);
            })
            .catch(() => {});
    }, [days]);

    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Zen8labs - Tools | Lunch Order</title>
                </MetaTags>
                <Container fluid>
                    <Card>
                        <CardHeader>
                            <div className="d-flex align-items-center">
                                <h5 className="card-title me-4 mb-0">Lunch order</h5>
                                <div>
                                    <Flatpickr
                                        placeholder="Select start date"
                                        className="form-control"
                                        options={{
                                            plugins: [new MonthSelect({})],
                                            defaultDate: month._d,
                                        }}
                                        onChange={(data) => {
                                            setMonth(moment(data[0]));
                                        }}
                                    />
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody className="">
                            <div className="table-scroll-fixed">
                                <Table className="table-bordered table-nowrap align-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th>
                                                <div>Total</div>
                                            </th>
                                            {totals.map((x) => {
                                                let keys = LUNCH_TYPES.map((x) => x.key);
                                                return (
                                                    <th scope="col" key={x.date} className={x.classDisabled}>
                                                        {x.lunchs.filter((l) => keys.includes(l.value)).length}
                                                    </th>
                                                );
                                            })}
                                        </tr>
                                        {LUNCH_TYPES.map((lt, i) => {
                                            return (
                                                <tr key={i}>
                                                    <th>
                                                        <div>{lt.name}</div>
                                                    </th>

                                                    {totals.map((t) => {
                                                        return (
                                                            <th scope="col" key={`${t.date}${lt.name}`}>
                                                                {t.lunchs.filter((l) => l.value == lt.value).length}
                                                            </th>
                                                        );
                                                    })}
                                                </tr>
                                            );
                                        })}
                                        <tr>
                                            <th scope="col">
                                                <div>
                                                    <div>No.</div>
                                                    <div>Full name</div>
                                                </div>
                                            </th>
                                            {days.map((x) => {
                                                return (
                                                    <th scope="col" key={x.date} className={x.classDisabled}>
                                                        {x.title}
                                                    </th>
                                                );
                                            })}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {emps.map((emp, i) => {
                                            let employee = emp.user;
                                            let fullname = employee.first_name + ' ' + employee.last_name;
                                            return (
                                                <tr key={employee.id}>
                                                    <td className="first-col">
                                                        <div>
                                                            <div>{i + 1}</div>
                                                            <div>{fullname}</div>
                                                        </div>
                                                    </td>
                                                    {emp.lunch_calendars.map((d, j) => {
                                                        let isPi = checkPi(d.date);
                                                        return (
                                                            <td key={`${i}${j}`}>
                                                                <select
                                                                    id="inputState"
                                                                    className={`form-select ${d.value == -1 ? 'select-danger' : ''}`}
                                                                    disabled={d.disabled}
                                                                    onChange={(event) => {
                                                                        d.value = event.target.value;
                                                                        setEmp((prevEmps) => {
                                                                            return prevEmps.map((e) => {
                                                                                if (e.user.id == emp.user.id) {
                                                                                    return { ...emp };
                                                                                } else {
                                                                                    return e;
                                                                                }
                                                                            });
                                                                        });
                                                                    }}
                                                                    value={d.value}
                                                                    style={{ width: 130, border: 0 }}
                                                                >
                                                                    <option value={0}>No</option>
                                                                    <option value={-1} disabled={!isPi}>
                                                                        Pi
                                                                    </option>
                                                                    {LUNCH_TYPES.map((x) => {
                                                                        return (
                                                                            <option key={x.value} value={x.value}>
                                                                                {x.name}
                                                                            </option>
                                                                        );
                                                                    })}
                                                                </select>
                                                            </td>
                                                        );
                                                    })}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            </div>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default LunchPage;
