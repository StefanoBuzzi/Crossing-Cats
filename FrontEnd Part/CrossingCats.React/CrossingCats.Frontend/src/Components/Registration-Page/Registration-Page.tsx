import './Registration-Page.css';

import * as Yup from 'yup';

import { Button, IconButton, InputAdornment } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import Alert from '@mui/material/Alert';
import CustomizedToast from '../Toasts/CustomizedToast';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useMsal } from '@azure/msal-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const RegistrationPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const navigate = useNavigate();
    const { instance, accounts } = useMsal();

    const registerValidationSchema = Yup.object().shape({
        username: Yup.string().required('Username Required').min(3, 'Too Short! The username must have at least 3 characters.').max(50, 'Too Long! The username must have less than 50 characters.'),
        email: Yup.string().required('Email Required').email('Invalid Email'),
        password: Yup.string().required('Password Required').min(8, 'Too Short! The password must have at least 8 characters.').max(50, 'Too Long! The password must have less than 50 characters.'),
        confirmPassword: Yup.string()
            .required('Confirm Password Required')
            .min(8, 'Too Short!The password must have at least 8 characters.')
            .max(50, 'Too Long! The password must have less than 50 characters.'),
    });

    const submitHandler = async (values: { username: string; email: string; password: string; confirmPassword: string }) => {
        try {
            setLoading(true);
            if (values.password === values.confirmPassword) {
                const response = await axios.post('https://localhost:7055/api/User/CreateUser', {
                    username: values.username,
                    email: values.email,
                    password: values.password,
                });
                if (response.data.message !== 'User created') {
                    toast.error(response.data.message);
                } else {
                    navigate('/');
                }
            } else {
                toast.error('The two passwords do not match');
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const register = async () => {
        await instance.loginPopup();
    };

    return (
        <div className='RegistrationContainer'>
            <h1 className='welcomeStyle2'>Welcome to Crossing cats</h1>
            <div className='registerBackgroundStyle'>
                {/* <Formik
                    initialValues={{
                        username: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                    }}
                    validationSchema={registerValidationSchema}
                    onSubmit={values => submitHandler(values)}>
                    {({ errors, touched }) => (
                        <Form className='frm'>
                            <Field placeholder='Username' name='username' className='input-color inputStyle' />
                            {errors.username && touched.username ? (
                                <Alert
                                    sx={{
                                        fontFamily: 'Custom2',
                                        marginBottom: 1,
                                        padding: 0,
                                        color: 'darkred',
                                        backgroundColor: 'lightpink',
                                    }}
                                    severity='error'>
                                    {errors.username}
                                </Alert>
                            ) : null}

                            <Field placeholder='Email' name='email' type='email' className='input-color inputStyle' />
                            {errors.email && touched.email ? (
                                <Alert
                                    sx={{
                                        fontFamily: 'Custom2',
                                        marginBottom: 1,
                                        padding: 0,
                                        color: 'darkred',
                                        backgroundColor: 'lightpink',
                                    }}
                                    severity='error'>
                                    {errors.email}
                                </Alert>
                            ) : null}

                            <Field
                                placeholder='Password'
                                name='password'
                                type={showPassword ? 'text' : 'password'}
                                className='input-color inputStyle'
                                endAdornment={
                                    <InputAdornment position='end'>
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge='end'>
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            {errors.password && touched.password ? (
                                <Alert
                                    sx={{
                                        fontFamily: 'Custom2',
                                        marginBottom: 1,
                                        padding: 0,
                                        color: 'darkred',
                                        backgroundColor: 'lightpink',
                                    }}
                                    severity='error'>
                                    {errors.password}
                                </Alert>
                            ) : null}

                            <Field
                                placeholder='Confirm password'
                                name='confirmPassword'
                                type={showPassword ? 'text' : 'password'}
                                className='input-color inputStyle'
                                endAdornment={
                                    <InputAdornment position='end'>
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge='end'>
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            {errors.confirmPassword && touched.confirmPassword ? (
                                <Alert
                                    sx={{
                                        fontFamily: 'Custom2',
                                        marginBottom: 1,
                                        padding: 0,
                                        color: 'darkred',
                                        backgroundColor: 'lightpink',
                                    }}
                                    severity='error'>
                                    {errors.confirmPassword}
                                </Alert>
                            ) : null}

                        </Form>
                    )}
                </Formik> */}
                {/* <CustomizedLoadingButton loading={loading} text='Register' buttonType='button' onClick={register}/> */}
            </div>
            <CustomizedToast />
            <div className='registerLink'>
                <Button
                    sx={{
                        color: 'rgb(0, 255, 238)',
                        position: 'bottom',
                        fontSize: '24px',
                        fontFamily: 'Custom2',
                        fontWeight:'800'
                    }}
                    onClick={() => {
                        navigate('/');
                    }}>
                    Login
                </Button>
            </div>
        </div>
    );
};

export default RegistrationPage;