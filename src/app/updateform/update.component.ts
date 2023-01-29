import { Component, OnInit } from '@angular/core'
import { FarmService } from '../services/farm.service'
import { Farm } from '../models/Farm'
import { CreateFarm, UpdateFarmForm } from '../models/Farm'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
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
  createForm() {
    if (this.data) {
      this.formFarm = this.formBuilder.group({
        owner: [this.data.owner.id, Validators.required],
        name: [this.data.name, Validators.required],
        municipality: [this.data.municipality, Validators.required],
        state: [this.data.state, Validators.required],
        area: [this.data.area],
        geometry: [this.data.geometry ? this.data.geometry.coordinates : null],
      })
    }
  }
  patchValue() {
    this.farmservice.read(this.id).subscribe((res) => {
      if (res === `ID ${this.id} não encontrado`) {
        this.router.navigate([''])
      }
      this.data = res
      this.createForm()
      this.loaded = true
    })
  }
  ngOnInit(): any {
    this.id = this.route.snapshot.paramMap.get('id')
    this.patchValue()
  }

  onSubmit() {
    let data = this.formFarm.value
    if (typeof data.geometry === 'string') {
      data.geometry = stringToGeometry(data.geometry, ',')
      this.loaded = false
      this.submitData(data)
      this.getFarmData()
    } else {
      data.geometry = createGeometryObject(data.geometry)
      this.loaded = false
      this.submitData(data)
      this.getFarmData()
    }
  }
  submitData(value: Farm) {
    this.farmservice
      .update(this.id, value)
      .subscribe((res) => ((this.data = res), (this.loaded = true)))
  }
}
