import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Tabs, Button } from 'antd';
import { Store } from 'antd/lib/form/interface';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import PatientDetails from './components/PatientDetails';
import useStory from './api/useStory';
import { Patient } from './types';
import styles from './HistoryDetails.module.css';

interface Props extends RouteComponentProps {
    $key?: string;
}

const HistoryDetails: React.FC<Props> = ({ location }) => {
    // using pathname instead of $key because Firestore needs the full path to the object to find it.
    const { response, api } = useStory(location?.pathname || '');
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
        api.updatePatientInfo(patientInfo as Patient);
    };
    const { TabPane } = Tabs;

    return (
        <>
            <h1 className={styles.patientName}>Nombre del Paciente</h1>

            <Tabs defaultActiveKey="1" tabPosition={tabPosition}>
                <TabPane className="fill-appointment-tab-container" tab="Datos personales" key={'1'}>
                    {!response.data ? (
                        'loading'
                    ) : (
                        <>
                            <PatientDetails
                                data={response.data?.patient}
                                onFinish={handlePatientUpdate}
                                disabled={response.loading}
                            >
                                <Button htmlType="submit" disabled={response.loading}>
                                    Guardar
                                </Button>
                            </PatientDetails>
                        </>
                    )}
                </TabPane>

                <TabPane className="fill-appointment-tab-container" tab="Historia de consultas" key={'2'}>
                    Por ahora nada!
                </TabPane>
            </Tabs>
        </>
    );
};

export default HistoryDetails;
