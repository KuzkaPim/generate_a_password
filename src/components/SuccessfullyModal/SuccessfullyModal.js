import { memo } from 'react';
import { CSSTransition } from 'react-transition-group';

import './SuccessfullyModal.scss';

const SuccessfullyModal = memo(({show, setShow}) => {
    setShow();

    return (
        <CSSTransition
            in={show}
            timeout={300}
            classNames="successfully-modal"
            mountOnEnter
            unmountOnExit
        >
            <div className="successfully-modal">PASSWORD SAVED SUCCESSFULLY</div>
        </CSSTransition>
        
    )
})

export default SuccessfullyModal;