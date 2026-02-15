export const validatePatientRegistration = (patientData, isUpdate = false) => {
  const errors = {};

  if (!patientData.firstName) errors.firstName = "First name is required";

  if (!patientData.lastName) errors.lastName = "Last name is required";

  if (!patientData.email) errors.email = "Email is required";
  if (!/\S+@\S+\.\S+/.test(patientData.email)) errors.email = "Email is invalid";

  if (!patientData.phoneNumber) errors.phoneNumber = "Phone number is required";
  if (!/^\d{10}$/.test(patientData.phoneNumber)) {
    errors.phoneNumber = "Phone number must be 10 digits";
  }

  if (!isUpdate) {
    if (!patientData.password) errors.password = "Password is required";
    if (
      patientData.password &&
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(patientData.password)
    ) {
      errors.password =
        "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character";
    }
  }

  if (!patientData.gender) errors.gender = "Gender is required";

  if (!patientData.dateOfBirth) errors.dateOfBirth = "Date of Birth is required";

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
