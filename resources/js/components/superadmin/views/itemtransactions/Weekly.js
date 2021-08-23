import React, { useEffect } from 'react';
import { Spin, Card, Typography, DatePicker, Row, Col, Table } from "antd";
import { DollarCircleOutlined } from "@ant-design/icons"; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeeklyTransactions } from '../../actions/itemTransactionActions';
import moment from 'moment';

function Weekly(props) {
    const item_state = useSelector(state => state.itemTransactions); 
    const dispatch = useDispatch();
    const item_id = props.item_id;
    
    let weekly = item_state.weekly;

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
            title: 'ቀን',
            dataIndex: 'created_at',
            render: (created_at, transact) => <>{moment(created_at).fromNow()}</>
        }
    ];

    const { RangePicker } = DatePicker;
    const dateFormat = 'YYYY-MM-DD'; 
    let today = moment().format(dateFormat); 
    let start_date = moment().startOf('week').format(dateFormat);; 
    let end_date = today; 
    console.log("start date", start_date);
    console.log("end date", end_date);

    useEffect(() => {
        dispatch(fetchWeeklyTransactions(item_id, start_date, end_date)); 
    }, [dispatch, item_id]);
 
    function onChange(date, dateRange) { 
        if(dateRange[0] != ""){
            dispatch(fetchWeeklyTransactions(item_id, dateRange[0], dateRange[1])); 
        }
        else {
        dispatch(fetchWeeklyTransactions(item_id, start_date, end_date)); 

        }
      }
      
    return (
        <Spin spinning={weekly.loading}>
            <Card>
                <Row>
                    <Col span={18}>
                    <Typography.Title>የ{item_state.item?.name} የሳምንት ዝውውር </Typography.Title>
                    </Col>
                    <Col span={6}>
                    <RangePicker
                    onChange={onChange} 
      format={dateFormat}
    />
                    </Col>
                </Row>

                <Table columns={columns} dataSource={weekly.transactions} rowKey="id"/>
                
            </Card>
        </Spin>
    );
}

export default Weekly;