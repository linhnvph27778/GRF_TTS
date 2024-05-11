/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';

const dummyArray = [
  {
    id: 0,
    title: 'Bộ sản phẩm sạc nhanh Bagi PD20W Type-C',
    price: '50000',
    image:
      'https://product.hstatic.net/200000410665/product/dsc00634_1_1_583e094cd20740228efed22b649d5d04.jpg',
  },
  {
    id: 1,
    title: 'Okay noted on this. Thanks',
    price: '70000',
    image:
      'https://product.hstatic.net/1000271846/product/01_0f856af1e3c545969ee3ebdc0d152623_master.png',
  },
];

function App(): React.JSX.Element {
  const [listItimes, setListItems] = useState(dummyArray);
  const formatCurrency = amount => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };
  type IList = {
    id: number;
    title: string;
    price: string;
    image: string;
  };
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<IList>();
  const [productName, setProductName] = useState<string>('');
  const [productPrice, setProductPrice] = useState<string>('');
  const [productImage, setProductImage] = useState<string>('');

  const openModal = item => {
    setSelectedItem(item);
    setProductName(item.title);
    setProductPrice(item.price);
    setProductImage(item.image);
    setModalVisible(true);
    console.log(selectedItem);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  const saveModal = () => {
    if (!productName || !productPrice || !productImage) {
      Alert.alert('Thông báo', 'Điền đầy đủ thông tin');
      return;
    }
    if (selectedItem?.id) {
      const updatedList = listItimes.map(item =>
        item.id === selectedItem.id
          ? {
              id: selectedItem.id,
              title: productName,
              price: productPrice,
              image: productImage,
            }
          : item,
      );
      setListItems(updatedList);
    } else {
      const newItem = {
        id: (listItimes.length + 1).toString(),
        title: productName,
        price: productPrice,
        image: productImage,
      };
      setListItems([...listItimes, newItem]);
    }
    setProductName('');
    setProductPrice('');
    setProductImage('');
    setModalVisible(false);
  };
  const deleteProduct = item => {
    Alert.alert(
      'Xác nhận xóa',
      `Bạn có chắc muốn xóa sản phẩm ${item.title}?`,
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            const updatedList = listItimes.filter(i => i.id !== item.id);
            setListItems(updatedList);
          },
        },
      ],
      {cancelable: true},
    );
  };
  const [arrayChecked, setArrayChecked] = React.useState([]);
  const handleCheckboxToggle = itemId => {
    let updatList = [...arrayChecked];
    if (updatList.includes(itemId)) {
      updatList = updatList.filter(id => id !== itemId);
    } else {
      updatList.push(itemId);
    }
    setArrayChecked(updatList);
  };

  const handleChecbox = () => {
    if (arrayChecked.length === listItimes.length) {
      setArrayChecked([]);
    } else {
      const allItemIds = listItimes.map(item => item.id);
      setArrayChecked(allItemIds);
    }
  };

  const ItemView = ({item}) => {
    return (
      <View style={styles.item}>
        <Image source={{uri: item.image}} style={styles.image} />
        <View style={styles.textContainer}>
          <View style={styles.flexView}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <TouchableOpacity onPress={() => deleteProduct(item)}>
              <Image
                style={styles.imageIcon}
                source={require('./src/Tim.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCheckboxToggle(item.id)}>
              {arrayChecked.includes(item.id) ? (
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
          </View>
          <View style={styles.priceView}>
            <Text style={styles.priceText}>{formatCurrency(item.price)}</Text>
            <Text style={styles.subpriceText}>{formatCurrency(500000)}</Text>
          </View>
          <View style={styles.flexView}>
            <Text style={styles.saledText}>Đã bán 22</Text>
            <TouchableOpacity onPress={() => openModal(item)}>
              <Image
                style={styles.imageIcon}
                source={require('./src/GioHang.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.titlle}>
        <Image source={require('./src/Back.png')} style={styles.icon} />
        <Text style={styles.text}>Sản phẩm yêu thích</Text>
        <TouchableOpacity onPress={handleChecbox}>
          {arrayChecked.length === listItimes.length ? (
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
      </View>
      <FlatList
        data={listItimes}
        renderItem={ItemView}
        keyExtractor={item => item.id}
      />
      <View>
        <TouchableOpacity style={styles.button} onPress={openModal}>
          <Text style={styles.buttonText}>Thêm Sản Phẩm</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={modalVisible} // Trạng thái hiển thị của modal
        animationType="slide" // Kiểu hoạt hình khi xuất hiện
        transparent={true} // Nền trong suốt
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Thêm Sản Phẩm</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Tên sản phẩm"
              value={productName}
              onChangeText={setProductName}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Giá sản phẩm"
              keyboardType="numeric"
              value={productPrice}
              onChangeText={setProductPrice}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Đường dẫn ảnh"
              value={productImage}
              onChangeText={setProductImage}
            />
            <View style={styles.modalButton}>
              <TouchableOpacity style={styles.buttonModal} onPress={closeModal}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonModal} onPress={saveModal}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
  },
  titlle: {
    flexDirection: 'row',
    paddingTop: 10,
    width: '100%',
    height: 65,
    backgroundColor: '#FFC300',
    alignItems: 'center',
  },
  icon: {
    margin: 30,
  },
  viewImage: {
    width: '30%',
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 24,
    marginRight: 15,
  },
  item: {
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    borderStyle: 'dotted',
  },
  image: {
    width: '34%',
    height: '80%',
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
  flexView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  priceText: {
    fontSize: 16,
    color: 'red',
  },
  subpriceText: {
    fontSize: 10,
    color: 'gray',
    textDecorationLine: 'line-through',
    marginLeft: 15,
  },
  saledText: {
    fontWeight: 'light',
  },
  button: {
    margin: 30,
    backgroundColor: '#FFC300',
    padding: 10,
    borderRadius: 20,
    width: 300,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
  },
  imageTrue: {
    height: 20,
    width: 20,
  },
  //modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    height: 400,
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  textInput: {
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
    borderBottomColor: 'gray',
    marginTop: 20,
    padding: 5,
    width: '100%',
  },
  modalButton: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonModal: {
    margin: 10,
    backgroundColor: '#FFC300',
    padding: 10,
    borderRadius: 20,
    width: '30%',
  },
  // checkbox: {
  //   width: 50,
  //   height: 50,
  //   alignSelf: 'center',
  //   marginLeft: 30,
  // },
});

export default App;
