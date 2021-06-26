import Demo from "./demo";
import PlayGround from "./playground";
import SideMenu from "./Components/SideMenu";
import ClientMenu from "./Components/ClientMenu";
import { ThemeProvider } from "styled-components";
import { theme, GlobalStyle } from "./Components/styles/global_styles";
import Canvas from "./Components/Canvas";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <>
        <SideMenu />
        <ClientMenu />
        <Canvas />
      </>
    </ThemeProvider>
  );
}

export default App;
