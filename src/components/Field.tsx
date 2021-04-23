/**
 * Campo de seleção do jogo
 */
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { params } from '../Utils/gameParams';
import View from './View';
import Text from './Text';
import Mine from './Mine';
import Flag from './Flag';

type ComponentProps = {
    mined: Boolean;
    exploded: Boolean;
    flagged: Boolean;
    opened: Boolean;
    nearMines: Number;
    onPress: () => void;
    onLongPress: () => void;
};

const Component: React.FC<ComponentProps> = ({ 
    mined, 
    opened, 
    nearMines, 
    exploded,
    flagged,
    onPress,
    onLongPress
}) => {
    const [styleField, setStyleField] = React.useState<any[]>([styles.field]);
    
    /**
     * Retorna a cor do texto 
     * do campo de acordo com
     * armadilhas próximas
     */
    const getMineTextColor = () => (
        (nearMines === 1) ? ('#2A28D7') : 
        (nearMines === 2) ? ('#2B520F') : 
        (nearMines >= 6)  ? ('#F221A9') :
        (nearMines > 2 && nearMines < 6) ? 
        ('#F9060A') : ('')
    );
    
    React.useEffect( () => {
        if(styleField.length === 1 || !opened) 
            setStyleField([...styleField, styles.regular ]);
        if(opened)
            setStyleField([...styleField, styles.opened ]);
        if(exploded)
            setStyleField([...styleField, styles.exploded]);
        if(flagged)
            setStyleField([...styleField, styles.flagged]);
    }, [opened, flagged, exploded]);

    return (
        <TouchableOpacity onPress={() => onPress()} onLongPress={() => onLongPress()}>
            <View style={styleField}>
                {(!mined && opened && nearMines > 0) ? (
                    <Text style={[styles.label, { color: getMineTextColor() }]}>
                        {nearMines}
                    </Text>
                ) : (null)}
                {(mined && opened) ? (<Mine />) : (null)}
                {(flagged && !opened) ? (<Flag />) : (null)}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    field: {
        height: params.blockSize,
        width: params.blockSize,
        borderWidth: params.borderSize
    },
    regular: {
        backgroundColor: '#999',
        borderLeftColor: '#CCC',
        borderTopColor: '#CCC',
        borderRightColor: '#333',
        borderBottomColor: '#333',
        borderWidth: params.borderSize
    },
    opened: {
        backgroundColor: '#7d7777',
        borderColor: '#777',
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        fontWeight: 'bold',
        fontSize: params.fontSize
    },
    exploded: {
        backgroundColor: '#eb5352'
    },
    flagged: {
        backgroundColor: '#FFF',
    }
});

export default Component;