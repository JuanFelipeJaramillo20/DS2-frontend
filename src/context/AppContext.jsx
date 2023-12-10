import PropTypes from "prop-types";
import { createContext, useMemo, useState } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [updateUserFetch, setUpdateUserFetch] = useState(false);

  const values = useMemo(
    () => ({
      openMenu,
      setOpenMenu,
      updateUserFetch,
      setUpdateUserFetch,
    }),
    [openMenu, setOpenMenu, updateUserFetch, setUpdateUserFetch]
  );

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppProvider;

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
