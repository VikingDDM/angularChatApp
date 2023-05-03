import { Injectable } from '@nestjs/common';
import { UserSchema } from '../schemas/user.schema';
import { RoomSchema } from '../schemas/room.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RoomsService {
  private readonly rooms = [];

  constructor(@InjectModel(RoomSchema) private readonly roomModel) {}

  async createRoom(room: any): Promise<any> {
    const createdRoom = new this.roomModel(room);
    const newRoom =  await createdRoom.save();
    return newRoom;
  }

  async findAllRooms(): Promise<any[]> {
    return await this.roomModel.find().lean().exec();
  }

  async findOneRooms(id: string): Promise<any> {
    return await this.roomModel.findOne({ '_id': id }).lean().exec();
  }

  async findOneByRoomname(username: string): Promise<any> {
    return await this.roomModel.findOne({ 'email': username }).exec();
  }

  async updateRoom(id: string, user: any): Promise<any> {
    return await this.roomModel.findOneAndUpdate({ '_id': id }, user).exec();
  }

  async deleteRoom(id: string) {
    return await this.roomModel.findOneAndDelete({ '_id': id }).exec();
  }

}
