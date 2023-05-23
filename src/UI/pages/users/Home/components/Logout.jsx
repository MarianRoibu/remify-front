import { useAuth0 } from "@auth0/auth0-react";



export function Logout() {
    const { logout } = useAuth0();

    const handleLogOut = () => {
        logout({
            logoutParams: {
                returnTo: window.location.origin
            }
        });
    }

    return (
        <div>

            <button
                onClick={handleLogOut}>Close Session</button>
        </div>
    )
}