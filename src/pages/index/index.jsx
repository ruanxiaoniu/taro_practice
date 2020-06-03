import Taro, { useEffect} from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import './index.scss'
// import { render } from 'node-sass'

function Index() {
  useEffect(() =>{
    Taro.showShareMenu({
      withShareTicket: true
    })
  })
  const uploadImage = function() {
    Taro.chooseImage({
      success: function(res) {
        console.log('image');
        console.log(res);
      }
    })
  }
  const uploadFile = function() {
    Taro.chooseMessageFile({
      success: function(res) {
        console.log('file');
        console.log(res);
      }
    })
  }
  // const pay = function() {
  //   Taro.requestPayment({
  //     timeStamp: '',
  //     nonceStr: '',
  //     package: '',
  //     signType: 'MD5',
  //     paySign: '',
  //     success: function(res) {
  //       console.log('sucess');
  //       console.log(res);
  //     },
  //     fail: function(err) {
  //       console.log('error');
  //       console.log(err);
        
  //     }
  //   })
  // }
  return (
    <View>
      <Button onClick={uploadImage}>上传</Button>
      <Button onClick={uploadFile}>上传文件</Button>
      {/* <Button onClick={pay}>支付</Button> */}
    </View>
  )
}
export default Index
