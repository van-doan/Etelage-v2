import React, {useState} from 'react';
import { Tabs, Input, Form, Modal, Card, Upload, Button, Avatar } from 'antd';
import { EditOutlined, SettingOutlined, UploadOutlined } from '@ant-design/icons';
import {TUser} from "../../stores/App/Types";

import './styles.scss';

import AppStore from "../../stores/App/AppStore";
import DashboardActions from "../../actions/DashboardActions"

const { TabPane } = Tabs;
const { TextArea } = Input;
const { Meta } = Card;

interface Props {
    userId: any,
    file: any,
}

export default (props: Props) => {
    const [form] = Form.useForm();
    const [modal1Visibility, setModal1Visibility] = useState(false);
    const [modal2Visibility, setModal2Visibility] = useState(false);
    const [userData, setUserData] = useState();
    const [submittingUserData, setSubmittingUserData] = useState(false);
    const {file, userId} = props;

    async function onSubmitData() {
        setSubmittingUserData(true);
        let curAssessment = await DashboardActions.uploadFilesForUser(file, userId);
        setSubmittingUserData(false);

    }

    const normFile = (e:any) => {
        console.log('Upload event:', e);
      
        if (Array.isArray(e)) {
          return e;
        }
      
        return e && e.fileList;
      };

    const ProfileUpdate = () => {
    const onFinish = (values:any) => {
        console.log('Received values of form: ', values);
    };
}

    return (
        <div className='dashboard'>
            <div className='dashboard-content'>
                    <Tabs defaultActiveKey="1" 
                    tabBarGutter={100}
                    centered>
                        <TabPane tab="Feed" key="1" style={{textAlign: 'center'}}>
                        <Card
                            className="parent-prof-card">
                                Feed Content goes here
                        </Card>
                        </TabPane>
                        <TabPane className="profile-tab" tab="Profile" key="2" style={{color: 'white', textAlign: 'center'}}>
                            <Modal
                                className="editSettings"
                                title="Settings"
                                centered
                                visible={modal1Visibility}
                                onCancel={()=>setModal1Visibility(false)}
                                footer={null}>
                                    No User Settings yet. Coming soon!
                                    <br/>
                                    <br/>
                                    <br/>
                            </Modal>
                            <Modal
                                className="editProfile"
                                title="Profile"
                                centered
                                visible={modal2Visibility}
                                onCancel={()=>setModal2Visibility(false)}
                                footer={null}>
                            <Form>
                                <Form.Item label="Username">
                                    <Input placeholder={AppStore.user?.username}/>
                                </Form.Item>
                                <Form.Item label="Bio">
                                    <TextArea rows={4} placeholder="I'm an influencer based out of LA and have a passion for art."/>
                                </Form.Item>
                                <Form.Item
                                    name="upload"
                                    label="Profile Picture"
                                    valuePropName="fileList"
                                    getValueFromEvent= {normFile}>
                                    <Upload name="logo" listType="picture">
                                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                                    </Upload>
                                </Form.Item>

                                <Form.Item
                                    wrapperCol={{
                                    span: 12,
                                    offset: 6,
                                }}>
                                    <div className="prof-edit-form-buttons">
                                    <Button key="cancel" onClick={()=> {setModal2Visibility(false)}} color="clear" >
                                        Cancel
                                    </Button> 
                                    <Button key="submit" onClick={onSubmitData} loading={submittingUserData} type="primary" >
                                        Submit
                                    </Button> 
                                    </div>
                                </Form.Item>
                            </Form>
                            </Modal>
                            <Card
                                className="parent-prof-card"
                                >
                                <Card
                                className="inner-prof-card"
                                bordered={false}>
                                    <Meta 
                                        avatar={""}
                                        title={AppStore.user?.username}
                                        description="User description goes here" 
                                    />
                                </Card>
                                <Card
                                    className="inner-prof-card"
                                    bordered={false}
                                    actions={[
                                        <SettingOutlined key="setting" onClick={() => setModal1Visibility(true)} />,
                                        <EditOutlined key="edit" onClick={() => setModal2Visibility(true)} />,
                                    ]}>
                                </Card>
                                <Card
                                    className="inner-prof-card"
                                    bordered={false}>
                                    User's exhibits go here
                                    
                                </Card>
                            </Card>
                        </TabPane>
                        <TabPane tab="Notifications" key="3" style={{textAlign: 'center'}}>
                        <Card
                            className="parent-prof-card">
                                Notifications go here
                        </Card>
                        </TabPane>
                    </Tabs>
            </div>
        </div>
    )
}
