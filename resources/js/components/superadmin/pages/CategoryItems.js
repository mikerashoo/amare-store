import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteItemAction, editItemAction, fetchItemAction, hideItemEditModalAction, hideNewItemModalAction, saveItemAction, showItemEditModalAction, showNewItemModalAction } from '../actions/itemActions';
import { Button, Card, Col, Input, PageHeader, Row, Table, Form, Modal, Popconfirm, Avatar, Popover } from "antd";
import { BASE_URL } from '../constants/api'
import { DeleteOutlined, EditOutlined, InfoCircleOutlined, InfoOutlined } from '@ant-design/icons';
import NewItemModal from '../views/items/NewItemModal';
import EditItemModal from '../views/items/EditItemModal';

function CategoryItems(props) {

    let category_id = props.location.state.category.id;
    const _category = props.location.state.category;
    const categoryState = useSelector(state => state.category);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchItemAction(category_id));
    }, [dispatch]);


    const onChange = evt => {
        switch (evt.target.name) {
            case 'name':
                setName(evt.target.value);
                break;
            case 'price':
                setPrice(evt.target.value);
                break;
            case 'edit_name':
                setEditName(evt.target.value);
                break;
            case 'edit_price':
                setEditPrice(evt.target.value);
                break;
            default:
                break;
        }
    }

    const onRemoveItem = (item) => {
        dispatch(deleteItemAction(item));
    }

    const itemProperty = (item) => {
        return <> {
            item.property_values.map(pro => {
                let _pro = item.properties.find(_p => _p.id == pro.property_id);
                return <p key={pro.id}>{_pro.name} : <b>{pro.value ? pro.value + " " + _pro.unit?.name : "-"} </b></p>
            })
        } </>
    }

    const itemColumns = [
        {
            title: '#',
            dataIndex: 'id'
        },
        {
            title: 'name',
            dataIndex: 'name',
            render: (name, item) => <><Avatar src={BASE_URL + "images/items/" + item.logo_name} style={{ marginRight: 10 }} /> {name}</>
        },
        {
            title: "Code",
            dataIndex: 'code'
        },
        {
            title: 'Price',
            dataIndex: 'price'
        },
        {
            title: 'Remaining',
            dataIndex: 'remaining'
        },
        {
            title: 'Warning',
            dataIndex: 'threshold'
        },

        {
            render: (item, i) => <>
                <Popover title={`${item.name} properties`} content={() => itemProperty(item)}>
                    <Button type="text"><InfoCircleOutlined /> </Button>
                </Popover>

                <Modal title={item.name} closable destroyOnClose visible={categoryState.edit_item_id == item.id}
                    onCancel={() => dispatch(hideItemEditModalAction())} footer={null} >

                    <EditItemModal category={_category} item={item} />

                </Modal>

                <Button type="text" onClick={() => dispatch(showItemEditModalAction(item.id))}><EditOutlined /> </Button>
                {
                    item.status ?
                        <Popconfirm title="Are you sure you want to deactivate?" onConfirm={() => onRemoveItem(item)} okText="Yes confirm!">
                            <Button type="text" style={{ color: 'red' }}><DeleteOutlined /></Button>
                        </Popconfirm>
                        :
                        <Popconfirm title="Are you sure you want to activate?" onConfirm={() => onRemoveItem(item)} okText="Yes confirm!">
                            <Button type="text" style={{ color: 'white' }}>Activate</Button>
                        </Popconfirm>

                }
            </>
        }
    ]

    const onAddNewItem = () => {
        dispatch(showNewItemModalAction());
    }

    return (
        <div>
            <PageHeader
                title={categoryState.data ? `${categoryState.data.name}` : 'Title'} onBack={() => window.history.back()}
                extra={[
                    <Button key={1} onClick={onAddNewItem}>Add new item</Button>
                ]}
            />
            {
                categoryState.data && <Table dataSource={categoryState.data.items} columns={itemColumns} rowKey="id" />
            }
            <Modal closable destroyOnClose onCancel={() => dispatch(hideNewItemModalAction())} title={`New ${_category.name} item`} footer={null} visible={categoryState.new_item_modal}>
                <NewItemModal category={_category} />
            </Modal>

        </div>
    )
}

export default CategoryItems
