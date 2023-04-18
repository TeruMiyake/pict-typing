import React from 'react';
import './App.scss';
import { DragAndDrop } from './components/DragAndDrop';
import { ImageList } from './components/ImageList';

export const App = () => {
	return (
		<div className="App">
			<DragAndDrop />
			<ImageList />
		</div>
	);
};
