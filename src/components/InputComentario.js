import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native';

export default class InputComentario extends Component {
    constructor() {
        super()
        this.state = {
            valorComentario: ''
        }
    }

    render() {
        const { comentarioCallback, idFoto} = this.props

        return (
            <View style={styles.comment}>
                <TextInput style={styles.input}
                    placeholder="Add comentário ae"
                    underlineColorAndroid="transparent"
                    ref={input => this.inputComentario = input}
                    onChangeText={texto => this.setState({ valorComentario: texto })}
                />

                <TouchableOpacity onPress={() => {
                    comentarioCallback(idFoto, this.state.valorComentario)
                    this.inputComentario.clear()
                    this.setState({valorComentario: ''})
                }}>
                    <Image style={styles.btnComment}
                        source={require('../../resources/img/send.png')} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    comment: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    input: {
        height: 40,
        fontSize: 14,
        flex: 1
    },
    btnComment: {
        height: 30,
        width: 30
    }

})