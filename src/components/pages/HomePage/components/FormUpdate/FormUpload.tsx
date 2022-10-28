import * as React from 'react';
import { IFormUploadChange } from '.';
import useRootStore from '../../../../../hooks/useRootStore';
import styles from './FormUpload.module.scss';

export interface IFormUploadProps {
    onChange?: (e: IFormUploadChange) => any;
}

export default function FormUpload(props: IFormUploadProps) {
    const { onChange } = props;
    const inputRef = React.useRef<HTMLInputElement>(null);
    const rootStore = useRootStore();

    const handleInputChange = React.useCallback(async () => {
        if (!inputRef.current) return;
        if (!inputRef.current.files || inputRef.current.files.length === 0) {
            alert('Chưa có file nào được chọn !');
            return;
        }
        const fileSelected = inputRef.current.files[0];
        const fileReader = new FileReader();
        fileReader.addEventListener('load', function (e) {
            if (onChange) {
                onChange({
                    data: e.target?.result?.toString(),
                    imageName: fileSelected.name,
                    imageType: fileSelected.type,
                });
            }

            // clear input
            if (inputRef.current) {
                inputRef.current.value = '';
            }
        });
        fileReader.readAsDataURL(fileSelected);
    }, [onChange]);

    return (
        <div className={styles['form-update']}>
            <form
                className={styles['form']} //
                action=''
                method='post'
                encType='multipart/form-data'
            >
                <div className={styles['layer-wrap']}>
                    <div className={styles['layer']}>
                        <div className={styles['fake-btn-container']}>
                            <div className={styles['fake-btn']}>
                                {rootStore.isMobile
                                    ? 'Chụp ảnh hoặc chọn ảnh đã chụp từ thư viện'
                                    : 'Chọn ảnh hoặc kéo ảnh vào đây'}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles['layer-wrap']}>
                    <div className={styles['layer']}>
                        <input
                            className={styles['input-img']} //
                            ref={inputRef}
                            type='file'
                            name='img'
                            accept='.jpg, .jpeg, .png, .webp'
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}
