// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();
const db = cloud.database();
const _ = db.command;
const user = db.collection('user');
let createUser = () => {};
// 云函数入口函数
exports.main = async (event, context) => {
  const res = await user.add({
    data: {
      user: event.user,
      password: event.password,
      status: event.status,
    },
  });
  return event;
};
