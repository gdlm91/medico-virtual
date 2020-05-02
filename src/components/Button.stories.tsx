import React from 'react';
import { action } from '@storybook/addon-actions';

import Button from './Button';

export default {
    title: 'Button',
    component: Button,
};

export const Click = () => <Button onClick={action('clicked')} />;

export const Disabled = () => <Button disabled={true} onClick={action('clicked')} />;
