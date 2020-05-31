import React, { useState, useCallback, useEffect } from 'react';
import { Checkbox, DatePicker, Form, Row, Col, Input } from 'antd';
import { debounce } from 'debounce';

import { AppointmentForm, AppointmentFormResults } from '../types';
import { Store } from 'antd/lib/form/interface';
import moment, { Moment } from 'moment';

interface Props {
    data?: AppointmentFormResults;
    disabled?: boolean;
    onValuesChange?: (value: AppointmentForm, step: keyof AppointmentForm) => void;
}

const storeToData = (store: Store): AppointmentFormResults => {
    const data: AppointmentFormResults = {};

    if (store.lab) {
        data.lab = {
            observations: store.lab.observations,
            date: (store.lab.date as Moment).format('DD-MM-YYYY'),
        };
    }

    if (store.images) {
        data.images = {
            observations: store.images.observations,
            date: (store.images.date as Moment).format('DD-MM-YYYY'),
        };
    }

    return data;
};

const dataToStore = (data: AppointmentFormResults): Store => {
    return {
        lab: data.lab && {
            observations: data.lab.observations,
            date: moment(data.lab.date, 'DD-MM-YYYY'),
        },
        images: data.images && {
            observations: data.images.observations,
            date: moment(data.images.date, 'DD-MM-YYYY'),
        },
    };
};

const LabResults: React.FC<Props> = ({ data, onValuesChange }) => {
    const [formRef] = Form.useForm();
    const [labDisabled, setLabDisabled] = useState(!Boolean(data?.lab));
    const [imagesDisabled, setImagesDisabled] = useState(!Boolean(data?.images));

    const handleOnValuesChange = useCallback(
        debounce((changedValues: Store, allValues: Store) => {
            if (!onValuesChange) {
                return;
            }

            onValuesChange({ results: storeToData(allValues) }, 'results');
        }, 5000),
        [onValuesChange],
    );

    const toggleLabDisabled = () => {
        const disabled = !labDisabled;
        if (disabled) {
            formRef.setFields([
                {
                    name: ['lab', 'date'],
                    value: null,
                },
                {
                    name: ['lab', 'observations'],
                    value: null,
                },
            ]);

            handleOnValuesChange({}, { lab: null });
        }

        setLabDisabled(disabled);
    };

    const toggleImagesDisabled = () => {
        const disabled = !imagesDisabled;
        if (disabled) {
            formRef.setFields([
                {
                    name: ['images', 'date'],
                    value: null,
                },
                {
                    name: ['images', 'observations'],
                    value: null,
                },
            ]);

            handleOnValuesChange({}, { images: null });
        }

        setImagesDisabled(disabled);
    };

    useEffect(() => {
        // trigger any debonced update before destroying
        return () => handleOnValuesChange.flush();
    }, [handleOnValuesChange]);

    useEffect(() => {
        if (data) {
            formRef.setFieldsValue(dataToStore(data));
        }
    }, [formRef, data]);

    return (
        <Form form={formRef} layout="vertical" onValuesChange={handleOnValuesChange}>
            <Row justify="space-between">
                <Col>
                    <Checkbox onChange={toggleLabDisabled} checked={!labDisabled}>
                        Trajos resultados de laboratorio
                    </Checkbox>
                </Col>
                <Col>
                    <Form.Item name={['lab', 'date']}>
                        <DatePicker disabled={labDisabled} format="DD-MM-YYYY" />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item label="Observación" name={['lab', 'observations']}>
                <Input.TextArea autoSize={{ minRows: 5 }} disabled={labDisabled} />
            </Form.Item>
            <Row justify="space-between">
                <Col>
                    <Checkbox onChange={toggleImagesDisabled} checked={!imagesDisabled}>
                        Trajos resultados de imágenes
                    </Checkbox>
                </Col>
                <Col>
                    <Form.Item name={['images', 'date']}>
                        <DatePicker disabled={imagesDisabled} format="DD-MM-YYYY" />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item label="Observación" name={['images', 'observations']}>
                <Input.TextArea autoSize={{ minRows: 5 }} disabled={imagesDisabled} />
            </Form.Item>
        </Form>
    );
};

export default LabResults;
