import React from 'react';
import {Link} from 'react-router';
import AuthStore from '../stores/AuthStore';
import AuthActions from '../actions/AuthActions';
import FieldGroup from '../containers/FieldGroup';
import { Col, Form, Button, FormGroup } from 'react-bootstrap';
import AlertComponent from '../containers/AlertContainer';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: [],
      alertVisible: true,
      size: 6,
      offset: 1
    };
    this.onChange = this.onChange.bind(this);
    this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
    this.handleAlertShow = this.handleAlertShow.bind(this);
    this.updateField = this.updateField.bind(this);
  }

  componentDidMount() {
    AuthStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    AuthStore.removeChangeListener(this.onChange);
  }

  onChange() {
    if (AuthStore.isAuthenticated()) {
      this.props.history.pushState(null, '/register')
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    AuthActions.logUserIn(this.state);
  }

  getValidationState(toBeChecked) {
    if (toBeChecked.length > 5) {
      return 'success';
    } else {
      return 'error';
    }
  };

  updateField(fieldName, event) {
    var obj = {};
    obj[fieldName] = event.target.value;
    this.setState(obj)
  };

  handleAlertDismiss() {
    this.setState({alertVisible: false});
  }

  handleAlertShow() {
    this.setState({alertVisible: true});
  }

  render() {
    var errorMessages = this.state.errors.map((error, i) => {
      return (
        <p key={i.toString()} > {error} </p>
      );
    });

    var alert = (function () {
      if (errorMessages.length > 0) {
        return (
          <AlertComponent
          handleAlertDismiss={this.handleAlertDismiss.bind(this)}
          errorMessages={errorMessages}
          handleAlertShow={this.handleAlertShow.bind(this)}
          alertVisible={this.state.alertVisible} />
        );
      }
    }).call(this);

    return (
      <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
        <FieldGroup
          validationState={this.getValidationState(this.state["username"])}
          fieldID='username'
          fieldLabel='Username'
          helpBlock='Username is required'
          isLabel={true}
          size={this.state.size}
          offset={this.state.offset}
          type='text'
          isHelpBlock={true}
          placeholder='username'
          isRequired={true}
          onChange={this.updateField.bind(this, 'username')}
        />
        <FieldGroup
          validationState={this.getValidationState(this.state["password"])}
          fieldID='password'
          fieldLabel='Password'
          helpBlock='Password is required'
          isLabel={true}
          size={this.state.size}
          offset={this.state.offset}
          type='password'
          isHelpBlock={true}
          placeholder='password'
          isRequired={true}
          onChange={this.updateField.bind(this, 'password')}
        />
        <FormGroup>
          <Col smOffset={this.state.offset + 2} sm={8}>
            <Button type="submit">
              Login
            </Button>
            <span> you do not have an account? <Link to='/register'> Register </Link> </span>
          </Col>
        </FormGroup>
        {alert}
      </Form>
    );
  }
}

export default Login;
