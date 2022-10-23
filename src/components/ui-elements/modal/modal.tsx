import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import closeIcon from './close-icon.svg';
import ModalOverlay from '../modal-overlay/modal-overlay';

export type TModalType = {
  handleModalClose: Function;
  children: React.ReactNode;
};

const modalRoot = document.getElementById('root-portal') as HTMLElement;

export function Modal({ handleModalClose, children }: TModalType) {
  const el = useRef(document.createElement('div'));

  React.useEffect(() => {
    const onKeypress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleModalClose();
      }
    };
    const current = el.current;
    modalRoot!.appendChild(current);
    document.addEventListener('keydown', onKeypress);
    return (): void => {
      document.removeEventListener('keydown', onKeypress);
      modalRoot!.removeChild(current);
    };
  }, [handleModalClose]);

  return ReactDOM.createPortal(
    <ModalOverlay handleModalClose={handleModalClose}>
      <div onClick={event => event.stopPropagation()} className={modalStyles.modal}>
        <img
          onClick={() => {
            handleModalClose();
          }}
          className={modalStyles.closeicon}
          src={closeIcon}
          alt='close button'
          data-test-id={'modal-close-icon'}
        />
        {children}
      </div>
    </ModalOverlay>,
    el.current,
  );
}

export default Modal;
