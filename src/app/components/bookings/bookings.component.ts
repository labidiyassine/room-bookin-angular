import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BookingService } from '../../booking.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  @ViewChild('newBookingForm') newBookingForm!: NgForm;
  bookings: any[] = [];
  errorMsg: string = '';

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.fetchUserBookings();
  }

  fetchUserBookings() {
    this.bookingService.getUserBookings().subscribe({
      next: (data) => {
        this.bookings = data;
      },
      error: (error) => {
        console.error('Error fetching bookings:', error);
        this.errorMsg = error.error?.msg || 'Server error';
      }
    });
  }

  createBooking() {
    const newBooking = this.newBookingForm.value;
    this.bookingService.createBooking(newBooking).subscribe({
      next: (data) => {
        console.log('Booking created successfully:', data);
        this.fetchUserBookings();
        this.newBookingForm.resetForm();
      },
      error: (error) => {
        console.error('Error creating booking:', error);
        this.errorMsg = error.error?.msg || 'Server error';
      }
    });
  }

  updateBooking(updatedBooking: any) {
    this.bookingService.updateBooking(updatedBooking._id, updatedBooking).subscribe({
      next: (data) => {
        console.log('Booking updated successfully:', data);
        const index = this.bookings.findIndex(b => b._id === updatedBooking._id);
        if (index !== -1) {
          this.bookings[index] = data; // Update the local array with the updated booking
        }
      },
      error: (error) => {
        console.error('Error updating booking:', error);
        this.errorMsg = error.error?.msg || 'Server error';
      }
    });
  }

  deleteBooking(id: string) {
    if (confirm('Are you sure you want to delete this booking?')) {
      this.bookingService.deleteBooking(id).subscribe({
        next: () => {
          console.log('Booking deleted successfully');
          this.bookings = this.bookings.filter(booking => booking._id !== id);
        },
        error: (error) => {
          console.error('Error deleting booking:', error);
          this.errorMsg = error.error?.msg || 'Server error';
        }
      });
    }
  }
}
