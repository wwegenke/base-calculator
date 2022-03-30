import React from 'react';
import { View, ScrollView } from 'react-native';
import Key from './Key';
import { allDigits, convertBase } from '../scripts/calculator';

export default function Kaypad(props) {
    
    const styles = {
        keypad: {
            flex: 1,
            alignContent: 'stretch',
            ...props.style,
            ...(props.styles ? props.styles.keypad : null),
        },
        keys: {
            flex: 1,
            padding: 5,
            justifyContent: 'center',
            flexWrap: 'wrap',
            flexDirection: 'row',
        },
    };

    const keyStyles = {
        key: {
            height: 70,
            width: 70,
            borderRadius: 35,
        },
        keyText: {
            fontSize: 32,
        },
    };

    const onKeyPress = (e, value) => {
        props.onKeyPress(e, value);
    };

    let keysJSX = [];
    for (let i = 0; i < props.base; i++) {
        //const d = convertBase(i.toString(), 10, props.base);
        const d = allDigits[i];
        keysJSX.push((<Key key={i} text={d} value={d} styles={keyStyles} onPress={onKeyPress} />));
    }
    keysJSX.push((<Key key="." text="." value="." styles={keyStyles} onPress={onKeyPress} />));

    return (
        <ScrollView style={styles.keypad}>
            <View style={styles.keys}>
                {keysJSX}
            </View>
        </ScrollView>
    );
}