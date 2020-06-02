import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Tabs, Skeleton } from 'antd';

import { Patient } from './types';
import useStory from './hooks/useStory';
import useAppointmentList from './hooks/useAppointmentList';
import useTabsPosition from './hooks/useTabPosition';
import PatientDetails from './components/PatientDetails';
import AppointmentHistory from './components/AppointmentHistory';

interface Props extends RouteComponentProps {
    storyKey?: string;
}

const HistoryDetails: React.FC<Props> = ({ storyKey }) => {
    const { response: storyResponse, api: storyApi } = useStory(storyKey as string);
    const { response: appointmentsResponse } = useAppointmentList(storyKey as string);
    const tabPosition = useTabsPosition();

    const handlePatientUpdate = (patientInfo: Patient) => {
        storyApi.updatePatientInfo(patientInfo);
    };
    const { TabPane } = Tabs;

    return (
        <Skeleton loading={!storyResponse.data && !appointmentsResponse.data}>
            <h1>{storyResponse.data?.patient.name}</h1>

            <Tabs defaultActiveKey="1" tabPosition={tabPosition}>
                <TabPane tab="Datos personales" key={'1'}>
                    <PatientDetails
                        data={storyResponse.data?.patient}
                        onValuesChange={handlePatientUpdate}
                        disabled={storyResponse.loading}
                    />
                </TabPane>

                <TabPane tab="Historia de consultas" key={'2'}>
                    <AppointmentHistory appointments={appointmentsResponse.data} />
                </TabPane>
            </Tabs>
        </Skeleton>
    );
};

export default HistoryDetails;
