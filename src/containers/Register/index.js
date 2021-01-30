import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import InfoBar from '../../components/InfoBar';
import Logo from '../../components/Logo';
import { IconLogin, IconPlusSquared } from '../../helpers/fonts.js';
import { Button, Error, HorizontalLine, Input, Paragraph } from '../../helpers/theme.js';
import { registerUser } from "../../services/userApi.js";

const Register = () => {

    const { register, handleSubmit, errors, watch, reset } = useForm();
    const isEmailConfirmed = value => value === watch("email");
    const isPasswordConfirmed = value => value === watch("password");

    const [infoBarState, setInfoBarState] = useState({
        open: false,
        message: ''
    });

    const [isUserRegistered, setIsUserRegistered] = useState(false);

    const onSubmit = data => {
        registerUser(data.firstName, data.lastName, data.email, data.password).then(
            response => {
                handleOpenInfoBar(response.data.message);
                setIsUserRegistered(true);
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
            firstName: "",
            lastName: "",
            email: "",
            emailConfirm: "",
            password: "",
            passwordConfirm: ""
        });
    };

    const handleOpenInfoBar = (message) => {
        setInfoBarState({ open: true, message: message });
    };

    const handleCloseInfoBar = () => {
        setInfoBarState({ open: false, message: '' });
    };

    const RedirectButton = () => {
        if (!isUserRegistered) {
            return null;
        }
        else {
            return (
                <div>
                    <Link to='/login'>
                        <Button color='#4A5F6D'>Przejdź do logowania<IconLogin /></Button>
                    </Link>
                </div>
            );
        }
    }

    return (
        <div>
            <InfoBar isOpen={infoBarState.open} message={infoBarState.message} handleCloseInfoBar={handleCloseInfoBar} />
            <Logo />
            <HorizontalLine />
            <Paragraph>Formularz rejestracji</Paragraph>
            <HorizontalLine />
            <form autoComplete='off' >
                <Input name='firstName'
                    ref={register({ required: true, maxLength: 25, pattern: /^[a-zA-Zą-żĄ-Ż ]+$/ })}
                    color='#A9A9A9'
                    width='10rem'
                    height='2rem'
                    autoComplete='new-password'
                    placeholder='Imię' />
                <Input name='lastName'
                    ref={register({ required: true, maxLength: 25, pattern: /^[a-zA-Zą-żĄ-Ż ]+$/ })}
                    color='#A9A9A9'
                    width='10rem'
                    height='2rem'
                    autoComplete='new-password'
                    placeholder='Nazwisko'
                />
                {errors.firstName?.type === 'required' && <Error>Imię jest wymagane</Error>}
                {errors.firstName?.type === 'maxLength' && <Error>Imię nie może przekroczyć 25 znaków</Error>}
                {errors.firstName?.type === 'pattern' && <Error>Imię zawiera niedozwolone znaki</Error>}
                {errors.lastName?.type === 'required' && <Error>Nazwisko jest wymagane</Error>}
                {errors.lastName?.type === 'maxLength' && <Error>Nazwisko nie może przekroczyć 25 znaków</Error>}
                {errors.lastName?.type === 'pattern' && <Error>Nazwisko zawiera niedozwolone znaki</Error>}
                <div>
                    <Input name='email'
                        ref={register({ required: true, maxLength: 320, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
                        color='#A9A9A9'
                        width='20.7rem'
                        height='2rem'
                        autoComplete='new-password'
                        placeholder='E-mail' />
                    {errors.email?.type === 'required' && <Error>E-mail jest wymagany</Error>}
                    {errors.email?.type === 'maxLength' && <Error>E-mail nie może przekroczyć 320 znaków</Error>}
                    {errors.email?.type === 'pattern' && <Error>E-mail zawiera niedozwolone znaki lub błędny format</Error>}
                </div>
                <div>
                    <Input name='emailConfirm'
                        ref={register({ validate: { isEmailConfirmed }, required: true, maxLength: 320, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
                        color='#A9A9A9'
                        width='20.7rem'
                        height='2rem'
                        autoComplete='new-password'
                        placeholder='Powtórz e-mail' />
                    {errors.emailConfirm?.type === 'required' && <Error>E-mail jest wymagany</Error>}
                    {errors.emailConfirm?.type === 'maxLength' && <Error>E-mail nie może przekroczyć 320 znaków</Error>}
                    {errors.emailConfirm?.type === 'pattern' && <Error>E-mail zawiera niedozwolone znaki lub błędny format</Error>}
                    {errors.emailConfirm?.type === 'isEmailConfirmed' && <Error>Podane e-maile są różne</Error>}
                </div>
                <div>
                    <Input name='password'
                        ref={register({ required: true, minLength: 8, maxLength: 30, pattern: /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[ą-żĄ-Ż\w!@#$%^&*]{8,30}$/ })}
                        type='password'
                        color='#A9A9A9'
                        width='20.7rem'
                        height='2rem'
                        placeholder='Hasło' />
                    {errors.password?.type === 'required' && <Error>Hasło jest wymagane</Error>}
                    {errors.password?.type === 'minLength' && <Error>Hasło nie może być krótsze niż 8 znaków</Error>}
                    {errors.password?.type === 'maxLength' && <Error>Hasło nie może przekroczyć 30 znaków</Error>}
                    {errors.password?.type === 'pattern' && <Error>Hasło powinno zawierać conajmiej jedną dużą oraz małą literę, jedną cyfrę oraz znak specjalny</Error>}
                </div>
                <div>
                    <Input name='passwordConfirm'
                        ref={register({ validate: { isPasswordConfirmed }, required: true, minLength: 8, maxLength: 30, pattern: /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[ą-żĄ-Ż\w!@#$%^&*]{8,30}$/ })}
                        type='password'
                        color='#A9A9A9'
                        width='20.7rem'
                        height='2rem'
                        placeholder='Powtórz hasło' />
                    {errors.passwordConfirm?.type === 'required' && <Error>Hasło jest wymagane</Error>}
                    {errors.passwordConfirm?.type === 'minLength' && <Error>Hasło nie może być krótsze niż 8 znaków</Error>}
                    {errors.passwordConfirm?.type === 'maxLength' && <Error>Hasło nie może przekroczyć 30 znaków</Error>}
                    {errors.passwordConfirm?.type === 'pattern' && <Error>Hasło powinno zawierać conajmiej jedną dużą oraz małą literę, jedną cyfrę oraz znak specjalny</Error>}
                    {errors.passwordConfirm?.type === 'isPasswordConfirmed' && <Error>Podane hasła są różne</Error>}
                </div>
                <Button onClick={handleSubmit(onSubmit)} color='#4A5F6D'>Załóż konto<IconPlusSquared /></Button>
            </form>
            <RedirectButton />
            <HorizontalLine />
        </div>
    )
}

export default Register
