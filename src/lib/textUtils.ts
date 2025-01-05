// lib/textUtils.ts

/**
 * Normaliza el texto manejando caracteres especiales.
 * @param text - El texto a normalizar.
 * @returns El texto normalizado.
 */
export function normalizeText(text: string): string {
    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Remover diacríticos
        .toUpperCase();
}
