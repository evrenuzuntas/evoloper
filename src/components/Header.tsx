import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography, Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Translate as TranslateIcon } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { useColorMode } from "../theme";
import { languages, setLanguage, getLanguage } from "../utils/translate";
import { useTranslation } from "../hooks/useTranslation";
import { useState } from "react";

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { mode, toggleColorMode } = useColorMode();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(getLanguage());

  const handleLangMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLangMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLangChange = (langCode: string) => {
    setCurrentLang(langCode);
    setLanguage(langCode);
    handleLangMenuClose();
    window.location.reload();
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { label: useTranslation("Home"), path: "/" },
    { label: useTranslation("About"), path: "/about" },
    { label: useTranslation("Contact"), path: "/contact" },
  ];

  const renderMobileMenu = () => (
    <Drawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={toggleMobileMenu}
      PaperProps={{
        sx: {
          width: 240,
          backgroundColor: theme.palette.background.default,
        },
      }}
    >
      <List sx={{ pt: 2 }}>
        {navItems.map((item) => (
          <ListItem
            key={item.path}
            component={RouterLink}
            to={item.path}
            onClick={toggleMobileMenu}
            sx={{
              color: "text.primary",
              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );

  return (
    <AppBar
      position="sticky"
      sx={{
        borderBottom: (theme) => `2px solid ${theme.palette.mode === "dark" ? "#ffffff" : "#000000"}`,
        boxShadow: "none",
      }}
    >
      <Box sx={{ backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#000000" : "#ffffff") }}>
        <Container maxWidth="lg" sx={{ padding: "1rem 2rem" }}>
          <Toolbar
            disableGutters
            sx={{
              justifyContent: "space-between",
              minHeight: "0px !important",
              backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#000000" : "#ffffff"),
            }}
          >
            {/* Logo/Brand */}
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                fontWeight: 700,
                color: (theme) => (theme.palette.mode === "dark" ? "#ffffff" : "#000000"),
                textDecoration: "none",
              }}
            >
              EVOLOPER
            </Typography>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#000000" : "#ffffff"),
                }}
              >
                {navItems.map((item) => (
                  <Button
                    key={item.path}
                    component={RouterLink}
                    to={item.path}
                    sx={{
                      color: (theme) => (theme.palette.mode === "dark" ? "#ffffff" : "#000000"),
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}

            {/* Actions */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#000000" : "#ffffff"),
              }}
            >
              {/* Language Selector */}
              <IconButton
                onClick={handleLangMenuOpen}
                sx={{
                  color: (theme) => (theme.palette.mode === "dark" ? "#ffffff" : "#000000"),
                }}
                aria-label={useTranslation("change language")}
              >
                <TranslateIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleLangMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                PaperProps={{
                  sx: {
                    backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#000000" : "#ffffff"),
                  },
                }}
              >
                {languages.map((lang) => (
                  <MenuItem
                    key={lang.code}
                    onClick={() => handleLangChange(lang.code)}
                    selected={currentLang === lang.code}
                    sx={{
                      color: (theme) => (theme.palette.mode === "dark" ? "#ffffff" : "#000000"),
                    }}
                  >
                    <span style={{ marginRight: 8 }}>{lang.flag}</span>
                    {lang.name}
                  </MenuItem>
                ))}
              </Menu>

              {/* Theme Toggle */}
              <IconButton
                onClick={toggleColorMode}
                sx={{
                  color: (theme) => (theme.palette.mode === "dark" ? "#ffffff" : "#000000"),
                }}
                aria-label={useTranslation("toggle theme")}
              >
                {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>

              {/* Mobile Menu Button */}
              {isMobile && (
                <IconButton
                  aria-label="open menu"
                  onClick={toggleMobileMenu}
                  sx={{
                    ml: 1,
                    color: (theme) => (theme.palette.mode === "dark" ? "#ffffff" : "#000000"),
                  }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </Box>
      {/* Mobile Menu Drawer */}
      {renderMobileMenu()}
    </AppBar>
  );
};

export default Header;
