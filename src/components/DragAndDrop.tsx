// src/components/DragAndDrop.tsx
import React, { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const DragAndDrop: React.FC = () => {
	// 大きめの関数なので useCallback でメモ化して軽量化を図る……
	// が、useCallback の挙動をちゃんと理解していないので、意味のないものになっているかも
	const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
		// フォームが持つデフォルトの機能をキャンセルする
		// つまり、フォーム内容を送信するためにページがリロードされることを防ぐ
		e.preventDefault();

		const files = Array.from(e.dataTransfer.files);
		// forEach ループ内で毎回 FileReader を新規作成するのは、
		// ファイル読み込み順の変動による誤作動を防止するため。
		// forEach ブロックより先に reader を生成して使いまわすと、
		// ある画像の読み込みが完了する前に、同じ FileReader が次の画像の読み込みを始めてしまい、
		// 違う file に大して onload イベントが発火するなどの問題が起き得る。
		files.forEach((file) => {
			const reader = new FileReader();
			reader.onload = (event) => {
				const result = event.target?.result;
				if (typeof result === 'string') {
					const id = uuidv4();
					localStorage.setItem(id, result);
				}
			};
			reader.readAsDataURL(file);
		});
	}, []);

	const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	return (
		<div
			style={{
				width: '100%',
				minHeight: '200px',
				border: '2px dashed gray',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			}}
			onDrop={onDrop}
			onDragOver={onDragOver}
		>
			<p>Drag and drop images here</p>
		</div>
	);
};
