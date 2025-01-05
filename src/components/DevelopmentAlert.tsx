import { Alert, Box, Chip, Fade, useTheme, useMediaQuery } from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";
import { useTranslation } from "../hooks/useTranslation";

const DevelopmentAlert = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const alertTitle = useTranslation("🚧 Website Under Development");
  const alertMessage = useTranslation("Welcome! Our website is currently under active development. Some features might be incomplete or subject to change.");
  const versionText = useTranslation("Version");

  return (
    <Fade in timeout={1000}>
      <Box sx={{ position: "relative", mb: isMobile ? 2 : 3 }}>
        <Alert
          icon={<ConstructionIcon />}
          severity="info"
          sx={{
            borderRadius: 2,
            backgroundColor: (theme) => (theme.palette.mode === "light" ? "rgba(2, 136, 209, 0.1)" : "rgba(2, 136, 209, 0.2)"),
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "center",
            "& .MuiAlert-message": {
              width: "100%",
            },
            "& .MuiAlert-icon": {
              color: (theme) => (theme.palette.mode === "light" ? "primary.main" : "primary.light"),
              marginRight: isMobile ? 0 : 1,
              marginBottom: isMobile ? 1 : 0,
              padding: isMobile ? "4px 0" : undefined,
            },
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: isMobile ? "flex-start" : "center",
                justifyContent: "space-between",
                gap: 1,
              }}
            >
              <strong>{alertTitle}</strong>
              <Chip
                label={`${versionText} 0.1.0-beta`}
                size="small"
                sx={{
                  backgroundColor: (theme) => (theme.palette.mode === "light" ? "rgba(2, 136, 209, 0.2)" : "rgba(2, 136, 209, 0.3)"),
                  color: "primary.main",
                  fontWeight: "medium",
                }}
              />
            </Box>
            <Box sx={{ mt: 1 }}>{alertMessage}</Box>
          </Box>
        </Alert>
      </Box>
    </Fade>
  );
};

export default DevelopmentAlert;
