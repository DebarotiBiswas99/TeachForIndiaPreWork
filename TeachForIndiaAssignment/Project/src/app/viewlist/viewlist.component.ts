import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-viewlist',
  templateUrl: './viewlist.component.html',
  styleUrls: ['./viewlist.component.css']
})
export class ViewlistComponent implements OnInit {
  users: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.http.get<any[]>('http://localhost:3000/api/users').subscribe(
      (users) => {
        console.log('Fetched users:', users);
        this.users = users;// Set the total users in the service

      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
}
