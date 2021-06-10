import React from 'react'
import { PageHeader, Form, Input, Select, Button, Alert } from "antd"; 
import { saveNewUserToDBAction } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 12 },
};

const tailLayout = {
    wrapperCol: { offset: 4, span: 12 },
};
function NewUser() {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const onRoleChange = value => {
        form.setFieldsValue({ role: value });
    };
    
    const users = useSelector(state => state.users)
    const onSubmit = (user) => {
        dispatch(saveNewUserToDBAction(user));
    }  
    
    return (
        <div>
        <PageHeader onBack={()=>window.event.onBack()} title="New User Form"/>
        {
            users.message && <Alert message={users.message}/>
        }{
            users.error && <Alert message={users.error} type="error"/>
        }
        <Form {...layout} form={form} onFinish={onSubmit}>
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
        <Input type="text" placeholder="Enter name here"/>
        </Form.Item>
        <Form.Item label="User Name" name="user_name" rules={[{ required: true }]}>
        <Input type="text" placeholder="Enter username here"/>
        </Form.Item>
        <Form.Item label="Role" name="role" rules={[{ required: true }]}>
        <Select placeholder="Please select role" onChange={onRoleChange}>
        <Select.Option value="admin">Admin</Select.Option>
        <Select.Option value="keeper">Keeper</Select.Option>
        </Select>
        </Form.Item> 
        <Form.Item {...tailLayout}>        
        <Button type="primary" htmlType="submit"> Submit </Button>
        </Form.Item>
        </Form>
        </div>
        )
    }
    
    
    export default NewUser
    
    