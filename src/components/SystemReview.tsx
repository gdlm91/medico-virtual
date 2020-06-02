import React, { useCallback, useMemo } from 'react';
import { Form } from 'antd';
import { Store } from 'antd/lib/form/interface';

import { SystemReviewOptions } from '../db/constants';
import { AppointmentForm, AppointmentFormStep, AppointmentFormSystemReview } from '../types';
import useRealtimeForm from '../hooks/useRealtimeForm';
import SelectList from './SelectList';

interface Props {
    data?: AppointmentFormSystemReview;
    disabled?: boolean;
    onValuesChange?: (value: AppointmentForm, step: AppointmentFormStep) => void;
}

const SystemReview: React.FC<Props> = ({ data, onValuesChange }) => {
    const transformedData = useMemo(() => {
        // We need to put the information inside an object for SelectList to work properly
        return data && ({ systemReview: data } as AppointmentForm);
    }, [data]);
    const transformedHandleOnValuesChange = useCallback(
        (values: Store) => {
            // We need to take the value out of the nested fields inside systemReview
            onValuesChange && onValuesChange({ systemReview: values && values['systemReview'] }, 'systemReview');
        },
        [onValuesChange],
    );
    const { formRef, handleOnValuesChange } = useRealtimeForm(transformedData, transformedHandleOnValuesChange);

    return (
        <Form form={formRef} layout="vertical" onValuesChange={handleOnValuesChange}>
            <SelectList name="systemReview" label="Sistema" options={SystemReviewOptions}></SelectList>
        </Form>
    );
};

export default SystemReview;
