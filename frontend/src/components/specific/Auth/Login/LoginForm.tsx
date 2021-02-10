import React, {useEffect, useState} from 'react';
import {Checkbox, Form, Input} from "antd";

import './styles.scss';

import {LoginFormFields} from "./Types";
import AppActions from '../../../../stores/App/AppActions';
import {TLoginValues} from "../../../../stores/App/Types";
import BrowserRouter, { BrowserRoutes } from "../../../../stores/App/BrowserRouter";
import Button from '../../../common/Button/Button';

interface Props {

}

const LoginForm = (props:Props) => {
    const [form] = Form.useForm();
    const [loggingIn, setLoggingIn] = useState(false);
    const [loginStatus, setLoginStatus] = useState<boolean|undefined>(undefined);

    useEffect(() => {
        return function cleanup(){
            form.resetFields();
        };
    }, [form]);

    const REMEMBER_LOGIN_LS_KEY = 'etelage_remember_login_username';
    let initialValues = { [LoginFormFields.RememberMe]: !!localStorage.getItem(REMEMBER_LOGIN_LS_KEY), [LoginFormFields.Username]: localStorage.getItem(REMEMBER_LOGIN_LS_KEY)};

    const formProps = {initialValues, hideRequiredMark:true, colon: false, onFinish: onSubmitClick, className: 'login-form'};

    async function onSubmitClick() {
        try {
            let values = await form.validateFields();
            if (values) {
                localStorage.setItem(REMEMBER_LOGIN_LS_KEY, values.username);
                setLoggingIn(true);
                let status = await AppActions.login(values as TLoginValues);
                setLoginStatus(status);
                setLoggingIn(false);
            }
        } catch (e) {

        }
    }

    return (
        <div className='login-form-wrapper'>
            <Form {...formProps} layout='vertical' form={form} onFinish={onSubmitClick}>
                <Form.Item label='USERNAME' name={LoginFormFields.Username} validateTrigger={false}
                           rules={[{required: true, message: 'This field is required.'}]}>
                    <Input size='large'/>
                </Form.Item>
                <Form.Item label='PASSWORD' name={LoginFormFields.Password} validateTrigger={false}
                           rules={[{required: true, message: 'This field is required.'}]}>
                    <Input.Password size='large'/>
                </Form.Item>
                <div className='bottom-actions'>
                    <Form.Item name={LoginFormFields.RememberMe} valuePropName='checked'>
                        <Checkbox className='checkbox' style={{color: '#fff'}}>Remember Me</Checkbox>
                    </Form.Item>
                    <span onClick={() => BrowserRouter.push(BrowserRoutes.requestPasswordReset)}>Forgot Password?</span>
                </div>
                {loginStatus && <div className='login-error'>{loginStatus}</div>}
                <Form.Item>
                    <Button className='login-button' loading={loggingIn} onClick={onSubmitClick}>
                        {loggingIn ? 'Logging In...' : 'Login'}
                    </Button>
                </Form.Item>
            </Form>
            <div className='no-account'>Don't have an account?<span
                onClick={() => BrowserRouter.push(BrowserRoutes.signup)}>Sign up here</span>.
            </div>
            <div className='auth-footer'>
                <div>©ETELAGE {new Date().getFullYear()} – All Rights Reserved</div>
            </div>
        </div>
    )
};

export default LoginForm;