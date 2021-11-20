import React, { useEffect } from 'react'
import { Skeleton, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodaysLoanGivenAction } from '../../actions/homeActions';
import { MoneyCollectOutlined } from '@ant-design/icons'

function LoanGiven() {

    const dispatch = useDispatch()
    const homeState = useSelector(state => state.homeStote);
    useEffect(() => {
        dispatch(fetchTodaysLoanGivenAction());
    }, [dispatch]);

    const getTotal = (loans) => {
        let total = 0;
        loans.forEach(loan => {
            total += parseFloat(loan.price);
        });
        return total;
    }

    const tableColumns = [
        {
            dataIndex: "id",
            render: (item, id, index) => <>{index + 1} </>
        },
        {
            dataIndex: 'name'
        },
        {
            dataIndex: 'loans',
            render: (loans, i) => <>{getTotal(loans)}  <MoneyCollectOutlined color="green" /></>
        },
    ]

    return (
        <Skeleton loading={homeState.loans_given.loading}>
            <Table dataSource={homeState.loans_given.data} showHeader={false} rowKey="id" columns={tableColumns} size="small" />
        </Skeleton>
    )
}

export default LoanGiven
