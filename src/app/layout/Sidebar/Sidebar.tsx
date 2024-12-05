import { NavLink } from 'react-router-dom';
import '../../../shared-components/styles/Sidebar.scss';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="nav flex-column p-3">
        <li className="nav-item">
          <NavLink to="/" className="nav-link text-white">
            <i className="bi bi-house-door"></i> Home
          </NavLink>
        </li>
        <li className='nav-item dropdown'>
          <a 
            href="#"
            className="nav-link text-white "
            data-bs-toggle="dropdown"
            role="button"
            aria-expanded="false"
          >
            <i className="bi bi-list-check"></i> Orders
          </a>
          <ul className="dropdown-menu">
          <li>
            <NavLink to="/order/AllOrders" className="dropdown-item">
              All Orders
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/myOrders" className="dropdown-item">
              My Orders
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/Dashboard" className="dropdown-item">
              Summary
            </NavLink>
          </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
