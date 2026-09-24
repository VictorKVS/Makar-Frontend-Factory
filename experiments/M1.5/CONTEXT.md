# M1.5 — Context

M0.6 already separates avatar identity/state from presentation. M0.9 provides stable scene/asset concepts. M1.1 defines scenario presence. M1.4 is accepted.

M1.5 integrates these into the real ProductShell.

Hard boundaries:
- ProductShell selects scenario intent.
- Avatar Engine owns identity, activity, expression, gesture, attention and negotiation.
- Renderer adapter draws the resolved plan.
- Missing 3D capability is reported honestly.
- M1.6 will own the broader cinematic scene/WebGL layer; M1.5 must not fake that layer.
