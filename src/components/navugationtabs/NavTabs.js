import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {
    MemoryRouter,
    Route,
    Routes,
    Link,
    matchPath,
    useLocation,
} from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import HappyWash from '../happywash/HappyWash'
import HappyWash_MultiMachine from '../happywash_mult/Happywash_MultiMashine';
import DIY_HappyWash_Mult from '../diy_happywash_mult/DIY_Happywash_Mult';
import DIY_HappyWash from '../diy_happywash/DIY_HappyWash';
import Fuel from '../fuel/Fuel'
import "./NavTabs.css";

function Router(props) {
    const { children } = props;
    if (typeof window === 'undefined') {
        return <StaticRouter location="/happywash">{children}</StaticRouter>;
    }

    return (
        <MemoryRouter initialEntries={['/happywash']} initialIndex={0}>
            {children}
        </MemoryRouter>
    );
}

Router.propTypes = {
    children: PropTypes.node,
};

function useRouteMatch(patterns) {
    const { pathname } = useLocation();

    for (let i = 0; i < patterns.length; i += 1) {
        const pattern = patterns[i];
        const possibleMatch = matchPath(pattern, pathname);
        if (possibleMatch !== null) {
            return possibleMatch;
        }
    }

    return null;
}

function MyTabs() {
    // You need to provide the routes in descendant order.
    // This means that if you have nested routes like:
    // users, users/new, users/edit.
    // Then the order should be ['users/add', 'users/edit', 'users'].
    const routeMatch = useRouteMatch(['/happywash', '/fuel', '/happywash', '/happywashdiy', '/happywashmul']);
    const currentTab = routeMatch?.pattern?.path;

    return (
        <Tabs value={currentTab} centered>
            <Tab label={<span className={'tab'}>HAPPY WASH</span>} value="/happywash" to="/happywash" component={Link} />
            <Tab label={<span className={'tab'}>HW DIY</span>} value="/happywashdiy" to="/happywashdiy" component={Link} />
            <Tab label={<span className={'tab'}>FUEL</span>} value="/fuel" to="/fuel" component={Link} />
            <Tab label={<span className={'tab'}>HAPPY WASH (MULTIPLE)</span>} value="/happywashmul" to="/happywashmul" component={Link} />
            <Tab label={<span className={'tab'}>HW DIY(MULTIPLE)</span>} value="/happywashdiymul" to="/happywashdiymul" component={Link} />
        </Tabs>
    );
}

function CurrentRoute() {
    const location = useLocation();
    return (

        <div>
            {location.pathname === "/happywash" && <HappyWash /> }
            {location.pathname === "/fuel" && <Fuel /> }
            {location.pathname === "/happywashmul" && <HappyWash_MultiMachine /> }
            {location.pathname === "/happywashdiy" && <DIY_HappyWash /> }
            {location.pathname === "/happywashdiymul" && <DIY_HappyWash_Mult /> }
        </div>
    )
}

export default function TabsRouter() {
    return (
        <Router>
            <Box sx={{ width: '100%' }}>
            <MyTabs />
                <Routes>
                    <Route path="*" element={<CurrentRoute />} />
                </Routes>
            </Box>
        </Router>
    );
}