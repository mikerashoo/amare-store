import React, { useEffect } from 'react';
import { Spin, Card, Typography, DatePicker, Row, Col, Table } from "antd";
import { DollarCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from 'react-redux';
import { fetchDailyTransactions } from '../../actions/itemTransactionActions';
import moment from 'moment';
import TransactionTables from './TransactionTables';
function Daily(props) {
    const item_state = useSelector(state => state.itemTransactions);
    const dispatch = useDispatch();
    const item_id = props.item_id;
    useEffect(() => {
        dispatch(fetchDailyTransactions(item_id, 'today'));
    }, [dispatch, item_id]);

    let daily = item_state.daily;

    function onChange(date, dateString) {
        dispatch(fetchDailyTransactions(item_id, dateString));
    }

    return (
        <Spin spinning={daily.loading}>
            <Card>
                <Row>
                    <Col span={18}>
                        <h3>{item_state.item?.name} daily transaction</h3>
                    </Col>
                    <Col span={6}>
                        <DatePicker onChange={onChange} allowClear={false} />
                    </Col>
                </Row>
                <TransactionTables itemData={item_state.daily} />

            </Card>
        </Spin>
    );
}

export default Daily;
