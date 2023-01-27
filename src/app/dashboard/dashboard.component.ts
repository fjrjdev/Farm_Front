import { Component, OnInit } from '@angular/core'
import { FarmService } from '../services/farm.service'
@Component({
  selector: 'app-dashboard',
  template: `<p routerLink="farm">Cadastrar</p>
    <p>{{ data }}</p>`,
})
export class DashboardComponent implements OnInit {
  constructor(private farmservice: FarmService) {}
  data: any
  ngOnInit() {
    this.farmservice.list().subscribe((res) => {
      res.forEach((element) => {
        console.log(element.name)
      })
    })
  }
}
