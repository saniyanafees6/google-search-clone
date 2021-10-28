import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Results } from './'

const Routes = () => {
    return (
        <div className="py-4">
            <Switch>
                <Route exact path='/'><Redirect to='/search'/></Route>
                <Route exact path={ ['/search', '/images', '/videos'] }><Results /></Route>
            </Switch>
        </div>
    )
}

export default Routes
