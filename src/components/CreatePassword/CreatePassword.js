import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import './CreatePassword.scss';

const CreatePassword = ({setShowModal, showModal, onSavePassword, showSuccessfullyModal, setShowSuccessfullyModal}) => {
    const [password, setPassword] = useState(''),
          [areaOfUse, setAreaOfUse] = useState('');

    const onSave = () => {
        if (password.length > 3 && password.length < 41) {
            onSavePassword(password, areaOfUse);
            setPassword('');
            setAreaOfUse('');
            setShowSuccessfullyModal(true);
        }
    }

    return (
        <CSSTransition
            in={showModal === 'create'}
            timeout={300}
            classNames="create-password"
            mountOnEnter
            unmountOnExit
        >
            <div className="create-password__container">
                <div className="create-password">
                    <div onClick={() => setShowModal('')} className="create-password__close">
                        <span></span>
                        <span></span>
                    </div>
                    <h2 className='create-password__title'>CREATE A PASSWORD</h2>
                    <input 
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        type="text" 
                        className={`create-password__password ${password ? 'active' : ''}`} 
                        placeholder='PASSWORD'/>
                    <input 
                        onChange={e => setAreaOfUse(e.target.value)}
                        value={areaOfUse}
                        type="text" 
                        className={`create-password__area-of-use ${areaOfUse ? 'active' : ''}`} 
                        placeholder='AREA OF USE'/>
                    <button
                        onClick={onSave} 
                        disabled={showSuccessfullyModal}
                        className='create-password__save'>
                            SAVE
                    </button>
                </div>
            </div>
        </CSSTransition>
    )
}

export default CreatePassword;