import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Card, Button, Input, List, Popconfirm } from "antd";
import { saveUnitAction, deleteUnitAction } from '../actions/unitActions';
import { DeleteOutlined } from '@ant-design/icons';


function Units(props) {
    const dispatch = useDispatch();
    const [unit, setUnit] = useState('');


    const onChange = (ev) => {
        setUnit(ev.target.value);
    }

    const handleOnPressEnter = () => {
        dispatch(saveUnitAction(unit));
    }

    const handleDelete = (unit) => {
        dispatch(deleteUnitAction(unit));
    }



    return (
        <Card loading={props.units.loading} bordered hoverable title="Manage Units" style={{ marginTop: 20 }}>
            <div className="bg-gray">
                <List
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={props.units.data}

                    renderItem={unit => (
                        <List.Item>
                            {unit.name} <Popconfirm onConfirm={() => handleDelete(unit)} title="Are you sure you want to remove">
                                <Button size="small" ><DeleteOutlined /></Button>
                            </Popconfirm>
                        </List.Item>
                    )} />
                <Input placeholder="Enter new unit here" onPressEnter={handleOnPressEnter} onChange={onChange} />
            </div>
        </Card>
    )
}

export default Units
