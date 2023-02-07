import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { NewformComponent } from './newform/newform.component';
import { TaskdetailsComponent } from './taskdetails/taskdetails.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { DialogComponent } from './dialog/dialog.component';
import { ListdialogComponent } from './listdialog/listdialog.component';
import { MenuComponent } from './menu/menu.component';
import { WorkListComponent } from './work-list/work-list.component';


@NgModule({
  declarations: [
    NewformComponent,
    ConfirmComponent,
    TasklistComponent,
    TaskdetailsComponent,
    DialogComponent,
    ListdialogComponent,
    MenuComponent,
    WorkListComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    FormsModule,
    MatDividerModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    ToastrModule.forRoot() 
  ],
  bootstrap: [HomeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
