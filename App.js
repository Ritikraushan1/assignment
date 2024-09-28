// App.js
import React from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {AppProvider} from './src/Context/Context';
import Header from './src/components/Header';
import Sidebar from './src/components/Sidebar';
import MainScreen from './src/screens/MainScreen';
import {Provider} from 'react-redux';
import store from './src/redux/store';

const App = () => {
  return (
    <AppProvider>
      <SafeAreaView style={{flex: 1}}>
        <Header />
        <View style={styles.container}>
          <Sidebar />
          <Provider store={store}>
            <MainScreen />
          </Provider>
        </View>
      </SafeAreaView>
    </AppProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
});

export default App;
