import { Card, Col, Row, Button, Empty, Avatar, message, Input, Popconfirm, PageHeader, Divider, Popover } from 'antd';
import CreatableSelect from "react-select/creatable";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchStocksAction, fetchTransactionsAction, addNewTransactionAction, changeTransactionAction, removeTransactionAction, saveNewSellAction, hideLoanModalAction, clearLoanAction, fetchCustomersAction } from "../actions/stockActions";
import { CloseCircleFilled, EditOutlined, EllipsisOutlined, InfoCircleOutlined, SettingOutlined } from "@ant-design/icons";
import { ItemRemaining } from "../keeper-styles";
import { toNumber } from "lodash";
import { NavLink } from 'react-router-dom';
import ItemImagePlaceHolder from '../../item-image-placeholder';

function Stocks() {
    const dispatch = useDispatch();
    const stocks = useSelector(state => state.stocks);
    const [customer, setCustomer] = useState();
    const [paid, setPaid] = useState(0);

    let transactions_total = 0;
    const customer_options = [];

    useEffect(() => {
        dispatch(fetchStocksAction());
        dispatch(fetchTransactionsAction());
        dispatch(fetchCustomersAction());
    }, [dispatch]);


    const onTransactionInputChange = (evt, trans) => {
        let name = evt.target.name;
        let value = evt.target.value;

        if (name == "quantity" && trans.item.remaining < value) {
            message.error('error');
            evt.preventDefault();
        }

        let transaction = {
            ...trans,
            [name]: toNumber(value)
        };
        dispatch(changeTransactionAction(transaction));

    }

    const addTransaction = item => {
        if (item.remaining == 0) {
            message.error(`No ${item.name} in store`);
            return;
        }
        let is_exist = false;
        stocks.data.transactions.forEach(transaction => {
            if (transaction.item.id == item.id) {
                is_exist = true;
            }
        });
        if (is_exist) {
            message.warning(`${item.name} already selected`);
            return;
        }
        let transaction = {
            item,
            price: item.price,
            quantity: 1,
        }
        dispatch(addNewTransactionAction(transaction));
    }

    const removeFromTransaction = transact => {
        dispatch(removeTransactionAction(transact));
    }

    const onConfirmSell = () => {
        let transactions = [];
        let errors = [];
        let loan = stocks.data.loan ? {
            paid: stocks.data.loan.paid,
            customer_id: stocks.data.loan.user.id
        } : null;

        stocks.data.transactions.forEach(transact => {
            if (transact.price <= 0) {
                errors.push(`invalid amount for ${transact.item.name}`);
            }
            transactions.push({
                item_id: transact.item.id,
                price: transact.price,
                quantity: transact.quantity
            })
        });


        if (stocks.data.loan && stocks.data.loan.paid >= transactions_total) {
            errors.push(`Loan value can't be greater than total sell!`);

        }


        if (errors.length != 0) {
            errors.map(err => {
                message.error({ content: err, duration: 3 });
            })
            return;
        }

        let sell = {
            total: transactions_total,
            user_id: window.user.id,
            transactions,
            customer,
            paid: customer ? paid : transactions_total
        }


        dispatch(saveNewSellAction(sell));
        dispatch(fetchStocksAction());
        dispatch(fetchCustomersAction());
        setCustomer(null);
    }

    stocks.data?.transactions.forEach(trans => {
        let trans_total = trans.price * trans.quantity;
        transactions_total += trans_total;
    });

    stocks.data.customers.forEach(customer => {
        customer_options.push({ value: customer.id, label: customer.name });
    });


    const onCustomerChange = (_customer, action) => {
        if (!customer) {
            setPaid(transactions_total);
        }

        setCustomer(_customer);
    }

    const onPaidChange = (evt) => {
        let value = evt.target.value;
        if (value > transactions_total) {
            message.error('Value can\'t be greater than total sell amount!');
            return;
        }
        setPaid(value);
    }

    let categories_list = stocks.data ? stocks.data.categories : [];


    const itemProperty = (item) => {
        return <> {
            item.property_values.map(pro => {
                let _pro = item.properties.find(_p => _p.id == pro.property_id);
                return <p key={pro.id}>{_pro.name} : <b>{pro.value ? pro.value + " " + _pro.unit?.name : "-"} </b></p>
            })
        } </>
    }

    return (
        <div>
            <PageHeader title="Daily sell registration" extra={[<NavLink key="rep" to="/keeper/daily"><Button>Daily report</Button></NavLink>,
            <NavLink key="loan" to="/keeper/loanpayments"><Button>Loan payments</Button></NavLink>]} />
            <Row>
                <Col span={17} style={{ height: '100%' }}>

                    {
                        categories_list.map((category, c) =>
                            <Card bordered loading={stocks.data?.loading}
                                headStyle={{ backgroundColor: '#eef' }} title={category.name} key={c} style={{ margin: 30 }}>

                                <Row>
                                    {
                                        category.items.map((item, i) => item.status == 1 ? <Col span={7} offset={1} className="text-center mb-3" key={i}>
                                            <Card hoverable onClick={() => addTransaction(item)}
                                                cover={item.logo_name ? <img height="150" alt={item.name} src={"/images/items/" + item.logo_name} /> : <ItemImagePlaceHolder />}

                                            >

                                                <Card.Meta
                                                    title={item.name}
                                                    description={`${item.remaining} remaining`}
                                                />
                                                <Popover title={`${item.name} detail`} content={() => itemProperty(item)}>
                                                    <InfoCircleOutlined color="green" key="setting" />
                                                </Popover>
                                            </Card>
                                        </Col> : <></>)
                                    }
                                </Row>
                            </Card>)
                    }
                </Col>
                <Col span={7}>
                    <Card hoverable loading={stocks.data?.loading} bordered headStyle={{ backgroundColor: '#eef' }} title="Selected sells" style={{ marginTop: 30 }}>
                        {stocks.data && stocks.data.transactions.length ?
                            <>
                                <>
                                    {
                                        stocks.data.transactions.map((transaction, t) => <div key={t} >
                                            <Divider orientation="left">
                                                {transaction.item.name} <span style={{ cursor: 'pointer' }} onClick={() => removeFromTransaction(transaction)}> <CloseCircleFilled /> </span>
                                            </Divider>

                                            <div style={{ marginTop: 10 }}>
                                                <Input placeholder="0" type="number" defaultValue={transaction.quantity} name="quantity" onChange={(evt) => onTransactionInputChange(evt, transaction)} addonBefore="Quantity" style={{ marginBottom: 10, width: '50%' }} />
                                                <Input placeholder="0.0" defaultValue={transaction.price} addonBefore="Average price" min="1" onChange={(evt) => onTransactionInputChange(evt, transaction)} name="price" style={{ marginBottom: 10, width: '50%' }} />
                                                <Input addonBefore="Total price" value={transaction.quantity * transaction.price + " birr"} style={{ marginBottom: 10 }} disabled />

                                            </div>
                                        </div>)
                                    }
                                    <Divider>{transactions_total} birr</Divider>

                                </>

                                <Card bodyStyle={{ backgroundColor: '#efe' }} style={{ marginBottom: 20 }}>
                                    <div>
                                        <CreatableSelect style={{ margin: 5 }}
                                            options={customer_options}
                                            onChange={onCustomerChange}
                                            isClearable
                                        />


                                        <Input type="number" value={customer ? paid : transactions_total} disabled={!customer} addonAfter="Paid amount" style={{ margin: 5 }} onChange={onPaidChange} />

                                        <Input value={customer ? transactions_total - paid : 0} disabled addonAfter="Remaining" style={{ margin: 5 }} />
                                    </div>

                                </Card>
                                <Popconfirm title="Confirm sell registration?" okText="Yes sure!" cancelText="Cancel!" onConfirm={() => onConfirmSell()}>
                                    <Button type="primary" size="medium" style={{ width: '100%' }} >Register sell</Button>
                                </Popconfirm>
                            </>
                            : <> <Empty /> </>}
                    </Card>
                </Col>
            </Row>
        </div >
    )
}

export default Stocks;
