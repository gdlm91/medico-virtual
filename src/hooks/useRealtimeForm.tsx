import { useCallback, useEffect } from 'react';
import { Form } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { debounce } from 'debounce';

export type OnValuesChange = (allValues: Store) => void;

const noop: OnValuesChange = () => {
    /**noop */
};

const useRealtimeForm = <T,>(data: T, onValuesChange = noop) => {
    const [formRef] = Form.useForm();

    const handleOnValuesChange = useCallback(
        debounce((changedValues: Store, allValues: Store) => {
            onValuesChange(allValues);
        }, 5000),
        [onValuesChange],
    );

    useEffect(() => {
        // trigger any debonced update before destroying
        return () => handleOnValuesChange.flush();
    }, [handleOnValuesChange]);

    useEffect(() => {
        if (data) {
            formRef.setFieldsValue(data);
        }
    }, [formRef, data]);

    return { formRef, handleOnValuesChange };
};

export default useRealtimeForm;
