import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home";
import GlobalStyle from "./styles/GlobalStyles";

const router = createBrowserRouter([{ path: '/', element: <Home /> }]);

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
