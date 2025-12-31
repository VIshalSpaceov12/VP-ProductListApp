import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {ProductScreen} from './src/screens/ProductScreen';
import { colors } from './src/theme';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
        <ProductScreen />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
