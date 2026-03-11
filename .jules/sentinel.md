## 2026-03-04 - [Authorization Bypass]
**Vulnerability:** Client-provided `isAdmin` flag in the chat API (`src/app/api/chat/route.ts`) allowed any user to elevate their privileges and access restricted admin-only intelligence and navigation shortcuts.
**Learning:** Never trust client-provided data for authorization or access control. The `isAdmin` boolean was destructured directly from the request body without validation against a trusted server-side session.
**Prevention:** Authorization checks must always be performed server-side using secure, trusted session tokens or authentication state (e.g., Supabase Auth), ignoring any privilege flags sent by the client.
