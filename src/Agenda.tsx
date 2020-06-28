import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Moment } from 'moment';
import { Calendar, Select } from 'antd';

import useAllAppointmentList, { QueryMode } from './hooks/useAllAppointmentList';
import AgendaEntries from './components/AgendaEntries';

const Agenda: React.FC<RouteComponentProps> = () => {
    const [mode, setMode] = useState<QueryMode>('week');
    const [date, setDate] = useState(new Date());
    const { response } = useAllAppointmentList(date, mode);

    const handleOnDateSelect = (value: Moment) => {
        setDate(value.toDate());
    };

    return (
        <>
            <h2>Consultas</h2>
            <Select value={mode} onChange={(value) => setMode(value)}>
                <Select.Option value="day">Dia</Select.Option>
                <Select.Option value="week">Semana</Select.Option>
            </Select>
            <Calendar fullscreen={false} mode="month" onSelect={handleOnDateSelect} />

            {response.data && <AgendaEntries date={date} entries={response.data} mode={mode} />}
        </>
    );
};

export default Agenda;
