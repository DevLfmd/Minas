/**
 * Tabuleiro
 */
import React from 'react';
import { StyleSheet } from 'react-native';
import { TBoard } from '../Utils/gameTypes';
import View from './View';
import Field from './Field';

type MineFieldProps = {
    board: TBoard[][];
    openField: (r: number, c: number) => void;
    onSelectField: (r: number, c: number) => void;
};

const Component: React.FC<MineFieldProps> = ({ board, openField, onSelectField }) => (
    <View style={styles.container}>
        {board?.map((row: any, r:number) => {
            const columns = row.map((field: any, c: number) => (
                <Field 
                    onPress={() => openField(r, c)}
                    onLongPress={() => onSelectField(r, c)}
                    {...field} 
                    key={c} 
                />
            ));
            return (
                <View key={r} style={{flexDirection: 'row'}}>
                    {columns}
                </View>
            );
        })}
    </View>
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEE'
    }
});

export default Component;