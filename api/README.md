### Start

```sh
docker build -f dev.api.Dockerfile -t friends-fued-api .
docker run -d -p 3000:3000 friends-fued-api
```

### API Ideas

The game state:

```json
{
  "rounds": [
    {
      "question": "Name a superpower.",
      "answers": [
        {
          "text": "INVINCIBILITY",
          "points": 8,
          "revealed": false
        }
      ],
      "points": 0,
      "strikes": 0
    }
  ],
  "team1": {
    "name": "Camelulu",
    "score": 0
  },
  "team2": {
    "name": "Fruits",
    "score": 0
  },
  "currentRound": 0,
  "showQuestion": false
}
```
