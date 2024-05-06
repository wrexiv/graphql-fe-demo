import React from "react";

import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = createTheme({
    palette: {},
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            boxShadow: "none",
            ":hover": {
              boxShadow: "none",
            },
          },
        },
      },
    },
  });
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default ThemeProvider;
