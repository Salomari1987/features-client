import React from 'react';
import {Link} from 'react-router';
import AuthStore from '../stores/AuthStore';
import AuthActions from '../actions/AuthActions';
import FieldGroup from '../containers/FieldGroup';
import { Col, Form, Button, FormGroup } from 'react-bootstrap';
import AlertContainer from '../containers/AlertContainer';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      firstName: '',
      lastName: '',
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

  onChange(e) {
    if (AuthStore.isAuthenticated()) {
      this.props.history.pushState(null, '/');
    } else if (AuthStore._errors) {
      this.setState({errors: AuthStore._errors});
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    AuthActions.register(this.state);
  }

  updateField(fieldName, event) {
    var obj = {};
    obj[fieldName] = event.target.value;
    this.setState(obj);
  }

  getValidationState(toBeChecked, cb) {
    if (cb(toBeChecked)) {
      return 'success';
    } else {
      return 'error';
    }
  }

  handleAlertDismiss() {
    this.setState({alertVisible: false});
  }

  handleAlertShow() {
    this.setState({alertVisible: true});
  }

  render() {
    var errorMessages = this.state.errors.map((error, i) => {
      return (
        <p key = {i.toString()} > {error} </p>
      );
    });
    var alert = (function () {
      if (errorMessages.length > 0) {
        return (
          <AlertContainer
          handleAlertDismiss = {this.handleAlertDismiss.bind(this)}
          errorMessages = {errorMessages}
          handleAlertShow = {this.handleAlertShow.bind(this)}
          alertVisible = {this.state.alertVisible} />
        );
      }
    }).call(this);

    return (
      <Form horizontal onSubmit = {this.handleSubmit.bind(this)}>

        <FieldGroup
          validationState = {this.getValidationState(this.state['username'], (toBe) => (toBe.length > 5 ? true : false))}
          fieldID = 'username'
          fieldLabel = 'Username*'
          onChange = {this.updateField.bind(this, 'username')}
          helpBlock = 'Username is too short'
          isLabel = {true}
          size = {this.state.size}
          offset = {this.state.offset}
          type = 'text'
          isHelpBlock = {this.getValidationState(this.state['username'], (toBe) => (toBe.length > 5 ? true : false)) === 'error'}
          placeholder = 'username'
          isRequired = {true}
        />
        <FieldGroup
          validationState = {this.getValidationState(this.state['password'], (toBe) => (toBe.length > 5 ? true : false))}
          fieldID = 'password'
          fieldLabel = 'Password*'
          onChange = {this.updateField.bind(this, 'password')}
          helpBlock = 'Password is too short'
          isLabel = {true}
          size = {this.state.size}
          offset = {this.state.offset}
          type = 'password'
          isHelpBlock = {this.getValidationState(this.state['password'], (toBe) => (toBe.length > 5 ? true : false)) === 'error'}
          placeholder = 'password'
          isRequired = {true}
        />
        <FieldGroup
          validationState = {this.getValidationState(this.state['confirm_password'], (toBe) => (toBe === this.state['password'] ? true : false))}
          fieldID = 'confirm_password'
          fieldLabel = 'Password*'
          onChange = {this.updateField.bind(this, 'confirm_password')}
          helpBlock = 'Passwords do not match'
          isLabel = {true}
          size = {this.state.size}
          offset = {this.state.offset}
          type = 'password'
          isHelpBlock = {this.getValidationState(this.state['confirm_password'], (toBe) => (toBe === this.state['password'] ? true : false)) === 'error'}
          placeholder = 'confirm password'
          isRequired = {true}
        />
        <FieldGroup
          validationState = {null}
          fieldID = 'email'
          fieldLabel = 'Email*'
          onChange = {this.updateField.bind(this, 'email')}
          isLabel = {true}
          size = {this.state.size}
          offset = {this.state.offset}
          type = 'email'
          isHelpBlock = {false}
          placeholder = 'email'
          isRequired = {true}
        />
        <FormGroup>
          <Col smOffset = {this.state.offset + 2} sm = {8}>
            <Button type="submit">
              Register
            </Button>
            <span> already have an account? <Link to = '/login'> Login </Link> </span>
          </Col>
        </FormGroup>
        {alert}
      </Form>
    );
  }
}

export default Register;
