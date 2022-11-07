// This function takes a password as a string and checks to see if it meets requirements.

// If the password is valid, returns an empty string. Otherwise, returns an error message stating which requirement needs to be met. 
// Can be used for responsive form validation, or just to see if a password meets requirements (check .length == 0). 

export const validatePassword = (email: string): string => {
    let invalidMessage: string = "";
    if (email.length <= 8) {
        invalidMessage = "Must be at least 8 characters";
    } else if (!/[A-Za-z]/.test(email)) {
        invalidMessage = "Must contain at least one letter";
    } else if (!/[A-Z]/.test(email)) {
        invalidMessage = "At least one letter must be uppercase";
    } else if (!/\d/.test(email)) {
        invalidMessage = "Must contain at least one number";
    } else if (!/[.,!@#$%^&*]/.test(email)) {
        invalidMessage = "Must contain at least one of .,!@#$%^&*";
    }
    return invalidMessage;
}