---
date: 2026-04-10
title: I Built My Own Sales Pipeline in 2.5 Days
description: Because Everything Else Was Too Much
tags: "developer, ai, "
---
I had been tracking sales deals in a Trello board. Not because Trello is a sales tool — it plainly is not — but because it was close enough. Cards, columns, drag and drop. That gets you maybe 80% of the way there before the duct tape starts showing.

The remaining 20% was the part that quietly annoyed me every day. I needed to filter deals by quarter. I needed total deal values per stage, updating live as I dragged cards around. I needed to tag deals by sector. Trello will let you do all of this, technically, with enough power-ups and enough willingness to feel foolish about the whole arrangement.

I did not want a CRM. Every CRM I have looked at is a small city of features I will never visit. Contact timelines. Meeting notes. Pipeline templates. Email integration. I wanted something exactly the size of my problem: a kanban board that understood that deals have dollar values, quarters, and sectors. That was the whole list. Nothing else made the cut.

So I built it. The app is live at [pipeline.hiyan.cloud](https://pipeline.hiyan.cloud).

_This article reflects the initial release on 10 April 2026. The app continues to be updated — check the [repo](https://github.com/mrlinnth/hi-pipe) for the latest._

## The Idea Came From Reddit, As Most Things Do

I came across [Scrumboy](https://github.com/markrai/scrumboy) — a lightweight kanban board someone built for personal project tracking. Self-hosted, no nonsense, no database configuration required. I liked it immediately and spent a while trying to use it as a sales pipeline before admitting that it was shaped for sprints, not deals. No amounts. No periods. No sector filtering.

But it gave me something more useful than a working tool: a conviction. A focused personal app built to your exact shape is worth the afternoon it costs you. That turned out to be approximately correct, though it was closer to two and a half days than one afternoon.

## A Conversation Before the Code Editor

The first thing I opened was not a code editor. It was a chat with Claude.

This is not vibe coding in the chaotic sense — just throwing prompts at the wall and seeing what sticks. I knew React. I knew my data model. I already had a Cockpit CMS instance running on my VPS for another personal app, so the backend question answered itself before I even asked it. What I did not have was a written spec, a component breakdown, or a build plan that a model could actually follow without me re-explaining the architecture every session.

Claude helped with all of that. We went from rough idea to PRD, then from PRD to a phased implementation plan detailed enough for a junior developer to follow, then from that plan to an `AGENTS.md` that became the instruction set for the actual build. The distinction I would draw is this: I was doing the thinking. Claude was doing the translation — from fuzzy intent to structured plan. That division worked well.

## The Tech Decisions Are Boring On Purpose

React with Vite. Plain CSS. Cockpit CMS as the backend. Docker and Dockge for deployment. No routing library — URL params handle filter state directly. No CSS framework. No auth in the app — Caddy sits in front and handles that at the reverse proxy level with basic auth.

Every one of these is a deliberate subtraction.

Cockpit was already running on my VPS. Using it here cost me nothing and meant I did not have to think about a database or an API layer. Authentication is someone else's problem at the infrastructure level, and since the app only talks to my own Cockpit endpoint with my own API key, no visitor can see my pipeline data anyway. `@dnd-kit` is the only dependency beyond React that touches the core product. The rest is `fetch` calls and `useState`.

The KISS philosophy is not laziness dressed up as wisdom. It is a bet that the app I actually ship and use every day is worth more than the one I architect beautifully and abandon. I have lost that bet before, which is how you learn to make it.

## The Build

The code started on April 8th. GLM-4.6 on OpenCode CLI handled most of the execution, working through the implementation plan step by step. The sequence was deliberate: data layer first — `cockpit.js`, then the custom hooks for deals and stages — before any UI existed. Components built from the inside out: `DealCard` before `Column`, `Column` before `Board`. Drag and drop came last, only after the layout was confirmed working without it. That order mattered. Catching an API shape mismatch early, before it is buried three components deep, is easier than finding it later.

Not everything went according to plan. Cockpit uses `POST` for both create and update — you tell them apart by whether the body includes an `_id`. The implementation plan had this wrong, specifying `PUT` for updates. The first working version was silently creating duplicate deals instead of updating them, which is the kind of bug that makes you question everything before you find it. That got fixed on April 9th, alongside a drag-and-drop clipping bug and a collapsible filter bar.

![Deal card interface showing details and editing options](https://github.com/mrlinnth/hi-pipe/raw/main/public/ss-2.jpg)

Offline mode was not in the original PRD. It came about from a shift in thinking during the build. The app started as something I would use alone, which made security feel like a real concern — hence the basic auth via Caddy. But as I implemented and tested, I realized that the Cockpit API token already handled that. Nobody can see my pipeline data without my endpoint and key. So I started thinking about sharing the app with colleagues at work. That created a different problem: they would not have a Cockpit instance, and I was not going to set one up for every person who wanted to try it.

The answer became `src/storage.js` — a localStorage layer that works entirely in the browser. When you first open the app, a modal asks whether you want to connect to Cockpit or work offline. Offline mode stores everything locally. Connect to Cockpit later and your local data gets replaced by whatever Cockpit has. Disconnect from Cockpit and your data persists in the browser — it just stops syncing. Simple, and honest about its tradeoffs.

April 10th finished the job: PWA conversion, the "Hi Pipe" branding with a navy color scheme, configurable sectors, compact card toggle, loading states on write operations, mobile layout fixes. Two and a half days.

## The Part The Models Could Not Do

The logo took longer than any single component. I used Google Gemini on the free plan, and I learned that prompting for images is a different skill from prompting for code. With code, specificity works in your favor — the more precise your instructions, the better the output. With image generation, the same specificity tends to produce something that looks like it was designed by a legal department. I went through more iterations than I care to admit, still had to manually edit the output, and still had to remove the background by hand to get something I was happy with. The image generation skill, it turns out, is its own thing, and I do not have it yet.

OpenCode with GLM had instability problems throughout. Crashes, hangs, sessions that needed retrying the same prompt two or three times before producing a response that made sense. It is a less polished experience than Claude Code, which I used for the heavier architectural work. The division — Claude for planning, GLM for execution — was partly preference and partly necessity. Claude Pro tokens are finite and Sonnet handles a lot, so you spend them where they count.

The honest limitation of both models: they are excellent at executing clear instructions and poor at questioning them. Neither pushed back when my API integration spec was wrong. Neither suggested that offline mode was worth thinking about before the first deployment. They waited for me to notice the problems and bring them back. You still have to bring your own judgment. The AI is a fast and tireless pair programmer, not a senior engineer who will tell you when you are walking toward a mistake.

## The Result

Hi Pipe is a kanban board for tracking sales deals. Five configurable stages. Filters for period, sector, and tags that persist in the URL so any view is bookmarkable. A totals bar that updates as you move cards around. Drag and drop that works. Installable as a PWA. Works offline. Renders acceptably on a phone, with the deal form opening as a bottom sheet on mobile.

![Main kanban board showing deals organized by stages](https://github.com/mrlinnth/hi-pipe/raw/main/public/ss-1.jpg)

What it does not do: assignees, activity history, multiple pipelines, CSV export, charts, list view. Those absences are intentional. An app that does exactly what I need has a better chance of still feeling useful in a year than one that does everything I might someday need.

## Would I Do It Again

Yes, with the same conditions that made this sensible in the first place.

I knew the domain. I knew the stack. I already had the infrastructure. The AI did not fill gaps in any of those areas — it amplified what was already there. The planning conversations with Claude were only useful because I could evaluate whether the plan made sense. The GLM execution runs only worked because the implementation plan was specific enough to follow. Neither of those is true if you are unclear on what you are building.

The workflow itself — Claude for architecture, GLM for execution — is worth considering for other small personal tools. Not because it is faster than writing everything yourself, though sometimes it is, but because the planning phase forces a clarity I would otherwise skip. There is a version of this project where I open a code editor on day one with a vague idea and produce a tangle of components with no coherent data layer. I have done that before. Starting with a structured conversation delayed the first line of code by a few hours and saved me from a rewrite somewhere in the middle.

The tools are imperfect. The crashes are annoying. The image generation is a skill I do not yet have. But the app works, I use it every day, and it does exactly what I need it to do.

That is enough.

---

The source code is on GitHub at [mrlinnth/hi-pipe](https://github.com/mrlinnth/hi-pipe). If you want to see how the planning process looked in practice, the full PRD and implementation plan are in the `docs/` folder of the repo. The live app is at [pipeline.hiyan.cloud](https://pipeline.hiyan.cloud) — select the offline mode and it works without any setup.