import { Component } from '@angular/core';
import { ComponentsCommunicationService } from 'src/app/services/components-communication.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  route: any;
  userName: any
  isProfile = false;
  private subs = new SubSink();

  constructor(
    private component_Communication: ComponentsCommunicationService
  ) {
    this.subs.sink = this.component_Communication.pageRoute.subscribe((route: any) => {
      this.route = route;
      if (route == 'Profile') {
        this.isProfile = true;
      } else {
        this.isProfile = false;
      }
    });

    this.subs.sink = this.component_Communication.userName.subscribe((name: any) => {
      this.userName = name;
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }
}
