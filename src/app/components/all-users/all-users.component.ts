import { Router } from '@angular/router';
import { ComponentsCommunicationService } from './../../services/components-communication.service';
import { Component } from '@angular/core';
import { SubSink } from 'subsink';
import { ApiServices } from 'src/app/services/api-services.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent {
  dataSet: any;
  allUsers: any;
  isSpinning = false;
  subs = new SubSink();
  constructor(
    private component_Communication: ComponentsCommunicationService,
    private api_service: ApiServices,
    private router: Router,
    private message: NzMessageService,
  ) {
    this.component_Communication.pageRoute.next('All Users');
  }

  ngOnInit() {
    this.isSpinning = true;
    this.loadAllUSers();
    this.filterUsers();

  }

  loadAllUSers() {
    this.isSpinning = true;
    this.subs.sink = this.api_service.loadUsers().subscribe((response: any) => {
      this.dataSet = response.reverse();
      this.allUsers = this.dataSet;
      this.isSpinning = false;
      // this.message.create('success', 'All Users ');
    }, error => {
      this.isSpinning = false;
      // this.message.create('error', error?.statusText || error?.message);
    }
    );
  }

  deleteUser(id: any) {
    this.isSpinning = true;
    this.subs.sink = this.api_service.deleteUser(id).subscribe((response: any) => {
      // this.message.create('success', 'User Delete Succeesfully');
      this.loadAllUSers();
      this.isSpinning = false;
    }, error => {
      this.isSpinning = false;
      // this.message.create('error', error?.statusText || error?.message);

    }
    );
  }

  filterUsers() {
    this.subs.sink = this.component_Communication.filterUser.subscribe((filter) => {
      // console.log(filter);
      if (!filter) {
        this.dataSet = this.allUsers;
        return;
      }
      // console.log(array.filter((element: any) => element.firstName.includes(filter)));
      this.dataSet = this.allUsers.filter((element: any) => element.firstName.toLowerCase().includes(filter));
      // console.log(this.dataSet);
    })

  }

  navigate(id: any) {
    this.router.navigateByUrl('/profile/' + id);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
