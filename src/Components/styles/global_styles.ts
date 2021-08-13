import { createGlobalStyle } from "styled-components";
export const theme = (mode: "light" | "dark") => {
  const themeObject = {
    colors: {
      JET: "#292929",
      menu_links: "#989898",
      blue: "#2680EB",
    },
    shadow: {
      _1: "0px 3px 6px rgba(0, 0, 0, 0.1)",
      _2: "0px 3px 6px rgba(0, 0, 0, 0.5)",
    },
    toolbar: {
      background_color: "",
      background_color_darker: "",
      highlight_color: "#202020",
    },

    flex: (JC, AI, direction?) => `
    display:flex;
    flex-direction:${direction || "row"};
    justify-content:${JC};
    align-items:${AI};
    `,
  };
  const light_theme = {
    primary: "#D9D9D9",
    secondary: "#CCCCCC",
    highlight: "#DF5426",
  };
  const dark_theme = {
    primary: "#292929",
    secondary: "#262525",
    highlight: "#202020",
  };
  if (mode === "light") {
    return {
      ...themeObject,
      toolbar: {
        ...light_theme,
      },
    };
  } else {
    return {
      ...themeObject,
      toolbar: {
        ...dark_theme,
      },
    };
  }
};

export const GlobalStyle = createGlobalStyle`
*{
    font-family:"Segoe UI";
}
 ul{
   list-style:none;
 }`;
