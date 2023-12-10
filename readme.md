# Arena
A little coding game. Just starting out, not playable yet.

## Local
```
docker run -u 1000 --rm -it \
  --entrypoint /bin/bash \
  -v "$(pwd)":/app -w /app \
  node:20.9.0
npm i
npm run watch
```
```
docker-compose up -d
```

## Todo
- [x] Draw a drone in a play area.
- [ ] Use sandboxed function to control.
- [ ] Play area wrapping.
- [ ] Provide (limited) game state to sandbox.
- [ ] Visual representation of current output state.
- [ ] Visual for input state.

## Ideas
- Agents should have access to memory which persists between frames.
Block access to `window` and other things that'd normally persist, so we can do replay.

- Would it be worthwhile to have multiple `<iframe>`, one for each drone?

- Classic toroidal space wrap.

- Peaceful mode, encouraging choreography.

- More than 1v1. Teams?

- SpaceWar style star with gravity.

- Utility functions for vector maths.

- Introduction challenges.

## References
- https://web.dev/articles/sandboxed-iframes#safely_sandboxing_eval