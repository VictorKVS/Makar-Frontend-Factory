# M0.2 — Project Context

Project: **ALINA Control Center** inside **Makar Frontend Factory**.

Current architectural rules:

- screen = composition of modules;
- streams have semantic priority;
- avatar is independent;
- shared packages stay ALINA-agnostic;
- cinematic UI must keep accessibility and performance fallbacks.

Current dependency: **PR #2 — M0.1 Design Tokens foundation**.

The task should consume the shared token contract rather than inventing a second style system.
