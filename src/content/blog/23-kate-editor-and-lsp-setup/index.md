---
title: "Kate Editor and LSP setup"
description: "Setting up Kate text editor with Language Server Protocol support on Debian with KDE Plasma."
date: "Aug 14 2025"
---

After switching to Debian with KDE Plasma, I tried Kate, KDE's default text editor. Finding configuration resources was difficult, so I created this guide for reference.

## Preparation Steps

### 1. Create bin directory

```bash
mkdir -p ~/.local/bin
```

### 2. Add to PATH

Add `~/.local/bin` to your PATH environment variable.

### 3. Configure Kate settings

- Set font
- Choose color scheme
- Configure formatting preferences

### 4. Enable LSP Client plugin

Enable the LSP Client plugin in Kate's settings.

## LSP Server Installations

### Bash

```bash
sudo apt install shellcheck
npm install -g bash-language-server
```

### CSS/HTML/JSON

```bash
npm install -g vscode-langservers-extracted
```

### Markdown

Download marksman pre-built binary and place in `~/.local/bin/`.

### JavaScript/React/TypeScript

```bash
npm install -g typescript-language-server typescript
```

### PHP

Download phpactor binary and place in `~/.local/bin/`.

```bash
chmod +x ~/.local/bin/phpactor
```

## Configuration

1. Access Kate's LSP Client settings
2. Create `settings.json` file
3. Copy default server settings and customize command paths
4. Restart computer

## Laravel Projects

For Laravel projects, install laravel-ide-helper package:

```bash
composer require --dev barryvdh/laravel-ide-helper
```

Custom phpactor configuration may also be needed.
