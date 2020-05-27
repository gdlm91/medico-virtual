import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Tabs, Button, Skeleton } from 'antd';
import { Store } from 'antd/lib/form/interface';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';

import { Patient } from './types';
import useStory from './hooks/useStory';
import useAppointmentList from './hooks/useAppointmentList';
import PatientDetails from './components/PatientDetails';
import AppointmentHistory from './components/AppointmentHistory';

interface Props extends RouteComponentProps {
    storyKey?: string;
}

const HistoryDetails: React.FC<Props> = ({ storyKey }) => {
    const { response: storyResponse, api: storyApi } = useStory(storyKey as string);
    const { response: appointmentsResponse } = useAppointmentList(storyKey as string);
    const breakpoints = useBreakpoint();
    const [tabPosition, setTabPosition] = useState<'left' | 'top'>('left');

    useEffect(() => {
        if (breakpoints.lg) {
            setTabPosition('left');
        } else {
            setTabPosition('top');
        }
    }, [breakpoints]);

    const handlePatientUpdate = (patientInfo: Store) => {
        storyApi.updatePatientInfo(patientInfo as Patient);
    };
    const { TabPane } = Tabs;

    return (
        <Skeleton loading={!storyResponse.data && !appointmentsResponse.data}>
            <h1 style={{ marginBottom: '30px' }}>{storyResponse.data?.patient.name}</h1>

            <Tabs defaultActiveKey="1" tabPosition={tabPosition}>
                <TabPane tab="Datos personales" key={'1'}>
                    <PatientDetails
                        data={storyResponse.data?.patient}
                        onFinish={handlePatientUpdate}
                        disabled={storyResponse.loading}
                    >
                        <Button htmlType="submit" disabled={storyResponse.loading}>
                            Guardar
                        </Button>
                    </PatientDetails>
                </TabPane>

                <TabPane tab="Historia de consultas" key={'2'}>
                    <AppointmentHistory appointments={appointmentsResponse.data} />
                </TabPane>
            </Tabs>
        </Skeleton>
    );
};

export default HistoryDetails;
