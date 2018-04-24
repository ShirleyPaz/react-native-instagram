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
    TouchableOpacity,
    TextInput
} from 'react-native';
import InputComentario from './InputComentario'
import Likes from './Likes'

const screen = Dimensions.get('screen')

export default class Post extends Component {

    constructor(props) {
        super(props)
        this.state = {
            foto: this.props.foto
        }
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

    addComentario = (valorComentario) => {

        if (valorComentario === '')
            return

        const novaLista = [
            ...this.state.foto.comentarios,
            {
                id: this.state.valorComentario,
                login: 'meuUsuario',
                texto: valorComentario
            }
        ]

        const fotoAtualizada = {
            ...this.state.foto,
            comentarios: novaLista
        }

        this.setState({
            foto: fotoAtualizada
        })

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
                    <Likes
                        likeCallback={this.like}
                        foto={foto}
                    />

                    {this.exibeLegenda(foto)}

                    {foto.comentarios.map(comentario => 
                        
                        <Text style={styles.legenda}
                            key={comentario.id}>
                            <Text style={styles.titleLegenda}>
                                {comentario.login}
                            </Text>
                            <Text>
                                {comentario.texto}
                            </Text>
                        </Text>
                    )}

                    <InputComentario comentarioCallback={this.addComentario} />

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
    legenda: {
        flexDirection: 'row'
    },
    titleLegenda: {
        fontWeight: 'bold',
        marginRight: 5
    },

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