import { Component, OnInit } from '@angular/core'
import { FarmService } from '../services/farm.service'
import { Farm } from '../models/Farm'
import { CreateFarm } from '../models/Farm'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Router } from '@angular/router'
import { stringToGeometry } from '../utils/serializer'

interface Geometry {
  type: string
  coordinates: number[][]
}
@Component({
  selector: 'create-form',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private farmservice: FarmService,
    private router: Router
  ) {}
  formFarm!: FormGroup
  ngOnInit(): void {
    this.createForm(new CreateFarm())
  }
  createForm(farm: CreateFarm) {
    this.formFarm = this.formBuilder.group({
      owner: [farm.owner],
      name: [farm.name],
      municipality: [farm.municipality],
      state: [farm.state],
      area: [farm.area],
      geometry: [farm.geometry],
    })
  }
  onSubmit() {
    let data = this.formFarm.value
    data.geometry = stringToGeometry(data.geometry, ', ')
    this.submitData(data)
    this.formFarm.reset(new CreateFarm())
  }
  submitData(value: Farm) {
    this.farmservice.create(value).subscribe((res) => {
      if (res === 'Bad Request') {
        console.log(res)
      } else {
        this.router.navigate([''])
      }
    })
  }
}
