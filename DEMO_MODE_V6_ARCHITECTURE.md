# Demo Mode V6 Architecture

## Data
Deterministic generators create enough synthetic data to populate the product consistently.

## Intelligence
The demo analysis path evaluates pose quality, selects metrics, creates a pattern-based insight and returns a coaching action. It is presentation/demo logic, not a scientific model benchmark.

## Runtime
DemoController owns isolated mutable state and emits simple events for screens.

## UX
Screens are directly routeable and styled to match the existing dark green / electric lime product system.

## Safety
Do not connect DemoController to production endpoints or treat illustrative outputs as measured ML performance.
