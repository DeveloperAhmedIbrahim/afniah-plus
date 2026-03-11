import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function extractFieldName(str) {
    let fieldName = "";
    const regex = /The\s+((?:\w+\s+)+)\s*field/;
    const match = str.match(regex);
    if (match) {
        const words = match[1].trim();
        const camelCase = words
            .split(/\s+/)
            .map((word, index) => {
                if (index === 0) {
                    return word.toLowerCase();
                }
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            })
            .join("");
        fieldName = camelCase;
    }
    return fieldName;
}

export const clearFormErrors = () => {
    const errors = document.querySelectorAll('.field-error');
    errors.forEach((error) => {
        error.innerHTML = `&nbsp;`
    });
}

// export const ASSETS_URL = "https://afniah-plus.techrevivals.net/server";
export const ASSETS_URL = "http://localhost:8000";
// export const ASSETS_URL = "https://new.afnps.com/server";
