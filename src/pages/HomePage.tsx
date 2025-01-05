import { Box, Container, Typography, Paper, Grid } from "@mui/material";
import { useTranslation } from "../hooks/useTranslation";
import DevelopmentAlert from "../components/DevelopmentAlert";
import CodeIcon from "@mui/icons-material/Code";
import BrushIcon from "@mui/icons-material/Brush";
import SpeedIcon from "@mui/icons-material/Speed";

const HomePage = () => {
  const welcomeText = useTranslation("Welcome to Evoloper");
  const descriptionText = useTranslation("Your modern web development journey starts here.");

  const features = [
    {
      icon: <CodeIcon sx={{ fontSize: 40 }} />,
      title: useTranslation("Modern Stack"),
      description: useTranslation("Built with React, TypeScript, and Material-UI"),
    },
    {
      icon: <BrushIcon sx={{ fontSize: 40 }} />,
      title: useTranslation("Beautiful Design"),
      description: useTranslation("Clean and modern user interface with dark mode support"),
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40 }} />,
      title: useTranslation("Performance"),
      description: useTranslation("Optimized for speed and better user experience"),
    },
  ];

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <DevelopmentAlert />

        <Typography variant="h3" component="h1" gutterBottom align="center">
          {welcomeText}
        </Typography>
        <Typography variant="h5" color="text.secondary" align="center" sx={{ mb: 6 }}>
          {descriptionText}
        </Typography>

        <Grid container spacing={4} sx={{ mt: 2 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <Box
                  sx={{
                    p: 2,
                    borderRadius: "50%",
                    backgroundColor: "primary.main",
                    color: "white",
                    mb: 2,
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
