import axiosInstance from "../api/axiosConfig";

export const bookAppointment = async (appointmentData) => {
  try {
    const response = await axiosInstance.post("api/appointments/book", appointmentData);
    return response.data;
  } catch (error) {
    console.error("Error booking appointment:", error);
    throw error;
  }
};

export const getAppointmentsByPatient = async (email) => {
  try {
    const response = await axiosInstance.get(`api/appointments/patient/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
};

export const getAppointmentsByDoctor = async (email) => {
  try {
    const response = await axiosInstance.get(`api/appointments/doctor/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching doctor appointments:", error);
    throw error;
  }
};

export const cancelAppointment = async (id) => {
  try {
    const response = await axiosInstance.delete(`api/appointments/cancel/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    throw error;
  }
};

export const updateAppointmentStatus = async (id, updateData) => {
  try {
    const response = await axiosInstance.put(`api/appointments/${id}/status`, updateData);
    return response.data;
  } catch (error) {
    console.error("Error updating appointment status:", error);
    throw error;
  }
};
