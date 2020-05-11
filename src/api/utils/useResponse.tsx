import { useState, useEffect } from 'react';
import { BehaviorSubject, merge, of, Observable } from 'rxjs';
import { scan, tap, map } from 'rxjs/operators';

export interface Response<T> {
    data?: T;
    loading: boolean;
    error?: Error;
}

export type UseResponse<T> = [Response<T>, (value: Response<T>) => void];

const useResponse = <T,>(persistent$: Observable<T> = of()) => {
    const [response, setResponse] = useState<Response<T>>({ loading: true });
    const [externalResponse$] = useState(
        new BehaviorSubject<Response<T>>({ loading: true }),
    );

    useEffect(() => {
        const persistentResponse$ = persistent$.pipe(
            map(
                (data) =>
                    ({
                        data,
                        loading: false,
                        error: undefined,
                    } as Response<T>),
            ),
        );
        const cachedResponses$ = merge(externalResponse$, persistentResponse$).pipe(
            scan((cache, current) => {
                return { ...current, data: current.data || cache.data } as Response<T>;
            }),
            tap((value) => process.env.NODE_ENV === 'development' && console.debug(value)),
        );
        const subscription = cachedResponses$.subscribe((newResponse) => setResponse(newResponse));

        return () => subscription.unsubscribe();
    }, [persistent$, externalResponse$]);

    return [response, (value: Response<T>) => externalResponse$.next(value)] as UseResponse<T>;
};

export default useResponse;
