---
title: "2025 Development Setup"
description: "OS (POP) cleanup and update sudo apt remove -purge libreoffice* sudo apt autoremove sudo apt…"
date: "Aug 02 2025"
---

## OS (POP)

1. cleanup and update
- sudo apt remove -purge libreoffice*
- sudo apt autoremove
- sudo apt update && sudo apt upgrade
2. create timeshift backup
- `sudo apt install timeshift`
3. install/setup firefox
- sync firefox account
- log in bitwarden
- log in raindrop
4. install telegram
- [Telegram Desktop](https://desktop.telegram.org/)
5. install AppImageLauncher
- [Release Release build (v2.2.0) · TheAssassin/AppImageLauncher · GitHub](https://github.com/TheAssassin/AppImageLauncher/releases/tag/v2.2.0)
6. install outline client
- [Installing Outline Client on Linux - Outline Help by Jigsaw](https://support.google.com/outline/answer/15331527?hl=en)
- `wget -O ./outline-client.deb https://s3.amazonaws.com/outline-      releases/client/linux/stable/outline-client_amd64.deb`
- `sudo apt install ./outline-client.deb`
7. create timeshift backup
8. install dropbox
- install using pop shop
- import backup config from dropbox (optional)
9. install obsidian
- [https://obsidian.md/download](https://obsidian.md/download)
10. setup zsh, ohmyzsh, nerdfonts, starship
- [Installing ZSH · ohmyzsh/ohmyzsh Wiki · GitHub](https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH)
- [GitHub - theborowski/pop-setup: a set of instructions to follow whenever setting up a new Pop!_OS installation](https://github.com/theborowski/pop-setup)
- [https://www.nerdfonts.com/font-downloads](https://www.nerdfonts.com/font-downloads)
- cp fonts to `/.local/share/fonts/`
- [https://starship.rs/guide](https://starship.rs/guide)
- `curl -sS https://starship.rs/install.sh | sh`
11. create timeshift backup
12. install php
- `sudo apt install software-properties-common`
- `sudo add-apt-repository ppa:ondrej/php`
- `sudo apt update`
- `sudo apt install php8.2 php8.2-cli php8.2-curl php8.2-mbstring php8.2-xml php8.2-zip php8.2-posix`
13. install composer
- `curl -sS https://getcomposer.org/installer -o /tmp/composer-setup.php`
- `sudo php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer`
- update .zshrc with following
- `export PATH="$PATH:$HOME/.config/composer/vendor/bin"`
14. install valet linux plus
- `sudo apt install curl libnss3-tools jq xsel openssl ca-certificates`
- `composer global require genesisweb/valet-linux-plus`
- `valet install`
- [https://github.com/valet-linux-plus/valet-linux-plus/issues/152](https://github.com/valet-linux-plus/valet-linux-plus/issues/152)
15. install n
- `curl -L https://bit.ly/n-install | bash`
16. setup ssh keys and ssh config
- `chmod 700 ~/.ssh`
- `chmod 600 ~/.ssh/*`
- [https://unix.stackexchange.com/questions/257590/ssh-key-permissions-chmod-settings](https://unix.stackexchange.com/questions/257590/ssh-key-permissions-chmod-settings)
17. install vscode
- [Documentation for Visual Studio Code](https://code.visualstudio.com/docs/?dv=linux64_deb)
- use terminal to install `sudo dpkg -i vscode.deb`
18. install utilities apps
- install restricted codec
- `sudo apt install flameshot`
- `sudo apt install peek` (out of date)
- `flatpak install flathub io.github.seadve.Kooha` (have issues)
- [https://github.com/diodon-dev/diodon](https://github.com/diodon-dev/diodon)
- [https://github.com/henrywoo/kazam](https://github.com/henrywoo/kazam) (need pip/python)
- install simplescreenrecorder
19. install publii (optional)
- [https://getpublii.com/docs/install-publii.html](https://getpublii.com/docs/install-publii.html)
20. install sublime text (optional)
- `wget -qO - https://download.sublimetext.com/sublimehq-pub.gpg | sudo tee /etc/apt/keyrings/sublimehq-pub.asc > /dev/null`
- `echo -e 'Types: deb\nURIs: https://download.sublimetext.com/\nSuites: apt/stable/\nSigned-By: /etc/apt/keyrings/sublimehq-pub.asc' | sudo tee /etc/apt/sources.list.d/sublime-text.sources`
- `sudo apt update && sudo apt install sublime-text`
- [https://www.sublimetext.com/docs/linux_repositories.html](https://www.sublimetext.com/docs/linux_repositories.html)