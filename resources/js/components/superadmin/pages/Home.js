import { Card, Col, Row, Statistic } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux';
import TodaysSell from '../views/home/TodaysSell'
import { ArrowDownOutlined, CheckOutlined, DollarCircleOutlined, LikeOutlined, LineChartOutlined, MoneyCollectOutlined, PercentageOutlined, SendOutlined } from '@ant-design/icons'
import { EdgedCard } from '../../styled/common';
import LoanGiven from '../views/home/LoanGiven';
import LoanCollected from '../views/home/LoanCollected';

function Home() {
    const homeState = useSelector(state => state.homeStote);

    const getTotalCollected = () => {
        let total = 0;
        homeState.todays_sell.data.forEach(item => {
            item.sell_transactions.forEach(transact => {
                total += parseFloat(transact.price);
            });
        })
        return total;
    }

    const getTotalProfit = () => {
        let total = 0;
        homeState.todays_sell.data.forEach(item => {
            total += parseFloat(item.profit);
        })
        return total;
    }


    const getLoanGivenTotal = () => {
        let total = 0;
        homeState.loans_given.data.forEach(customer => {
            customer.loans.forEach(loan => {
                total += parseFloat(loan.price);
            });
        });
        return total;
    }
    const getLoanPaymentTotal = () => {
        let total = 0;
        homeState.loan_payments.data.forEach(customer => {
            customer.loan_payments.forEach(payment => {
                total += parseFloat(payment.amount);
            });
        });
        return total;
    }

    const getTotalSelledItemCount = () => {
        let total = 0;
        homeState.todays_sell.data.forEach(item => {
            item.sell_transactions.forEach(sell_transaction => {
                total += parseInt(sell_transaction.quantity)
            });

        })
        return total;
    }

    return (
        <div>
            <div style={{ paddingTop: 20, paddingBottom: 20 }}>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <EdgedCard style={{
                            fontSize: "1.5em",
                            color: 'white !important',
                            backgroundColor: 'magenta',
                        }} hoverable>
                            {/* <h4 style={{ color: 'whitesmoke' }}><DollarCircleOutlined /> Todays sell </h4>
                            <h2 style={{ color: 'white' }}> {getTotalCollected()} birr </h2> */}
                            <Row gutter={16}>
                                <Col span={8}>
                                    <Statistic title="Items selled" value={getTotalSelledItemCount()} prefix={<LineChartOutlined />} />
                                </Col>
                                <Col span={8}>
                                    <Statistic title="Sell amount" value={getTotalCollected()} prefix={<MoneyCollectOutlined />} />
                                </Col>
                                <Col span={8}>
                                    <Statistic title="Profit gain" value={getTotalProfit()} prefix={<LikeOutlined />} />
                                </Col>
                            </Row>
                        </EdgedCard>
                    </Col>
                    <Col span={6}>
                        <EdgedCard style={{
                            backgroundColor: '#ffa726',
                            color: 'white',
                            fontSize: "1.5em",
                        }} hoverable>
                            <Statistic title="Loans Collected today" value={getLoanPaymentTotal()} prefix={<CheckOutlined />} />

                        </EdgedCard>
                    </Col>

                    <Col span={6}>
                        <EdgedCard style={{
                            fontSize: "1.5em",
                            backgroundColor: '#ff5722',
                            color: 'white',
                        }} hoverable>

                            <Statistic title="Loans given today" value={getLoanGivenTotal()} valueStyle={{ color: '#cf1322' }}
                                prefix={<ArrowDownOutlined />} />

                        </EdgedCard>
                    </Col>
                </Row>
            </div>

            <Row gutter={[16, 16]}>
                <Col span={15}>

                    <EdgedCard title="Item sells today"
                        hoverable
                        headStyle={{
                            borderTopLeftRadius: 5,
                            borderTopRightRadius: 5,
                            backgroundColor: '#fce4ec',
                        }}>
                        <TodaysSell />
                    </EdgedCard>

                </Col>
                <Col span={9} >
                    <EdgedCard title="Loans collected today"
                        hoverable
                        style={{
                            marginBottom: 20
                        }}
                        headStyle={{
                            borderTopLeftRadius: 5,
                            borderTopRightRadius: 5,
                            backgroundColor: '#e0f2f1',
                        }}>
                        <LoanCollected />
                    </EdgedCard>
                    <EdgedCard title="Loans given today"
                        hoverable
                        headStyle={{
                            borderTopLeftRadius: 5,
                            borderTopRightRadius: 5,
                            backgroundColor: '#ffecb3',
                        }}>
                        <LoanGiven />
                    </EdgedCard>
                </Col>

            </Row>
        </div>
    )
}

export default Home
