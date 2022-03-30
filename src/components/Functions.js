import React from 'react';
import { View, ScrollView } from 'react-native';
import Key from './Key';

export default function Functions(props) {
    
    const styles = {
        functions: {
            flex: 1,
            alignContent: 'stretch',
            ...props.style,
            ...(props.styles ? props.styles.functions : null),
        },
        keysView: {
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
            backgroundColor: '#007a7e',
            ...(props.keyStyles ? props.keyStyles.key : null),
        },
        keyText: {
            fontSize: 32,
            ...(props.keyStyles ? props.keyStyles.keyText : null),
        },
    };

    const onKeyPress = (e, value) => {
        props.onKeyPress(e, value);
    };

    return (
        <ScrollView style={styles.keypad}>
            <View style={styles.keysView}>
                <Key text="π" value="π" styles={keyStyles} onPress={onKeyPress} />
                <Key text="e" value="e" styles={keyStyles} onPress={onKeyPress} />
                <Key text="%" value="%" styles={keyStyles} onPress={onKeyPress} />
                <Key text="sin" value="sin(" styles={keyStyles} onPress={onKeyPress} />
                <Key text="cos" value="cos(" styles={keyStyles} onPress={onKeyPress} />
                <Key text="tan" value="tan(" styles={keyStyles} onPress={onKeyPress} />
            </View>
        </ScrollView>
    );
}