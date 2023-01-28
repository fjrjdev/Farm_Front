interface Geometry {
  type: string
  coordinates: number[][]
}

export function stringToGeometry(data: string, space: string) {
  let coordinates: number[][] = []
  let temp: number[] = []
  if (typeof data === 'string') {
    data.split(space).forEach((coord: string) => {
      temp.push(parseFloat(coord))
      if (temp.length === 2) {
        coordinates.push(temp)
        temp = []
      }
    })
  }

  const geometry: Geometry = {
    type: 'LineString',
    coordinates: coordinates,
  }

  return geometry
}

export function coordinatesString(res: any) {
  const coordinates = res.geometry.coordinates.join()
  const geometry: Geometry = {
    type: 'LineString',
    coordinates: coordinates,
  }
  return geometry
}

export function createGeometryObject(coordinates: []) {
  const geometry: Geometry = {
    type: 'LineString',
    coordinates: coordinates,
  }
  return geometry
}
