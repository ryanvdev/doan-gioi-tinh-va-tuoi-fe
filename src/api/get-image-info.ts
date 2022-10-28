import axios from 'axios';
import env from '../config/env';
import IImageInfo from '../types/IImageInfo';

const getImageInfo = async (_id: string) => {
    try {
        const url = `${env.API_PREDICT}/public/info/${_id}.json`;
        const res = await axios.get(url);
        return res.data as IImageInfo;
    } catch (e) {
        console.log(e);
        return undefined;
    }
};

export default getImageInfo;
