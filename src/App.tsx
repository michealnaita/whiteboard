import React from "react";
import SideMenu from "./Components/SideMenu";
import ClientMenu from "./Components/ClientMenu";
import { GlobalStyle, theme } from "./Components/styles/global_styles";
import { ThemeProvider } from "styled-components";
import Canvas from "./Components/Canvas";
import Demo from "./demo";
import AppContainer from "./Components/styles/theme";

function App() {
  return (
    <AppContainer>
      <SideMenu />
      <ClientMenu />
      <GlobalStyle />
      <Canvas />
    </AppContainer>
  );
}

export default App;
