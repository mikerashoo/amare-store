import React, { useEffect, useState } from 'react'
import { PageHeader, Button, Divider, Spin, Table, Popconfirm, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserAction, fetchUsersAction, hideEditUserAction, hideEditUserSuccessAction, s, showEditUsersAction, showEditUserSuccessAction } from '../actions/userActions';
import { NavLink } from 'react-router-dom';
import { DeleteOutlined, EditOutlined, UserSwitchOutlined } from '@ant-design/icons';
import EditUser from '../views/users/EditUser';

function Users() {
    const users_state = useSelector(state => state.users)
    const dispatch = useDispatch();
    const [visibleEditModalId, setVisibleEditModalId] = useState(0);
    useEffect(() => {
        dispatch(fetchUsersAction())
    }, [dispatch])


    const columns = [
        {
            title: '#',
            dataIndex: 'id',

        },
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'User name',
            dataIndex: 'user_name'
        },
        {
            title: 'Role',
            dataIndex: 'role',
        },
        {
            title: 'Actions',
            render: (user) => user.role == "super_admin" ? <></> : <>
                <Modal title={user.name} visible={users_state.edit_modal_id == user.id}
                    onCancel={() => dispatch(hideEditUserAction())}
                    onOk={() => onEditOk(user)}
                    footer={null}
                >

                    <EditUser user={user} />
                </Modal>
                <Button type="text" title="Edit user" onClick={() => dispatch(showEditUsersAction(user.id))}> <EditOutlined /></Button>
                <Popconfirm title={`Are you sure you want to ${user.is_active == 0 ? 'activate' : 'delete'}?`} onConfirm={() => dispatch(deleteUserAction(user.id))} okText="Yes confirm!">
                    {user.is_active == 0 ? <Button type="text" title="Activate user" style={{ color: 'green' }}> <UserSwitchOutlined /> </Button> :
                        user.has_data ?
                            <Button type="text" style={{ color: 'red' }} title="Deactivate user"><UserSwitchOutlined /></Button>
                            :
                            <Button type="text" style={{ color: 'red' }} title="Delete user"><DeleteOutlined /></Button>
                    }
                </Popconfirm>
            </>
        }
    ]

    const onEditOk = user => { }
    return (
        <Spin spinning={users_state.loading}>
            <PageHeader title="Users" bordered extra={[
                <NavLink to="/add_user" key={1}>
                    <Button type="primary" key="1">Add New User</Button>
                </NavLink>
            ]} />
            <Divider />

            <Table columns={columns} dataSource={users_state.data} rowKey="id" />
        </Spin>
    )
}

export default Users
