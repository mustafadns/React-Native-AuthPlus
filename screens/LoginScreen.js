import { Alert, StyleSheet, Text, View } from 'react-native'
import React , { useState , useContext}from 'react'
import AuthContent from '../components/AuthContent'
import Loading from '../components/Loading';
import { login } from '../util/auth';
import { AuthContext } from '../store/auth-context';

export default function LoginScreen() {

    const [isAuthanticating, setIsAuthanticating] = useState(false);
    const authContext = useContext(AuthContext);

    async function loginHendler ({email,password}) {
        setIsAuthanticating(true);
        try {
            const token = await login(email,password);
            authContext.authenticate(token);
        } catch (error) {
            Alert.alert('Giriş Yapılamadı','Lütfen bilgilerinizi kontrol ediniz ...');
        }
        
        setIsAuthanticating(false);
    }

    if (isAuthanticating) {
        return <Loading message="Kullanıcı giriş yapıyor ..."/>
    }
    return (
        <AuthContent isLogin onAuthenticate={loginHendler}/>
    )
}

const styles = StyleSheet.create({})