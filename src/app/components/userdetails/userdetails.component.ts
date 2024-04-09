import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrl: './userdetails.component.css',
})
export class UserdetailsComponent implements OnInit {
  // =========================< properites >============================================================
  currentUser: number | any;
  user: User | undefined;
  constructor(
    private activetedRout: ActivatedRoute,
    private userServ: UserService,
    private spinner: NgxSpinnerService
  ) {}
  // =========================< get user details when page load >=======================================
  ngOnInit(): void {
    this.spinner.show();
    this.activetedRout.paramMap.subscribe((param) => {
      const id = param.get('id');
      this.currentUser = Number(id);
      // console.log(this.currentUser);
    });
    this.userServ.getUserById(this.currentUser).subscribe({
      next: (res) => {
        this.user = (res as any).data;
        // console.log(this.user);
      },
      complete: () => {
        this.spinner.hide();
      },
    });
  }
}
