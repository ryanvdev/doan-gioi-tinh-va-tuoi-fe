import * as React from 'react';
import env from '../../../config/env';
import images from '../../../resource/images';
import IImageInfo from '../../../types/IImageInfo';
import styles from './ImagePredict.module.scss';

export interface IImagePredictProps {
    imageInfo?: IImageInfo;
}

const toStrPercent = (v: number) => {
    return `${(v * 100).toFixed(4)}%`;
};

const convertGender = (v: string) => {
    switch (v) {
        case 'Male':
            return 'Nam';
        case 'Female':
            return 'Nữ';
        default:
            return v;
    }
};

export default function ImagePredict(props: IImagePredictProps) {
    const isoCreatedAt = props.imageInfo?.createdAt;

    const strCreatedAt = React.useMemo(() => {
        if (!isoCreatedAt) return '';

        const createdAt = new Date(isoCreatedAt);
        return `${createdAt.toLocaleString('vi-VN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        })}`;
    }, [isoCreatedAt]);

    if (!props.imageInfo) return null;

    const { width, height } = props.imageInfo.imageSize;

    const aspectRatio = width / height;

    const facesBox = props.imageInfo.predictResult.map((item) => {
        const { x1, x2, y1, y2 } = item.bbox;
        const w = x2 - x1;
        const h = y2 - y1;
        return {
            top: toStrPercent(y1 / height),
            left: toStrPercent(x1 / width),
            width: toStrPercent(w / width),
            height: toStrPercent(h / height),
            gender: item.gender,
            age: item.age,
            aspectRatio: w / h,
        };
    });

    const faceBoxElements = facesBox.map((item, i) => {
        return (
            <div className={styles['face-box-wrap']} key={`${props.imageInfo?._id}-${i}`}>
                <div className={styles['face-box']}>
                    <div
                        style={{
                            top: item.top,
                            left: item.left,
                            width: item.width,
                            height: item.height,
                            borderColor:
                                item.gender === 'Male'
                                    ? 'rgb(0,255,255)'
                                    : 'rgb(255,0,255)',
                        }}
                    >
                        <div className={styles['background']}>
                            <div
                                style={{
                                    aspectRatio: item.aspectRatio,
                                    backgroundImage: `url('${
                                        (images as any)[item.gender.toLowerCase()]
                                    }')`,
                                }}
                            />
                        </div>
                        <ul>
                            <li>
                                <strong>Giới tính: </strong>
                                <span>{convertGender(item.gender)}</span>
                            </li>
                            <li>
                                <strong>Độ tuổi: </strong>
                                <span>{item.age}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }, []);

    return (
        <div
            className={styles['image-predict']} //
            style={
                {
                    '--aspect-ratio': aspectRatio,
                } as any
            }
        >
            <div>
                <ul>
                    <li>
                        <strong>Số khuôn mặt được tìm thấy: </strong>
                        <span>{props.imageInfo.predictResult.length}</span>
                    </li>
                    <li>
                        <strong>Thời gian chạy: </strong>
                        <span>
                            {parseFloat(props.imageInfo.predictTime).toFixed(6)} giây
                        </span>
                    </li>
                    <li>
                        <strong>Ngày tạo: </strong>
                        <span>{strCreatedAt}</span>
                    </li>
                    <li>
                        <strong>Tên tệp: </strong>
                        <span>{props.imageInfo.imageName}</span>
                    </li>
                </ul>
            </div>
            {/*  */}
            <figure>
                <div className={styles['image-container']}>
                    <div className={styles['layer-wrap']}>
                        <div className={styles['layer']}>
                            <img
                                className={styles['image']}
                                src={`${env.API_PREDICT}/public/images/${props.imageInfo._id}.webp`}
                                alt={props.imageInfo.imageName}
                            />
                        </div>
                    </div>
                    <div className={styles['layer-wrap']}>
                        <div className={styles['layer']}>{faceBoxElements}</div>
                    </div>
                </div>
            </figure>
        </div>
    );
}
