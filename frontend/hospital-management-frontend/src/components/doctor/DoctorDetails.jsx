import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Avatar,
} from "@mui/material";
import { updateDoctor } from "../../services/doctorService";

const DoctorDetails = ({ userData }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        gender: "",
        dateOfBirth: "",
        city: "",
        state: "",
        country: "",
        specialization: "",
        bloodGroup: "",
        joiningDate: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (userData) {
            setFormData({
                firstName: userData.firstName || "",
                lastName: userData.lastName || "",
                email: userData.email || "",
                phoneNumber: userData.phoneNumber || "",
                gender: userData.gender || "",
                dateOfBirth: userData.dateOfBirth || "",
                city: userData.city || "",
                state: userData.state || "",
                country: userData.country || "",
                specialization: userData.specialization || "",
                bloodGroup: userData.bloodGroup || "",
                joiningDate: userData.joiningDate || ""
            });
        }
    }, [userData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            await updateDoctor(formData.email, formData);
            alert("Profile updated successfully!");
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating doctor:", error);
            alert("Update failed: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const fields = [
        { label: "First Name", name: "firstName" },
        { label: "Last Name", name: "lastName" },
        { label: "Email", name: "email", disabled: true },
        { label: "Phone Number", name: "phoneNumber" },
        { label: "Specialization", name: "specialization", disabled: true },
        { label: "Date of Birth", name: "dateOfBirth" },
        { label: "Blood Group", name: "bloodGroup", disabled: true },
        { label: "City", name: "city" },
        { label: "State", name: "state" },
        { label: "Country", name: "country" },
        { label: "Joining Date", name: "joiningDate", disabled: true },
    ];

    return (
        <Box sx={{ p: 4, bgcolor: "#f9f9f9", borderRadius: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                <Typography variant="h5" fontWeight="bold">Doctor Profile</Typography>
                <Avatar
                    sx={{ width: 100, height: 100, boxShadow: 3 }}
                    src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
                />
            </Box>

            <Grid container spacing={2}>
                {fields.map(({ label, name, disabled }) => (
                    <Grid item xs={12} sm={6} key={name}>
                        <Typography variant="subtitle2" color="textSecondary">{label}</Typography>
                        {isEditing ? (
                            <TextField
                                fullWidth
                                name={name}
                                value={formData[name]}
                                onChange={handleChange}
                                size="small"
                                disabled={disabled}
                            />
                        ) : (
                            <Typography variant="body1">{formData[name]}</Typography>
                        )}
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ mt: 4, textAlign: "right" }}>
                {isEditing ? (
                    <>
                        <Button variant="contained" onClick={handleSubmit} disabled={isLoading} sx={{ mr: 2 }}>
                            {isLoading ? "Saving..." : "Save"}
                        </Button>
                        <Button variant="outlined" onClick={() => setIsEditing(false)}>Cancel</Button>
                    </>
                ) : (
                    <Button variant="contained" onClick={() => setIsEditing(true)}>Edit Profile</Button>
                )}
            </Box>
        </Box>
    );
};

export default DoctorDetails;
