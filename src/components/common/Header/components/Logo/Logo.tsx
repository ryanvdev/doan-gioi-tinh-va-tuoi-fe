import * as React from 'react';
import images from '../../../../../resource/images';
import styles from './Logo.module.scss';
import { Link } from 'react-router-dom';

export interface ILogoProps {}

export default function Logo(props: ILogoProps) {
    return (
        <div className={styles['logo']}>
            <Link to={'/'}>
                <img src={images.logo512} alt='Đoán giới tính và tuổi' />
                <strong>Đoán tuổi và giới tính</strong>
            </Link>
        </div>
    );
}
