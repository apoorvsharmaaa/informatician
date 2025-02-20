import "../Navbar.css";
import {useEffect,useState} from "react"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const getUserFromLocalStorage = () => {
  const userJSON = localStorage.getItem('user');
  return userJSON ? JSON.parse(userJSON) : null;
};



export default function NavItems(props) {
  const [user, setUser] = useState(null);
  const[stop,SetStop]=useState(false);

  useEffect(() => {
    const userJSON = localStorage.getItem("user");

    if (userJSON) {
      setUser(JSON.parse(userJSON));
    }

   
  }, []);

  const checkLocalStorage = () => {
    const userJSON = localStorage.getItem('user');
    // console.log(userJSON)
    if (userJSON) {
      
      setUser(JSON.parse(userJSON));
      SetStop(false);
    }

    if(userJSON === null)
    {
      //  console.log("mila");
       SetStop(true);
    }
  };

  useEffect(() => {
    checkLocalStorage();
    const interval = setInterval(() => {
      // console.log("grdgdh")
      checkLocalStorage();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div style={{}}>
      <ul
        id="nav-items"
        style={{
          marginBottom: 0,
          transform:
            !props.clicked & props.drawer
              ? "translateX(500px)"
              : "translateX(0px)",
          transition:
            props.clicked & props.drawer
              ? "transform 0.3s ease-out"
              : "transform 0.3s ease-in",
          background: props.theme === "dark" ? "#001229" : "#eff6ff",
        }}
      >
        <li>
          <div className="search-container search-mobile-view">
            <form action="" className="search-bar">
              <input type="text" placeholder="search..." name="q" />
              <button type="submit">
                <i className="fa-solid fa-search"></i>
              </button>
            </form>
          </div>
          <Link
            to="/"
            className={
              props.location.pathname === "/"
                ? "active"
                : props.theme === "dark"
                ? "text-white"
                : "text-dark"
            }
            onClick={props.handleOptionClick}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/books"
            className={
              props.location.pathname === "/books"
                ? "active"
                : props.theme === "dark"
                ? "text-white"
                : "text-dark"
            }
            onClick={props.handleOptionClick}
          >
            Books
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className={
              props.location.pathname === "/about"
                ? "active"
                : props.theme === "dark"
                ? "text-white"
                : "text-dark"
            }
            onClick={props.handleOptionClick}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className={
              props.location.pathname === "/contact"
                ? "active"
                : props.theme === "dark"
                ? "text-white"
                : "text-dark"
            }
            onClick={props.handleOptionClick}
          >
            Contact Us
          </Link>
        </li>
        {user  && !stop ? (
            <li className="flex items-center">
              <img
                src={user.picture}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
              <Link
                to="/profile"
                className={
                  props.location.pathname === '/login'
                    ? 'active'
                    : props.theme === 'dark'
                    ? 'text-white'
                    : 'text-dark'
                }
                onClick={props.handleOptionClick}
              >
                {user.name}
              </Link>
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                className={
                  props.location.pathname === '/login'
                    ? 'active'
                    : props.theme === 'dark'
                    ? 'text-white'
                    : 'text-dark'
                }
                onClick={props.handleOptionClick}
              >
                Login
              </Link>
            </li>
          )}

        <div className="flex items-center">
          <li>
            <Link to="/bookmark" onClick={scrollToTop}>
              <FontAwesomeIcon
                style={{
                  color: props.theme === "dark" ? "white" : "",
                  height: "20px",
                }}
                icon={faBookmark}
              />
            </Link>
          </li>
          <li>
            <Link to="/addBooks" onClick={scrollToTop} className="flex" style={{ width: "34px" }}>
              <img
                loading="lazy"
                src="https://img.icons8.com/ios/80/add-book.png"
                alt="Add Book Icon"
                className="h-6 mr-2 text-bold  hover:font-bold hover:shadow-md self-center  "
                style={{ filter: props.theme === "dark" ? "invert(1)" : "" }}
              />{" "}
            </Link>
          </li>
        </div>
      </ul>
    </div>
  );
}
