import { Component, OnInit } from '@angular/core'
import { FarmService } from '../services/farm.service'
import { Farm } from '../models/Farm'
import { CreateFarm, UpdateFarmForm } from '../models/Farm'
import { FormBuilder, FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { createGeometryObject, stringToGeometry, coordinatesString } from '../utils/serializer'

@Component({
  selector: 'update-form',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private farmservice: FarmService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  formFarm!: FormGroup
  data: any
  loaded!: boolean
  id!: string | null

  getFarmData() {
    this.farmservice.read(this.id).subscribe((res) => {
      if (res === `ID ${this.id} não encontrado`) {
        this.router.navigate([''])
      }
      this.loaded = true
      this.data = res
    })
  }
  ngOnInit(): any {
    this.id = this.route.snapshot.paramMap.get('id')
    this.getFarmData()
    this.createForm(new UpdateFarmForm())
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
    if (typeof data.geometry === 'string') {
      data.geometry = stringToGeometry(data.geometry, ',')
      this.loaded = false
      this.submitData(data)
      this.getFarmData()
      this.createForm(new UpdateFarmForm())
    } else {
      data.geometry = createGeometryObject(data.geometry)
      this.loaded = false
      this.submitData(data)
      this.getFarmData()
      this.createForm(new UpdateFarmForm())
    }
  }
  submitData(value: Farm) {
    this.farmservice
      .update(this.id, value)
      .subscribe((res) => ((this.data = res), (this.loaded = true)))
  }
}
