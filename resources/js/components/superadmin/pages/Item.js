import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteItemAction, editItemAction, fetchItemAction, saveItemAction } from '../actions/itemActions';
import { Button, Card, Col, Input, PageHeader, Row, Table, Form, Modal,  Popconfirm, Avatar } from "antd";
import {BASE_URL} from '../constants/api'

function Item(props) { 
    
    let category_id = props.match.params.id;
    const category = useSelector(state => state.category);
    const dispatch = useDispatch();
    const [visibleEditModalId, setVisibleEditModalId] = useState();
    const [editName, setEditName] = useState('');
    const [editPrice, setEditPrice] = useState(0.0);
    const [editImage, setEditImage] = useState();
    const [name, setName] = useState('');
    const [price, setPrice] = useState();
    const [image, setImage] = useState();
    useEffect(() => {
        dispatch(fetchItemAction(category_id));
    }, [dispatch]);  
   
    
    const onChange = evt => {
        switch(evt.target.name){
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
    
    const onPriceChange = evt => {  
        let id = evt.target.name;
        let value = evt.target.value;
        setPrice(value); 
    }
    
    const onSubmit = () => {
        let fd = new FormData();
        fd.append('image', image);
        fd.append('name', name);
        fd.append('category_id', category_id);
        fd.append('price', price); 
        dispatch(saveItemAction(fd));
    }
    
    const onRemoveItem = (item) => {
        dispatch(deleteItemAction(item));
    }
    
    const handleFileInputChange = (e) =>{        
        let files = e.target.files || e.dataTransfer.files;
        if (files.length){ 
            if(e.target.name == 'edit_image'){
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
        if(editName == ''){
            _name = item.name;
        }
        else{
            _name = editName;
        }
        if(editPrice == 0.0){
            _price = item.price;
        } 
        else{
            _price = editPrice;
        }
 

        let edit_fd = new FormData();
        edit_fd.append('item_id', item.id); 
        if(editImage){
            edit_fd.append('image', editImage);

        }
        edit_fd.append('name', _name); 
        edit_fd.append('price', _price);
        
        dispatch(editItemAction(edit_fd));
        setVisibleEditModalId(null);
    }
    
    
    const itemColumns = [
        {
            title: '#',
            dataIndex: 'id'
        },
        {
            title: 'name',
            dataIndex: 'name',
            render: (name, item) => <><Avatar src={BASE_URL + "images/items/" + item.logo_name} style={{marginRight: 10}}/> {name}</>
        },
        {
            title: 'Price',
            dataIndex: 'price'
        },
        {
            render: (item, i) => <>
            <Modal title={item.name} visible={visibleEditModalId == item.id} 
            onCancel={() => setVisibleEditModalId(null)} 
            onOk={() => onEditOk(item)}> 
            
            <Form>
            <Form.Item label="ስም">
            <Input defaultValue={item.name} name="edit_name" onChange={onChange}/>
            </Form.Item>
            <Form.Item label="ዋጋ">
            <Input defaultValue={item.price} name="edit_price" onChange={onChange}/>
            </Form.Item>
            <Form.Item label="አርማ">
            <Input type="file" onChange={handleFileInputChange} name="edit_image"/>            
            </Form.Item>
            </Form>

            </Modal>

            <Button style={{backgroundColor: 'orange', color: 'white'}} onClick={() => setVisibleEditModalId(item.id)}>Edit</Button> 
            {
                item.status ?
            <Popconfirm title="Are you sure you want to deactivate?" onConfirm={() => onRemoveItem(item)} okText="Yes confirm!"><Button style={{backgroundColor: 'red', color: 'white'}}>Deactivate</Button></Popconfirm>
                 : 
                 <Popconfirm title="Are you sure you want to activate?" onConfirm={() => onRemoveItem(item)} okText="Yes confirm!"><Button style={{backgroundColor: 'green', color: 'white'}}>Activate</Button></Popconfirm>

            }
            </>
        }
    ] 
    
    
    return (
        <div> 
        <PageHeader title={category.data ? `${category.data.name}` : 'Title'} onBack={() => window.history.back()}/>
        <Row gutter={[16, 16]}>
        <Col span={16}>
        {
            category.data && <Table dataSource={category.data.items} columns={itemColumns} rowKey="id" />
        }
        </Col>
        
        <Col span={8}>
        <Card hoverable title="New Item Form" loading={category.data?.loading} bordered bodyStyle={{backgroundColor: '#eee'}}>
        <Form encType="multipart/form-data">
        <Form.Item>
        <Input addonBefore="name" name="name" placeholder="Enter name here" onChange={onChange}/>
        </Form.Item>
        {
            category.data &&
            <Form.Item label="">
            <Input placeholder="0.00 birr" name={category.data.unit.name} addonBefore={category.data.unit.name + ' price'} onChange={onPriceChange}/>
            </Form.Item>
            
        }
        <Input type="file" onChange={handleFileInputChange} name="Pick image"/>
        
        <Button type="primary" onClick={onSubmit} style={{marginTop: 20}}>Save new item</Button>
        </Form>
        </Card>
        </Col>
        
        </Row>
        </div>
        )
    }
    
    export default Item
    