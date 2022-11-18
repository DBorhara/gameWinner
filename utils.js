function scoreCalc(tournamentObj, scoreboard) {
  for (const round in tournamentObj) {
    let roundObj = tournamentObj[round];
    for (const matchTitle in roundObj) {
      let match = roundObj[matchTitle];
      let team1Name = Object.keys(match[0]).toString();
      let team1Score = match[0][team1Name];
      let team2Name = Object.keys(match[1]).toString();
      let team2Score = match[1][team2Name];

      if (!scoreboard[team1Name]) {
        // Team 1 Doesn't Exist in Scoreboard
        scoreboard[team1Name] = 0;
      }
      if (!scoreboard[team2Name]) {
        // Team 2 Doesn't Exist in Scoreboard
        scoreboard[team2Name] = 0;
      }
      if (team1Score > team2Score) {
        // Team 1 wins
        scoreboard[team1Name]++;
      }
      if (team1Score < team2Score) {
        // Team 2 wins
        scoreboard[team2Name]++;
      }
      if (team1Score == team2Score) {
        // Team 1 and 2 tie
        scoreboard[team1Name]++;
        scoreboard[team2Name]++;
      }
    }
  }
}

function winLossTieCalc(tournamentObj, tournamentWinner, tieBreakerTally) {
  for (const round in tournamentObj) {
    let roundObj = tournamentObj[round];
    for (const matchTitle in roundObj) {
      let match = roundObj[matchTitle];
      let team1Name = Object.keys(match[0]).toString();
      let team1Score = match[0][team1Name];
      let team2Name = Object.keys(match[1]).toString();
      let team2Score = match[1][team2Name];
      if (
        tournamentWinner.includes(team1Name) &&
        tournamentWinner.includes(team2Name)
      ) {
        if (!tieBreakerTally[team1Name]) {
          tieBreakerTally[team1Name] = {
            win: 0,
            loss: 0,
            tie: 0,
            winPercentage: 0,
          };
        }
        if (!tieBreakerTally[team2Name]) {
          tieBreakerTally[team2Name] = {
            win: 0,
            loss: 0,
            tie: 0,
            winPercentage: 0,
          };
        }
        if (team1Score > team2Score) {
          tieBreakerTally[team1Name].win++;
          tieBreakerTally[team2Name].loss++;
        }
        if (team1Score < team2Score) {
          tieBreakerTally[team1Name].loss++;
          tieBreakerTally[team2Name].win++;
        }
        if (team1Score === team2Score) {
          tieBreakerTally[team1Name].tie++;
          tieBreakerTally[team2Name].tie++;
        }
      }
    }
  }
}

function winningPercentageCalc(tieBreakerTally) {
  for (const team in tieBreakerTally) {
    let record = tieBreakerTally[team];
    let winCount = record.win;
    let tieCount = record.tie;
    let lossCount = record.loss;
    let total = winCount + lossCount + tieCount;
    let winningPercentage = ((2 * winCount + tieCount) / (2 * total)) * 100;
    record.winPercentage = winningPercentage;
  }
}

function tieBreakerCalc(tieBreakerTally, tieBreakerWinner) {
  for (const team in tieBreakerTally) {
    let highestWinPercentage = 0;
    let highestPercentageTeam = [];
    let currentTeamWinPercentage = tieBreakerTally[team].winPercentage;
    if (highestWinPercentage < currentTeamWinPercentage) {
      highestWinPercentage = currentTeamWinPercentage;
      if (tieBreakerWinner.length) {
        let currentLeadingTeam = tieBreakerWinner[0];
        if (
          tieBreakerTally[team].winPercentage >
          tieBreakerTally[currentLeadingTeam].winPercentage
        ) {
          tieBreakerWinner.pop();
        }
      }
      if (!tieBreakerWinner.includes(team)) {
        tieBreakerWinner.push(team);
      }
    }
    if (highestWinPercentage === currentTeamWinPercentage) {
      if (!tieBreakerWinner.includes(team)) {
        tieBreakerWinner.push(team);
      }
    }
  }
}

exports.scoreCalc = scoreCalc;
exports.winLossTieCalc = winLossTieCalc;
exports.winningPercentageCalc = winningPercentageCalc;
exports.tieBreakerCalc = tieBreakerCalc;
