import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Row, Col, Button, Input } from 'antd';

const History: React.FC<RouteComponentProps> = ({ children }) => {
    const { Search } = Input;

    return (
        <>
            <Row gutter={16}>
                <Col span={8}>
                    <Search
                        placeholder="Buscar paciente por nombre o documento"
                        onSearch={(value) => console.log(value)}
                        enterButton
                    />
                    <br />
                    <br />
                </Col>
                <Col span={2} offset={12}>
                    <Button>Registrar nuevo paciente</Button>
                </Col>
            </Row>

            {children}
        </>
    );
};

export default History;
