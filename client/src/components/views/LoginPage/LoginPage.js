import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault(); //버튼 누를 때 페이지 refresh되는 거 막아줌

    let body = {
      email: Email,
      password: Password
    }

    dispatch(loginUser(body))
    .then(response => {
      if(response.payload.loginSuccess) {
        navigate('/') // 페이지 이동시 navigate 사용
      } else {
        alert('Error')
      }
    })

  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh'
    }}>
      <form style={{ display: 'flex', flexDirection: 'column' }}
          onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value = {Email} onChange = {onEmailHandler} />
        <label>Password</label>
        <input type="password" value = {Password} onChange = {onPasswordHandler} />
        <br />
        <button type='submit'>
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage
