import React, { useEffect } from 'react';
import { Spin, Card, Typography, DatePicker, Row, Col, Table, Divider } from "antd";
import { DollarCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMonthlyTransactionsAction, fetchWeeklyTransactions } from '../../actions/itemTransactionActions';
import moment from 'moment';
import TransactionTables from './TransactionTables';

function Monthly(props) {
    const item_state = useSelector(state => state.itemTransactions);
    const dispatch = useDispatch();
    const item_id = props.item_id;

    let monthly = item_state.monthly;


    useEffect(() => {
        dispatch(fetchMonthlyTransactionsAction(item_id, moment().month() + 1, moment().year()));
    }, [dispatch, item_id]);



    function onChange(date, dateRange) {
        dispatch(fetchMonthlyTransactionsAction(item_id, date.month() + 1, date.year()));
    }

    return (
        <Spin spinning={monthly.loading}>
            <Card>
                <Row>
                    <Col span={18}>
                        <h3>{item_state.item?.name} Monthly transactions</h3>
                    </Col>
                    <Col span={6}>
                        <DatePicker
                            picker="month"
                            onChange={onChange}
                        />
                    </Col>
                </Row>
                <Divider />
                <TransactionTables itemData={monthly} />

            </Card>
        </Spin>
    );
}

export default Monthly;
