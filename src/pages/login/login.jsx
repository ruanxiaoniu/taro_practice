import Taro, { useState, useEffect, useDidShow } from '@tarojs/taro'
import { View, Button, Input } from '@tarojs/components'
import './login.scss'
import { setToken } from '../storage/index'
// eslint-disable-next-line import/first
import { AtMessage } from 'taro-ui'

function Login(props) {
  useEffect(() => {
    console.log('userEffect');
    // Taro.getSetting({
    //   success: function(authSetting) {
    //     console.log(authSetting.authSetting['scope.userInfo']);
    //     if(authSetting.authSetting['scope.userInfo']) {
    //       Taro.navigateTo({
    //         url: '../index/index'
    //       })
    //     }else{
    //       Taro.atMessage({
    //         'message': '请登录',
    //         'type': 'error'
    //       })
    //     }
    //   }
    // })
  })
  useDidShow(() => {
    console.log('show');
     Taro.getSetting({
      success: function(authSetting) {
        console.log(authSetting.authSetting['scope.userInfo']);
        if(authSetting.authSetting['scope.userInfo']) {
          Taro.navigateTo({
            url: '../index/index'
          })
        }else{
          Taro.atMessage({
            'message': '请登录',
            'type': 'error'
          })
        }
      }
    })
  })
  const [User, setUser] = useState({username: '', password: ''})
  const ClickLogin = function() {
    console.log('user');
    console.log(User); 
    Taro.getSetting({
      success: function(authen) {
        console.log('authen :>> ', authen);
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
    </View>
    )
}
Login.config = {
  navigationBarTitleText: '登录'
}
export default Login
