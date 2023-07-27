import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ClassroomService } from 'services/classroom.service';

@Component({
  selector: 'app-allocations',
  templateUrl: './allocations.component.html',
  styleUrls: ['./allocations.component.css']
})
export class AllocationsComponent implements OnInit {
  users: any[] = [];
  classrooms: any[] = [];
  showTable: boolean = false;

  constructor(
    private classroomService: ClassroomService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.fetchClassrooms();
    this.fetchUsers();

    // Subscribe to totalUsers$ observable to get the total number of users

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

  fetchUsers() {
    this.http.get<any[]>('http://localhost:3000/api/users').subscribe(
      (users) => {
        this.users = users;
        this.showTable = this.users.length >= 20;
        console.log('No of users = ',this.users.length); // Set the total users in the service

      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  getLimitedVolunteers(volunteers: any[], requirement: number): any[] {
    return volunteers.slice(0, requirement);
  }


}
