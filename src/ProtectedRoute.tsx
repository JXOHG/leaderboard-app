import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// Define the props for the ProtectedRoute component
interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const location = useLocation();
    const userStatus = sessionStorage.getItem('USER_STATUS') ? sessionStorage.getItem('USER_STATUS') : "User"

    if (userStatus == "User") {
        if (location.pathname == "/login") {
            return <>{children}</>;
        }
        return <Navigate to="/" state={{ from: location }} replace />;
    }
    if (userStatus == "Admin" && location.pathname == "/login") {
        return <Navigate to="/settings" state={{ from: location }} replace />;
    } else {
        return <>{children}</>;
    }
};

export default ProtectedRoute;
