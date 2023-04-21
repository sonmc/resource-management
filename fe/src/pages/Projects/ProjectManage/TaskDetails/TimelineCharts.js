import React from 'react';
import ReactApexChart from "react-apexcharts";
import * as moment from "moment";

const Basic = () => {
    const series = [
        {
            data: [
                {
                    x: "Code",
                    y: [
                        new Date("2019-03-02").getTime(),
                        new Date("2019-03-04").getTime(),
                    ],
                },
                {
                    x: "Test",
                    y: [
                        new Date("2019-03-04").getTime(),
                        new Date("2019-03-08").getTime(),
                    ],
                },
                {
                    x: "Validation",
                    y: [
                        new Date("2019-03-08").getTime(),
                        new Date("2019-03-12").getTime(),
                    ],
                },
                {
                    x: "Deployment",
                    y: [
                        new Date("2019-03-12").getTime(),
                        new Date("2019-03-18").getTime(),
                    ],
                },
            ],
        },
    ];

    const options = {
        chart: {
            toolbar: {
                show: !1,
            },
        },
        plotOptions: {
            bar: {
                horizontal: !0,
            },
        },
        xaxis: {
            type: "datetime",
        },
        colors: ["#405189"],
    };

    return (
        <React.Fragment>
            <ReactApexChart
                options={options}
                series={series}
                type="rangeBar"
                height={350}
            />
        </React.Fragment>
    );
};

const DifferentColor = () => {
    const series = [
        {
            data: [
                {
                    x: "Analysis",
                    y: [
                        new Date("2019-02-27").getTime(),
                        new Date("2019-03-04").getTime(),
                    ],
                    fillColor: "#405189",
                },
                {
                    x: "Design",
                    y: [
                        new Date("2019-03-04").getTime(),
                        new Date("2019-03-08").getTime(),
                    ],
                    fillColor: "#f06548",
                },
                {
                    x: "Coding",
                    y: [
                        new Date("2019-03-07").getTime(),
                        new Date("2019-03-10").getTime(),
                    ],
                    fillColor: "#0ab39c",
                },
                {
                    x: "Testing",
                    y: [
                        new Date("2019-03-08").getTime(),
                        new Date("2019-03-12").getTime(),
                    ],
                    fillColor: "#f7b84b",
                },
                {
                    x: "Deployment",
                    y: [
                        new Date("2019-03-12").getTime(),
                        new Date("2019-03-17").getTime(),
                    ],
                    fillColor: "#299cdb",
                },
            ],
        },
    ];

    const options = {
        chart: {
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: true,
                distributed: true,
                dataLabels: {
                    hideOverflowingLabels: false,
                },
            },
        },
        dataLabels: {
            enabled: true,
            formatter: function (val, opts) {
                var label = opts.w.globals.labels[opts.dataPointIndex];
                var a = moment(val[0]);
                var b = moment(val[1]);
                var diff = b.diff(a, "days");
                return label + ": " + diff + (diff > 1 ? " days" : " day");
            },
        },
        xaxis: {
            type: "datetime",
        },
        yaxis: {
            show: true,
        },
    };

    return (
        <React.Fragment>
            <ReactApexChart
                options={options}
                series={series}
                type="rangeBar"
                height={350}
            />
        </React.Fragment>
    );
};

const MultiSeries = () => {
    const series = [
        {
            name: "Bob",
            data: [
                {
                    x: "Design",
                    y: [
                        new Date("2019-03-05").getTime(),
                        new Date("2019-03-08").getTime(),
                    ],
                },
                {
                    x: "Code",
                    y: [
                        new Date("2019-03-08").getTime(),
                        new Date("2019-03-11").getTime(),
                    ],
                },
                {
                    x: "Test",
                    y: [
                        new Date("2019-03-11").getTime(),
                        new Date("2019-03-16").getTime(),
                    ],
                },
            ],
        },
        {
            name: "Joe",
            data: [
                {
                    x: "Design",
                    y: [
                        new Date("2019-03-02").getTime(),
                        new Date("2019-03-05").getTime(),
                    ],
                },
                {
                    x: "Code",
                    y: [
                        new Date("2019-03-06").getTime(),
                        new Date("2019-03-09").getTime(),
                    ],
                },
                {
                    x: "Test",
                    y: [
                        new Date("2019-03-10").getTime(),
                        new Date("2019-03-19").getTime(),
                    ],
                },
            ],
        },
    ];

    var options = {
        chart: {
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                var a = moment(val[0]);
                var b = moment(val[1]);
                var diff = b.diff(a, "days");
                return diff + (diff > 1 ? " days" : " day");
            },
        },
        fill: {
            type: "gradient",
            gradient: {
                shade: "light",
                type: "vertical",
                shadeIntensity: 0.25,
                gradientToColors: undefined,
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [50, 0, 100, 100],
            },
        },
        xaxis: {
            type: "datetime",
        },
        legend: {
            position: "top",
        },
        colors: ["#405189", "#0ab39c"],
    };

    return (
        <React.Fragment>
            <ReactApexChart
                options={options}
                series={series}
                type="rangeBar"
                height={350}
            />
        </React.Fragment>
    );
};

const Advanced = () => {
    const series = [
        {
            name: "Bob",
            data: [
                {
                    x: "Design",
                    y: [
                        new Date("2019-03-05").getTime(),
                        new Date("2019-03-08").getTime(),
                    ],
                },
                {
                    x: "Code",
                    y: [
                        new Date("2019-03-02").getTime(),
                        new Date("2019-03-05").getTime(),
                    ],
                },
                {
                    x: "Code",
                    y: [
                        new Date("2019-03-05").getTime(),
                        new Date("2019-03-07").getTime(),
                    ],
                },
                {
                    x: "Test",
                    y: [
                        new Date("2019-03-03").getTime(),
                        new Date("2019-03-09").getTime(),
                    ],
                },
                {
                    x: "Test",
                    y: [
                        new Date("2019-03-08").getTime(),
                        new Date("2019-03-11").getTime(),
                    ],
                },
                {
                    x: "Validation",
                    y: [
                        new Date("2019-03-11").getTime(),
                        new Date("2019-03-16").getTime(),
                    ],
                },
                {
                    x: "Design",
                    y: [
                        new Date("2019-03-01").getTime(),
                        new Date("2019-03-03").getTime(),
                    ],
                },
            ],
        },
        {
            name: "Joe",
            data: [
                {
                    x: "Design",
                    y: [
                        new Date("2019-03-02").getTime(),
                        new Date("2019-03-05").getTime(),
                    ],
                },
                {
                    x: "Test",
                    y: [
                        new Date("2019-03-06").getTime(),
                        new Date("2019-03-16").getTime(),
                    ],
                },
                {
                    x: "Code",
                    y: [
                        new Date("2019-03-03").getTime(),
                        new Date("2019-03-07").getTime(),
                    ],
                },
                {
                    x: "Deployment",
                    y: [
                        new Date("2019-03-20").getTime(),
                        new Date("2019-03-22").getTime(),
                    ],
                },
                {
                    x: "Design",
                    y: [
                        new Date("2019-03-10").getTime(),
                        new Date("2019-03-16").getTime(),
                    ],
                },
            ],
        },
        {
            name: "Dan",
            data: [
                {
                    x: "Code",
                    y: [
                        new Date("2019-03-10").getTime(),
                        new Date("2019-03-17").getTime(),
                    ],
                },
                {
                    x: "Validation",
                    y: [
                        new Date("2019-03-05").getTime(),
                        new Date("2019-03-09").getTime(),
                    ],
                },
            ],
        },
    ];

    const options = {
        chart: {
            toolbar: {
                show: !1,
            },
        },
        plotOptions: {
            bar: {
                horizontal: !0,
                barHeight: "80%",
            },
        },
        xaxis: {
            type: "datetime",
        },
        stroke: {
            width: 1,
        },
        fill: {
            type: "solid",
            opacity: 0.6,
        },
        legend: {
            position: "top",
            horizontalAlign: "left",
        },
        colors: ["#405189", "#0ab39c", "#f7b84b"],
    };

    return (
        <React.Fragment>
            <ReactApexChart
                options={options}
                series={series}
                type="rangeBar"
                height={350}
            />
        </React.Fragment>
    );
};

export {
    Basic,
    DifferentColor,
    MultiSeries,
    Advanced
};