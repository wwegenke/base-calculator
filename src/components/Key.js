import React from 'react';
import { Pressable, Text, Vibration } from 'react-native';

export default function Key(props) {
    const styles = {
        key: {
            height: 60,
            width: 60,
            margin: 3,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#444',
            ...props.style,
            ...(props.styles ? props.styles.key : null),
        },
        text: {
            color: '#ddd',
            fontSize: 27,
            ...(props.styles ? props.styles.text : null)
        }
    };

    const onPress = (e) => {
        Vibration.vibrate(1);
        props.onPress(e, props.value);
    }

    const onLongPress = (e) => {
        Vibration.vibrate(10);
        props.onLongPress(e, props.longValue);
    }

    return (
        <Pressable
            style={styles.key}
            android_ripple={{color: 'rgba(150,150,150,0.4)', borderless: true, radius: styles.key.borderRadius}}
            hitSlop={{top: 10, bottom: 10, right: 10, left: 10}}
            pressRetentionOffset={{top: 20, bottom: 20, left: 20, right: 20}}
            onPress={onPress}
            onLongPress={props.onLongPress ? onLongPress : null}>
            <Text style={styles.text}>{props.text}</Text>
        </Pressable>
    );
}