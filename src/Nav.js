import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavDropdown from 'react-bootstrap/NavDropdown'
import React, {Component} from 'react'



export default class Nav extends Component {
  constructor(){
    super()

    this.state = {
      name: '',
      price: '',
      likes: '0',
      img: '',
      phone: '',
      display_address: '',
      timestamps:'',
    }
  }
render(){
 return (
   <Navbar>

    <Navbar.Brand className="pley">PLEY</Navbar.Brand>
    <NavDropdown className="dropdown" title="Account" id="nav-dropdown">
        <b>User Login:</b> <form onSubmit={this.props.loginUser}>
            <label htmlFor="name">Username: </label>
            <input type="text" id="name" name="username"/>
            <label htmlFor="name">Password: </label>
            <input type="password" id="password" name="password"/>
            <input type="submit" value="login" />
               </form>
        <NavDropdown.Divider />
        <b>Create Account:</b><form onSubmit={this.props.register}>
          <label htmlFor="name">Username: </label>
          <input type="text" id="name" name="username"/>
          <label htmlFor="name">Password: </label>
          <input type="password" id="password" name="password"/>
          <input type="submit" value="sign up" />
        </form>
      </NavDropdown>
    <Navbar.Toggle />
    <Navbar.Collapse className="justify-content-end">
      <Navbar.Text>
        Signed in as: {this.props.loginUser}
      </Navbar.Text>
    </Navbar.Collapse>

</Navbar>
   )
  }
}
