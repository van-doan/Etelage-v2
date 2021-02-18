import React, {useState, useEffect} from 'react';
import { Layout, Tabs, Upload, Button, Input, Form, Divider } from 'antd';
import {UploadOutlined} from '@ant-design/icons';

import AppStore from "../../stores/App/AppStore";
import DashboardActions from "../../actions/DashboardActions"
import ExhibitActions from '../../actions/ExhibitActions';

import DashboardProfile from './DashboardProfile';
import DashboardProfileExhibits from './DashboardProfileExhibits';
import { TExhibit } from '../Explore/Types'

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
  const [exhibitData, setExhibitData] = useState<TExhibit[] | undefined>();
  const [loading, setLoading] = useState(false)

  // Form Functions

  const onReset = () => {
    form.resetFields();
  };

  async function onTabClick(key:string) {
    if(key === '2'){
      setLoading(true)
      let exhibitInfo = await ExhibitActions.getOwnExhibits();
      setExhibitData(exhibitInfo);
      console.log(exhibitInfo)
      setLoading(false)
    }
  }

  function renderExhibitResults () {
    if(loading) {
      return <div className="exhibits-loading" style={{textAlign: 'center', margin: '12px 0'}}>Loading...</div>
    } else if (exhibitData) {
      return exhibitData.map((exhibit, index) => (
        <DashboardProfileExhibits key={index} data={exhibit} />
      ))
    }
  }

//   async function onSubmitData() {
//     setSubmittingUserData(true);
//     let curAssessment = await DashboardActions.uploadFilesForUser(file, userId);
//     setSubmittingUserData(false);
// }

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
          onTabClick={onTabClick}
          centered>
            <TabPane className="dashboard-module-menu-item" tab="Feed" key="1">
              Feed goes here
            </TabPane>
            <TabPane className="dashboard-module-menu-item" tab="Profile" key="2">
              <DashboardProfile/>
              <Divider className="dashboard-module-divider"></Divider>
              {renderExhibitResults()}
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
                    <TextArea rows={4} placeholder={AppStore.user?.user_bio}/>
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
                    <Button className="dashboard-module-menu-item-form-btn" key="submit" loading={submittingUserData} type="primary" >
                    {/* onClick={onSubmitData} */}
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

