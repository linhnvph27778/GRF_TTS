/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import React from 'react';
import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {} from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const handleRegister = () => {
    if (!emailOrPhone || !password || !confirmPassword || !verificationCode) {
      Alert.alert('Thông báo', 'Điền đầy đủ thông tin');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Thông báo', 'Nhập lại mật khẩu');
      return;
    }
    Alert.alert('Thông báo', 'Thành công');
  };
  return (
    <SafeAreaView style={styles.viewAll}>
      <Text style={styles.title}>Đăng Ký</Text>
      <View style={styles.input}>
        <Image source={require('./src/anh1.png')} style={styles.image} />
        <TextInput
          placeholder="Email hoặc số điện thoại"
          value={emailOrPhone}
          onChangeText={setEmailOrPhone}
        />
      </View>
      <View style={styles.input}>
        <Image source={require('./src/Key.png')} style={styles.image} />
        <TextInput
          placeholder="Mật khẩu"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.lastImage} onPress={toggleShowPassword}>
          <Image source={require('./src/See.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.input}>
        <Image source={require('./src/Key.png')} style={styles.image} />
        <TextInput
          placeholder="Nhập lại mật khẩu"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>
      <View style={styles.viewVerificationCode}>
        <View style={styles.VerificationCode}>
          <TextInput
            placeholder="Nhập mã xác minh"
            value={verificationCode}
            onChangeText={setVerificationCode}
            keyboardType= 'numeric'
            maxLength={4}
          />
        </View>
        <Text style={styles.text}>Gửi lại</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.viewText}>
        <Text>
          Tôi đã có tài khoản?
          <Text style={styles.lettersInside}>Đăng nhập</Text>
        </Text>
      </View>
      <View style={styles.viewNote}>
        <Text style={styles.note}>Lưu ý</Text>
      </View>
      <Text style={styles.footerText}>
        Khi bạn nhấn vào đăng ký là bạn đã chấp thuận
        <Text style={styles.lettersInside}> chính sách bảo mật </Text>
        của chúng tôi
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewAll: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
    paddingHorizontal: 38,
  },
  title: {
    marginTop: 90,
    color: '#FFC300',
    fontSize: 28,
    fontWeight: 'bold',
  },
  input: {
    flexDirection: 'row',
    marginTop: 47,
    height: 53,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
  },
  image: {
    margin: 10,
  },
  lastImage: {
    position: 'absolute',
    right: 10,
    margin: 10,
  },
  viewVerificationCode: {
    flexDirection: 'row',
    marginTop: 27,
    width: '100%',
  },
  VerificationCode: {
    alignItems: 'center',
    height: 40,
    width: '80%',
    paddingHorizontal: 10,
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
  },
  text: {
    margin: 10,
    width: '20%',
    color: '#FFC300',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#FFC300',
    padding: 10,
    borderRadius: 20,
    width: 280,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
  },
  viewText: {
    marginTop: 27,
  },
  lettersInside: {
    marginTop: 18,
    fontWeight: 'bold',
    color: '#FFC300',
  },
  viewNote: {
    marginTop: 35,
    width: '100%',
  },
  note: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'left',
  },
  footerText: {
    marginTop: 22,
    fontSize: 11,
    width: '100%',
  },
});

export default App;
