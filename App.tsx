/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect, useRef, useCallback} from 'react';
import type {PropsWithChildren} from 'react';
import axios from 'axios';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
  TextInput,
} from 'react-native';

type IList = {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  countQuantity: number;
  checked: boolean;
};

const dummyArray = [
  {
    id: '0',
    title: 'Bộ sản phẩm sạc nhanh Bagi PD20W Type-C',
    price: 50000,
    image:
      'https://product.hstatic.net/1000271846/product/01_0f856af1e3c545969ee3ebdc0d152623_master.png',
    quantity: 3,
    countQuantity: 0,
    checked: false,
  },
  {
    id: '1',
    title: 'Do dung cho tre em',
    price: 70000,
    image:
      'https://product.hstatic.net/1000271846/product/01_0f856af1e3c545969ee3ebdc0d152623_master.png',
    quantity: 7,
    countQuantity: 0,
    checked: false,
  },
];

function App(): React.JSX.Element {
  const [listItimes, setListItems] = useState<IList[]>(dummyArray);
  const [listChecked, setListChecked] = useState<boolean>(false);
  const [totalMoney, setTotalMoney] = useState<number>(0);
  const [testSearch, setTestSearch] = useState<string>('');
  const formatCurrency = amount => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const handleCheckboxToggle = itemId => {
    const updatedProducts = listItimes.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          checked: !item.checked,
        };
      } else {
        return item;
      }
    });
    setListItems(updatedProducts);
  };

  const handleCheckbox = () => {
    const updatedProducts = listItimes.map(item => ({
      ...item,
      checked: !listChecked,
    }));
    setListItems(updatedProducts);
  };

  const subtract = itemId => {
    const updatedProducts = listItimes.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          countQuantity: item.countQuantity - 1,
        };
      } else {
        return item;
      }
    });
    setListItems(updatedProducts);
  };
  const add = itemId => {
    const updatedProducts = listItimes.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          countQuantity: item.countQuantity + 1,
        };
      } else {
        return item;
      }
    });
    setListItems(updatedProducts);
  };

  const searchProduct = (searchText: string) => {
    const filteredItems = listItimes.filter(item =>
      item.title.toLowerCase().includes(searchText.toLowerCase()),
    );
    setListItems(filteredItems);
    if(searchText === '') 
      setListItems(dummyArray)
  };

  useEffect(() => {
    let totalPrice = 0;
    listItimes.forEach(item => {
      if (item.checked) {
        totalPrice += item.price * item.countQuantity;
      }
    });
    setTotalMoney(totalPrice);
    const allCheck = listItimes.every(product => product.checked);
    if (allCheck) {
      setListChecked(true);
    } else {
      setListChecked(false);
    }
  }, [listItimes]);
  const ItemView = ({item}) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={() => handleCheckboxToggle(item.id)}>
          {item.checked ? (
            <Image
              style={styles.imageTrue}
              source={require('./src/true1.png')}
            />
          ) : (
            <Image
              style={styles.imageTrue}
              source={require('./src/false.png')}
            />
          )}
        </TouchableOpacity>
        <Image style={styles.imageProduct} source={{uri: item.image}} />
        <View style={styles.textContainer}>
          <Text style={styles.productTitle}>{item.title}</Text>
          <View style={styles.priceView}>
            <Text style={styles.subpriceText}>{formatCurrency(500000)}</Text>
            <Text style={styles.priceText}>{formatCurrency(item.price)}</Text>
          </View>
          <View style={styles.inputQuantity}>
            <TouchableOpacity onPress={() => subtract(item.id)}>
              <Text style={styles.subtract}>-</Text>
            </TouchableOpacity>
            <Text style={styles.textQuantity}>{item.countQuantity}</Text>
            <TouchableOpacity onPress={() => add(item.id)}>
              <Text style={styles.subtract}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.viewTatile}>
        <Image source={require('./src/Back.png')} style={styles.iconBack} />
        <Text style={styles.textTatle}>Giỏ hàng</Text>
      </View>
      <View style={styles.optionAll}>
        <TouchableOpacity onPress={handleCheckbox}>
          {listChecked ? (
            <Image
              style={styles.imageTrue}
              source={require('./src/true1.png')}
            />
          ) : (
            <Image
              style={styles.imageTrue}
              source={require('./src/false.png')}
            />
          )}
        </TouchableOpacity>
        <Text style={styles.textOptionAll}>Sản phẩm</Text>
        <Text style={styles.textDeleteOptionAll}>Xóa</Text>
      </View>
      <TouchableOpacity style={styles.viewSearch}>
        <TextInput
          onChangeText={text => {
            setTestSearch(text);
            searchProduct(text);
          }}
          placeholder="Search hear ..."
          value={testSearch}
          style={styles.textInput}
        />
      </TouchableOpacity>
      <FlatList
        data={listItimes}
        renderItem={ItemView}
        keyExtractor={item => item.id}
      />
      <View style={styles.viewFooted}>
        <Text style={styles.textFooted}>Tổng thanh toán: </Text>
        <Text style={styles.totalMoney}>{formatCurrency(totalMoney)}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Mua hàng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    backgroundColor: 'white',
    width: '100%',
  },
  viewTatile: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    width: '100%',
    height: 50,
  },
  iconBack: {
    marginLeft: 30,
  },
  textTatle: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 70,
  },
  viewSearch: {
    paddingHorizontal: 10,
    margin: 10,
    width: '80%',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#E4E3E8',
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  textInput: {
    flex: 1,
  },
  optionAll: {
    flexDirection: 'row',
    marginTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 3,
    borderBottomColor: '#C4C4C4',
    borderStyle: 'solid',
    alignItems: 'center',
    width: '100%',
  },
  imageTrue: {
    marginLeft: 20,
    height: 20,
    width: 20,
  },
  textOptionAll: {
    fontSize: 18,
    marginLeft: 20,
  },
  textDeleteOptionAll: {
    fontSize: 18,
    fontWeight: 'black',
    marginLeft: 140,
  },
  item: {
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  imageProduct: {
    margin: 10,
    borderBlockColor: 'red',
    width: 100,
    height: 120,
  },
  textContainer: {
    flexDirection: 'column',
    width: '60%',
    marginLeft: 10,
  },
  productTitle: {
    fontWeight: 'bold',
    width: '70%',
  },
  imageIcon: {
    margin: 10,
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  priceText: {
    fontSize: 12,
    color: 'red',
    marginLeft: 15,
  },
  subpriceText: {
    fontSize: 12,
    color: 'gray',
    textDecorationLine: 'line-through',
  },
  inputQuantity: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 90,
    height: 20,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'gray',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
  },
  textQuantity: {
    height: 20,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  subtract: {
    borderColor: 'gray',
  },
  viewFooted: {
    width: '100%',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 39,
  },
  button: {
    backgroundColor: '#FFC300',
    width: 78,
    height: 39,
    alignItems: 'center',
  },
  buttonText: {
    marginTop: 8,
    fontSize: 16,
    color: 'white',
  },
  textFooted: {
    textAlign: 'center',
    width: 70,
    fontSize: 12,
  },
  totalMoney: {
    margin: 5,
    color: 'red',
    fontSize: 18,
  },
});

export default App;
