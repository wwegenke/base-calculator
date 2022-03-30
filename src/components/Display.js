import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Text } from 'react-native';
import History from './History';
import HistoryItem from './HistoryItem';
import Command from './Command';
import { convertBase } from '../scripts/calculator';
import * as Clipboard from 'expo-clipboard';
import { Picker } from '@react-native-picker/picker';

export default function Display(props) {
    const [altResult, setAltResult] = useState('');
    const [altBase, setAltBase] = useState(16);

    useEffect(() => {
        setAltResult(convertBase(props.result, props.base, altBase));
    }, [props.result, altBase]);

    const styles = {
        display: {
            flex: 1,
            backgroundColor: '#3a3a3a',
            ...props.style,
            ...(props.styles ? props.styles.display : null),
        },
        commands: {
            height: 62,
            padding: 6,
            flexDirection: 'row',
            alignItems: 'center',
        },
        basePicker: {
            height: 50,
            width: 100,
            color: '#ddd',
            fontSize: 20,
        },
        history: {
            height: 42,
            padding: 6,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        historyText: {
            fontSize: 30,
            color: '#bbb',
        },
        expression: {
            flex: 1,
            padding: 6,
            alignItems: 'flex-end',
            justifyContent: 'center',
        },
        expressionText: {
            fontSize: 80,
            color: '#ddd',
        },
        result: {
            height: 62,
            padding: 6,
            alignItems: 'flex-end',
            justifyContent: 'center',
        },
        resultText: {
            fontSize: 40,
            color: '#ddd',
        },
        altResult: {
            height: 62,
            padding: 6,
            flexDirection: 'row',
            alignItems: 'center',
            borderTopWidth: StyleSheet.hairlineWidth,
            borderTopColor: '#ddd',
        },
        altResultTextView: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
        },
        altResultText: {
            fontSize: 40,
            color: '#bbb',
        },
        altBasePicker: {
            height: 50,
            width: 100,
            color: '#bbb',
            fontSize: 20,
        }
    };

    const onCommandPress = async (e, value) => {
        switch (value) {
            case 'swap':
                props.setBase(altBase);
                setAltBase(props.base);
                break;
            case 'copy':
                Clipboard.setString(props.expression);
                break;
            case 'paste':
                props.setExpression(await Clipboard.getStringAsync());
                break;
            case 'history':
                showHistory();
                break;
        }
    };
    
    const showHistory = () => {
        props.setHistoryVisible(true);
    };

    const hideHistory = () => {
        props.setHistoryVisible(false);
    };

    const clearHistory = () => {
        hideHistory();
        props.setHistory([]);
    }

    const latestHistoryStyles = {
        historyItem: {
            height: 42,
            padding: 6,
            paddingTop: 6,
            paddingBottom: 6,
        },
        text: {
            fontSize: 30,
            color: '#bbb',
        }
    }
    const latestHistory = props.history.slice(-1)[0];

    const onHistoryItemPress = (e, item) => {
        props.setBase(item.base);
        props.setExpression(item.expression);
    }

    const baseSelection = [];
    for (let i = 2; i <= 36; i++) {
        baseSelection.push((<Picker.Item key={i} label={i.toString()} value={i} />));
    }

    return (
        <View style={styles.display}>
            {props.historyVisible ? 
                (<History history={props.history} clearHistory={clearHistory} hideHistory={hideHistory} onItemPress={onHistoryItemPress}/>)
                :
                (<View style={{flex: 1}}>
                    <View style={styles.commands}>
                        <Picker
                            selectedValue={props.base}
                            style={styles.basePicker}
                            onValueChange={(itemValue, itemIndex) => 
                                props.setBase(itemValue)
                            }
                            dropdownIconColor="#dddddd">
                            {baseSelection}
                        </Picker>
                        <Command text="Swap" value="swap" onPress={onCommandPress} />
                        <Command text="Copy" value="copy" onPress={onCommandPress} />
                        <Command text="Paste" value="paste" onPress={onCommandPress} />
                        <Command text="History" value="history" onPress={onCommandPress} />
                    </View>
                    <View style={styles.history}>
                        {latestHistory ?
                            (<HistoryItem styles={latestHistoryStyles} item={latestHistory} onPress={showHistory} onLongPress={onHistoryItemPress}/>)
                            : null
                        }
                    </View>
                    <View style={styles.expression}>
                        <Text
                            style={styles.expressionText}
                            adjustsFontSizeToFit={true}>
                                {props.expression}
                        </Text>
                    </View>
                    <View style={styles.result}>
                        <Text
                            style={styles.resultText}
                            adjustsFontSizeToFit={true}
                            numberOfLines={1}>
                                {props.result ? '=' + props.result: null}
                        </Text>
                    </View>
                    <View style={styles.altResult}>
                        <Picker
                            selectedValue={altBase}
                            style={styles.altBasePicker}
                            onValueChange={(itemValue, itemIndex) => 
                                setAltBase(itemValue)
                            }
                            dropdownIconColor="#bbbbbb">
                            {baseSelection}
                        </Picker>
                        <View style={styles.altResultTextView}>
                            <Text
                                style={styles.altResultText}
                                adjustsFontSizeToFit={true}
                                numberOfLines={1}>
                                    {altResult ? '=' + altResult : null}
                            </Text>
                        </View>
                    </View>
                </View>)
            }
        </View>
    );
}