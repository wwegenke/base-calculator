import React from 'react';
import { Pressable, Text, Vibration } from 'react-native';

export default function History(props) {
    console.log(props.item);
    const styles = {
        historyItem: {
            flex: 1,
            height: 62,
            padding: 6,
            paddingTop: 12,
            paddingBottom: 12,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            ...props.style,
            ...(props.styles ? props.styles.historyItem : null),
        },
        text: {
            fontSize: 40,
            color: '#ddd',
            ...(props.styles ? props.styles.text : null),
        }
    };

    const onPress = (e) => {
        Vibration.vibrate(1);
        props.onPress(e, props.item);
    };

    const onLongPress = (e) => {
        Vibration.vibrate(10);
        props.onLongPress(e, props.item);
    }

    return (
        <Pressable
            style={styles.historyItem}
            onPress={props.onPress ? onPress : null}
            onLongPress={props.onLongPress ? onLongPress : null}>
            <Text
                style={styles.text}
                hitSlop={{top: 10, bottom: 10, right: 10, left: 10}}
                pressRetentionOffset={{top: 20, bottom: 20, left: 20, right: 20}}
                adjustsFontSizeToFit={true}
                numberOfLines={2}>
                    {props.item.expression + '=' + props.item.result + ' [' + props.item.base + ']'}
            </Text>
        </Pressable>
    );
}