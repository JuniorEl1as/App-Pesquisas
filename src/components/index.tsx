import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default function Header({text}: any) {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 130,
        backgroundColor: '#0054A6',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 20,
    }
})