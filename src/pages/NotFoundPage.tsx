import { Box, Button, Container, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../hooks/useTranslation";
import { useState, useEffect } from "react";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const [animalImage, setAnimalImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const errorTitle = useTranslation("Oops~ You have found our secret pet paradise");
  const errorMessage = useTranslation("While the page you're looking for seems to be playing hide and seek, we've got some adorable friends to keep you company! 🐾");
  const backButtonText = useTranslation("Take Me Home");
  const loadingText = useTranslation("Finding a furry friend for you...");

  useEffect(() => {
    const fetchRandomAnimal = async () => {
      try {
        const isCat = Math.random() > 0.5;
        const apiUrl = isCat ? "https://api.thecatapi.com/v1/images/search" : "https://api.thedogapi.com/v1/images/search";

        const response = await fetch(apiUrl);
        const data = await response.json();
        setAnimalImage(data[0].url);
      } catch (error) {
        console.error("Error fetching animal image:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomAnimal();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        minHeight: "calc(100vh - 140px)",
        py: 8,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            textAlign: "center",
            "& > *": { mb: 2 },
          }}
        >
          <Box
            sx={{
              mb: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {loading ? (
              <Box sx={{ textAlign: "center", mb: 2 }}>
                <CircularProgress size={60} />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {loadingText}
                </Typography>
              </Box>
            ) : (
              animalImage && (
                <Box
                  component="img"
                  src={animalImage}
                  alt="Cute animal"
                  sx={{
                    width: "100%",
                    maxWidth: 300,
                    height: 300,
                    objectFit: "cover",
                    borderRadius: 4,
                    boxShadow: (theme) => (theme.palette.mode === "light" ? "0 8px 24px rgba(0,0,0,0.12)" : "0 8px 24px rgba(255,255,255,0.08)"),
                    mb: 3,
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.02)",
                    },
                  }}
                />
              )
            )}
          </Box>

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

export default NotFoundPage;
