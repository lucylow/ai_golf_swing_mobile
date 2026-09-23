# Final Submission Gate

## Code gate

- TypeScript check passes.
- Lint passes.
- Unit/integration tests pass.
- Release runtime safety script passes.
- Secret scan passes.
- Placeholder scan passes.
- Privacy manifest audit is reviewed by a human.

## Device gate

- Cold launch from a clean install.
- Warm resume after backgrounding.
- Camera permission denied then enabled.
- Microphone permission denied then enabled.
- Limited photo-library access.
- Import valid MP4 and MOV.
- Import missing/corrupt/oversized video.
- Cancel capture.
- Cancel analysis.
- Timeout analysis.
- Offline before upload.
- Reconnect during retry.
- Expired session.
- Purchase cancellation and restore.
- Share/export failure.
- Account deletion request and local cleanup.
- Deep link while signed out.

## Store gate

- Final metadata and URLs are real, not placeholders.
- Review account/demo path is functional when login is required.
- In-app purchases are configured, visible, and testable.
- Privacy responses match actual collection/SDK behavior.
- Privacy manifest entries match actual required-reason API usage.
- Version/build number is unique.
- Support/contact links work.
