import Taro from '@tarojs/taro'
// eslint-disable-next-line import/prefer-default-export
export function setToken(token) {
  console.log('token');
  console.log(token);
  try {
    Taro.setStorageSync('Token', token)
  } catch (error) {
    console.log(error);
  }
}