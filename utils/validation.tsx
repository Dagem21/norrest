export const validatePhone = (value: string) => {
    const phoneRegex = /^(0|\+251)[97]\d{8}$/;
    return phoneRegex.test(value);
};

export const validateEmail = (value: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value);
};