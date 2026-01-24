---
title: "2025 Dev Setup - Revised"
description: "A comprehensive guide for setting up a development environment on Debian 13 with KDE Plasma 6."
date: "Aug 10 2025"
---

Debian 13 with KDE Plasma 6 setup guide.

## Install Base Distro

1. Download Debian 13 minimal ISO
2. Install base system

## Post-Installation

### Fix sudo and update packages

```bash
# Modify apt sources to use cdn-aws.deb.debian.org mirror
sudo apt update && sudo apt upgrade
```

### Install kernel headers

```bash
sudo apt install linux-headers-$(uname -r)
```

## Driver & Desktop Installation

### Nvidia drivers

```bash
sudo apt install nvidia-kernel-dkms nvidia-driver
```

### KDE Plasma

```bash
sudo apt install kde-standard
```

### WiFi Connectivity

Edit network interfaces if needed to resolve connectivity issues.

## Development Tools

### PHP 8.2 via Sury repository

```bash
# Add Sury repository and install PHP
sudo apt install php8.2 php8.2-cli php8.2-common php8.2-curl php8.2-mbstring php8.2-xml
```

### Composer

```bash
# Install Composer package manager
```

### Valet Laravel

Configure Valet development environment with MariaDB.

### Node.js

```bash
curl -L https://bit.ly/n-install | bash
```

## Customization

### Applications

- VS Code
- Obsidian
- Publii
- Dropbox

### Shell Setup

```bash
# Install Zsh with Oh-My-Zsh
# Install Starship prompt
# Install Nerd Fonts
```

### Dracula Theme

Apply across:
- Konsole
- Yakuake
- Zsh
- Starship
- Firefox

## Troubleshooting

The guide includes solutions for common setup challenges like DNS and service resolution issues.
