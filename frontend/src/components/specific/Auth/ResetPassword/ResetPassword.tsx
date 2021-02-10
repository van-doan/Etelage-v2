import React, {useState} from 'react';
import {Form, Input, Modal} from "antd";

import './styles.scss';

import {UserSettingsValidation} from "../../../../stores/App/ValidationSchemas";
import {ResetPasswordFormFields} from "./Types";
import Button from "../../../common/Button/Button";
import AppActions from "../../../../stores/App/AppActions";
import {BrowserUtils} from "../../../../global/utils/Browser";
import BrowserRouter, {BrowserRoutes} from "../../../../stores/App/BrowserRouter";

export default () => {
    const [form] = Form.useForm();
    const [sendingResetPassword, setSendingResetPassword] = useState(false);

    async function onSubmitClick() {
        let {token} = BrowserUtils.getUrlParams();
        try {
            let values = await form.validateFields();
            if (values) {
                setSendingResetPassword(true);
                let success = await AppActions.resetPassword({...values, code:token});
                if (success) {
                    Modal.info({
                        content: 'Your password has been successfully reset. Please press the OK button below to redirect to the login page and login to your account.',
                        centered: true,
                        onOk:()=>BrowserRouter.push(BrowserRoutes.login),
                    })
                } else {
                    Modal.error({
                        content: 'Unfortunately, we could not reset your password. Please contact your Mark III Client Leader for more information.',
                        centered:true,
                    })
                }
                setSendingResetPassword(false);
            }
        } catch (e) {

        }
    }

    const formProps = {colon: false, hideRequiredMark: true, onFinish: onSubmitClick, className: 'reset-password-form'};

    return (
        <div className='reset-password-form-wrapper'>
            <Form form={form} {...formProps} layout='vertical'>
                <Form.Item label='New Password' name={ResetPasswordFormFields.Password} validateTrigger={false}
                           rules={[{validator: UserSettingsValidation.password},
                               {required: true, message: 'This field is required.'}]}>
                    <Input.Password size='large'/>
                </Form.Item>
                <Form.Item label='Confirm New Password' name={ResetPasswordFormFields.PasswordConfirmation} validateTrigger={false}
                           rules={[{validator: UserSettingsValidation.password},
                               {required: true, message: 'This field is required.'}]}>
                    <Input.Password size='large'/>
                </Form.Item>
                <Button className='send-password-reset-button' htmlType='submit' loading={sendingResetPassword}>
                    Reset Password
                </Button>
            </Form>
        </div>
    )
}