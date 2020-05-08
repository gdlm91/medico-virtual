import React from 'react';
import { Form, Button } from 'antd';
import SelectList from './SelectList';
import './Downloadables.css';

const Downloadables: React.FC = () => {
    const options = {
        reposo: 'Reposo',
        recetaMedica: 'Receta medica',
    };

    return (
        <Form layout="vertical" onFinish={console.log}>
            <SelectList
                name="descargables"
                label="Descargable"
                options={options}
                showDates={(value) => value == 'reposo'}
            ></SelectList>
            <Button block htmlType="submit" type="primary" className="button-pdf">
                Exportar a PDF
            </Button>
        </Form>
    );
};

export default Downloadables;
