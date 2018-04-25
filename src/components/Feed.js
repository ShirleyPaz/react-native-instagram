/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  FlatList
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
    // fetch('http://instalura-api.herokuapp.com/api/public/fotos/rafael')
    fetch('http://192.168.0.137:8080/api/public/fotos/rafael')
    .then(response => response.json())
    .then(json => 
      this.setState({
      fotos: json
    }))
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

    let novaLista = []

    if (!foto.likeada) {
        novaLista = [
            ...foto.likers,
            { login: 'meuUser' }
        ]
    } else {
        novaLista = foto.likers.filter(liker => {
            return liker.login !== 'meuUser'
        })
    }

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
  }


  addComentario = (idFoto, valorComentario) => {
    if (valorComentario === '')
        return
        
    const foto = this.state.fotos.find(foto => {
      return foto.id === idFoto
    })

    const novaLista = [
        ...foto.comentarios,
        {
            id: Math.random(),
            login: 'meuUsuario',
            texto: valorComentario
        }
    ]

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
}

  render() {

    return (

      <FlatList
        data={this.state.fotos}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>

          <Post foto={item}
            likeCallback={this.like}
            comentarioCallback={this.addComentario}/>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
  }
});