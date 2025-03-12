import { Box, Typography } from "@mui/material";

/**
 * Footer Component
 *
 * This component displays a simple footer message at the bottom of the application.
 * It informs users that AI-generated responses may contain errors and provides a link to the Terms & Conditions.
 */

const Footer = () => {
  return (
    <Box>
      <Typography textAlign="center">
        AI can make mistakes. Check our Terms & Conditions
      </Typography>
    </Box>
  );
};

export default Footer;
