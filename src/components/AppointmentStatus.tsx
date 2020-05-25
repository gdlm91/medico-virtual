import React from 'react';
import { Tag } from 'antd';
import { AppointmentStatusEnum } from '../types';

const StatusColors = {
    [AppointmentStatusEnum.pending]: 'processing',
    [AppointmentStatusEnum.waiting]: 'default',
    [AppointmentStatusEnum.cancelled]: 'error',
    [AppointmentStatusEnum.open]: 'warning',
    [AppointmentStatusEnum.closed]: 'success',
};

const StatusWording = {
    [AppointmentStatusEnum.pending]: 'Pendiente por pago',
    [AppointmentStatusEnum.waiting]: 'En espera',
    [AppointmentStatusEnum.cancelled]: 'Cancelada',
    [AppointmentStatusEnum.open]: 'Abierta',
    [AppointmentStatusEnum.closed]: 'Cerrada',
};

const AppointmentStatus: React.FC<{ status: AppointmentStatusEnum }> = ({ status }) => {
    return <Tag color={StatusColors[status]}>{StatusWording[status]}</Tag>;
};

export default AppointmentStatus;
