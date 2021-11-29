import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategoryAction, fetchItemCategoriesAction } from '../actions/categoryActions';
import { fetchItemPropertiesAction, fetchUnitsAction } from '../actions/unitActions';
import { Button, Col, PageHeader, Row, Table, Popconfirm, Tabs, Card } from "antd";
import { DeleteOutlined, DeleteRowOutlined } from "@ant-design/icons";
import Units from '../views/Units';
import ItemProperty from '../views/ItemProperty';
import NewItemCategory from '../views/NewItemCategory';
import { Link, NavLink } from 'react-router-dom';

const { TabPane } = Tabs;
function Categories() {
    const categories = useSelector(state => state.categories);
    const units = useSelector(state => state.units);

    const dispatch = useDispatch();


    const deleteCategory = category => {
        dispatch(deleteCategoryAction(category));
    }

    useEffect(() => {
        dispatch(fetchItemCategoriesAction());
        dispatch(fetchUnitsAction());
        dispatch(fetchItemPropertiesAction());
    }, [dispatch]);


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
                                category: category
                            }
                        }
                    } >{category.name} </Link> </>
        },
        {
            title: "code",
            dataIndex: 'code'
        }
    ]

    return (
        <Card>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Category management" tabKey="sell" key="1">
                    <PageHeader title="Item Categories" />
                    <Row gutter={[12, 12]}>
                        <Col span={16}>
                            <Table columns={category_columns} loading={categories.loading} dataSource={categories.data} rowKey="id" size="small" />
                        </Col>
                        <Col span={8}>
                            <NewItemCategory units={units} categories={categories} />
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tab="Units and properties" tabKey="items" key="2">
                    <Row>
                        <Col span={12}>
                            <ItemProperty units={units} />
                        </Col>
                        <Col span={10} offset={1}>

                            <Units units={units} />

                        </Col>
                    </Row>

                </TabPane>
            </Tabs>


        </Card>
    )
}

export default Categories
