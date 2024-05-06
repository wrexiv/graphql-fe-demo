import { Box } from "@mui/material";
import Header from "./Header";

type PropsType = {
  children: React.ReactNode;
};

const Layout = ({ children }: PropsType) => {
  return (
    <Box>
      <Header />
      {children}
    </Box>
  );
};

export default Layout;
