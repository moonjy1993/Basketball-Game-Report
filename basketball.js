
var request = require('request');
request('http://foureyes.github.io/csci-ua.0480-spring2016-010/homework/02/0021500750.json', function (error, response, body) {
  handleResponse(JSON.parse(body));
})

function handleResponse(PData){
	var GameNext=PData.next;
    var GameID=PData.id;
    var players=PData.players;

    var first_team_name= players[0].team_name;
    var second_team_name=players[players.length-1].team_name;


    //Game ID
    console.log("Game ID: ", GameID);
    console.log("=====");


      function TeamMatch(teamName){
        return function(player){return player.team_name === teamName;}
      }
      function finalScore(player){
        return 2*(Number(player.field_goals_made) - Number(player.three_pointers_made)) + (3*Number(player.three_pointers_made)) + Number(player.free_throws_made);
      }
      function sum(curTotal, num){
        return curTotal+num;
      }
      function total(arr){
        return arr.reduce(sum,0);
      }


      function maximum(a,b){
        return a>b;
      }
      // Final Score


      var firsttotal = total(players.filter(TeamMatch(first_team_name)).map(finalScore));
      var secondtotal = total(players.filter(TeamMatch(second_team_name)).map(finalScore));

      console.log(first_team_name,  firsttotal);
      console.log(second_team_name,  secondtotal);



    //Player with the Most rebounds



     function maxPlayer(arr){
          var maxrebound={
            name: null,
            maxscore:0
          }
          for(var i=0; i< (arr.length-1); i++){
            if(arr[i].score> maxrebound.maxscore){
              maxrebound.name=arr[i].player_name;
              maxrebound.maxscore=arr[i].score;
            }
        } 
        return maxrebound;
      }
      

    function rebound(player){
        var rebound= {
          score: Number(player.rebounds_defensive) + Number(player.rebounds_offensive),
          player_name: player.first_name + " " + player.last_name
        }
        
        return rebound;
    }

    var maxrebound= maxPlayer(players.map(rebound));
    console.log("* Most rebounds: ", maxrebound.name, "  with ", maxrebound.maxscore);




    //Garud with highest three pointer percentage


      
      function isGuard(player){
        return player.position_short ==="G"
      }

      var GuardPlayers= players.filter(isGuard);

      var max = 0;
      var playerM = "";

      GuardPlayers.forEach(function(player){

        var threePercent = (Number(player.three_pointers_made)/Number(player.three_pointers_attempted))*100;
        if (threePercent>max){
          max = threePercent;
          playerM = player.first_name + "  " + player.last_name;
        }
      });

    console.log("* Guard (G) with highest 3 point percentage: ", playerM, " at %" , max);



    //Total Number of Players With at Least One Assist

    var assisttotal =0;
    players.forEach(function(player){
      if(Number(player.assists)>=1) assisttotal++;
    })
    console.log("* There were ", assisttotal, "players that had at least one assist");


    //Team That Attempted the Most Free Throws


      function Freethrows(player){
        return Number(player.free_throws_attempted);
      }

      var firstteam = total(players.filter(TeamMatch(first_team_name)).map(Freethrows));
      var secondteam = total(players.filter(TeamMatch(second_team_name)).map(Freethrows));

      var maxFreethrows = maximum(firstteam, secondteam);
      console.log("*", maxFreethrows? first_team_name: second_team_name, "attempted the most free throws...", first_team_name, ": ", firstteam, second_team_name, ": ", secondteam);

    //Players With More Turnovers Than Assists

    function Gcd (a,b){
          if(b==0) return a
          return Gcd (b, a%b);
      }

    function makeratio(assist, turnover){
      var gcd= Gcd(assist,turnover)
      return (assist/gcd).toString() + " : " + (turnover/gcd).toString();
    }

      function moreTurnovers(player){
        return Number(player.turnovers)>Number(player.assists);
      }

      function playerName (player){
        var string= " has an assis to turnover ratio of  " + makeratio(player.assists, player.turnovers);
        return "  * " + player.first_name + " " + player.last_name + string;
      }

      var firstTeamTurnover = players.filter(TeamMatch(first_team_name)).filter(moreTurnovers).map(playerName);
      var secondTeamTurnover= players.filter(TeamMatch(second_team_name)).filter(moreTurnovers).map(playerName);

      console.log("* ", first_team_name+ " players with more turnovers than assists");
      firstTeamTurnover.forEach(function x(a){
        console.log(a);
      });

      console.log("* ", second_team_name+ " players with more turnovers than assists");
     secondTeamTurnover.forEach(function x(a){
        console.log(a);
      });




     if(!(!GameNext || 0 === GameNext.length)){
     	var request = require('request');
		request(GameNext, function (error, response, body) {
  			handleResponse(JSON.parse(body));
    	 })
 	}

}