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
  AsyncStorage
} from 'react-native';
import Post from './Post'



export default class Feed extends Component {

  constructor() {
    super()
    this.state = {
      fotos: []
    }
  }

  componentDidMount() {

    AsyncStorage.getItem('usuario')
      .then(usuarioString => JSON.parse(usuarioString))
      .then(usuario => {

        const request = {
          headers: new Headers({
            "X-AUTH-TOKEN": usuario.token
          })
        }
        return request
      })
      .then(request => fetch('http://192.168.0.137:8080/api/fotos', request)
        .then(response => response.json())
        .then(json =>
          this.setState({
            fotos: json
          })))

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
    return fotos
  }

  like = (idFoto) => {

    foto = this.buscaPorId(idFoto)

    AsyncStorage.getItem('usuario')
      .then(usuarioString => JSON.parse(usuarioString))
      .then(usuario => {

        let novaLista = []

        if (!foto.likeada) {
          novaLista = [
            ...foto.likers,
            { login: usuario }
          ]
        } else {
          novaLista = foto.likers.filter(liker => {
            return liker.login !== usuario
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

        const fotos = this.state.fotos.map(foto =>
          foto.id === fotoAtualizada.id ?
            fotoAtualizada : foto
        )

        this.setState({
          fotos
        })
      })

    const uri = `http://192.168.0.137:8080/api/fotos/${idFoto}/like`

    AsyncStorage.getItem('usuario')
      .then(usuarioString => JSON.parse(usuarioString))
      .then(usuario => {

        const request = {
          method: 'POST',

          headers: new Headers({
            "X-AUTH-TOKEN": usuario.token
          })
        }
        return request
      })
      .then(request => fetch(uri, request))
  }


  addComentario = (idFoto, valorComentario) => {
    if (valorComentario === '')
      return

    const foto = this.state.fotos.find(foto => {
      return foto.id === idFoto
    })

    const uri = `http://192.168.0.137:8080/api/fotos/${idFoto}/comment`

    AsyncStorage.getItem('usuario')
      .then(usuario => JSON.parse(usuario))
      .then(usuario => {

        const request = {
          method: 'POST',
          body: JSON.stringify({
            texto: valorComentario
          }),
          headers: new Headers({
            "X-AUTH-TOKEN": usuario.token,
            "Content-type": "application/json"
          })
        }
        return request
      })
      .then(request => fetch(uri, request))
      .then(response => response.json() )
      .then(comentario => [ ...foto.comentarios, comentario ])
      .then(novaLista => {
        const fotoAtualizada = {
          ...foto,
          comentarios: novaLista
        }
    
        const fotos = this.state.fotos.map(foto =>
          foto.id === fotoAtualizada.id ?
            fotoAtualizada : foto
        )
    
        this.setState({
          fotos
        })
      })
  }

  render() {

    return (

      <FlatList
        data={this.state.fotos}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>

          <Post foto={item}
            likeCallback={this.like}
            comentarioCallback={this.addComentario} />
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
  }
});