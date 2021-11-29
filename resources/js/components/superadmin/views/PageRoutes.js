import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router'
import { Item, Users, NewUser, Categories, Stocks, ItemTransactions, CategoryItems, Home, StockReports, BuyReports, SellReports } from '../pages'
import NewBuy from '../pages/NewBuy';
function PageRoutes() {
    let { path, url } = useRouteMatch();
    return (
        <Switch>
            <Route component={Users} path="/users" />
            <Route component={NewUser} path="/add_user" />
            <Route component={CategoryItems} path="/category_items" />
            <Route component={Categories} path="/categories" />
            <Route component={Stocks} path="/stocks" />
            <Route component={NewBuy} path="/new_buy" />
            <Route component={StockReports} path="/stock_reports" />
            <Route component={BuyReports} path="/buy_reports" />
            <Route component={SellReports} path="/sell_reports" />
            <Route path={'/item_transactions'}>
                <ItemTransactions />
            </Route>
            <Route component={Home} path="/" />
        </Switch>
    )
}

export default PageRoutes
