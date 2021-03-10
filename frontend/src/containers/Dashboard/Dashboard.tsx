import React, {useState, useEffect} from 'react';
import { 
  Layout,
  Avatar,
  Image, 
  Row, 
  Col, 
  Tabs, 
  Upload, 
  Button, 
  Input, 
  Form, 
  Divider, 
  message } from 'antd';
import {UploadOutlined, UserOutlined} from '@ant-design/icons';

import AppStore from "../../stores/App/AppStore";
import { TExhibit, TUser } from '../../stores/App/Types'

// Dashboard Components located under the User Info
import DashboardActions from "../../actions/DashboardActions"
import DashExhibits from './DashExhibits';
import DashFollowers from './DashFollowers';
import DashFollowing from './DashFollowing';
import DashFeed from './DashFeed';

import './styles.scss'
import ExhibitActions from '../../actions/ExhibitActions';


const { TextArea } = Input;
const { TabPane } = Tabs;
const StrapiDomain = 'http://localhost:1337'

interface Props {
  userId: any,
  file: any,
}

export default (props: Props) => {
  const [width, setWidth] = useState(window.innerWidth);
  const mobileBreakpoint = 400;
  // const [submittingUserData, setSubmittingUserData] = useState(false);
  const {file, userId} = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false)
  const [followingUserData, setFollowingUserData] = useState<TUser[] | null>();
  const [exhibitData, setExhibitData] = useState<TExhibit[] | undefined>();
  const [followingExhibitData, setFollowingExhibitData] = useState<TExhibit[] | undefined>();
  const [followersActive, setFollowersActive] = useState(false)
  const [followingActive, setFollowingActive] = useState(false)
  const [exhibitsActive, setExhibitsActive] = useState(true)
  
  // Form Functions
  const success = () => {message.success('Your profile has been updated!', 3)}
  const onReset = () => {
    form.resetFields();
  };
  const normFile = (e:any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
    // User Edit Functions
    async function onSubmitData() {
      let userId = AppStore.user?.id
      let values = form.getFieldsValue(['username', 'user_bio'])
      await DashboardActions.editUserData(userId, values)
      success()
      return window.location.reload()
    };
  
  // Tab Functions
  async function onTabClick(key:string) {
    if(key === '2'){
      setLoading(true)
      let userId = AppStore.user?.id
      let userInfo = await DashboardActions.getUserData(userId);
      let usersExhibits = userInfo?.exhibits
      setExhibitData(usersExhibits);
      setLoading(false)
    }
  };

  const onTabLoad = async () => {
      setLoading(true)
      let myUserId = AppStore.user?.id
      // Here I'm getting my own id
      // I'm able to access who I follow
      // I want to load their exhibits - not mine
      let myUserInfo = await DashboardActions.getUserData(myUserId);
      // ^ This is getting my own data
      await myUserInfo?.followees.map( (user) => {
        DashboardActions.getUserData(user.id)
        .then( 
          (user) => {
          let followeeExhibits = user?.exhibits
          console.log("This is the followee's exhibits", followeeExhibits)
          setFollowingExhibitData(followeeExhibits)
          }
        )
      })
      console.log("This is the followees within my data", myUserInfo?.followees)
      setLoading(false)
  }
  
  // User Stats Selection
    function onExhibitSelect() {
      if(followingActive){
        setFollowingActive(false)
      } 
      if (followersActive){
        setFollowersActive(false)
      }
      setExhibitsActive(true)
    }

    function onFollowersSelect() {
      if(followingActive){
        setFollowingActive(false)
      } 
      if (exhibitsActive){
        setExhibitsActive(false)
      }
      setFollowersActive(true)
    }

    function onFollowingSelect() {
      if(followersActive){
        setFollowersActive(false)
      } 
      if (exhibitsActive){
        setExhibitsActive(false)
      }
      setFollowingActive(true)
    }

  // Static Rendering Functions
  function renderUserAvatar () {
    if (AppStore.user?.profile_img.url) {
        return <Avatar size={64} className="dashboard-module-profile-img" 
        src={<Image 
        preview={false}
        src={`${StrapiDomain}${AppStore.user?.profile_img.url}`}/>}/>
    } else if (!AppStore.user?.profile_img.url) {
        return <Avatar size={64} className="dashboard-module-profile-img" icon={UserOutlined}/>
    }
  }


  // Dynamic Rendering Functions
  function renderFeedResults() {
    if (loading) {
      return <div className="exhibits-loading" style={{textAlign: 'center', margin: '12px 0'}}>Loading...</div>
    } else if (followingExhibitData) {
      return followingExhibitData.map((exhibit, index) => (
        <DashFeed key={index} data={exhibit} />
      )) 
    }
  }

  function renderExhibitResults () {
    if(loading) {
      return <div className="exhibits-loading" style={{textAlign: 'center', margin: '12px 0'}}>Loading...</div>
    } else if (exhibitData) {
      return exhibitData.map((exhibit, index) => (
        <DashExhibits key={index} data={exhibit} />
      ))
    }
  };

  function renderFollowersList () {
    if(loading) {
      return <div className="user-list-loading" style={{textAlign: 'center', margin: '12px 0'}}>Loading...</div>
    } else {
      return AppStore.user?.followers.map((follower, index) => (
        <DashFollowers key={index} data={follower}/>
      ))
    }
  }

  function renderFollowingList () { 
    if(loading) {
      return <div className="user-list-loading" style={{textAlign: 'center', margin: '12px 0'}}>Loading...</div>
    } else {
      return AppStore.user?.followees.map((followee, index) => (
        <DashFollowing key={index} data={followee}/>
      ))
    }
  }

  // Dashboard - Tabs (Window Breakpoints)
  useEffect(() => {
    onTabLoad();
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
            <TabPane className="dashboard-module-menu-item dash-feed-module" 
              tab="Feed" 
              key="1">
              {renderFeedResults()}
            </TabPane>
            <TabPane className="dashboard-module-menu-item" tab="Profile" key="2">
              {/* User Profile's Information (username, bio, exhibit #,  follower #, following #) */}
              <Row className="dashboard-module-profile">
                  <div className="dashboard-module-profile-section">
                      <div className="dashboard-module-profile-section-left">
                          {renderUserAvatar()}
                          <div className="dashboard-module-profile-info">
                              <span className="username">{AppStore.user?.username}</span>
                              <br/>
                              <span>{AppStore.user?.user_bio}</span>
                          </div>
                      </div>
                  </div>
              </Row>
              <Row className="dashboard-module-profile-section-stats">
                  <Col className="dashboard-module-profile-stats-col">
                      <div className="dashboard-module-profile-stats-title">
                          <h4>Exhibits</h4>
                      </div>
                      <div className="dashboard-module-profile-stats-num">
                      <Button className="follow-btn" onClick={onExhibitSelect}><h5>{AppStore.user?.exhibits.length}</h5></Button>
                      </div>
                  </Col>
                  <Col className="dashboard-module-profile-stats-col">
                      <div className="dashboard-module-profile-stats-title">
                          <h4>Followers</h4>
                      </div>
                      <div className="dashboard-module-profile-stats-num">
                          <Button className="follow-btn" onClick={onFollowersSelect}><h5>{AppStore.user?.followers.length}</h5></Button>
                      </div>
                  </Col>
                  <Col className="dashboard-module-profile-stats-col">
                      <div className="dashboard-module-profile-stats-title">
                          <h4>Following</h4>
                      </div>
                      <div className="dashboard-module-profile-stats-num">
                          <Button className="follow-btn" onClick={onFollowingSelect}><h5>{AppStore.user?.followees.length}</h5></Button>
                      </div>
                  </Col>
              </Row>
              <Divider className="dashboard-module-divider"></Divider>
              <div className="dashboard-exhibit-container" style={exhibitsActive ? {display: 'grid'} : {display: 'none'}}>
                {renderExhibitResults()}
              </div>
              <div className="dashboard-follow-container" style={followersActive ? {display: 'grid'} : {display: 'none'}}>
                <div className="dashboard-follow-title">Followers</div>
                {renderFollowersList()}
              </div>
              <div className="dashboard-follow-container" style={followingActive ? {display: 'grid'} : {display: 'none'}}>
              <div className="dashboard-follow-title">Following</div>
                {renderFollowingList()}
              </div>
            </TabPane>
            <TabPane className="dashboard-module-menu-item" 
              tab="Notifications" 
              key="3">
              Notifications coming soon!
            </TabPane>
            <TabPane className="dashboard-module-menu-item" 
              tab="Settings" 
              key="4">
              <Form form={form} className="dashboard-module-menu-item-form">
                <Form.Item 
                  className="dashboard-module-menu-item-form-item" 
                  label="Username"
                  name="username">
                    <Input placeholder={AppStore.user?.username}/>
                </Form.Item>
                <Form.Item
                    className="dashboard-module-menu-item-form-item"
                    label="About Me"
                    name="user_bio">
                    <TextArea rows={4} placeholder={AppStore.user?.user_bio}/>
                </Form.Item>
                <Form.Item
                    className="dashboard-module-menu-item-form-item"
                    name="upload"
                    label="Profile Picture"
                    valuePropName="fileList"
                    // getValueFromEvent= {normFile}
                    >
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
                    <Button className="dashboard-module-menu-item-form-btn" key="submit" type="primary" onClick={onSubmitData}>
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

