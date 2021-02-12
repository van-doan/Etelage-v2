import React, {useState, useEffect} from 'react';
import { Layout, Tabs, Upload, Button, Input, Form, Row, Col } from 'antd';
import {UploadOutlined} from '@ant-design/icons';

import AppStore from "../../stores/App/AppStore";
import DashboardActions from "../../actions/DashboardActions"

import './styles.scss'

const { TextArea } = Input;
const { TabPane } = Tabs;

interface Props {
  userId: any,
  file: any,
}

export default (props: Props) => {
  const [width, setWidth] = useState(window.innerWidth);
  const mobileBreakpoint = 400;
  const [submittingUserData, setSubmittingUserData] = useState(false);
  const {file, userId} = props;
  const [form] = Form.useForm();

  // Form Functions

  const onReset = () => {
    form.resetFields();
  };

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

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
}, []);

    return (
        <Layout className="dashboard-module">
          <div className="dashboard-module-logo">DASHBOARD</div>
          <Tabs tabPosition={width > mobileBreakpoint ? "left" : "top"} 
          className="dashboard-module-menu" 
          defaultActiveKey={'1'}
          centered>
            <TabPane className="dashboard-module-menu-item" tab="Feed" key="1">
              Feed goes here
            </TabPane>
            <TabPane className="dashboard-module-menu-item" tab="Profile" key="2">
              <Row className="dashboard-module-profile">
                <div className="dashboard-module-profile-section">
                  {AppStore.user?.username}
                </div>
              </Row>
              <Row className="dashboard-module-profile-stats">
                <Col className="dashboard-module-profile-stats-col">
                  <div className="dashboard-module-profile-stats-col-label">
                    Exhibits
                  </div>
                  <div className="dashboard-module-profile-stats-col-num">
                    800
                  </div>
                </Col>
                <Col className="dashboard-module-profile-stats-col">
                  <div className="dashboard-module-profile-stats-col-label">
                    Following
                  </div>
                  <div className="dashboard-module-profile-stats-col-num">
                    3
                  </div>
                </Col>
                <Col className="dashboard-module-profile-stats-col">
                  <div className="dashboard-module-profile-stats-col-label">
                    Followers
                  </div>
                  <div className="dashboard-module-profile-stats-col-num">
                    10m
                  </div>
                </Col>
              </Row>
            </TabPane>
            <TabPane className="dashboard-module-menu-item" tab="Notifications" key="3">
              Notifications go here
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              More Stuff to Test
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              Testing boiiii
            </TabPane>
            <TabPane className="dashboard-module-menu-item" tab="Settings" key="4">
              <Form form={form} className="dashboard-module-menu-item-form">
                <Form.Item className="dashboard-module-menu-item-form-item" label="Username">
                    <Input placeholder={AppStore.user?.username}/>
                </Form.Item>
                <Form.Item
                     className="dashboard-module-menu-item-form-item"
                    label="About Me">
                    <TextArea rows={4} placeholder="I'm an influencer based out of LA and have a passion for art."/>
                </Form.Item>
                <Form.Item
                    className="dashboard-module-menu-item-form-item"
                    name="upload"
                    label="Profile Picture"
                    valuePropName="fileList"
                    getValueFromEvent= {normFile}>
                    <Upload name="logo" listType="picture">
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>
                <hr className="dashboard-module-menu-item-form-hr"/>
                <Form.Item
                    className="dashboard-module-menu-item-form-item"
                    >
                    <div className="prof-edit-form-buttons">
                    <Button className="dashboard-module-menu-item-form-btn" key="reset" color="clear" onClick={onReset}>
                        Reset
                    </Button> 
                    <Button className="dashboard-module-menu-item-form-btn" key="submit" onClick={onSubmitData} loading={submittingUserData} type="primary" >
                        Submit
                    </Button> 
                    </div>
                </Form.Item>
              </Form>
            </TabPane>
          </Tabs>
      </Layout>
    );
  }

