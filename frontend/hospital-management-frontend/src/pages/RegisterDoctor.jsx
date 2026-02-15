import React, { useState } from "react";
import { Link } from "react-router-dom";
import { registerDoctor } from "../services/doctorService";
import {
    Box,
    Button,
    Typography,
    Container,
    Card,
} from "@mui/material";
import { Home } from "@mui/icons-material";
import RegisterDoctorForm from "../components/common/RegisterDoctorForm";
import { validateDoctorRegistration } from "../Javascript/doctorValidation";

const RegisterDoctor = () => {
    const [doctorData, setDoctorData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        gender: "",
        dateOfBirth: "",
        city: "",
        state: "",
        country: "",
        password: "",
        joiningDate: "",
        specialization: "",
        bloodGroup: "",
    });

    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDoctorData({ ...doctorData, [name]: value });
    };

    const validateForm = () => {
        const { errors: newErrors, isValid } = validateDoctorRegistration(doctorData);
        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            await registerDoctor(doctorData);
            setMessage("Doctor registered successfully!");
            setDoctorData({
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                gender: "",
                dateOfBirth: "",
                city: "",
                state: "",
                country: "",
                password: "",
                joiningDate: "",
                specialization: "",
                bloodGroup: "",
            });
            setErrors({});
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <Container
            maxWidth="md"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                py: 4
            }}
        >
            <Card sx={{ p: 4, width: "100%", boxShadow: 4 }}>
                <Typography variant="h4" align="center" gutterBottom color="primary">
                    Register as Doctor
                </Typography>
                {message && (
                    <Typography color={message.includes("successfully") ? "primary" : "error"} align="center" sx={{ mb: 2 }}>
                        {message}
                    </Typography>
                )}

                <RegisterDoctorForm
                    doctorData={doctorData}
                    errors={errors}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />

                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                    <Button
                        component={Link}
                        to="/"
                        variant="outlined"
                        color="secondary"
                        startIcon={<Home />}
                    >
                        Home
                    </Button>
                    <Button
                        component={Link}
                        to="/login"
                        variant="outlined"
                        color="secondary"
                    >
                        Login
                    </Button>
                </Box>
            </Card>
        </Container>
    );
};

export default RegisterDoctor;
