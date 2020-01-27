# minesweeper-API
API test

We ask that you complete the following challenge to evaluate your development skills. Please use the programming language and framework discussed during your interview to accomplish the following task.

## The Game
Develop the classic game of [Minesweeper](https://en.wikipedia.org/wiki/Minesweeper_(video_game))

## Show your work

1.  Create a Public repository ( please dont make a pull request, clone the private repository and create a new plublic one on your profile)
2.  Commit each step of your process so we can follow your thought process.

## What to build
The following is a list of items (prioritized from most important to least important) we wish to see:
* Design and implement  a documented RESTful API for the game (think of a mobile app for your API)
* Implement an API client library for the API designed above. Ideally, in a different language, of your preference, to the one used for the API
* When a cell with no adjacent mines is revealed, all adjacent squares will be revealed (and repeat)
* Ability to 'flag' a cell with a question mark or red flag
* Detect when game is over
* Persistence
* Time tracking
* Ability to start a new game and preserve/resume the old ones
* Ability to select the game parameters: number of rows, columns, and mines
* Ability to support multiple users/accounts
 
## Deliverables we expect:
* URL where the game can be accessed and played (use any platform of your preference: heroku.com, aws.amazon.com, etc)
* Code in a public Github repo
* README file with the decisions taken and important notes

## Time Spent
You do not need to fully complete the challenge. We suggest not to spend more than 5 hours total, which can be done over the course of 2 days.  Please make commits as often as possible so we can see the time you spent and please do not make one commit.  We will evaluate the code and time spent.
 
What we want to see is how well you handle yourself given the time you spend on the problem, how you think, and how you prioritize when time is insufficient to solve everything.

Please email your solution as soon as you have completed the challenge or the time is up.

## Development - Yamila Maio

First things first, I had to think about the problem. As usual, I started doing some research. I even played minesweeper for quite a while (love the  game). 
I came upon some minesweepers APIs but really did not like any previous implementation I found. Or maybe liked something but did not like other things about it.

I figured the first thing I had to decide was "What are my resources?" The API should be able to access the game, the board and the cells. 
I was quite a while thinking if only using board and modifying it's state or add cells as resources of the board and just modify cells. Using cells would allow me to have less data payload each time I visit a cell, but client library should have to keep state of all cells.
 
 However, for my first iteration I decided for the following model:
 
 /games
    id: unique identifier for a game
    board: link to associated board
    width: number of cols the board has
    height: number of cells the board has
    mines: number of total mines
    remainingMines: number of remaining mines to uncover
    status: game state (won, lost, in progress)
    
Possible Actions:
    POST: Create new game
    GET: {id} Get a game's information
    GET: Get collection of games
    
/game/{id}/board
    id: unique identifier for a game
    width: number of cols the board has
    height: number of cells the board has
    mines: number of total mines
    remainingMines: number of remaining mines to uncover
    cells: collection of board cells

Possible Actions:
    GET: Get the boards's information
    
/game/{id}/board/cell  
    id: unique identifier for a cell
    x: row
    y: col
    mine: true/false (has mine?)
    adjacentMines: number of adjacent mines
    flag: true/false (has been flagged as mine)

Possible Actions:
    GET: {x,y} Get the cell information
    PUT: {x,y} Visit cell. Changes flag status or returns error is cell had mine
    
    
I also thought about what I had to do when creating a game:
 * Generate board with random location of mines
 * Complete cell information with number of adjacent mines
 
I decided before exposing any route with resources I'd first implement modules with the needed functionality and test them. Then I would expose whatever I needed.

Whenever I begin a new proyect, the first thing I do is get a docker up and running. Then, I move forward. So... here I go.
    
 
 
 
 


