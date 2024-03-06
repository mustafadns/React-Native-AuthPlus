import { Alert, StyleSheet, Text, View } from 'react-native'
import React , {useState , useContext}from 'react'
import AuthContent from '../components/AuthContent'
import { createUser } from '../util/auth'
import Loading from '../components/Loading';
import { AuthContext } from '../store/auth-context';


export default function SignUpScreen() {
    const [isAuthanticating, setIsAuthanticating] = useState(false);
    const authContext = useContext(AuthContext);

    async function signUpHendler ({email,password}) {
        setIsAuthanticating(true);
        try {
            const token = await createUser(email,password);
            authContext.authenticate(token);
        } catch (error) {
            Alert.alert('Kayıt Olunamadı','Lütfen bilgilerinizi kontrol ediniz ...');
        }
        
        setIsAuthanticating(false);
    }

    if (isAuthanticating) {
        return <Loading message="Kullanıcı oluşturuluyor ..."/>
    }

    return (
        <AuthContent onAuthenticate={signUpHendler} />
    )
}

const styles = StyleSheet.create({})