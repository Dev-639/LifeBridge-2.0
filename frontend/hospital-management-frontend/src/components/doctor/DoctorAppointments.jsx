import React, { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Alert,
    Button,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
} from '@mui/material';
import { getAppointmentsByDoctor, updateAppointmentStatus } from '../../services/appointmentService';

const DoctorAppointments = ({ doctorEmail }) => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [diagnosis, setDiagnosis] = useState('');
    const [prescription, setPrescription] = useState('');

    const fetchAppointments = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getAppointmentsByDoctor(doctorEmail);
            setAppointments(data);
        } catch (err) {
            setError('Failed to fetch appointments');
        } finally {
            setLoading(false);
        }
    }, [doctorEmail]);

    useEffect(() => {
        if (doctorEmail) {
            fetchAppointments();
        }
    }, [doctorEmail, fetchAppointments]);

    const handleStatusUpdate = async (id, status, data = {}) => {
        try {
            await updateAppointmentStatus(id, { status, ...data });
            fetchAppointments();
        } catch (err) {
            alert("Failed to update status");
        }
    };

    const handleOpenCompleteDialog = (appointment) => {
        setSelectedAppointment(appointment);
        setDiagnosis(appointment.diagnosis || '');
        setPrescription(appointment.prescription || '');
        setOpenDialog(true);
    };

    const handleCompleteSubmit = async () => {
        if (!diagnosis || !prescription) {
            alert("Please provide both diagnosis and prescription.");
            return;
        }
        await handleStatusUpdate(selectedAppointment.id, 'COMPLETED', { diagnosis, prescription });
        setOpenDialog(false);
        setSelectedAppointment(null);
    };

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">Manage Appointments</Typography>
            <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 3 }}>
                <Table>
                    <TableHead sx={{ bgcolor: "#f5f5f5" }}>
                        <TableRow>
                            <TableCell>Patient</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>Reason</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {appointments.length > 0 ? (
                            appointments.map((appointment) => (
                                <TableRow key={appointment.id} hover>
                                    <TableCell>{appointment.patientName}</TableCell>
                                    <TableCell>{appointment.appointmentDate}</TableCell>
                                    <TableCell>{appointment.appointmentTime}</TableCell>
                                    <TableCell>{appointment.reason}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={appointment.status}
                                            color={appointment.status === 'CONFIRMED' ? 'success' : appointment.status === 'PENDING' ? 'warning' : appointment.status === 'COMPLETED' ? 'info' : 'default'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        {appointment.status === 'PENDING' && (
                                            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                                                <Button color="success" size="small" variant="contained" onClick={() => handleStatusUpdate(appointment.id, 'CONFIRMED')}>Accept</Button>
                                                <Button color="error" size="small" variant="outlined" onClick={() => handleStatusUpdate(appointment.id, 'CANCELLED')}>Reject</Button>
                                            </Box>
                                        )}
                                        {appointment.status === 'CONFIRMED' && (
                                            <Button color="primary" size="small" variant="outlined" onClick={() => handleOpenCompleteDialog(appointment)}>Mark Completed</Button>
                                        )}
                                        {appointment.status === 'COMPLETED' && (
                                            <Button color="secondary" size="small" variant="text" onClick={() => handleOpenCompleteDialog(appointment)}>View Details</Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} align="center">No appointments found</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
                <DialogTitle>{selectedAppointment?.status === 'COMPLETED' ? 'Appointment Details' : 'Complete Appointment'}</DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Diagnosis"
                            multiline
                            rows={4}
                            fullWidth
                            value={diagnosis}
                            onChange={(e) => setDiagnosis(e.target.value)}
                            disabled={selectedAppointment?.status === 'COMPLETED'}
                        />
                        <TextField
                            label="Prescription"
                            multiline
                            rows={4}
                            fullWidth
                            value={prescription}
                            onChange={(e) => setPrescription(e.target.value)}
                            disabled={selectedAppointment?.status === 'COMPLETED'}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    {selectedAppointment?.status !== 'COMPLETED' && (
                        <Button onClick={handleCompleteSubmit} variant="contained" color="primary">Submit & Complete</Button>
                    )}
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default DoctorAppointments;
