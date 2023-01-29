import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { FarmComponent } from './farm/farm.component'
import { DashboardComponent } from './dashboard/dashboard.component'

import { DetailComponent } from './detail/detail.component'
import { UpdateComponent } from './updateform/update.component'

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'farm', component: FarmComponent },
  { path: 'farm/detail/:id', component: DetailComponent },
  { path: 'farm/detail/update/:id', component: UpdateComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
