// src/components/ImageList.tsx
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface ImageData {
	id: string;
	dataUrl: string;
}

export const ImageList: React.FC = () => {
	const [images, setImages] = useState<ImageData[]>([]);

	useEffect(() => {
		const storedImages: ImageData[] = [];
		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i);
			if (key) {
				const dataUrl = localStorage.getItem(key);
				if (dataUrl) {
					storedImages.push({
						id: key,
						dataUrl
					});
				}
			}
		}
		setImages(storedImages);
	}, []);

	const generateImageCopy = (id: string) => {
		const image = images.find((img) => img.id === id);
		if (image) {
			const newId = uuidv4();
			localStorage.setItem(newId, image.dataUrl);
			setImages([...images, { id: newId, dataUrl: image.dataUrl }]);
		}
	};

	return (
		<div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
			{images.map((image) => (
				<div key={image.id} style={{ position: 'relative', display: 'inline-block' }}>
					<img src={image.dataUrl} alt="Uploaded" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
					<button
						onClick={() => generateImageCopy(image.id)}
						style={{
							position: 'absolute',
							top: '0',
							right: '0',
							backgroundColor: 'red',
							borderRadius: '50%',
							width: '20px',
							height: '20px',
							border: 'none',
							cursor: 'pointer'
						}}
					>
						+
					</button>
				</div>
			))}
		</div>
	);
};
