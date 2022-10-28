import * as React from 'react';
import styles from './Layer.module.scss';

export interface ILayerProps {}

export default function Layer(props: ILayerProps) {
    return <div className={styles['layer-wrap']}></div>;
}
