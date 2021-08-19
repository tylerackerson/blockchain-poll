export interface Poll {
  id: number, // 12
  question: string, // what's your favorite color?
  results: number[],// counts [0, 2, 3, 0, 3, 9]
  options: string[], // [red, green, blue, orange, purple, yellow]
  thumbnail: string // http:///<link-to-image>
}

export interface Voter {
  id: string // 093xJSHGSNAHNE2
  voted: number // [12]
}

