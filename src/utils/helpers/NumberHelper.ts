export const splitDigits = (number: number) => {
    const numberString = number.toString();

    // Use a regular expression to insert commas every three digits
    return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}