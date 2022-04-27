import Taro from '@tarojs/taro';
const db = Taro.cloud.database();
const _ = db.command;
const user = db.collection('user');
export const update = async (password) => {
  return user.doc().update({
    data: {
      password,
    },
  });
};
//通过 where 查id 在doc里写id
