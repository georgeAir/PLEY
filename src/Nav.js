import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavDropdown from 'react-bootstrap/NavDropdown'


export default function Nav(props) {
 return (
   <>

   <Navbar>

    <Navbar.Brand className="pley">PLEY</Navbar.Brand>
    <Navbar.Collapse className="justify-content-end">

    </Navbar.Collapse>
    <NavDropdown className="" title="Account" id='' >
        <b>User Login:</b> <form onSubmit={props.loginUser}>
            <label htmlFor="name">Username: </label>
            <input type="text" id="name" name="username"/>
            <label htmlFor="name">Password: </label>
            <input type="password" id="password" name="password"/>
            
               </form>
        <NavDropdown.Divider />
        <b>Create Account:</b><form onSubmit={props.register}>
          <label htmlFor="name">Username: </label>
          <input type="text" id="name" name="username"/>
          <label htmlFor="name">Password: </label>
          <input type="password" id="password" name="password"/>
          <input type="submit" value="sign up" />
        </form>
      </NavDropdown>
      <Navbar.Text>
        Signed in as: <a href="#user"></a>
      </Navbar.Text>
    <Navbar.Toggle />


</Navbar>
</>





 )
}
