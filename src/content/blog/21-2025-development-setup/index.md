---
title: "2025 Development Setup"
description: "A comprehensive setup guide for Pop!_OS development environment."
date: "Aug 2 2025"
---

A comprehensive setup guide for Pop!_OS development environment, organized as a checklist.

## 1. OS Maintenance

```bash
sudo apt remove --purge libreoffice*
sudo apt autoremove
sudo apt update && sudo apt upgrade
```

## 2. Backup & Security

- Create Timeshift backup
- Firefox setup with Bitwarden and Raindrop integration

## 3. Applications

Install:
- Telegram
- AppImageLauncher
- Outline Client
- Dropbox
- Obsidian

## 4. Shell Configuration

Setup zsh, ohmyzsh, nerdfonts, starship

```bash
# Install fonts to ~/.local/share/fonts/
```

## 5. Development Tools

```bash
# PHP 8.2 installation via PPA
sudo add-apt-repository ppa:ondrej/php
sudo apt install php8.2

# Composer setup with PATH configuration
```

## 6. Web Development

Install valet linux plus for local development environment.

## 7. Node.js & Version Management

```bash
curl -L https://bit.ly/n-install | bash
```

## 8. SSH Configuration

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/*
```

## 9. Editors

- VS Code installation via dpkg
- Optional: Sublime Text, Publii

## 10. Utilities

Screenshot and recording tools:
- Flameshot
- SimpleScreenRecorder
