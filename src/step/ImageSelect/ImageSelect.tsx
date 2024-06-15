import React from 'react';
import { useImageContext } from '../../context/ImageContext';

import styles from './ImageSelect.module.css';

const IMAGE_WIDTH_HEIGHT_ERROR = 'The images width or height is different.';

const ImageSelect: React.FC<{}> = ({ }) => {
    const [error, setError] = React.useState<string>('');
    const onloadCountRef = React.useRef(0);
    const { setWidth, setHeight, imageElements, setImageElements } = useImageContext();
    
    const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            onloadCountRef.current = 0;

            let imageElementsArray: HTMLImageElement[] = [];

            const clearImageElementsArray = () => {
                imageElementsArray.forEach((imageElement) => URL.revokeObjectURL(imageElement.src));
                imageElementsArray = [];
            }
            
            let imagesWidth = 0;
            let imagesHeight = 0;

            for (let index = 0; index < event.target.files.length; index++) {
                const imageElement = new Image();
                imageElement.src = URL.createObjectURL(event.target.files[index]);
                imageElement.onload = () => {
                    if (!imagesWidth) {
                        imagesWidth = imageElement.naturalWidth;
                    } else {
                        if (imagesWidth !== imageElement.naturalWidth) {
                            setError(IMAGE_WIDTH_HEIGHT_ERROR);
                            clearImageElementsArray();
                            return;
                        }
                    }
                    if (!imagesHeight) {
                        imagesHeight = imageElement.naturalHeight;
                    } else {
                        if (imagesHeight !== imageElement.naturalHeight) {
                            setError(IMAGE_WIDTH_HEIGHT_ERROR);
                            clearImageElementsArray();
                            return;
                        }
                    }
                    imageElementsArray.push(imageElement);

                    onloadCountRef.current++;

                    if (onloadCountRef.current === event.target.files?.length) {
                        setWidth(imagesWidth);
                        setHeight(imagesHeight);
                        setImageElements(imageElementsArray);
                    }
                }     
            }
        }
    };

    return (
        <div>
            <header>Please select your images</header>
            <input type="file" name="myImage" multiple onChange={onImageChange}/>
            {error}
            <div>
                {imageElements.map((imageElement) => (
                    <img src={imageElement.src} width={100} />
                ))}
            </div>
        </div>
    )
};

export default ImageSelect;