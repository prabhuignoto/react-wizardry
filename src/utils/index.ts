import { InputType } from "../components/form-field/form-field.model";

export function isDateValid(date: Date): boolean {
  return date instanceof Date && date.getTime() > 0;
}

export function isEmailValid(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isFileValid(file: File): boolean {
  return file instanceof File;
}

export function isNumberValid(number: number): boolean {
  return !Number.isNaN(number);
}

export function isStringValid(string: string): boolean {
  return typeof string === "string" && string.length > 0;
}

export function isUrlValid(url: string): boolean {
  return /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
    url
  );
}

export function isPhoneValid(phone: string): boolean {
  return /^\+?[0-9]{10,15}$/.test(phone);
}

export function validator(
  data: string | File | number | string[],
  type?: InputType
): boolean {
  switch (type) {
    case "text":
    case "radio":
    case "textarea":
      return isStringValid(data as string);
    case "datetime":
      return isDateValid(new Date(data as string));
    case "checkbox":
      return Array.isArray(data) && data.length > 0;
    case "select":
      return typeof data === "string";
    case "file":
      return isFileValid(data as File);
    case "email":
      return isEmailValid(data as string);
    case "number":
      return isNumberValid(Number(data));
    case "url":
      return isUrlValid(data as string);
    case "phone":
      return isPhoneValid(data as string);
    default:
      return false;
  }
}

export function getValidationMessage(type?: InputType): string {
  switch (type) {
    case "email":
      return "Please enter a valid email";
    case "phone":
      return "Please enter a valid phone number";
    case "text":
      return "Please enter a valid text";
    case "datetime":
      return "Please enter a valid date";
    case "radio":
      return "Please select an option";
    case "checkbox":
      return "Please select at least one option";
    default:
      return "Please enter a valid value";
  }
}
