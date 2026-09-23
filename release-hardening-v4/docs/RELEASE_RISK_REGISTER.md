# Release Risk Register

| Risk | Failure mode | Guard | Verification |
|---|---|---|---|
| Camera | permission denial | safe permission guards | real device |
| Media | corrupt/oversized file | validate before upload | fixture + TestFlight |
| Network | offline/timeout/5xx | safeFetch + retry | airplane mode |
| Analysis | hung/duplicate jobs | watchdog + queue + idempotency | long clip + rapid taps |
| Auth | expired session | safe API client | token expiry |
| Billing | cancelled purchase | UI error state | sandbox purchase |
| Storage | corrupted local JSON | safe JSON fallback | mutate fixture |
| Navigation | invalid/deep link | route guard | cold-launch links |
| Privacy | missing/incorrect manifest | audit script + human review | archive inspection |
| Review | incomplete access | reviewer checklist | App Store Connect |
