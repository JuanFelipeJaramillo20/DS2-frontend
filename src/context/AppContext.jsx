import PropTypes from 'prop-types';
import { createContext, useMemo, useState } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [globalStateExample, setGlobalStateExample] = useState(false);

  const values = useMemo(
    () => ({
      globalStateExample,
      setGlobalStateExample,
    }),
    [globalStateExample, setGlobalStateExample]
  );

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppProvider;

AppProvider.propTypes = {
    children: PropTypes.node.isRequired
}
