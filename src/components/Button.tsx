import * as React from 'react';

export interface ButtonProps {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const styles = {
    border: '1px solid #eee',
    borderRadius: 3,
    backgroundColor: '#B0B0B0',
    cursor: 'pointer',
    fontSize: 15,
    padding: '3px 10px',
    margin: 10,
};

const Button: React.FC<ButtonProps> = (props) => (
    <button onClick={props.onClick} style={styles} type="button">
        {props.children}
    </button>
);

export default Button;
