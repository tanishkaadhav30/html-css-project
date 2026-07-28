import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  const links = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];
  return (
    <nav className="navbar">
      {
        links.map((link) => (
          <Link
            to={link.path}
          >
            {link.label}
          </Link>
        ))
      }
    </nav>
  );
}
export default Navbar;