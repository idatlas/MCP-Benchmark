# Design brief: When Thunder Roars

Build this course exactly as specified. Every word of on-screen text is written below; use it as written. Do not add facts, statistics, rules or advice that are not in this brief. The source document `lightning-safety.pdf` is included for reference only; the brief already contains everything from it that the course uses.

## The course

| | |
|---|---|
| **Title** | When Thunder Roars: Lightning Safety for Vegetation Crews |
| **Audience** | Crew leads on utility vegetation management crews, the tree crews who keep trees clear of power lines |
| **Length** | 8 to 10 minutes |
| **Source** | OSHA and NOAA fact sheet "Lightning Safety When Working Outdoors" (OSHA FS-3863) |
| **Completion** | The learner passes the final quiz with 80% or higher |

## Learning objectives

After this course, a crew lead will:

**Knowledge**
1. Know that any thunder means lightning is close enough to strike, even with no rain overhead.
2. Know what counts as safe shelter and what does not.
3. Know the 30-minute rule.

**Attitude**
4. Treat lightning as a real job hazard, not a freak event.
5. Not rely on an app or detector to make the call.
6. Be willing to stop work under pressure to finish or to restore power.

**Skills**
7. Pick the closest safe shelter quickly.
8. Make the stop call at the first thunder and get the whole crew moving.
9. Tell the crew where shelter is before work starts.

**Habits**
10. Check the forecast every morning and plan around storms.
11. Not start a task the crew can't stop quickly when storms are possible.
12. Wait the full 30 minutes after the last thunder, every time.

## Design approach

- **Attitude comes first.** The hardest part is getting crew leads to care. The course opens with a decision the learner will probably get wrong, and every scenario names the real pressure to keep working before showing its cost.
- **Teach, then decide.** Each section gives a short piece of content, then a scenario where the learner makes the call and sees what happens.
- **The learner is the crew lead.** Write to "you." Every decision is your crew and your call.
- **Scenario retries.** A wrong choice shows its consequence, then the learner tries again. Scenarios are not scored. Only the final quiz is scored.
- **Commitment before the quiz.** The learner chooses one habit they will change.

## Tone

Objective, plain and easy to follow. Short sentences. No jokes, no exclamation points, no pep talk, nothing glib or chirpy. Use the words a crew would use: right-of-way, bucket truck, the cut, the crew.

## Characters

- **You:** the crew lead.
- **Dale:** a veteran on the crew. He tends to say the storm is miles away.
- **Luis:** newer on the crew. He usually works from the bucket.

## Look and feel

| | |
|---|---|
| Headings, dark panels | Storm navy `#1F2A3A` |
| Warnings, key actions, buttons | Lightning yellow `#F2C230` as a fill, with navy text on it |
| Page background | White `#FFFFFF`, light gray `#F4F5F7` for alternating sections |
| Body text | Dark gray `#2E2E2E` |
| Font | Inter. If the tool does not offer Inter, use its closest plain sans-serif |

Color rules:

- Text on yellow is always storm navy. Never put white text on yellow.
- Never use yellow for text on a white or light background. It is a fill and accent color only.
- Yellow accents on navy panels are fine.

Use the tool's own components for every interaction. Never show information by color alone.

## Accessibility (WCAG 2.1 AA)

- Use the alt text given for every image, exactly as written.
- Headings in order, with no skipped levels.
- Text contrast that passes AA everywhere.
- Every interaction works with a keyboard.
- Works on a phone.

## Images

Fourteen image files are in `images/`: a course cover, seven scene images, and six icons for the screen 5 sort. Place each one where listed, with its alt text.

| File | Screen | Alt text |
|---|---|---|
| `01-hook.png` | 1 | A tree crew on a rural power-line right-of-way under a clear sky, with dark storm clouds building on the horizon. |
| `02-morning.png` | 3 | A crew lead beside a utility truck at dawn, checking a weather forecast on a phone. |
| `03-rumble.png` | 4 | A worker in a raised bucket trimming branches near power lines while a storm darkens the sky behind the trees. |
| `04-shelter.png` | 5 | A tree crew walking quickly toward their truck along a right-of-way as storm clouds roll in. |
| `05-clearing.png` | 6 | The edge of a storm passing over a right-of-way, with the rain stopping and dark clouds still close by. |
| `06-restoration.png` | 7 | A utility truck parked by a downed tree on a wet road after a storm, with lightning flickering in the distant clouds. |
| `07-commitment.png` | 8 | A crew lead standing by a truck at the start of the day, looking up at the sky. |
| `00-cover.png` | Course cover or thumbnail | A tree crew's bucket truck on a right-of-way under a darkening storm sky. |

Icons for the screen 5 sort, one on each item card:

| File | Sort item | Alt text |
|---|---|---|
| `icon-truck.png` | The truck cab with the windows rolled up | Truck cab |
| `icon-building.png` | A fully enclosed building with wiring and plumbing | Building |
| `icon-trees.png` | A dense stand of trees | Stand of trees |
| `icon-pavilion.png` | An open-sided pavilion at a park | Open pavilion |
| `icon-shed.png` | The equipment shed | Equipment shed |
| `icon-bucket.png` | The raised bucket | Raised bucket |

## Storyboard

### Screen 1. You make the call

Image: `01-hook.png`

> You're the crew lead. Your crew is trimming along a rural right-of-way. It's mid-afternoon. You hear a low rumble of thunder in the distance. The sky overhead is still blue, and it isn't raining.
>
> What do you do?

Interaction: single choice, not scored. After any choice, show the reveal.

- A. Keep working. The storm is miles away.
- B. Finish the cut you're on, then stop.
- C. Stop work now and get the crew to the truck.

Reveal (shown after any choice):

> The right call is C. If you can hear thunder, even a distant rumble, you are close enough to be struck. Lightning can strike up to 10 miles from any rain.
>
> Most people pick A or B. This course is about why that happens, and how to make the right call when it counts.

### Screen 2. Why it matters

No image. Show the three numbers as large figures.

> Lightning is easy to write off as something that happens to someone else. The numbers say otherwise.
>
> - **20 to 25 million** cloud-to-ground strikes hit the United States every year.
> - **Over 300 people** are struck by lightning every year.
> - **About 50 people** a year were killed by lightning on average over the past 30 years, and many more were left with permanent disabilities.
>
> Many of those people were caught outside because they didn't act quickly enough, or because they went back out too soon after a storm passed.
>
> Your crew works in open spaces, near tall trees, with large equipment. That puts you among the outdoor jobs at higher risk. On your crew, the call to stop is yours.

### Screen 3. Plan the day

Image: `02-morning.png`

Teach:

> Lightning safety starts before anyone climbs.
>
> - **Check the forecast every morning.** Check NOAA weather reports at weather.gov before work starts, and keep watching the sky through the day. Darkening clouds and rising wind can mean a storm is building.
> - **Don't start what you can't stop.** If storms are possible, don't begin a task the crew can't stop quickly.
> - **Tell the crew where to go.** Before work starts, make sure everyone knows where shelter is and how long it takes to get there.

Scenario:

> It's 6:30 a.m. The forecast shows thunderstorms likely after 2 p.m. Today's plan includes a large removal near the line that will take most of the afternoon once it's started.
>
> What do you do?

- A. Start the removal at 1 p.m. as planned. You'll keep an eye on the sky.
  > Consequence: At 2:15 you hear thunder with the tree half down. You can't stop safely, so the crew keeps working with a storm moving in. Try again.
- B. Move the removal to the morning or another day, and plan work for the afternoon that can stop quickly. Tell the crew where shelter is.
  > Correct. You've planned around the storm instead of racing it. When thunder comes, the crew can stop at once and knows where to go.
- C. Skip the forecast. Forecasts are often wrong.
  > Consequence: The storm arrives on time, and the crew is in the middle of the removal with no plan for where to go. Try again.

### Screen 4. When thunder roars, go indoors

Image: `03-rumble.png`

Teach:

> If you hear thunder, even a distant rumble, get to a safe place immediately.
>
> - Thunderstorms always include lightning. Any thunder you hear is caused by lightning.
> - Lightning can strike outside the heaviest rain, and up to 10 miles from any rain. Waiting for the rain is waiting too long.
> - No app or lightning detector can predict the first strike. Watch the sky and listen for thunder.
>
> When thunder roars, go indoors.

Scenario:

> Luis is up in the bucket, halfway through a cut. You hear a faint rumble to the west. No rain yet. Dale checks his phone and says, "Lightning app shows nothing close. It's miles away. Let him finish."
>
> What do you do?

- A. Let Luis finish the cut. It'll only take ten minutes.
  > Consequence: Six minutes later, the storm is on top of you. Luis is the highest point on the right-of-way, in a metal bucket next to the trees. Try again.
- B. Wait until you see lightning, then call it.
  > Consequence: The first strike you see lands in the tree line a few hundred feet away. There was no warning before it, and the crew is still spread out. Try again.
- C. Call the stop now. Luis comes down, and the crew heads for the truck.
  > Correct. The rumble was the warning. An app can't predict the first strike, and you didn't wait for one.

### Screen 5. Pick the right shelter

Image: `04-shelter.png`

Teach:

> Nowhere outside is safe in a thunderstorm. Get to one of these:
>
> - **A fully enclosed building with wiring and plumbing.** Inside, stay away from anything that conducts electricity, like cords, plumbing and corded phones, and don't lean against concrete walls.
> - **If no building is close, a hard-topped metal vehicle with the windows rolled up.** On a rural right-of-way, that's usually your truck.
>
> These are not shelter: sheds, pavilions, tents, covered porches, trees, and a raised bucket. Up in the bucket, you're the tallest thing around, next to large equipment.

Interaction: sort each item into "Safe shelter" or "Not shelter," with feedback. Each item card shows its icon from the table under Images.

| Item | Answer |
|---|---|
| The truck cab with the windows rolled up | Safe shelter |
| A fully enclosed building with wiring and plumbing | Safe shelter |
| A dense stand of trees | Not shelter |
| An open-sided pavilion at a park | Not shelter |
| The equipment shed | Not shelter |
| The raised bucket | Not shelter |

Scenario:

> You call the stop. The nearest building is a 15-minute walk. The truck is parked 200 feet away. Dale starts toward a big oak at the edge of the right-of-way to wait it out.
>
> What do you tell the crew?

- A. Everyone into the truck, windows up.
  > Correct. With no building close, a hard-topped metal vehicle with the windows up is the safe choice.
- B. Get under the oak with Dale. It's closer.
  > Consequence: A tall, isolated tree is one of the most likely things on the right-of-way to be struck. Try again.
- C. Walk to the building.
  > Consequence: The crew spends 15 minutes in the open as the storm arrives. A closer safe shelter was 200 feet away. Try again.

### Screen 6. Wait 30 minutes

Image: `05-clearing.png`

Teach:

> The storm passing is not the all-clear.
>
> - **Stay in shelter for at least 30 minutes after the last thunder you hear.** Every new rumble restarts the 30 minutes.
> - Many people are struck because they go back outside too soon.
>
> If you're ever caught outside with no shelter in reach:
>
> - Don't be the tallest object. Stay away from isolated tall trees, hilltops, utility poles, large equipment, ladders and rooftops.
> - Get out of open areas, and never lie flat on the ground.
> - Stay away from water, and from wiring, fencing and other metal.
>
> Getting to shelter early is the only real protection. There is no safe place outside.

Scenario:

> The crew is in the truck. Ten minutes later the rain stops and the sky to the west is brightening. Dale says, "That's it, it's passed. Let's get back at it." You heard thunder about two minutes ago.
>
> What do you do?

- A. Head back out. The rain has stopped.
  > Consequence: Lightning can strike well behind a storm. The crew is back in the trees with the storm still close enough to hear. Try again.
- B. Stay put until 30 minutes have passed with no thunder.
  > Correct. The clock started at the last thunder, not when the rain stopped.
- C. Wait 10 more minutes, then go.
  > Consequence: That's 12 minutes after the last thunder, not 30. Try again.

### Screen 7. Final case: storm restoration

Image: `06-restoration.png`

> Last night's storms took down trees across lines all over your area. Hundreds of customers are without power. Your crew has been sent to clear a downed tree so the line crew can restore service.
>
> You arrive. The rain has stopped. Dispatch radios to ask how soon you'll have it cleared. While you size up the job, you hear thunder in the distance.
>
> What do you do?

- A. Start the work. People are without power, and the storm already passed.
  > Consequence: The pressure is real, and so is the risk. You heard thunder, so the storm is still close enough to strike. Try again.
- B. Get the crew into the truck. Tell dispatch you're holding for 30 minutes after the last thunder, and you'll start then.
  > Correct. This is the hardest call in the course because the pressure is real. Waiting costs 30 minutes. Not waiting could cost someone on your crew.
- C. Have the crew set up but stay near the truck, and start cutting if the thunder doesn't get closer.
  > Consequence: Thunder you can hear means lightning in range. Staying near the truck isn't the same as being in it. Try again.

### Screen 8. Your commitment

Image: `07-commitment.png`

> Knowing the rules isn't the hard part. Doing them when there's pressure to keep working is.
>
> Pick the one habit you'll start with:

Interaction: single choice, not scored. Show the learner's choice back to them.

- I'll check the forecast before we roll out every morning.
- I'll tell the crew where shelter is before work starts.
- I'll call the stop at the first thunder, no matter what.
- I'll hold the crew for 30 minutes after the last thunder, every time.

Response after any choice:

> Start with that one. Your crew will follow what you do.

### Screen 9. Final quiz

Five questions, one at a time. 80% (4 of 5) to pass. Feedback after every answer. If the learner scores below 80%, offer a retry. Passing marks the course complete.

**Q1.** You hear a distant rumble of thunder. The sky overhead is clear and it isn't raining. What should your crew do?
- Keep working until you see lightning.
- Finish the current task, then take shelter.
- **Stop work and get to safe shelter now.** ✓
- Keep working until it starts raining.

Feedback: Any thunder you hear is caused by lightning. Lightning can strike up to 10 miles from any rain, so stop and get to shelter as soon as you hear it.

**Q2.** Which of these is safe shelter in a thunderstorm?
- An open-sided pavilion
- **A fully enclosed building with wiring and plumbing** ✓
- A dense stand of tall trees
- A tent or canopy

Feedback: Fully enclosed buildings with wiring and plumbing are safe shelter. Pavilions, tents and trees are not.

**Q3.** No building is nearby. What is the safest choice?
- The raised bucket of the truck
- Lying flat in an open field
- **A hard-topped metal vehicle with the windows rolled up** ✓
- Under the tallest tree nearby

Feedback: If no building is close, a hard-topped metal vehicle with the windows up is the safe choice. Never lie flat on the ground, and stay away from tall objects.

**Q4.** Your crew heard the last thunder at 2:10 p.m. What is the earliest time you can go back to work?
- 2:20 p.m.
- 2:25 p.m.
- **2:40 p.m.** ✓
- As soon as the rain stops

Feedback: Wait at least 30 minutes after the last thunder. If you hear thunder again, the 30 minutes start over.

**Q5.** Storms are possible this afternoon. One task on today's list can't be stopped quickly once it's started. What should you do?
- Start it early and work fast.
- **Don't start it while storms are possible. Reschedule it.** ✓
- Start it and stop if you see lightning.
- Start it, and have someone watch a lightning app.

Feedback: If storms are possible, don't begin a task the crew can't stop quickly. No app can predict the first strike.

Pass message:

> You passed. When thunder roars, go indoors, and wait 30 minutes after the last rumble.

Retry message:

> You scored below 80%. Review the sections and try again.

## Done means

- All nine screens are built with the text, images and interactions above.
- The cover image is set as the course cover or thumbnail.
- The look and feel and the accessibility list above are applied.
- Nothing has been added that isn't in this brief.
- Give back a link where the course can be previewed, and a short list of anything in this brief you could not build in this tool.
