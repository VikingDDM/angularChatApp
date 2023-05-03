import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';


const api = '/api/';

@Injectable()
export class RoomService {

    constructor(private http: HttpClient) { }

    getRooms() {
        return this.http.get(`${api}rooms`);
    }

    getRoom(id) {
        return this.http.get(`${api}rooms/room/${id}`);
    }

}
