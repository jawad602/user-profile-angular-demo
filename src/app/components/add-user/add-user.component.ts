import { ApiServices } from 'src/app/services/api-services.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ComponentsCommunicationService } from 'src/app/services/components-communication.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {

  form: any;
  isSpinning: boolean = false;
  user_id: any;
  user_data: any;
  private subs = new SubSink();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    // private apiService: ApiServices,
    private message: NzMessageService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private component_communication: ComponentsCommunicationService,
    private api_services: ApiServices
  ) {
    this.component_communication.pageRoute.next("Add User")
  }

  ngOnInit() {
    this.createForm();
    this.route.paramMap.subscribe(params => {
      this.isSpinning = true;
      this.user_id = params.get('id');
      console.log(this.user_id);

      if (this.user_id) {
        this.loadSingleUser(this.user_id);
      } else {
        this.isSpinning = false;
      }
    });
  }

  createForm() {
    this.form = this.formBuilder.group({
      // 'school': ['', [Validators.required,]],
      'firstName': ['', [Validators.minLength(3), Validators.maxLength(30)]],
      'phone': ['', [Validators.required]],
      'email': ['', [Validators.required, Validators.email]],
    })
  }

  patchData(data: any) {
    this.form.patchValue({
      firstName: data.firstName,
      phone: data.phone,
      email: data.email,
    });
  }

  loadSingleUser(id: any) {
    this.isSpinning = true;
    this.subs.sink = this.api_services.loadSingleUser(this.user_id).subscribe((response: any) => {
      this.user_data = response;
      this.component_communication.userName.next(this.user_data.firstName);
      this.patchData(response);
      this.isSpinning = false;
      this.message.create('success', 'User Record Loaded!');
      // console.log(this.user_data);
    }, error => {
      // console.log(error);
      this.isSpinning = false;
      this.message.create('error', error?.statusText || error?.message);
    }
    );
  }

  submit() {
    if (this.form.valid) {
      this.isSpinning = true;
      let data = {
        ...this.form.value
      }
      if (this.user_id) {
        this.subs.sink = this.api_services.updateUser(data, this.user_id).subscribe((response: any) => {
          this.isSpinning = false;
          this.message.create('success', 'User Record Updated!');
          this.router.navigateByUrl("/user/all");

        }, error => {
          this.isSpinning = false;
          this.message.create('error', error?.statusText || error?.message);

        }
        );
        return;
      }

      this.subs.sink = this.api_services.addUser(data).subscribe((response: any) => {
        this.isSpinning = false;
        this.message.create('success', 'User Record Added!');
        this.router.navigateByUrl("/user/all");
      }, error => {
        console.log(error)
        this.isSpinning = false;
        this.message.create('error', error?.statusText || error?.message);
      }
      );

    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }
}
