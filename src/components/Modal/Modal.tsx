import { useEffect } from 'react';
import './Modal.css';

import { createPortal } from 'react-dom';
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
            <div className="modal">
                <button onClick={handleModalClose} className="close-btn">
                Close
                </button>
                <div className="modal-content">{children}</div>
            </div>
            , document.body)

    );
}
