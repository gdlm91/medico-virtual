/* eslint-disable react/display-name */
import React from 'react';
import { Table } from 'antd';

import { Appointment, AppointmentStatusEnum } from '../types';
import AppointmentStatus from './AppointmentStatus';
import { Link } from '@reach/router';

interface Props {
    appointments?: Appointment[];
}

const AppointmentHistory: React.FC<Props> = ({ appointments }) => {
    const columns = [
        {
            title: 'Fecha',
            dataIndex: 'date',
            width: '20%',
            render: (date: string, record: Appointment) => {
                return record.status !== AppointmentStatusEnum.cancelled &&
                    record.status !== AppointmentStatusEnum.pending ? (
                    <Link style={{ cursor: 'pointer' }} to={`/${record.$path}`}>
                        {date}
                    </Link>
                ) : (
                    <span>{date}</span>
                );
            },
        },
        {
            title: 'Diagnóstico',
            render: (_: unknown, record: Appointment) => (
                <span>{record.diagnosis || (record.status && <AppointmentStatus status={record.status} />)}</span>
            ),
        },
    ];

    return <Table pagination={false} rowKey="$key" dataSource={appointments} columns={columns} />;
};

AppointmentHistory.defaultProps = {
    appointments: [],
};

export default AppointmentHistory;
