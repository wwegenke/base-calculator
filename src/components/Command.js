import React from 'react';
import { Pressable, Text, Vibration } from 'react-native';

export default function Commad(props) {

    const styles = {
        command: {
            height: 50,
            width: 50,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
            ...props.style,
            ...(props.styles ? props.styles.command : null),
        },
        text: {
            fontSize: 12,
            color: '#ddd',
            ...(props.styles ? props.styles.text : null),
        }
    }

    const onPress = (e) => {
        Vibration.vibrate(1);
        props.onPress(e, props.value);
    }

    const onLongPress = (e) => {
        Vibration.vibrate(10);
        props.onLongPress(e, props.value);
    }

    return (
        <Pressable
            style={styles.command}
            android_ripple={{color: 'rgba(150,150,150,0.4)', borderless: true, radius: styles.command.borderRadius}}
            hitSlop={{top: 10, bottom: 10, right: 10, left: 10}}
            pressRetentionOffset={{top: 20, bottom: 20, left: 20, right: 20}}
            onPress={onPress}
            onLongPress={props.onLongPress ? onLongPress : null}>
            <Text style={styles.text}>{props.text}</Text>
        </Pressable>
    );
}