import { Card, Col, Row, Table, Button, Select, Input, message, List } from 'antd';
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchStocksAction, fetchTransactionsAction, saveNewTransactionAction } from "../actions/stockActions";
import { ArrowUpOutlined, ArrowDownOutlined, PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons"; 
import moment from 'moment';
import { NavLink, useHistory, Link } from 'react-router-dom';

function Stocks() {
    const dispatch = useDispatch();
    const stocks = useSelector(state => state.stocks); 
    const onNewTransaction = (evt, item) => {
        let type = evt.target.name;
        let value = evt.target.value; 
        if(type == "out" && value > item.remaining){
            message.error('ካለዉ ብዛት በላይ! እባክው በትክክል ያስገቡ!');
            return;
        }
        let user_id = window.user.id;
        
        let data = {
            type,
            quantity: value,
            user_id,
            item_id: item.id
        }
        dispatch(saveNewTransactionAction(data));
        dispatch(fetchTransactionsAction());

        evt.target.value = 0;

    }
    useEffect(() => {
        dispatch(fetchStocksAction());
        dispatch(fetchTransactionsAction());
    }, [dispatch]);

    const showDetail = item_id => {
        let history = useHistory();
        history.push('/item_transactions/' + item_id);
    }
    
    const itemColumns = [
        {
            title: '#',
            dataIndex: 'id'
        },
        {
            title: 'name',
            dataIndex: 'name',
            width: '40%',
            render: (name, item) => <Link to={{pathname: '/item_transactions', state: {
                item_id: item.id
            }}}> {item.name} </Link>
            // render: (name, item) => <NavLink to={`/item_transactions/${item.id}`}>{item.name} </NavLink>
        },
        {
            title: 'Remaining in store',
            width: '10%',
            render: (item, i) => <p>{item.remaining} </p>
        },
        {
            title: 'Add item',
            width: '50%',
            render: (item, i) => <>
            <Input placeholder="0" type="number" min="0" step="1" onPressEnter={(evt) => onNewTransaction(evt, item)} name="in" style={{width: '50%'}} addonBefore={<><PlusCircleOutlined color="red"/> In</>}/>
            <Input placeholder="0" type="number" min="0" step="1" onPressEnter={(evt) => onNewTransaction(evt, item)} name="out" style={{width: '50%'}}  addonBefore={<><MinusCircleOutlined /> Out </>}/></>
        },
    ]
    const transactionsColumns = [
        {
            title: '#',
            render: (transaction, i) => <>{
                transaction.type == 'in' ? <p style={{color: 'green'}}> <ArrowUpOutlined /> {transaction.quantity} </p> : 
                <p style={{color: 'red'}}> <ArrowDownOutlined /> {transaction.quantity} </p>
            } </>
        },
        {
            title: 'name', 
            render: (transaction, i) => <p>{transaction.item ? transaction.item.name : 'Deleted'} </p>
        },
        {
            title: 'time',  
            dataIndex: 'created_at',  
            render: (created_at, i) => <>{moment(created_at).fromNow()}</>
        }, 
    ]
    
    return (
        <Row>
        <Col span={16} style={{height: '100%'}}>
        {
            stocks.data?.categories.map((category, c) => 
            <Card hoverable bordered headStyle={{backgroundColor: '#eef'}} title={category.name} key={c} style={{margin: 30}}>
                <Table dataSource={category.items} columns={itemColumns} rowKey="id" bordered hoverable/>
            </Card>)
        }
        </Col>
        <Col span={8}>
        <Card hoverable bordered headStyle={{backgroundColor: '#eef'}} title="Recent transactions" style={{marginTop: 30}}>
            {
               stocks.data && <Table dataSource={stocks.data.transactions} columns={transactionsColumns} rowKey="id" bordered hoverable/>
            }
            </Card>
        </Col>
        </Row>
        )
    }
    
    export default Stocks
    