import { Box, Container, Typography, Grid, Paper, Chip, Link, Button, useTheme } from "@mui/material";
import { Email, Phone, Language, School, Work, EmojiEvents, Person, Download } from "@mui/icons-material";
import { useTranslation } from "../hooks/useTranslation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { showSnackbar, setLoading } from "../store/slices/uiSlice";

const AboutPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const downloadText = useTranslation("Download CV");
  const errorMessage = useTranslation("CV download is currently unavailable. Please try again later.");
  const successMessage = useTranslation("CV downloaded successfully!");

  const technologies = ["React JS", "TypeScript", "JavaScript", "HTML & CSS", "Redux", "Mui", "Jira", "Git", "Figma", "Bitbucket", "Github", "Postman", "Azure", "SQL", "WordPress", "Miro", "ChatGPT"];

  const interests = ["Commercial UAV (Drone) Pilot", "Certified Dog Groomer & Walker", "3D Printing and Epoxy", "Short Range Radio Operator", "Amateur Sailor", "Microcontroller Systems", "YouTube Content Creator", "English (B2)"];

  const handleDownload = async () => {
    try {
      dispatch(setLoading({ isLoading: true }));

      // Add 2 second delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await fetch("/evren_uzuntas_cv.pdf");

      if (!response.ok) {
        throw new Error("CV file not found");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "evren_uzuntas_cv.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      dispatch(
        showSnackbar({
          message: successMessage,
          severity: "success",
        })
      );
    } catch (error) {
      console.error("Download error:", error);
      dispatch(
        showSnackbar({
          message: errorMessage,
          severity: "error",
        })
      );
    } finally {
      dispatch(setLoading({ isLoading: false }));
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Header Section */}
      <Box sx={{ mb: 6, textAlign: "center" }}>
        <Typography variant="h2" component="h1" gutterBottom>
          EVREN UZUNTAS
        </Typography>
        <Typography variant="h4" color="primary" gutterBottom>
          SOFTWARE DEVELOPER
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<Download />}
          onClick={handleDownload}
          sx={{
            mt: 2,
            px: 4,
            py: 1.5,
            borderRadius: 2,
            textTransform: "none",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: (theme) => (theme.palette.mode === "dark" ? "0 8px 16px rgba(255,255,255,0.2)" : "0 8px 16px rgba(0,0,0,0.2)"),
            },
          }}
        >
          {downloadText}
        </Button>
      </Box>

      <Grid container spacing={4}>
        {/* Left Column */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
            {/* Contact Info */}
            <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Person /> Contact
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <Phone fontSize="small" />
                <Link href="tel:+905402028484" color="inherit">
                  +90 540 202 8484
                </Link>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <Email fontSize="small" />
                <Link href="mailto:evrenuzuntas@gmail.com" color="inherit">
                  evrenuzuntas@gmail.com
                </Link>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Language fontSize="small" />
                <Link href="https://evrenuzuntas.com" target="_blank" color="inherit">
                  evrenuzuntas.com
                </Link>
              </Box>
            </Box>

            {/* Education */}
            <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1, mt: 4 }}>
              <School /> Education
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Electrical and Electronic Engineering
              </Typography>
              <Typography variant="body2" color="text.secondary">
                KIRIKKALE UNIVERSITY
              </Typography>
              <Typography variant="body2" color="text.secondary">
                2015 - 2021 • GPA 2.80
              </Typography>
            </Box>

            {/* Interests & Skills */}
            <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1, mt: 4 }}>
              <EmojiEvents /> Interests & Certificates
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {interests.map((interest, index) => (
                <Chip
                  key={index}
                  label={interest}
                  sx={{
                    bgcolor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
                  }}
                />
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            {/* About Me */}
            <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Person /> About Me
            </Typography>
            <Typography variant="body1" paragraph>
              I am a responsible and ambitious software developer with a passion for electronics and programming. I love learning new skills and exploring technology. I also enjoy traveling, sports, and can confidently operate various vehicles.
            </Typography>

            {/* Experience */}
            <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1, mt: 4 }}>
              <Work /> Experience
            </Typography>

            {/* Ambeent Inc */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Frontend Developer
              </Typography>
              <Typography variant="subtitle2" color="primary">
                Ambeent Inc., Renault Mais partner
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Apr 2021 - Ongoing • Remote
              </Typography>
              <Typography variant="body2">Developing websites and applications for Renault Mais.</Typography>
            </Box>

            {/* Pi Flow 3D */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Brand Owner and Manufacturer
              </Typography>
              <Typography variant="subtitle2" color="primary">
                Pi Flow 3D
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Jan 2024 - Jul 2024 • Izmir
              </Typography>
              <Typography variant="body2">Starting from scratch in my own garage brand. Development and repair of 3D printers. 3D product drawing, printing (creation), product development and sales</Typography>
            </Box>

            {/* Technologies */}
            <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1, mt: 4 }}>
              Technologies & Tools
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {technologies.map((tech, index) => (
                <Chip key={index} label={tech} color="primary" variant={theme.palette.mode === "dark" ? "outlined" : "filled"} sx={{ "& .MuiChip-label": { color: theme.palette.mode === "dark" ? "inherit" : "white" } }} />
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutPage;
