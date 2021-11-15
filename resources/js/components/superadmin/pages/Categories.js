import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategoryAction, fetchItemCategoriesAction } from '../actions/categoryActions';
import { fetchUnitsAction } from '../actions/unitActions';
import { Button, Col, PageHeader, Row, Table, Popconfirm } from "antd";
import { DeleteOutlined, DeleteRowOutlined } from "@ant-design/icons";
import Units from '../views/Units';
import NewItemCategory from '../views/NewItemCategory';
import { Link, NavLink } from 'react-router-dom';

function Categories() {
    const categories = useSelector(state => state.categories);
    const units = useSelector(state => state.units);

    const dispatch = useDispatch();

    const category_columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (c, category) => <>
                <Popconfirm title="Are you sure you want to remove?" okText="Yes remove!" onConfirm={() => deleteCategory(category)}>
                    <Button danger type="text" size="small" className="mx-3"><DeleteOutlined /></Button>
                </Popconfirm>
                <Link
                    to={
                        {
                            pathname: '/category_items',
                            state: {
                                category_id: category.id
                            }
                        }
                    } >{category.name} </Link> </>
        },
        {
            title: 'Measurements',
            dataIndex: 'unit',
            render: (category, c) => <p>{category ? category.name : '-'}</p>
        },

    ]

    const deleteCategory = category => {
        dispatch(deleteCategoryAction(category));
    }

    useEffect(() => {
        dispatch(fetchItemCategoriesAction());
        dispatch(fetchUnitsAction());
    }, [dispatch]);

    return (
        <div>
            <PageHeader title="Item Categories" />
            <Row gutter={[12, 12]}>
                <Col span={16}>
                    <Table columns={category_columns} loading={categories.loading} dataSource={categories.data} rowKey="id" size="small" />
                </Col>
                <Col span={8}>
                    <NewItemCategory units={units} categories={categories} />
                    <Units units={units} />
                </Col>
            </Row>

        </div>
    )
}

export default Categories
