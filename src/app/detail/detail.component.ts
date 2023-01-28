import { Component, OnInit } from '@angular/core'
import { FarmService } from '../services/farm.service'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'farm-detail',
  templateUrl: './detail.component.html',
})
export class DetailComponent implements OnInit {
  constructor(
    private farmservice: FarmService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  data: any

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    this.farmservice.read(id).subscribe((res) => {
      if (res === `ID ${id} não encontrado`) {
        this.router.navigate([''])
      }
      return (this.data = [...res])
    })
  }
}
