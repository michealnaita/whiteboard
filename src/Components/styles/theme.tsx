import React, { ReactNode, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./global_styles";
import { connect } from "react-redux";
import useLocalStorage from "../../helpers/useLocalStorage";

function select(state) {
  return {
    toolbarTheme: state.canvas.toolbarTheme,
  };
}
function AppContainer({
  children,
  toolbarTheme,
}: {
  children: ReactNode;
  toolbarTheme: "light" | "dark";
}) {
  const [toolbarThemeLocal, setToolbarThemeLocal] =
    useLocalStorage("toolbar_theme");
  useEffect(() => {
    setToolbarThemeLocal("toolbar_theme", toolbarTheme);
  }, [toolbarTheme]);
  return <ThemeProvider theme={theme(toolbarTheme)}>{children}</ThemeProvider>;
}

export default connect(select)(AppContainer);
