import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Index from './src';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
        <Index />
        <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3a3a3a',
  },
});
