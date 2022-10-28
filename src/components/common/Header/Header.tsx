import * as React from 'react';
import Container from '../Container';
import Logo from './components/Logo';
import styles from './Header.module.scss';

export interface IHeaderProps {}

export default function Header(props: IHeaderProps) {
    return (
        <header className={styles['header']}>
            <Container className={styles['container']}>
                <Logo />
            </Container>
        </header>
    );
}
