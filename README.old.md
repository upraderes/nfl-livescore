# nfl-livescore
A simple application to display live NFL scores.

## architecture
Data is retrieved through the ESPN API: https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard

A React frontend displays the live scores.
The information we want to show is the following:
- Team name
- Score
- Match status (in progress, final, upcoming)
- Quarter (1st, 2nd, 3rd, 4th)
- Remaining timeouts for each team
- Possession, including the number of attempts and yards remaining
