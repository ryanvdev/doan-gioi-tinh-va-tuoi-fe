import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../../api';
import { IPredictFormData } from '../../../api/predict';
import env from '../../../config/env';
import DefaultLayout from '../../../layouts/DefaultLayout';
import localStorageClient from '../../../utils/local-storage-client';
import messageAlert from '../../../utils/local-storage-client/message-alert';
import Container from '../../common/Container';
import FormUpload, { IFormUploadChange } from './components/FormUpdate';
import ReviewImage from './components/ReviewImage';
import styles from './HomePage.module.scss';

export interface IHomePageProps {}

export default function HomePage(props: IHomePageProps) {
    const [uploadStatus, setUploadStatus] = React.useState<{
        status: 'uploading' | 'no-image' | 'failed';
        imgUrl: string;
    }>({
        status: 'no-image',
        imgUrl: '',
    });
    const navigate = useNavigate();

    const handleFormUploadChange = React.useCallback(
        async (e: IFormUploadChange) => {
            if (!e.data) return;

            let imageExtension = '';
            const nameSplit = e.imageName.split('.');
            if (nameSplit.length > 1) {
                imageExtension = nameSplit.at(-1) || '';
            }

            const newFormData: IPredictFormData = {
                data: e.data,
                imageExtension,
                imageName: e.imageName,
                imageType: e.imageType,
            };

            setUploadStatus({
                status: 'uploading',
                imgUrl: e.data,
            });

            const [predictRes, _] = await Promise.all([
                api.predict(newFormData),
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(true);
                    }, 1000);
                }),
            ]);

            if (predictRes.status === 'failure') {
                messageAlert('error', predictRes.message);
                return;
            }

            messageAlert('success', 'Dự đoán thành công !');
            localStorageClient.pushHistory({
                _id: predictRes.data._id,
                imageName: predictRes.data.imageName,
                createdAt: predictRes.data.createdAt,
            });

            navigate(`/predict-result/${predictRes.data._id}`);
        },
        [navigate],
    );

    const sampleElement = React.useMemo(() => {
        const liElements = [];
        for (let i = 0; i < 6; i++) {
            liElements.push(
                <li
                    key={i}
                    className={styles['sample-item']}
                    style={{
                        backgroundImage: `url('${env.API_PREDICT}/public/static/images/sample-${i}.png')`,
                    }}
                />,
            );
        }
        return <ul className={styles['sample-container']}>{liElements}</ul>;
    }, []);

    return (
        <DefaultLayout>
            <Container>
                <FormUpload onChange={handleFormUploadChange} />
                <ReviewImage data={uploadStatus} />
                {sampleElement}
            </Container>
        </DefaultLayout>
    );
}
