import React, {useState} from 'react';
import {Form, Input, Modal} from "antd";

import './styles.scss';

import {UserSettingsValidation} from "../../../../stores/App/ValidationSchemas";
import {ResetPasswordFormFields} from "./Types";
import Button from "../../../common/Button/Button";
import AppActions from "../../../../stores/App/AppActions";

export default () => {
    const [form] = Form.useForm();
    const [sendingPasswordResetEmail, setSendingPasswordResetEmail] = useState(false);

    async function onSubmitClick() {
        try {
            let values = await form.validateFields();
            if (values && values.email) {
                setSendingPasswordResetEmail(true);
                await AppActions.sendPasswordResetEmail(values.email);
                Modal.info({
                    content: 'Your password reset request has been sent. If this email exists, you will get an email shortly with your reset code.',
                    centered:true,
                })
                setSendingPasswordResetEmail(false);
            }
        } catch (e) {

        }
    }

    const formProps = {colon: false, hideRequiredMark: true, onFinish: onSubmitClick, className: 'reset-password-form'};

    return (
        <div className='reset-password-form-wrapper'>
            <Form form={form} {...formProps} layout='vertical'>
                <Form.Item label='Email' name={ResetPasswordFormFields.Email} validateTrigger={false}
                           rules={[{validator: UserSettingsValidation.email},
                               {required: true, message: 'This field is required.'}]}>
                    <Input size='large'/>
                </Form.Item>
                <Button className='send-password-reset-button' htmlType='submit' loading={sendingPasswordResetEmail}>
                    Send Password Reset Email
                </Button>
            </Form>
        </div>
    )
}