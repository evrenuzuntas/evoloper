import { Box, Container, Grid, Link, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useTranslation } from "../hooks/useTranslation";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const footerSections = [
    {
      title: useTranslation("Company"),
      items: [
        { label: useTranslation("About Us"), path: "/about" },
        { label: useTranslation("Contact"), path: "/contact" },
        { label: useTranslation("Careers"), path: "/careers" },
      ],
    },
    {
      title: useTranslation("Resources"),
      items: [
        { label: useTranslation("Blog"), path: "/blog" },
        { label: useTranslation("Documentation"), path: "/docs" },
        { label: useTranslation("Support"), path: "/support" },
      ],
    },
    {
      title: useTranslation("Legal"),
      items: [
        { label: useTranslation("Privacy Policy"), path: "/privacy" },
        { label: useTranslation("Terms of Service"), path: "/terms" },
        { label: useTranslation("Cookie Policy"), path: "/cookies" },
      ],
    },
  ];

  const copyrightText = useTranslation("All rights reserved.");

  return (
    <Box
      component="footer"
      sx={{
        pt: 0,
        mt: "auto",
        borderTop: (theme) => `2px solid ${theme.palette.mode === "dark" ? "#ffffff" : "#000000"}`,
        backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#000000" : "#ffffff"),
      }}
    >
      <Container maxWidth="lg" sx={{ padding: " 12px 24px 0 24px" }}>
        <Grid container spacing={0} justifyContent="space-evenly">
          {footerSections.map((section) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={section.title}
              sx={{
                textAlign: "center",
              }}
            >
              <Typography variant={isMobile ? "subtitle1" : "h6"} color="text.primary" gutterBottom sx={{ fontWeight: "bold" }}>
                {section.title}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1, alignItems: "center" }}>
                {section.items.map((item) => (
                  <Link
                    key={item.label}
                    component={RouterLink}
                    to={item.path}
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      textDecoration: "none",
                      "&:hover": {
                        color: "primary.main",
                      },
                      transition: "color 0.2s",
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>
        <Box
          sx={{
            borderTop: (theme) => `1px solid ${theme.palette.mode === "dark" ? "#ffffff" : "#000000"}`,
            mt: 1,
            pt: 1,
            backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#000000" : "#ffffff"),
          }}
        ></Box>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ pb: 1 }}>
          © {new Date().getFullYear()} EVOLOPER. {copyrightText}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
