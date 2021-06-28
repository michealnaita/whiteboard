import React from "react";
import SideMenu from "./Components/SideMenu";
import ClientMenu from "./Components/ClientMenu";
import { GlobalStyle, theme } from "./Components/styles/global_styles";
import { ThemeProvider } from "styled-components";
import Canvas from "./Components/Canvas";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SideMenu />
      <ClientMenu />
      <GlobalStyle />
      <Canvas />
    </ThemeProvider>
  );
}

export default App;
