import React from 'react';

function Login(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleChangeEmail(e) {
      setEmail(e.target.value);
    }

    function handleChangePassword(e) {
      setPassword(e.target.value);
    }

    function handleSubmit(e) {
      e.preventDefault();
      props.handleLogin({email, password});
    }

    return (
      <div className='user-data'>
        <form
        onSubmit={handleSubmit}
        className={`user-data__form user-data__form_type_${props.name}`}
        name={props.name}
        >
          <h2 className="user-data__heading">
            {props.title}
          </h2>
          <input
          className="user-data__input"
          id="email-input"
          autoComplete="off"
          name="userEmail"
          type="email"
          placeholder="Email"
          required
          value={email}
          minLength="2"
          maxLength="40"
          onChange={handleChangeEmail}
          />
          <input
          className="user-data__input"
          id="password-input"
          autoComplete="off"
          name="userPassword"
          type="password"
          placeholder="Пароль"
          required
          value={password}
          minLength="8"
          maxLength="200"
          onChange={handleChangePassword}
          />
          <button className="user-data__submit-button" type="submit">
            Войти
          </button>
        </form>
      </div>
    );    
};

export default Login;