import React from "react";
import { Link } from "react-router-dom";
import { logout } from '../../Services/auth';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from '../../Context/AuthContext';
import "./Nav.css";

export default function Nav() {
    const [username, setUsername] = React.useState("");
    const { token, setAccessToken } = React.useContext(AuthContext);
    const handleLogout = async () => {
        try {
            setUsername("");
            logout();
            setAccessToken("");
        } catch (error) {
            console.log(error);
        }
    };
    React.useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUsername(decoded.email || "");
            } catch (err) {
                console.error("Invalid token:", err);
            }
        }
    }, [token]);
    const sideBar = React.useRef(null);
    const [width, setWidth] = React.useState(window.innerWidth)
    React.useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    React.useEffect(() => {
        if (width > 800) {
            sideBar.current.style.display = "none";
        }
    }, [width]);
    function openSideBar() {
        sideBar.current.style.display = "flex";
    }
    function closeSideBar() {
        sideBar.current.style.display = "none";
    }
    return (
        <nav>
            <ul className="sidebar" ref={sideBar}>
                <li onClick={closeSideBar} className="close"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#000000" ><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg></a></li>
                {!username ? (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                    </>
                ) : (
                    <>
                        <li><p id="email">{username}</p></li>
                        <li><a href="#" onClick={handleLogout}>Log out</a></li>
                    </>
                )}

            </ul>
            <ul className="mainBar">
                <li id="title"><Link to="/">EventPlanner</Link></li>
                {!username ? (
                    <>
                        <li className="hideOnMobile"><Link to="/login">Login</Link></li>
                        <li className="hideOnMobile"><Link to="/signup">signup</Link></li>
                    </>
                ) : (
                    <>
                        <li id="email" className="hideOnMobile"><p>{username}</p></li>
                        <li className="hideOnMobile">
                            <a href="/eventcreation">Add Event</a>
                        </li>
                        <li className="hideOnMobile"><a href="#" onClick={handleLogout}>Log out</a></li>
                    </>
                )}

                <li onClick={openSideBar} className="burger"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#000000"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" /></svg></a></li>
            </ul>
        </nav>
    )
}