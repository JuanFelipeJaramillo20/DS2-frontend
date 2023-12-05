import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import "./style.css";

const CreateService = () => {

    const [file, setFile] = useState(null);

    const handleChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Upload the file to the server
        const formData = new FormData();
        formData.append('file', file);

        fetch('/upload', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                // Handle the upload response
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className="create__main-container">
            <form className="create__form-container" onSubmit={handleSubmit}>
                <input type="file" className='create__file-input' onChange={handleChange} />
                <div className="create__input-container">
                    <div className="create__left-container">
                        <label htmlFor="title">TITLE OF YOUR POST</label>
                        <input type="text" className='create__title-input' name="title" id="title" />
                        <label htmlFor="description">DESCRIPTION OF YOUR POST</label>
                        <textarea type="text" className='create__description-input' name="description" id="description" />
                    </div>
                    <div className="create__right-container">
                    <label htmlFor="place">PLACE OF YOUR POST</label>
                        <input className='create__place-input' type="text" name="place" id="place" />
                        <label htmlFor="">COST OF YOUR SERVICE</label>
                        <InputGroup className="mb-3 create__place-input">
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control aria-label="Amount (to the nearest dollar)" />
                            <InputGroup.Text>.00</InputGroup.Text>
                        </InputGroup>
                        <label htmlFor="extras">EXTRA COMMENTS</label>
                        <input type="text" className='create__extras-input' name="extras" id="extras" />
                    </div>
                </div>

                <button type="submit" className='create__button'>Create</button>
            </form>
        </div>
    )
}

export default CreateService;