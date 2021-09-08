export interface PollForm {
  question: string, // what's your favorite color?
  options: string[], // [red, green, blue, orange, purple, yellow]
  image: string // http:///<link-to-image>
}

export interface Poll extends PollForm {
  id: number, // 12
  results: number[], // counts [0, 2, 3, 0, 3, 9]
  voted: boolean
}

export interface PollVote {
  id: number,
  vote: number
}

export interface Voter {
  id: string // 093xJSHGSNAHNE2
  voted: number // [12]
}

