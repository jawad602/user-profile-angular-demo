import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  sub = new SubSink();
  constructor(
    private component_communication: ComponentsCommunicationService,
    private api_services: ApiServices,
    private route: ActivatedRoute,
    private message: NzMessageService,
  ) {
    this.component_communication.pageRoute.next('Profile');

    this.route.paramMap.subscribe(params => {
      this.isSpinning = true;
      this.user_id = params.get('id');
      console.log(this.user_id)
      if (this.user_id) {
        this.loadSingleUser(this.user_id);
      }

    });
  }

  ngOnInit() { }

  loadSingleUser(id: any) {
    this.isSpinning = true;
    this.sub.sink = this.api_services.loadSingleUser(this.user_id).subscribe((response: any) => {
      this.user_data = response;
      this.component_communication.userName.next(this.user_data.firstName);
      this.isSpinning = false;
      this.message.create('success', 'User Record Loaded!');
      // console.log(this.user_data);
    }, error => {
      // console.log(error);
      this.isSpinning = false;
      this.message.create('error', error?.error?.message || error?.message);
    }
    );
  }

  ngOnDestroy() {
    this.component_communication.userName.next('');
    this.sub.sink?.unsubscribe();
  }
}
