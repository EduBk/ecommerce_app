'use client'
import React from 'react'

import './Login.css'

const Login = () => {
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')

  // const handleChange = (e) => {}

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   // Aquí iría la lógica de autenticación
  //   console.log('Login attempt:', email, password)
  // }

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/api/v1/auth/google"
  }

  return (
    <div className='form-container'>
      <div className='logo-container'>USCOMMERCE</div>

      <div className='social-buttons'>
        <button className='social-button google' onClick={handleGoogleLogin}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            x='0px'
            y='0px'
            width='100'
            height='100'
            viewBox='0 0 48 48'
          >
            <path
              fill='#fbc02d'
              d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'
            ></path>
            <path
              fill='#e53935'
              d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'
            ></path>
            <path
              fill='#4caf50'
              d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'
            ></path>
            <path
              fill='#1565c0'
              d='M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z'
            ></path>
          </svg>
          <span>Ingresa con Google</span>
        </button>
        <button className='social-button facebook'>
          <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path d='M12.001 2C6.47813 2 2.00098 6.47715 2.00098 12C2.00098 16.9913 5.65783 21.1283 10.4385 21.8785V14.8906H7.89941V12H10.4385V9.79688C10.4385 7.29063 11.9314 5.90625 14.2156 5.90625C15.3097 5.90625 16.4541 6.10156 16.4541 6.10156V8.5625H15.1931C13.9509 8.5625 13.5635 9.33334 13.5635 10.1242V12H16.3369L15.8936 14.8906H13.5635V21.8785C18.3441 21.1283 22.001 16.9913 22.001 12C22.001 6.47715 17.5238 2 12.001 2Z'></path>
          </svg>
          <span>Ingresa con Facebook</span>
        </button>
      </div>
      <div className='line'></div>
      <form className='form'>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            placeholder='ingresa tu email'
            name='email'
            id='email'
            type='text'
            autoComplete='email'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            name='password'
            placeholder='Ingresa tu password'
            id='password'
            type='password'
          />
        </div>
        <button type='submit' className='form-submit-btn'>
          Ingresa
        </button>
      </form>
    </div>
  )
}

export default Login
