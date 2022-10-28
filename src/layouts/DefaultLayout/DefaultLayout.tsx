import * as React from 'react';
import Header from '../../components/common/Header/Header';
import styles from './DefaultLayout.module.scss';

export interface IDefaultLayoutProps {}

export default function DefaultLayout(
    props: React.PropsWithChildren<IDefaultLayoutProps>,
) {
    return (
        <div className={styles['default-layout']}>
            <Header />
            <main>{props.children}</main>
        </div>
    );
}
