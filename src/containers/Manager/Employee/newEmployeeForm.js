import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import InfoBar from '../../../components/InfoBar';
import { IconUserPlus } from '../../../helpers/fonts.js';
import { Button, Error, Input } from '../../../helpers/theme.js';
import { createEmployee, getCurrentUser } from "../../../services/userApi.js";

const Container = styled.div`
    text-align: center;
    `

const CenterButton = styled(Button)`
    display: table;
    margin: 0.2rem auto;
    `

const WrapError = styled(Error)`
    width: 20.7rem;   
    white-space: wrap;
    `

const NewEmployeeForm = () => {

    const { register, handleSubmit, errors, watch, reset } = useForm();

    const isEmailConfirmed = value => value === watch("email");
    const isPasswordConfirmed = value => value === watch("password");

    const [infoBarState, setInfoBarState] = useState({
        open: false,
        message: ''
    });

    const onSubmit = data => {
        const currentUserId = getCurrentUser().id;
        createEmployee(data.firstName, data.lastName, data.email, data.password, currentUserId).then(
            response => {
                handleOpenInfoBar(response.data.message);
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

    return (
        <Container>
            <InfoBar isOpen={infoBarState.open} message={infoBarState.message} handleCloseInfoBar={handleCloseInfoBar} />
            <form autoComplete='off'>
                <Input name='firstName'
                    ref={register({ required: true, maxLength: 25, pattern: /^[a-zA-Zą-żĄ-Ż ]+$/ })}
                    color='#A9A9A9'
                    width='10rem'
                    height='2rem'
                    placeholder='Imię' />
                <Input name='lastName'
                    ref={register({ required: true, maxLength: 25, pattern: /^[a-zA-Zą-żĄ-Ż ]+$/ })}
                    color='#A9A9A9'
                    width='10rem'
                    height='2rem'
                    placeholder='Nazwisko' />
                {errors.firstName?.type === 'required' && <WrapError>Imię jest wymagane</WrapError>}
                {errors.firstName?.type === 'maxLength' && <WrapError>Imię nie może przekroczyć 25 znaków</WrapError>}
                {errors.firstName?.type === 'pattern' && <WrapError>Imię zawiera niedozwolone znaki</WrapError>}
                {errors.lastName?.type === 'required' && <WrapError>Nazwisko jest wymagane</WrapError>}
                {errors.lastName?.type === 'maxLength' && <WrapError>Nazwisko nie może przekroczyć 25 znaków</WrapError>}
                {errors.lastName?.type === 'pattern' && <WrapError>Nazwisko zawiera niedozwolone znaki</WrapError>}
                <div>
                    <Input name='email'
                        ref={register({ required: true, maxLength: 320, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
                        color='#A9A9A9'
                        width='20.7rem'
                        height='2rem'
                        placeholder='E-mail' />
                    {errors.email?.type === 'required' && <WrapError>E-mail jest wymagany</WrapError>}
                    {errors.email?.type === 'maxLength' && <WrapError>E-mail nie może przekroczyć 320 znaków</WrapError>}
                    {errors.email?.type === 'pattern' && <WrapError>E-mail zawiera niedozwolone znaki lub błędny format</WrapError>}
                </div>
                <div>
                    <Input name='emailConfirm'
                        ref={register({ validate: { isEmailConfirmed }, required: true, maxLength: 320, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
                        color='#A9A9A9'
                        width='20.7rem' height='2rem'
                        placeholder='Powtórz e-mail' />
                    {errors.emailConfirm?.type === 'required' && <WrapError>E-mail jest wymagany</WrapError>}
                    {errors.emailConfirm?.type === 'maxLength' && <WrapError>E-mail nie może przekroczyć 320 znaków</WrapError>}
                    {errors.emailConfirm?.type === 'pattern' && <WrapError>E-mail zawiera niedozwolone znaki lub błędny format</WrapError>}
                    {errors.emailConfirm?.type === 'isEmailConfirmed' && <WrapError>Podane e-maile są różne</WrapError>}
                </div>
                <div>
                    <Input name='password'
                        ref={register({ required: true, minLength: 8, maxLength: 30, pattern: /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[ą-żĄ-Ż\w!@#$%^&*]{8,30}$/ })}
                        type='password'
                        color='#A9A9A9'
                        width='20.7rem'
                        height='2rem'
                        placeholder='Hasło' />
                    {errors.password?.type === 'required' && <WrapError>Hasło jest wymagane</WrapError>}
                    {errors.password?.type === 'minLength' && <WrapError>Hasło nie może być krótsze niż 8 znaków</WrapError>}
                    {errors.password?.type === 'maxLength' && <WrapError>Hasło nie może przekroczyć 30 znaków</WrapError>}
                    {errors.password?.type === 'pattern' && <WrapError>Hasło powinno zawierać conajmiej jedną dużą oraz małą literę, jedną cyfrę oraz znak specjalny</WrapError>}
                </div>
                <div>
                    <Input name='passwordConfirm'
                        ref={register({ validate: { isPasswordConfirmed }, required: true, minLength: 8, maxLength: 30, pattern: /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[ą-żĄ-Ż\w!@#$%^&*]{8,30}$/ })}
                        type='password'
                        color='#A9A9A9'
                        width='20.7rem'
                        height='2rem'
                        placeholder='Powtórz hasło' />
                    {errors.passwordConfirm?.type === 'required' && <WrapError>Hasło jest wymagane</WrapError>}
                    {errors.passwordConfirm?.type === 'minLength' && <WrapError>Hasło nie może być krótsze niż 8 znaków</WrapError>}
                    {errors.passwordConfirm?.type === 'maxLength' && <WrapError>Hasło nie może przekroczyć 30 znaków</WrapError>}
                    {errors.passwordConfirm?.type === 'pattern' && <WrapError>Hasło powinno zawierać conajmiej jedną dużą oraz małą literę, jedną cyfrę oraz znak specjalny</WrapError>}
                    {errors.passwordConfirm?.type === 'isPasswordConfirmed' && <WrapError>Podane hasła są różne</WrapError>}
                </div>
                <CenterButton onClick={handleSubmit(onSubmit)} color='#4A5F6D'>Dodaj pracownika<IconUserPlus /></CenterButton>
            </form>
        </Container>
    )
}

export default NewEmployeeForm