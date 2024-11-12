import { Link, useLocation } from 'react-router-dom';
import '/src/App.css';

function NavTabs() {
  const currentPage = useLocation().pathname;

  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link
          to="/"
          className={currentPage === '/search' ? 'nav-link active' : 'nav-link'}
        >
          About
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/Saved"
          className={currentPage === '/Saved' ? 'nav-link active' : 'nav-link'}
        >
          Portfolio
        </Link>
      </li>
    </ul>
  );
}

export default NavTabs;
