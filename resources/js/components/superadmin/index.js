import React from 'react';
import ReactDOM from 'react-dom';
import {Row, Col} from 'antd';
import {SideMenu, PageRoutes} from './views'
import { BrowserRouter, HashRouter } from 'react-router-dom'; 
import { Provider } from 'react-redux';
import store from './store';
function SuperAdmin() {
    return ( 
        <Provider store={store}>
        <BrowserRouter basename="/superadmin">
        <Row style={{backgroundColor: '#eee', height: '100vh'}} gutter={[16, 16]}>
        <Col span={4} style={{backgroundColor: 'white', paddingTop: 10}}>
        <SideMenu />
        </Col>
        <Col span={20} style={{backgroundColor: 'white', height: '100%'}}>
            <PageRoutes />
        </Col>
        </Row>
        </BrowserRouter>
        </Provider>
        );
    }
    
    export default SuperAdmin;
    
    if (document.getElementById('superadmin_app')) {
        ReactDOM.render(<SuperAdmin />, document.getElementById('superadmin_app'));
    }
    