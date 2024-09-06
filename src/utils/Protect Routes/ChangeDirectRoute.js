import { Navigate, Outlet } from "react-router-dom";

const ChangeDirectRoute = ({ auth, children, type }) => {
    if (type === 'admin') {
        if (auth === false) {
            return <Navigate to="/login" replace />
        }
    } else {
        if (auth === false) {
            return <Navigate to="/" replace />
        }
    }


    return children ? children : <Outlet />;
}

export default ChangeDirectRoute;
