import { useEffect, useState } from 'react'

const ProtectedRoute = () => {
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem('user')));
    const [isAdmin, setIsAdmin] = useState();
    const [isLogged, setIsLogged] = useState();

    useEffect(() => {
        if (users !== null) {
            setIsLogged(false);
            if (users.role === 'admin') {
                setIsAdmin(true)
            } else {
                setIsAdmin(false)
            }
        } else {
            setIsAdmin(false)
            setIsLogged(true)
        }
    }, [users]);

    return [isAdmin, isLogged];
}

export default ProtectedRoute
