import { Owner } from './Owner'
export interface Farm {
  name: string
  geomtry: any
  area: number
  centroid: number[]
  creation_date?: Date
  owner: Owner
}
export interface UpdateFarm {
  name?: string
  geometry?: any
  area?: number
  owner?: Owner
  state?: string
  municipality?: string
}
export class CreateFarm {
  name: string = ''
  geometry: any
  area: number = 0
  owner: number = 0
  state: string = ''
  municipality: string = ''
}
export class UpdateFarmForm {
  name: string = ''
  geometry: any
  area: number = 0
  owner: number = 0
  state: string = ''
  municipality: string = ''
}
