import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiServices } from 'src/app/services/api-services.service';
import { ComponentsCommunicationService } from 'src/app/services/components-communication.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  dataSet: any;
  user_id: any;
  user_data: any;
  isSpinning = false;
  subs = new SubSink();
  constructor(
    private component_communication: ComponentsCommunicationService,
    private api_servicess: ApiServices,
    private route: ActivatedRoute,
    private message: NzMessageService,
    private router: Router
  ) {
    this.component_communication.pageRoute.next('Profile');

    this.route.paramMap.subscribe(params => {
      this.isSpinning = true;
      this.user_id = params.get('id');
      if (this.user_id) {
        this.loadSingleUser(this.user_id);
      }

    });
  }

  ngOnInit() { }

  loadSingleUser(id: any) {
    this.isSpinning = true;
    this.subs.sink = this.api_servicess.loadSingleUser(this.user_id).subscribe((response: any) => {
      this.user_data = response;
      this.component_communication.userName.next(this.user_data.firstName);
      this.isSpinning = false;
      this.message.create('success', 'User Record Loaded!');
    }, error => {
      this.isSpinning = false;
      this.message.create('error', error?.statusText || error?.message);
      this.router.navigateByUrl('/user/all');
    }
    );
  }

  deleteUser(id: any) {
    this.isSpinning = true;
    this.subs.sink = this.api_servicess.deleteUser(id).subscribe((response: any) => {
      this.user_data = null;
      this.message.create('success', 'User Delete Succeesfully');
      // this.loadSingleUser(this.user_id);
      this.isSpinning = false;
    }, error => {
      this.isSpinning = false;
      this.message.create('error', error?.statusText || error?.message);

    }
    );
  }

  ngOnDestroy() {
    this.component_communication.userName.next('');
    this.subs.sink?.unsubscribe();
  }
}
