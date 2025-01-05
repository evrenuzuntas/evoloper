import { Box, Button, Container, Typography } from "@mui/material";
import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useTranslation } from "../hooks/useTranslation";

const ErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  const is404 = isRouteErrorResponse(error) && error.status === 404;

  const errorTitle = useTranslation(is404 ? "Page Not Found" : "Oops! Something went wrong");
  const errorMessage = useTranslation(is404 ? "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable." : "We apologize for the inconvenience. Please try again later.");
  const backButtonText = useTranslation("Back to Home");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        py: 12,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            textAlign: "center",
            "& > *": { mb: 2 },
          }}
        >
          <ErrorOutlineIcon
            sx={{
              fontSize: 64,
              color: "error.main",
              mb: 2,
            }}
          />

          {is404 && (
            <Typography
              variant="h1"
              sx={{
                fontSize: "8rem",
                fontWeight: "bold",
                color: "primary.main",
                lineHeight: 1,
                mb: 2,
              }}
            >
              404
            </Typography>
          )}

          <Typography variant="h4" component="h1" gutterBottom>
            {errorTitle}
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            {errorMessage}
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/")}
            sx={{
              mt: 2,
              px: 4,
              py: 1,
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            {backButtonText}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ErrorBoundary;
