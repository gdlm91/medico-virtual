import React from 'react';

import AppointmentHistory from './AppointmentHistory';
import { Appointment, AppointmentStatusEnum } from '../types';

export default {
    title: 'Historia de consultas',
    component: AppointmentHistory,
};

export const Default = () => {
    const appointments: Appointment[] = [
        {
            $key: '111',
            name: 'Fake name',
            $path: '',
            date: '01-01-2019',
            status: AppointmentStatusEnum.closed,
            time: '15:00',
            timestamp: 1234567890,
            diagnosis: 'Diagnosis',
        },
        {
            $key: '111',
            name: 'Fake name',
            $path: '',
            date: '01-01-2019',
            status: AppointmentStatusEnum.closed,
            time: '15:00',
            timestamp: 1234567890,
            diagnosis: 'Diagnosis',
        },
        {
            $key: '111',
            name: 'Fake name',
            $path: '',
            date: '01-01-2019',
            status: AppointmentStatusEnum.closed,
            time: '15:00',
            timestamp: 1234567890,
            diagnosis: 'Diagnosis',
        },
        {
            $key: '222',
            name: 'Fake name',
            $path: '',
            date: '25-01-2019',
            status: AppointmentStatusEnum.cancelled,
            time: '15:00',
            timestamp: 1234567890,
        },
        {
            $key: '222',
            name: 'Fake name',
            $path: '',
            date: '01-02-2019',
            status: AppointmentStatusEnum.open,
            time: '15:00',
            timestamp: 1234567890,
        },
    ];

    return <AppointmentHistory appointments={appointments} />;
};

export const Empty = () => {
    return <AppointmentHistory appointments={[]} />;
};
