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
            render: total => <>{total} birr</>
        },
        {
            title: 'Paid',
            dataIndex: 'loan',
            render: (loan, sell) => <Typography.Text type="success">{loan ? sell.total - loan.price : sell.total} birr</Typography.Text>
        },
        {
            title: 'Loan',
            dataIndex: 'loan',
            render: loan => <Typography.Text type="warning">{loan ? loan.price : 0}  birr</Typography.Text>
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
                    <Popconfirm title="Are you sure you want to delete?" okText="Yes delete" cancelText="No back" onConfirm={() => deleteSell(sell)}>
                        <Button type="primary" style={{ backgroundColor: 'red', borderColor: 'red' }} size="small">Delete</Button>
                    </Popconfirm> : <Tag color="green">You</Tag>
            }</>
        },
    ]
    const sellsTransactionTableColumns = [
        {
            render: (trans) => <> {trans.item.name}</>
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity'
        },
        {
            title: 'Average price',
            dataIndex: 'price',
            render: price => <> {price} birr</>
        },
        {
            title: 'Total price',
            render: (trans) => <> {trans.price * trans.quantity} birr</>
        },
        {
            dataIndex: 'created_at',
            render: trans => <>{moment(trans).fromNow()} </>
        },
    ]

    let sells = props.sells;

    return (
        <Card style={{ marginBottom: 30 }} title="Todays sell report">

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
                                <Table.Summary.Cell>Total</Table.Summary.Cell>
                                <Table.Summary.Cell>{props.total_sell} birr</Table.Summary.Cell>
                                <Table.Summary.Cell>{props.total_sell - props.total_loan} birr</Table.Summary.Cell>
                                <Table.Summary.Cell>{props.total_loan} birr</Table.Summary.Cell>
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
