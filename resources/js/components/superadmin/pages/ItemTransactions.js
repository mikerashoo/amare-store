import React, { Component, useEffect } from 'react';
import { Card, Descriptions, PageHeader, Tabs } from 'antd'
import { useLocation, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDailyTransactions } from '../actions/itemTransactionActions';
import { Daily, Weekly, Monthly } from "../views/itemtransactions";
import { BASE_URL } from '../constants/api';
const { TabPane } = Tabs;
function ItemTransactions() {
    const location = useLocation();

    const item = location.state.item;
    console.log(item);

    const itemProperty = () => {
        return <p>some data</p>
        // return <> {
        //     item.property_values.map(pro => {
        //         let _pro = item.properties.find(_p => _p.id == pro.property_id);
        //         console.log(_pro.name);
        //         console.log(pro);
        //         return <p>Paragrapgh</p>
        //         // return <Descriptions.Item key={pro.id} label="some"> {pro.value}</Descriptions.Item>
        //     })
        // } </>
    }

    return (
        <Card>
            <PageHeader
                className="site-page-header-responsive"
                onBack={() => window.history.back()}
                title={item.name}
                avatar={{ src: BASE_URL + "images/items/" + item?.logo_name }}
            >
                <Descriptions size="small" column={3}>
                    <Descriptions.Item label="Current price">{item.price}</Descriptions.Item>
                    <Descriptions.Item label="Remaining">{item.remaining} </Descriptions.Item>
                    <Descriptions.Item label="Threshold">{item.threshold}</Descriptions.Item>
                    {
                        item.properties.map(property => {
                            let property_value = item.property_values.find(pv => pv.property_id == property.id);
                            return <Descriptions.Item key={property.id} label={property.name}>{property_value.value ? property_value.value + " " + property.unit?.name : "-"} </Descriptions.Item>
                        })
                    }
                </Descriptions>
            </PageHeader>
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
