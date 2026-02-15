import React from "react";
import {
    TextField,
    Button,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    FormHelperText,
    Grid,
} from "@mui/material";
import { Person, Email, Phone, Lock, Work } from "@mui/icons-material";

const RegisterDoctorForm = ({
    doctorData,
    errors,
    handleChange,
    handleSubmit
}) => {
    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="First Name"
                        name="firstName"
                        value={doctorData.firstName}
                        onChange={handleChange}
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                        InputProps={{ startAdornment: <Person sx={{ mr: 1, color: 'action.active' }} /> }}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Last Name"
                        name="lastName"
                        value={doctorData.lastName}
                        onChange={handleChange}
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={doctorData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        InputProps={{ startAdornment: <Email sx={{ mr: 1, color: 'action.active' }} /> }}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Phone Number"
                        name="phoneNumber"
                        value={doctorData.phoneNumber}
                        onChange={handleChange}
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber}
                        InputProps={{ startAdornment: <Phone sx={{ mr: 1, color: 'action.active' }} /> }}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={!!errors.gender} required>
                        <InputLabel>Gender</InputLabel>
                        <Select
                            name="gender"
                            value={doctorData.gender}
                            onChange={handleChange}
                            label="Gender"
                        >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </Select>
                        {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        type="date"
                        name="dateOfBirth"
                        value={doctorData.dateOfBirth}
                        onChange={handleChange}
                        label="Date of Birth"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        required
                        error={!!errors.dateOfBirth}
                        helperText={errors.dateOfBirth}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        type="date"
                        name="joiningDate"
                        value={doctorData.joiningDate}
                        onChange={handleChange}
                        label="Joining Date"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        required
                        error={!!errors.joiningDate}
                        helperText={errors.joiningDate}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Specialization"
                        name="specialization"
                        value={doctorData.specialization}
                        onChange={handleChange}
                        error={!!errors.specialization}
                        helperText={errors.specialization}
                        InputProps={{ startAdornment: <Work sx={{ mr: 1, color: 'action.active' }} /> }}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={!!errors.bloodGroup} required>
                        <InputLabel>Blood Group</InputLabel>
                        <Select
                            name="bloodGroup"
                            value={doctorData.bloodGroup}
                            onChange={handleChange}
                            label="Blood Group"
                        >
                            <MenuItem value="A+">A+</MenuItem>
                            <MenuItem value="A-">A-</MenuItem>
                            <MenuItem value="B+">B+</MenuItem>
                            <MenuItem value="B-">B-</MenuItem>
                            <MenuItem value="O+">O+</MenuItem>
                            <MenuItem value="O-">O-</MenuItem>
                            <MenuItem value="AB+">AB+</MenuItem>
                            <MenuItem value="AB-">AB-</MenuItem>
                        </Select>
                        {errors.bloodGroup && <FormHelperText>{errors.bloodGroup}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField label="City" name="city" value={doctorData.city} onChange={handleChange} fullWidth required error={!!errors.city} helperText={errors.city} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField label="State" name="state" value={doctorData.state} onChange={handleChange} fullWidth required error={!!errors.state} helperText={errors.state} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField label="Country" name="country" value={doctorData.country} onChange={handleChange} fullWidth required error={!!errors.country} helperText={errors.country} />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={doctorData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                        InputProps={{ startAdornment: <Lock sx={{ mr: 1, color: 'action.active' }} /> }}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth size="large" sx={{ mt: 2 }}>
                        Register as Doctor
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default RegisterDoctorForm;
