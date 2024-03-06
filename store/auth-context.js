import { createContext , useState , useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
    token:'',
    isAuthenticated:false,
    authenticate:(token) => {},
    logout:() => {},
})

function AuthContentProvider ({ children }) {

    const [authToken, setAuthToken] = useState(null);

    useEffect(() => {
        async function fetchToken () {
            const storedToken = await AsyncStorage.getItem('token');

            if (storedToken) {
                setAuthToken(storedToken);
            }
        }
        fetchToken();
    },[]);

    function authenticate (token) {
        setAuthToken(token);
        AsyncStorage.setItem('token',token);
    }

    function logout (token) {
        setAuthToken(null);
        AsyncStorage.removeItem('token');
    }

    const value = {
        token : authToken,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        logout: logout,
    }

    return (
        <AuthContext.Provider
            value={value}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContentProvider;