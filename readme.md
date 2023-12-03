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

## Ideas
Agents should have access to memory which persists between frames. Can do it themselves by accessing their iframe's window object?


## References
- https://web.dev/articles/sandboxed-iframes#safely_sandboxing_eval