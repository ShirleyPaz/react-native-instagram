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

        const { likeCallback, foto, comentarioCallback } = this.props

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
                        likeCallback={likeCallback}
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

                    <InputComentario idFoto={foto.id}
                        comentarioCallback={comentarioCallback} 
                    />

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