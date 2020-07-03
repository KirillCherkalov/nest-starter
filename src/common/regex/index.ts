/**
 * Minimum eight characters, maximum twenty characters, at least one uppercase letter,
 * one lowercase letter, one number and one special character
 */
export const passwordExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
