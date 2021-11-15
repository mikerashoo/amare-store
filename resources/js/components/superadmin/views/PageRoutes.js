import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router'
import { Item, Users, NewUser, Categories, Stocks, ItemTransactions, CategoryItems } from '../pages'
function PageRoutes() {
    let { path, url } = useRouteMatch();
    return (
        <Switch>
            <Route component={Users} path="/users" />
            <Route component={NewUser} path="/add_user" />
            <Route component={CategoryItems} path="/category_items" />
            <Route component={Categories} path="/categories" />
            <Route component={Stocks} path="/stocks" />
            <Route path={'/item_transactions'}>
                <ItemTransactions />
            </Route>
            <Route component={Users} path="/" />
        </Switch>
    )
}

export default PageRoutes
