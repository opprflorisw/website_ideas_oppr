# Oppr scroll-world v2 — the square-plant factory

**Status: design only. No generations happen without an explicit go (Option A rule stands).**

v1 (PVC, `../oppr-scrollworld/`) is shipped and stays as-is. v2 is the *machine for making
the next stories* — biogas, waste separation, and whatever comes after — faster, cheaper
and more coherent than v1's hand-crafted process.

---

## 1. The concept: one square plant, walked quadrant to quadrant

The whole facility is ONE square scale-model building: four process quadrants, with a
low **control-room annex on the front (south) facade, between the two truck gates** —
where control rooms actually sit in real plants: beside the entrance and weighbridge,
windows overlooking the halls. Material flows clockwise around the perimeter. The
camera dives in at the receiving gate, glides along each quadrant, **turns the corner**
into the next, then passes the control-room annex on the front facade and rises into
an orbit of the whole square.

```
        N (back)
   ┌─────┬─────┐
   │ Q2  │ Q3  │      Q1 receive → Q2 process → Q3 process → Q4 dispatch
   │     │     │      → control-room annex (the "understanding" beat) → rise + orbit
   ├─────┼─────┤
   │ Q1  │ Q4  │      camera: perimeter walk, 90° turn at each corner
   │     │     │
   └─▲─┬───┬─▼─┘      ▲ truck in (Q1 gate)   ▼ truck out (Q4 gate)
     │ │CTL│ │
        S (front — control room annex between the gates)
```

Camera path in one line:

```
in ► Q1 ─corner─► Q2 ─corner─► Q3 ─corner─► Q4 ─corner─► control room ► rise ► orbit
```

Why this beats v1's straight line:

1. **One master still = one geometry.** v1's weakest point was coherence: five
   independently generated scenes that never perfectly agreed, so connectors had to
   invent the space between them — that's exactly where the three drift seams live.
   In v2 we approve ONE overhead master still of the whole plant first; every quadrant
   still is *derived from it*. The world can't disagree with itself.
2. **Corners replace island-hops.** A v1 connector crossed empty background between two
   unrelated islands (maximum hallucination room). A v2 connector arcs around a corner
   of the *same building*, with the destination already visible in the master geometry.
   Less to invent → fewer drift seams. (Still the #1 thing previz must validate — see §6.)
3. **The closed loop is the message.** Q4's dispatch gate sits beside Q1's receiving
   gate, with the control-room annex between them: the orbit finale reads as a
   complete circuit — truck in, around the plant, truck out. Threads from all four
   quadrants rise and interlink into one constellation floating above the plant, and
   exactly ONE thread descends into the annex monitor (v1's proven office grammar).
   In v1 the office was just another stop on the line; here it's where the loop closes.
4. **Finished-product rule is built in.** Only Q4 shows a process ending (truck leaves
   through the gate). Everything else crosses quadrant walls mid-process.

## 2. Asset derivation (the coherence trick)

```
master.png  (1 gen, USER GATE #1 — judges style + all four quadrants at once)
  ├─ q1..q4 stills: crop the master quadrant → upscale → add threads/workers
  │    Plan A: crop + Higgsfield upscale + a light img2img pass with the crop as
  │            base (threads, glowing devices, HMIs added at this level — the
  │            master is too small to render threads cleanly)
  │    Plan B (fallback if crops lack interior detail): regenerate per quadrant
  │            with master as --image style/layout lock + the crop described in
  │            the prompt. Still far more coherent than v1's independent stills.
  ├─ orbit still: re-render of the master WITH the full thread constellation
  │            interlinked above the plant + the one descending thread into the annex
  └─ (USER GATE #2: quadrant board — approve all five stills before any video)
```

Videos, exactly the proven v1 Architecture B, new grammar:
- 5 **dives** (Q1–Q4 + orbit), each starting from ITS approved still (`--start-image`)
- 4 **corner connectors**, pinned both ends (prev clip's last frame → next clip's first
  frame), prompted as a steady glide that arcs 90° around the building corner
- previz everything on `seedance_2_0_mini` 720p first (USER GATE #3), same encode
  ladder as v1 (crf 20 desktop / crf 23 `-m` mobile, posters from encoded clips,
  crossfade 0.18 as the free seam-softener)

## 3. Story-as-data: one JSON per industry

Everything industry-specific lives in ONE file: `stories/<slug>/story.json`
(two drafts already written: `stories/biogas/`, `stories/waste-mrf/`). It holds the
master layout, and per quadrant: stations (2–4 machines in flow order), material
in/out (what crosses each wall), orange data points (human + device), azure data
points (sensor pucks), and the copy block (eyebrow/title/body/tags/accent).

Everything industry-INDEPENDENT is frozen in `blocks/*.txt`, lifted verbatim from the
v1 prompts that survived all the review rounds:

| block | locks |
|---|---|
| `style_preamble.txt` | style B miniature, palette, no text |
| `world_rules.txt` | overalls + hardhats, desktop PCs, **no paper**, HMI on every machine |
| `thread_grammar.txt` | threads rise UP from glowing sources; orange=human device, azure=sensor puck; interlink + one descending thread ONLY at the core |
| `slice_grammar.txt` | flow crosses frame edges; process ends on screen only when product is finished |
| `motion_dive.txt` | lateral glide + "scene stays exactly as it is" + final-second settle |
| `motion_corner.txt` | pinned 90° corner arc, no zoom/pullback/reversal |
| `motion_corner_safe.txt` | NSFW-fallback variant ("architectural model photography") |

A prompt is then just: `style_preamble + world_rules + slice_grammar + thread_grammar +
"Subject: " + (assembled from story.json)`. **Nobody hand-edits a full prompt again** —
that's how v1 drifted through 22 still iterations. Starting a new industry = writing
one story.json (~30 minutes of thinking) + the normal approval gates.

## 4. Pipeline & repo layout (to build on go-ahead)

```
oppr-scrollworld-v2/
  BLUEPRINT.md              this file
  blocks/                   locked prompt blocks (done)
  engine/scrub-engine.js    copied from v1, unmodified
  site-template.html        v1 index.html with {{placeholders}} for the copy/config
  tools/
    build_prompts.py        story.json + blocks -> stories/<slug>/prompts/
    pipeline.sh             v1's previz2.sh generalized: takes <slug>, idempotent,
                            3-retry gen(), sequential submits (6-job limit),
                            15-min watcher for API outages
    board.py                auto-builds the review board (v1's index2.html was hand-made)
    ledger.sh               appends every gen + credit balance to stories/<slug>/ledger.md
  stories/<slug>/
    story.json              the ONLY hand-written file per industry
    prompts/  work/  site/  generated
```

Gates, in order — each one is cheap insurance for the next spend:
master still → quadrant board → previz chain (mini) → assembled site → (optional final tier).

## 5. Budget per story (estimate — nothing runs without a go)

At draft tier (what v1 shipped): ~3–7 image gens (1 master + derivations; Plan A crops
cost little, Plan B regens cost more) + 9 videos on mini (~20 cr each ≈ 180) + ~20%
re-roll buffer ≈ **~230–300 credits per story**, vs ~617 burned on v1 with all its
exploration. The exploration is now amortized into the blocks — that was the point.
Current balance ≈ 584: roughly two draft-tier stories, not three. Upgrading any story
to full seedance later is a separate, larger spend.

## 6. Honest risks (what previz must prove)

1. **The 90° corner arc** is new grammar. v1 connectors were straight glides and still
   drifted at 3 of 4 seams; a turn asks more. Mitigations: pinned both ends (as v1),
   destination visible in the master geometry, `motion_corner_safe.txt` fallback, and —
   if a corner just won't hold — a `null` connector (plain crossfade) per the engine's
   design. Test ONE corner on mini (~20 cr) before committing to the pattern.
2. **Crop-derived stills** may be too coarse for interior detail (Plan B regen fallback
   costs ~4 extra image gens — cheap relative to any video re-roll).
3. **Camera orientation rotates 90° per quadrant.** Each dive is still a left-to-right
   glide in its own frame, so the proven motion prompt holds; only connectors carry
   the rotation. If previz shows the rotation confusing the model, fallback: keep the
   quadrant fiction in stills + orbit, but fly the connectors as v1-style straight
   glides along an unrolled path.
4. **Mixed indoor/outdoor** (biogas Q3 digester yard): style B is a physical scale
   model, so cutaway roofs + open yards read naturally — but the master gate is where
   this gets judged.

## 7. The two scenarios — layouts (see story.json for full detail)

Shared setup for both: material flows clockwise Q1 → Q2 → Q3 → Q4, crossing each
quadrant wall on a visible conveyor/pipe bridge (the slice-grammar hook). Both truck
gates are on the front facade with the control-room annex between them — beside the
weighbridge, windows onto the halls, exactly where a real plant puts it. The camera
walks the perimeter, passes the annex last, and rises: the orbit shows the full
circuit (truck in → around → truck out) with all threads interlinked above the plant
and one thread descending into the annex monitor.

**Biogas** — copy arc: *It starts at the gate → Machines talk. So does your team →
Forty days in the tank, nothing lost → One living picture → See your whole operation.*

```
                      N  (back of plant)
+------------------------------+------------------------------+
| Q2  PRE-TREATMENT            | Q3  DIGESTION (open yard)    |
|     (cutaway roof)           |                              |
|                              |    (O)      (O)     [=]      |
|  shredder > pasteurizers     | digester  digester  gas      |
|  > mixing tank ==slurry===>  |                    holder    |
|        ^                     |  biogas + digestate ||       |
|        | feed conveyor       |                     vv       |
+------------------------------+------------------------------+
| Q1  RECEIVING                | Q4  ENERGY & DISPATCH        |
|        |                     |                              |
|  hopper < loader < bunker    |  CHP engine   gas-to-grid >  |
|  weighbridge                 |  digestate press > loadout   |
|     ^ ^ truck in             |     v v truck out            |
+----     ---------------------+---------------------     ----+
     ^ ^ in            +---------------+    v v out
  feedstock truck      | CONTROL ROOM  |  digestate truck +
                       | annex: windows|  gas pipe to grid
                       | on the halls, |
                       | weighbridge   |
                       +---------------+
                      S  (front of plant)
```

**Waste MRF** (FIRST BUILD — arc restructured around Capture → Understand → Execute):
*Capture: It starts at the tip → Capture: Machines talk. So does your team →
Understand: The morning's photo meets the purity dip → Execute: The answer comes
back to the floor → Loop: See your whole operation.* The thread grammar carries the
acts (rise-only → interlinking → one descending thread → full loop); one narrative
spine runs through the walk: the contaminated load photographed at the tip is the
thing the plant later understands and acts on.

```
                      N  (back of plant)
+------------------------------+------------------------------+
| Q2  PRE-SORT                 | Q3  AUTOMATED SORTING        |
|     (cutaway roof)           |                              |
|                              |  optical sorter (air jets)   |
|  bag opener > trommel        |  > ballistic separator       |
|  > sort cabin (elevated, ==> |  > magnet / eddy current     |
|    2 workers at the belt)    |                              |
|        ^                     |   sorted streams ||          |
|        | feed conveyor       |                  vv          |
+------------------------------+------------------------------+
| Q1  TIPPING HALL             | Q4  BALING & DISPATCH        |
|        |                     |                              |
|  hopper < grab crane         |  baler > bale stacks         |
|  waste bunker                |  forklift > loadout bay      |
|     ^ ^ truck tips in        |     v v truck out            |
+----     ---------------------+---------------------     ----+
     ^ ^ in            +---------------+    v v out
  collection truck     | CONTROL ROOM  |  sorted bales
                       | annex: windows|  on truck
                       | on the halls, |
                       | weighbridge   |
                       +---------------+
                      S  (front of plant)
```

## 8. Open decisions before any generation

1. Is the **control-room annex folded into the orbit rise** (5 scenes, 9 videos —
   assumed above: the orbit dive starts at the annex and rises) or its own scene
   (6 scenes, 11 videos, +~40 cr)?
2. Which story first — biogas or waste-mrf?
3. Spend ~20 cr on a **single corner-connector test** before the full previz chain?
   (Recommended: it de-risks the one genuinely new idea.)
