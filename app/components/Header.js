import React from 'react';
import { Nav, Navbar, NavItem, Header, Brand } from 'react-bootstrap';
import AuthStore from '../stores/AuthStore';
import AuthActions from '../actions/AuthActions';


class HeaderComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      authenticated: AuthStore.isAuthenticated()
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    AuthStore.addChangeListener(this.onChange);
  }

  onChange() {
    this.setState({authenticated: AuthStore.isAuthenticated()})
  }

	login() {
    this.props.history.pushState(null, '/login');
  }

  logout() {
		AuthActions.logUserOut();
    this.props.history.pushState(null, '/');
  }

	render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Features</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          { !this.state.authenticated ? (
            <NavItem onClick={this.login}>Login</NavItem>
          ) : (
            <NavItem onClick={this.logout}>Logout</NavItem>
          )}
        </Nav>
      </Navbar>
    );
  }
}

export default HeaderComponent;

