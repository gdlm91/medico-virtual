import React, { useCallback } from 'react';
import { Input, Form } from 'antd';
import { Store } from 'antd/lib/form/interface';

import { AppointmentFormTreatment, AppointmentForm } from '../types';
import useRealtimeForm from '../hooks/useRealtimeForm';

interface Props {
    data?: AppointmentFormTreatment;
    disabled?: boolean;
    onValuesChange?: (value: AppointmentForm) => void;
}

const Treatment: React.FC<Props> = ({ data, onValuesChange, disabled }) => {
    const transformedHandleOnValuesChange = useCallback(
        (values: Store) => {
            onValuesChange && onValuesChange({ treatment: values });
        },
        [onValuesChange],
    );
    const { formRef, handleOnValuesChange } = useRealtimeForm(data, transformedHandleOnValuesChange);

    return (
        <Form form={formRef} layout="vertical" onValuesChange={handleOnValuesChange}>
            <fieldset disabled={disabled}>
                <Form.Item label="Tratamiento" name="treatment">
                    <Input.TextArea autoSize={{ minRows: 5 }} />
                </Form.Item>
                <Form.Item label="Observaciones a Familiares" name="observations">
                    <Input.TextArea autoSize={{ minRows: 5 }} />
                </Form.Item>
            </fieldset>
        </Form>
    );
};

export default Treatment;
