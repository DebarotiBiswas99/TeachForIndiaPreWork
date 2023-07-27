import { Component, OnInit } from '@angular/core';
import { ClassroomService } from 'services/classroom.service';

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.css']
})
export class ClassroomsComponent implements OnInit {
  classrooms: any[] = [];

  constructor(private classroomService: ClassroomService) { }

  ngOnInit() {
    this.fetchClassrooms();
  }

  fetchClassrooms() {
    this.classroomService.getClassrooms()
      .subscribe(
        (classrooms) => {
          this.classrooms = classrooms;
        },
        (error) => {
          console.error('Error fetching classrooms:', error);
        }
      );
  }
}
