import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { editItemAction } from '../../actions/itemActions';
import { Button, Input, Form, Skeleton } from "antd";

const labels = {
    wrapperCol: {
        span: 18
    },
    labelCol: {
        span: 6
    }
}

const buttonCols = {
    wrapperCol: { span: 16, offset: 6 },
}

function EditItemModal(props) {

    let category_id = props.category.id;
    const _category = props.category;
    const item = props.item;
    const dispatch = useDispatch();
    const [image, setImage] = useState();
    const categoryState = useSelector(state => state.category);

    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({ 'name': item.name });
        form.setFieldsValue({ 'code': item.code });
        form.setFieldsValue({ 'threshold': item.threshold });
        form.setFieldsValue({ 'price': item.price });
        item.property_values.forEach(property => {
            form.setFieldsValue({ [property.property_id]: property.value });
        });
    }, [item]);

    const saveItem = formItem => {
        let fd = new FormData();
        fd.append('image', image);
        fd.append('id', props.item.id);
        fd.append('name', formItem.name);
        fd.append('code', formItem.code);
        fd.append('price', formItem.price);
        fd.append('category_id', category_id);
        fd.append('threshold', formItem.threshold ? formItem.threshold : 0);
        _category.item_properties.forEach(pro => {

            if (form.getFieldValue(pro.id) != undefined) {
                fd.append(pro.id, form.getFieldValue(pro.id));
            }

        });
        dispatch(editItemAction(fd));
    };

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
    return (
        <Skeleton loading={categoryState.loading}>
            <Form encType="multipart/form-data" {...labels} form={form} onFinish={saveItem}>
                <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                    <Input placeholder="Enter name here" />
                </Form.Item>
                <Form.Item label="Code" name="code">
                    <Input placeholder="Enter code here" />
                </Form.Item>
                <Form.Item label="Price" name="price">
                    <Input placeholder="Enter price here" type="number" step="any" />
                </Form.Item>

                <Form.Item label="Warning" name="threshold">
                    <Input placeholder="Enter min quantity to warn" type="number" />
                </Form.Item>
                {
                    _category.item_properties.map(pro => <Form.Item key={pro.id} label={pro.name} name={pro.id}>
                        <Input addonAfter={pro.unit ? pro.unit.name : '!'} placeholder={`Enter ${pro.name}`} />
                    </Form.Item>)
                }

                <Form.Item label="Image" >
                    <Input type="file" onChange={(e) => handleFileInputChange(e)} />
                </Form.Item>

                <Form.Item {...buttonCols}>
                    <Button type="primary" htmlType="submit" style={{ marginTop: 20 }}>Update item informations</Button>
                </Form.Item>
            </Form>
        </Skeleton>
    )
}

export default EditItemModal
