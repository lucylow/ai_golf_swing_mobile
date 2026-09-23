# AI Golf Swing Coach — Mobile Interface Design

## Product direction

AI Golf Swing Coach is a focused, premium-feeling practice companion for golfers who want a fast answer to one question: “What should I work on next?” The interface uses a calm fairway-inspired palette, compact scorecards, and strong camera-first actions. Every primary control is reachable with one hand in portrait orientation.

## Screen list

| Screen | Primary content and functionality |
|---|---|
| Home | Greeting, current handicap, readiness summary, large Record Swing action, recent sessions, and a personalized practice tip. |
| Analyze | Camera/recording surface with alignment grid, club selector, slow-motion toggle, recording state, and transition into analysis. |
| Analysis Result | Swing score, highlighted metrics, detected fault, recommended drill, comparison CTA, and save/share actions. |
| Library | Search, club filters, swing cards with score/date/club, and entry into a swing detail view. |
| Swing Detail | Video preview, metrics breakdown, fault history, drill recommendation, and compare/share actions. |
| Progress | Trend chart, metric selector, goal progress, streak summary, and create-goal flow. |
| Profile | Player identity, handicap, handedness, preferred club, unit settings, notification/privacy preferences, and coach mode entry. |
| Onboarding | Three-value-proposition walkthrough followed by a lightweight player setup flow for handicap, handedness, and preferred club. |

## Key user flows

### First launch
1. User sees the branded splash and moves through three concise value slides.
2. User chooses “Try a sample swing” or continues to player setup.
3. User enters handicap, handedness, and preferred club.
4. User lands on Home with the Record Swing action emphasized.

### Record and analyze
1. User taps Record Swing from Home or Analyze.
2. User selects a club and aligns the camera using the framing grid.
3. User records a short swing; the app shows a clear recording state and timer.
4. User stops recording and sees an analysis progress state.
5. User lands on Analysis Result with score, metrics, a primary fault, and a next drill.

### Improve over time
1. User opens Progress and selects a metric such as club speed or tempo.
2. User reviews trend and goal completion.
3. User taps a session point to open Swing Detail.
4. User returns to Home with a practice recommendation.

## Layout principles

The app is designed for 9:16 portrait use. Home uses a top identity row, a hero score card, a full-width recording CTA, and horizontally scrolling session cards. Analyze is visually immersive with a high-contrast camera canvas and bottom action rail. Progress prioritizes one chart and one goal card per viewport. Profile uses grouped iOS-style settings sections. Cards have 18–24px radii, generous spacing, and restrained shadows.

## Color choices

| Token | Color | Use |
|---|---|---|
| Ink | `#102A24` | Primary text and high-contrast headings |
| Fairway | `#1F6B4F` | Primary action, progress, and brand anchor |
| Fairway Deep | `#124438` | Dark surfaces and hero gradients |
| Mist | `#F5F7F2` | Main canvas background |
| Surface | `#FFFFFF` | Cards and controls |
| Sand | `#E9D8B4` | Warm supporting highlight |
| Sun | `#F4B942` | Scores, accents, and attention states |
| Coral | `#D96852` | Recording and caution states |
| Muted | `#70817A` | Secondary text and metadata |

## Interaction and accessibility

Primary actions use press-state opacity and subtle scale feedback, with haptics reserved for recording, save, and completion moments. Text remains readable over the dark hero card. Every icon action has a text label or accessible label. Lists use performant virtualized rendering. The initial prototype uses local deterministic sample data and keeps backend/auth out of the critical interaction loop until explicitly needed.
