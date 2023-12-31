import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import ToastCustom from "../../components/ToastCustom/index";
import useToast from "../../hooks/useToast";
import Spinner from "react-bootstrap/Spinner";
import useSpinner from "../../hooks/useSpinner";
import "./style.css";

const CreateService = () => {

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const currentDate = new Date();
    const { showToast, toggleToast } = useToast();
    const { isLoading, toggleSpinner } = useSpinner();
    const [errMsg, setErrMsg] = useState("");
    const [imagesUploaded, setImagesUploaded] = useState(false);
    const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        precio: '',
        fecha_exp: nextMonthDate.toISOString().split('T')[0],
        categorias: [],
        estado: 'Disponible',
        id_ofertante: Number(localStorage.getItem("user_id"))
    });


    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
    }, [])

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDrop })

    const handleSubmit = async (event) => {
        event.preventDefault();
        toggleSpinner(true);
        const token = localStorage.getItem("token");
        const imgs = [];
        for (const file of acceptedFiles) {
            const formDataImgs = new FormData();
            formDataImgs.append('file', file);
            formDataImgs.append("upload_preset", "pmickcjc");
            formDataImgs.append("api_key", "711663863577999");

            try {
                const response = await axios.post('https://api.cloudinary.com/v1_1/dtgou3hjo/image/upload', formDataImgs);
                console.log(response.data);
                const imageUrl = response.data.secure_url;
                imgs.push(imageUrl);
            } catch (error) {
                console.error(error);
            }
        }

        try {
            console.log("URLS", imgs);
            const createOfferResponse = await axios.post(`${BASE_URL}/offer`, {...formData, imagenes_url: imgs}, {
                headers: {
                    Authorization: token,
                },
            });
            console.log(createOfferResponse.data);
            toggleToast(true);
            toggleSpinner(false);
            setErrMsg(createOfferResponse.data);
        } catch (error) {
            console.error(error);
            setErrMsg(error);
            toggleToast(true);
            toggleSpinner(false);
        }
    };


    return (
        <div className="create__main-container">
            <ToastCustom message={errMsg} show={showToast} setShow={toggleToast} />
            {isLoading && (
                <Spinner animation="border" role="status" className='spinner'>
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}
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
                        <input type="text" className='create__title-input' name="title" id="title" onChange={(e) => { setFormData({ ...formData, titulo: e.target.value }) }} />
                        <label htmlFor="description" className='create__label'>DESCRIPTION OF YOUR POST</label>
                        <textarea type="text" className='create__description-input' name="description" id="description" onChange={(e) => { setFormData({ ...formData, descripcion: e.target.value }) }} />
                        <label htmlFor="title" className='create__label'>CATEGORY OF YOUR POST</label>
                        <select name="category" id="category" className='create__extras-input' onChange={(e) => { setFormData({ ...formData, categorias: [e.target.value] }) }}>
                            <option value="">Select a category</option>
                            <option value="misc">Miscelaneo</option>
                            <option value="plom">Plomería</option>
                            <option value="carp">Carpintería</option>
                            <option value="elect">Eléctrico</option>
                            <option value="other">Otro</option>
                            v
                        </select>
                    </div>
                    <div className="create__right-container">
                        <label htmlFor="" className='create__label'>COST OF YOUR SERVICE</label>
                        <InputGroup className="mb-3 create__place-input">
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control aria-label="Amount (to the nearest dollar)" onChange={(e) => { setFormData({ ...formData, precio: e.target.value }) }} />
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