import { createGlobalStyle } from "styled-components";
export const theme = {
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

export const GlobalStyle = createGlobalStyle`
*{
    font-family:"Segoe UI"
}
 ul{
   list-style:none
 }
`;
