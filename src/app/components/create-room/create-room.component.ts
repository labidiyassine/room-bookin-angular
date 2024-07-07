import { Component } from '@angular/core';
import { RoomService } from '../../room.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent {
  room = {
    name: '',
    capacity: 0,
    amenities: ''
  };
  errorMsg: string = '';

  constructor(private roomService: RoomService, private router: Router) {}

  onSubmit() {
    this.roomService.createRoom(this.room).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/rooms']);  // Redirect to the list of rooms
      },
      error: (error) => {
        console.error(error);
        this.errorMsg = error.error.msg || 'Server error';
      }
    });
  }
}
