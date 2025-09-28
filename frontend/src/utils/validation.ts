import { Language } from '../types/i18n';

// Phone formatting function
export function formatPhone(value: string, lang: Language): string {
  if (lang === 'pt-BR') {
    // Remove tudo que não for número
    value = value.replace(/\D/g, '');
    // (99) 99999-9999
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 7) return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    if (value.length > 6) return `(${value.slice(0, 2)}) ${value.slice(2, 7)}${value.slice(7)}`;
    if (value.length > 2) return `(${value.slice(0, 2)}) ${value.slice(2)}`;
    if (value.length > 0) return `(${value}`;
    return value;
  } else {
    // US: (999) 999-9999
    value = value.replace(/\D/g, '');
    if (value.length > 10) value = value.slice(0, 10);
    if (value.length > 7) return `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
    if (value.length > 6) return `(${value.slice(0, 3)}) ${value.slice(3, 6)}${value.slice(6)}`;
    if (value.length > 3) return `(${value.slice(0, 3)}) ${value.slice(3)}`;
    if (value.length > 0) return `(${value}`;
    return value;
  }
}

// Phone validation function
export function isValidPhone(value: string, lang: Language): boolean {
  if (lang === 'pt-BR') {
    // (99) 99999-9999
    return /^\(\d{2}\) \d{5}-\d{4}$/.test(value);
  } else {
    // (999) 999-9999
    return /^\(\d{3}\) \d{3}-\d{4}$/.test(value);
  }
}

// Email validation function
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}