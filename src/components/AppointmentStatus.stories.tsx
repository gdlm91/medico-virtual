import React from 'react';

import AppointmentStatus from './AppointmentStatus';
import { AppointmentStatusEnum } from '../types';

export default {
    title: 'Estados de consultas',
    component: AppointmentStatus,
};

export const Default = () => {
    return (
        <>
            <p>
                <AppointmentStatus status={AppointmentStatusEnum.pending} />
            </p>
            <p>
                <AppointmentStatus status={AppointmentStatusEnum.waiting} />
            </p>
            <p>
                <AppointmentStatus status={AppointmentStatusEnum.cancelled} />
            </p>
            <p>
                <AppointmentStatus status={AppointmentStatusEnum.open} />
            </p>
            <p>
                <AppointmentStatus status={AppointmentStatusEnum.closed} />
            </p>
        </>
    );
};
