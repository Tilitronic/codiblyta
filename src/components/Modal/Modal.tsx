import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface ModalProps {
    handleModalClose: () => void
    isModalOpen: boolean
    children: JSX.Element | JSX.Element[] | null
}

export function Modal ({ children, isModalOpen, handleModalClose }: ModalProps) {
    useEffect(() => {
        const closeOnEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleModalClose();
            }
        };
        document.body.addEventListener('keydown', closeOnEscapeKey);
        return () => {
            document.body.removeEventListener('keydown', closeOnEscapeKey);
        };
    }, [handleModalClose]);

    if (!isModalOpen) return null;

    return (
        createPortal(
            <div style={ styles.modalContainer }>
                <div style={ styles.modalWrapper }>
                    <IconButton onClick={handleModalClose} className="closeBtn" sx={styles.closeButton}>
                        <CloseIcon/>
                    </IconButton>
                    <Paper sx={styles.modalContent}>
                        {children}
                    </Paper>
                </div>
            </div>, document.body)

    );
}

const styles = {
    modalWrapper: {
        position: 'relative' as 'relative'
    },
    closeButton: {
        top: '3px',
        right: '3px',
        position: 'absolute'
    },
    modalContainer: {
        display: 'flex',
        position: 'fixed' as 'fixed',
        inset: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease-in-out',
        overflow: 'hidden',
        zIndex: '999',
        padding: '40px 20px 20px',
    },
    modalContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'auto',
        height: 'auto',
        padding: '70px',
    }
};
