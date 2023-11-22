import AppProvider from "./context/AppContext";
import { RoutesConfiguration } from "./route/Route";

import "./App.css";

function App() {
  return (
    <AppProvider>
      <RoutesConfiguration />
    </AppProvider>
  );
}

export default App;
