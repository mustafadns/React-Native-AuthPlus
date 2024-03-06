import { Alert, StyleSheet, Text, View } from 'react-native'
import React , { useState }from 'react'
import AuthForm from './AuthForm'
import ButtonWhite from './ButtonWhite'
import { useNavigation } from '@react-navigation/native'

export default function AuthContent({isLogin,onAuthenticate}) {
    const navigation = useNavigation();
    const [credentialInvalid, setCredentialInvalid] = useState({
        email:false,
        password:false,
        confirmEmail:false,
        confirmPassword:false,
    });

    function submitHandler (credentials) {
        console.log(credentials);
        let {confirmEmail,confirmPassword,email,password}=credentials;

        email:email.trim();
        password:password.trim();

        const emailIsValid = email.includes('@gmail.com');
        const passwordIsValid = password.length > 8;
        const emailIsEqual = email == confirmEmail;
        const passwordIsEqual = password === confirmPassword;

        if (!emailIsValid) {
            Alert.alert('Hay Aksi !!' , 'Girdiğiniz email değeri geçersiz bir emaildir. Lütfen kontrol ediniz');
            setCredentialInvalid({
                email:!emailIsValid,
            })
            return;
        }
        if (!isLogin && (!emailIsEqual)) {
            Alert.alert('Hay Aksi !!' , 'Girdiğiniz email değeri yukarıdaki ile uyuşmuyor. Lütfen kontrol ediniz');
            setCredentialInvalid({
                confirmEmail:!emailIsValid || !emailIsEqual,
            })
            return;
        }
        if (!passwordIsValid) {
            Alert.alert('Hay Aksi !!' , 'Girdiğiniz şifre değeri geçersiz bir şifredir. Lütfen kontrol ediniz');
            setCredentialInvalid({
                password:!passwordIsValid,
            })
            return;
        }
        if (!isLogin && (!passwordIsEqual)) {
            Alert.alert('Hay Aksi !!' , 'Girdiğiniz şifre değeri  yukarıdaki ile uyuşmuyor. Lütfen kontrol ediniz');
            setCredentialInvalid({
                confirmPassword:!passwordIsValid || !passwordIsEqual,
            })
            return;
        }
        onAuthenticate({email,password});
    }

    function switchScreen () {
        if (isLogin) {
            navigation.navigate('SignUp');
        }
        else {
            navigation.navigate('Login');
        }
    }

    return (
        <View style={styles.container}>
            <AuthForm 
                credentialInvalid={credentialInvalid}
                isLogin={isLogin}
                onsubmit={submitHandler}
            />
            <View>
                <ButtonWhite onPress={switchScreen}>
                    {
                        isLogin ? 'Yeni Kullanıcı Oluştur' : 'Giriş Yap'
                    }
                </ButtonWhite>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#c9c9c9',
        marginTop: 50,
        marginHorizontal: 30,
        padding: 20,
        borderRadius: 20,
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: { width: 1 , height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 4,
    }
})