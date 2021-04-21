import React, { Fragment } from 'react';
import Menu from 'main/sidebar-menu';
import PropTypes from 'prop-types';
import Notification from 'main/notifications';
import TitleActions from 'actions/title';
import {
    withActions,
    withSettings,
    withRoute,
    TopNavbar,
    Sidebar,
    SidebarContainer,
} from 'components';

import './app.scss';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarActive: false,
        };
    }

    handleSidebarToggle = () => {
        this.setState({ sidebarActive: !this.state.sidebarActive });
    };

    render() {
        const { route } = this.props;
        const RouteComponent = route.handler.component;

        if (route.handler.isSimple)
            return this.renderSimple(RouteComponent, route.handler.props);

        return this.renderFull(RouteComponent, route.handler.props);
    }

    renderFull(Component, props) {
        const { menu, settings, title } = this.props;
        const { sidebarActive } = this.state;
        const { route } = this.props;

        const mainMenu = new Map(menu.get('main'));
        const navMenu = new Map([]);

        // we add the normal "nav" menu entries...
        menu.get('nav').forEach((v, k) => navMenu.set(k, v));

        const content = (
            <div className="bulma-container">
                <Component {...props} route={route} />
            </div>
        );
        const sidebar = (
            <Sidebar
                active={sidebarActive}
                collapsed={true}
                mainMenu={mainMenu}
                navMenu={navMenu}
            >
                <Menu menu={mainMenu} onToggle={this.handleSidebarToggle} />
                <Menu
                    menu={navMenu}
                    onToggle={this.handleSidebarToggle}
                    mobileOnly
                />
            </Sidebar>
        );
        return (
            <Fragment>
                <Notification />
                <TopNavbar
                    active={sidebarActive}
                    menu={navMenu}
                    settings={settings}
                    title={title}
                    onToggle={this.handleSidebarToggle}
                />
                <SidebarContainer
                    active={true}
                    sidebar={sidebar}
                    content={content}
                />
            </Fragment>
        );
    }

    renderSimple(Component, props) {
        const { route, settings } = this.props;
        return (
            <React.Fragment>
                <Component {...props} route={route} settings={settings} />
            </React.Fragment>
        );
    }
}

App.propTypes = {
    menu: PropTypes.shape({
        get: PropTypes.func.isRequired,
    }).isRequired,
    route: PropTypes.shape({
        component: PropTypes.any,
        props: PropTypes.object,
        title: PropTypes.string,
    }).isRequired,
    settings: PropTypes.shape({
        t: PropTypes.func.isRequired,
    }).isRequired,
};

export default withSettings(withActions(withRoute(App), [TitleActions]));
