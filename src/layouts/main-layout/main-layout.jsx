import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

function MainLayout({ children }) {
  const navigate = useNavigate();
  function gotoHome() {
    window.location.href = "/";
  }

  return (
    <>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap component="div" onClick={gotoHome}>
            Quiz App
          </Typography>

          <Typography variant="h6" noWrap component="div" onClick={() => navigate('/leaderboard')}>
            Leaderboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          width: 768,
          margin: "0 auto",
          paddingTop: 3,
          maxWidth: "100%",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </>
  );
}

export default MainLayout;
