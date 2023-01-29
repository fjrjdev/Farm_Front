import { Component, OnInit } from '@angular/core'
import { FarmService } from '../services/farm.service'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'farm-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.componet.scss'],
})
export class DetailComponent implements OnInit {
  constructor(
    private farmservice: FarmService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  data: any
  id!: string | null
  delete() {
    this.farmservice.delete(this.id).subscribe((res) => console.log(res))
    this.router.navigate([''])
  }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    this.farmservice.read(this.id).subscribe((res) => {
      if (res === `ID ${this.id} não encontrado`) {
        this.router.navigate([''])
      }
      return (this.data = [...res])
    })
  }
}
