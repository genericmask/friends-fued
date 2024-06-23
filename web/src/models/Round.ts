interface Answer {
    text: string;
    points: number;
    revealed: boolean;
  }
  
  export class Round {
    question: string;
    answers: Answer[];
    currentScore: number;
    strikes: number;
    maxStrikes: number;
    playingTeam: string | null;
    opposingTeam: string | null;
    isStealRound: boolean;
  
    constructor(roundNumber: string, answers: Answer[], maxStrikes: number = 3) {
      this.question = roundNumber;
      this.answers = answers;
      this.currentScore = 0;
      this.strikes = 0;
      this.maxStrikes = maxStrikes;
      this.playingTeam = null;
      this.opposingTeam = null;
      this.isStealRound = false;
    }
  
    startRound(playingTeam: string, opposingTeam: string): void {
      this.playingTeam = playingTeam;
      this.opposingTeam = opposingTeam;
      this.currentScore = 0;
      this.strikes = 0;
    }
  
    allAnswersRevealed(): boolean {
      return this.answers.every(answer => answer.revealed);
    }
  }