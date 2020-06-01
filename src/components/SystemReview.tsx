import React, { useCallback, useEffect } from 'react';
import { Form } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { debounce } from 'debounce';

import { AppointmentForm, AppointmentFormSystemReview } from '../types';
import { SystemReviewOptions } from '../db/constants';
import SelectList from './SelectList';

interface Props {
    data?: AppointmentFormSystemReview;
    disabled?: boolean;
    onValuesChange?: (value: AppointmentForm, step: keyof AppointmentForm) => void;
}

const SystemReview: React.FC<Props> = ({ data, onValuesChange }) => {
    const [formRef] = Form.useForm();

    const handleOnValuesChange = useCallback(
        debounce((changedValues: Store, { systemReview }: Store) => {
            if (!onValuesChange) {
                return;
            }

            onValuesChange({ systemReview: systemReview as AppointmentFormSystemReview }, 'systemReview');
        }, 5000),
        [onValuesChange],
    );

    useEffect(() => {
        // trigger any debonced update before destroying
        return () => handleOnValuesChange.flush();
    }, [handleOnValuesChange]);

    useEffect(() => {
        if (data) {
            formRef.setFieldsValue({ systemReview: data });
        }
    }, [formRef, data]);

    return (
        <Form form={formRef} layout="vertical" onValuesChange={handleOnValuesChange}>
            <SelectList name="systemReview" label="Sistema" options={SystemReviewOptions}></SelectList>
        </Form>
    );
};

export default SystemReview;
