import { FC } from "react";
import { Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled Container
const StyledContainer = styled(Container)({
  display: "flex",
  justifyContent: "center", // Center the header text
  height: "50px", // Set a specific height for the header
});

const Header: FC = () => {
  return (
    <header>
      <StyledContainer maxWidth="xl">
        <Typography variant="h4" component="h1">
          PhoneBook Application
        </Typography>
      </StyledContainer>
    </header>
  );
};

export default Header;
