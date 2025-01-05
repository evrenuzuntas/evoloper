import { Box, Container, Typography, Paper, Grid, Link, useTheme, useMediaQuery } from "@mui/material";
import { Email, Phone, LinkedIn, GitHub, Language, LocationOn } from "@mui/icons-material";
import { useTranslation } from "../hooks/useTranslation";

const ContactPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const contactInfo = [
    {
      icon: <Email fontSize="large" />,
      title: "Email",
      value: "evrenuzuntas@gmail.com",
      link: "mailto:evrenuzuntas@gmail.com",
    },
    {
      icon: <Phone fontSize="large" />,
      title: useTranslation("Phone"),
      value: "+90 540 202 8484",
      link: "tel:+905402028484",
    },
    {
      icon: <LinkedIn fontSize="large" />,
      title: "LinkedIn",
      value: "linkedin.com/in/evrenuzuntas",
      link: "https://linkedin.com/in/evrenuzuntas",
    },
    {
      icon: <GitHub fontSize="large" />,
      title: "GitHub",
      value: "github.com/evrenuzuntas",
      link: "https://github.com/evrenuzuntas",
    },
    {
      icon: <Language fontSize="large" />,
      title: useTranslation("Website"),
      value: "evrenuzuntas.com",
      link: "https://evrenuzuntas.com",
    },
    {
      icon: <LocationOn fontSize="large" />,
      title: useTranslation("Location"),
      value: "İzmir, Turkey",
      link: "https://maps.google.com/?q=İzmir,Turkey",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        {useTranslation("Get in Touch")}
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
        {useTranslation("Feel free to reach out through any of these channels")}
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {contactInfo.map((contact, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
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
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: (theme) => (theme.palette.mode === "dark" ? "0 4px 20px 0 rgba(255, 255, 255, 0.1)" : "0 4px 20px 0 rgba(0, 0, 0, 0.1)"),
                  "& .MuiSvgIcon-root": {
                    color: "primary.main",
                  },
                },
              }}
            >
              <Box
                sx={{
                  mb: 2,
                  color: "text.secondary",
                  transition: "color 0.3s ease",
                }}
              >
                {contact.icon}
              </Box>
              <Typography variant="h6" gutterBottom>
                {contact.title}
              </Typography>
              <Link
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                color="text.primary"
                sx={{
                  textDecoration: "none",
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
              >
                {contact.value}
              </Link>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="body1" color="text.secondary">
          {useTranslation("Looking forward to connecting with you!")}
        </Typography>
      </Box>
    </Container>
  );
};

export default ContactPage;
