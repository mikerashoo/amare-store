import React from 'react'
import { Table, Button, Card, Popconfirm, Typography, Tag } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { fetchDailyTransactionsAction, deleteDailySellAction } from "../../actions/dailyActions";
import moment from "moment";
import { toInteger } from 'lodash';
function SellsReport(props) {

    const dispatch = useDispatch();
    const deleteSell = (sell) => {
        dispatch(deleteDailySellAction(sell.id));
        dispatch(fetchDailyTransactionsAction());
    }

    const sellsTableColumns = [
        {
            title: '# / Customer',
            dataIndex: 'id',
            render: (id, sell, index) => <p>{sell.customer ? sell.customer.name : toInteger(index) + 1}</p>
        }, {
            title: 'Total sell',
            dataIndex: 'total',
            render: total => <>{total} ብር</>
        },
        {
            title: 'Paid',
            dataIndex: 'loan',
            render: (loan, sell) => <Typography.Text type="success">{loan ? sell.total - loan.price : sell.total} ብር</Typography.Text>
        },
        {
            title: 'Loan',
            dataIndex: 'loan',
            render: loan => <Typography.Text type="warning">{loan ? loan.price : 0}  ብር</Typography.Text>
        },
        {
            title: 'time',
            dataIndex: 'created_at',
            render: (time) => <>{moment(time).fromNow()}
            </>
        },
        {
            render: (trans, sell) => <>{sell.user_id != window.user.id ?
                <Tag color="orange">{sell.user.name}</Tag> :
                moment(sell.created_at).isSame(moment(), 'day') ?
                    <Popconfirm title="እርገጠኛ ነኝ ሽያጩን ሰርዝ" okText="አዎ ሰርዝ" cancelText="አይ ተው!" onConfirm={() => deleteSell(sell)}>
                        <Button type="primary" style={{ backgroundColor: 'red', borderColor: 'red' }} size="small">ሰርዝ</Button>
                    </Popconfirm> : <Tag color="green">You</Tag>
            }</>
        },
    ]
    const sellsTransactionTableColumns = [
        {
            title: 'የዕቃው አይነት',
            render: (trans) => <> {trans.item.name}</>
        },
        {
            title: 'ብዛት',
            dataIndex: 'quantity'
        },
        {
            title: 'የአንዱ ዋጋ',
            dataIndex: 'price',
            render: price => <> {price} ብር</>
        },
        {
            title: 'ጠቅላላ ዋጋ',
            render: (trans) => <> {trans.price * trans.quantity} ብር</>
        },
        {
            title: 'ሰዓት',
            dataIndex: 'created_at',
            render: trans => <>{moment(trans).fromNow()} </>
        },
    ]

    let sells = props.sells;

    return (
        <Card style={{ marginBottom: 30 }} title="የቀን ገብ በሽያጭ">

            <Table
                // rowClassName={(record, index) => record.user_id != window.user.id ? 'table-row-light' :  'table-row-dark'}
                dataSource={sells}
                rowKey="id"
                columns={sellsTableColumns} bordered pagination={false}
                expandable={{
                    expandedRowRender: sell => <>
                        <Table dataSource={sell.transactions} rowKey="id" style={{ marginTop: 10 }} columns={sellsTransactionTableColumns} bordered size="small" />
                    </>
                }}
                summary={() => {
                    return (
                        <>
                            <Table.Summary.Row style={{ backgroundColor: 'gold' }}>
                                <Table.Summary.Cell>-</Table.Summary.Cell>
                                <Table.Summary.Cell>ጠቅላላ</Table.Summary.Cell>
                                <Table.Summary.Cell>{props.total_sell} ብር</Table.Summary.Cell>
                                <Table.Summary.Cell>{props.total_sell - props.total_loan} ብር</Table.Summary.Cell>
                                <Table.Summary.Cell>{props.total_loan} ብር</Table.Summary.Cell>
                                <Table.Summary.Cell>-</Table.Summary.Cell>
                                <Table.Summary.Cell>-</Table.Summary.Cell>
                            </Table.Summary.Row>
                        </>
                    )
                }}
            />
        </Card>
    )
}

export default SellsReport
