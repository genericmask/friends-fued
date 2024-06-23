### API Ideas

I want to have an SSE stream at `/view/<unique-session-id>` that will stream events such as:
* updates to the answers (answer text, points, revealed status, index)
* updates to the question
* team updates (score, name)
* new round with all the round information (answers, question, round score pool)
* cues
    - strike (which would bring up a big red X for each strike)*
    - displaying or hiding the question.

There will be a control page on the front end that, upon creating a game, should receive a unique session id. All endpoints for it would start with this: /control/<unique-session-id>. The page, using the REST API, should be able to create, delete, and switch the currently active rounds, change the order of the rounds, add/modify round answers, add/modify the round question, add a strike to the round tally (which would cue the view page to display the number of strikes), set a maximum number of strikes, reveal or hide answers, display the question or hide the question (default state for the view page would be to show the game board), modify team names, add or remove points from a team, reset the game (hide all answers, set round and team scores to 0, show the first round), update the game name, and retrieve or delete past games.