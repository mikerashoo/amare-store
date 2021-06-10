import React from 'react'
<<<<<<< HEAD
import { Table, Button, Card, Popconfirm, Typography } from "antd";
=======
import { Table, Button, Card, Popconfirm, Typography, Tag } from "antd";
>>>>>>> f943059fc8ecfca792a2f2e6aeaade24466c40c5
import { useDispatch, useSelector } from 'react-redux';
import { fetchDailyTransactionsAction, deleteDailySellAction } from "../../actions/dailyActions";
import moment from "moment";  
import { toInteger } from 'lodash';  
function SellsReport() {
    let total_sell = 0;
    let total_loan = 0;
    
    const dispatch = useDispatch();
    const dailySell = useSelector(state => state.dailySell);
    
<<<<<<< HEAD
    dailySell.data.sells.forEach(sell => {
=======
    dailySell.data.sells.forEach(sell => { 
>>>>>>> f943059fc8ecfca792a2f2e6aeaade24466c40c5
        total_sell += sell.total;
        total_loan += sell.loan ? sell.loan.price : 0;
    });
 
    const deleteSell = (sell) => {
        dispatch(deleteDailySellAction(sell.id));
        dispatch(fetchDailyTransactionsAction());
    }
     
    
    const sellsTableColumns = [
        {
            title: '# / ደንበኛ',
            dataIndex: 'id',
            render: (id, sell, index) => <p>{sell.customer ? sell.customer.name :toInteger(index) + 1}</p>
        }, {
            title: 'ጠቅላላ ብር',
            dataIndex: 'total',
            render: total => <>{total} ብር</>
        }, 
        {
            title: 'የተክፈለ',
            dataIndex: 'loan',
            render: (loan, sell) => <Typography.Text type="success">{loan ? sell.total - loan.price : sell.total} ብር</Typography.Text> 
        },    
        {
            title: 'ቀር ብድር',
            dataIndex: 'loan',
            render: loan => <Typography.Text type="warning">{loan ? loan.price : 0}  ብር</Typography.Text>
        }, 
        {
            title: 'ሰዓት',
            dataIndex: 'created_at',
            render: (time) => <>{moment(time).fromNow()} 
            </>
        },           
        {
<<<<<<< HEAD
            render: (trans, sell) => <Popconfirm title="እርገጠኛ ነኝ ሽያጩን ሰርዝ" okText="አዎ ሰርዝ" cancelText="አይ ተው!" onConfirm={() => deleteSell(sell)}>
            <Button type="primary" style={{backgroundColor: 'red', borderColor: 'red'}} size="small">ሰርዝ</Button>
            </Popconfirm>
=======
            render: (trans, sell) => <>{sell.user_id != window.user.id ? <Tag color="green">{sell.user.name}</Tag> : <Popconfirm title="እርገጠኛ ነኝ ሽያጩን ሰርዝ" okText="አዎ ሰርዝ" cancelText="አይ ተው!" onConfirm={() => deleteSell(sell)}>
            <Button type="primary" style={{backgroundColor: 'red', borderColor: 'red'}} size="small">ሰርዝ</Button>
            </Popconfirm> }</> 
>>>>>>> f943059fc8ecfca792a2f2e6aeaade24466c40c5
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
     
    let sells = dailySell.data.sells; 
    
    return ( 
        <Card style={{marginBottom: 30}} title="የቀን ገብ በሽያጭ">
        
<<<<<<< HEAD
        <Table dataSource={sells} loading={dailySell.loading} rowKey="id"            
=======
        <Table 
        // rowClassName={(record, index) => record.user_id != window.user.id ? 'table-row-light' :  'table-row-dark'}
        dataSource={sells} 
        loading={dailySell.loading} rowKey="id"            
>>>>>>> f943059fc8ecfca792a2f2e6aeaade24466c40c5
        columns={sellsTableColumns} bordered pagination={false}
        expandable={{
            expandedRowRender: sell => <>
            <Table dataSource={sell.transactions} rowKey="id" style={{marginTop: 10}} columns={sellsTransactionTableColumns} bordered size="small"  />
            </>
        }}
        summary={() => {  
            return (
                <>
                <Table.Summary.Row style={{backgroundColor: 'gold'}}>
                <Table.Summary.Cell>-</Table.Summary.Cell> 
                <Table.Summary.Cell>ጠቅላላ</Table.Summary.Cell> 
                <Table.Summary.Cell>{total_sell} ብር</Table.Summary.Cell>
                <Table.Summary.Cell>{total_sell - total_loan} ብር</Table.Summary.Cell>
                <Table.Summary.Cell>{total_loan} ብር</Table.Summary.Cell>
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
            