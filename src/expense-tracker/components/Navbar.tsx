import { Nav, Navbar, Container  } from "react-bootstrap";
import { Link } from "react-router-dom";

interface NavProps {
  isLoggedIn: boolean,
  setIsLoggedIn: () => void
  handleLogout: () => void
  user: {
    publisherName: string
  }
}

//will need user, isLoggedIn, and setIsLoggedIn
const NavBar = ({isLoggedIn, handleLogout, user}:NavProps) => {
 
  return (
    <>
    <Navbar variant="dark" >
    <Container>

<Navbar.Brand href="#home">Expense Tracker</Navbar.Brand>
<Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                  <Nav.Link as={Link} to={'/ExpenseList'}>Expenses</Nav.Link>
                  <Nav.Link as={Link} to={'/CreateAccount'}>Create Account</Nav.Link>
              </Nav>
              <Nav className="welcome">
                {isLoggedIn ? (
                  <>
                  <Nav.Link as ={Link} to={'/'} onClick={handleLogout}>Logout</Nav.Link>
                  <Nav.Link>Welcome {user ? user.publisherName : "Guest"}</Nav.Link>
                  </>
                  
                  ):<Nav.Link as ={Link} to={'/'} >Log In</Nav.Link>}
              </Nav>
              
          </Navbar.Collapse>
</Container>
    </Navbar>
        
    </>
  )
}

export default NavBar