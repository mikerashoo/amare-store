import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Card } from 'antd';
import { SideMenu, PageRoutes } from './views'
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
function SuperAdmin() {
    return (
        <Provider store={store}>
            <BrowserRouter basename="/superadmin">
                <Row style={{ backgroundColor: '#f3f6ff', minHeight: '100vh' }} gutter={[16, 16]}>
                    <Col span={4} style={{ height: '100%', backgroundColor: '#f3f6ff', paddingTop: 10 }}>
                        <SideMenu />
                    </Col>
                    <Col span={20} style={{ backgroundColor: '#F5F5F8', minHeight: '100%', padding: '2%' }}>
                        {/* <Card> */}
                        <PageRoutes />

                        {/* </Card> */}
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
