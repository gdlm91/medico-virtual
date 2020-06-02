import React, { useCallback } from 'react';
import { Table, Input, Form } from 'antd';
import { Store } from 'antd/lib/form/interface';

import { VitalSignOptions } from '../db/constants';
import { AppointmentFormVitalSigns, AppointmentForm } from '../types';
import useRealtimeForm from '../hooks/useRealtimeForm';

interface Props {
    data?: AppointmentFormVitalSigns;
    disabled?: boolean;
    onValuesChange?: (value: AppointmentForm, step: keyof AppointmentForm) => void;
}

const VitalSigns: React.FC<Props> = ({ data, onValuesChange }) => {
    const transformedHandleOnValuesChange = useCallback(
        (values: Store) => {
            // We need to take the value out of the nested fields inside vitalSigns
            onValuesChange && onValuesChange({ vitalSigns: values }, 'vitalSigns');
        },
        [onValuesChange],
    );
    const { formRef, handleOnValuesChange } = useRealtimeForm(data, transformedHandleOnValuesChange);

    const columns = [
        {
            title: 'Descripción',
            dataIndex: 'name',
        },
        {
            title: 'Valor',
            dataIndex: 'value',
            // eslint-disable-next-line react/display-name
            render: (value: string, record: typeof VitalSignOptions[number]) => {
                return (
                    <Form.Item name={record.key}>
                        <Input />
                    </Form.Item>
                );
            },
        },
        {
            title: 'Unidad',
            dataIndex: 'unit',
        },
    ];

    return (
        <Form name="form" form={formRef} onValuesChange={handleOnValuesChange}>
            <Table pagination={false} bordered dataSource={VitalSignOptions} columns={columns} />
        </Form>
    );
};

export default VitalSigns;
