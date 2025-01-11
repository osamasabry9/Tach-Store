import { useAppSelector } from "@store/hooks"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({children}: {children: React.ReactNode}) => {

    const { accessToken } = useAppSelector((state) => state.auth);

  return accessToken ? children : <Navigate to="/login?message=login_required" />;
}

export default ProtectedRoute
