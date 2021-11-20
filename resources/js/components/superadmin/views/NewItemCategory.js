import React from 'react'
import { Card, Form, Input, Button, Checkbox } from "antd";
import { useDispatch } from 'react-redux';
import { saveCategoryAction } from "../actions/categoryActions";
import { useForm } from 'antd/lib/form/Form';
function NewItemCategory(props) {
    const [form] = useForm();
    const dispatch = useDispatch();

    const onNameChange = (evt) => {
        setName(evt.target.value);
    }

    const handleOnSubmit = (category_data) => {
        dispatch(saveCategoryAction(category_data));
        console.log(category_data);
    }

    return (
        <Card bordered hoverable title="Add Category" loading={props.categories.loading} style={{ backgroundColor: 'whitesmoke' }}>
            <Form onFinish={handleOnSubmit} form={form}>
                <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                    <Input placeholder="Enter name here" onChange={onNameChange} />
                </Form.Item>
                <Form.Item label="Properties" name="properties">
                    <Checkbox.Group style={{ width: '100%' }}>
                        {
                            props.units?.item_properties.map(property => <Checkbox key={property.id} value={property.id}>{property.name}</Checkbox>)
                        }

                    </Checkbox.Group>

                </Form.Item>
                <Button type="primary" htmlType="submit" >Save Item Category</Button>
            </Form>
        </Card>
    )
}

export default NewItemCategory
