import React, { useCallback } from 'react';
import { Input, Form } from 'antd';
import { Store } from 'antd/lib/form/interface';

import { AppointmentForm, AppointmentFormReason } from '../types';
import useRealtimeForm from '../hooks/useRealtimeForm';

interface Props {
    data?: AppointmentFormReason;
    disabled?: boolean;
    onValuesChange?: (value: AppointmentForm) => void;
}

const AppointmentReason: React.FC<Props> = ({ data, onValuesChange, disabled }) => {
    const wrappedCallback = useCallback(
        (values: Store) => {
            onValuesChange && onValuesChange({ reason: values as AppointmentFormReason });
        },
        [onValuesChange],
    );
    const { formRef, handleOnValuesChange } = useRealtimeForm(data, wrappedCallback);

    return (
        <Form form={formRef} layout="vertical" onValuesChange={handleOnValuesChange}>
            <fieldset disabled={disabled}>
                <Form.Item label="Motivo de consulta" name="reason">
                    <Input.TextArea autoSize={{ minRows: 5, maxRows: 5 }} />
                </Form.Item>
                <Form.Item label="Enfermedad actual" name="sickness">
                    <Input.TextArea autoSize={{ minRows: 5, maxRows: 5 }} />
                </Form.Item>
            </fieldset>
        </Form>
    );
};

export default AppointmentReason;
