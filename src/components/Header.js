import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useAppContext} from '../Context/Context';
import Config from 'react-native-config';
import Icon from 'react-native-vector-icons/FontAwesome';

const Headerbar = () => {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    fetchSubcategories,
  } = useAppContext();

  const handleCategoryChange = itemValue => {
    setSelectedCategory(itemValue);
    fetchSubcategories(itemValue);
  };
  const sortedCategories = [...categories].sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  const currentCategory = categories.find(
    category => category._id === selectedCategory,
  );
  const imageUrl = currentCategory?.imageWithNameV2?.path
    ? `${Config.IMAGE_SRC_URL}/${currentCategory.imageWithNameV2?.path}`
    : null;
  return (
    <View style={styles.headerContainer}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
          <Icon name="angle-left" size={30} color="#000" />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              marginLeft: 5,
            }}>
            {imageUrl && (
              <Image
                source={{uri: imageUrl}}
                style={{width: 40, height: 40, borderRadius: 50}}
              />
            )}
            <Picker
              selectedValue={selectedCategory}
              style={{
                width: '70%',
                height: 50,
                color: '#000',
                backgroundColor: '#f8f8f8',
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#fff',
                fontWeight: 'bold',
              }}
              itemStyle={{
                fontSize: 16,
                color: '#000',
                fontWeight: '500',
                paddingVertical: 10,
              }}
              onValueChange={handleCategoryChange}>
              {sortedCategories.map(category => (
                <Picker.Item
                  key={category.id}
                  label={category.name}
                  value={category.id}
                />
              ))}
            </Picker>
          </View>
        </View>
        <Icon type="feather" name="search" size={25} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 10,
    backgroundColor: '#f8f8f8',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginHorizontal: 12,
  },
  dropdownStyle: {
    backgroundColor: '#f8f8f8',
    width: '50%',
    height: 50,
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderWidth: 0,
  },
  dropDownContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    borderRadius: 12,
    width: '50%',
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    position: 'absolute',
    zIndex: 100,
  },
  listItemContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  listItemLabel: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
  arrowIconStyle: {
    tintColor: '#333',
  },
  placeholderStyle: {
    color: '#b0b0b0',
    fontSize: 16,
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  labelStyle: {
    fontSize: 16,
    color: '#333',
  },
  selectedItemContainer: {
    backgroundColor: '#f0f0f0',
  },
  selectedItemLabel: {
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Headerbar;
