import { Card, Col, Row, Statistic, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { CheckSquareOutlined, LineChartOutlined, MoneyCollectOutlined, } from "@ant-design/icons";
import moment from 'moment';
import { useSelector } from 'react-redux';

function TransactionTables(props) {

    const itemData = props.itemData;
    console.log(itemData);
    const [total_buy_amount, setTotalBuyAmount] = useState(0.0);
    const [total_sell_amount, setTotalSellAmount] = useState(0.0);
    const [total_buy_count, setTotalBuyCount] = useState(0);
    const [total_sell_count, setTotalSellCount] = useState(0);
    const [total_profit, setTotalProfit] = useState(0.0);
    const [total_buy_remaining, setTotalBuyRemaining] = useState(0);

    const columns = [
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            render: (quantity, transact) => <>{parseInt(quantity)}</>
        },
        {
            title: 'Average Price',
            dataIndex: 'price',
            render: (price, transact) => <>{price ? price + ' birr' : '-'}</>
        },
        {
            title: 'Total amount',
            dataIndex: 'price',
            render: (price, transact) => <>{price ? price * transact.quantity + ' birr' : '-'}</>
        },
        {
            title: 'Profit',
            dataIndex: 'profit',
            render: (profit, transact) => <p className={profit > 0 ? "text-success" : "text-danger"}> {profit} </p>
        },
        {
            title: 'Time',
            dataIndex: 'created_at',
            render: (created_at, transact) => <>{moment(created_at).fromNow()}</>
        }
    ];

    const buyTableColumns = [
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            render: (quantity, transact) => <>{parseInt(quantity)}</>
        },
        {
            title: 'Remaining',
            dataIndex: 'remaining',
            render: (remaining, transact) => remaining == 0 ? <p className="text-success"> <CheckSquareOutlined /> </p> : <p> {parseInt(remaining)} </p>

        },
        {
            title: 'Average Price',
            dataIndex: 'price',
            render: (price, transact) => <>{price ? price + ' birr' : '-'}</>
        },
        {
            title: 'Total amount',
            dataIndex: 'price',
            render: (price, transact) => <>{price ? price * transact.quantity + ' birr' : '-'}</>
        },
        {
            title: 'Time',
            dataIndex: 'created_at',
            render: (created_at, transact) => <>{moment(created_at).fromNow()}</>
        }
    ];


    const getSellStatics = () => {
        let _total_sell_amount = 0;
        let _total_sell_count = 0;
        let _total_profit = 0;
        itemData.sell_transactions.forEach(transact => {
            _total_sell_count += parseInt(transact.quantity);
            let amount = parseInt(transact.quantity) * parseFloat(transact.price);
            _total_sell_amount += parseFloat(amount);
            _total_profit += parseFloat(transact.profit);
        });
        setTotalSellAmount(_total_sell_amount);
        setTotalSellCount(_total_sell_count);
        setTotalProfit(_total_profit);


        let _remaining = 0;
        let _total_buy_amount = 0;
        let _total_buy_count = 0;
        itemData.buy_transactions.forEach(transact => {
            _total_buy_count += parseInt(transact.quantity);
            let amount = parseInt(transact.quantity) * parseFloat(transact.price);
            _total_buy_amount += parseFloat(amount);
            _remaining += parseInt(transact.remaining);
        });

        setTotalBuyAmount(_total_buy_amount);
        setTotalBuyCount(_total_buy_count);
        setTotalBuyRemaining(_remaining);
    }


    useEffect(() => {
        getSellStatics();
    }, [itemData])

    return (
        <Row gutter={[16, 16]} style={{ marginTop: 10 }}>

            <Col span={16}>
                <Table columns={columns} bordered dataSource={itemData.sell_transactions} rowKey="id" size="small" />
                <Table columns={buyTableColumns} bordered dataSource={itemData.buy_transactions} rowKey="id" size="small"
                    rowClassName={(record, index) => record.remaining == 0 ? 'table-row-green' : 'table-row-normal'}
                />

            </Col>
            <Col span={7} offset={1}>
                <Card hoverable className="text-center">
                    <Statistic title="Selled" value={total_sell_count} prefix={<LineChartOutlined />} />
                    <br />
                    <Statistic title="Sell amount" value={total_sell_amount} prefix={<MoneyCollectOutlined />} />
                    <br />
                    <Statistic valueStyle={{ color: total_profit > 0 ? 'green' : 'red' }} title="Total profit" value={total_profit} prefix={<MoneyCollectOutlined />} />
                </Card>

                <Card hoverable className="text-center my-3">
                    <Statistic title="Bought" value={total_buy_count} prefix={<LineChartOutlined />} />
                    <br />
                    <Statistic title="Amount" value={total_buy_amount} prefix={<MoneyCollectOutlined />} />
                    <br />
                    <Statistic valueStyle={{ color: total_buy_remaining == 0 ? 'green' : 'red' }} title="Remaining" value={total_buy_remaining} prefix={<LineChartOutlined />} />
                </Card>
            </Col>
        </Row>
    )
}

export default TransactionTables
