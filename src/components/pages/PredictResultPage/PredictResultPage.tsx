import * as React from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../api';
import env from '../../../config/env';
import DefaultLayout from '../../../layouts/DefaultLayout';
import IImageInfo from '../../../types/IImageInfo';
import Container from '../../common/Container';
import ImagePredict from '../../common/ImagePredict';
import styles from './PredictResultPage.module.scss';

export interface IPredictResultPageProps {}

export default function PredictResultPage(props: IPredictResultPageProps) {
    const { _id } = useParams();
    const [imageInfo, setImageInfo] = React.useState<IImageInfo>();

    const loadImageInfo = React.useCallback(async () => {
        if (!_id) return;
        const imageInfo = await api.getImageInfo(_id);
        setImageInfo(imageInfo);
    }, [_id]);

    React.useEffect(() => {
        loadImageInfo();
    }, [loadImageInfo]);

    return (
        <DefaultLayout>
            <Container>
                <ImagePredict imageInfo={imageInfo} />
            </Container>
        </DefaultLayout>
    );
}
