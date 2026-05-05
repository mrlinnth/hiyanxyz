---
date: 2026-05-05
title: AI tools guide for developers
description: A practical guide to free AI tools, effective prompting, and
  agentic coding workflows.
---
# AI Tools & Prompting Guide for Developers

*A practical guide to free AI tools, effective prompting, and agentic coding workflows.*

---

## Table of Contents

1. [Introduction](#introduction)
2. [Safety First](#safety-first)
3. [Prompting Fundamentals](#prompting-fundamentals)
4. [Prompting for Code](#prompting-for-code)
5. [The Tool Landscape](#the-tool-landscape)
6. [Chat Tools](#chat-tools)
  - [DeepSeek](#deepseek)
  - [Google Gemini](#google-gemini)
  - [Microsoft Copilot](#microsoft-copilot)
  - [Arena](#arena)
7. [Free API Providers](#free-api-providers)
  - [Groq](#groq)
  - [Cerebras](#cerebras)
8. [Agentic Coding with OpenCode](#agentic-coding-with-opencode)
  - [What Is Agentic Coding](#what-is-agentic-coding)
  - [Installation & Setup](#installation--setup)
  - [Connecting Free Models](#connecting-free-models)
  - [Workflow & Tips](#workflow--tips)
9. [Student & Education Plans](#student--education-plans)
10. [Quick Reference](#quick-reference)

---

## Introduction

AI tools are now a standard part of the developer workflow. Used well, they help you write code faster, debug more efficiently, learn new frameworks, and automate repetitive tasks. Used poorly, they generate plausible-looking code that breaks in production, leak sensitive data to third parties, or give you confidently wrong answers that you trust because they sound authoritative.

This guide covers two things: **how to prompt well** (the skill that makes every AI tool more useful, regardless of which one you use) and **which free tools are available** (with setup instructions for each).

The AI landscape moves fast. Specific tools and free tiers may change after this was written. The prompting fundamentals will not — they apply to any model, any tool, any year. If a setup step does not work, check the tool's official documentation first.

---

## Safety First

Before anything else, internalise these rules. They apply regardless of which tool you use.

### The Three Rules

**1. You own the output.** AI-generated code should go through the same review process as any other code. If it has a bug, it is your bug. If it fails tests, it is your responsibility. Never commit AI output without reading and understanding it.

**2. Protect sensitive data.** Free-tier AI tools may log your inputs for training. Assume they do unless documentation explicitly says otherwise. Never send API keys, passwords, tokens, database contents, proprietary business logic, or client-specific data to any public AI tool.

**3. Verify, do not trust.** AI models generate plausible text, not necessarily correct text. They hallucinate function names, invent APIs that do not exist, and give outdated advice with complete confidence. Always verify against official documentation.

### What Is Safe to Share

**Safe:** Generic code patterns with sensitive data removed, error messages with credentials redacted, public documentation questions, general architecture questions, open-source library usage questions.

**Not safe:** API keys, passwords, tokens, SSH keys, database contents, user personal data, proprietary algorithms, internal business documents, client-specific code on tools that may use your data for training.

When in doubt, sanitise first. Replace real values with placeholders before pasting anything into an AI tool.

---

## Prompting Fundamentals

A prompt is the instruction you give to an AI model. The quality of the prompt directly determines the quality of the output. These six techniques consistently produce better results, regardless of which model or tool you use.

### 1. Be Specific

Vague prompts get vague answers. The more detail you provide, the more useful the output.

**Vague:**

> How do I make an API?

**Specific:**

> I am building a Laravel 11 REST API. I need a POST endpoint at /api/posts that accepts title (required, string, max 255), body (required, text), and category_id (required, exists in categories table). It should use Form Request validation and return the created post as JSON with a 201 status. I use Pest for testing.

### 2. Provide Context

Tell the model what it needs to know: your tech stack, project conventions, what you have already tried, what constraints apply.

> I am working on a Laravel 11 project that uses Spatie Query Builder for API filtering. The project follows the convention of putting business logic in Action classes (app/Actions/), not in controllers. Controllers are thin.
>
> I need to build a "list posts" endpoint that supports filtering by category_id, sorting by created_at, and pagination. Show me the Controller, Action class, and the API resource.

### 3. Give Examples of What You Want

If you want output in a specific format, show an example. Models are very good at following patterns.

> Write a Pest feature test for the GET /api/categories endpoint. Follow this pattern:
>
> ```php
> it('returns categories for authenticated users', function () {
>     $user = User::factory()->create();
>     Category::factory()->count(3)->create();
>
>     actingAs($user)
>         ->getJson('/api/categories')
>         ->assertOk()
>         ->assertJsonCount(3, 'data');
> });
>
> ```
>
> Write tests for: happy path (list all), unauthenticated access (should return 401), and filtering by parent category.

### 4. Ask for Reasoning

If you want to understand why something works (not just get the answer), ask the model to explain its reasoning. This is especially useful when learning.

> Why does this query cause an N+1 problem? Explain it step by step, then show me how to fix it with eager loading.
>
> ```php
> $posts = Post::all();
> foreach ($posts as $post) {
>     echo $post->category->name;
> }
>
> ```

### 5. Iterate, Do Not Start Over

If the first response is close but not right, refine it. Tell the model what was wrong and what to change. You do not need to rewrite the entire prompt.

> That is close, but two things to fix:
>
> 1. The action class should accept a DTO instead of an array — we use Spatie Data Transfer Objects.
> 2. Add validation for the category_id — it should exist in the categories table.

### 6. Assign a Role When It Helps

For specialised tasks, telling the model to act as a specific expert can improve output quality.

> You are a senior Laravel developer who follows PSR-12 standards, uses Pest for testing, and puts business logic in Action classes. Review this controller and suggest improvements.

---

## Prompting for Code

Code prompting has specific techniques beyond the general fundamentals. These patterns work across chat tools, APIs, and agentic assistants.

### What Effective Code Prompts Include

- **Language and framework version** — "Laravel 11 / PHP 8.3" not just "PHP"
- **Project conventions** — "we use Action classes, Pest tests, Spatie Query Builder"
- **What already exists** — "I already have a Post model with a belongsTo Category relationship"
- **What you need** — "build the controller, form request, and feature test"
- **Constraints** — "no external packages beyond what is listed", "must work with MySQL 8.0"

### Common Patterns

**Explain existing code:**

> Explain what this code does, line by line. I am a junior developer and want to understand the Spatie Query Builder parts specifically. [paste code]

**Debug an error:**

> I am getting this error when I hit POST /api/posts: [paste error message with credentials redacted]
>
> Here is my controller method: [paste code] And my form request: [paste code]
>
> What is causing this and how do I fix it?

**Generate tests:**

> Write Pest feature tests for this endpoint. Cover: happy path, unauthenticated (401), validation errors (422), and not found (404). Use factories for test data. Follow this test style: [paste one example test]

**Refactor:**

> Refactor this controller. It has too much logic in it. Move the business logic into an Action class. Keep the controller thin. Explain the changes you made.

**Code review assist:**

> Review this code for issues. Check for: N+1 queries, missing validation, security issues, naming convention violations, and missing error handling. We use Laravel 11, Pest, Spatie permissions, and thin controllers with Action classes. [paste code]

### What AI Is Not Good At (Yet)

- **Understanding your full project context** — it does not know your database schema, your other controllers, or your business rules unless you tell it
- **Making architectural decisions** — it can suggest patterns, but the decision is yours
- **Guaranteeing correctness** — always run the code, run the tests, check the output

---

## The Tool Landscape


| Tool | Type | Best For | Cost |
| --------------------- | -------------- | ------------------------------------------------ | ----------------------------------------- |
| **DeepSeek** | Chat | Coding questions, reasoning, general tasks | Free (web) |
| **Google Gemini** | Chat | Research, long context, multimodal (images/docs) | Free (web + API) |
| **Microsoft Copilot** | Chat | Quick questions, web search, general assistance | Free (web) |
| **Arena** | Chat / Compare | Comparing model outputs, research, demos | Free |
| **Groq** | API | Fast inference, prototyping, tool integrations | Free tier (no credit card) |
| **Cerebras** | API | Fast inference, agentic workflows | Free tier (1M tokens/day, no credit card) |
| **OpenCode** | Agentic CLI | Agentic coding in terminal, code generation | Free (with free models) |


**Chat tools** are web interfaces where you type questions and get answers. Good for quick questions, research, and learning. **API tools** give you an API key to call models programmatically — useful for integrations and for powering agentic tools. **Agentic tools** can read your codebase, edit files, run commands, and work through multi-step tasks autonomously.

---

## Chat Tools

### DeepSeek

**URL:** [chat.deepseek.com](http://chat.deepseek.com)

DeepSeek is a free AI chat tool that is particularly strong at coding and reasoning tasks. The web chat is free with no usage limits for normal use.

**Good for:** Coding questions (any language/framework), debugging (paste an error and code, get an explanation), explaining concepts in plain language, complex reasoning via "Deep think" mode.

**How to use:** Go to [chat.deepseek.com](http://chat.deepseek.com), create a free account, and start chatting. Toggle "Deep think" mode for problems that need step-by-step reasoning (debugging complex logic, designing a database schema, algorithm problems).

**Privacy note:** DeepSeek's servers are based in China. Do not send proprietary code, credentials, or any sensitive information. Use it for general coding questions with sanitised examples.

### Google Gemini

**URL:** [gemini.google.com](http://gemini.google.com)

Google Gemini is a free AI assistant with strong research capabilities, a large context window, and multimodal support (it can read images and documents).

**Good for:** Research and summarisation (web search is built in), working with long documents, uploading images and PDFs for analysis, general coding questions.

**How to use:** Go to [gemini.google.com](http://gemini.google.com) and sign in with a Google account. The free tier gives access to the latest Gemini models. You can upload files, images, and paste long documents directly.

Google also offers a free API tier through [Google AI Studio](https://aistudio.google.com/) with generous limits — useful for prototyping and connecting to agentic coding tools like OpenCode.

### Microsoft Copilot

**URL:** [copilot.microsoft.com](http://copilot.microsoft.com)

Microsoft Copilot is a free AI assistant with web search capabilities. It integrates with the Microsoft ecosystem.

**Good for:** Quick questions with current web search results, general coding questions, writing and editing text, image generation.

**How to use:** Go to [copilot.microsoft.com](http://copilot.microsoft.com) or use the Copilot sidebar in Microsoft Edge. Sign in with a Microsoft account for full access.

**Note:** Microsoft Copilot (free web chat) and GitHub Copilot (paid IDE coding assistant) are different products. GitHub Copilot has a free student plan — see the [Student Plans](#student--education-plans) section.

### Arena

**URL:** [arena.ai](http://arena.ai)

Arena (formerly LMArena / Chatbot Arena) is a free platform where you can chat with multiple AI models and compare their outputs side by side. It is the most widely used platform for evaluating AI model quality through crowdsourced human voting.

**Good for:** Trying out models you do not have access to (GPT, Claude, Gemini, open-source models), comparing two models head-to-head on the same prompt, research and quick experiments, demos.

**How to use:** Go to [arena.ai](http://arena.ai). No account is required for basic use. In "battle" mode, you submit a prompt and two anonymous models respond — you vote for the better one and the models are revealed. You can also select specific models to chat with directly.

**Important:** Arena is a public research platform. Your conversations may be disclosed to AI providers and may be made public. **Do not submit any proprietary code, credentials, or sensitive information.** Use it for general research, demos, and experiments only.

---

## Free API Providers

These providers give you API keys that you can use programmatically — in your own scripts, in integrations, or to power agentic coding tools like OpenCode.

### Groq

**URL:** [console.groq.com](http://console.groq.com)

Groq provides extremely fast AI inference through their custom LPU (Language Processing Unit) hardware. The free tier gives API access to open-source models like Llama and GPT-OSS with no credit card required.

**Free tier limits:**


| Limit | Value |
| -------------------- | ------ |
| Requests per minute | 30 |
| Tokens per minute | 6,000 |
| Requests per day | 14,400 |
| Credit card required | No |


These limits are sufficient for personal development and prototyping. Not enough for production workloads.

**Setup:**

1. **Create an account** at [console.groq.com](http://console.groq.com). Sign up with email or Google. No credit card needed.
2. **Create an API key.** Go to API Keys in the sidebar and create a new key. Copy it immediately — you will not see it again.
3. **Store it as an environment variable.** Add to your shell profile (`~/.zshrc` or `~/.bashrc`):

```bash
export GROQ_API_KEY="gsk_your_key_here"

```

Then run `source ~/.zshrc` to apply.

4. **Test it.** The Groq API is OpenAI-compatible:

```bash
curl -s https://api.groq.com/openai/v1/chat/completions \
  -H "Authorization: Bearer $GROQ_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"llama-3.3-70b-versatile","messages":[{"role":"user","content":"Hello"}]}'

```

Full documentation: [Groq Quickstart](https://console.groq.com/docs/quickstart)

### Cerebras

**URL:** [cloud.cerebras.ai](http://cloud.cerebras.ai)

Cerebras runs inference on custom wafer-scale chips, delivering some of the fastest inference speeds available. Their free tier is one of the most generous — 1 million tokens per day with no credit card.

**Free tier limits:**


| Limit | Value |
| -------------------- | ---------------------------------- |
| Tokens per day | 1,000,000 |
| Requests per minute | 30 |
| Tokens per minute | 60,000 – 100,000 (varies by model) |
| Credit card required | No |


**Setup:**

1. **Create an account** at [cloud.cerebras.ai](http://cloud.cerebras.ai). No credit card needed.
2. **Create an API key.** Navigate to API Keys in the dashboard and create a new key. Copy it.
3. **Store it as an environment variable:**

```bash
export CEREBRAS_API_KEY="your_key_here"

```

4. **Test it.** Also OpenAI-compatible:

```bash
curl -s https://api.cerebras.ai/v1/chat/completions \
  -H "Authorization: Bearer $CEREBRAS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"llama3.1-8b","messages":[{"role":"user","content":"Hello"}]}'

```

Full documentation: [Cerebras Quickstart](https://inference-docs.cerebras.ai/quickstart)

---

## Agentic Coding with OpenCode

### What Is Agentic Coding

Traditional AI chat tools work like a conversation: you ask a question, you get an answer, you copy-paste code into your project. Agentic coding tools go further. They can read your project files, edit code directly, run terminal commands, and execute multi-step tasks autonomously.

[OpenCode](https://opencode.ai/) is an open-source agentic coding tool with over 150,000 GitHub stars. It runs in your terminal and supports 75+ model providers, including free ones.

**What makes it different from a chat tool:**

- **Reads your codebase** — it can browse files, understand project structure, and use context from your actual code
- **Edits files directly** — it creates, modifies, and deletes files in your project
- **Runs commands** — it can run tests, migrations, linters, and react to the output
- **Uses any model** — connect free models (Groq, Cerebras) or paid ones (OpenAI, Anthropic)

### Installation & Setup

```bash
# Install via npm (Node.js required)
npm install -g @opencode/cli

# Verify
opencode --version

```

### Connecting Free Models

OpenCode includes some built-in free models that rotate periodically. You can also connect your Groq or Cerebras API keys.

**Option A: Built-in free models.** After installing, run `opencode` and use the `/models` command to see which free models are currently available. Select one and start working.

**Option B: Connect Groq.**

1. Make sure `GROQ_API_KEY` is set in your shell (see [Groq setup](#groq)).
2. Launch OpenCode in your project directory: `opencode`
3. Type `/connect` and select Groq. Paste your API key when prompted.
4. Type `/models` and choose a Groq model (e.g., `llama-3.3-70b-versatile`).

**Option C: Connect Cerebras.** Same process — set `CEREBRAS_API_KEY`, launch OpenCode, `/connect` Cerebras, `/models` to select.

**Note:** Free models and their availability change regularly. The `/models` command always shows what is currently available. If a specific model from this guide is no longer listed, pick the best alternative. Check [opencode.ai/docs/models](https://opencode.ai/docs/models/) for current recommendations.

### Workflow & Tips

#### When agentic coding helps

- **Scaffolding** — generating models, migrations, controllers, and tests for a new feature. The agent creates multiple files at once following your conventions.
- **Refactoring** — moving logic across multiple files consistently (e.g., extracting controller logic into service classes).
- **Writing tests** — generating test files for existing endpoints. The agent reads the route, controller, and model to produce accurate tests.
- **Repetitive changes** — adding a new field across model, migration, validation, resource, and test in one go.

#### When agentic coding does not help

- **Complex architectural decisions** — the agent does not understand your business requirements or project constraints
- **Performance debugging** — it cannot run profiling tools or observe real behaviour
- **Tasks requiring human judgment** — "should this be a separate service or inline?" depends on context the agent does not have
- **Anything involving credentials** — even local agents may send code context to remote APIs when calling the model

#### Tips for effective use

**1. Start from the project root.** Always run OpenCode from your project's root directory. It uses the directory tree to understand your project structure.

**2. Set conventions in your first message.** The agent does not know your team's conventions unless you tell it:

> This is a Laravel 11 API project. We follow these conventions:
>
> - Business logic in app/Actions/ (single-purpose action classes)
> - Thin controllers that delegate to actions
> - Pest for testing (feature tests in tests/Feature/)
> - Spatie Query Builder for API filtering
> - snake_case for database, PascalCase for models, camelCase for functions

**3. Review every change before committing.** After the agent makes changes, review the diff:

```bash
git diff

```

Check for: hallucinated imports, wrong naming conventions, missing error handling, logic that does not match your requirements. Run tests and linter before committing.

**4. Work in small steps.** Do not ask the agent to "build the entire comments feature." Break it down: "Create the Comment model and migration with these fields." Then: "Create the store endpoint with form request validation." Each step is easier to review.

**5. Use git as your safety net.** Commit before giving the agent a large task. If it makes a mess, `git checkout .` reverts everything. Always work on a feature branch.

**Free model limitations:** Free models have lower rate limits and may be less capable than paid models. If the agent produces poor output or times out, try a different model (`/models` to switch) or break your task into smaller pieces.

---

## Student & Education Plans

If you are a current student, many AI and developer tools offer free or heavily discounted plans. Always search for student plans before paying for any tool.

### GitHub Student Developer Pack

This is the most valuable student plan for developers. It includes:

- **GitHub Copilot Student** — free access to GitHub Copilot's premium features (normally $10/month), including unlimited code completions and premium models in your IDE
- **Free GitHub Pro** while you are a student
- **$200 in Azure credits** (for students 18+)
- **Free domains, cloud hosting credits, and more** from dozens of partner companies

**How to apply:**

1. Go to [education.github.com/pack](https://education.github.com/pack)
2. Verify your student status (university email, student ID, or enrolment letter). Verification can take a few days.
3. Once verified, go to GitHub Settings → Copilot → enable the free Copilot Student plan.

**Note:** As of early 2026, new sign-ups for the GitHub Copilot student plan may be temporarily paused during billing transitions. Check [GitHub's plans page](https://docs.github.com/en/copilot/get-started/plans) for the latest status.

### Other Student Plans Worth Checking


| Tool | Student Offer | Where to Apply |
| ------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| **JetBrains IDEs** | Free professional licences for all IDEs (PhpStorm, WebStorm, etc.) | [jetbrains.com/education](https://www.jetbrains.com/community/education/) |
| **Figma** | Free Education plan | [figma.com/education](https://www.figma.com/education/) |
| **Notion** | Free Plus plan for students | [notion.so/education](https://www.notion.so/product/notion-for-education) |
| **Microsoft 365** | Free for students at many institutions | Check with your university |


**The general rule: always search "[tool name] student plan" before paying.** Most developer tools have some form of education discount. If you are an intern, check if your university email still works — many programs accept currently enrolled students even if they are working.

---

## Quick Reference

### Tool Links


| Tool | URL | Type |
| ----------------- | -------------------------------------------------------------- | ------------------------- |
| DeepSeek | [chat.deepseek.com](http://chat.deepseek.com) | Chat (free) |
| Google Gemini | [gemini.google.com](http://gemini.google.com) | Chat (free) |
| Google AI Studio | [aistudio.google.com](http://aistudio.google.com) | API (free tier) |
| Microsoft Copilot | [copilot.microsoft.com](http://copilot.microsoft.com) | Chat (free) |
| Arena | [arena.ai](http://arena.ai) | Chat / Compare (free) |
| Groq Console | [console.groq.com](http://console.groq.com) | API (free tier) |
| Cerebras Cloud | [cloud.cerebras.ai](http://cloud.cerebras.ai) | API (free tier) |
| OpenCode | [opencode.ai](http://opencode.ai) | Agentic CLI (free + BYOK) |
| GitHub Education | [education.github.com/pack](https://education.github.com/pack) | Student plans |


### Environment Variables

```bash
# Add these to ~/.zshrc or ~/.bashrc
export GROQ_API_KEY="gsk_your_key_here"
export CEREBRAS_API_KEY="your_key_here"

```

### The Rules That Matter Most

1. **Never share credentials with AI tools** — no API keys, passwords, tokens, or database contents.
2. **You own the output** — AI-generated code goes through the same review and testing process as everything else.
3. **Verify, do not trust** — always test AI output. Run the code. Check the docs. Models hallucinate confidently.
4. **Be specific in prompts** — include stack, version, conventions, constraints, and examples. Specificity equals quality.

---

*AI tools and free tiers change frequently. If something in this guide is outdated, check the tool's official documentation for the latest information.*