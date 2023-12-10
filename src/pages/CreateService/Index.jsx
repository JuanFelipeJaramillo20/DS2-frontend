import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import "./style.css";

const CreateService = () => {

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const currentDate = new Date();
    const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
    const [formData, setFormData] = useState({
        titulo: '',
    descripcion: '',
    precio: '',
    fecha_exp: nextMonthDate.toISOString().split('T')[0],
    categorias: [],
    imagenes_url: [],
    estado: 'Disponible',
    id_ofertante: Number(localStorage.getItem("user_id"))
    });


    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
    }, [])

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDrop })

    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem("token");
        for (const file of acceptedFiles) {
            const formDataImgs = new FormData();
            formDataImgs.append('file', file);
            formDataImgs.append("upload_preset", "pmickcjc");
            formDataImgs.append("api_key", "711663863577999");

            try {
                const response = await axios.post('https://api.cloudinary.com/v1_1/dtgou3hjo/image/upload', formDataImgs);
                console.log(response.data);
                const imageUrl = response.data.secure_url;
                await setFormData({...formData, imagenes_url: [... formData.imagenes_url, imageUrl]})

                const createOfferResponse = await axios.post(`${BASE_URL}/offer`, formData, {
                    headers: {
                        Authorization: token,
                    },
                });
                console.log(createOfferResponse.data);
            } catch (error) {
                console.error(error);
            }
        }
    };


    return (
        <div className="create__main-container">
            <form className="create__form-container" onSubmit={handleSubmit}>
                <div {...getRootProps()} className='create__file-input'>
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                            <p>Drop the files here ...</p> :
                            <p>Drag 'n' drop some files here, or click to select files</p>
                    }
                </div>
                <div className="create__image-previews">
                {acceptedFiles.map((imageUrl, index) => (
                        <img key={index} src={URL.createObjectURL(imageUrl)} alt={`Preview ${index}`} style={{ height: "200px" }} />
                    ))}
                </div>
                <div className="create__input-container">
                    <div className="create__left-container">
                        <label htmlFor="title" className='create__label'>TITLE OF YOUR POST</label>
                        <input type="text" className='create__title-input' name="title" id="title" onChange={(e) => {setFormData({...formData, titulo: e.target.value})}}/>
                        <label htmlFor="description" className='create__label'>DESCRIPTION OF YOUR POST</label>
                        <textarea type="text" className='create__description-input' name="description" id="description" onChange={(e) => {setFormData({...formData, descripcion: e.target.value})}}/>
                        <label htmlFor="title" className='create__label'>CATEGORY OF YOUR POST</label>
                        <select name="category" id="category" className='create__extras-input' onChange={(e) => {setFormData({...formData, categorias: [e.target.value]})}}>
                            <option value="">Select a category</option>
                            <option value="misc">Miscelaneo</option>
                        </select>
                    </div>
                    <div className="create__right-container">
                        <label htmlFor="" className='create__label'>COST OF YOUR SERVICE</label>
                        <InputGroup className="mb-3 create__place-input">
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control aria-label="Amount (to the nearest dollar)" onChange={(e) => {setFormData({...formData, precio: e.target.value})}}/>
                            <InputGroup.Text>.00</InputGroup.Text>
                        </InputGroup>
                        
                    </div>
                </div>

                <button type="submit" className='create__button'>Create</button>
            </form>
        </div>
    )
}

export default CreateService;