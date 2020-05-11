import React from 'react';
import { Table, Input, Form, Button } from 'antd';
import { ColumnsType } from 'antd/lib/table';

interface Record {
    key: string;
    name: string;
    unit: string;
}

type ColumnsProps = ColumnsType<Record>;

interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    dataIndex: string;
    record: Record;
}

const EditableCell: React.FC<EditableCellProps> = ({ editable, children, record }) => {
    const childNode = !editable ? (
        children
    ) : (
        <Form.Item
            style={{
                margin: 0,
            }}
            name={record.key}
        >
            <Input />
        </Form.Item>
    );

    return <td {...record}>{childNode}</td>;
};

const VitalSigns: React.FC = () => {
    const columns = [
        {
            title: 'Descripción',
            dataIndex: 'name',
            width: '30%',
        },
        {
            title: 'Valor',
            dataIndex: 'value',
            width: '20%',
            editable: true,
        },
        {
            title: 'Unidad',
            dataIndex: 'unit',
        },
    ];

    const dataSource: Record[] = [
        {
            key: 'peso',
            name: 'Peso',
            unit: 'Kg',
        },
        {
            key: 'talla',
            name: 'Talla',
            unit: 'cm',
        },
        {
            key: 'indiceMasaCorporal',
            name: 'Indice de masa corporal',
            unit: 'Kg/m2',
        },
        {
            key: 'temperatura',
            name: 'Temperatura',
            unit: 'grados C',
        },
        {
            key: 'frecuenciaCardiaca',
            name: 'Frecuencia Cardiaca',
            unit: 'x minutos',
        },
        {
            key: 'frecuenciaRespiratoria',
            name: 'Frecuencia Respiratoria',
            unit: 'x minutos',
        },
        {
            key: 'tensionArterial',
            name: 'Tension arterial',
            unit: 'MMHG',
        },
    ];

    const components = {
        body: {
            cell: EditableCell,
        },
    };

    const columnsProps: ColumnsProps = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
            }),
        };
    });

    return (
        <Form name="table" onFinish={console.log}>
            <Table
                pagination={false}
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={columnsProps}
            />
            <Button htmlType="submit">Guardar</Button>
        </Form>
    );
};

export default VitalSigns;
