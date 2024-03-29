import bcrypt from 'bcryptjs'

const hashPassword = (password) => {
  if (password.length < 8) {
    throw new Error('password must be 8 characters or greater')
  }

  return bcrypt.hash(password, 10)
}

export { hashPassword as default }
