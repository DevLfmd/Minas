import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Flag from './Flag';

type ComponentProps = {
    flagsLeft: number;
    onNewGame: () => void;
    onFlagPress: () => void;
};

const Component: React.FC<ComponentProps> = ({ 
    flagsLeft,
    onNewGame,
    onFlagPress
}) => (
    <View style={styles.container}>
        <View style={styles.flagContainer}>
            <TouchableOpacity 
                style={styles.flagButton}
                onPress={() => onFlagPress()}
            >
                <Flag bigger />
            </TouchableOpacity>
            <Text style={styles.flagsLeft}>{flagsLeft}</Text>
        </View>
        <TouchableOpacity
            style={styles.button}
            onPress={() => onNewGame()}
        >
            <Text style={styles.buttonLabel}>
                Novo Jogo
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.buttonDifficult}
            onPress={() => onFlagPress()}
        >
            <Text style={styles.buttonLabel}>
                Dificuldade
            </Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#EEE',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: 20,
        paddingHorizontal: 20
    },
    flagContainer: {
        flexDirection: 'row'
    },
    flagButton: {
        marginTop: 10,
        minWidth: 30
    },
    flagsLeft: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingTop: 5,
        marginLeft: 20
    },
    button: {
        backgroundColor: '#999',
        padding: 5
    },
    buttonLabel: {
        fontSize: 20,
        color: '#DDD',
        fontWeight: 'bold'
    },
    buttonDifficult: {
        backgroundColor: '#eb5352',
        padding: 5
    }
});

export default Component;