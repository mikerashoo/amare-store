import React, { Component, useEffect } from 'react'; 
import {PageHeader, Tabs} from 'antd'
import {useLocation, useParams} from 'react-router'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDailyTransactions } from '../actions/itemTransactionActions';
import {Daily, Weekly, Monthly} from "../views/itemtransactions";
const { TabPane } = Tabs;
function ItemTransactions () {
    const location = useLocation();

    const item_id = location.state.item_id;

    const dispatch = useDispatch();
    const item_state = useSelector(state => state.itemTransactions); 
    
    return (
        <div>
        <PageHeader
        className="site-page-header-responsive"
        onBack={() => window.history.back()}
        title={item_state?.item?.name} 
        subTitle={<><span style={{color: 'green'}}>{'አሁን ቀር ፡ ' + item_state.item?.remaining }</span>{ ' የአሁኑ ዋጋ ፡ ' + item_state.item?.price}</>}
        footer={
            <Tabs defaultActiveKey="1">
            <TabPane tab="የየቀን ዝውውር" key="1" >       
                <Daily item_id={item_id}/>
            </TabPane>
            
            <TabPane tab=" የዚህ ሳምንት" key="2" >
                <Weekly item_id={item_id}/>
            </TabPane>
            <TabPane tab="የዚህ ወር" key="3" >
                <Monthly item_id={item_id}/>
            </TabPane>
            </Tabs>
        }
        
        >
        
        </PageHeader>
        
        </div>
        )
    } 
    export default ItemTransactions;