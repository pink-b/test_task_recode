import { Link } from 'react-router-dom';
import '../styles/NavBar.css'

const NavBar = () => {
    return (
      <nav className="navbar">
        <div className="logo">Книги/Авторы</div>
        <ul className="nav-links">
          <li className="nav-item"><Link to="/">Книги</Link></li>
          <li className="nav-item"><Link to="/add-book">Добавить книги</Link></li>
          <li className="nav-item"><Link to="/authors">Авторы</Link></li>
          <li className="nav-item"><Link to="/add-authors">Добавить авторов</Link></li>
        </ul>
      </nav>
    );
  };

export default NavBar;