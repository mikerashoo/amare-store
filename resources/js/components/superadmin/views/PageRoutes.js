import React from 'react'
import { Route, Switch } from 'react-router'
import { Item, Users, NewUser, Categories, Stocks } from '../pages'

function PageRoutes() {
    return ( 
            <Switch>
                <Route component={Users} path="/superadmin/users" />
                <Route component={NewUser} path="/superadmin/add_user" />
                <Route component={Item} path="/superadmin/category/:id" />
                <Route component={Categories} path="/superadmin/categories" /> 
                <Route component={Stocks} path="/superadmin/stocks" />
                <Route component={Users} path="/superadmin" />

            </Switch> 
    )
}

export default PageRoutes
