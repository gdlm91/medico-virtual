import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Moment } from 'moment';
import { Calendar, Select, Row, Col } from 'antd';

import useAllAppointmentList, { QueryMode } from './hooks/useAllAppointmentList';
import AgendaEntries from './components/AgendaEntries';

interface CalendarHeaderProps {
    value: Moment;
    mode: QueryMode;
    onChange: (date: Moment) => void;
    onModeChange: (mode: QueryMode) => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ value, onChange, mode, onModeChange }) => {
    const monthsShort = value.localeData().monthsShort();
    const month = value.month();
    const months = [];
    for (let i = 0; i < 12; i++) {
        months.push(
            <Select.Option key={i} value={i}>
                {monthsShort[i]}
            </Select.Option>,
        );
    }

    const year = value.year();
    const years = [];
    for (let i = year - 10; i < year + 10; i += 1) {
        years.push(
            <Select.Option key={i} value={i}>
                {i}
            </Select.Option>,
        );
    }

    return (
        <Row gutter={8} justify="space-between" style={{ margin: '0 0 15px' }}>
            <Col>
                <label>Vista por:</label>
                <Select
                    style={{ margin: '0 15px' }}
                    value={mode}
                    onChange={onModeChange}
                    dropdownMatchSelectWidth={false}
                >
                    <Select.Option value="day">Día</Select.Option>
                    <Select.Option value="week">Semana</Select.Option>
                </Select>
            </Col>
            <Col>
                <label>Mes: </label>
                <Select
                    style={{ margin: '0 15px' }}
                    dropdownMatchSelectWidth={false}
                    value={month}
                    onChange={(selectedMonth) => {
                        const now = value.clone().month(Number(selectedMonth));
                        onChange(now);
                    }}
                >
                    {months}
                </Select>
                <label>Año: </label>
                <Select
                    style={{ margin: '0 15px' }}
                    dropdownMatchSelectWidth={false}
                    value={year}
                    onChange={(selectedYear) => {
                        const now = value.clone().year(Number(selectedYear));
                        onChange(now);
                    }}
                >
                    {years}
                </Select>
            </Col>
        </Row>
    );
};

const Agenda: React.FC<RouteComponentProps> = () => {
    const [mode, setMode] = useState<QueryMode>('week');
    const [date, setDate] = useState(new Date());
    const { response } = useAllAppointmentList(date, mode);

    const handleOnDateSelect = (value: Moment) => {
        setDate(value.toDate());
    };

    return (
        <>
            <Calendar
                fullscreen={false}
                mode="month"
                onSelect={handleOnDateSelect}
                style={{ margin: '0 0 25px' }}
                headerRender={({ value, onChange }) => (
                    <CalendarHeader
                        value={value}
                        onChange={onChange}
                        onModeChange={(mode) => setMode(mode)}
                        mode={mode}
                    />
                )}
            />

            {response.data && <AgendaEntries date={date} entries={response.data} mode={mode} />}
        </>
    );
};

export default Agenda;
