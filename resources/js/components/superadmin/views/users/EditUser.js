import React, { useEffect } from 'react'
import { Form, Input, Select, Button } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { saveEditUserAction } from '../../actions/userActions'
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
};

const tailLayout = {
    wrapperCol: { offset: 6, span: 12 },
};
function EditUser(props) {
    const [form, setValue] = Form.useForm();
    const dispatch = useDispatch();
    const onRoleChange = value => {
        form.setFieldsValue({ role: value });
    };

    useEffect(() => {
        const _user = props.user;
        form.setFieldsValue({ id: _user.id });
        form.setFieldsValue({ role: _user.role });
        form.setFieldsValue({ name: _user.name });
        form.setFieldsValue({ user_name: _user.user_name });

    }, [props.user])

    const users = useSelector(state => state.users)
    const onSubmit = (user) => {
        dispatch(saveEditUserAction(user));
        form.resetFields();
    }

    const user = props.user;
    return (
        <div>
            <Form {...layout} form={form} onFinish={onSubmit}>
                <Form.Item name="id" hidden={true}>

                    <Input type="hidden" value={user.id} />
                </Form.Item>

                <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                    <Input type="text" placeholder="Enter name here" />
                </Form.Item>
                <Form.Item label="User Name" name="user_name" rules={[{ required: true }]}>
                    <Input type="text" placeholder="Enter username here" />
                </Form.Item>
                <Form.Item label="Role" name="role" rules={[{ required: true }]}>
                    <Select placeholder="Please select role" onChange={onRoleChange}>
                        <Select.Option value="admin">Admin</Select.Option>
                        <Select.Option value="keeper">Keeper</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit"> Update User </Button>
                </Form.Item>
            </Form>
        </div>
    )
}


export default EditUser

