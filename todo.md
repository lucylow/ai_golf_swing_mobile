# Project TODO

- [x] Initialize Expo React Native project scaffold
- [x] Create mobile interface design plan
- [x] Define initial local prototype scope and sample data vocabulary
- [x] Generate and apply custom AI Golf Swing Coach app branding assets
- [x] Update theme tokens and app configuration for the golf coaching brand
- [x] Build Home dashboard with score summary, recent swings, and practice tip
- [x] Build Analyze tab with camera-inspired recording surface and controls
- [x] Build Library tab with swing history, search, and filters
- [x] Build Progress tab with metric trend and goal card
- [x] Build Profile tab with player settings and preferences
- [x] Add navigable Analysis Result and Swing Detail flows
- [x] Add local interaction states for recording, saving, and goal selection
- [x] Add icon mappings for all new tab and action icons
- [x] Run TypeScript, lint, and app preview checks

- [ ] Add authentication entry flow compatible with the app's existing Expo Router structure
- [x] Add analysis-result screen with metrics, faults, drills, and comparison entry points
- [x] Add swing-detail screen for saved session inspection
- [x] Add typed domain models for user profiles, swing sessions, metrics, faults, drills, and goals
- [x] Add deterministic local swing-analysis service interfaces for future pose model integration
- [ ] Add local persistence boundary for swings and profile settings
- [x] Document Firebase/cloud processing as a future integration rather than adding placeholder credentials
- [ ] Add user-facing error and loading states for recording and analysis flows

- [x] Add modular swing-phase detection from pose landmark sequences
- [x] Add reusable geometric metric calculations for hip, shoulder, spine, knee, speed, plane, tempo, and head movement
- [x] Add golf fault detection with severity and confidence
- [x] Add drill recommendation service mapped to detected faults
- [x] Add pro-swing comparison interface and similarity score model
- [x] Add an orchestration service that composes pose input, phases, metrics, faults, drills, and comparison
- [x] Add deterministic analysis-service tests covering low-frame fallback and metric output shape

- [x] Add local persistence for profile settings and swing-session metadata
- [x] Add a reusable local app state provider for profile and session updates
- [x] Add loading and completion feedback to the Analyze flow
- [x] Add explicit unavailable/error feedback for camera-dependent actions
- [x] Add a functional goal-edit interaction in Progress
- [x] Add functional save/share interaction state to analysis detail screens
- [ ] Add tests for local persistence and analysis interaction state transitions

- [x] Add reusable Loader and Toast feedback components compatible with the current design system
- [x] Add reusable primary/secondary action button component with loading and disabled states
- [x] Add reusable section header and empty-state components for mobile lists
- [x] Add a first-launch onboarding route with three golf-coaching value slides
- [x] Add a lightweight profile setup step for handicap, handedness, and preferred club
- [ ] Add tests for onboarding progression and feedback component state behavior

- [x] Add camera permission and device-capability boundary for Analyze
- [x] Add an explicit camera unavailable state with recovery guidance
- [x] Persist completed analysis results into the local swing-session store
- [x] Show newly saved analysis sessions in Library without a refresh
- [x] Add functional save confirmation and share fallback states on analysis screens
- [x] Add tests for session persistence and camera capability state transitions

- [x] Add reusable fade/slide animation hooks and an animated card primitive
- [x] Add haptic feedback helpers with web-safe guards
- [x] Add accessibility helpers for buttons, headers, and visual content
- [x] Add an offline-awareness hook and offline banner without introducing a new dependency
- [x] Add app lifecycle awareness for recording and analysis states
- [x] Add tests for UX utility behavior and web-safe fallbacks

- [x] Persist the completed analysis result when the Analyze flow finishes
- [x] Render persisted sessions from the shared state in Library
- [x] Add an offline banner to the root app shell
- [x] Add save confirmation and share fallback feedback to result screens
- [x] Add utility tests for camera capability, offline status, and state serialization

- [x] Add Expo Camera native permission/capture adapter with web simulation fallback
- [x] Add camera-facing and capture-state controls to Analyze
- [x] Add delete-session behavior with confirmation feedback in Library
- [x] Add functional share/export boundary for saved analysis results
- [x] Add tests for the capture adapter and session deletion behavior

- [x] Wire Expo CameraView permission state into the Analyze screen
- [x] Add native camera facing toggle and record/stop controls with web simulation fallback
- [x] Add a persisted-session delete method to the shared app state provider
- [x] Add Library delete confirmation and visual feedback
- [x] Add native share/export integration with web-safe fallback

- [x] Add expo-sharing native share adapter with web-safe fallback
- [x] Connect analysis result share action to the native adapter
- [x] Add a capture completion review state before navigating to analysis
- [x] Add recorded-video metadata to the saved session boundary
- [x] Add tests for share-mode selection and capture completion transitions

- [x] Add a capture-complete review state before navigating to analysis
- [x] Store captured video URI and capture mode metadata with the session
- [x] Add review actions for retake and continue to analysis
- [x] Add tests for capture-review state transitions and metadata serialization

- [x] Add a video preview surface for native captured URIs with simulated fallback artwork
- [x] Add play/pause state to the capture review preview
- [x] Add robust analysis cancellation and cleanup when leaving Analyze
- [x] Add explicit analysis failure feedback and retry action
- [x] Add tests for preview mode selection and analysis cancellation state

- [x] Add provider-agnostic entitlement and product tier domain models
- [x] Add local premium entitlement state with AsyncStorage persistence
- [x] Add premium feature gating helper for advanced analysis and coach content
- [x] Add paywall-ready pricing model and non-transactional upgrade UI state
- [x] Add ad-visibility policy boundary without installing ad SDKs or placeholder IDs
- [x] Add deterministic tests for entitlement gating and free-tier limits

- [x] Add a reusable premium status card for Profile and paywall entry
- [x] Add provider-neutral restore and manage-subscription action states
- [x] Add a consistent premium feature prompt component for locked analysis features
- [x] Add a visible free-analysis usage indicator in Analyze
- [x] Add tests for premium prompt visibility and subscription action states

- [x] Add a cancellable analysis task boundary with cleanup on unmount and app backgrounding
- [x] Add an explicit analysis failure state with retry and retake actions
- [x] Add timeout protection for stalled local analysis
- [x] Add deterministic tests for analysis task cancellation and retry transitions

- [x] Add typed analysis pipeline stages for capture, pose, metrics, faults, and recommendations
- [x] Add stage progress helper with safe cancellation behavior
- [x] Render current stage label and progress in Analyze
- [x] Add retry messaging tied to the failed stage
- [x] Add deterministic tests for stage progression and cancellation

- [x] Add deterministic stage-output models for pose, metrics, faults, and recommendations
- [x] Connect stage outputs to the analysis-result route payload
- [x] Render stage-derived highlights in Analysis Result
- [x] Preserve stage outputs in saved swing-session metadata
- [x] Add tests for stage-output serialization and result mapping

- [x] Add pipeline highlight summaries to Swing Detail
- [x] Add compact stage-output context to Library session cards
- [x] Preserve stage outputs when opening saved sessions
- [x] Add tests for saved stage-output rendering data

- [x] Add a comparison route for saved swings with a selected session context
- [x] Connect Swing Detail Compare Swing action to the comparison route
- [x] Connect Save Report to native/web share feedback
- [x] Connect recommended drill action to a focused drill view or feedback state
- [x] Add tests for saved-session review action routing

- [x] Add selected and previous video context cards to Compare Swing
- [x] Add dedicated drill-detail route with instructions and completion state
- [x] Persist local drill completion state with the golf app provider
- [x] Connect Compare Swing and Swing Detail drill actions to the new flows
- [x] Add tests for comparison selection and drill completion transitions

- [x] Show completed drill count and practice consistency in Progress
- [x] Add a completed-drill summary card with direct drill-detail entry
- [x] Make the next-practice card reflect local drill completion state
- [x] Add tests for Progress drill-summary derivation

- [x] Add a provider-neutral monetization analytics event model and local event queue
- [x] Add promo-code and referral attribution state with safe validation boundaries
- [x] Add consumable analysis-credit accounting without simulating a purchase
- [x] Add subscription-state synchronization contract for future RevenueCat wiring
- [x] Add tests for analytics events, referral validation, and credit accounting

- [x] Make Analyze secondary controls functional with clear local feedback for slow-motion and upload actions
- [x] Add a lightweight Library filter interaction with persisted-session-safe behavior
- [x] Add deterministic tests for the new Analyze and Library interaction contracts

- [x] Add a native-safe media source contract for uploaded and captured swing videos
- [x] Improve Analyze review metadata so uploaded videos are distinguished from camera captures
- [x] Add deterministic tests for media-source classification and review metadata

- [x] Make the Progress metric selector functional with local metric views
- [x] Derive Progress summary values from persisted swing sessions instead of fixed display values
- [x] Add deterministic tests for Progress metric selection and summary derivation

- [x] Persist the selected Progress metric through the existing local app state boundary
- [x] Restore the selected Progress metric after app reload without adding cloud dependencies
- [x] Add deterministic tests for Progress preference serialization and fallback behavior

- [x] Persist the selected Library filter through the existing local app state boundary
- [x] Restore the selected Library filter after app reload with safe fallback handling
- [x] Add deterministic tests for Library preference serialization and filter cycling

- [x] Persist Analyze club, camera-facing, and slow-motion preferences through GolfAppState
- [x] Restore Analyze capture preferences safely after app reload
- [x] Add deterministic tests for Analyze preference validation and fallback behavior

- [x] Persist the preferred Analyze recording duration through GolfAppState
- [x] Restore and expose the recording-duration preference with safe local fallback behavior
- [x] Add deterministic tests for capture-duration validation and selection cycling

- [x] Show capture duration and slow-motion state in the Analyze review metadata
- [x] Preserve capture preference context through the analysis-result handoff
- [x] Add deterministic tests for capture-review metadata formatting

- [x] Show capture source and duration context in Library session cards
- [x] Show capture source, duration, and slow-motion context in Swing Detail
- [x] Add deterministic tests for saved-session capture metadata formatting

- [x] Show capture context for selected and previous swings in Compare Swing
- [x] Include capture source, duration, and slow-motion context in shared report summaries
- [x] Add deterministic tests for comparison and sharing metadata formatting

- [x] Add a local date-range selector for recent, month, and all Library sessions
- [x] Keep date filtering safe for seeded and legacy session date labels
- [x] Add deterministic tests for Library date-range selection and session matching

- [x] Persist the selected Library date range through GolfAppState
- [x] Restore the selected Library date range safely after app reload
- [x] Add deterministic tests for Library date-range preference validation and fallback

- [x] Support ISO timestamp dates in Library recent and month filters
- [x] Preserve human-readable seeded and legacy date labels as safe fallbacks
- [x] Add deterministic tests for ISO date boundaries and invalid date values

- [x] Add a one-tap reset action for Library search, date range, and saved filter
- [x] Make the Library empty state explain the active filter and offer recovery
- [x] Add deterministic tests for Library filter reset behavior

- [x] Add a visible active-filter summary near the Library result count
- [x] Make Library filter state clearer when search, date range, or saved filter is active
- [x] Add deterministic tests for active-filter summary formatting

- [x] Add individual removable chips for Library search, date range, and saved filter
- [x] Persist chip removal through the existing local GolfAppState boundary
- [x] Add deterministic tests for individual Library filter removal

- [x] Add removable chips for non-default Analyze capture preferences
- [x] Add a removable chip for the selected Progress metric when it is non-default
- [x] Add deterministic tests for Analyze and Progress preference reset helpers

- [x] Add removable chips for applied promo-code and referral preferences in Profile
- [x] Keep chip removal synchronized with persisted monetization state
- [x] Add deterministic tests for Profile monetization preference reset helpers

- [x] Add a compact rewards summary for active promo and referral state in Profile
- [x] Add clear-action feedback that distinguishes removed promo and referral attribution
- [x] Add deterministic tests for rewards summary formatting

- [x] Add a compact local rewards-history summary derived from monetization events
- [x] Make rewards history readable without exposing unrelated analytics events
- [x] Add deterministic tests for rewards-history filtering and label formatting

- [x] Add a dedicated local rewards activity route linked from Profile
- [x] Render filtered rewards events with safe empty and back-navigation states
- [x] Add deterministic tests for rewards activity list limits and empty behavior

- [x] Add readable detail labels for reward event source and credit amounts
- [x] Keep reward-event details provider-neutral and local-only
- [x] Add deterministic tests for reward detail formatting

- [x] Add event-specific icons and color treatments for reward activity entries
- [x] Add accessible event descriptions combining label, detail, and date
- [x] Add deterministic tests for reward event visual metadata

- [x] Add a local clear-history action for rewards activity with confirmation
- [x] Preserve unrelated monetization analytics when clearing reward history
- [x] Add deterministic tests for the clear-rewards contract

- [x] Add expandable reward-event rows with safe metadata and exact timestamps
- [x] Add deterministic tests for reward-event detail formatting and expansion state

- [x] Add a native-safe Expo ImagePicker boundary for Analyze uploads
- [x] Connect picked video results to the existing capture review flow
- [x] Add deterministic tests for picked-media classification and cancellation

- [x] Resolve iOS ph:// media-library assets before capture preview playback
- [x] Preserve safe fallback behavior when asset info is unavailable
- [x] Add deterministic tests for media URI resolution decisions

- [x] Add selected-media duration and file-size metadata to Analyze review
- [x] Format media metadata safely for native, web, and legacy fallback values
- [x] Add deterministic tests for media metadata formatting

- [x] Add explicit playback fallback messaging for unresolved selected media
- [x] Keep retry and retake actions clear when preview playback is unavailable
- [x] Add deterministic tests for unresolved-media presentation decisions

- [x] Add a retry action for unresolved iOS media asset resolution
- [x] Preserve media metadata while retrying preview resolution
- [x] Add deterministic tests for retryable resolution outcomes

- [x] Add loading feedback while retrying unresolved media playback
- [x] Prevent duplicate media-resolution retries
- [x] Add deterministic tests for retry loading-state decisions

- [x] Add an inline error state after repeated media-resolution failures
- [x] Keep retake and analysis actions available from the error state
- [x] Add deterministic tests for retry failure presentation decisions

- [x] Add a visible retry attempt count to unresolved media preview
- [x] Clarify recovery guidance after repeated resolution attempts
- [x] Add deterministic tests for retry attempt labels and reset behavior

- [x] Add an explicit retry-attempt limit for unresolved media
- [x] Guide users to retake or choose a replacement video after the limit
- [x] Add deterministic tests for retry-limit decisions and labels

- [x] Add a pure replacement-video recovery state contract
- [x] Cover select, retry-limit, and replacement transitions with integration-style tests
- [x] Preserve media metadata across replacement selection boundaries

- [x] Add loading feedback while choosing a replacement video
- [x] Prevent duplicate replacement-picker launches
- [x] Add deterministic tests for replacement-picker busy labels

- [x] Add cancellation feedback when the replacement-video picker is dismissed
- [x] Preserve the unresolved-media recovery state after cancellation
- [x] Add deterministic tests for picker cancellation messaging

- [x] Add cancellation feedback when the initial Upload picker is dismissed
- [x] Preserve the empty Analyze state after initial picker cancellation
- [x] Add deterministic tests for initial upload cancellation messaging

- [x] Add feedback when camera permission is dismissed or denied
- [x] Provide a clear retry path for camera access
- [x] Add deterministic tests for permission-state messaging

- [x] Add an Open Settings recovery action for permanently denied camera access
- [x] Keep the settings action native-only with a safe web fallback
- [x] Add deterministic tests for settings-action visibility and labeling

- [x] Refresh camera permission state when Analyze resumes from device settings
- [x] Preserve current capture and analysis state during permission refresh
- [x] Add deterministic tests for permission refresh decisions

- [x] Show confirmation when camera access is restored after returning from Settings
- [x] Avoid duplicate restored-permission feedback on repeated resumes
- [x] Add deterministic tests for permission transition messaging

- [x] Add a transient visual success state when camera access is restored
- [x] Keep restored-camera status accessible and non-blocking
- [x] Add deterministic tests for restored-camera success presentation

- [x] Add a compact camera-readiness indicator near the record control
- [x] Keep readiness status accurate across web, loading, denied, and granted states
- [x] Add deterministic tests for camera-readiness labels and status colors

- [x] Add a restrained native camera-ready cue
- [x] Keep the cue non-blocking and avoid repeated announcements
- [x] Add deterministic tests for readiness cue transition decisions

- [x] Add a subtle native-only readiness transition cue
- [x] Keep readiness animation quiet on web and accessible to assistive technology
- [x] Add deterministic tests for readiness transition cue decisions

- [x] Disable recording when camera access is permanently denied
- [x] Keep Upload and Open Settings recovery actions available
- [x] Add deterministic tests for recording-gate decisions and labels

- [x] Make native readiness animation cancelable on unmount and repeated transitions
- [x] Reset the animated scale when readiness cue ends or is canceled
- [x] Add deterministic tests for readiness animation lifecycle decisions

- [x] Add a native accessibility announcement for restored camera access
- [x] Keep the announcement one-time and silent on web
- [x] Add deterministic tests for announcement eligibility and copy

- [x] Keep uploaded duration and source metadata consistent in saved-session handoff
- [x] Verify Library, Swing Detail, and downstream summary formatting use persisted media metadata
- [x] Add regression coverage for uploaded metadata propagation

- [x] Audit remaining interactive controls for dead ends or no-op actions
- [x] Make the highest-impact action gaps complete their intended local flow
- [x] Add regression tests for repaired interactive flows

- [x] Audit remaining screen actions for navigation, persistence, and completion feedback
- [x] Repair the next highest-impact functional dead end
- [x] Add regression coverage for the repaired screen action

- [x] Audit remaining screen actions for missing navigation or feedback
- [x] Repair the next functional action gap with accessible state handling
- [x] Add regression coverage for the next repaired action

- [x] Audit Library, Progress, and Profile interactions for incomplete actions
- [x] Repair the next high-impact interaction gap with accessible feedback
- [x] Add regression coverage for the repaired interaction

- [x] Audit Library and Profile interactions for silent or incomplete actions
- [x] Repair the next functional interaction with accessible feedback
- [x] Add regression coverage for the repaired interaction

- [x] Persist the Practice reminders preference through the local app state boundary
- [x] Restore the reminder preference on app reload
- [x] Add regression coverage for reminder preference updates

- [x] Audit Library and rewards activity interactions for incomplete actions
- [x] Repair the next functional gap with local-first persistence and feedback
- [x] Add regression coverage for the repaired interaction

- [x] Audit rewards activity and persistence-sensitive controls for incomplete actions
- [x] Repair the next persistence or feedback gap with accessible handling
- [x] Add regression coverage for the repaired rewards interaction

- [x] Audit analysis and media-recovery transitions for incomplete loading or retry states
- [x] Repair the next recovery-flow gap with accessible feedback
- [x] Add regression coverage for the repaired recovery transition

- [x] Audit native camera capture failure and cancellation transitions
- [x] Repair the next camera recovery gap with accessible feedback
- [x] Add regression coverage for the repaired camera transition

- [x] Audit camera permission-request failures and lifecycle transitions
- [x] Repair the next permission recovery gap with accessible feedback
- [x] Add regression coverage for the repaired permission transition

- [x] Audit interrupted capture and analysis cancellation transitions
- [x] Repair the next cancellation-flow gap with accessible feedback
- [x] Add regression coverage for the repaired cancellation transition

- [x] Audit recording cancellation and interrupted-capture transitions
- [x] Repair the next recording recovery gap with accessible feedback
- [x] Add regression coverage for the repaired recording transition

- [x] Audit navigation-away cleanup and resource release
- [x] Repair the next lifecycle cleanup gap
- [x] Add regression coverage for the repaired lifecycle transition

- [x] Audit Swing Detail and sharing interactions for stale async state or missing recovery feedback
- [x] Repair the next detail or sharing gap with accessible feedback
- [x] Add regression coverage for the repaired detail or sharing transition

- [x] Audit Swing Detail sharing and saved-session actions for unhandled failures
- [x] Add explicit sharing failure recovery and action feedback
- [x] Add regression coverage for sharing outcomes

- [x] Audit saved-report export and comparison interactions for prototype-like behavior
- [x] Repair the next export or comparison gap with functional local behavior
- [x] Add regression coverage for the repaired export or comparison flow

- [x] Audit remaining mobile user flows for incomplete or misleading actions
- [x] Repair the next functional interaction with accessible feedback
- [x] Add regression coverage for the repaired mobile flow

- [x] Review onboarding option controls for missing accessibility labels and selected state
- [x] Add accessible selection feedback to onboarding controls
- [x] Add regression coverage for onboarding selection state

- [x] Audit unlabeled icon actions and onboarding progress feedback
- [x] Implement the next accessibility improvement
- [x] Add regression coverage for the accessibility improvement

- [x] Audit remaining icon-only controls and action feedback
- [x] Repair the next interaction accessibility gap
- [x] Add regression coverage for the repaired interaction

- [x] Audit Profile and Rewards icon actions for missing labels or incomplete behavior
- [x] Repair the next control accessibility or functionality gap
- [x] Add regression coverage for the repaired control

- [x] Audit remaining Profile and rewards interactions for informational-only settings
- [x] Implement the next editable local setting with accessible feedback
- [x] Add regression coverage for the editable setting

- [x] Review remaining Profile settings for informational-only behavior
- [x] Implement the next editable locally persisted Profile preference
- [x] Add regression coverage for the new preference flow

- [x] Review Handicap preference model and current Profile control
- [x] Implement an editable locally persisted Handicap preference
- [x] Add regression coverage for Handicap preference updates

- [x] Review remaining Profile preference behavior for informational-only controls
- [x] Implement the next editable locally persisted preference
- [x] Add regression coverage for the preference flow

- [x] Review Coach mode preference model and current informational control
- [x] Implement an editable locally persisted Coach mode preference
- [x] Add regression coverage for Coach mode updates

- [x] Inspect current dev logs and highest-risk async error paths
- [x] Fix the next runtime or promise-handling error and add recovery feedback
- [x] Add regression coverage for the error-handling repair

- [x] Inspect current runtime logs and unhandled async/error paths
- [x] Add targeted recovery handling for the next highest-risk user flows
- [x] Add regression coverage for the new error-handling behavior
- [x] Validate and checkpoint the error-handling improvements

- [x] Inspect latest runtime logs and remaining unhandled interaction failures
- [x] Implement another focused recovery improvement
- [x] Add regression coverage for the new recovery behavior
- [x] Validate and checkpoint this error-handling pass

- [x] Inspect newest diagnostics and remaining unhandled async paths
- [x] Implement another targeted error-handling improvement
- [x] Add regression coverage for the new recovery behavior
- [x] Validate and checkpoint this error-handling pass

- [x] Inspect newest diagnostics and remaining unhandled async paths
- [x] Implement another targeted error-handling improvement
- [x] Add regression coverage for the new recovery behavior
- [x] Validate and checkpoint this error-handling pass

- [x] Inspect newest diagnostics and remaining unhandled async paths
- [x] Implement another targeted error-handling improvement
- [x] Add regression coverage for the new recovery behavior
- [x] Validate and checkpoint this error-handling pass

- [x] Inspect newest diagnostics and remaining unhandled async paths
- [x] Implement another targeted error-handling improvement
- [x] Add regression coverage for the new recovery behavior
- [x] Validate and checkpoint this error-handling pass

- [x] Inspect newest diagnostics and remaining unhandled async paths
- [x] Implement another targeted error-handling improvement
- [x] Add regression coverage for the new recovery behavior
- [x] Validate and checkpoint this error-handling pass

- [x] Inspect newest diagnostics and remaining unhandled async paths
- [x] Implement another targeted error-handling improvement
- [x] Add regression coverage for the new recovery behavior
- [x] Validate and checkpoint this error-handling pass

- [x] Inspect newest diagnostics and remaining unhandled async paths
- [x] Implement another targeted error-handling improvement
- [x] Add regression coverage for the new recovery behavior
- [x] Validate and checkpoint this error-handling pass

- [x] Inspect newest diagnostics and remaining unhandled async paths
- [x] Implement another targeted error-handling improvement
- [x] Add regression coverage for the new recovery behavior
- [x] Validate and checkpoint this error-handling pass

- [x] Review current mobile implementation and identify the next highest-value improvement
- [x] Implement the selected mobile improvement
- [x] Add regression coverage for the improvement
- [x] Validate and checkpoint the improvement

- [x] Review current mobile implementation and identify the next highest-value improvement
- [x] Implement the selected mobile improvement
- [x] Add regression coverage for the improvement
- [x] Validate and checkpoint the improvement

- [x] Review current mobile implementation and identify the next highest-value improvement
- [x] Implement the selected mobile improvement
- [x] Add regression coverage for the improvement
- [x] Validate and checkpoint the improvement

- [x] Review current mobile implementation and identify the next highest-value improvement
- [x] Implement the selected mobile improvement
- [x] Add regression coverage for the improvement
- [x] Validate and checkpoint the improvement

- [x] Review current mobile implementation and identify the next highest-value improvement
- [x] Implement the selected mobile improvement
- [x] Add regression coverage for the improvement
- [x] Validate and checkpoint the improvement

- [x] Review current mobile implementation and identify the next highest-value improvement
- [x] Implement the selected mobile improvement
- [x] Add regression coverage for the improvement
- [x] Validate and checkpoint the improvement

- [x] Review current mobile implementation and identify the next highest-value improvement
- [x] Implement the selected mobile improvement
- [x] Add regression coverage for the improvement
- [x] Validate and checkpoint the improvement

- [x] Review current mobile implementation and identify the next highest-value improvement
- [x] Implement the selected mobile improvement
- [x] Add regression coverage for the improvement
- [x] Validate and checkpoint the improvement

- [x] Review current mobile implementation and identify the next highest-value improvement
- [x] Implement the selected mobile improvement
- [x] Add regression coverage for the improvement
- [x] Validate and checkpoint the improvement

- [x] Review current mobile implementation and identify the next highest-value improvement
- [x] Implement the selected mobile improvement
- [x] Add regression coverage for the improvement
- [x] Validate and checkpoint the improvement

- [x] Review current mobile implementation and identify the next highest-value improvement
- [x] Implement the selected mobile improvement
- [x] Add regression coverage for the improvement
- [x] Validate and checkpoint the improvement

- [x] Review current mobile implementation and identify the next highest-value improvement
- [x] Implement the selected mobile improvement
- [x] Add regression coverage for the improvement
- [x] Validate and checkpoint the improvement

- [x] Review current mobile implementation and identify the next highest-value improvement
- [x] Implement the selected mobile improvement
- [x] Add regression coverage for the improvement
- [x] Validate and checkpoint the improvement

- [x] Review current mobile implementation and identify the next highest-value improvement
- [x] Implement the selected mobile improvement
- [x] Add regression coverage for the improvement
- [x] Validate and checkpoint the improvement

- [x] Review current mobile implementation and identify the next highest-value improvement
- [x] Implement the selected mobile improvement
- [x] Add regression coverage for the improvement
- [x] Validate and checkpoint the improvement

- [x] Review current mobile implementation and identify the next highest-value improvement
- [x] Implement the selected mobile improvement
- [x] Add regression coverage for the improvement
- [x] Validate and checkpoint the improvement

- [x] Review current mobile implementation and identify the next highest-value improvement
- [x] Implement the selected mobile improvement
- [x] Add regression coverage for the improvement
- [x] Validate and checkpoint the improvement

- [x] Review unfinished product flows and select the next improvement
- [x] Implement the selected improvement
- [x] Add regression coverage for the improvement
- [x] Validate and checkpoint the improvement

- [x] Review unfinished product flows and select the next improvement
- [x] Implement the selected improvement
- [x] Add regression coverage for the improvement
- [x] Validate and checkpoint the improvement

- [x] Review unfinished product flows and select the next improvement
- [x] Implement the selected improvement
- [x] Add regression coverage for the improvement
- [x] Validate and checkpoint the improvement

- [x] Review unfinished product flows and select the next improvement
- [x] Implement the selected improvement
- [x] Add regression coverage for the improvement
- [x] Validate and checkpoint the improvement

- [x] Review unfinished product flows and select the next improvement
- [x] Implement the selected improvement
- [x] Add regression coverage for the improvement
- [x] Validate and checkpoint the improvement

- [x] Diagnose the interrupted Save Report test failure
- [x] Fix the export implementation or test boundary
- [x] Run regression validation and update the roadmap
- [x] Save and report the stable project checkpoint

- [x] Review unfinished product flows and select the next improvement
- [x] Implement the selected improvement
- [x] Add regression coverage for the improvement
- [x] Validate and checkpoint the improvement

- [x] Review unfinished product flows and select the next improvement
- [x] Implement the selected improvement
- [x] Add regression coverage for the improvement
- [x] Validate and checkpoint the improvement

- [x] Review unfinished product flows and select the next improvement
- [x] Implement the selected improvement
- [x] Add regression coverage for the improvement
- [x] Validate and checkpoint the improvement

- [x] Review unfinished product flows and select the next improvement
- [x] Implement the selected improvement
- [x] Add regression coverage for the improvement
- [x] Validate and checkpoint the improvement

- [x] Review unfinished product flows and select the next improvement
- [x] Implement the selected improvement
- [x] Add regression coverage for the improvement
- [x] Validate and checkpoint the improvement

- [x] Review unfinished product flows and select the next improvement
- [x] Implement the selected improvement
- [x] Add regression coverage for the improvement
- [x] Validate and checkpoint the improvement

- [x] Review unfinished product flows and select the next improvement
- [x] Implement the selected improvement
- [x] Add regression coverage for the improvement
- [x] Validate and checkpoint the improvement

- [x] Review unfinished product flows and select the next improvement
- [x] Implement the selected improvement
- [x] Add regression coverage for the improvement
- [x] Validate and checkpoint the improvement

- [x] Review unfinished product flows and select the next improvement
- [x] Implement the selected improvement
- [x] Add regression coverage for the improvement
- [x] Validate and checkpoint the improvement

- [x] Review unfinished product flows and select the next improvement
- [x] Implement the selected improvement
- [x] Add regression coverage for the improvement
- [x] Validate and checkpoint the improvement

- [x] Review unfinished product flows and select the next improvement
- [x] Implement the selected improvement
- [x] Add regression coverage for the improvement
- [x] Validate and checkpoint the improvement

- [x] Review unfinished product flows and select the next improvement
- [x] Implement the selected improvement
- [x] Add regression coverage for the improvement
- [x] Validate and checkpoint the improvement

- [x] Review unfinished product flows and select the next improvement
- [x] Implement the selected improvement
- [x] Add regression coverage for the improvement
- [x] Validate and checkpoint the improvement

- [x] Verify project services and select the next improvement
- [x] Implement the selected improvement
- [x] Add regression coverage for the improvement
- [x] Validate and checkpoint the improvement

- [x] Review unfinished product flows and select the next improvement
- [x] Implement the selected improvement
- [x] Add regression coverage for the improvement
- [x] Validate and checkpoint the improvement

- [x] Review unfinished product flows and select the next improvement
- [x] Implement the selected improvement
- [x] Add regression coverage for the improvement
- [x] Validate and checkpoint the improvement

- [x] Review unfinished product flows and select the next improvement
- [x] Implement the selected improvement
- [x] Add regression coverage for the improvement
- [x] Validate and checkpoint the improvement

- [x] Review unfinished product flows and select the next improvement
- [x] Implement the selected improvement
- [x] Add regression coverage for the improvement
- [x] Validate and checkpoint the improvement

- [x] Review unfinished product flows and select the next improvement
- [x] Implement the selected improvement
- [x] Add regression coverage for the improvement
- [x] Validate and checkpoint the improvement

- [x] Review unfinished product flows and select the next improvement
- [x] Implement the selected improvement
- [x] Add regression coverage for the improvement
- [x] Validate and checkpoint the improvement

- [x] Inspect runtime logs and identify the highest-impact error boundary
- [x] Implement the error-handling improvement
- [x] Add regression coverage and validate all checks
- [x] Save and report the fixed project checkpoint

- [x] Inspect runtime logs and identify the next high-impact error boundary
- [x] Implement the error-handling improvement
- [x] Add regression coverage and validate all checks
- [x] Save and report the fixed project checkpoint

- [x] Remove sensitive authentication/session diagnostics from runtime logs and add safe sanitized error reporting
- [x] Add regression coverage for redacted auth and API diagnostics
- [x] Rerun all checks and save the fix checkpoint

- [x] Inspect latest runtime errors and identify app-owned recovery gaps
- [x] Add defensive error handling for the identified flows
- [x] Add regression tests for new failure and recovery paths
- [x] Run all checks and save the fix checkpoint

- [x] Inspect latest runtime diagnostics and identify remaining app-owned failures
- [x] Add defensive handling for the next uncovered failure paths
- [x] Add regression tests for new error and recovery behavior
- [x] Run all checks, verify services, and save the fix checkpoint

- [x] Inspect latest runtime diagnostics and identify remaining app-owned failures
- [x] Add defensive handling for the next uncovered failure paths
- [x] Add regression tests for new error and recovery behavior
- [x] Run all checks, verify services, and save the fix checkpoint

- [x] Inspect latest runtime diagnostics and identify remaining app-owned failures
- [x] Add defensive handling for the next uncovered failure paths
- [x] Add regression tests for new error and recovery behavior
- [x] Run all checks, verify services, and save the fix checkpoint

- [x] Inspect latest runtime diagnostics and identify remaining app-owned failures
- [x] Add defensive handling for the next uncovered failure paths
- [x] Add regression tests for new error and recovery behavior
- [x] Run all checks, verify services, and save the fix checkpoint

- [x] Inspect latest runtime diagnostics and identify remaining app-owned failures
- [x] Add defensive handling for the next uncovered failure paths
- [x] Add regression tests for new error and recovery behavior
- [x] Run all checks, verify services, and save the fix checkpoint

- [x] Inspect latest runtime diagnostics and identify remaining app-owned failures
- [x] Add defensive handling for the next uncovered failure paths
- [x] Add regression tests for new error and recovery behavior
- [x] Run all checks, verify services, and save the fix checkpoint

- [x] Inspect latest runtime diagnostics and identify remaining app-owned failures
- [x] Add defensive handling for the next uncovered failure paths
- [x] Add regression tests for new error and recovery behavior
- [x] Run all checks, verify services, and save the fix checkpoint

- [x] Inspect latest runtime diagnostics and identify remaining app-owned failures
- [x] Add defensive handling for the next uncovered failure paths
- [x] Add regression tests for new error and recovery behavior
- [x] Run all checks, verify services, and save the fix checkpoint

- [x] Inspect latest runtime diagnostics and identify remaining app-owned failures
- [x] Add defensive handling for the next uncovered failure paths
- [x] Add regression tests for new error and recovery behavior
- [x] Run all checks, verify services, and save the fix checkpoint

- [x] Inspect latest runtime diagnostics and identify remaining app-owned failures
- [x] Add defensive handling for the next uncovered failure paths
- [x] Add regression tests for new error and recovery behavior
- [x] Run all checks, verify services, and save the fix checkpoint

- [x] Inspect latest runtime diagnostics and identify remaining app-owned failures
- [x] Add defensive handling for the next uncovered failure paths
- [x] Add regression tests for new error and recovery behavior
- [x] Run all checks, verify services, and save the fix checkpoint

- [x] Inspect latest runtime diagnostics and identify remaining app-owned failures
- [x] Add defensive handling for the next uncovered failure paths
- [x] Add regression tests for new error and recovery behavior
- [x] Run all checks, verify services, and save the fix checkpoint

- [x] Inspect latest runtime diagnostics and identify remaining app-owned failures
- [x] Add defensive handling for the next uncovered failure paths
- [x] Add regression tests for new error and recovery behavior
- [x] Run all checks, verify services, and save the fix checkpoint

- [x] Inspect latest runtime diagnostics and identify remaining app-owned failures
- [x] Add defensive handling for the next uncovered failure paths
- [x] Add regression tests for new error and recovery behavior
- [x] Run all checks, verify services, and save the fix checkpoint

- [x] Inspect latest runtime diagnostics and identify remaining app-owned failures
- [x] Add defensive handling for the next uncovered failure paths
- [x] Add regression tests for new error and recovery behavior
- [x] Run all checks, verify services, and save the fix checkpoint

- [x] Inspect latest runtime diagnostics and identify remaining app-owned failures
- [x] Add defensive handling for the next uncovered failure paths
- [x] Add regression tests for new error and recovery behavior
- [x] Run all checks, verify services, and save the fix checkpoint

- [x] Inspect latest runtime diagnostics and identify remaining app-owned failures
- [x] Add defensive handling for the next uncovered failure paths
- [x] Add regression tests for new error and recovery behavior
- [x] Run all checks, verify services, and save the fix checkpoint

- [x] Inspect latest runtime diagnostics and identify remaining app-owned failures
- [x] Add defensive handling for the next uncovered failure paths
- [x] Add regression tests for new error and recovery behavior
- [x] Run all checks, verify services, and save the fix checkpoint

- [x] Inspect latest runtime diagnostics and identify remaining app-owned failures
- [x] Add defensive handling for the next uncovered failure paths
- [x] Add regression tests for new error and recovery behavior
- [x] Run all checks, verify services, and save the fix checkpoint

- [x] Inspect latest runtime diagnostics and identify remaining app-owned failures
- [x] Add defensive handling for the next uncovered failure paths
- [x] Add regression tests for new error and recovery behavior
- [x] Run all checks, verify services, and save the fix checkpoint

- [x] Inspect current project state and select the next high-value React Native improvement
- [x] Implement the focused reliability, accessibility, or UX improvement
- [x] Add regression coverage and run all validation checks
- [x] Save the improved project checkpoint

- [x] Inspect current project state and select the next high-value React Native improvement
- [x] Implement the focused reliability, accessibility, or UX improvement
- [x] Add regression coverage and run all validation checks
- [x] Save the improved project checkpoint

- [x] Inspect current recovery flows and choose the next user-visible improvement
- [x] Implement the recovery improvement across the affected mobile flow
- [x] Add regression coverage and run complete validation
- [x] Save and report the improved project checkpoint

- [x] Inspect current recovery feedback and choose the next retry affordance
- [x] Implement explicit retry behavior in the affected mobile flow
- [x] Add regression coverage and run complete validation
- [x] Save and report the improved project checkpoint

- [x] Inspect Library preference recovery paths and select the next improvement
- [x] Implement retry behavior for failed Library preference persistence
- [x] Add regression coverage and run complete validation
- [x] Save and report the improved project checkpoint

- [x] Inspect Library reset recovery and define the retry contract
- [x] Implement retry behavior for failed Library reset persistence
- [x] Add regression coverage and run complete validation
- [x] Save and report the improved project checkpoint

- [x] Inspect Library chip-removal recovery and define the retry contract
- [x] Implement retry behavior for failed Library chip removal persistence
- [x] Add regression coverage and run complete validation
- [x] Save and report the improved project checkpoint

- [x] Inspect remaining persistence recovery paths and choose the next improvement
- [x] Implement the focused persistence recovery enhancement
- [x] Add regression coverage and run complete validation
- [x] Save and report the improved project checkpoint

- [x] Inspect camera permission and recording recovery paths
- [x] Implement explicit retry behavior for camera recovery failures
- [x] Add regression coverage and run complete validation
- [x] Save and report the improved project checkpoint

- [x] Inspect analysis-usage persistence recovery and define the retry contract
- [x] Implement explicit retry behavior for analysis-usage persistence failures
- [x] Add regression coverage and run complete validation
- [x] Save and report the improved project checkpoint

- [x] Inspect the current codebase and identify the next high-value improvement
- [x] Implement the focused code improvement
- [x] Add regression coverage and run complete validation
- [x] Save and report the improved project checkpoint

- [x] Inspect remaining recovery paths and identify the next high-value improvement
- [x] Implement the focused code improvement
- [x] Add regression coverage and run complete validation
- [x] Save and report the improved project checkpoint

- [x] Inspect retry-state patterns and identify the next high-value improvement
- [x] Implement the focused retry and recovery improvement
- [x] Add regression coverage and run complete validation
- [x] Save and report the improved project checkpoint

- [x] Inspect Toast behavior and existing test coverage
- [x] Add deterministic regression coverage for retry timer behavior
- [x] Run complete validation and resolve any regressions
- [x] Save and report the improved project checkpoint

- [x] Inspect Toast accessibility behavior and existing coverage
- [x] Implement the focused accessibility improvement
- [x] Add regression coverage and run complete validation
- [x] Save and report the improved project checkpoint

- [x] Inspect Toast action execution and existing test coverage
- [x] Implement guaranteed Toast dismissal around retry actions
- [x] Add regression coverage and run complete validation
- [x] Save and report the improved project checkpoint

- [x] Inspect repeated retry-state patterns across screens
- [x] Implement a focused shared retry-state improvement
- [x] Add regression coverage and run complete validation
- [x] Save and report the improved project checkpoint

- [x] Inspect Library retry state and define the shared-hook migration
- [x] Migrate Library recovery flows to the shared retry abstraction
- [x] Add regression coverage and run complete validation
- [x] Save and report the improved project checkpoint

- [x] Inspect Library recovery state and define a unified typed retry model
- [x] Migrate Library deletion recovery to the shared retry action
- [x] Add regression coverage and run complete validation
- [x] Save and report the improved project checkpoint

- [x] Inspect shared retry-hook behavior and define stale-callback safeguards
- [x] Implement defensive retry-hook semantics
- [x] Add regression coverage and run complete validation
- [x] Save and report the improved project checkpoint

- [x] Complete interrupted retry-safety validation and inspect the supplied reference document
- [x] Select and implement only production-safe, architecture-compatible improvements (no unverified reference ML code imported)
- [x] Add regression coverage and run complete validation
- [x] Save and report the improved project checkpoint

- [x] Inspect retry-hook replacement and lifecycle behavior
- [x] Implement defensive retry replacement behavior
- [x] Add regression coverage and run complete validation
- [x] Save and report the improved project checkpoint

- [x] Complete retry-safety validation and review the monetization reference
- [x] Select and implement only verified, production-safe improvements (no unverified monetization code imported)
- [x] Add regression coverage and run complete validation
- [x] Save and report the improved project checkpoint

- [x] Inspect the development diagnostics viewer and define filtering behavior
- [x] Implement category filtering with safe empty states
- [x] Add regression coverage and run complete validation
- [x] Save and report the improved project checkpoint

- [x] Complete diagnostics-filter validation and review the monetization reference
- [x] Select and implement only verified, architecture-compatible improvements (no unverified monetization code imported)
- [x] Add regression coverage and run complete validation
- [x] Save and report the improved project checkpoint

- [x] Inspect diagnostics refresh behavior and define filter continuity rules
- [x] Implement safe filter preservation across diagnostics refreshes
- [x] Add regression coverage and run complete validation
- [x] Save and report the improved project checkpoint

- [x] Inspect diagnostics filter layout and accessibility semantics
- [x] Implement compact filter navigation and clearer live feedback
- [x] Add regression coverage and run complete validation
- [x] Save and report the improved project checkpoint

- [x] Inspect diagnostics filter rendering and identify the next focused improvement
- [x] Implement the focused diagnostics filter improvement
- [x] Add regression coverage and run complete validation
- [x] Save and report the improved project checkpoint

- [x] Inspect filtered empty-state behavior and define the clear-filter affordance
- [x] Implement an accessible clear-filter recovery action
- [x] Add regression coverage and run complete validation
- [x] Save and report the improved project checkpoint

- [x] Inspect local persistence and analysis interaction transition coverage
- [x] Add deterministic regression tests for persistence and analysis state transitions
- [x] Run complete validation and resolve any regressions
- [x] Save and report the improved project checkpoint

- [x] Inspect saving-state behavior during queued local writes
- [x] Keep isSaving true until all queued persistence operations settle
- [x] Add deterministic regression coverage and run complete validation
- [x] Save and report the improved project checkpoint

- [x] Audit existing animation hooks and define a motion system for the mobile dashboard
- [x] Implement subtle dashboard entrance, press, and progress animations with reduced-motion safeguards
- [x] Add deterministic animation utility coverage and verify the mobile app
- [x] Save and report the animated app checkpoint

- [x] Audit Analyze, Progress, and reusable button surfaces for motion opportunities
- [x] Implement purposeful state and interaction animations with reduced-motion safeguards
- [x] Add deterministic motion regression coverage and validate the app
- [x] Save and report the extended animation checkpoint

- [x] Audit reusable buttons and interactive controls for missing motion feedback
- [x] Implement reduced-motion-safe press and state transitions in shared UI components
- [x] Add deterministic motion regression coverage and validate the app
- [x] Save and report the interactive motion checkpoint

- [x] Audit Library browsing states and identify a meaningful animation opportunity
- [x] Implement reduced-motion-safe Library transitions and interaction feedback
- [x] Add deterministic motion regression coverage and validate the app
- [x] Save and report the Library animation checkpoint

- [x] Audit the onboarding screens, state flow, and existing tests
- [x] Implement clearer onboarding progress, transitions, and recovery states
- [x] Add deterministic onboarding regression coverage and validate the app
- [x] Save and report the onboarding improvement checkpoint

- [x] Audit the tab navigation and existing motion utilities
- [x] Implement reduced-motion-safe tab and navigation feedback
- [x] Add deterministic motion regression coverage and validate the app
- [x] Save and report the navigation animation checkpoint

- [x] Audit error boundaries, async actions, and current sanitized diagnostics coverage
- [x] Implement the highest-value defensive error-handling improvements
- [x] Add deterministic error-recovery tests and run full validation
- [x] Save and report the hardened error-handling checkpoint

- [x] Audit async failure paths and existing recovery feedback
- [x] Implement the next high-impact error-handling improvement
- [x] Add deterministic recovery tests and run full validation
- [x] Save and report the hardened error-handling checkpoint

- [x] Audit remaining async, native, and lifecycle failure paths
- [x] Implement the next high-impact recovery and diagnostics improvement
- [x] Add deterministic error-path tests and run full validation
- [x] Save and report the hardened error-handling checkpoint

- [x] Audit another high-risk async or native failure boundary
- [x] Implement a focused recovery improvement with sanitized diagnostics
- [x] Add deterministic regression coverage and run full validation
- [x] Save and report the error-handling checkpoint

- [x] Review the latest project state and identify the next concrete code-quality gap
- [x] Implement the selected maintainability or reliability improvement
- [x] Add deterministic regression coverage and run complete validation
- [x] Save and report the improved project checkpoint

- [x] Review the latest project state and identify the next concrete improvement
- [x] Implement the selected improvement without regressing existing recovery behavior
- [x] Add deterministic regression coverage and run complete validation
- [x] Save and report the improved project checkpoint

- [x] Review the latest project state and identify the next concrete code gap
- [x] Implement the selected improvement without regressing existing behavior
- [x] Add deterministic regression coverage and run complete validation
- [x] Save and report the improved project checkpoint

- [x] Review the latest project state and identify the next concrete code gap
- [x] Implement the selected improvement without regressing existing behavior
- [x] Add deterministic regression coverage and run complete validation
- [x] Save and report the improved project checkpoint

- [x] Review the latest project state and identify the next concrete code gap
- [x] Implement the selected improvement without regressing existing behavior
- [x] Add deterministic regression coverage and run complete validation
- [x] Save and report the improved project checkpoint

- [x] Review the latest project state and identify the next concrete code gap
- [x] Implement the selected improvement without regressing existing behavior
- [x] Add deterministic regression coverage and run complete validation
- [x] Save and report the improved project checkpoint

- [x] Review the latest project state and identify the next concrete code gap
- [x] Implement the selected improvement without regressing existing behavior
- [x] Add deterministic regression coverage and run complete validation
- [x] Save and report the improved project checkpoint

- [x] Review the latest project state and identify the next concrete code gap
- [x] Implement the selected improvement without regressing existing behavior
- [x] Add deterministic regression coverage and run complete validation
- [x] Save and report the improved project checkpoint

- [x] Review the latest project state and identify the next concrete code gap
- [x] Implement the selected improvement without regressing existing behavior
- [x] Add deterministic regression coverage and run complete validation
- [x] Save and report the improved project checkpoint

- [x] Review the latest project state and identify the next concrete code gap
- [x] Implement the selected improvement without regressing existing behavior
- [x] Add deterministic regression coverage and run complete validation
- [x] Save and report the improved project checkpoint

- [x] Review the latest project state and identify the next concrete code gap
- [x] Implement the selected improvement without regressing existing behavior
- [x] Add deterministic regression coverage and run complete validation
- [x] Save and report the improved project checkpoint

- [x] Review the latest project state and identify the next concrete code gap
- [x] Implement the selected improvement without regressing existing behavior
- [x] Add deterministic regression coverage and run complete validation
- [x] Save and report the improved project checkpoint

- [x] Review the latest project state and identify the next concrete code gap
- [x] Implement the selected improvement without regressing existing behavior
- [x] Add deterministic regression coverage and run complete validation
- [x] Save and report the improved project checkpoint

- [x] Review the latest project state and identify the next concrete code gap
- [x] Implement the selected improvement without regressing existing behavior
- [x] Add deterministic regression coverage and run complete validation
- [x] Save and report the improved project checkpoint

- [x] Review the latest project state and identify the next concrete code gap
- [x] Implement the selected improvement without regressing existing behavior
- [x] Add deterministic regression coverage and run complete validation
- [x] Save and report the improved project checkpoint

- [x] Review the latest project state and identify the next concrete code gap
- [x] Implement the selected improvement without regressing existing behavior
- [x] Add deterministic regression coverage and run complete validation
- [x] Save and report the improved project checkpoint

- [x] Audit remaining fire-and-forget async UI actions
- [x] Route unsafe async UI actions through runSafely
- [x] Add deterministic regression tests for the audited actions
- [x] Run full validation and save a hardening checkpoint

- [x] Review the latest async UI call sites and project TODO
- [x] Harden the highest-impact remaining UI action paths
- [x] Run regression validation and confirm no new diagnostics leaks
- [x] Save and report the next code-quality checkpoint

- [x] Review Analyze callbacks, existing safe-action patterns, and project TODO
- [x] Implement safe handling for Analyze retry and preference actions
- [x] Run regression validation and confirm Analyze recovery behavior
- [x] Save and report the Analyze hardening checkpoint

- [x] Review remaining Analyze async callbacks and current recovery contracts
- [x] Implement safe handling for upload, recording, playback, and retry actions
- [x] Run TypeScript, lint, and Vitest validation for Analyze recovery
- [x] Save and report the Analyze callback hardening checkpoint

- [x] Review diagnostics data helpers, screen behavior, and project TODO
- [x] Implement searchable diagnostics and safe clear-all behavior
- [x] Add deterministic tests and run full validation
- [x] Save and report the diagnostics viewer checkpoint

- [x] Review analysis output models, session persistence, and result rendering
- [x] Implement persisted metric mapping with defensive fallback behavior
- [x] Add deterministic regression coverage and run full validation
- [x] Save and report the analysis-result data-integrity checkpoint

- [x] Review metric mapper, result summary contracts, and current tests
- [x] Implement summary consistency improvements and focused mapper tests
- [x] Run TypeScript, lint, and complete regression validation
- [x] Save and report the result consistency checkpoint

- [x] Review score and sharing contracts plus current tests
- [x] Implement persisted score and shared-summary consistency
- [x] Add deterministic regression coverage and run full validation
- [x] Save and report the score consistency checkpoint

- [x] Review Home dashboard data flow and available session statistics
- [x] Implement defensive local statistics derivation and Home integration
- [x] Add deterministic tests and run complete validation
- [x] Save and report the Home dashboard checkpoint

- [x] Review profile, fault, drill, and Home data contracts
- [x] Implement persisted greeting and fault-driven drill recommendation
- [x] Add deterministic tests and run complete validation
- [x] Save and report the personalized Home checkpoint

- [x] Review drill route contracts and Home recommendation mapping
- [x] Implement exact drill route selection with safe fallback
- [x] Add route regression tests and run complete validation
- [x] Save and report the navigation consistency checkpoint

- [x] Review drill data and detail-screen contracts
- [x] Implement data-driven drill detail rendering and fallback
- [x] Add deterministic route and rendering tests and run validation
- [x] Save and report the data-driven drill checkpoint

- [x] Review drill resolution and completion persistence contracts
- [x] Implement canonical drill resolution and completion ID handling
- [x] Add route and persistence regression tests and run validation
- [x] Save and report the drill robustness checkpoint

- [x] Review drill metadata contracts and current fallback behavior
- [x] Implement validated drill metadata and canonical fallback helpers
- [x] Add deterministic coverage and run TypeScript, lint, and Vitest
- [x] Save and report the drill metadata checkpoint

- [x] Review drill fallback resolution and current detail-screen feedback
- [x] Implement invalid-link fallback notice without disrupting valid drill flows
- [x] Add deterministic feedback tests and run complete validation
- [x] Save and report the Drill Detail fallback checkpoint

- [x] Review the fallback notice and available drill-library route
- [x] Implement the Browse Drills recovery action for invalid links
- [x] Add deterministic route and feedback coverage and run validation
- [x] Save and report the drill recovery checkpoint

- [x] Review current fallback UI and route contracts
- [x] Implement a testable fallback recovery contract
- [x] Add deterministic tests and run complete validation
- [x] Save and report the Drill Detail testability checkpoint

- [x] Review drill metadata, visual tokens, and detail rendering contracts
- [x] Implement validated equipment and visual metadata integration
- [x] Add deterministic metadata tests and run complete validation
- [x] Save and report the data-driven drill presentation checkpoint

- [x] Review current drill metadata validation and accessibility contracts
- [x] Implement contrast-safe drill metadata normalization and rendering
- [x] Add deterministic accessibility tests and run complete validation
- [x] Save and report the accessibility checkpoint

- [x] Review current Drill Detail equipment presentation and icon mappings
- [x] Implement an accessible equipment indicator from drill metadata
- [x] Add deterministic metadata and accessibility tests and run validation
- [x] Save and report the equipment accessibility checkpoint

- [x] Review equipment metadata values and current indicator contract
- [x] Implement deterministic equipment icon selection and accessible labels
- [x] Add regression coverage and run complete validation
- [x] Save and report the equipment icon checkpoint

- [x] Review existing Drill Detail and accessibility test patterns
- [x] Extract a small testable equipment presentation contract
- [x] Add deterministic UI-contract tests and run complete validation
- [x] Save and report the equipment UI-contract checkpoint

- [x] Review Drill Detail instruction rendering and accessibility patterns
- [x] Implement stable accessible labels for drill practice steps
- [x] Add deterministic accessibility tests and run complete validation
- [x] Save and report the instruction accessibility checkpoint

- [x] Review existing Drill Detail state and local persistence contracts
- [x] Implement persisted practice-step completion with accessible feedback
- [x] Add deterministic persistence and accessibility tests and run validation
- [x] Save and report the practice-step completion checkpoint

- [x] Review existing persisted step state and Drill Detail layout
- [x] Implement a data-driven practice progress summary
- [x] Add deterministic progress and accessibility tests and run validation
- [x] Save and report the practice progress checkpoint

- [x] Review persisted drill-step state and current Drill Detail controls
- [x] Implement reset-step persistence and accessible recovery feedback
- [x] Add deterministic persistence and accessibility tests and run validation
- [x] Save and report the reset-step checkpoint

- [x] Review current reset-step interaction and confirmation patterns
- [x] Implement confirmation-gated reset behavior without changing valid progress flows
- [x] Add deterministic confirmation tests and run complete validation
- [x] Save and report the reset confirmation checkpoint

- [x] Review current progress card and completion state contracts
- [x] Implement accessible all-steps-complete celebration behavior
- [x] Add deterministic completion-state tests and run validation
- [x] Save and report the completion celebration checkpoint

- [x] Add persisted drill-step progress to the Home recommendation card
- [x] Add deterministic Home recommendation progress tests
- [x] Validate and checkpoint the Home dashboard improvement

- [x] Add persisted last-practiced timestamps for drill step completion
- [x] Display a safe last-practiced label in Drill Detail and Home
- [x] Add deterministic timestamp normalization and presentation tests
- [x] Validate and checkpoint the last-practiced improvement

- [x] Inspect and classify recurring development-server premature-close output
- [x] Add a sanitized premature-close diagnostic and recovery contract
- [x] Add deterministic diagnostics tests and run validation
- [x] Validate and checkpoint the runtime diagnostics improvement

- [x] Replace hardcoded Home date text with a locale-safe current-date helper
- [x] Derive avatar initials from the persisted profile name
- [x] Add deterministic Home identity and date formatting tests
- [x] Validate and checkpoint the Home context improvement

- [x] Add reduced-motion-aware drill completion feedback
- [x] Preserve accessible success announcement and haptic safety guards
- [x] Add deterministic motion-feedback tests and run validation
- [x] Validate and checkpoint the completion feedback improvement

- [x] Add sanitized diagnostics serialization for clipboard export
- [x] Add one-tap copy feedback with web-safe failure handling
- [x] Add deterministic clipboard payload tests and run validation
- [x] Validate and checkpoint the diagnostics copy improvement

- [x] Derive a defensive practice streak from persisted drill timestamps
- [x] Surface the streak in Home and Progress without adding cloud state
- [x] Add deterministic streak tests for consecutive, broken, and invalid dates
- [x] Validate and checkpoint the practice streak improvement

- [x] Derive a safe seven-day practice calendar from persisted drill timestamps
- [x] Surface accessible weekday labels and practice counts in Progress
- [x] Add deterministic weekly-calendar tests for dates, duplicates, and invalid timestamps
- [x] Validate and checkpoint the weekly practice calendar improvement

- [x] Derive a safe practice prompt from today’s local streak state
- [x] Surface streak-preserving guidance in Home and Progress
- [x] Add deterministic prompt tests for today, yesterday, and no-history states
- [x] Validate and checkpoint the practice prompt improvement

- [x] Locate the source of the pointerEvents deprecation warning
- [x] Apply the smallest compatible warning cleanup or isolation change
- [x] Add deterministic regression coverage for the warning boundary
- [x] Validate and checkpoint the pointerEvents warning improvement

- [x] Add a deterministic helper for whether practice is logged today
- [x] Surface today’s practice status in the Home hero with accessible copy
- [x] Add regression tests for valid, invalid, future, and prior-day timestamps
- [x] Validate and checkpoint the today-practice status improvement

- [x] Add deterministic Home practice-action copy for incomplete and complete states
- [x] Route the Home hero practice action to the recommended drill safely
- [x] Add regression tests for action labels and missing recommendation fallback
- [x] Validate and checkpoint the Home practice action improvement

- [x] Add a deterministic local-time greeting helper for Home
- [x] Replace the hardcoded morning greeting with time-aware copy
- [x] Add regression tests for morning, afternoon, evening, and boundary hours
- [x] Validate and checkpoint the time-aware greeting improvement

- [x] Add deterministic navigation target selection for practiced calendar days
- [x] Make practiced days accessible and route to matching local drill detail
- [x] Add regression tests for matched, unmatched, and empty day states
- [x] Validate and checkpoint the calendar navigation improvement

- [x] Derive a safe compact practice-history list from persisted drill timestamps
- [x] Surface drill names, relative dates, and accessible navigation in Progress
- [x] Add deterministic history-list tests for ordering and malformed entries
- [x] Validate and checkpoint the practice-history improvement

- [x] Add deterministic copy for an empty local practice-history state
- [x] Surface accessible guidance explaining how practice history is recorded
- [x] Add regression tests for empty and populated history copy
- [x] Validate and checkpoint the practice-history empty-state improvement

- [x] Add a dedicated full local practice-history route
- [x] Link Progress history summary to the full history screen
- [x] Add safe empty, unknown-drill, and accessible list states
- [x] Add deterministic route and history-screen contract tests
- [x] Validate and checkpoint the full practice-history improvement

- [x] Add a persisted clear-practice-history action for timestamps only
- [x] Add confirmation copy stating drill completion progress is preserved
- [x] Add safe success and failure feedback to Practice History
- [x] Add deterministic reset and confirmation tests
- [x] Validate and checkpoint the clear-history improvement

- [x] Add a deterministic sanitized practice-history export payload
- [x] Add one-tap copy feedback to Practice History
- [x] Keep export independent of private device or account data
- [x] Add deterministic export tests and run validation
- [x] Validate and checkpoint the practice-history export improvement

- [x] Add deterministic practice-history date-range filtering
- [x] Add safe drill-name filtering with an accessible empty result state
- [x] Add filter controls without changing persisted history data
- [x] Add deterministic filtering tests and run validation
- [x] Validate and checkpoint the history filtering improvement

- [x] Add a backward-compatible persisted Practice History range preference
- [x] Persist and restore the local drill search query safely
- [x] Keep filter updates serialized through the existing persistence queue
- [x] Add deterministic migration and preference tests
- [x] Validate and checkpoint the persisted history-filter improvement

- [x] Add a deterministic reset helper for Practice History filter preferences
- [x] Add a one-tap accessible reset control with persisted state updates
- [x] Add success and failure feedback for filter reset
- [x] Add deterministic reset tests and run validation
- [x] Validate and checkpoint the filter-reset improvement

- [x] Add a native share-sheet export for sanitized Practice History
- [x] Keep clipboard copy as the web-safe fallback
- [x] Add accessible share busy, success, and failure feedback
- [x] Add deterministic share-mode tests and run validation
- [x] Validate and checkpoint the Practice History sharing improvement

- [x] Add native Practice History share-sheet export with clipboard fallback and deterministic resilience tests

- [x] Continue improving reliability, accessibility, and maintainability with the next focused app enhancement
- [x] Automatically copy practice history when the native share sheet is unavailable or fails

- [x] Continue improving reliability and user flow with the next focused app enhancement
- [x] Prevent duplicate or invalid analysis launches from the Analyze screen

- [x] Continue improving local-first reliability with the next focused app enhancement
- [x] Prevent user writes from racing ahead of local-state hydration

- [x] Continue improving the app with the next focused reliability or user-flow enhancement
- [x] Show accessible local-data restoration status while Home hydrates

- [x] Continue improving the app with the next focused reliability or user-flow enhancement
- [x] Show local-data restoration status in the Library screen

- [x] Continue improving production reliability or accessibility with the next focused app enhancement
- [x] Show local-data restoration status in the Profile screen

- [x] Extract repeated hydration notices into a shared accessible component
- [x] Adopt the shared hydration notice across Home, Library, and Profile
