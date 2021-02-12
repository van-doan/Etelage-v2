import React, {useState} from 'react';
import { Layout, Tabs, Card } from 'antd';

import './styles.scss'

const { Header, Content, Sider } = Layout;
const { TabPane } = Tabs;

export default () => {
  const [visible, setVisible] = useState(false);

    return (
        <Layout className="dashboard-module">
          <div className="dashboard-module-logo">DASHBOARD</div>
          <Tabs tabPosition="left" className="dashboard-module-menu" defaultActiveKey={'1'}>
            <TabPane className="dashboard-module-menu-item" tab="Feed" key="1">
              Feed goes here
            </TabPane>
            <TabPane className="dashboard-module-menu-item" tab="Profile" key="2">
              Profile goes here
            </TabPane>
            <TabPane className="dashboard-module-menu-item" tab="Notifications" key="3">
              Notifications go here
            </TabPane>
            <TabPane className="dashboard-module-menu-item" tab="Settings" key="4">
              Settings go here
            </TabPane>
          </Tabs>
      </Layout>
    );
  }

