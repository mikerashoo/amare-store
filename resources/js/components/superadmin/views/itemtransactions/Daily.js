import React, { useEffect } from 'react';
import { Spin, Card, Typography, DatePicker, Row, Col, Table } from "antd";
import { DollarCircleOutlined } from "@ant-design/icons"; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchDailyTransactions } from '../../actions/itemTransactionActions';
import moment from 'moment';
function Daily(props) {
    const item_state = useSelector(state => state.itemTransactions); 
    const dispatch = useDispatch();
    const item_id = props.item_id;
    useEffect(() => {
        dispatch(fetchDailyTransactions(item_id, 'today')); 
    }, [dispatch, item_id]);
 
    let daily = item_state.daily;

    console.log('daily =>', daily);
    const columns = [
        {
            title: 'ብዛት',
            dataIndex: 'quantity',
            render: (quantity, transact) => <>{transact.type == 'in' ? <span style={{color: 'green'}}> + </span> : 
            transact.user.role == 'keeper' && transact.price != null ? <span style={{color: 'green'}}><DollarCircleOutlined /></span> : <span style={{color: 'red'}}> - </span> }  {quantity}</>
        },
        {
            title: 'ዋጋ',
            dataIndex: 'price',
            render: (price, transact) => <>{price ? price + 'ብር' : '-'}</>
        },
        {
            title: 'ጠቅላላ ዋጋ',
            dataIndex: 'price',
            render: (price, transact) => <>{price ? price * transact.quantity + ' ብር' : '-'}</>
        },
        {
            title: 'ባለሞያ',
            dataIndex: 'user',
            render: (user, transact) => <>{user.id !== window.user.id ? user.name : 'You'}</>
        },
        {
            title: 'ሰዓት',
            dataIndex: 'created_at',
            render: (created_at, transact) => <>{moment(created_at).fromNow()}</>
        }
    ];
 
    function onChange(date, dateString) {
        dispatch(fetchDailyTransactions(item_id, dateString)); 
      }

    return (
        <Spin spinning={daily.loading}>
            <Card>
                <Row>
                    <Col span={18}>
                    <Typography.Title>የ{item_state.item?.name} የቀን ዝውውር </Typography.Title>
                    </Col>
                    <Col span={6}>
                    <DatePicker onChange={onChange} allowClear={false}/>
                    </Col>
                </Row>

                <Table columns={columns} dataSource={daily.transactions} rowKey="id"/>
                
            </Card>
        </Spin>
    );
}

export default Daily;