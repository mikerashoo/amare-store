import { Skeleton, Table } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodaysItemSellAction } from '../../actions/homeActions';
import { MoneyCollectOutlined } from '@ant-design/icons'

function TodaysSell() {
    const homeState = useSelector(state => state.homeStote);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodaysItemSellAction());
    }, [dispatch]);

    const getTotal = (transactions) => {
        let total = 0;
        transactions.forEach(transact => {
            total += parseFloat(transact.price);
        });
        return total;
    }

    const getTotalQuantity = (transactions) => {
        let quantity = 0;
        transactions.forEach(transact => {
            quantity += parseInt(transact.quantity);
        });
        return quantity;
    }

    const tableColumns = [
        {
            dataIndex: "id",
            render: (item, id, index) => <>{index + 1} </>
        },
        {
            title: "Name",
            dataIndex: 'name'
        },
        {
            title: "Count",
            dataIndex: 'sell_transactions',
            render: (transact, i) => <>{getTotalQuantity(transact)}</>
        },
        {
            title: "Sell amount",
            dataIndex: 'sell_transactions',
            render: (transact, i) => <>{getTotal(transact)}  <MoneyCollectOutlined color="green" /></>
        },
        {
            title: "Profit",
            dataIndex: 'profit',
        },
        {
            title: "Remaining",
            dataIndex: 'remaining'
        }

    ]
    return (
        <Skeleton loading={homeState.todays_sell.loading}>
            <Table dataSource={homeState.todays_sell.data} rowKey="id" columns={tableColumns} size="small" />
        </Skeleton>
    )
}

export default TodaysSell
