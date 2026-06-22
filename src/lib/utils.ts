import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const WA_NUMBER = '5569993959114'

export function waLink(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
}

export const WA_DEFAULT = waLink('Olá Gabriel, tenho interesse na mentoria!')

export const WA_PARTNERSHIP = waLink(
  'Olá Gabriel, tenho interesse em fazer uma parceria / contratar seu serviço para desenvolver um projeto!',
)
