// react
import React from 'react';
import { Link, Route, useLocation } from 'react-router-dom';
// pages
import Standard from './pages/Standard';
import Custom from './pages/Custom';
// bootstrap
import { ToggleButtonGroup } from 'react-bootstrap';

export default function App() {
    let pathname = useLocation().pathname;
    return (
        <React.Fragment>
            <aside style={{ marginTop: '1rem' }}>
                <ToggleButtonGroup id="routing" type="radio" name="routing">
                    <button
                        size="sm"
                        className={!pathname.includes('custom') ? 'btn btn-primary active' : 'btn btn-primary'}
                    >
                        <Link name="route" to={'/'}>
                            Standard
                        </Link>
                    </button>
                    <button
                        size="sm"
                        className={pathname.includes('custom') ? 'btn btn-primary active' : 'btn btn-primary'}
                    >
                        <Link name="route" to={'/custom'}>
                            Custom
                        </Link>
                    </button>
                </ToggleButtonGroup>
            </aside>

            <main>
                <h1 style={{ margin: '2rem 0px' }}>Alliance Builders</h1>
                <Route exact path="/" component={Standard}></Route>
                <Route path="/custom" component={Custom}></Route>
            </main>
        </React.Fragment>
    );
}
