import React from 'react';
import { Form, Button } from 'antd';
import SelectList from './SelectList';

const Downloadables: React.FC = () => {
    const options = {
        piel: 'Piel',
        cabeza: 'Cabeza',
        Otorrinolaringologia: 'Otorrinolaringologia',
        Ojos: 'Ojos',
        Cuello: 'Cuello',
        Torax: 'Torax',
        Mamas: 'Mamas',
        Cardiovascular: 'Cardiovascular',
        Abdomen: 'Abdomen',
        Genital: 'Genital',
        Extremidades: 'Extremidades',
        Neurologico: 'Neurologico',
        NiegaRevisionPorSistema: 'NiegaRevisionPorSistema',
    };

    return (
        <Form layout="vertical" onFinish={console.log}>
            <SelectList
                name="descargables"
                label="Descargable"
                options={options}
                showDates={(value) => value == 'piel'}
            ></SelectList>

            <Button htmlType="submit" type="primary">
                Submit
            </Button>
        </Form>
    );
};

export default Downloadables;
