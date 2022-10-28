import { toast } from 'react-toastify';

type TAlertType = 'error' | 'info' | 'warning' | 'success';

const defaultConfig = Object.freeze({
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
});

const messageAlert = (alertType: TAlertType, message: string) => {
    toast[alertType](message, defaultConfig);
};

export default messageAlert;
