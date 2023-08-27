import { CSSTransition } from 'react-transition-group';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

import './Passwords.scss';
import trashImg from '../../resourses/trash.png';

const Passwords = ({savedPasswords, setShowSaved, onDeletePassword, showSaved}) => {
    const renderItems = () => {
        const passwords = savedPasswords.map(item => {
            return (
                <li key={item.id} className="passwords__password">
                    <div className="passwords__subtitle">
                        <h3>Password</h3>
                        <div>{item.password}</div>
                    </div>
                    <div className="passwords__used">
                        <h3>Area of use</h3>
                        <div>{item.areaOfUsed || '-'}</div>
                    </div>
                    <div className="passwords__trash">
                        <img 
                            onClick={() => onDeletePassword(item.id)}
                            src={trashImg} 
                            alt="delete" 
                            className="passwords__delete" />
                    </div>
                </li>
            )
        });

        return passwords.length ? <ul className="passwords__passwords">
                                      {passwords}
                                  </ul> : <div className='passwords__no-passwords'>NO PASSWORDS</div>;
    }

    

    const duration = 300;

    return (
        <CSSTransition
            in={showSaved}
            timeout={duration}
            classNames="passwords"
            mountOnEnter
            unmountOnExit
        >
            <div className="passwords__container">
                <div className="passwords">
                    <div onClick={() => setShowSaved(false)} className="passwords__close">
                        <span></span>
                        <span></span>
                    </div>
                    <SimpleBar style={{ maxHeight: '80vh', width: '100%', minHeight: '80vh' }} autoHide={false}>
                        <h2 className="passwords__title">Saved passwords</h2>
                        {renderItems()}
                    </SimpleBar>
                </div>
            </div>
        </CSSTransition>
        
    )
}

export default Passwords;