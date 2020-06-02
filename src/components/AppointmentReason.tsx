import React, { useCallback } from 'react';
import { Input, Form } from 'antd';
import { Store } from 'antd/lib/form/interface';

import { AppointmentForm, AppointmentFormReason, AppointmentFormStep } from '../types';
import useRealtimeForm from '../hooks/useRealtimeForm';

interface Props {
    data?: AppointmentFormReason;
    disabled?: boolean;
    onValuesChange?: (value: AppointmentForm, step: AppointmentFormStep) => void;
}

const AppointmentReason: React.FC<Props> = ({ data, onValuesChange }) => {
    const wrappedCallback = useCallback(
        (values: Store) => {
            onValuesChange && onValuesChange({ reason: values as AppointmentFormReason }, 'reason');
        },
        [onValuesChange],
    );
    const { formRef, handleOnValuesChange } = useRealtimeForm(data, wrappedCallback);

    return (
        <Form form={formRef} layout="vertical" onValuesChange={handleOnValuesChange}>
            <Form.Item label="Motivo de consulta" name="reason">
                <Input.TextArea autoSize={{ minRows: 5, maxRows: 5 }} />
            </Form.Item>
            <Form.Item label="Enfermedad actual" name="sickness">
                <Input.TextArea autoSize={{ minRows: 5, maxRows: 5 }} />
            </Form.Item>
        </Form>
    );
};

export default AppointmentReason;
