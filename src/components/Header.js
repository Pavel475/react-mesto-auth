import React from 'react';
import logo from '../images/logo.svg';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';

const Header = React.memo((props) => {
    const navigate = useNavigate();

    function onSignOut(){
        props.handleLoginFalse();
        localStorage.removeItem('jwt');
        navigate('/sign-in');
    }

    return (
        <header className="header">
            <img src={logo} alt="логотип Место" className="header__logo" />
            <div className='header__account'>
                <Routes>
                    <Route path='/sign-in' element={
                        <Link to='/sign-up' className='header__text'>
                            Регистрация
                        </Link>
                    }
                    />
                    <Route path='/sign-up' element={
                        <Link to='/sign-in' className='header__text'>
                            Войти
                        </Link>
                    }
                    />
                    <Route path='/' element={
                        <>
                        <p className='header__user-email'>
                            {props.headerUserEmail}
                        </p>
                        <button onClick={onSignOut} className='header__logout'>
                            Выйти
                        </button>
                        </>
                    }
                    />
                </Routes>
            </div>
        </header>
    );
});

export default Header;