import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { logout } from '../../services/apiService';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/userAction';

const Header = () => {

  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const account = useSelector(state => state.user.account);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    navigate('/login');
  }
  const handleRegister = () => {
    navigate('/register');
  }

  const handleLogOut = async() => {
    let rs = await logout(account.email, account.refresh_token);
    if (rs && rs.EC === 0) {
      dispatch(doLogout());
      navigate('/login');
    } else {
        toast.error(rs.EM);
    }
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        {/* <Navbar.Brand href="#home">MEGUMIN</Navbar.Brand> */}
        <NavLink to='/' className='navbar-brand' >MEGUMIN</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to='/' className='nav-link' >Home</NavLink>
            <NavLink to='/users' className='nav-link'>User</NavLink>
            <NavLink to='/admins' className='nav-link'>Admin</NavLink>
          </Nav>
          <Nav>
            {isAuthenticated === false ?
              <>
                <button className='btn-login' onClick={() => handleLogin()}>Log in</button>
                <button className='btn-signup' onClick={() => handleRegister()}>Sign up</button>              
              
              </>
              :
                <NavDropdown title="Settings" id="basic-nav-dropdown">               
                    <NavDropdown.Item >Profile</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => handleLogOut()}>Log out</NavDropdown.Item>
                </NavDropdown> 
            }

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;