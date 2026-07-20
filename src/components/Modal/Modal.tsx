import type { ReactNode } from 'react';
import styled from './Modal.module.css';
interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  return (
    <div className={styled.backdrop} role="dialog" aria-modal="true">
      <div className={styled.modal} onClick={onClose}>
        <button className={styled.closeButton} aria-label="Close modal">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
