import React, { useEffect } from 'react'
import { Skeleton, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodaysLoanPaymentAction } from '../../actions/homeActions';
import { MoneyCollectOutlined } from '@ant-design/icons'

function LoanCollected() {

    const dispatch = useDispatch()
    const homeState = useSelector(state => state.homeStote);
    useEffect(() => {
        dispatch(fetchTodaysLoanPaymentAction());
    }, [dispatch]);


    const getTotal = (loan_payments) => {
        let total = 0;
        loan_payments.forEach(loan_payment => {
            total += parseFloat(loan_payment.amount);
        });
        return total;
    }

    const tableColumns = [
        {
            dataIndex: "id",
            render: (item, id, index) => <>{index + 1} </>
        },
        {
            title: 'Customer',
            dataIndex: 'name'
        },
        {
            title: 'Collected',
            dataIndex: 'loan_payments',
            render: (loan_payments, i) => <>{getTotal(loan_payments)}  <MoneyCollectOutlined color="green" /></>
        },
        {
            title: 'Remaining',
            dataIndex: 'remaining',
            render: (remaining, i) => <>{remaining} <MoneyCollectOutlined color="red" /></>
        },
    ]
    console.log("homeState", homeState);
    return (
        <Skeleton loading={homeState.loan_payments.loading}>
            <Table dataSource={homeState.loan_payments.data} rowKey="id" columns={tableColumns} size="small" />
        </Skeleton>
    )
}

export default LoanCollected
