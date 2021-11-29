import React from 'react'
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom'
import { SideMenuItem, SideSubMenuItem } from '../admin-styled'
function SideMenu() {
    return (
        <div>
            <Menu mode="inline" defaultOpenKeys={['contents', 'stocks', 'reports']} style={{ minHeight: '100%', backgroundColor: "#f3f6ff" }}>
                <SideSubMenuItem title="Content Management" key="contents">
                    <SideMenuItem key="users">
                        <NavLink to="/users"> Users </NavLink>
                    </SideMenuItem>
                    <SideMenuItem key="items">
                        <NavLink to="/categories"> Items </NavLink>
                    </SideMenuItem>

                </SideSubMenuItem>
                <SideSubMenuItem title="Manage Stock" key="stocks">
                    <SideMenuItem>
                        <NavLink to="/stocks"> Stocks </NavLink>
                    </SideMenuItem>

                </SideSubMenuItem>

                <SideSubMenuItem title="Reports" key="reports">
                    <SideMenuItem>
                        <NavLink to="/stock_reports"> Stock reports </NavLink>
                    </SideMenuItem>
                    <SideMenuItem>
                        <NavLink to="/sell_reports"> Sell reports </NavLink>
                    </SideMenuItem>
                    <SideMenuItem>
                        <NavLink to="/buy_reports"> Buy reports </NavLink>
                    </SideMenuItem>
                </SideSubMenuItem>
            </Menu>
        </div>
    )
}

export default SideMenu

