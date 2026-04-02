---
title: "2025 Dev Setup - Revised"
description: "Debian 13 with KDE Plasma 6 Install base distro Download and install distro iso Download…"
date: "Aug 10 2025"
---

# Debian 13 with KDE Plasma 6

## Install base distro

### Download and install distro iso

Download Debian 13 minimal ISO

[https://cdimage.debian.org/debian-cd/current/amd64/iso-cd/debian-13.0.0-amd64-netinst.iso](https://cdimage.debian.org/debian-cd/current/amd64/iso-cd/debian-13.0.0-amd64-netinst.iso)

Install Guide

[https://www.linuxtechi.com/how-to-install-debian-12-step-by-step/](https://www.linuxtechi.com/how-to-install-debian-12-step-by-step/)

### Update packages

Fix sudo command not found

[https://linuxways.net/debian/fix-sudo-command-not-found-debian-12/](https://linuxways.net/debian/fix-sudo-command-not-found-debian-12/)

Switch to root user

```
su -

```

Install sudo

```
apt install sudo -y

```

Add standard user to sudoer

```
sudo usermod -aG sudo USERNAME_HERE

```

Update sources to avoid Myanmar ISP restrictions and for Nvidia drivers

[https://fostips.com/change-source-mirror-debian-12/](https://fostips.com/change-source-mirror-debian-12/)

[https://cdn-aws.deb.debian.org/](https://cdn-aws.deb.debian.org/)

Backup /etc/apt/sources.list

```
sudo cp /etc/apt/sources.list /etc/apt/sources.list.backup

```

Edit /etc/apt/sources.list

```
#deb cdrom:[Debian GNU/Linux 13.0.0 _Trixie_ - Official amd64 NETINST with firmware 20250809-11:20]/ trixie contrib main non-free-firmware

#deb http://mirrors.cloudforest.co.th/debian/ trixie main contrib non-free non-free-firmware
#deb-src http://mirrors.cloudforest.co.th/debian/ trixie main contrib non-free non-free-firmware
deb http://cdn-aws.deb.debian.org/debian/ trixie main contrib non-free non-free-firmware
deb-src http://cdn-aws.deb.debian.org/debian/ trixie main contrib non-free non-free-firmware

#deb http://security.debian.org/debian-security trixie-security main non-free-firmware
#deb-src http://security.debian.org/debian-security trixie-security main non-free-firmware
deb http://cdn-aws.deb.debian.org/debian-security trixie-security main contrib non-free non-free-firmware
deb-src http://cdn-aws.deb.debian.org/debian-security trixie-security main contrib non-free non-free-firmware

# trixie-updates, to get updates before a point release is made;
# see https://www.debian.org/doc/manuals/debian-reference/ch02.en.html#_updates_and_backports
deb http://cdn-aws.deb.debian.org/debian/ trixie-updates main contrib non-free non-free-firmware
deb-src http://cdn-aws.deb.debian.org/debian/ trixie-updates main contrib non-free non-free-firmware

# This system was installed using removable media other than
# CD/DVD/BD (e.g. USB stick, SD card, ISO image file).
# The matching "deb cdrom" entries were disabled at the end
# of the installation process.
# For information about how to configure apt package sources,
# see the sources.list(5) manual.

```

Update, upgrade and obtain kernel headers

```
sudo apt update

sudo apt upgrade

sudo apt install linux-headers-amd64

sudo reboot now

```

Incase of broken or missing package install

```
sudo apt --fix-broken install

sudo apt update --fix-missing

```

## Install drivers and KDE

### Install Nvidia drivers

[https://wiki.debian.org/NvidiaGraphicsDrivers#Debian_Testing_.22Trixie.22](https://wiki.debian.org/NvidiaGraphicsDrivers#Debian_Testing_.22Trixie.22)

[https://neuronvm.com/docs/install-nvidia-drivers-on-debian/](https://neuronvm.com/docs/install-nvidia-drivers-on-debian/)

```
sudo apt install nvidia-kernel-dkms nvidia-driver firmware-misc-nonfree

sudo reboot now

```

### Install KDE Plasma

[https://wiki.debian.org/KDE#Installation](https://wiki.debian.org/KDE#Installation)

[https://www.reddit.com/r/debian/comments/1640aaq/tutorial_how_to_make_a_clean_kde_plasma_install/](https://www.reddit.com/r/debian/comments/1640aaq/tutorial_how_to_make_a_clean_kde_plasma_install/)

```
sudo apt install kde-standard

sudo reboot now

```

Fix wifi not working issue by editing `/etc/network/interfaces` file and commenting or deleting the interface used during installation

```
sudo nano /etc/network/interfaces

# The primary network interface
#allow-hotplug wlp0s20f3
#iface wlp0s20f3 inet dhcp
#       wpa-ssid WIFI_NAME
#       wpa-psk  WIFI_PASSWORD

sudo reboot now

```

## Post install

### Install VPN

Install outline vpn client

[https://support.google.com/outline/answer/15331527?hl=en](https://support.google.com/outline/answer/15331527?hl=en)

```
wget -qO- https://us-apt.pkg.dev/doc/repo-signing-key.gpg | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/gcloud-artifact-registry-us.gpg

echo "deb [arch=amd64] https://us-apt.pkg.dev/projects/jigsaw-outline-apps outline-client main" | sudo tee /etc/apt/sources.list.d/outline-client.list

sudo apt update
sudo apt install outline-client

```

### Update Firefox ESR

[https://support.mozilla.org/en-US/kb/install-firefox-linux](https://support.mozilla.org/en-US/kb/install-firefox-linux)

```
sudo install -d -m 0755 /etc/apt/keyrings

wget -q https://packages.mozilla.org/apt/repo-signing-key.gpg -O- | sudo tee /etc/apt/keyrings/packages.mozilla.org.asc > /dev/null

echo "deb [signed-by=/etc/apt/keyrings/packages.mozilla.org.asc] https://packages.mozilla.org/apt mozilla main" | sudo tee -a /etc/apt/sources.list.d/mozilla.list > /dev/null

echo '
Package: *
Pin: origin packages.mozilla.org
Pin-Priority: 1000
' | sudo tee /etc/apt/preferences.d/mozilla 

sudo apt update

sudo apt upgrade

```

### Cleanup

Connect to outline vpn (KDE app store Discover needs VPN)

Go to Discover > Installed

Remove unused apps like KMail, KWrite etc

Go to Discover > System Settings

Install Yakuake

Go to Multimedia > Video Player

Install VLC

### Skip grub loader screen

```
sudo nano /etc/default/grub

GRUB_TIMEOUT=0

sudo update-grub

sudo reboot now

```

## Development env setup

### Install PHP

[https://php.watch/articles/install-php82-ubuntu-debian](https://php.watch/articles/install-php82-ubuntu-debian)

```
sudo apt install curl libnss3-tools jq xsel openssl ca-certificates

sudo apt install apt-transport-https lsb-release ca-certificates wget -y

sudo wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg 

sudo sh -c 'echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/php.list'

sudo apt update

sudo apt install php8.2 php8.2-cli php8.2-curl php8.2-gd php8.2-mbstring php8.2-posix php8.2-xml php8.2-zip

sudo apt install php8.2-fpm

sudo a2enconf php8.2-fpm

# Uninstall apache2 (optional)
sudo apt remove --purge apache2* libapache*

# Change PHP version
sudo update-alternatives --config php

# Uninstall PHP version
sudo apt purge php8.X*

```

### Install composer

```
curl -sS https://getcomposer.org/installer -o /tmp/composer-setup.php

sudo php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer

sudo nano .bashrc
# add at end of file
export PATH="$PATH:$HOME/.config/composer/vendor/bin"

sudo reboot now

```

Fix curl error 28 connection time out issue or use VPN

[https://github.com/composer/composer/issues/7503#issuecomment-458173411](https://github.com/composer/composer/issues/7503#issuecomment-458173411)

```
composer config -g repo.packagist composer https://repo.packagist.org

```

### Install valet

```
composer global require genesisweb/valet-linux-plus

cd

mkdir .valet

valet install

valet install --mariadb -vvv

sudo reboot now

```

#### Fix [DomainException] Unable to determine service name.

[https://github.com/valet-linux-plus/valet-linux-plus/issues/137](https://github.com/valet-linux-plus/valet-linux-plus/issues/137)

```
sudo apt install systemd-resolved

valet install --mariadb -vvv

```

#### Fix [DomainException] Apt was unable to install [redis-server].

```
sudo apt update --fix-missing

valet install --mariadb -vvv

```

#### Fix sites not working aka service unknown error

[https://github.com/valet-linux-plus/valet-linux-plus/issues/130#issuecomment-2715924576](https://github.com/valet-linux-plus/valet-linux-plus/issues/130#issuecomment-2715924576)

```
# Disable systemctl-resolved
sudo systemctl stop systemd-resolved 
sudo systemctl disable systemd-resolved

# Remove /etc/resolv.conf symlink
sudo rm /etc/resolv.conf

# Manually create /etc/resolv.conf
echo "nameserver 127.0.0.1" | sudo tee /etc/resolv.conf

# Restart dnsmasq
sudo systemctl restart dnsmasq
sudo systemctl enable  dnsmasq

# test
ping phpinfo.test

```

#### Fix Valet nginx fails error

[https://github.com/valet-linux-plus/valet-linux-plus/issues/152](https://github.com/valet-linux-plus/valet-linux-plus/issues/152)

```
sudo nano ~/.config/valet/Nginx/mails.test

# listen 443 ssl;
# http2 on;

listen 443 ssl http2;

```

### Install nodejs

Install n

```
curl -L https://bit.ly/n-install | bash

# or

curl -L https://raw.githubusercontent.com/mklement0/n-install/stable/bin/n-install | bash

# or

git clone https://github.com/mklement0/n-install.git
cd n-install/bin
bash n-install

sudo reboot now

```

### Test

```
php -v
node -v
npm -v

mkdir phpinfo
cd phpinfo
echo "<?php phpinfo();" >> index.php
valet link
ping phpinfo.test
# or visit phpinfo.test in browser

```

#### Fix service not found when visiting sites

Change network setting by defining DNS servers

System Settings > Wi-Fi & Internet > Wi-Fi & Networking > Select connection > Select IPv4

Method : Automatic (Only addresses)

Servesr: 8.8.8.8,1.1.1.1

Apply

Restart

## Essential apps and customization

### Essential apps

VS Code

[https://code.visualstudio.com/docs/?dv=linux64_deb](https://code.visualstudio.com/docs/?dv=linux64_deb)

Download deb file

```
sudo dpkg -i vscode.deb

```

Obsidian

[https://obsidian.md/download](https://obsidian.md/download)

Use remotely sync to sync notes on dropbox

Publii

[https://getpublii.com/docs/install-publii.html](https://getpublii.com/docs/install-publii.html)

Dropbox

Download deb

[https://www.dropbox.com/download?dl=packages/ubuntu/dropbox_2025.05.20_amd64.deb](https://www.dropbox.com/download?dl=packages/ubuntu/dropbox_2025.05.20_amd64.deb)

[https://www.dropbox.com/install-linux](https://www.dropbox.com/install-linux)

[https://www.reddit.com/r/chromeos/comments/1dcvy8t/how_to_install_dropbox/](https://www.reddit.com/r/chromeos/comments/1dcvy8t/how_to_install_dropbox/)

```
cd Downloads

sudo dpkg -i dropbox_2025.05.20_amd64.deb

sudo apt install python3-gi gobject-introspection gir1.2-gtk-3.0

sudo dropbox start -i

```

### Setup ssh keys and git

[https://unix.stackexchange.com/questions/257590/ssh-key-permissions-chmod-settings](https://unix.stackexchange.com/questions/257590/ssh-key-permissions-chmod-settings)

```
chmod 700 ~/.ssh
chmod 600 ~/.ssh/*

git config --global init.defaultBranch main
git config --global user.email "email@domain.com"
git config --global user.name "name"

```

### Setup zsh, ohmyzsh and starship

Install zsh

[https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH](https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH)

[https://github.com/theborowski/pop-setup](https://github.com/theborowski/pop-setup)

```
sudo apt install zsh
zsh --version
chsh -s $(which zsh)
sudo reboot now

# When configuring the .zshrc file, choose an empty option, `ohmyzsh` will replace it.

```

Install ohmyzsh

```
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

rm .zshrc.pre-oh-my-zsh

```

Update `~/.zshrc`

```
nano ~/.zshrc

# install plugins
plugins=(git common-aliases copyfile copypath extract ssh)

# copy exports from .bashrc

source ~/.zshrc

```

[https://www.nerdfonts.com/font-downloads](https://www.nerdfonts.com/font-downloads)

copy fonts to `/.local/share/fonts/`

[https://starship.rs/guide](https://starship.rs/guide)

```
curl -sS https://starship.rs/install.sh | sh

echo 'eval "$(starship init zsh)"' >> ~/.zshrc

starship preset nerd-font-symbols -o ~/.config/starship.toml

# starship.toml file will be updated again when installing dracula theme

```

### Use dracula themes and color

[https://draculatheme.com/](https://draculatheme.com/)

```
mkdir dracula-themes
cd dracula-themes

```

konsole

```
git clone https://draculatheme.com/konsole
cp konsole/Dracula.colorscheme ~/.local/share/konsole

Konsole > Configuration > Add new profile > Color > Dracula

```

yakuake

```
git clone https://github.com/dracula/yakuake.git
cp -r yakuake ~/.local/share/yakuake/kns_skins/
cd ~/.local/share/yakuake/kns_skins
mv yakuake dracula

Yakuake > Configuration > Appearance

```

zsh

```
git clone https://github.com/dracula/zsh.git

ln -s ~/dracula-themes/zsh/dracula.zsh-theme ~/.oh-my-zsh/themes/dracula.zsh-theme

nano ~/.zshrc

# comment out current theme
#ZSH_THEME="robbyrussell"

# add following at the end
ZSH_THEME="dracula"

```

starship

Edit `~/.config/starship.toml`

[https://gist.github.com/mrlinnth/33d8dfbb0494c0e31dd4ab013a05831b](https://gist.github.com/mrlinnth/33d8dfbb0494c0e31dd4ab013a05831b)

firefox

[https://addons.mozilla.org/en-US/firefox/addon/dracula-dark-colorscheme/](https://addons.mozilla.org/en-US/firefox/addon/dracula-dark-colorscheme/)