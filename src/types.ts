export enum Entities {
    'stories' = 'stories',
    'appointments' = 'appointments',
}

export interface Patient {
    name: string;
    country: string;
    id: string;
    birthday: string;
    phone: string;
    email: string;
    gender: string;
    maritalStatus: string;
    address?: string;
    bloodType?: string;
    job?: string;
}

export interface AppointmentForm {
    text: string;
}

export enum AppointmentStatusEnum {
    'pending' = 'pending',
    'waiting' = 'waiting',
    'cancelled' = 'cancelled',
    'open' = 'open',
    'closed' = 'closed',
}

export interface Appointment {
    $key: string;
    $path: string;
    date: string;
    time: string;
    diagnosis?: string;
    status: AppointmentStatusEnum;
}

export interface Story {
    $key: string;
    $path: string;
    patient: Patient;
    keywords: string[];
}
