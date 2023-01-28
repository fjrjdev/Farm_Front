import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AppComponent } from './app.component'
import { FarmComponent } from './farm/farm.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { CreateComponent } from './createform/create.component'
import { DetailComponent } from './detail/detail.component'
import { UpdateComponent } from './updateform/update.component'

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'farm', component: FarmComponent },
  { path: 'farm/create', component: CreateComponent },
  { path: 'farm/detail/:id', component: DetailComponent },
  { path: 'farm/detail/update/:id', component: UpdateComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
