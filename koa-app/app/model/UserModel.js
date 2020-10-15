/**
 * User model
 */

import mongoose, { Schema } from 'mongoose'

const UserSchema = Schema({
  account: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  nickName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: Number,
    min: 10,
    max: 20,
    required: true,
  },
  createTime: {
    type: Date,
    default: Date.now
  }
});

UserSchema.statics = {
  /**
   * 查找
   * @param data
   */
  async findUser(data = {}) {
    return await this.findOne(data);
  },
  /**
   * 创建用户
   * @param data
   */
  async register(data = {}) {
    const result = await this.create(data);
    return result
  },
  /**
   * 删除
   * @param data
   */
  async delete(data) {
    const result = await this.remove(data);
    return result
  },
}

const UserModel = mongoose.model('User', UserSchema);

export default UserModel
