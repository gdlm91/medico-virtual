import { Story, Appointment, AppointmentStatus } from '../types';

export interface SeedStory extends Story {
    appointments: Appointment[];
}

export const seedStory1: SeedStory = {
    $key: '1',
    patient: {
        birthday: '01-01-1985',
        country: 'Alemania',
        email: 'jon@doe.com',
        gender: 'male',
        id: '123456789',
        maritalStatus: 'single',
        name: 'Jon Doe',
        phone: '000999888',
        address: '331/4 Mega Ave, Tumaru',
        bloodType: 'ORH negative',
        job: 'Lawyer',
    },
    appointments: [
        {
            $key: '1',
            date: '05-06-2020',
            status: AppointmentStatus.waiting,
            time: '10:00',
        },
        {
            $key: '2',
            date: '05-07-2020',
            status: AppointmentStatus.open,
            time: '10:00',
        },
    ],
};

export const seedStory2: SeedStory = {
    $key: '2',
    patient: {
        birthday: '01-01-1985',
        country: 'Vaticano',
        email: 'jane@doe.com',
        gender: 'female',
        id: '0987654321',
        maritalStatus: 'married',
        name: 'Jane Doe',
        phone: '777666555',
        address: '332/4 Super St, Tumaru',
        bloodType: 'ORH negative',
        job: 'Doctor',
    },
    appointments: [
        {
            $key: '3',
            date: '03-06-2020',
            status: AppointmentStatus.waiting,
            time: '13:00',
        },
        {
            $key: '4',
            date: '02-07-2020',
            status: AppointmentStatus.open,
            time: '15:00',
        },
    ],
};
