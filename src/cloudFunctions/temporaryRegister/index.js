// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();
const db = cloud.database();
const _ = db.command;
const TR = db.collection('TemporaryRegistration');
// 云函数入口函数
exports.main = async (event, context) => {
  const users = await TR.where({
    name: _.eq(event.name),
    idCard: _.eq(event.idCard),
  }).get();
  // 重复登记
  if (users.data.length) {
    return 'repeat';
  }
  const res = await TR.add({
    data: {
      ...event,
    },
  });
  return 'success';
};
