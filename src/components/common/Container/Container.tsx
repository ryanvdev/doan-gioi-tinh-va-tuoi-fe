import * as React from 'react';
import styles from './Container.module.scss';

export interface IContainerProps {
    className?: string;
}

export default function Container(props: React.PropsWithChildren<IContainerProps>) {
    return (
        <div className={[styles['container'], props.className].join(' ')}>
            {props.children}
        </div>
    );
}
