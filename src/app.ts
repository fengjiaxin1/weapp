import { createApp } from 'vue';
import { Button, Input, Icon } from '@nutui/nutui-taro';
import Taro from '@tarojs/taro';
import './app.less';

const App = createApp({
  onShow(options) {
    Taro.cloud.init({
      env: 'fengfeng-dhr43',
    });
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});

App.use(Button)
  .use(Input)
  .use(Icon);

export default App;
