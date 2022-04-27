import { InputType } from "../components/form-field/form-field.model";

export function isDateValid(date: Date) {
  return date instanceof Date && date.getTime() > 0;
}

export function isEmailValid(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isFileValid(file: File) {
  return file instanceof File;
}

export function isNumberValid(number: number) {
  return !isNaN(number);
}

export function isStringValid(string: string) {
  return typeof string === "string" && string.length > 0;
}

export function isUrlValid(url: string) {
  return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(
    url
  );
}

export function isPhoneValid(phone: string) {
  return /^\+?[0-9]{10,15}$/.test(phone);
}

export function validator(data: string | File | number | string[], type?: InputType) {
  switch (type) {
    case "text":
      return isStringValid(data as string);
    case "datetime":
      return isDateValid(new Date(data as string));
    case "checkbox":
      return typeof data === "boolean";
    case "select":
      return typeof data === "string";
    case "file":
      return isFileValid(data as File);
    case "email":
      return isEmailValid(data as string);
    case "number":
      return isNumberValid(Number(data));
    case "textarea":
      return isStringValid(data as string);
    case "url":
      return isUrlValid(data as string);
    case "phone":
      return isPhoneValid(data as string);
    default:
      return false;
  }
}
