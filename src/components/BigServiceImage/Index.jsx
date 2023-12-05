import { useNavigate } from 'react-router';

import './style.css'

// props => {service.img || service}
const BigServiceImage = () => {
    const history = useNavigate();
    return (
        <section onClick={() => {
            history('/services/{service.id}')
        }} className='big-service-img__container'>
            <img src="/vite.png" alt="service main picture" />
        </section>
    );
}

export default BigServiceImage