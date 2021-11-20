import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteItemAction, editItemAction, fetchItemAction, hideNewItemModalAction, saveItemAction, showNewItemModalAction } from '../actions/itemActions';
import { Button, Card, Col, Input, PageHeader, Row, Table, Form, Modal, Popconfirm, Avatar, Popover } from "antd";
import { BASE_URL } from '../constants/api'
import { DeleteOutlined, EditOutlined, InfoCircleOutlined, InfoOutlined } from '@ant-design/icons';
import NewItemModal from '../views/NewItemModal';

function CategoryItems(props) {

    let category_id = props.location.state.category.id;
    const _category = props.location.state.category;
    const categoryState = useSelector(state => state.category);
    const dispatch = useDispatch();
    const [visibleEditModalId, setVisibleEditModalId] = useState();
    const [editName, setEditName] = useState('');
    const [editPrice, setEditPrice] = useState(0.0);
    const [editImage, setEditImage] = useState();

    console.log(categoryState);


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

    const handleFileInputChange = (e) => {
        let files = e.target.files || e.dataTransfer.files;
        if (files.length) {
            if (e.target.name == 'edit_image') {
                setEditImage(files[0]);
                return;
            }
            setImage(files[0]);
            return;
        }
    }

    const onEditOk = (item) => {
        let _name = '';
        let _price = 0.0;
        if (editName == '') {
            _name = item.name;
        }
        else {
            _name = editName;
        }
        if (editPrice == 0.0) {
            _price = item.price;
        }
        else {
            _price = editPrice;
        }


        let edit_fd = new FormData();
        edit_fd.append('item_id', item.id);
        if (editImage) {
            edit_fd.append('image', editImage);

        }
        edit_fd.append('name', _name);
        edit_fd.append('price', _price);

        dispatch(editItemAction(edit_fd));
        setVisibleEditModalId(null);
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
            title: 'Price',
            dataIndex: 'price'
        },
        {
            title: 'Remaining',
            dataIndex: 'price'
        },

        {
            render: (item, i) => <>
                <Popover title={`${item.name} properties`} content={() => itemProperty(item)}>
                    <Button type="text"><InfoCircleOutlined /> </Button>

                </Popover>
                <Modal title={item.name} visible={visibleEditModalId == item.id}
                    onCancel={() => setVisibleEditModalId(null)}
                    onOk={() => onEditOk(item)}>

                    <Form>
                        <Form.Item label="Name">
                            <Input defaultValue={item.name} name="edit_name" onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="Price">
                            <Input defaultValue={item.price} name="edit_price" onChange={onChange} />
                        </Form.Item>
                        <Form.Item label="Image">
                            <Input type="file" onChange={handleFileInputChange} name="edit_image" />
                        </Form.Item>
                    </Form>

                </Modal>

                <Button type="text" onClick={() => setVisibleEditModalId(item.id)}><EditOutlined /> </Button>
                {
                    item.status ?
                        <Popconfirm title="Are you sure you want to deactivate?" onConfirm={() => onRemoveItem(item)} okText="Yes confirm!"><Button type="text" style={{ color: 'white' }}><DeleteOutlined /></Button></Popconfirm>
                        :
                        <Popconfirm title="Are you sure you want to activate?" onConfirm={() => onRemoveItem(item)} okText="Yes confirm!"><Button type="text" style={{ color: 'white' }}>Activate</Button></Popconfirm>

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
