import { UserModel, UserDocument } from '../models/user.model'

export default class UserService {
  public async create(user: { email: string; password: string }): Promise<UserDocument> {
    return UserModel.create(user)
  }

  public async findOne(query: { [key: string]: any }): Promise<UserDocument | null> {
    return UserModel.findOne(query).exec()
  }
}
