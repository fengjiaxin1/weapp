export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/login/index',
    'pages/property/checkIn/index',
    'pages/property/checkIn/status',
    'pages/changePassword/index',
  ],

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
