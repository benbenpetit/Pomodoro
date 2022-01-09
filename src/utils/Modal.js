import { XIcon } from '@heroicons/react/outline';
import Button from 'components/Button';
import React from 'react';
import ReactModal from 'react-modal';
import { Transition } from 'react-transition-group';

const Modal = (props) => {
  const transitionRef = React.useRef(null);

  return (
    <Transition nodeRef={transitionRef} in={props.isModalOpen} timeout={props.timeout}>
      <ReactModal
        closeTimeoutMS={300}
        isOpen={props.isModalOpen}
        ariaHideApp={false}
        contentLabel="Select timer options"
        onRequestClose={() => props.onCloseModal()}
        overlayClassName={'modal'}
        className={'modal__content'}
      >
        <div className='modal__content__close-btn'>
          <Button onClick={() => props.onCloseModal()}>
            <XIcon/>
          </Button>
        </div>
        {props.children}
      </ReactModal>
    </Transition>
  );
};

export default Modal;
