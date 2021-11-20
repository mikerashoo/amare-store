import { DollarOutlined } from '@ant-design/icons';
import { Checkbox, Col, Collapse, Input, Row, Skeleton, Table, Form, Button, PageHeader, DatePicker, Card } from 'antd'
import { min } from 'lodash';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchStocksAction, saveNewItemBuyAction, saveNewTransactionAction } from '../actions/stockActions';
import moment from 'moment'
const { Panel } = Collapse;

const formLayout = {
    wrapperCol: {
        span: 20
    },
    labelCol: {
        span: 4
    }
}
const formButtonLayout = {
    wrapperCol: {
        span: 20,
        offset: 4
    },
}


function NewBuy() {


    const [selectedItems, setSelectedItems] = useState([]);
    const [searchedCategories, setSearchedCategories] = useState([]);
    const categoriesState = useSelector(state => state.stocks);
    const categories = categoriesState.data.categories;
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(fetchStocksAction());

        setSearchedCategories(categoriesState.data.categories);
    }, [dispatch]);

    useEffect(() => {
        setSearchedCategories(categories);
    }, [categories]);

    const onSearch = event => {
        let searched = event.target.value;
        let _categories = [];
        categories.map(categ => {
            let _items = categ.items.filter(it => it.name.toLowerCase().startsWith(searched.toLowerCase()));
            let _categ = {
                ...categ,
                items: _items
            }
            if (_items.length != 0) {
                _categories.push(_categ);
            }
        });
        setSearchedCategories(_categories);
    }


    const itemsColumns = [
        {
            render: (item, i) => <Checkbox key={item.id} onChange={e => onItemChange(e, item)} name={item.id}>{item.name}</Checkbox>
        },
        {
            dataIndex: "remaining"
        }
    ]

    const onItemChange = (e, item) => {
        if (e.target.checked) {
            setSelectedItems([...selectedItems, item]);
        }
        else {
            setSelectedItems([...selectedItems.filter(it => it.id != item.id)])
        }
    }
    const onSubmit = values => {
        let _date = moment(values.date).format("YYYY-MM-DD");

        let data = {
            item_sells: { ...values, date: null },
            date: _date,
            user_id: window.user.id
        };

        dispatch(saveNewItemBuyAction(data));
        form.resetFields();
        setSelectedItems([]);
        dispatch(fetchStocksAction());
    }

    const isDateFuture = (current) => {
        return current && current.valueOf() > Date.now();
    }

    return (
        <Card loading={categoriesState.loading}>
            <PageHeader onBack={() => window.history.back()} title="Item bought form" subTitle="Enter bought informations" />
            <Row>
                <Col span={8}>
                    <h5>Select items </h5>
                    <Input placeholder="search item " className="my-4" onChange={onSearch} />

                    <Collapse accordion defaultActiveKey={searchedCategories[0] ? searchedCategories[0].id : 1}>
                        {
                            searchedCategories.map(category =>
                                <Panel header={category.name} key={category.id}>
                                    <Table dataSource={category.items} title={null} showHeader={false} rowKey="id" size="small" columns={itemsColumns} />
                                    {/* {
                                        category.items && category.items.map(item => <Checkbox key={item.id}>{item.name}</Checkbox>)
                                    } */}
                                </Panel>)
                        }
                    </Collapse>
                </Col>
                <Col span={15} offset={1}>
                    <div className="text-center">
                        <h5>Selected items</h5>

                    </div>
                    {
                        selectedItems.length == 0 ? <div className="text-center">No items selected. Please check items to save</div> :
                            <Form form={form} onFinish={onSubmit} {...formLayout}>
                                {selectedItems.map(item => <Form.Item key={item.id} label={item.name}>
                                    <Input.Group compact>
                                        <Form.Item
                                            name={[`${item.id}`, `quantity`]}
                                            noStyle
                                            rules={[{ required: true, message: 'Quantity is required' }]}
                                        >
                                            <Input style={{ width: '20%' }} placeholder="Quantity" type="number" />

                                        </Form.Item>
                                        <Form.Item
                                            name={[`${item.id}`, `price`]}
                                            noStyle
                                            rules={[{ required: true, message: 'Price is required' }]}
                                        >
                                            <Input style={{ width: '40%' }} placeholder="Enter price here" type="number" step="any" addonAfter={<DollarOutlined />} />
                                        </Form.Item>
                                        <Form.Item
                                            name={[`${item.id}`, `min_sell_price`]}
                                            noStyle

                                            rules={[{ required: true, message: 'Min price to sell is required' },
                                            ]}
                                        >
                                            <Input style={{ width: '40%' }} min={form.getFieldValue(item.id) ? form.getFieldValue(item.id).price : 0} placeholder="Min sell price" type="number" step="any" addonAfter={<DollarOutlined />} />
                                        </Form.Item>
                                    </Input.Group>
                                </Form.Item>
                                )}
                                <Form.Item name="date" label="Date ">
                                    <DatePicker disabledDate={isDateFuture} defaultValue={moment()} />
                                </Form.Item>
                                <Form.Item {...formButtonLayout}>
                                    <Button htmlType="submit" type="primary">Save buying information</Button>
                                </Form.Item>
                            </Form>
                    }
                </Col>
            </Row>
        </Card>
    )
}

export default NewBuy
