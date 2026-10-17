import { HolePlan } from '../types';

export const MOCK_COURSE: HolePlan[] = [
  {
    "hole": 1,
    "par": 4,
    "yardage": 375,
    "windMph": 5,
    "windDirectionDeg": 37,
    "elevationFt": -18,
    "pinYardsFromFront": 27,
    "hazards": [
      {
        "id": "h1-bunker",
        "type": "bunker",
        "distanceFromGreenYards": 21,
        "lateralYards": 12,
        "penaltyStroke": false
      }
    ]
  },
  {
    "hole": 2,
    "par": 4,
    "yardage": 410,
    "windMph": 6,
    "windDirectionDeg": 74,
    "elevationFt": 0,
    "pinYardsFromFront": 34,
    "hazards": [
      {
        "id": "h2-bunker",
        "type": "bunker",
        "distanceFromGreenYards": 22,
        "lateralYards": -10,
        "penaltyStroke": false
      }
    ]
  },
  {
    "hole": 3,
    "par": 4,
    "yardage": 165,
    "windMph": 7,
    "windDirectionDeg": 111,
    "elevationFt": 18,
    "pinYardsFromFront": 41,
    "hazards": [
      {
        "id": "h3-water",
        "type": "water",
        "distanceFromTeeYards": 245,
        "lateralYards": -8,
        "penaltyStroke": true
      },
      {
        "id": "h3-bunker",
        "type": "bunker",
        "distanceFromGreenYards": 23,
        "lateralYards": 12,
        "penaltyStroke": false
      }
    ]
  },
  {
    "hole": 4,
    "par": 3,
    "yardage": 390,
    "windMph": 8,
    "windDirectionDeg": 148,
    "elevationFt": 36,
    "pinYardsFromFront": 48,
    "hazards": [
      {
        "id": "h4-bunker",
        "type": "bunker",
        "distanceFromGreenYards": 24,
        "lateralYards": -10,
        "penaltyStroke": false
      }
    ]
  },
  {
    "hole": 5,
    "par": 5,
    "yardage": 520,
    "windMph": 9,
    "windDirectionDeg": 185,
    "elevationFt": -36,
    "pinYardsFromFront": 55,
    "hazards": [
      {
        "id": "h5-bunker",
        "type": "bunker",
        "distanceFromGreenYards": 25,
        "lateralYards": 12,
        "penaltyStroke": false
      }
    ]
  },
  {
    "hole": 6,
    "par": 4,
    "yardage": 385,
    "windMph": 10,
    "windDirectionDeg": 222,
    "elevationFt": -18,
    "pinYardsFromFront": 62,
    "hazards": [
      {
        "id": "h6-water",
        "type": "water",
        "distanceFromTeeYards": 260,
        "lateralYards": 9,
        "penaltyStroke": true
      },
      {
        "id": "h6-bunker",
        "type": "bunker",
        "distanceFromGreenYards": 26,
        "lateralYards": -10,
        "penaltyStroke": false
      }
    ]
  },
  {
    "hole": 7,
    "par": 4,
    "yardage": 430,
    "windMph": 11,
    "windDirectionDeg": 259,
    "elevationFt": 0,
    "pinYardsFromFront": 69,
    "hazards": [
      {
        "id": "h7-bunker",
        "type": "bunker",
        "distanceFromGreenYards": 27,
        "lateralYards": 12,
        "penaltyStroke": false
      }
    ]
  },
  {
    "hole": 8,
    "par": 3,
    "yardage": 175,
    "windMph": 4,
    "windDirectionDeg": 296,
    "elevationFt": 18,
    "pinYardsFromFront": 76,
    "hazards": [
      {
        "id": "h8-bunker",
        "type": "bunker",
        "distanceFromGreenYards": 28,
        "lateralYards": -10,
        "penaltyStroke": false
      }
    ]
  },
  {
    "hole": 9,
    "par": 5,
    "yardage": 505,
    "windMph": 5,
    "windDirectionDeg": 333,
    "elevationFt": 36,
    "pinYardsFromFront": 23,
    "hazards": [
      {
        "id": "h9-water",
        "type": "water",
        "distanceFromTeeYards": 275,
        "lateralYards": -8,
        "penaltyStroke": true
      },
      {
        "id": "h9-bunker",
        "type": "bunker",
        "distanceFromGreenYards": 29,
        "lateralYards": 12,
        "penaltyStroke": false
      }
    ]
  },
  {
    "hole": 10,
    "par": 4,
    "yardage": 360,
    "windMph": 6,
    "windDirectionDeg": 10,
    "elevationFt": -36,
    "pinYardsFromFront": 30,
    "hazards": [
      {
        "id": "h10-bunker",
        "type": "bunker",
        "distanceFromGreenYards": 30,
        "lateralYards": -10,
        "penaltyStroke": false
      }
    ]
  },
  {
    "hole": 11,
    "par": 4,
    "yardage": 420,
    "windMph": 7,
    "windDirectionDeg": 47,
    "elevationFt": -18,
    "pinYardsFromFront": 37,
    "hazards": [
      {
        "id": "h11-bunker",
        "type": "bunker",
        "distanceFromGreenYards": 31,
        "lateralYards": 12,
        "penaltyStroke": false
      }
    ]
  },
  {
    "hole": 12,
    "par": 3,
    "yardage": 180,
    "windMph": 8,
    "windDirectionDeg": 84,
    "elevationFt": 0,
    "pinYardsFromFront": 44,
    "hazards": [
      {
        "id": "h12-water",
        "type": "water",
        "distanceFromTeeYards": 290,
        "lateralYards": 9,
        "penaltyStroke": true
      },
      {
        "id": "h12-bunker",
        "type": "bunker",
        "distanceFromGreenYards": 32,
        "lateralYards": -10,
        "penaltyStroke": false
      }
    ]
  },
  {
    "hole": 13,
    "par": 5,
    "yardage": 515,
    "windMph": 9,
    "windDirectionDeg": 121,
    "elevationFt": 18,
    "pinYardsFromFront": 51,
    "hazards": [
      {
        "id": "h13-bunker",
        "type": "bunker",
        "distanceFromGreenYards": 33,
        "lateralYards": 12,
        "penaltyStroke": false
      }
    ]
  },
  {
    "hole": 14,
    "par": 4,
    "yardage": 445,
    "windMph": 10,
    "windDirectionDeg": 158,
    "elevationFt": 36,
    "pinYardsFromFront": 58,
    "hazards": [
      {
        "id": "h14-bunker",
        "type": "bunker",
        "distanceFromGreenYards": 34,
        "lateralYards": -10,
        "penaltyStroke": false
      }
    ]
  },
  {
    "hole": 15,
    "par": 4,
    "yardage": 165,
    "windMph": 11,
    "windDirectionDeg": 195,
    "elevationFt": -36,
    "pinYardsFromFront": 65,
    "hazards": [
      {
        "id": "h15-water",
        "type": "water",
        "distanceFromTeeYards": 305,
        "lateralYards": -8,
        "penaltyStroke": true
      },
      {
        "id": "h15-bunker",
        "type": "bunker",
        "distanceFromGreenYards": 35,
        "lateralYards": 12,
        "penaltyStroke": false
      }
    ]
  },
  {
    "hole": 16,
    "par": 4,
    "yardage": 425,
    "windMph": 4,
    "windDirectionDeg": 232,
    "elevationFt": -18,
    "pinYardsFromFront": 72,
    "hazards": [
      {
        "id": "h16-bunker",
        "type": "bunker",
        "distanceFromGreenYards": 36,
        "lateralYards": -10,
        "penaltyStroke": false
      }
    ]
  },
  {
    "hole": 17,
    "par": 3,
    "yardage": 195,
    "windMph": 5,
    "windDirectionDeg": 269,
    "elevationFt": 0,
    "pinYardsFromFront": 79,
    "hazards": [
      {
        "id": "h17-bunker",
        "type": "bunker",
        "distanceFromGreenYards": 37,
        "lateralYards": 12,
        "penaltyStroke": false
      }
    ]
  },
  {
    "hole": 18,
    "par": 5,
    "yardage": 530,
    "windMph": 6,
    "windDirectionDeg": 306,
    "elevationFt": 18,
    "pinYardsFromFront": 26,
    "hazards": [
      {
        "id": "h18-water",
        "type": "water",
        "distanceFromTeeYards": 320,
        "lateralYards": 9,
        "penaltyStroke": true
      },
      {
        "id": "h18-bunker",
        "type": "bunker",
        "distanceFromGreenYards": 38,
        "lateralYards": -10,
        "penaltyStroke": false
      }
    ]
  }
] as HolePlan[];

