import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

export default class Likes extends Component {

    carregaIcon(likeada) {
        return likeada ?
            require('../../resources/img/s2-checked.png')
            : require('../../resources/img/s2.png')
    }

    exibeLikes(likers) {
        
        if (likers.length <= 0)
            return

        return (
            <Text style={styles.curtidas}>
                {likers.length} curtidas
            </Text>
        )
    }

    render() {
        const { likeCallback, foto } = this.props

        return (
            
            <View>

                <TouchableOpacity onPress={() => likeCallback(foto.id)}>
                    <Image source={this.carregaIcon(foto.likeada)}
                        style={styles.likeButton} />
                </TouchableOpacity>

                {this.exibeLikes(foto.likers)}

            </View>
        )
    }
}

const styles = StyleSheet.create({
    likeButton: {
        width: 40,
        height: 40
    },
    curtidas: {
        fontWeight: 'bold',
        marginBottom: 10
    },
})