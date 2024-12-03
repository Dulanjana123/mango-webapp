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
        <li className="nav-item">
          <NavLink to="/order/myOrders" className="nav-link text-white">
            <i className="bi bi-list-check"></i> Orders
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
