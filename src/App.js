import React from "react";
import { useRoutes } from "react-router-dom";

import routes from "routes";

import "./App.scss";

const App = () => useRoutes(routes);

export default App;
