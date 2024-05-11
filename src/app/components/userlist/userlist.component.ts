import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.css',
})
export class UserlistComponent implements OnInit {
  // =========================< properites >============================================================
  userList: User[] = [];
  currentPage: number = 1;
  disablebutton: boolean = false;
  isVisable: boolean = true;
  set inputValue(value: string) {
    // console.log(value);
    this.searchById(value);
  }
  constructor(
    private userServ: UserService,
    private spinner: NgxSpinnerService
  ) {}
  // =========================< get all users when page load >===========================================
  ngOnInit(): void {
    this.spinner.show();
    this.getAllUsers(1);
  }
  // =========================< get all users >===========================================
  getAllUsers(currentPage: number) {
    this.spinner.show();
    this.userServ.getAllUsers(this.currentPage).subscribe({
      next: (res) => {
        this.userList = (res as any).data || [];
        // console.log(this.userList);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.spinner.hide();
      },
    });
  }
  // =========================< search about user by id >===========================================
  searchById(value: string) {
    if (value.trim() === '') {
      this.getAllUsers(this.currentPage);
      this.isVisable = true;
    } else {
      let id = Number(value);
      if (id > 12) {
        this.userList = [];
      }
      // console.log(id);
      this.userServ.getUserById(id).subscribe({
        next: (res) => {
          this.userList = [(res as any).data];
          this.isVisable = false;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
  // =========================< handle pagination >===========================================
  nextPage() {
    if (this.currentPage < 2) {
      this.currentPage++;
      this.getAllUsers(this.currentPage);
    } else {
      this.disablebutton = true;
    }
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getAllUsers(this.currentPage);
    } else {
      this.disablebutton = true;
    }
  }
}
