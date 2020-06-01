export enum Entities {
    'stories' = 'stories',
    'appointments' = 'appointments',
}

export interface SelectListRecord {
    key: string;
    observation: string;
}

export interface Patient {
    name: string;
    country: string;
    id: string;
    birthday: string;
    phone: string;
    email: string;
    gender?: string;
    maritalStatus?: string;
    address?: string;
    bloodType?: string;
    job?: string;
}

export interface AppointmentFormReason {
    reason?: string;
    sickness?: string;
}

export interface AppointmentFormResults {
    lab?: {
        date: string;
        observations: string;
    };
    images?: {
        date: string;
        observations: string;
    };
}

export type AppointmentFormSystemReview = SelectListRecord[];

export interface AppointmentForm {
    reason?: AppointmentFormReason;
    results?: AppointmentFormResults;
    systemReview?: AppointmentFormSystemReview;
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
    timestamp: number;
    form?: AppointmentForm;
}

export interface Story {
    $key: string;
    $path: string;
    patient: Patient;
    keywords: string[];
}
