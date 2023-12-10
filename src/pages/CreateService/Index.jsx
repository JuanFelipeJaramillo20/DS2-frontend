import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import "./style.css";

const CreateService = () => {

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        place: '',
        cost: '',
        extras: '',
        estado: 'open'
    });


    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
    }, [])
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDrop })

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Upload the file to the server
        for (const file of acceptedFiles) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append("upload_preset", "pmickcjc");
            formData.append("api_key", "711663863577999");

            try {
                const response = await axios.post('https://api.cloudinary.com/v1_1/dtgou3hjo/image/upload', formData);
                console.log(response.data);
                const imageUrl = response.data.secure_url;

                const offerData = {
                    ...formData,
                    imageUrl,
                };

                const createOfferResponse = await axios.post(`${BASE_URL}/v1/offer`, offerData);
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
                {acceptedFiles[0] && (
                    <img src={URL.createObjectURL(acceptedFiles[0])} alt="" style={{height: "200px"}}/>
                )}
                <div className="create__input-container">
                    <div className="create__left-container">
                        <label htmlFor="title" className='create__label'>TITLE OF YOUR POST</label>
                        <input type="text" className='create__title-input' name="title" id="title" onChange={(e) => {setFormData({...formData, title: e.target.value})}}/>
                        <label htmlFor="description" className='create__label'>DESCRIPTION OF YOUR POST</label>
                        <textarea type="text" className='create__description-input' name="description" id="description" onChange={(e) => {setFormData({...formData, description: e.target.value})}}/>
                        <label htmlFor="title" className='create__label'>CATEGORY OF YOUR POST</label>
                        <select name="category" id="category" className='create__extras-input' onChange={(e) => {setFormData({...formData, category: e.target.value})}}>
                            <option value="">Select a category</option>
                        </select>
                    </div>
                    <div className="create__right-container">
                        <label htmlFor="place" className='create__label'>PLACE OF YOUR POST</label>
                        <input className='create__place-input' type="text" name="place" id="place" onChange={(e) => {setFormData({...formData, sitio: e.target.value})}}/>
                        <label htmlFor="" className='create__label'>COST OF YOUR SERVICE</label>
                        <InputGroup className="mb-3 create__place-input">
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control aria-label="Amount (to the nearest dollar)" onChange={(e) => {setFormData({...formData, precio: e.target.value})}}/>
                            <InputGroup.Text>.00</InputGroup.Text>
                        </InputGroup>
                        <label htmlFor="extras" className='create__label'>EXTRA COMMENTS</label>
                        <input type="text" className='create__extras-input' name="extras" id="extras" onChange={(e) => {setFormData({...formData, extras: e.target.value})}}/>
                    </div>
                </div>

                <button type="submit" className='create__button'>Create</button>
            </form>
        </div>
    )
}

export default CreateService;