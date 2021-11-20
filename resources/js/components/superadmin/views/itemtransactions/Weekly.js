import React, { useEffect } from 'react';
import { Spin, Card, Divider, DatePicker, Row, Col, Table, Statistic } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeeklyTransactions } from '../../actions/itemTransactionActions';
import moment from 'moment';
import TransactionTables from './TransactionTables';

function Weekly(props) {
    const item_state = useSelector(state => state.itemTransactions);
    const dispatch = useDispatch();
    const item_id = props.item_id;


    const { RangePicker } = DatePicker;
    const dateFormat = 'YYYY-MM-DD hh:mm:ss';

    let today = moment().toISOString();
    let end_date = today;
    let start_date = moment().startOf('week').toISOString();

    useEffect(() => {
        dispatch(fetchWeeklyTransactions(item_id, start_date, end_date));
    }, [dispatch, item_id]);

    function onChange(date, dateRange) {
        if (date == null || date == undefined) {
            dispatch(fetchWeeklyTransactions(item_id, start_date, end_date));
        }
        else {
            dispatch(fetchWeeklyTransactions(item_id, dateRange[0], dateRange[1]));

        }
    }

    return (
        <Spin spinning={item_state.weekly.loading}>
            <Card>
                <Row>
                    <Col span={18}>
                        {/* <h3>{item_state.item?.name} Weekly transactions</h3> */}
                    </Col>
                    <Col span={6}>
                        <RangePicker
                            onChange={onChange}
                            // defaultValue={[start_date, end_date]}
                            format={dateFormat}
                        />
                    </Col>
                </Row>
                <Divider />
                <TransactionTables itemData={item_state.weekly} />

            </Card>
        </Spin>
    );
}

export default Weekly;
