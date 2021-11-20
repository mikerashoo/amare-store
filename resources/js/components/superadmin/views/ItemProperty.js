import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Card, Button, Input, List, Form, Select, Divider, Popconfirm } from "antd";
import { saveItemPropertyAction, deleteItemPropertyAction } from '../actions/unitActions';
import { DeleteOutlined } from '@ant-design/icons'
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

function ItemProperties(props) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const handleDelete = (item_property) => {
        dispatch(deleteItemPropertyAction(item_property));
    }

    const onSubmit = (item_property) => {
        dispatch(saveItemPropertyAction(item_property));
        form.resetFields();
    }

    return (
        <Card loading={props.units.loading} bordered hoverable title="Manage properties" style={{ marginTop: 20 }}>
            <div className="bg-gray">
                <List
                    dataSource={props.units.item_properties}

                    renderItem={property => (
                        <List.Item actions={[
                            <Popconfirm onConfirm={() => handleDelete(property)} title="Are you sure you want to remove">
                                <Button size="small" ><DeleteOutlined /></Button>
                            </Popconfirm>
                        ]}>
                            <List.Item.Meta
                                title={property.name}
                                description={`Unit of measurement ${property.unit ? property.unit.name : 'unkown'}`}

                            />
                        </List.Item>
                    )} />
                <Divider />
                <Form onFinish={onSubmit} {...layout} form={form}>
                    <Form.Item label="Name " name="name" rules={[{ required: true }]}>
                        <Input placeholder="enter name here" />
                    </Form.Item>
                    <Form.Item label="Measurement" name="unit_id">
                        <Select placeholder="Select unit of measurement">
                            {
                                props.units.data.map(_unit => <Select.Option key={_unit.id} value={_unit.id}>{_unit.name}</Select.Option>)
                            }

                        </Select>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>

                </Form>
            </div>
        </Card>
    )
}

export default ItemProperties;
