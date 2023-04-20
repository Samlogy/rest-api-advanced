import CryptoJS from 'crypto-js'

// Define a secret key for encryption and decryption
const SECRET_KEY = 'my-secret-key'

// Encrypts a value using AES encryption with the secret key
export const encryptData = (data: any): string => {
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString()
  return encrypted
}

// Decrypts a string value using AES decryption with the secret key
export const decryptData = (data: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY)
    const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    return decrypted
  } catch (err) {
    console.error('Failed to decrypt data', err)
    return null
  }
}
