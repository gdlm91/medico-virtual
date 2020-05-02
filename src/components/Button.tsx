import React from 'react';
import { Button } from 'antd';
import './Button.css';

interface Props {
    disabled?: boolean;
    onClick: () => void;
}

const PrimaryButton: React.FC<Props> = (props) => (
    <Button type="primary" disabled={props.disabled} onClick={props.onClick}>
        Button
    </Button>
);

PrimaryButton.defaultProps = { disabled: false };

export default PrimaryButton;
