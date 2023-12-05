import PropTypes from "prop-types";
// import { useContext } from "react";

import Nav from "../components/Nav/Index";

// import { AppContext } from "../context/AppContext";

const Layout = ({ children }) => {
  // const { setOpenMenu, openMenu } = useContext(AppContext);

  return (
    <section className="layout-section">
      <Nav />
      <main>{children}</main>
      <div>footer component</div>
    </section>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
