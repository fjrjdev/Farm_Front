import { Component, OnInit } from '@angular/core'
import { FarmService } from '../services/farm.service'
import { Farm } from '../models/Farm'
import { CreateFarm, UpdateFarmForm } from '../models/Farm'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { createGeometryObject, stringToGeometry, coordinatesString } from '../utils/serializer'
import { catchError, switchMap } from 'rxjs/operators'
import { EMPTY } from 'rxjs'

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

  createForm() {
    this.formFarm = this.formBuilder.group({
      owner: ['', Validators.required],
      name: ['', Validators.required],
      municipality: ['', Validators.required],
      state: ['', Validators.required],
      area: [''],
      geometry: [null],
    })
    if (this.data) {
      this.formFarm.patchValue({
        owner: this.data.owner.id,
        name: this.data.name,
        municipality: this.data.municipality,
        state: this.data.state,
        area: this.data.area,
        geometry: this.data.geometry ? this.data.geometry.coordinates : null,
      })
    }
  }

  ngOnInit(): any {
    this.id = this.route.snapshot.paramMap.get('id')
    this.farmservice
      .read(this.id)
      .pipe(
        switchMap((res) => {
          if (res === `ID ${this.id} não encontrado`) {
            this.router.navigate([''])
            return EMPTY
          }
          this.data = res
          this.createForm()
          return this.farmservice.read(this.id)
        }),
        catchError((err) => {
          return EMPTY
        })
      )
      .subscribe((res) => {
        this.loaded = true
      })
  }

  onSubmit() {
    let data = this.formFarm.value
    this.convertGeometryData(data)
    this.submitData(data)
  }
  convertGeometryData(data) {
    if (typeof data.geometry === 'string') {
      data.geometry = stringToGeometry(data.geometry, ',')
    } else {
      data.geometry = createGeometryObject(data.geometry)
    }
  }
  submitData(value: Farm) {
    this.loaded = false
    this.farmservice
      .update(this.id, value)
      .subscribe((res) => ((this.data = res), (this.loaded = true)))
  }
}
