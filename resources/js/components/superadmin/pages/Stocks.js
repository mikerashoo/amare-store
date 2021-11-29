import { Card, Col, Row, Table, Button, Select, Input, message, List, PageHeader } from 'antd';
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchStocksAction, fetchTransactionsAction, saveNewTransactionAction } from "../actions/stockActions";
import { ArrowUpOutlined, ArrowDownOutlined, PlusCircleOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import moment from 'moment';
import { NavLink, useHistory, Link } from 'react-router-dom';

function Stocks() {
    const dispatch = useDispatch();
    const stocksData = useSelector(state => state.stocks);
    console.log("stocks", stocksData);
    const onNewTransaction = (evt, item) => {
        let type = evt.target.name;
        let value = evt.target.value;
        if (type == "out" && value > item.remaining) {
            message.error('Please amount less than or equal to in stock!');
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
            title: 'Name',
            dataIndex: 'name',
            render: (name, item) => <Link to={{
                pathname: '/item_transactions', state: {
                    item: item
                }
            }}> {item.name} </Link>
            // render: (name, item) => <NavLink to={`/item_transactions/${item.id}`}>{item.name} </NavLink>
        },
        {
            title: "Code",
            dataIndex: 'code'
        },
        {
            title: 'Remaining in store',
            render: (item, i) => <p>{item.remaining} </p>
        },
        {
            title: "Current price",
            dataIndex: 'price'
        }
    ]
    const transactionsColumns = [
        {
            title: '#',
            render: (transaction, i) => <><p style={{ color: 'green' }}> <PlusOutlined /> {transaction.quantity} </p> </>
        },
        {
            dataIndex: 'item_name',
        },
        {
            title: 'time',
            dataIndex: 'created_at',
            render: (created_at, i) => <>{moment(created_at).fromNow()}</>
        },
    ]

    return (
        <div>

            <div className="text-right">
                <NavLink to="/new_buy"><Button>Add new buy</Button></NavLink>
            </div>

            <Row>
                <Col span={16} style={{ height: '100%' }}>
                    {
                        stocksData.data?.categories.map((category, c) =>
                            <Card hoverable bordered headStyle={{ backgroundColor: '#eef' }} title={category.name} key={c} style={{ margin: 30 }}>
                                <Table dataSource={category.items} size="small" columns={itemColumns} rowKey="id" bordered hoverable />
                            </Card>)
                    }
                </Col>
                <Col span={8}>
                    <Card hoverable bordered headStyle={{ backgroundColor: '#eef' }} title="Recent transactions" style={{ marginTop: 30 }}>
                        {
                            stocksData.data && <Table dataSource={stocksData.data.transactions} columns={transactionsColumns} rowKey="id" bordered hoverable />
                        }
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Stocks
