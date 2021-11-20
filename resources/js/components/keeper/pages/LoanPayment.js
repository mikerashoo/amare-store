import React, { useEffect, useState } from 'react'
import { Button, PageHeader, Popconfirm, Input, Popover, Table, message, Row, Col, DatePicker, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchUnpaidLoansAction,
    saveLoanPaymentAction,
    fetchTodaysLoanPaymentsAction
} from '../actions/loanActions'
import moment from 'moment'
import { toInteger, toLower, toNumber } from 'lodash';
import { StockOutlined } from "@ant-design/icons";
import { LeftRighBorderedTable } from '../../styled/common';
import { fetchTodaysLoanGivenAction } from '../../superadmin/actions/homeActions';

function LoanPayment() {

    const loanData = useSelector(state => state.loanData);
    const dispatch = useDispatch();

    const [pop_visibility, setPopVisibility] = useState(null);
    const [paid, setPaid] = useState(0)
    const [loans, setLoans] = useState([])

    useEffect(() => {
        dispatch(fetchUnpaidLoansAction())
        dispatch(fetchTodaysLoanPaymentsAction(window.user.id))
    }, [dispatch]);

    useEffect(() => {
        setLoans(loanData.data.loans);
    }, [loanData.data.loans])

    let loan_payments = loanData.data.payments;

    const getTotalPayment = loan => {
        let payed = 0;
        loan.payments.forEach(payment => {
            payed += parseFloat(payment.amount);
        });
        return payed;
    }

    const onLoanPaymentChange = (evt, loan) => {
        let value = evt.target.value;
        let loan_total = loan.price - getTotalPayment(loan);

        if (loan_total < value) {
            message.error('Loan amount can\'t be greater than total loan of customer. please enter valid amount!');
            return;
        }
        setPaid(value);
    }

    const onLoanPopoverVisibility = (visible, loan) => {
        if (!visible) {
            setPaid(0);
            setPopVisibility(null);
            return;
        }
        setPopVisibility(loan.id);
    };

    const onLoanPaymentConfirm = loan => {
        if (paid <= 0) {
            message.error('Please enter amount!');
            return;
        }
        let loan_id = loan.id;
        let user_id = window.user.id;
        let loanPayment = {
            loan_id,
            user_id,
            amount: paid
        }
        dispatch(saveLoanPaymentAction(loanPayment));
        dispatch(fetchTodaysLoanGivenAction(window.user.id));
        setPopVisibility(null);
        setPaid(0);
    }

    const loanTableColumns = [
        {
            title: '# ',
            dataIndex: 'id',
            render: (id, loan, index) => <>{toInteger(index) + 1} </>
        },
        {
            title: 'Customer',
            dataIndex: 'id',
            render: (id, loan, index) => <p>{loan.customer.name}</p>
        },
        {
            title: 'Sells',
            render: (id, loan) => <Popover content={<div>
                {
                    loan.sell.transactions.map(transact => <p>{transact.item.name} : {transact.quantity} x {transact.price} = <b>{toNumber(transact.quantity) * toNumber(transact.price)} birr </b></p>)

                }
            </div>}><Button><StockOutlined /></Button></Popover>
        },
        {
            title: 'Total amount',
            dataIndex: 'price',
            sorter: {
                compare: (a, b) => a.price - b.price
            },
            render: (price, loan) => <>{price} birr
            </>
        },
        {
            title: 'Paid ',
            sorter: {
                compare: (a, b) => getTotalPayment(a) - getTotalPayment(b)
            },
            render: (loan) => <Popover content={<div>{loan.payments.map(payment => <p><b>{payment.amount} birr </b> - {moment(payment.created_at).fromNow()}</p>)}</div>}>
                <>{getTotalPayment(loan)} birr</>
            </Popover>
        },
        {
            title: 'Remaining',
            sorter: {
                compare: (a, b) => (a.price - getTotalPayment(a)) - (b.price - getTotalPayment(b))
            },
            render: (loan) => <>{loan.price - getTotalPayment(loan)} birr
            </>
        },
        {
            title: 'Time',
            dataIndex: 'created_at',
            sorter: {
                compare: (a, b) => moment(a.created_at).unix() - moment(b.created_at).unix()
            },
            render: (time, sell) => <>{moment(time).fromNow()}
            </>
        },
        {
            render: (trans, loan) =>
                <Popover
                    title={<> <h5>{loan.customer.name + ' : Remaining'} {toInteger(loan.price) - toInteger(getTotalPayment(loan))} birr</h5> </>}
                    style={{ width: '50%' }}
                    content={
                        <>
                            <Input type="number" addonAfter="Paid" style={{ margin: 5 }} value={paid} onChange={(evt) => onLoanPaymentChange(evt, loan)} />
                            <Input value="200" disabled addonAfter="birr will remain" style={{ margin: 5 }} value={toInteger(loan.price) - toInteger(getTotalPayment(loan)) - paid} />
                            <div className="text-right">
                                <Button type="dashed" size="large" onClick={() => onLoanPopoverVisibility(false, loan)}> Cancel!</Button>

                                <Popconfirm title="Are you sure you want to register loan payment" okText="Yes! register" cancelText="Cancel" onConfirm={() => onLoanPaymentConfirm(loan)}>
                                    <Button type="primary" style={{ backgroundColor: 'blueviolet', borderColor: 'blueviolet' }} size="large"> Save payment </Button>
                                </Popconfirm>
                            </div>
                        </>
                    }
                    trigger="click"
                    onVisibleChange={(visible) => onLoanPopoverVisibility(visible, loan)}
                    visible={pop_visibility == loan.id}
                >
                    <Button type="primary" style={{ backgroundColor: 'blueviolet', borderColor: 'blueviolet' }} size="small">New payment</Button>
                </Popover>
        },
    ]

    const paymentsTableColumns = [
        {
            title: 'Customer',
            dataIndex: 'id',
            render: (id, payment, index) => <>{payment.loan.customer.name}</>
        },
        {
            title: 'Paid',
            dataIndex: 'amount',
            render: (price, loan) => <>{price} birr
            </>
        },
        {
            title: 'Date time',
            dataIndex: 'created_at',
            render: (time, payment) => <>{moment(time).fromNow()} </>
        },
    ]

    const onCustomerSearch = evt => {
        let value = evt.target.value;
        let _loans = loanData.data.loans.filter(loan => toLower(loan.customer.name).startsWith(toLower(value)));
        setLoans(_loans);
    }

    const onDateTimeChange = (time, timeString) => {
        let _loans = loanData.data.loans.filter(loan => toLower(loan.created_at).startsWith(toLower(timeString)));
        setLoans(_loans);
    }
    return (
        <div>
            <PageHeader title="Loan management" style={{ marginBottom: 20 }} onBack={() => window.history.back()} />
            <Row gutter={[16, 16]}>
                <Col span={16}>
                    <Card loading={loanData.loading} hoverable title="Customers with loan" headStyle={{ backgroundColor: '#eef' }}>
                        <div style={{ padding: 10 }}>
                            <Input placeholder="Search customer" style={{ width: '30%' }} onChange={(evt) => onCustomerSearch(evt)} />
                            <DatePicker placeholder="Pick date" onChange={onDateTimeChange} />
                        </div>
                        <LeftRighBorderedTable
                            dataSource={loans}
                            loading={loanData.loading}
                            columns={loanTableColumns}
                            rowKey="id" size="small"
                            showSorterTooltip />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card loading={loanData.loading} hoverable title="Loans paid today" headStyle={{ backgroundColor: '#eef' }}>
                        <LeftRighBorderedTable dataSource={loan_payments} loading={loanData.loading} columns={paymentsTableColumns} size="small"
                            rowKey="id"
                            summary={pageData => {
                                let totalAmount = 0;
                                pageData.forEach(payment => {
                                    totalAmount += parseFloat(payment.amount);
                                });
                                return (
                                    <>
                                        <Table.Summary.Row style={{ backgroundColor: 'gold' }}>
                                            <Table.Summary.Cell key="total">Total</Table.Summary.Cell>
                                            <Table.Summary.Cell key="total_birr">{totalAmount} birr</Table.Summary.Cell>
                                            <Table.Summary.Cell key="-">-</Table.Summary.Cell>
                                        </Table.Summary.Row>
                                    </>
                                )
                            }}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default LoanPayment;
