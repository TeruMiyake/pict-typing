// React Component with which users can save their name in localStorage
import React, { useState, useEffect } from 'react';

export const SaveUserName: React.FC = () => {
	const [name, setName] = useState('');
	const [savedName, setSavedName] = useState('');

	useEffect(() => {
		const savedName = localStorage.getItem('name');
		if (savedName) {
			setSavedName(savedName);
		}
	}, []);

	const saveName = () => {
		localStorage.setItem('name', name);
		setSavedName(name);
	};

	return (
		<div>
			<input type="text" value={name} onChange={(e) => setName(e.target.value)} />
			<button onClick={saveName}>Save</button>
			<p>{savedName}</p>
		</div>
	);
};
