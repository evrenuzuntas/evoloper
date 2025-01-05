import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { keyframes } from "@mui/system";

// Pulsing animation keyframes
const pulseAnimation = keyframes`
  0% {
    opacity: 0.2;
    transform: scale(1, 0.95);
  }
  50% {
    opacity: 1;
    transform: scale(1, 1.1);
  }
  100% {
    opacity: 0.2;
    transform: scale(1, 0.95);
  }
`;

// Twinkling stars animation
const twinkleAnimation = keyframes`
  0%, 100% {
    opacity: 0;
    transform: scale(0.5);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
`;

const GlobalLoading = () => {
  const { isLoading } = useSelector((state: RootState) => state.ui.loading);

  return (
    <>
      {/* Top Linear Progress */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          visibility: isLoading ? "visible" : "hidden",
          opacity: isLoading ? 1 : 0,
          transition: "all 0.3s ease-in-out",
          backgroundColor: (theme) => (theme.palette.mode === "dark" ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.2)"),
          padding: "2px 0",
        }}
      >
        <Box
          sx={{
            height: 6,
            width: "100%",
            backgroundColor: "rgba(30, 136, 229, 0.1)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Main progress bar with pulse effect */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "#1e88e5",
              animation: `${pulseAnimation} 2s ease-in-out infinite`,
              boxShadow: (theme) => (theme.palette.mode === "dark" ? "0 0 15px #1e88e5, 0 0 5px #1e88e5" : "0 0 10px #1e88e5"),
            }}
          />

          {/* Twinkling stars */}
          {[...Array(20)].map((_, index) => (
            <Box
              key={index}
              sx={{
                position: "absolute",
                width: "2px",
                height: "2px",
                backgroundColor: "white",
                borderRadius: "50%",
                top: Math.random() * 6 + "px",
                left: Math.random() * 100 + "%",
                animation: `${twinkleAnimation} ${Math.random() * 2 + 1}s ease-in-out infinite`,
                animationDelay: Math.random() * 2 + "s",
                opacity: 0,
                boxShadow: "0 0 3px white, 0 0 5px white",
              }}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default GlobalLoading;
