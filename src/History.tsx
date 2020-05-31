import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Row, Col, Input, AutoComplete } from 'antd';

import useStoryList from './hooks/useStoryList';
import { Story, Patient } from './types';
import styles from './History.module.css';
import PatientRegistration, { Api as PatientRegistrationApi } from './components/PatientRegistration';

const History: React.FC<RouteComponentProps> = ({ children, navigate }) => {
    const [query, setQuery] = useState('');
    const { response, api } = useStoryList(query);

    const { Search } = Input;

    const handleOnChange = (q: string) => {
        setQuery(q.toLowerCase());
    };

    const handleOnSelect = (storyPath: string) => {
        navigate && navigate(`/${storyPath}`);
        setQuery('');
    };

    const handlePatientRegistration = async (value: Patient, patientRegistrationAPI: PatientRegistrationApi) => {
        try {
            const result = await api.createStory(value);
            patientRegistrationAPI.hideModal();
            navigate && navigate(`/${result.path}`);
        } catch (error) {
            patientRegistrationAPI.showError(error.message);
        }
    };

    const getOptions = (stories: Story[]) => {
        return stories.map((story) => ({
            value: story.$path,
            label: (
                <div className={styles.searchResult}>
                    <span>{story.patient.name}</span>
                    <span>{story.patient.id}</span>
                </div>
            ),
        }));
    };

    return (
        <>
            <Row gutter={16} justify="space-between">
                <Col lg={8} md={12} span={24}>
                    <AutoComplete
                        style={{ display: 'block' }}
                        onSelect={handleOnSelect}
                        onChange={handleOnChange}
                        value={query}
                        options={getOptions(response.data || [])}
                    >
                        <>
                            <Search placeholder="Buscar paciente por nombre o documento" loading={response.loading} />
                        </>
                    </AutoComplete>
                </Col>
                <Col>
                    <PatientRegistration onFinish={handlePatientRegistration} />
                </Col>
            </Row>

            <div>{children}</div>
        </>
    );
};

export default History;
