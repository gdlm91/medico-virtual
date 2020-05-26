import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Tabs, Button } from 'antd';
import { Store } from 'antd/lib/form/interface';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import PatientDetails from './components/PatientDetails';
import useStory from './hooks/useStory';
import { Patient } from './types';
import styles from './HistoryDetails.module.css';
import useAppointmentList from './hooks/useAppointmentList';
import AppointmentHistory from './components/AppointmentHistory';

interface Props extends RouteComponentProps {
    storyKey?: string;
}

const HistoryDetails: React.FC<Props> = ({ storyKey }) => {
    const { response: storyResponse, api: storyApi } = useStory(storyKey as string);
    const { response: appointmentsResponse } = useAppointmentList();
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
        <>
            <h1 className={styles.patientName}>Nombre del Paciente</h1>

            <Tabs defaultActiveKey="1" tabPosition={tabPosition}>
                <TabPane className="fill-appointment-tab-container" tab="Datos personales" key={'1'}>
                    {!storyResponse.data ? (
                        'loading'
                    ) : (
                        <>
                            <PatientDetails
                                data={storyResponse.data?.patient}
                                onFinish={handlePatientUpdate}
                                disabled={storyResponse.loading}
                            >
                                <Button htmlType="submit" disabled={storyResponse.loading}>
                                    Guardar
                                </Button>
                            </PatientDetails>
                        </>
                    )}
                </TabPane>

                <TabPane className="fill-appointment-tab-container" tab="Historia de consultas" key={'2'}>
                    {!appointmentsResponse.data ? (
                        'loading'
                    ) : (
                        <AppointmentHistory appointments={appointmentsResponse.data} />
                    )}
                </TabPane>
            </Tabs>
        </>
    );
};

export default HistoryDetails;
