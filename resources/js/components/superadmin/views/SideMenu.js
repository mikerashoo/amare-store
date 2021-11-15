import React from 'react'
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom'
import { SideMenuItem, SideSubMenuItem } from '../admin-styled'
function SideMenu() {
    return (
        <div>
            <Menu mode="inline" defaultOpenKeys={['contents', 'stocks', 'reports']} style={{ height: '100vh', backgroundColor: "#f5f5f5" }}>
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
                    <SideMenuItem disabled>Daily</SideMenuItem>
                    <SideMenuItem disabled>Monthly</SideMenuItem>
                </SideSubMenuItem>
            </Menu>
        </div>
    )
}

export default SideMenu

