import { FormEvent, useContext, useState } from 'react'
import { AuthContex } from '../contexts/AuthContext'

export default function Form() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn } = useContext(AuthContex)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const data = { email, password }

    await signIn(data)
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Entrar</button>
    </form>
  )
}
