import * as React from 'react';
import { Link } from 'react-router-dom';
import env from '../../../config/env';
import DefaultLayout from '../../../layouts/DefaultLayout';
import localStorageClient from '../../../utils/local-storage-client';
import Container from '../../common/Container';
import styles from './HistoryPage.module.scss';

export interface IHistoryPageProps {}

export default function HistoryPage(props: IHistoryPageProps) {
    const [length, setLength] = React.useState<number>(localStorageClient.history.length);

    const handleRemove = React.useCallback(
        (_id: string) => () => {
            localStorageClient.history = localStorageClient.history.filter(
                (item) => item._id !== _id,
            );
            setLength(localStorageClient.history.length);
        },
        [],
    );

    const historyElements = React.useMemo(() => {
        return localStorageClient.history.map((item) => {
            return (
                <li key={item._id} className={styles['item']}>
                    <Link
                        to={`/predict-result/${item._id}`}
                        className={styles['image']}
                        style={{
                            backgroundImage: `url('${env.API_PREDICT}/public/images/${item._id}.webp`,
                        }}
                    />
                    <Link
                        to={`/predict-result/${item._id}`}
                        className={styles['image-info']}
                    >
                        <div className={styles['image-name']}>
                            {item.imageName.length >= 20 ? '...' : ''}
                            {item.imageName.slice(-20)}
                        </div>
                        <div className={styles['created-at']}>
                            {new Date(item.createdAt).toLocaleString('vi-VN', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                second: 'numeric',
                            })}
                        </div>
                    </Link>
                    <button
                        className={styles['btn-remove']}
                        type='button'
                        onClick={handleRemove(item._id)}
                    />
                </li>
            );
        });
    }, [length]);

    return (
        <DefaultLayout>
            <Container>
                <ul className={styles['ul']}>{historyElements}</ul>
            </Container>
        </DefaultLayout>
    );
}
