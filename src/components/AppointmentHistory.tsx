import React from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import { Appointment } from '../types';
import AppointmentStatus from './AppointmentStatus';

type ColumnsProps = ColumnsType<Appointment>;

interface DynamicCellProps {
    title: React.ReactNode;
    dynamic: boolean;
    dataIndex: string;
    record: Appointment;
}

const DynamicCell: React.FC<DynamicCellProps> = ({ dynamic, children, record = {} }) => {
    const childNode = !dynamic ? (
        children
    ) : (
        <div>{record.diagnosis || (record.status && <AppointmentStatus status={record.status} />)}</div>
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { $key, ...restProps } = record;

    return <td {...restProps}>{childNode}</td>;
};

interface Props {
    appointments?: Appointment[];
}

const AppointmentHistory: React.FC<Props> = ({ appointments }) => {
    const columns = [
        {
            title: 'Fecha',
            dataIndex: 'date',
            width: '20%',
        },
        {
            title: 'Diagnóstico',
            dynamic: true,
        },
    ];
    const components = {
        body: {
            cell: DynamicCell,
        },
    };

    const columnsProps: ColumnsProps = columns.map((col) => {
        if (!col.dynamic) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                dynamic: col.dynamic,
                dataIndex: col.dataIndex,
                title: col.title,
            }),
        };
    });

    return (
        <Table
            pagination={false}
            components={components}
            rowKey="$key"
            dataSource={appointments}
            columns={columnsProps}
        />
    );
};

AppointmentHistory.defaultProps = {
    appointments: [],
};

export default AppointmentHistory;
