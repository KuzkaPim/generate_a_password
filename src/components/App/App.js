import { useState, useCallback } from "react";

import MainScreen from "../MainScreen/MainScreen";
import Passwords from "../Passwords/Passwords";
import CreatePassword from "../CreatePassword/CreatePassword";
import SuccessfullyModal from "../SuccessfullyModal/SuccessfullyModal";

const App = () => {
	const [showModal, setShowModal] = useState('');
	const [password, setPassword] = useState('ENTER THE LENGTH, SELECT OPTIONS AND CLICK');
	const [showSaved, setShowSaved] = useState(false);
	const [savedPasswords, setSavedPasswords] = useState([]);
	const [id, setId] = useState(1);
	const [showSuccessfullyModal, setShowSuccessfullyModal] = useState(false);

	const onSavePassword = (password, areaOfUsed) => {
		setSavedPasswords(savedPasswords => [...savedPasswords, {password, areaOfUsed, id}]);
		setId(id => id + 1);
	}

	const closeSuccessfullyModal = useCallback(() => {
		setTimeout(() => setShowSuccessfullyModal(false), 2000);
	}, [])

	const onDeletePassword = (id) => {
		const newSavedPasswords = savedPasswords.filter(item => item.id !== id);

		setSavedPasswords(newSavedPasswords);
	}

	return (
		<div className="App">
			<div className="main-buttons">
				<button 
					onClick={() => setShowModal('generate')}
					className="main-buttons__btn">
						Generate a password
				</button>
				<button 
					onClick={() => setShowModal('create')}
					className="main-buttons__btn">
						Create a password
				</button>
				<button 
					onClick={() => setShowSaved(true)}
					className="main-buttons__passwords">
						SAVED PASSWORDS
				</button>
			</div>
			<MainScreen 
				setPassword={setPassword} 
				password={password} 
				showModal={showModal} 
				setShowModal={setShowModal} 
				onSavePassword={onSavePassword}
				showSuccessfullyModal={showSuccessfullyModal}
				setShowSuccessfullyModal={setShowSuccessfullyModal}/>
			<CreatePassword 
				setShowModal={setShowModal} 
				showModal={showModal}
				onSavePassword={onSavePassword}
				showSuccessfullyModal={showSuccessfullyModal}
				setShowSuccessfullyModal={setShowSuccessfullyModal}/>
			<Passwords 
				savedPasswords={savedPasswords} 
				setShowSaved={setShowSaved} 
				onDeletePassword={onDeletePassword} 
				showSaved={showSaved}/>
			<SuccessfullyModal show={showSuccessfullyModal} setShow={closeSuccessfullyModal}/>
		</div>
	);
}

export default App;
