#!/usr/bin/env bash
# Waste-MRF previz chain — Architecture B on the draft tier.
# 5 dives (each from its OWN approved still) + 4 corner connectors (pinned both ends).
# Idempotent: re-running skips anything already produced.
set -u
cd "$(dirname "$0")"
VMODEL=seedance_2_0_mini
W=work
V=$W/vid
mkdir -p "$V"

url() { python -c "import json,sys;d=json.load(open('$1'));print(d[0]['result_url'] if d else '')" 2>/dev/null; }

# gen <out.mp4> <prompt-file> <start.png> [end.png]
gen() {
  local out=$1 prm=$2 start=$3 end=${4:-}
  [ -s "$V/$out" ] && { echo "$out exists, skip"; return 0; }
  local tag=${out%.mp4}
  for attempt in 1 2 3; do
    local args=(generate create "$VMODEL"
      --prompt "$(cat "$prm")"
      --start-image "$start"
      --resolution 720p --aspect_ratio 16:9 --duration 5
      --wait --wait-timeout 20m --json)
    [ -n "$end" ] && args+=(--end-image "$end")
    higgsfield "${args[@]}" > "$W/$tag.json" 2> "$W/$tag.err"
    local u; u=$(url "$W/$tag.json")
    if [ -n "$u" ]; then
      curl -s -o "$V/$out" "$u" && [ -s "$V/$out" ] && { echo "$out OK"; return 0; }
    fi
    echo "$out attempt $attempt failed: $(head -c 160 "$W/$tag.err")"
    sleep 20
  done
  echo "$out FAILED"; return 1
}

# ---- stage 1: the five dives, in parallel ----
if [ "${1:-}" != "connectors" ]; then
  for i in 1 2 3 4 5; do
    gen "d$i.mp4" "prompts/vid/d$i.txt" "$W/still_$i.png" &
  done
  wait
  echo "DIVES_DONE"
fi

# ---- stage 2: boundary frames ----
for i in 1 2 3 4 5; do
  [ -s "$V/d$i.mp4" ] || continue
  [ -s "$W/last_$i.png"  ] || ffmpeg -y -loglevel error -sseof -0.1 -i "$V/d$i.mp4" -frames:v 1 "$W/last_$i.png"
  [ -s "$W/first_$i.png" ] || ffmpeg -y -loglevel error -ss 0 -i "$V/d$i.mp4" -frames:v 1 "$W/first_$i.png"
done
echo "FRAMES_DONE"

# ---- stage 3: the four corner connectors, pinned both ends ----
for i in 1 2 3 4; do
  j=$((i+1))
  [ -s "$W/last_$i.png" ] && [ -s "$W/first_$j.png" ] || { echo "conn$i: missing boundary frames"; continue; }
  gen "conn$i.mp4" "prompts/vid/conn.txt" "$W/last_$i.png" "$W/first_$j.png"
done
echo "CHAIN_DONE"
ls -la "$V"
