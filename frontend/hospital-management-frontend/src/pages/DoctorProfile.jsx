import React, { useEffect, useState, useCallback } from "react";
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Home,
  CalendarToday,
} from "@mui/icons-material";
import DoctorDetails from "../components/doctor/DoctorDetails";
import DoctorAppointments from "../components/doctor/DoctorAppointments";
import LogoutButton from "./LogoutButton";
import { useNavigate } from "react-router-dom";
import { fetchDoctorDetails } from "../services/doctorService";

function DoctorProfile() {
  const [userData, setUserData] = useState({});
  const [activeComponent, setActiveComponent] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getDoctorData = useCallback(async () => {
    try {
      const data = await fetchDoctorDetails();
      setUserData(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching doctor data:", err);
      setError("Failed to load doctor data. Please log in again.");
      sessionStorage.clear();
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    getDoctorData();
  }, [getDoctorData]);

  const handleSidebarClick = (component) => {
    setActiveComponent(component);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            LifeBridge Hospital - Doctor Portal
          </Typography>
          <Box display="flex" alignItems="center">
            <Typography variant="body1" sx={{ marginRight: "16px" }}>
              Dr. {userData.firstName} {userData.lastName}
            </Typography>
            <LogoutButton />
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: "flex" }}>
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
              height: "calc(100vh - 64px)",
              backgroundColor: "#1B2631",
              color: "#fff",
            },
          }}
        >
          <List>
            <ListItem
              button
              onClick={() => handleSidebarClick("profile")}
              sx={{
                backgroundColor: activeComponent === "profile" ? "#2E86C1" : "transparent",
                "&:hover": { backgroundColor: "#34495E" },
              }}
            >
              <ListItemIcon><Home style={{ color: "#fff" }} /></ListItemIcon>
              <ListItemText primary="My Profile" />
            </ListItem>

            <ListItem
              button
              onClick={() => handleSidebarClick("appointments")}
              sx={{
                backgroundColor: activeComponent === "appointments" ? "#2E86C1" : "transparent",
                "&:hover": { backgroundColor: "#34495E" },
              }}
            >
              <ListItemIcon><CalendarToday style={{ color: "#fff" }} /></ListItemIcon>
              <ListItemText primary="My Appointments" />
            </ListItem>
          </List>
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, padding: "16px" }}>
          <Container maxWidth="lg">
            {activeComponent === "profile" && <DoctorDetails userData={userData} />}
            {activeComponent === "appointments" && <DoctorAppointments doctorEmail={userData.email} />}
          </Container>
        </Box>
      </Box>
    </div>
  );
}

export default DoctorProfile;
