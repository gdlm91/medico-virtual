import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import moment, { Moment } from 'moment';
import { Calendar, Select } from 'antd';

import useAllAppointmentList, { QueryMode } from './hooks/useAllAppointmentList';

const Agenda: React.FC<RouteComponentProps> = () => {
    const [mode, setMode] = useState<QueryMode>('week');
    const [date, setDate] = useState(moment().format('DD/MM/YYYY'));
    const { response } = useAllAppointmentList(date, mode);

    const handleOnDateSelect = (value: Moment) => {
        setDate(value.format('DD/MM/YYYY'));
    };

    return (
        <>
            <h2>Consultas</h2>
            <p>Modo:</p>
            <Select value={mode} onChange={(value) => setMode(value)}>
                <Select.Option value="day">Dia</Select.Option>
                <Select.Option value="week">Semana</Select.Option>
            </Select>
            <Calendar fullscreen={false} mode="month" onSelect={handleOnDateSelect} />
            <pre>
                <code>{JSON.stringify(response.data, null, 2)}</code>
            </pre>
        </>
    );
};

export default Agenda;
