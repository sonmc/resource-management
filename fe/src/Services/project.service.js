import { APIClient } from '../helpers/api_helper';
const baseUrl = `${process.env.REACT_APP_API_URL}/projects`;
const api = new APIClient();

export const Get = (filter) => {
    return [
        {
            id: 1,
            projectName: 'Kidsenglish',
            notes: 'Some comment for this project',
            members: [
                {
                    name: 'Lê Đạt',
                    role: 'Dev',
                    workloads: [
                        {
                            weeks: [
                                {
                                    weekId: 1,
                                    value: '100',
                                },
                                {
                                    weekId: 2,
                                    value: '100',
                                },
                                {
                                    weekId: 3,
                                    value: '100',
                                },
                                {
                                    weekId: 4,
                                    value: '100',
                                },
                            ],
                        },
                        {
                            weeks: [
                                {
                                    weekId: 5,
                                    value: '100',
                                },
                                {
                                    weekId: 6,
                                    value: '100',
                                },
                                {
                                    value: '100',
                                },
                                {
                                    value: '100',
                                },
                            ],
                        },
                        {
                            weeks: [
                                {
                                    value: '100',
                                },
                                {
                                    value: '100',
                                },
                                {
                                    value: '100',
                                },
                                {
                                    value: '100',
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'Lê Đạt2',
                    role: 'Dev',
                    workloads: [
                        {
                            weeks: [
                                {
                                    value: '100',
                                },
                                {
                                    value: '100',
                                },
                                {
                                    value: '100',
                                },
                                {
                                    value: '100',
                                },
                            ],
                        },
                        {
                            weeks: [
                                {
                                    value: '100',
                                },
                                {
                                    value: '100',
                                },
                                {
                                    value: '100',
                                },
                                {
                                    value: '100',
                                },
                            ],
                        },
                        {
                            weeks: [
                                {
                                    value: '100',
                                },
                                {
                                    value: '100',
                                },
                                {
                                    value: '100',
                                },
                                {
                                    value: '100',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            id: 1,
            projectName: 'Vinmec',
            notes: 'Some comment for this project',
            members: [
                {
                    name: 'SonMc',
                    role: 'Dev',

                    workloads: [
                        {
                            weeks: [
                                {
                                    weekId: 1,
                                    value: '50',
                                },
                                {
                                    weekId: 2,
                                    value: '50',
                                },
                                {
                                    weekId: 3,
                                    value: '100',
                                },
                                {
                                    weekId: 4,
                                    value: '100',
                                },
                            ],
                        },
                        {
                            weeks: [
                                {
                                    weekId: 5,
                                    value: '100',
                                },
                                {
                                    weekId: 6,
                                    value: '100',
                                },
                                {
                                    value: '100',
                                },
                                {
                                    value: '100',
                                },
                            ],
                        },
                        {
                            weeks: [
                                {
                                    value: '100',
                                },
                                {
                                    value: '100',
                                },
                                {
                                    value: '100',
                                },
                                {
                                    value: '100',
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'Lê Đạt2',
                    role: 'Dev',
                    workloads: [
                        {
                            weeks: [
                                {
                                    value: '100',
                                },
                                {
                                    value: '100',
                                },
                                {
                                    value: '100',
                                },
                                {
                                    value: '100',
                                },
                            ],
                        },
                        {
                            weeks: [
                                {
                                    value: '100',
                                },
                                {
                                    value: '100',
                                },
                                {
                                    value: '100',
                                },
                                {
                                    value: '100',
                                },
                            ],
                        },
                        {
                            weeks: [
                                {
                                    value: '100',
                                },
                                {
                                    value: '100',
                                },
                                {
                                    value: '100',
                                },
                                {
                                    value: '100',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ];
    // return api.getWithToken(baseUrl);
};
export const Create = (params) => api.createWithToken(baseUrl, params);
