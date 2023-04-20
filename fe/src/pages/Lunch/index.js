import React, { useCallback, useEffect, useState } from 'react';
import { Container, Table, CardBody, Card, CardHeader, Row, Col } from 'reactstrap';
import MetaTags from 'react-meta-tags';
import moment from 'moment';
import Flatpickr from 'react-flatpickr';
import { Get as GetEmployees } from 'src/Services/user.service';
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
            return { week: x.week(), value: x.format('yyyy-MM-DD HH:mm:ss'), title: x.format('DD-MMM'), timestamp: x.unix(), data: [] };
        })
        .reverse();
}
const generateDataFake = (arr, value) => {
    return arr.map((x) => {
        return { id: 0, lunch_type: 1, user_id: x.id, date: value };
    });
};
const LUNCH_TYPES = [
    {
        name: 'Normal',
        value: 1,
    },
    {
        name: 'Less rice',
        value: 2,
    },
];
const LunchPage = () => {
    const [employees, setEmployees] = useState([]);
    const [days, setDays] = useState([]);
    const [dataLunch, setDataLunchs] = useState([]);
    const [month, setMonth] = useState(moment().startOf('day').startOf('month'));

    const fetchEmployee = () => {
        GetEmployees({
            status: 1,
        }).then((res) => {
            setEmployees(res);
        });
    };

    useEffect(() => {
        fetchEmployee();
    }, []);

    useEffect(() => {
        setDays(getDaysArrayByMonth(month));
    }, [month]);

    useEffect(() => {
        if (days.length === 0) return;
        GetLunch()
            .then((res) => {
                // setDays(res);
                //fake
                if (employees.length === 0) return;
                let d = days.map((x) => {
                    x.data = generateDataFake(employees, x.value);
                    return x;
                });
                setDataLunchs(d);
                // fake
            })
            .catch(() => {
                if (employees.length === 0) return;
                let d = days.map((x) => {
                    x.data = generateDataFake(employees, x.value);
                    return x;
                });
                setDataLunchs(d);
            });
    }, [days, employees]);

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
                                                {dataLunch.map((x) => {
                                                    return (
                                                        <th scope="col" style={{ textAlign: 'center' }} key={x.timestamp}>
                                                            {x.data.filter((d) => d.lunch_type !== 0).length}
                                                        </th>
                                                    );
                                                })}
                                            </tr>
                                            {LUNCH_TYPES.map((l, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <th colSpan="2">{l.name}</th>
                                                        {dataLunch.map((x) => {
                                                            return (
                                                                <th scope="col" style={{ textAlign: 'center' }} key={x.timestamp}>
                                                                    {x.data.filter((d) => d.lunch_type === l.value).length}
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
                                                {dataLunch.map((x) => {
                                                    return (
                                                        <th scope="col" style={{ textAlign: 'center' }} key={x.timestamp}>
                                                            {x.title}
                                                        </th>
                                                    );
                                                })}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {employees.map((employee, i) => {
                                                let fullname = employee.first_name + ' ' + employee.last_name;
                                                return (
                                                    <tr key={employee.id}>
                                                        <td className="fw-medium">{i + 1}</td>
                                                        <td>{fullname}</td>
                                                        {dataLunch.map((d) => {
                                                            let lunch = d.data.find(
                                                                (x) => x.user_id === employee.id && moment(d.value).isSame(x.date)
                                                            );
                                                            return (
                                                                <td key={d.timestamp} style={{ textAlign: 'center' }}>
                                                                    <select
                                                                        id="inputState"
                                                                        className="form-select"
                                                                        onChange={(event) => {
                                                                            let _data = dataLunch.map((day) => {
                                                                                day.data = day.data.map((x) => {
                                                                                    if (moment(d.value).isSame(x.date) && employee.id === x.user_id) {
                                                                                        x.lunch_type = parseInt(event.target.value);
                                                                                    }

                                                                                    return x;
                                                                                });
                                                                                return day;
                                                                            });
                                                                            setDataLunchs(_data);
                                                                        }}
                                                                        value={lunch.lunch_type}
                                                                        style={{ width: 130, border: 0 }}
                                                                    >
                                                                        <option value="0">No</option>
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
