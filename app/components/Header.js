import React from 'react';
import { Nav, Navbar, NavItem, Header, Brand } from 'react-bootstrap';

class HeaderComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      authenticated: false
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

	login() {
		// AuthActions.logUserIn();
		this.setState({authenticated: true});
  }

  logout() {
		// AuthActions.logUserOut();
    this.setState({authenticated: false});
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

