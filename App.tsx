import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {ProductScreen} from './src/screens/ProductScreen';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <StatusBar barStyle="dark-content" />
        <ProductScreen />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
