import React from 'react';
import modalOverlayStyles from './modal-overlay.module.css';

export type TModalOverlayType = {
  handleModalClose: Function;
  children: React.ReactNode;
};

function ModalOverlay({ handleModalClose, children }: TModalOverlayType) {
  return (
    <div
      id='overlay'
      onClick={() => handleModalClose()}
      className={modalOverlayStyles.modaloverlay}
    >
      {children}
    </div>
  );
}

export default ModalOverlay;
