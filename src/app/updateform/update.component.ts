import { Component, OnInit } from '@angular/core'
import { DrawAddon } from '@common/draw'
import GeoJSON from 'ol/format/GeoJSON'
import { MapService } from '../map.service'
import { BasemapComponent } from '../basemap/basemap.component'
import { GeoJsonFeatureAddon } from '@common/feature'
import { pointClickStyle, GeoJsonFeature } from '@common/geolib'

import { FarmService } from '../services/farm.service'
import { Farm } from '../models/Farm'

import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { catchError, switchMap } from 'rxjs/operators'
import { EMPTY } from 'rxjs'

@Component({
  selector: 'update-form',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {
  private _map!: BasemapComponent
  private _geometries: GeoJsonFeature[] = []
  constructor(
    private _mapService: MapService,
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
      geometry: [null],
    })
    if (this.data) {
      this.formFarm.patchValue({
        owner: this.data.owner.id,
        name: this.data.name,
        municipality: this.data.municipality,
        state: this.data.state,
        geometry: this.data.geometry ? this.data.geometry.coordinates : null,
      })
    }
  }
  setGeometries(value: any) {
    this.formFarm.patchValue({
      geometry: value,
    })
  }

  ngOnInit(): any {
    this._map = this._mapService.map
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
    // this.convertGeometryData(data)

    this.submitData(data)
  }
  // convertGeometryData(data) {
  //   if (typeof data.geometry === 'string') {
  //     data.geometry = stringToGeometry(data.geometry, ',')
  //   } else {
  //     data.geometry = createGeometryObject(data.geometry)
  //   }
  // }
  submitData(value: Farm) {
    this.loaded = false
    this.farmservice
      .update(this.id, value)
      .subscribe((res) => ((this.data = res), (this.loaded = true)))
  }
  draw(type: 'Circle') {
    if (!this._map) return
    this._map.includeAddon(
      new DrawAddon({
        identifier: 'geometry_map',
        drawType: type,
        callback: (geometry) => {
          const geo = new GeoJSON().writeGeometryObject(geometry) as any
          this.handleNewGeometry(geo)
        },
      })
    )
  }

  geometrySeed: number = 1
  handleNewGeometry(geometry: any) {
    const identifier = this.geometrySeed++
    this._map.includeAddon(
      new GeoJsonFeatureAddon({
        identifier: `geometry::${identifier}`,
        feature: geometry,
        styleFunction: () => {
          return pointClickStyle({
            hover: false,
            strokeColor: '#1962D1',
          })
        },
      })
    )
    this._map.fitToAddons(this._map.listByPrefix('geometry'))
    this.setGeometries(geometry)
    this._geometries.push(geometry)
  }

  ngOnDestroy() {
    this._map.removeByPrefix('geometry')
  }
}
