import axios from 'axios';
import env from '../config/env';
import IImageInfo from '../types/IImageInfo';
import TApiResponse from '../types/TApiResponse';

export interface IPredictFormData {
    data: string;
    imageType: string;
    imageName: string;
    imageExtension: string;
}

const predict = async (formData: IPredictFormData): TApiResponse<IImageInfo> => {
    try {
        const url = `${env.API_PREDICT}/predict`;
        const res = await axios.post(
            url, //
            formData,
        );
        return {
            status: 'successfully',
            data: res.data,
        };
    } catch (e) {
        return {
            status: 'failure',
            message: 'Lỗi kết nối tới máy chủ',
        };
    }
};

export default predict;
