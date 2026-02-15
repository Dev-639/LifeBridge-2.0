export const validateDoctorRegistration = (data) => {
    const errors = {};
    let isValid = true;

    if (!data.firstName?.trim()) {
        errors.firstName = "First name is required";
        isValid = false;
    }

    if (!data.lastName?.trim()) {
        errors.lastName = "Last name is required";
        isValid = false;
    }

    if (!data.email?.trim()) {
        errors.email = "Email is required";
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = "Invalid email format";
        isValid = false;
    }

    if (!data.phoneNumber?.trim()) {
        errors.phoneNumber = "Phone number is required";
        isValid = false;
    } else if (!/^\+?[0-9]{10,15}$/.test(data.phoneNumber)) {
        errors.phoneNumber = "Invalid phone number format";
        isValid = false;
    }

    if (!data.gender) {
        errors.gender = "Gender is required";
        isValid = false;
    }

    if (!data.dateOfBirth) {
        errors.dateOfBirth = "Date of birth is required";
        isValid = false;
    }

    if (!data.joiningDate) {
        errors.joiningDate = "Joining date is required";
        isValid = false;
    }

    if (!data.specialization?.trim()) {
        errors.specialization = "Specialization is required";
        isValid = false;
    }

    if (!data.bloodGroup) {
        errors.bloodGroup = "Blood group is required";
        isValid = false;
    }

    if (!data.city?.trim()) {
        errors.city = "City is required";
        isValid = false;
    }

    if (!data.state?.trim()) {
        errors.state = "State is required";
        isValid = false;
    }

    if (!data.country?.trim()) {
        errors.country = "Country is required";
        isValid = false;
    }

    if (!data.password) {
        errors.password = "Password is required";
        isValid = false;
    } else if (data.password.length < 8) {
        errors.password = "Password must be at least 8 characters long";
        isValid = false;
    }

    return { errors, isValid };
};
