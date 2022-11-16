export const validateEmail = (email: string): boolean => {
    const eReg: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid: boolean = (eReg.test(email.toLowerCase()));
    return isValid
}

export const validateStreetNumber = (streetNumber: string): boolean => {
    const snReg: RegExp = /^[0-9\b]+$/;
    return streetNumber === "" || snReg.test(streetNumber)
}

export const validatePostalCode = (postalCode: string): boolean => {
    const pcReg: RegExp = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;
    return pcReg.test(postalCode)
}