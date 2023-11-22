import PropTypes from "prop-types";

import "./style.css";

const Loader = ({ isFullScreen }) => {
  if (isFullScreen) {
    return (
      <div className="loader--lazy__container">
        <span className="loader--lazy"></span>
      </div>
    );
  }

  return <span className="loader--lazy"></span>;
};

export default Loader;

Loader.propTypes = {
  isFullScreen: PropTypes.bool,
};
