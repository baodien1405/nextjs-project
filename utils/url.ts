export const encodeUrl = (url: string) => {
  const base64 = window.btoa(url)
  return encodeURIComponent(base64)
}

export const decodeUrl = (url: string) => {
  const base64 = decodeURIComponent(url)
  return window.atob(base64)
}
