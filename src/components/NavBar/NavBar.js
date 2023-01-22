import {Link} from 'react-router-dom'
import * as userService from '../../utilities/users-service'

export default function NavBar(props) {
  function handleLogout(){
    userService.logout()
    props.setUser(null)
  }
    return (
      <nav className="NavBar">
        <Link to="/order"> Order History </Link>
        &nbsp; | &nbsp;
        <Link to="/orders/new"> New Order </Link>
        &nbsp;&nbsp;
        Welcome, {props.username}
        <Link to="" onClick={handleLogout}> Logout </Link>
      </nav>
    );
  }