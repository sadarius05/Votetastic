import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VotingsListComponent } from './votings-list/votings-list.component';
import { VotingsDetailsComponent } from './votings-details/votings-details.component';
import { UiComponent } from './ui/ui.component';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SettingsComponent } from './settings/settings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

const routes: Routes = [
  {
    path: '',
    component: UiComponent,
    children: [
      {
        path: '',
        component: VotingsListComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: ':id',
        component: VotingsDetailsComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    VotingsListComponent,
    VotingsDetailsComponent,
    UiComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    PopoverModule,
    TooltipModule,
  ],
  exports: [RouterModule],
})
export class InsideModule {}
