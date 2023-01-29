import { Component, OnInit } from '@angular/core'
import { FarmService } from '../services/farm.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  constructor(private farmservice: FarmService) {}
  data: any
  loaded!: boolean
  selectedItem: any
  onClick(item: any) {
    this.selectedItem = item
  }
  ngOnInit() {
    this.loaded = false
    this.farmservice.list().subscribe((res) => {
      return (this.data = res)
    })
    this.loaded = true
  }
}
