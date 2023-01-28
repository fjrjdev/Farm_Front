import { Component, OnInit } from '@angular/core'
import { FarmService } from '../services/farm.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  constructor(private farmservice: FarmService) {}
  data: any

  submitData(value) {
    let body = {
      ...value,
    }
    this.farmservice.create(body).subscribe((res) => console.log(res))
  }

  ngOnInit() {
    this.farmservice.list().subscribe((res) => {
      console.log(res)
      return (this.data = res)
    })
  }
}
