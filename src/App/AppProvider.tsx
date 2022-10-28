import * as React from 'react';

export interface IAppProviderProps {}

export const AppContext = React.createContext<{
    isMobile: boolean;
}>({} as any);

export default function AppProvider(props: React.PropsWithChildren<IAppProviderProps>) {
    const [isMobile, setIsMobile] = React.useState<boolean>(false);

    const handleWindowResize = React.useCallback(() => {
        setIsMobile(window.innerWidth < window.innerHeight);
    }, []);

    React.useEffect(() => {
        setIsMobile(window.innerWidth < window.innerHeight);
        window.onresize = handleWindowResize;
    }, [handleWindowResize]);

    return (
        <AppContext.Provider
            value={{
                isMobile,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
}
