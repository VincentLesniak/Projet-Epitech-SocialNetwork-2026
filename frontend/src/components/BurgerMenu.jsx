import { useState } from "react";
import { Link } from "react-router-dom";

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? "X" : "☰"}</button>

      {isOpen && (
        <ul className="absolute inset-x-1 w-full h-full">
          <li>
            <Link to="/Home">
              <button type="button">Fil d'actualité</button>
            </Link>
          </li>
          <li>
            <Link to="/profil">
              <button type="button">Profil</button>
            </Link>
          </li>
          <li>
            <ul>
              <li>
                <Link to="/groups">
                  <button type="button">Groupe</button>
                </Link>
                <Link to="/groups">
                  <button type="button">Groupe</button>
                </Link>
                <Link to="/groups">
                  <button type="button">Groupe</button>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default BurgerMenu;
