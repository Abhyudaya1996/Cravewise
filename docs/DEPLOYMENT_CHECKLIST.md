# Deployment Checklist

Use only after a local demo works.

## Before Deploy

- No secrets committed.
- `.env.local` documented but not checked in.
- Build passes.
- Lint passes or issues are documented.
- Error and empty states exist.
- AI outputs are validated.
- Unsafe advice paths are tested.
- Case study notes are updated.

## Vercel

- Set environment variables in Vercel.
- Confirm correct app root.
- Verify production build logs.
- Open deployed route manually.
- Add URL to `docs/MILESTONE_TRACKER.md`.
- Add deployment to `.ai/memory/deployments.log`.
