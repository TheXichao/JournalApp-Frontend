import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar({
  isAuthenticated,
  onLogout,
}: {
  isAuthenticated: boolean;
  onLogout: () => void;
}) {
  return (
    <nav>
      <ul>
        {/* always display Home irrespectable of wether signed in*/}
        <li>
          <Link to="/">Home</Link>
        </li>

        {/* conditionally display login/register or profile/logout */}
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/entries">Entries</Link>
            </li>
            <li>
              <button onClick={onLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>{" "}
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
