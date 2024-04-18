import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';;

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';


const antdModule = [
    NzLayoutModule,
    NzMenuModule,
    NzToolTipModule,
    NzPageHeaderModule,
    NzAvatarModule,
    NzIconModule,
    NzDropDownModule,
    NzTypographyModule,
    NzCardModule,
    NzInputModule,
    NzInputNumberModule,
    NzCheckboxModule,
    NzFormModule,
    NzRadioModule,
    NzTabsModule,
    NzButtonModule,
    NzSpinModule,
    NzSelectModule,
    NzSegmentedModule,
    NzUploadModule,
    NzMessageModule,
    // NgxPrintModule,
    NzDatePickerModule,
    NzSpaceModule,
    NzBadgeModule,
    // NzDrawerComponent,
    NzDrawerModule,
    NzSwitchModule,
    NzTableModule
]

@NgModule({
    declarations: [
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        ...antdModule,
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        ...antdModule,
    ],
    providers: [{ provide: LOCALE_ID, useValue: 'en-US' }]

})
export class SharedModule { }
