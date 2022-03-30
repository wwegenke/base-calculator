import React, { useEffect, useRef } from 'react';
import { BackHandler, ScrollView, View } from 'react-native';
import HistoryItem from './HistoryItem';
import Command from './Command';

export default function History(props) {
    const scrollEl = useRef(null);

    useEffect(() => {
        console.log(scrollEl);
        scrollEl.current.scrollToEnd();

        BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        return () => BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    }, []);

    const handleBackButton = () => {
        props.hideHistory();
        return true;
    };

    const styles = {
        commands: {
            height: 62,
            padding: 6,
            flexDirection: 'row',
            alignItems: 'center',
            ...(props.styles ? props.styles.command : null),
        },
        history: {
            flex: 1,
            alignContent: 'stretch',
            ...props.style,
            ...(props.styles ? props.styles.history : null),
        },
        historyScroll: {
            flex: 1,
            alignContent: 'stretch',
            ...(props.styles ? props.styles.historyScroll : null),
        },
        historyView: {
            height: '100%',
            padding: 5,
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            ...(props.styles ? props.styles.historyView : null),
        },
    }

    const itemStyles = {
        historyItem: {
            ...(props.styles ? props.styles.historyItem : null),
        },
        historyItemText: {
            ...(props.styles ? props.styles.historyItemText : null),
        },
    }

    const onItemPress = (e, item) => {
        props.hideHistory();
        props.onItemPress(e, item);
    };

    const items = props.history.map((h, i) => <HistoryItem key={i} item={h} styles={itemStyles} onPress={onItemPress}/>);
    console.log(items);

    return (
        <View style={styles.history}>
            <View style={styles.commands}>
                <Command text="Back" value="back" onPress={props.hideHistory} />
                <Command text="Clear" value="clear" onPress={props.clearHistory} />
            </View>
            <ScrollView style={styles.historyScroll} ref={scrollEl}>
                <View style={styles.historyView}>
                    {items}
                </View>
            </ScrollView>
        </View>
    );
}