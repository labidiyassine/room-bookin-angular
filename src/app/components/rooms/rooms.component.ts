import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../room.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  rooms: any[] = [];
  selectedRoom: any = null; 
  errorMsg: string = '';

  constructor(private roomService: RoomService) {}

  ngOnInit() {
    this.fetchRooms();
  }

  fetchRooms() {
    this.roomService.getRooms().subscribe({
      next: (data) => {
        this.rooms = data;
      },
      error: (error) => {
        console.error(error);
        this.errorMsg = error.error?.msg || 'Server error';
      }
    });
  }

  selectRoom(room: any) {
    this.selectedRoom = { ...room }; 
  }

  updateRoom() {
    if (!this.selectedRoom) {
      return; 
    }
    this.roomService.updateRoom(this.selectedRoom._id, this.selectedRoom).subscribe({
      next: (data) => {
        console.log('Room updated successfully:', data);
        const index = this.rooms.findIndex(r => r._id === data._id);
        if (index !== -1) {
          this.rooms[index] = data;
        }
        this.selectedRoom = null;
      },
      error: (error) => {
        console.error('Error updating room:', error);
        this.errorMsg = error.error?.msg || 'Server error';
      }
    });
  }

  deleteRoom(id: string) {
    if (confirm('Are you sure you want to delete this room?')) {
      this.roomService.deleteRoom(id).subscribe({
        next: () => {
          console.log('Room deleted successfully');
          this.rooms = this.rooms.filter(room => room._id !== id);
        },
        error: (error) => {
          console.error(error);
          this.errorMsg = error.error?.msg || 'Server error';
        }
      });
    }
  }
}
