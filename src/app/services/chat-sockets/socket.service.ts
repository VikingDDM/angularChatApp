import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { SocketOne } from './socket-one.service';
@Injectable()
export class ChatService {

    constructor(private socket: SocketOne) {
    }

    init() {
        console.log('init socket');
        this.socket.emit('rooms', { room: 'hello allo' });
    }

    sendMessage(text, name, roomId) {
        this.socket.emit('message', { message: text, username: name, room: roomId });
    }

    getMessage() {
        return this.socket
            .fromEvent('message')
            .map((data: any) => data);
    }

    getRooms() {
        return this.socket
            .fromEvent('updatedRooms')
            .map((data: any) => data);
    }

    joinRoom(room) {
        this.socket.emit('chatroom', room);
    }

    addRoom(room) {
        this.socket.emit('addroom', room);
    }

    getUsers() {
        return this.socket
            .fromEvent('usersRoom')
            .map((data: any) => data);
    }
}
