const utils = require("./utils");

const gameWinnerCalc = (tournamentObj) => {
  let scoreboard = {};
  let tournamentWinner = [];
  let tieBreakerTally = {};
  let tieBreakerWinner = [];

  // Calculate team with most wins
  utils.scoreCalc(tournamentObj, scoreboard);

  //Tally up ScoreBoard
  let mostWins = Math.max(...Object.values(scoreboard));
  for (let team in scoreboard) {
    if (scoreboard[team] === mostWins) {
      tournamentWinner.push(team);
    }
  }

  //Simple if check for only one winning team/no ties
  if (tournamentWinner.length === 1) {
    console.log("Win no ties:>>", tournamentWinner.toString());
    return tournamentWinner.toString();
  }

  // Case of a tie check subset wins of tied teams
  utils.winLossTieCalc(tournamentObj, tournamentWinner, tieBreakerTally);

  // Calculate winning percentage
  utils.winningPercentageCalc(tieBreakerTally);

  //Calculate overall winner(s) from winning percentage
  utils.tieBreakerCalc(tieBreakerTally, tieBreakerWinner);
  if (tieBreakerWinner.length === 1) {
    console.log("Single Winner From Tie :>> ", tieBreakerWinner.toString());
    return tieBreakerWinner.toString();
  } else {
    console.log(
      "Random Winner from Tie :>> ",
      tieBreakerWinner.sort(() => 0.5 - Math.random())[0]
    );
    return tieBreakerWinner.sort(() => 0.5 - Math.random())[0];
  }
};

let tournament = {
  round1: {
    match1: [{ white: 3 }, { black: 2 }],
    match2: [{ red: 6 }, { blue: 2 }],
    match3: [{ green: 3 }, { orange: 5 }],
    match4: [{ brown: 3 }, { purple: 5 }],
  },
  round2: {
    match1: [{ black: 4 }, { blue: 3 }],
    match2: [{ white: 3 }, { orange: 2 }],
    match3: [{ red: 5 }, { purple: 6 }],
    match4: [{ green: 3 }, { brown: 5 }],
  },
  round3: {
    match1: [{ blue: 5 }, { orange: 3 }],
    match2: [{ black: 2 }, { purple: 1 }],
    match3: [{ white: 6 }, { brown: 5 }],
    match4: [{ red: 5 }, { green: 3 }],
  },
  round4: {
    match1: [{ orange: 5 }, { purple: 3 }],
    match2: [{ blue: 2 }, { brown: 6 }],
    match3: [{ black: 5 }, { green: 5 }],
    match4: [{ white: 3 }, { red: 5 }],
  },
  round5: {
    match1: [{ black: 5 }, { red: 5 }],
    match2: [{ white: 3 }, { blue: 4 }],
    match3: [{ orange: 2 }, { brown: 5 }],
    match4: [{ purple: 2 }, { green: 4 }],
  },
};

let allTiedTournament = {
  round1: {
    match1: [{ white: 1 }, { black: 1 }],
    match2: [{ red: 1 }, { blue: 1 }],
    match3: [{ green: 1 }, { orange: 1 }],
    match4: [{ brown: 1 }, { purple: 1 }],
  },
  round2: {
    match1: [{ black: 1 }, { blue: 1 }],
    match2: [{ white: 1 }, { orange: 1 }],
    match3: [{ red: 1 }, { purple: 1 }],
    match4: [{ green: 1 }, { brown: 1 }],
  },
  round1: {
    match1: [{ blue: 1 }, { orange: 1 }],
    match2: [{ black: 1 }, { purple: 1 }],
    match3: [{ white: 1 }, { brown: 1 }],
    match4: [{ red: 1 }, { green: 1 }],
  },
  round4: {
    match1: [{ orange: 1 }, { purple: 1 }],
    match2: [{ blue: 1 }, { brown: 1 }],
    match3: [{ black: 1 }, { green: 1 }],
    match4: [{ white: 1 }, { red: 1 }],
  },
  round5: {
    match1: [{ black: 1 }, { red: 1 }],
    match2: [{ white: 1 }, { blue: 1 }],
    match3: [{ orange: 1 }, { brown: 1 }],
    match4: [{ purple: 1 }, { green: 1 }],
  },
};
gameWinnerCalc(tournament);
gameWinnerCalc(allTiedTournament);
