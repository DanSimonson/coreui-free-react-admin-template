import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      modal: false,
      modalTwo: false,
      //unused legacy state
      //loader: false,
      //login: 'true'      
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggle = this.toggle.bind(this)
    this.toggleTwo = this.toggleTwo.bind(this)
  }

  handleChange(event) {
    //set the state on user input using onChange event
    this.setState({ [event.target.name]: event.target.value })

    //console logs for testing --------
    //console.log(event);
    //console.log(event.target.name);
    //console.log(event.target.value);    

    //legacy code used to set the state -------------------
    /*if (event.target.dataset.name == 'username') {
      this.setState({ username: event.target.value });
    }

    if (event.target.dataset.name == 'password') {
      this.setState({ password: event.target.value });
    }*/
  }

  handleSubmit(event) {
    /******
     * we are preventing the form from submitting with it's default submit event
     * if the user does not put any input into the fields, we call toggle() and prompt the
     * user for correct input
     * When the backend is hooked up we would fetch our data in this function
     * 
     */
    event.preventDefault();
    //testing code to see if we capture the data
    //const data = this.state;
    //console.log('final data is: ', data);
    //This is a good place to begin our get request to the database
    if (this.state.username !== '' && this.state.password !== '') {
      this.toggleTwo()
      console.log(`
      --submitting to database--
      username: ${this.state.username}
      password: ${this.state.password}
      `)
      /******* legacy code to fetch our user login data
      this.setState({ loader: !this.state.loader })
      this.setState({ login: !this.state.login })
      fetch(Endpoint.user_login, {
      method: 'POST',
      headers: Endpoint.default_headers,
      body: JSON.stringify(this.state)
      }).then(response => response.json()).then(res => this.onSetResult(res));
      end of fetch **************/
    } else {
      /**
       * we bypassed fetching the data from the backend because the user input
       * was incorrect
       * we are prompting the user for correct input
       *  */
      this.toggle()
      console.log('Form Invalid - Display Error Message');
    }
  }

  toggle() {
    /****
     * if the user does not input any characters into the username and
     * password field, prompt him with modal to use more characters
     * 
     */
    if (this.state.username === '' && this.state.password === '') {
      this.setState({
        modal: !this.state.modal
      });
    }
  }
  toggleTwo() {
    /***
     * Call this modal if the login api call is succesfull
     * A third modal could be created to inform the user the login is 
     * was unsuccessfull (ie., toggleThree())
     * 
     */
    this.setState({
      modalTwo: !this.state.modalTwo
    });
    console.log(this.state.modalTwo)
  }


  /***** unused legacy code method to route user to dashboard on successful login
   * this function is a good place to put our call to modals informing
   * the user of a successful or unsuccessful login
   * 
   * 
  onSetResult = (result) => {
    if (typeof result.response._token != 'undefined') {
      localStorage.setItem('isAuthenticated', result.response._token);
      window.location = "/Dashboard";
    }
    else {
      this.setState({ loader: false, login: true })
      alert('Invalid!');
      document.getElementById("login-form").reset();
    }
  }
   end of unused legacy method ***************/

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.handleSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" name="username" autoComplete="username" onChange={this.handleChange} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password" name="password" onChange={this.handleChange} />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" >Login</Button>
                        </Col>
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                          <ModalHeader toggle={this.toggle}>Login Information</ModalHeader>
                          <ModalBody>
                            username and password fields require at least one character.
                          </ModalBody>
                          <ModalFooter>
                            {/*<Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}*/}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                          </ModalFooter>
                        </Modal>
                        <Modal isOpen={this.state.modalTwo} toggle={this.toggleTwo} className={this.props.className}>
                          <ModalHeader toggle={this.toggleTwo}>Login Information</ModalHeader>
                          <ModalBody>
                            We are getting the user login data. we will inform him of success/failure with a modal 
                          </ModalBody>
                          <ModalFooter>
                            {/*<Button color="primary" onClick={this.toggleTwo}>Do Something</Button>{' '}*/}
                            <Button color="secondary" onClick={this.toggleTwo}>Cancel</Button>
                          </ModalFooter>
                        </Modal>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                {/* legacy code that is unused
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                    <Link to="/register">
                      <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                    </Link>
                  </div>
                </CardBody>
                </Card>*/}
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;

