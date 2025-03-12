import { styled } from "@mui/system";
import { Box } from "@mui/material";

const NavbarContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",

  "& .icon-section": {
    display: "flex",
    gap: "10px",
  },
}));

export default NavbarContainer;
