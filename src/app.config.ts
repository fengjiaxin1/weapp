export default defineAppConfig({
  pages: ['pages/index/index', 'pages/login/index'],

  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  debug: true,
  entryPagePath: 'pages/index/index',
  style: 'v2',
});
