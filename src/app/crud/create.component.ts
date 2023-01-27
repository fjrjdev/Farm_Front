import { Component, OnInit } from '@angular/core'
import { FarmService } from '../services/farm.service'
// import { NgForm } from '@angular/forms'
@Component({
  selector: 'create-farm',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  constructor(private farmservice: FarmService) {}
  data: any

  submitData(value) {
    let body = {
      ...value,
    }
    this.farmservice.create(body).subscribe((res) => console.log(res))
  }
}
