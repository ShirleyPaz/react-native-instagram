/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';

const screen = Dimensions.get('screen')

export default class Post extends Component {

    constructor(props) {
        super(props)
        this.state = {
            foto: this.props.foto
        }
    }

    carregaIcon(likeada) {
        return likeada ?
            require('../../resources/img/s2-checked.png')
            : require('../../resources/img/s2.png')
    }

    exibeLikes(likers) {
        //   console.warn('likers', likers.length)
        if (likers.length <= 0)
            return

        return (
            <Text style={styles.curtidas}>
                {likers.length} curtidas
            </Text>
        )
    }

    like = () => {

        let novaLista = []

        if (!this.state.foto.likeada) {
            novaLista = [
                ...this.state.foto.likers,
                { login: 'meuUser' }
            ]
        } else {
            novaLista = this.state.foto.likers.filter(liker => {
                return liker.login !== 'meuUser'
            })
        }

        const fotoAtualizada = {
            ...this.state.foto,
            likeada: !this.state.foto.likeada,
            likers: novaLista
        }

        this.setState({
            foto: fotoAtualizada
        })
    }

    exibeLegenda(foto) {
        if (foto.comentario === '')
            return

        return (
            <View style={styles.legenda}>
                <Text style={styles.titleLegenda}>
                    {foto.loginUsuario}
                </Text>
                <Text>
                    {foto.comentario}
                </Text>
            </View>
        )
    }


    render() {

        const { foto } = this.state

        return (

            <View>
                <View style={styles.header}>

                    <Image source={{ uri: foto.urlPerfil }}
                        style={styles.profilePic} />
                    <Text>
                        {foto.loginUsuario}
                    </Text>
                </View>

                <Image source={{ uri: foto.urlFoto }}
                    style={styles.postPic} />

                <View style={styles.footer}>
                    <TouchableOpacity onPress={this.like}>
                        <Image source={this.carregaIcon(foto.likeada)}
                            style={styles.likeButton} />
                    </TouchableOpacity>

                    {this.exibeLikes(foto.likers)}

                    {this.exibeLegenda(foto)}

                    {foto.comentarios.map(comentario => {
                        <View style={styles.legenda}>
                            <Text style={styles.titleLegenda}>
                                {comentario.login}
                            </Text>
                            <Text>
                                {comentario.texto}
                            </Text>
                        </View>
                    })}

                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },
    profilePic: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10
    },
    postPic: {
        width: screen.width,
        height: screen.width
    },
    footer: {
        margin: 10
    },
    likeButton: {
        width: 40,
        height: 40
    },
    curtidas: {
        fontWeight: 'bold',
        marginBottom: 10
    },
    legenda: {
        flexDirection: 'row'
    },
    titleLegenda: {
        fontWeight: 'bold',
        marginRight: 5
    }
});



/* <ScrollView style={{ marginTop: 20 }}>

{fotos.map(foto =>
    <View key={foto.id}>
    <Text>
        {foto.usuario}
    </Text>
    <Image source={require('./resources/img/alura.jpg')}
        style={{ width: screen.width, height: screen.width }} />
    </View>
)}

</ScrollView> */