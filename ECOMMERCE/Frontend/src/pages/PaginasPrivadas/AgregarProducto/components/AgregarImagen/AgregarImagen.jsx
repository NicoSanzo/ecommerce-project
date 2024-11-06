import React, { forwardRef, useRef, useState } from 'react';
import './AgregarImagenStyle.css';


export const ImageUploader = forwardRef(({ onChange,error }, ref) => {
    const [image, setImage] = useState(null);
  

    const handleImageChange = (event) => {
       
        const selectedImage = event.target.files[0];
        if (selectedImage && selectedImage.type.startsWith('image/')) {
            setImage(selectedImage);

            if (ref && ref.current) {
                ref.current = selectedImage;
            }      
        }
        onChange && onChange(ref.current); 
          
    };
    

    const handleRemoveImage = () => {
        setImage(null);
        if (ref && ref.current) {
            ref.current = null;
        }
        
        onChange && onChange(ref.current); // Pasamos null al componente padre si se elimina la imagen
    };

    

    return (
        <>
        
            <div className="image-upload">
                
                <label className="custom-label">
                    <span>Selecciona una imagen</span>
                    <input
                        ref={ref}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="file-input"
                       
                    />
                </label>        
            </div>
 
            <div>
                {image && (
                    <div className="image-container" >
                        <button className="remove-button" onClick={handleRemoveImage}>✖</button>
                         <img src={URL.createObjectURL(image)} alt="vista previa" />
                    </div>
                )}
                {error && <span className="error-message">{error}</span>}
            </div>       
        </>
    );
});
