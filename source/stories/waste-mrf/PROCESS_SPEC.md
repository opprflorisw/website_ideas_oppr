# Waste-MRF — canonical process spec (the single source of truth)

Every still (Q1–Q4 + orbit) must show THESE machines, in THIS order, with THESE flows.
If a machine is not on this list, it does not exist in the plant.

## Machine register

| ID | Machine | Hall | Colour/form | Feeds from | Feeds to |
|----|---------|------|-------------|------------|----------|
| G1 | Truck gate + strip curtains (IN) | Q1 | concrete opening | — | truck |
| T1 | Collection truck, reversed, rear tipping | Q1 | white/grey | — | P1 |
| P1 | Bunker pit — sunken, concrete walls on ALL sides, railing on the floor side | Q1 | concrete | T1 | K1 |
| K1 | Overhead gantry grab crane — rail spans FROM the pit TO the hopper, grab lifts waste out of P1 and drops it into H1 | Q1 | yellow | P1 | H1 |
| H1 | Infeed hopper — stands directly UNDER the crane's rail, within grab reach | Q1 | steel | K1 | C1 |
| C1 | Main belt, segment 1 — starts at H1, exits Q1 right through wall opening | Q1→Q2 | belt, loaded | H1 | D1 |
| D1 | Trommel drum screen — fed FROM ABOVE by C1 arriving perpendicular to the drum axis | Q2 | steel mesh drum | C1 (from above) | C2 (overflow) + C3 (underflow) |
| C2 | Main belt, segment 2 — carries the OVERSIZE fraction out of the drum's discharge end, past S1, exits right | Q2→Q3 | belt, loaded | D1 | O1 |
| C3 | Fines side conveyor — carries the UNDERFLOW (dark, fine, sludgy) out from beneath the drum | Q2 | belt, DARK material | D1 | B1 |
| B1 | Fines container — open-top roll-off in the courtyard | courtyard | rusty steel | C3 | (end) |
| S1 | Sort cabin — elevated cabin beside C2, with a WALKWAY PLATFORM; workers stand on the platform, never on the belt | Q2 | grey cabin | — | — |
| O1 | Optical sorter — THE ONLY white/blue machine in the plant, air-jet nozzle row, HMI on its side | Q3 | white + blue band | C2 | C4 |
| M1 | Overbelt magnet — hangs ACROSS the belt above C4 | Q3 | blue drum unit | C4 | C5 (metals) |
| C5 | Metals cross conveyor — takes magnet output sideways | Q3 | belt, scrap metal | M1 | B2 |
| B2 | Metals container — open-top roll-off in the courtyard | courtyard | rusty steel | C5 | (end) |
| L1 | Ballistic separator — BLUE, inclined shaking paddle deck. NOT a drum. NOT white. | Q3 | blue | C4 | C6 |
| C6 | Main belt, segment 4 — sorted material, exits Q3 right, turns the corner south | Q3→Q4 | belt, loaded | L1 | R1 |
| R1 | Channel baler — fed ONLY by C6 | Q4 | dark blue | C6 | bales |
| BS | Bale block — one tidy stack of square bales | Q4 | bales | R1 | F1 |
| F1 | Forklift — carries a bale to the truck | Q4 | orange | BS | T2 |
| T2 | Flatbed truck at the OUT gate + strip curtains | Q4 | white | F1 | (leaves plant) |
| A1 | Control-room annex — front facade, between the gates, desks + monitors. The ONLY office. | front | concrete + glass | — | — |
| W1 | Weighbridge — flush in the inbound driveway | front | steel plate | — | — |

**Banned duplicates:** exactly ONE drum (D1), exactly ONE white/blue machine (O1), exactly ONE
baler (R1), exactly ONE crane (K1). No conveyor exists that is not C1–C6.

## Flow diagram

```
        GATE G1 ─► TRUCK T1 (reverses, rear-tips)
                        │
                        ▼
                  ┌───────────┐        grab lifts
                  │  PIT P1   │◄════ CRANE K1 ════╗   crane rail runs pit ──► hopper
                  │ (walled)  │                   ║
                  └───────────┘                   ▼
                                              HOPPER H1
                                                  │
                                                  ▼  C1 (belt, up + through wall)
                                                  │
   Q2 ═══════════════════════════════════════════ │ ═══════
                                                  ▼  C1 arrives FROM ABOVE, perpendicular to drum axis
                                            ┌──────────┐
                                            │ TROMMEL  │ D1
                                            │  DRUM    │
                                            └──┬────┬──┘
                     overflow (oversize) C2 ◄──┘    └──► C3 underflow (DARK fines)
                              │                              │
                        past CABIN S1                        ▼
                     (workers on platform)              CONTAINER B1  (courtyard)
                              │
   Q3 ══════════════════════ │ ═══════════════════════════════
                              ▼
                    ┌──────────────────┐
                    │ OPTICAL SORTER   │ O1   (only white/blue machine)
                    │  air jets + HMI  │
                    └────────┬─────────┘
                             │ C4
                      ┌──────▼──────┐
                      │  MAGNET M1  │ (over the belt)
                      └──┬───────┬──┘
                         │       └──► C5 metals ──► CONTAINER B2 (courtyard)
                         ▼
                  ┌─────────────┐
                  │  BALLISTIC  │ L1  (BLUE, inclined paddles — not a drum)
                  │  SEPARATOR  │
                  └──────┬──────┘
                         │ C6  (turns the corner south)
   Q4 ══════════════════ │ ═══════════════════════════════════
                         ▼
                   ┌──────────┐
                   │  BALER   │ R1
                   └────┬─────┘
                        ▼
                   BALE BLOCK BS ──► FORKLIFT F1 ──► TRUCK T2 ──► out through gate
```

## Data-point attachment rules (threads)

A thread is only correct if BOTH ends are right.

| Scene | Orange (human) — starts EXACTLY at the glowing device in a worker's hands | Azure (machine) — starts EXACTLY at a glowing puck mounted ON a machine body |
|---|---|---|
| Q1 | tablet held by the operator at the pit railing (photographing the load) | puck on the crane K1 |
| Q2 | handheld at the mouth of a worker in cabin S1 (voice note) | puck on the trommel D1 drive |
| Q3 | tablet held by the technician at O1's HMI | pucks on O1 and on L1 |
| Q4 | phone scanning a bale (rising) + ONE thread DESCENDING into the loadout operator's tablet | puck on the baler R1 |
| orbit | all of the above | all of the above |

Threads never start in mid-air, on a roof, or on a wall. Cloud state: Q1/Q2 loose nodes (not
linked) → Q3 first interlinks → Q4 constellation + one descent → orbit full loop.
