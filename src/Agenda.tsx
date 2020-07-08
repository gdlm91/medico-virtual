import React, { useState, useMemo } from 'react';
import { RouteComponentProps } from '@reach/router';
import moment, { Moment } from 'moment';
import { Select, Row, Col, Skeleton, DatePicker } from 'antd';

import useAllAppointmentList, { QueryMode } from './hooks/useAllAppointmentList';
import AgendaEntries from './components/AgendaEntries';

const Agenda: React.FC<RouteComponentProps> = () => {
    const [mode, setMode] = useState<QueryMode>('week');
    const [date, setDate] = useState(moment());
    const dateAsDate = useMemo(() => date.toDate(), [date]);
    const { response } = useAllAppointmentList(dateAsDate, mode);

    const handleOnDateSelect = (value: Moment | null) => {
        if (!value) {
            return;
        }

        setDate(value);
    };

    return (
        <>
            <Row style={{ margin: '0 0 25px' }} justify="space-between">
                <Col>
                    <label>Fecha:</label>
                    <DatePicker
                        style={{ margin: '0 15px' }}
                        onChange={handleOnDateSelect}
                        defaultValue={date}
                        format="DD-MM-YYYY"
                    />
                </Col>
                <Col>
                    <label>Vista por:</label>
                    <Select
                        style={{ margin: '0 15px' }}
                        value={mode}
                        onChange={(value) => setMode(value)}
                        dropdownMatchSelectWidth={false}
                    >
                        <Select.Option value="day">Día</Select.Option>
                        <Select.Option value="week">Semana</Select.Option>
                    </Select>
                </Col>
            </Row>

            <Skeleton loading={response.loading && !response.data} active={true}>
                {response.data && <AgendaEntries date={date} entries={response.data} mode={mode} />}
            </Skeleton>
        </>
    );
};

export default Agenda;
