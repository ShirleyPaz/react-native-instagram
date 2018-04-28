import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    TextInput,
    Dimensions,
    Button,
    Image,
    AsyncStorage,
    Text
} from 'react-native';

export default class Login extends Component {
    constructor() {
        super()
        this.state = {
            usuario: '',
            senha: '',
            validacao: ''
        }
    }

    componentDidMount() {
        fetch('http://instalura-api.herokuapp.com/gera/dados')
        .then(response => response)
    }

    fazLogin = () => {

        const request = {
            method: 'POST',
            body: JSON.stringify({
                login: this.state.usuario,
                senha: this.state.senha
            }),
            headers: new Headers({
                "Content-type": "application/json"
            })
        }

        // const uri = 'http://192.168.0.137:8080/api/public/login'
        const uri = 'http://instalura-api.herokuapp.com/api/public/login'
        
        fetch(uri, request)
            .then(response => {
                if (!response.ok)
                    throw new Error('Não deu pra logar ai mermao')

                return response.text()
            })
            .then(token => {
                const usuario = {
                    nome: this.state.usuario,
                    token: token
                }

                AsyncStorage.setItem('usuario', JSON.stringify(usuario))
                /* AsyncStorage.setItem('usuario', this.state.usuario)
                AsyncStorage.setItem('token', token) */

                this.props.navigator.resetTo({
                    screen: 'TelaFeed',
                    title: 'Instalura'
                })
            })
            .catch(error => {
                console.warn('nao logou')
                this.setState({ validacao: error.message })
            })
    }

    logout = () => {
        AsyncStorage.removeItem('usuario')
        console.warn('deu logout')
    }

    render() {
        return (
            <View style={styles.container}>

                <Image style={styles.logo}
                    source={require('../../resources/img/s2-checked.png')} />

                <View style={styles.form}>
                    <TextInput style={styles.input}
                        placeholder="Usuário"
                        autoCapitalize="none"
                        onChangeText={texto =>
                            this.setState({ usuario: texto })} />
                    <TextInput style={styles.input}
                        placeholder="Senha"
                        autoCapitalize="none"
                        secureTextEntry={true}
                        onChangeText={texto =>
                            this.setState({ senha: texto })} />

                    <Button style={styles.btnLogin}
                        title="login"
                        onPress={this.fazLogin}
                    />
                </View>

                <Text style={styles.erro}>
                    {this.state.validacao}
                </Text>

                {/* <Button style={styles.btnLogin}
                    title="deslogar"
                    onPress={this.logout}
                /> */}

            </View>
        )
    }
}

const styles = StyleSheet.create({
    logo: {
        width: 70,
        height: 70,
        marginBottom: 20
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    form: {
        width: Dimensions.get('screen').width * 0.8
    },
    input: {
        height: 40,
        marginBottom: 30,
        borderBottomColor: '#eee'
    },
    btnLogin: {
        marginTop: 20,
        backgroundColor: '#000'
    },
    erro: {
        marginTop: 20,
        color: '#E84329'
    }
})