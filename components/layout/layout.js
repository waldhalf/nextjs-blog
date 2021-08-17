// REACT
import { Fragment } from 'react';

// OWN
import MainNavigation from './main-navigation';


function Layout(props) {
    return <Fragment>
        <MainNavigation />
        <main>{props.children}</main>
    </Fragment>
}
export default Layout;