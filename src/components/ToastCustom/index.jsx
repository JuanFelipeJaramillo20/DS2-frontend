/* eslint-disable react/prop-types */
import Toast from 'react-bootstrap/Toast';

const ToastCustom = (props) => {
  return (
    <Toast
      onClose={() => props.setShow(false)}
      show={props.show}
      delay={3000}
      autohide
      className='position-fixed top-0 start-50 translate-middle-x mt-2 m-md-2 toast-custom'
    >
      <Toast.Header closeButton={false} className='toast-custom__header'>
        <img src='/logo.svg' height='30' className='me-2' alt='app logo' />
        <strong className='me-auto'>Gym App</strong>
      </Toast.Header>
      <Toast.Body>{props.message}</Toast.Body>
    </Toast>
  );
};

export default ToastCustom;