import React from 'react';
import { StyleSheet } from 'react-native';
import View from './View';

type ComponentProps = { bigger?: Boolean; };

const Component: React.FC<ComponentProps> = ({ bigger }) => (
    <View style={styles.container}>
        <View style={[styles.flagPole, (bigger) ? (styles.flagPoleBigger) : (null)]} />
        <View style={[styles.flag, (bigger) ? (styles.flagBigger) : (null)]} />
        <View style={[styles.base1, (bigger) ? (styles.base1Bigger) : (null)]} />
        <View style={[styles.base2, (bigger) ? (styles.base2Bigger) : (null)]} />
    </View>
);

const styles = StyleSheet.create({
    container: { marginTop: 2 },
    flagPole: {
        position: 'absolute',
        height: 14,
        width: 2,
        backgroundColor: '#222',
        marginLeft: 9
    },
    flag: {
        position: 'absolute',
        height: 5,
        width: 6,
        backgroundColor: '#F22',
        marginLeft: 3
    },
    base1: {
        position: 'absolute',
        height: 2,
        width: 6,
        backgroundColor: '#222',
        marginLeft: 7,
        marginTop: 10
    },
    base2: {
        position: 'absolute',
        height: 2,
        width: 10,
        backgroundColor: '#222',
        marginLeft: 5,
        marginTop: 12
    },
    flagBigger: {
        height: 10,
        width: 14,
        marginLeft: 3
    },
    base1Bigger: {
        height: 4,
        width: 12,
        marginTop: 20,
        marginLeft: 12
    },
    base2Bigger: {
        height: 4,
        width: 20,
        marginTop: 8,
        marginLeft: 24
    },
    flagPoleBigger: {
        height: 28,
        width: 4,
        marginLeft: 16
    }
});

export default Component;