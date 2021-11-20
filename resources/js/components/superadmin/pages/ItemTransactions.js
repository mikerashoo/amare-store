import React, { Component, useEffect } from 'react';
import { Card, PageHeader, Tabs } from 'antd'
import { useLocation, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDailyTransactions } from '../actions/itemTransactionActions';
import { Daily, Weekly, Monthly } from "../views/itemtransactions";
const { TabPane } = Tabs;
function ItemTransactions() {
    const location = useLocation();

    const item = location.state.item;

    const dispatch = useDispatch();
    const item_state = useSelector(state => state.itemTransactions);
    return (
        <Card>
            <PageHeader
                className="site-page-header-responsive"
                onBack={() => window.history.back()}
                title={item.name}
                subTitle={item?.remaining + ' remaining'}
            />
            <Tabs defaultActiveKey="2" >
                <TabPane tab="On a date" key="1" >
                    <Daily item_id={item.id} />
                </TabPane>

                <TabPane tab="Weekly" key="2" >
                    <Weekly item_id={item.id} />
                </TabPane>
                <TabPane tab="Monthly" key="3" >
                    <Monthly item_id={item.id} />
                </TabPane>
            </Tabs>
        </Card>
    )
}
export default ItemTransactions;
