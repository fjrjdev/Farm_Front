import { Component, OnInit } from '@angular/core'
import { FarmService } from '../services/farm.service'
import { ActivatedRoute, Router } from '@angular/router'
import { EMPTY } from 'rxjs'

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
    this.farmservice.delete(this.id).subscribe((res) => EMPTY)
    this.router.navigate([''])
  }
  formateDateLocale(res) {
    const date = new Date(res)
    const formattedDate = date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    })
    return formattedDate
  }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    this.farmservice.read(this.id).subscribe((res) => {
      if (res === `ID ${this.id} não encontrado`) {
        this.router.navigate([''])
        return EMPTY
      } else {
        this.data = [...res]
        this.data[0].creation_date = this.formateDateLocale(res.creation_date)
        this.data[0].last_modification_date = this.formateDateLocale(res.last_modification_date)
      }
    })
  }
}
