/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import axios from 'axios';
// import CopyToClipboard from 'react-copy-to-clipboard';
// import Clipboard from '@react-native-clipboard/clipboard';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  Clipboard,
} from 'react-native';

type IList = {
  id: string;
  text: string;
  avatar: string;
  role: string;
};

const listAPI = 'https://663c458417145c4d8c35a0c4.mockapi.io/api/message';

function App(): React.JSX.Element {
  const [listItimes, setListItems] = useState<IList[]>([]);
  const [text, setText] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<IList>();
  const [textCopy, setTextCopy] = useState<string>('');
  const [textReply, setTextReply] = useState<string>('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(listAPI); //await đợi xử lý hết mơi chạy qua dòng tiếp theo
        setListItems(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [listItimes]);

  const send = async () => {
    if (!text) {
      Alert.alert('Thông báo', 'Bạn chưa viết nội dung');
      return;
    }
    if (selectedItem?.text === text) {
      Alert.alert('Thông báo', 'Bạn chưa sửa tin nhắn');
      return;
    }
    if (selectedItem) {
      try {
        const response = await axios.put(`${listAPI}/${selectedItem.id}`, {
          text: text,
          avatar: 'DaiDien.png',
          role: 'me',
        });
        const updatedList = listItimes.map(item =>
          item.id === selectedItem.id ? response.data : item,
        );
        setListItems(updatedList);
        setText('');
        setSelectedItem(undefined);
      } catch (error) {
        Alert.alert('Error', 'Failed to update message.');
      }
    } else {
      const newText = {
        id: (listItimes.length + 1).toString(),
        text: text,
        avatar: 'DaiDien.png',
        role: 'me',
      };
      try {
        const response = await axios.post(listAPI, newText);
        setListItems([...listItimes, response.data]);
        console.log(response.data);
        setText('');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  const openModal = item => {
    if (item.role === 'you') {
      return;
    }
    // setText(item.text);
    setTextCopy(item.text);
    setSelectedItem(item);
    setModalVisible(true);
  };

  const deleteItem = () => {
    Alert.alert('Xác nhận xóa', 'Bạn có chắc muốn xóa tin nhắn này không', [
      {
        text: 'Hủy',
        style: 'cancel',
      },
      {
        onPress: async () => {
          const response = await axios.delete(
            `${listAPI}/${selectedItem.id}`,
            selectedItem,
          );
          const updatedList = listItimes.map(item =>
            item.id === selectedItem?.id ? response.data : item,
          );
          setListItems(updatedList);
          setSelectedItem(undefined);
          setModalVisible(false);
        },
      },
    ]);
  };

  const update = () => {
    if (selectedItem) {
      setModalVisible(false);
      setText(selectedItem?.text);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const copy = () => {
    Clipboard.setString(textCopy);
    setModalVisible(false);
  };
  const reply = () => {
    setTextReply
  };

  const ItemView = ({item}) => {
    return (
      <View style={[styles.item, styled.contentStyle(item.role)]}>
        {item.role === 'you' && (
          <Image source={{uri: item.avatar}} style={styles.chatAvata} />
        )}
        <TouchableOpacity
          // value={text}
          // onChangeText={setText}
          style={[styles.textItem, styled.colerText(item.role)]}
          onPress={() => openModal(item)}>
          <Text style={styled.chatText(item.role)}>{item.text}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tatile}>
        <Image source={require('./src/MuiTen.png')} style={styles.image} />
        <Image source={require('./src/DaiDien.png')} style={styles.avatar} />
        <Text style={styles.textTatil}>Dr. Dave</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false} //tắt thanh trượt
        style={styles.flatList}
        data={listItimes}
        renderItem={ItemView}
        keyExtractor={item => item.id} //lấy theo id của item
      />
      <View style={styles.input}>
        <TextInput
          placeholder="Type hear ..."
          value={text}
          onChangeText={setText}
          style={styles.textInput}
        />
        <Image source={require('./src/acong.png')} style={styles.avatarACong} />
        <TouchableOpacity style={styles.lastImage} onPress={send}>
          <Image source={require('./src/send.png')} />
        </TouchableOpacity>
      </View>
      <Modal
        onRequestClose={() => setModalVisible(false)} // đóng modal
        visible={modalVisible} // Trạng thái hiển thị của modal
        animationType="slide" // Kiểu hoạt hình khi xuất hiện
        transparent={true} // Nền trong suốt
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.viewModal}>
              <Text style={styles.text}></Text>
              <Text style={styles.textSelect}>{textCopy}</Text>
              <View style={styles.copyInput}>
                <Text style={styles.copy}>Copy</Text>
                <TouchableOpacity onPress={copy}>
                  <Image source={require('./src/copy.png')} style={styles.imgCopy}/>
                </TouchableOpacity>
              </View>
              <View style={styles.copyInput}>
                <Text style={styles.copy}>Reply</Text>
                <TouchableOpacity onPress={reply}>
                  <Image source={require('./src/reply.png')} style={styles.imgCopy}/>
                </TouchableOpacity>
              </View>
              <View style={styles.copyInput}>
                <Text style={styles.copy}>Forward</Text>
                <TouchableOpacity>
                  <Image source={require('./src/forword.png')} style={styles.imgCopy}/>
                </TouchableOpacity>
              </View>
              <View style={styles.copyInput}>
                <Text style={styles.copy}>Delete</Text>
                <TouchableOpacity>
                  <Image source={require('./src/delete.png')} style={styles.imgCopy}/>
                </TouchableOpacity>
              </View>
              <View style={styles.modalButton}>
                <TouchableOpacity style={styles.buttonModal} onPress={update}>
                  <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonModal}
                  onPress={deleteItem}>
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
  },
  tatile: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 40,
    width: '100%',
  },
  image: {
    marginLeft: 20,
  },
  avatar: {
    marginLeft: 15,
  },
  textTatil: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  item: {
    flexDirection: 'row',
    width: 'auto',
  },
  textItem: {
    maxWidth: '70%',
    width: 'auto',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    marginLeft: 5,
    marginTop: 10,
    borderRadius: 10,
  },
  chatAvata: {
    width: 30,
    height: 30,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 30,
  },
  input: {
    flexDirection: 'row',
    margin: 30,
    height: 48,
    width: '80%',
    alignItems: 'center',
    backgroundColor: '#E4E3E8',
    borderRadius: 20,
    justifyContent: 'space-between',
  },
  textInput: {
    flex: 1,
  },
  avatarACong: {
    width: 20,
    height: 20,
    marginRight: 20,
  },
  lastImage: {
    width: 20,
    height: 20,
    marginRight: 25,
    marginBottom: 10,
  },
  flatList: {
    width: '80%',
  },
  text: {
    backgroundColor: 'rgba(189, 189, 189, 1)',
    borderRadius: 10,
    width: 70,
    height: 10,
    alignItems: 'center',
    marginBottom: 24,
  },
  textSelect: {
    height: 'auto',
    paddingHorizontal: 19,
    borderRadius: 10,
    backgroundColor: 'rgba(189, 189, 189, 0.34)',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  viewModal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    height: 'auto',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    position: 'absolute',
    bottom: 0,
    marginBottom: 34,
    alignItems: 'center',
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
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
  },
  copyInput:{
    flexDirection: 'row',
    alignItems: 'center',
    // border
    borderBottomColor: '#D4DFE3',
    borderBottomWidth:1,
    justifyContent: 'space-between',
    width : '100%',
    marginTop: 24,
  },
  copy: {

  },
  imgCopy: {},
});

const styled = {
  contentStyle: (role: string) => ({
    marginLeft: role === 'you' ? 0 : 'auto',
  }),
  colerText: (role: string) => ({
    backgroundColor: role === 'you' ? '#D4DFE3' : '#69CCEC',
  }),
  chatText: (role: string) => ({
    color: role === 'you' ? '#828282' : '#FFFFFF',
  }),
};

export default App;
