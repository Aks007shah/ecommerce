import {Navigate, useNavigate} from 'react-router-dom'


const AdminRoute = ({children}) => {

    const storedUser = JSON.parse(localStorage.getItem("ecomuser"));

    if (!storedUser) {
        return <Navigate to='/account/login'></Navigate>
    }

    if (!storedUser.isAdmin) {
        return <Navigate to="/unauthorized"></Navigate>
    }

    return children
}


export default AdminRoute;