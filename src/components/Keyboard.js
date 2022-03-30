import React, { useState } from 'react';
import { View } from 'react-native';
import Keypad from './Keypad';
import Key from './Key';
import Functions from './Functions';

export default function Keyboard(props) {
    const [functionsVisible, setFunctionsVisible] = useState(false);

    const styles = {
        keyboard: {
            flexDirection: 'row',
            alignContent: 'stretch',
            backgroundColor: '#00676a',
            ...props.style,
            ...(props.styles ? props.styles.keyboard : null),
        },
        left: {
            flex: 1,
            alignContent: 'stretch',
        },
        operatorsH: {
            height: 76,
            padding: 5,
            paddingRight: 0,
            flexDirection: 'row',
            alignItems: 'center',
        },
        keypad: {
            flex: 1,
            borderTopRightRadius: 10,
            backgroundColor: '#3a3a3a'
        },
        operatorsV: {
            width: 76,
            padding: 5,
            alignItems: 'center',
        },
    };

    const functionKeyStyles = {
        key: {
            backgroundColor: '#007a7e',
        }
    };

    const onKeyPress = (e, value) => {
        setFunctionsVisible(false);
        props.onKeyPress(e, value);
    };

    const showFunctions = () => {
        setFunctionsVisible(true);
    };

    const hideFunctions = () => {
        setFunctionsVisible(false);
    };

    const toggleFunctions = () => {
        setFunctionsVisible(!functionsVisible);
    };

    return (
        <View style={styles.keyboard}>
            <View style={styles.left}>
                <View style={styles.operatorsH}>
                    <Key text="DEL" value="del" longValue="clear" styles={{...functionKeyStyles, ...{text: {color: 'red'}}}} onPress={onKeyPress} onLongPress={onKeyPress} />
                    <Key text="f" value="f" styles={{...functionKeyStyles, ...{text: {color: 'orange', fontStyle: 'italic'}}}} onPress={toggleFunctions}/>
                    <Key text="(" value="(" styles={functionKeyStyles} onPress={onKeyPress} />
                    <Key text=")" value=")" styles={functionKeyStyles} onPress={onKeyPress} />
                </View>
                {functionsVisible ?
                    (<Functions style={styles.functions} onKeyPress={onKeyPress} />)
                    :
                    (<Keypad style={styles.keypad} base={props.base} onKeyPress={onKeyPress} />)
                }
            </View>
            <View style={styles.operatorsV}>
                <Key text="^" value="^" styles={functionKeyStyles} onPress={onKeyPress} />
                <Key text="*" value="*" styles={functionKeyStyles} onPress={onKeyPress} />
                <Key text="/" value="/" styles={functionKeyStyles} onPress={onKeyPress} />
                <Key text="+" value="+" styles={functionKeyStyles} onPress={onKeyPress} />
                <Key text="-" value="-" styles={functionKeyStyles} onPress={onKeyPress} />
                <Key text="=" value="=" styles={functionKeyStyles} onPress={onKeyPress} />
            </View>
        </View>
    );
}