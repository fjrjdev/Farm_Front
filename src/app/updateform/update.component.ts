import { Component, OnInit } from '@angular/core'
import { FarmService } from '../services/farm.service'
import { Farm } from '../models/Farm'
import { CreateFarm, UpdateFarmForm } from '../models/Farm'
import { FormBuilder, FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

interface Geometry {
  type: string
  coordinates: number[][]
}
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

  ngOnInit(): any {
    const id = this.route.snapshot.paramMap.get('id')
    this.farmservice.read(id).subscribe((res) => {
      if (res === `ID ${id} não encontrado`) {
        this.router.navigate([''])
      }
      console.log(res)
      this.loaded = true
      return (this.data = res)
    })
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

  clearData(data: string) {
    let coordinates: number[][] = []
    let temp: number[] = []

    data.split(', ').forEach((coord: string) => {
      temp.push(parseFloat(coord))
      if (temp.length === 2) {
        coordinates.push(temp)
        temp = []
      }
    })

    const geometry: Geometry = {
      type: 'LineString',
      coordinates: coordinates,
    }

    return geometry
  }
  onSubmit() {
    let data2 = this.formFarm.value
    // data.geometry = this.clearData(data.geometry)
    console.log(data2)
    // this.submitData(data)
    // this.formFarm.reset(new CreateFarm())
  }
  // submitData(value: Farm) {
  //   this.farmservice.create(value).subscribe((res) => console.log(res))
  // }
}
