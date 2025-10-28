export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-().+]+$/
  return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10
}

export const validateWebsite = (website: string): boolean => {
  const websiteRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/
  return websiteRegex.test(website)
}

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0
}
