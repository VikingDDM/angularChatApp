import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Message } from '../..//entities/message';
import { Room } from '../..//entities/room';
import { User } from '../../entities/user';
import { AuthenticationService, JwtVerifyAnswer } from '../../services/auth/authentication.service';
import { ChatService } from '../../services/chat-sockets/socket.service';
import { RoomService } from './../../services/rooms/rooms.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  public text: string;
  public name: string;
  public newRoom: string;
  public messages: Message[] = [];
  public rooms: Room[] = [];
  public title: string;
  public currentRoomId: string;
  public users: User[] = [];

  private unsubscribeOnDestroy = new Subject<void>();

  public constructor(
    private chatService: ChatService,
    private authService: AuthenticationService,
    private roomService: RoomService,
  ) {
    this.title = 'Eat a carrot )';
    this.messages.push(new Message('Bugz Bunny', 'Choose the room =)'));
  }

  public ngOnInit() {
    this.getProfile();
    this.chatService
      .getMessage()
      .pipe(takeUntil(this.unsubscribeOnDestroy))
      .subscribe((data: Message) => {
        this.messages.push(data);
      });
    this.getRooms();
    this.chatService.init();
    this.getRoomsFromSocket();
    this.getUsersList();
  }

  public ngOnDestroy() {
    this.unsubscribeOnDestroy.next();
    this.unsubscribeOnDestroy.complete();
  }

  public send(): void {
    if (this.text && this.text.trim() !== '') {
      this.chatService.sendMessage(this.text, this.name, this.currentRoomId);
      this.text = '';
    }
  }

  public addnewroom(): void {
    if (this.newRoom && this.newRoom.trim() !== '') {
      this.chatService.addRoom(this.newRoom);
    }
  }

  public getRoomsFromSocket(): void {
    this.chatService.getRooms()
      .pipe(takeUntil(this.unsubscribeOnDestroy))
      .subscribe((res: Room) => {
        const updatedRooms = [res, ...this.rooms];
        this.rooms = updatedRooms;
      });
  }


  public getRooms(): void {
    this.roomService.getRooms()
      .pipe(takeUntil(this.unsubscribeOnDestroy))
      .subscribe((res: Room[]) => {
        this.rooms = res;
      });
  }

  public joinRoom(room): void {
    this.chatService.joinRoom(room);
    this.currentRoomId = room;
  }

  public getRoom(id): void {
    this.roomService.getRoom(id)
      .pipe(takeUntil(this.unsubscribeOnDestroy))
      .subscribe((res: Room) => {
        this.messages = res.messages;
        this.title = res.title;
      });
  }

  public getProfile(): void {
    this.authService.getProfile()
      .pipe(takeUntil(this.unsubscribeOnDestroy))
      .subscribe((res: JwtVerifyAnswer) => {
        this.name = res.username;
      });
  }

  public getUsersList(): void {
    this.chatService.getUsers()
      .pipe(takeUntil(this.unsubscribeOnDestroy))
      .subscribe((users: User[]) => {
        this.users = users;
      });
  }

}
