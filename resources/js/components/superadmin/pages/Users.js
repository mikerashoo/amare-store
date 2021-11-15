import React, { useEffect } from 'react'
import { PageHeader, Button, Divider, Spin, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersAction } from '../actions/userActions';
import { NavLink } from 'react-router-dom';

function Users() {
    const users = useSelector(state => state.users)
    const dispatch = useDispatch();
    console.log(users);

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
            title: 'Role',
            dataIndex: 'role',
        },
        {
            title: 'Actions',
            render: () => <>
                <Button type="default"> Edit</Button>
                <Button type="danger"> Delete</Button>
            </>
        }
    ]
    return (
        <Spin spinning={users.loading}>
            <PageHeader title="Users" bordered extra={[
                <NavLink to="/add_user" key={1}>
                    <Button type="primary" key="1">Add New User</Button>
                </NavLink>
            ]} />
            <Divider />

            <Table columns={columns} dataSource={users.data} rowKey="id" />
        </Spin>
    )
}

export default Users
