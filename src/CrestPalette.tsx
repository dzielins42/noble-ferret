abstract class CrestPalette {
  abstract get or(): string
  abstract get argent(): string

  abstract get gules(): string
  abstract get sable(): string
  abstract get azure(): string
  abstract get vert(): string
  abstract get purple(): string

  random(): string {
    const values: string[] = [
      this.or,
      this.argent,
      this.gules,
      this.sable,
      this.azure,
      this.vert,
      this.purple
    ]
    return values[Math.floor(Math.random() * values.length)]
  }

  randomColor(): string {
    const values: string[] = [
      this.gules,
      this.sable,
      this.azure,
      this.vert,
      this.purple
    ]
    return values[Math.floor(Math.random() * values.length)]
  }
}

export class PastelCrestPalette extends CrestPalette {
  or: string = "#ffffba"
  argent: string = "#ffffff"
  gules: string = "#ffb3ba"
  sable: string = "#000000"
  azure: string = "#bae1ff"
  vert: string = "#baffc9"
  purple: string = "#8675a9"
}

export default CrestPalette
