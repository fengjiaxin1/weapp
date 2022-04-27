// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();
const db = cloud.database();
const _ = db.command;
const user = db.collection('user');
// 云函数入口函数
exports.main = async (event, context) => {
  const users = await user
    .where({
      user: _.eq(event.user),
      password: _.eq(event.password),
    })
    .get();
  if (!users.data.length) {
    return '账号错误';
  }
  if (users.data[0].password !== event.password) {
    return '密码错误';
  }
  return 'success';
};
