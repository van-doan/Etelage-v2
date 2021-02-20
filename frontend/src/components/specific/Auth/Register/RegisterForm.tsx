import React, {useEffect, useState} from 'react';
import {Form, Input} from "antd";

import './styles.scss';

import {RegisterFormFields} from "./Types";
import AppActions from "../../../../stores/App/AppActions";
import { TSignupValues } from '../../../../stores/App/Types';
import { UserSettingsValidation } from '../../../../stores/App/ValidationSchemas';
import BrowserRouter, { BrowserRoutes } from '../../../../stores/App/BrowserRouter';
import Button from "../../../common/Button/Button";

interface Props {

}

const RegisterForm = (props:Props) => {
    const [form] = Form.useForm();
    const [registering, setRegistering] = useState(false);
    const [registerStatus, setRegisterStatus] = useState<boolean|undefined>(undefined);

    useEffect(() => {
        return function cleanup(){
            form.resetFields();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form]);

    const formProps = {colon: false, hideRequiredMark:true, onFinish: onSubmitClick, className: 'register-form'};

    async function onSubmitClick() {
        try {
            let values = await form.validateFields() as TSignupValues;
            if (values) {
                const {email, username, password} = values;
                if (email && username && password) {
                    setRegistering(true);
                    let status = await AppActions.signup(values);
                    setRegisterStatus(status);
                    setRegistering(false);
                }
            }
        } catch (e) {

        }
    }

    return (
        <div className='register-form-wrapper'>
            <Form form={form} {...formProps} layout='vertical' onFinish={onSubmitClick}>
                <Form.Item label='First Name' name={RegisterFormFields.FirstName} validateTrigger={false} rules={[{validator: UserSettingsValidation.name},
                    {required: true, message: 'This field is required.'}]}>
                    <Input size='large'/>
                </Form.Item>
                <Form.Item label='Last Name' name={RegisterFormFields.LastName} validateTrigger={false} rules={[{validator: UserSettingsValidation.name},
                    {required: true, message: 'This field is required.'}]}>
                    <Input size='large'/>
                </Form.Item>
                <Form.Item label='Username' name={RegisterFormFields.Username} validateTrigger={false} rules={[{validator: UserSettingsValidation.username},
                    {required: true, message: 'This field is required.'}]}>
                    <Input size='large'/>
                </Form.Item>
                <Form.Item label='Email' name={RegisterFormFields.Email} validateTrigger={false} rules={[{validator: UserSettingsValidation.email},
                    {required: true, message: 'This field is required.'}]}>
                    <Input size='large'/>
                </Form.Item>
                <Form.Item label='Password' name={RegisterFormFields.Password} validateTrigger={false} rules={[{validator: UserSettingsValidation.password},
                    {required: true, message: 'This field is required.'}]}>
                    <Input.Password size='large'/>
                </Form.Item>
                <Form.Item label='Confirm Password' name={RegisterFormFields.ConfirmPassword} validateTrigger={false} rules={[{validator: UserSettingsValidation.password},
                    {required: true, message: 'This field is required.'}]}>
                    <Input.Password size='large'/>
                </Form.Item>
                {registerStatus && <div className='login-error'>{registerStatus}</div>}
                <Button className='register-button' htmlType='submit' loading={registering} onClick={onSubmitClick}>
                    Sign Up
                </Button>
            </Form>

            <div className='no-account'>Have an account?<span
                onClick={() => BrowserRouter.push(BrowserRoutes.login)}>Log in here</span>.
            </div>
            <div className='auth-footer'>
            <div>©ETELAGE {new Date().getFullYear()} – All Rights Reserved</div>
            </div>
        </div>
    )
};

export default RegisterForm;