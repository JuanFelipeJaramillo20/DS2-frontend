import PropTypes from "prop-types";
import { useContext } from "react";

import { AppContext } from "../context/AppContext";

const Layout = ({ children }) => {
  const { setOpenMenu, openMenu } = useContext(AppContext);

  return (
    <section className="layout-section">
      <div
        onClick={() => {
          setOpenMenu((prev) => !prev);
        }}
      >
        {openMenu ? "open" : "close"}
      </div>
      <main>{children}</main>
      <div>footer component</div>
    </section>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
