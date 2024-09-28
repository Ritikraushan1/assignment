// Sidebar.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useAppContext} from '../Context/Context';
import Config from 'react-native-config';

const Sidebar = () => {
  const {
    subcategories,
    selectedSubcategory,
    setSelectedSubcategory,
    fetchProducts,
  } = useAppContext();

  const handleSubcategoryChange = itemValue => {
    setSelectedSubcategory(itemValue);
    fetchProducts(itemValue);
  };

  return (
    <View style={styles.sidebarContainer}>
      <ScrollView
        style={{
          marginHorizontal: 5,
          marginVertical: 10,
          paddingBottom: 20,
          marginBottom: 10,
        }}
        persistentScrollbar={true}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}>
        {subcategories.map((item, index) => (
          <View key={index}>
            <TouchableOpacity
              onPress={() => handleSubcategoryChange(item)}
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                marginVertical: 10,
                paddingBottom: 12,
              }}>
              <Image
                source={{
                  uri: `${Config.IMAGE_SRC_URL}/${item.image.path}`,
                }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                }}
              />
              <Text style={{marginHorizontal: 8, textAlign: 'center'}}>
                {item.name}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebarContainer: {
    width: '25%',
    backgroundColor: '#f0f0f0',
  },
  sidebarText: {
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
});

export default Sidebar;
