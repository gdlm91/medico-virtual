import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Row, Col, Button, Input, AutoComplete } from 'antd';

import useStoryList from './hooks/useStoryList';
import { Story } from './types';
import styles from './History.module.css';

const History: React.FC<RouteComponentProps> = ({ children, navigate }) => {
    const [query, setQuery] = useState('');
    const { response } = useStoryList(query);

    const { Search } = Input;

    const handleOnChange = (q: string) => {
        setQuery(q.toLowerCase());
    };

    const handleOnSelect = (storyPath: string) => {
        navigate && navigate(`/${storyPath}`);
        setQuery('');
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
                <Col lg={8}>
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
                    <Button>Registrar nuevo paciente</Button>
                </Col>
            </Row>

            {children}
        </>
    );
};

export default History;
