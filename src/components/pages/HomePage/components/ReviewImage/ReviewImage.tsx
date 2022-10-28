import * as React from 'react';
import styles from './ReviewImage.module.scss';

export interface IReviewImageProps {
    data?: {
        status: 'uploading' | 'no-image' | 'failed';
        imgUrl: string;
    };
}

function ReviewImage(props: IReviewImageProps) {
    const status = props.data?.status || '';

    const message = React.useMemo(() => {
        switch (status) {
            case 'uploading':
                return 'Đang tải lên...';
            case 'failed':
                return 'Dự đoán thất bại !';
        }
        return 'Có một lỗi không xác định trong quá trình dự đoán !';
    }, [status]);

    if (!props.data || props.data.status === 'no-image' || !props.data.imgUrl)
        return null;

    return (
        <div className={styles['review-image']}>
            <div className={styles['container']}>
                <div
                    className={styles['image']}
                    style={{
                        backgroundImage: `url('${props.data.imgUrl}')`,
                    }}
                />
                <div>{message}</div>
            </div>
        </div>
    );
}

export default ReviewImage;
