import validator from "validator";

export const validateId = (id: string): boolean => validator.isUUID(id);
