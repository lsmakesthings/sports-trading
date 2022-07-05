# Prototypes

## State Modelling
### States
- Basic States:
    - PRE
    - IN-PLAY
    - SUSPENDED
    - COMPLETE
    - SETTLED
- Extra States for Football
    - Children of IN-PLAY
        - FIRST-HALF
        - HALF-TIME
        - SECOND-HALF
        - EXTRA-TIME(+variants)
    - League Event will need to model Matches IN-PLAY and NOT-IN-PLAY
- Runing Order
    - For racing will be order on track
    - For Football will be scoreline
        - Metadata for team/time(/player/coords etc) from action data
### Actions
- Basic Actions
    - START
    - END - Result
    - SETTLE - Confirm Result or Correct Result
- Extra Actions for Football
    - HALF-TIME
    - GOAL - Team/Time(/Player/Coords etc)
    - CARD  - YorR/Team/Time(/Player/Coords etc)
    - CORNER/FREE-KICK - Team/Time(/Player/Coords etc)
    - xG/xA?