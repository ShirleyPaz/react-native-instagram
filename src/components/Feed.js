/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  FlatList,
  AsyncStorage,
  Button,
  ScrollView
} from 'react-native';
import Post from './Post'
import InstaluraFetch from '../services/InstaluraFetch'
import Notificacao from '../api/Notificacao'


export default class Feed extends Component {

  constructor() {
    super()
    this.state = {
      fotos: []
    }
  }

  componentDidMount() {
    
    InstaluraFetch.get('/fotos')
        .then(json => this.setState({ fotos: json }))

    // fetch('http://instalura-api.herokuapp.com/api/public/fotos/rafael')    
  }

  buscaPorId(idFoto) {

    const foto = this.state.fotos.find(foto =>
      foto.id === idFoto
    )
    return foto
  }

  atualizaFotos(fotoAtualizada) {

    const fotos = this.state.fotos.map(foto =>
      foto.id === fotoAtualizada.id ?
        fotoAtualizada : foto
    )
    this.setState({ fotos })
  }

  like = (idFoto) => {

    const listaOriginal = this.state.fotos

    foto = this.buscaPorId(idFoto)

    AsyncStorage.getItem('usuario')
      .then(usuarioString => JSON.parse(usuarioString))
      .then(usuario => {

        let novaLista = []

        if (!foto.likeada) {
          novaLista = [
            ...foto.likers,
            { login: usuario.nome }
          ]
        } else {
          novaLista = foto.likers.filter(liker => {
            return liker.login !== usuario.nome
          })
        }
        return novaLista
      })
      .then(novaLista => {

        const fotoAtualizada = {
          ...foto,
          likeada: !foto.likeada,
          likers: novaLista
        }

        this.atualizaFotos(fotoAtualizada)

      })

    // const uri = `http://192.168.0.137:8080/api/fotos/${idFoto}/like`
    
    InstaluraFetch.post(`/fotos/${idFoto}/like`)
      .catch(error => {
        
        /* AlertIOS
        ToastAndroid */
        Notificacao.exibe('errouuuu')

        this.setState({fotos: listaOriginal})
      })
  }


  addComentario = (idFoto, valorComentario) => {
    if (valorComentario === '')
      return

    const foto = this.buscaPorId(idFoto)

    const comentario = {
      texto: valorComentario
    }

    InstaluraFetch.post(`/fotos/${idFoto}/comment`, comentario)

      .then(comentario => [...foto.comentarios, comentario])
      .then(novaLista => {
        const fotoAtualizada = {
          ...foto,
          comentarios: novaLista
        }

        this.atualizaFotos(fotoAtualizada)
      })
  }

  logout = () => {
    AsyncStorage.removeItem('usuario')

    this.props.navigator.resetTo({
      screen: 'TelaLogin',
      navigatorStyle: {
        navBarHidden: true
      }
    })
  }

  render() {

    return (
      <ScrollView>

        <FlatList style={styles.lista}
          data={this.state.fotos}
          keyExtractor={item => item.id}
          renderItem={({ item }) =>

            <Post foto={item}
              likeCallback={this.like}
              comentarioCallback={this.addComentario} />
          }
        />

        <Button style={styles.btnLogin}
          title="deslogar"
          onPress={this.logout}
        />

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  btnLogin: {
    marginTop: 20,
    backgroundColor: '#000'
  },
  lista: {
    height: '100%'
  }
});


/* AsyncStorage.getItem('usuario')
      .then(usuarioString => JSON.parse(usuarioString))
      .then(usuario => {
        // .then(token => {

        const request = {
          headers: new Headers({
            "X-AUTH-TOKEN": usuario.token
            // "X-AUTH-TOKEN": token
          })
        }
        return request
      })

      //.then(request => fetch('http://192.168.0.137:8080/api/fotos', request)
      .then(request => fetch('http://instalura-api.herokuapp.com/api/fotos', request)
        .then(response => response.json()) */