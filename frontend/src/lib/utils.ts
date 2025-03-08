import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { any } from 'zod'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getURL(url: string) {
  return import.meta.env.VITE_BACKEND_URL + url
}

export function checkIsAuthenticated(router: any) {
  if (!(sessionStorage.getItem('isAuthenticated') === 'true')) {
    router.push('/login')
  }
}

export function checkResponse(response: any, router: any) {
  if (!response.ok) {
    if (response.status >= 400 && response.status <= 499) {
      sessionStorage.setItem('isAuthenticated', 'false')
      sessionStorage.removeItem('accessToken')
      router.push('/login')
    }
    console.error(response.status)
  }
}
