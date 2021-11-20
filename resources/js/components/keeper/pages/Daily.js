import React, { useEffect, useState } from 'react'
import { PageHeader, Card, Row, Col, Tabs, DatePicker, Divider, Skeleton } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { fetchDailySellsAction, fetchDailyTransactionsAction, fetchTotalLoanPaymentOnDate, fetchTotalLoanPaymentOnDateAction } from "../actions/dailyActions";
import { CheckCircleOutlined, MinusCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import { ItemSells, SellsReport } from '../views/reports';
import moment from 'moment';
import { fetchTodaysLoanPaymentsAction } from '../actions/loanActions';
const TODAY = moment().format('YYYY-MM-DD');
const { TabPane } = Tabs;
function Daily() {
    let total_sell = 0;
    let total_loan = 0;

    const dispatch = useDispatch();
    const dailySell = useSelector(state => state.dailySell);
    const [selectedDate, setSelectedDate] = useState(TODAY);

    dailySell.data.sells.forEach(sell => {
        total_sell += parseFloat(sell.total);
        if (sell.loan) {
            total_loan += parseFloat(sell.loan.price);
        }
    });

    useEffect(() => {
        dispatch(fetchDailyTransactionsAction(selectedDate));
        dispatch(fetchDailySellsAction(selectedDate));
        dispatch(fetchTotalLoanPaymentOnDateAction(selectedDate));
    }, [selectedDate]);

    const onSpecificDateTimeChange = (date, date_string) => {
        if (date_string.length == 0) {
            date_string = TODAY;
        }
        setSelectedDate(date_string);

    }

    const isDateFuture = (current) => {
        return current && current.valueOf() > Date.now();
    }

    let total_loan_payment = dailySell.data.total_loan_payment;
    return (
        <div style={{ width: '100%', height: '100%' }}>

            <PageHeader title={`Daily sell reports ( ${selectedDate} )`} style={{ marginBottom: 20 }} onBack={() => window.history.back()} extra={[
                <DatePicker key="1" onChange={onSpecificDateTimeChange} disabledDate={isDateFuture} />,
                // <DatePicker.RangePicker onChange={onSpecificDateTimeChange} key="2" showTime disabledDate={isDateFuture} />
            ]} />
            <Divider />
            <Row gutter={[12, 12]}>
                <Col span={16}>
                    <Tabs defaultActiveKey="1" tabPosition="left">
                        <TabPane tab="Sell reports" tabKey="sell" key="1">
                            <Skeleton loading={dailySell.loading}>
                                <SellsReport total_sell={total_sell} total_loan={total_loan} sells={dailySell.data.sells} />
                            </Skeleton>
                        </TabPane>
                        <TabPane tab="Item sell reports" tabKey="items" key="2">
                            <Skeleton loading={dailySell.loading}>
                                <ItemSells />
                            </Skeleton>
                        </TabPane>
                    </Tabs>
                </Col>

                <Col span={6} offset={1}>
                    <Card title="Total report" bodyStyle={{ backgroundColor: 'darkslateblue' }}>
                        <h6 className="text-white"><CheckCircleOutlined /> Total sell amount : {total_sell} birr</h6>
                        <h6 className="text-white"><CheckCircleOutlined /> Total income from loan : {total_loan_payment} birr</h6>
                        <h6 className="text-white"><MinusCircleOutlined /> Total loan given : {total_loan} birr</h6>
                        <h5 className="text-white"><b><CheckCircleOutlined />Total cash : {total_sell + total_loan_payment - total_loan} birr</b></h5>
                    </Card>
                </Col>

            </Row>
        </div>
    )
}

export default Daily
