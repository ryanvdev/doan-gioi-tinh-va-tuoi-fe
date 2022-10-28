import { useContext } from 'react';
import { AppContext } from '../App/AppProvider';

const useRootStore = () => {
    return useContext(AppContext);
};

export default useRootStore;
