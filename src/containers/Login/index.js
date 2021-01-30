import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import InfoBar from '../../components/InfoBar';
import Logo from '../../components/Logo';
import { IconLogin } from '../../helpers/fonts.js';
import { Button, Error, HorizontalLine, Input, Paragraph } from '../../helpers/theme.js';
import { loginUser } from "../../services/userApi.js";

const Login = () => {

    const { register, handleSubmit, errors, reset } = useForm();

    const [infoBarState, setInfoBarState] = useState({
        open: false,
        message: ''
    });

    const [isManagerLogged, setIsManagerLogged] = useState(false);
    const [isEmployeeLogged, setIsEmployeeLogged] = useState(false);

    const handleOpenInfoBar = (message) => {
        setInfoBarState({ open: true, message: message });
    };

    const handleCloseInfoBar = () => {
        setInfoBarState({ open: false, message: '' });
    };

    const onSubmit = data => {
        loginUser(data.email, data.password).then(
            response => {
                if (response.roles[0] === 'ROLE_MANAGER') {
                    setIsManagerLogged(true);
                }
                if (response.roles[0] === 'ROLE_EMPLOYEE') {
                    setIsEmployeeLogged(true);
                }
            },
            error => {
                let resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                if (error.message === 'Network Error') {
                    resMessage = 'Błąd sieci. Spróbuj ponownie później.';
                }
                handleOpenInfoBar(resMessage);
            }
        );

        reset({
            email: "",
            password: "",
        });
    };

    const RedirectManager = () => {
        if (!isManagerLogged) {
            return null;
        }
        else {
            return (
                <div>
                    <Redirect to='/manager' />
                </div>
            );
        }
    }

    const RedirectEmployee = () => {
        if (!isEmployeeLogged) {
            return null;
        }
        else {
            return (
                <div>
                    <Redirect to='/employee' />
                </div>
            );
        }
    }

    return (
        <div>
            <InfoBar isOpen={infoBarState.open} message={infoBarState.message} handleCloseInfoBar={handleCloseInfoBar} />
            <Logo />
            <HorizontalLine />
            <Paragraph>Logowanie</Paragraph>
            <HorizontalLine />
            <form autoComplete='off'>
                <div>
                    <Input name='email'
                        ref={register({ required: true, maxLength: 320, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
                        color='#A9A9A9'
                        width='20.5rem'
                        height='2rem'
                        autoComplete='new-password'
                        placeholder='E-mail' />
                    {errors.email?.type === 'required' && <Error>E-mail jest wymagany</Error>}
                    {errors.email?.type === 'maxLength' && <Error>E-mail nie może przekroczyć 320 znaków</Error>}
                    {errors.email?.type === 'pattern' && <Error>E-mail zawiera niedozwolone znaki lub błędny format</Error>}
                </div>
                <div>
                    <Input name='password'
                        ref={register({ required: true, minLength: 8, maxLength: 30 })}
                        type='password'
                        color='#A9A9A9'
                        width='20.5rem'
                        height='2rem'
                        autoComplete='new-password'
                        placeholder='Hasło' />
                    {errors.password?.type === 'required' && <Error>Podaj hasło</Error>}
                    {errors.password?.type === 'minLength' && <Error>Podane hasło nie może być krótsze niż 8 znaków</Error>}
                    {errors.password?.type === 'maxLength' && <Error>Podane hasło nie może przekroczyć 30 znaków</Error>}
                </div>
                <Button onClick={handleSubmit(onSubmit)} color='#4A5F6D'>Zaloguj<IconLogin /></Button>
            </form>
            <HorizontalLine />
            <RedirectManager />
            <RedirectEmployee />
        </div>
    )
}

export default Login
