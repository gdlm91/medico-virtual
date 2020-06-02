import { useEffect, useState } from 'react';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';

const useTabPosition = () => {
    const breakpoints = useBreakpoint();

    const [tabPosition, setTabPosition] = useState<'left' | 'top'>('left');

    useEffect(() => {
        if (breakpoints.lg) {
            setTabPosition('left');
        } else {
            setTabPosition('top');
        }
    }, [breakpoints]);

    return tabPosition;
};

export default useTabPosition;
