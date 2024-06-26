import { createTheme } from "@mui/material/styles";
import { red,blue } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    
    error: {
      main: red.A400,
    },
    warning: {
      main: "#F4D03F",
    },
    success:{
      main:"#4b0082"
    }
  },
});

export default theme;
