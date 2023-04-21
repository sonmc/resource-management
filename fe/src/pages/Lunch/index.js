import React, { useCallback, useEffect, useState } from 'react';
import { Container, Table, CardBody, Card, CardHeader, Row, Col } from 'reactstrap';
import MetaTags from 'react-meta-tags';
import moment from 'moment';
import Flatpickr from 'react-flatpickr';
import { Get as GetLunch } from 'src/Services/lunch-order.service';
import MonthSelect from 'flatpickr/dist/plugins/monthSelect/index';
import 'flatpickr/dist/plugins/monthSelect/style.css';

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
            return { value: x.format('yyyy-MM-DD HH:mm:ss'), title: x.format('DD-MMM') };
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
                return moment(ld.date, 'DD/MM/YYYY').isSame(lc.value);
            });
            return { ...lc, lunchs: lunchByDay.filter((x) => x.value != 0) };
        });
        setTotal(data);
    }, [days, emps]);
    useEffect(() => {
        if (days.length === 0) return;
        GetLunch()
            .then((res) => {
                let data = res.map((x) => {
                    let lunchData = x.lunch_calendars;
                    x.lunch_calendars = days.map((lc) => {
                        let d = lunchData.find((ld) => {
                            return moment(ld.date, 'DD/MM/YYYY').isSame(lc.value);
                        });
                        return d ? { ...d, active: true } : { date: moment(lc.date).format('DD/MM/YYYY'), value: 0, active: false };
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
                            <div className="row">
                                <div className="table-responsive" style={{ paddingBottom: '1rem' }}>
                                    <Table className="table-bordered table-nowrap align-middle mb-0">
                                        <thead>
                                            <tr>
                                                <th colSpan="2">Total</th>
                                                {totals.map((x) => {
                                                    return (
                                                        <th scope="col" style={{ textAlign: 'center' }} key={x.value}>
                                                            {x.lunchs.filter((x) => x.value != 0).length}
                                                        </th>
                                                    );
                                                })}
                                            </tr>
                                            {LUNCH_TYPES.map((l, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <th colSpan="2">{l.name}</th>
                                                        {totals.map((x) => {
                                                            return (
                                                                <th scope="col" style={{ textAlign: 'center' }} key={`${x.value}${l.name}`}>
                                                                    {x.lunchs.filter((x) => x.value == l.value).length}
                                                                </th>
                                                            );
                                                        })}
                                                    </tr>
                                                );
                                            })}
                                            <tr>
                                                <th style={{ border: 'none' }}></th>
                                            </tr>
                                            <tr>
                                                <th scope="col">No.</th>
                                                <th scope="col">Full name</th>
                                                {days.map((x) => {
                                                    return (
                                                        <th scope="col" style={{ textAlign: 'center' }} key={x.value}>
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
                                                        <td className="fw-medium">{i + 1}</td>
                                                        <td>{fullname}</td>
                                                        {emp.lunch_calendars.map((d, j) => {
                                                            return (
                                                                <td key={`${i}${j}`} style={{ textAlign: 'center' }}>
                                                                    <select
                                                                        id="inputState"
                                                                        className="form-select"
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
                            </div>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default LunchPage;
