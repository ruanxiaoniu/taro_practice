import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Button, Input, Text, Image } from '@tarojs/components'
import './login.scss'
import { setToken } from '../storage/index'
import weixin from '../../static/images/weixin.png'
// eslint-disable-next-line import/first
import { AtMessage } from 'taro-ui'

function Login(props) {
  useEffect(() => {
    console.log('userEffect');
    Taro.showShareMenu({
      withShareTicket: true
    })
  })
  const [User, setUser] = useState({username: '', password: ''})
  const ClickLogin = function() {
    console.log('user');
    console.log(User); 
        Taro.login({
          success: function(res) {
            Taro.login({
              success: function(result) {
                console.log('res');
                console.log(result);
                if(result.code) {
                  setToken(result.code)
                  Taro.navigateTo({
                    url: '../index/index'
                  })
                }else{
                  console.log('登录失败!请重新登录');
                }
              }
            })
            
          }
        })
  }  
  const ClickWeixin = function() {
    console.log('weixin');
    // 判断微信是否已授权，授权则直接进入首页，否则先让用户授权
    Taro.getSetting({
      success: function(res) {
        if(res.authSetting['scope.record']){
          console.log('authen :>> ', res.authSetting['scope.record']);
          Taro.navigateTo({
            url: '../index/index'
          })
        }else{
          console.log('hahha');
          Taro.authorize({
            scope: 'scope.record',
            success: function(result) {
              console.log('result');
              console.log(result);
              
              Taro.startRecord()
            },
            fail: function(err) {
              console.log('err');
              console.log(err);
              
            }
          })
        }
      },
     

    })
    
  }
  return (
    <View className='login'>
      <AtMessage />
      <View>
        账号： <Input className='username' placeholder='请输入账号' value={User.username} onInput={(e) => {setUser({...User, username: e.target.value})}}></Input>
      </View>
      <View>
        密码：
        <Input className='password' placeholder='请输入密码' password value={User.password} onInput={(e) => {setUser({...User, password: e.target.value})}}></Input>
      </View>
      <Button className='button' onClick={ClickLogin}>登录</Button>
      <Text>使用其他方式登录</Text>
      <view>
        <Image className='image_weixin' src={weixin} onClick={ClickWeixin} />
      </view>
    </View>
    )
}
Login.config = {
  navigationBarTitleText: '登录'
}
export default Login
