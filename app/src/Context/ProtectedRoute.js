import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const { token, loading } = useContext(AuthContext);
    const isLoggedIn = !!token;
    useEffect(() => {
        if (!loading && !isLoggedIn) {
            navigate("/login");
        }
    }, [loading, isLoggedIn, navigate]);
    if (loading) return null;
    if (!isLoggedIn) return null;
    return children;
}
