import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Button, Input, Form } from "antd";
import { saveItemAction } from '../../actions/itemActions';


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
function NewItemModal(props) {

    let category_id = props.category.id;
    const _category = props.category;
    const dispatch = useDispatch();
    const [image, setImage] = useState();

    const [form] = Form.useForm();
    const saveItem = item => {
        let fd = new FormData();
        fd.append('image', image);
        fd.append('name', item.name);
        fd.append('code', item.code);
        fd.append('price', item.price);
        fd.append('category_id', category_id);
        fd.append('threshold', item.threshold ? item.threshold : 0);
        _category.item_properties.forEach(pro => {

            if (form.getFieldValue(pro.id) != undefined) {
                fd.append(pro.id, form.getFieldValue(pro.id));
            }

        });
        dispatch(saveItemAction(fd));
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
        <div>
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

                <Form.Item label="Image" name="image" >
                    <Input type="file" onChange={handleFileInputChange} />
                </Form.Item>

                <Form.Item {...buttonCols}>
                    <Button type="primary" htmlType="submit" style={{ marginTop: 20 }}>Save new item</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default NewItemModal
