
export const validateForm = (patientData) => {
  const errors = {};

  if (!patientData.firstName) errors.firstName = "First name is required";

  if (!patientData.lastName) errors.lastName = "Last name is required";

  if (!patientData.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(patientData.email)) {
    errors.email = "Email is invalid";
  }

  if (!patientData.phoneNumber) {
    errors.phoneNumber = "Phone number is required";
  } else if (!/^\d{10}$/.test(patientData.phoneNumber)) {
    errors.phoneNumber = "Phone number must be 10 digits";
  }

  if (!patientData.gender) errors.gender = "Gender is required";

  if (!patientData.dateOfBirth) errors.dateOfBirth = "Date of Birth is required";

  return errors;
};
