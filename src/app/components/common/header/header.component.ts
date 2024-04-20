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
  onSearchChange: any;
  isProfile = false;
  private subs = new SubSink();

  constructor(
    private component_Communication: ComponentsCommunicationService
  ) {
    this.onSearchChange = this.betterSearch();

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
  };

  betterSearch() {
    let timer: any;
    return (event: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => this.component_Communication.filterUser.next(event.target.value), 300)
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }
}
