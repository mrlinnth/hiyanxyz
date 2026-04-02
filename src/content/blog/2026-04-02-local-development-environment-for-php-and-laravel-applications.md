---
date: 2026-03-10
title: "Local development environment for php and laravel applications "
description: This guide will walk you through setting up a professional local
  development environment for PHP and Laravel projects.
tags: guide, developer, php, laravel, backend
---
## Introduction



You've probably experienced this: your code works perfectly on your machine, but when a teammate tries to run it, nothing works. Or worse, you push to staging and suddenly features break that worked fine locally. This is the classic "works on my machine" problem, and it's one of the most frustrating issues for development teams.



A proper local development environment isn't just about getting your code to run—it's about consistency, efficiency, and avoiding hours of debugging environment-specific issues. When everyone on the team has a similar setup that handles multiple PHP versions, SSL certificates, and custom domains properly, you spend less time fighting with configuration and more time writing code.



This guide will walk you through setting up a professional local development environment for PHP and Laravel projects. You'll learn which tools to use for your operating system, how to avoid common pitfalls, and how to organize your projects for long-term maintainability.



## Recommended Tools by Operating System



Let's get straight to the point. Here are the recommended tools based on your operating system:



- **Windows**: Laragon

- **Mac**: Herd (if you prefer GUI) or Valet (if you prefer CLI)

- **Linux**: Valet Linux Plus



### Why These Tools Over Alternatives?



You might be wondering why not use Docker (Laravel Sail) or native setups like XAMPP/WAMP/MAMP. Here's the reasoning:



**Docker** is powerful but overkill for most Laravel projects. It has a steep learning curve for beginners, slower file system performance (especially on Mac and Windows), and adds complexity with containers, volumes, and networking. Unless you need specific system dependencies or are deploying to containerized production, Docker adds more problems than it solves for standard Laravel development.



**Native tools** (XAMPP, WAMP, MAMP) were the go-to solution years ago, but they're clunky by modern standards. Switching PHP versions requires manual configuration, setting up SSL is a hassle, and managing custom domains means editing hosts files. They work, but they're inefficient.



**The recommended tools** provide the best balance. They're lightweight, easy to use, handle PHP version switching automatically per project, support SSL with one command, and give you custom .test domains without manual configuration. They solve real problems without adding unnecessary complexity.



### What These Tools Provide



All of the recommended tools share these key features:



- Automatic PHP version switching per project

- SSL support out of the box

- Custom domains (.test or .local) instead of localhost:8000

- Built-in database servers (MySQL/PostgreSQL)

- Minimal resource usage

- Easy setup and maintenance



## Common Problems These Tools Solve



### Problem 1: Messy Project Organization



Projects end up scattered across Downloads, Desktop, and random folders. You can't find that project you worked on two months ago, and there's no clear separation between client work, personal projects, and learning experiments.



Without a consistent directory structure, onboarding new developers takes longer, and everyone develops their own chaotic system. The recommended tools work with any directory structure, but they make it easy to establish patterns using features like "park" directories where all projects automatically get domains.



### Problem 2: Multiple PHP Versions



Project A was built with PHP 8.1, Project B requires PHP 8.3, and that old client project is stuck on PHP 7.4. With native setups, switching PHP versions means stopping services, changing system paths, and hoping nothing breaks. Miss one configuration file and you're debugging for an hour.



The recommended tools handle this automatically. Each project can have its own PHP version, and switching happens instantly when you navigate directories. No manual configuration, no service restarts, no broken dependencies.



### Problem 3: SSL for Local Testing



Many features require HTTPS even in development:



- **OAuth integrations**: Facebook Login, Google Sign-In, and most social authentication providers require HTTPS callbacks

- **Payment gateways**: Stripe, PayPal, and other payment processors need secure connections for webhooks

- **PWA development**: Service Workers only work on HTTPS

- **Third-party APIs**: Many APIs enforce HTTPS even for development endpoints



Setting up SSL certificates manually is tedious. You need to generate certificates, configure your web server, and convince your browser to trust them. The recommended tools do this with one command.



### Problem 4: Custom Domains Instead of Localhost



Using localhost:8000, localhost:8001, localhost:8002 gets confusing fast. Which port was the invoicing app? Which one was the client dashboard? You end up maintaining a mental map or a text file of port numbers.



Some features don't work properly on localhost—session cookies, CORS policies, and subdomain routing all behave differently. Custom domains like invoicing.test or client-dashboard.test are clearer and behave more like production environments.



## Tool Setup Guides



### Laragon for Windows



**What is Laragon**: Laragon is a lightweight, portable development environment for Windows. It includes PHP, MySQL, Apache/Nginx, and automatically creates virtual hosts for your projects. You can even run it from a USB drive.



**Installation**:

```bash

# Download from official site

https://laragon.org/download/



# Choose Full or Lite version

# Full includes more tools, Lite is minimal

```



Run the installer and follow the prompts. Official documentation: https://laragon.org/docs/



**Key Features**:

- Automatic virtual hosts: Every project gets a .test domain automatically

- Quick PHP version switching via right-click menu

- Built-in SSL support

- One-click Laravel project creation

- Portable installation option



**Project Organization with Laragon**:

```

C:\laragon\www\

├── php\              # Non-Laravel PHP projects

├── laravel\          # Laravel projects

├── html\             # Static HTML/CSS sites

└── others\           # Experiments and learning projects

```



All projects in `www` automatically get domains. A project at `C:\laragon\www\laravel\invoicing-app` becomes `invoicing-app.test`.



**Managing PHP Versions**:

- Right-click Laragon tray icon → PHP → Select version

- For per-project PHP versions, see the official documentation on PHP switching



**Setting Up SSL**:

- Right-click your project in Laragon

- Select SSL → Create/Enable

- Browser may warn about self-signed certificate—add exception



**Common Issues**:

- Windows Defender or antivirus blocking: Add Laragon directory to exclusions

- Port conflicts: Check if Skype, IIS, or other services are using port 80/443

- Path length limits: Keep project names short on Windows



### Herd for Mac



**What is Herd**: Herd is a modern Laravel development environment created by the Laravel team. It's a native Mac application with a GUI that makes managing sites, PHP versions, and databases simple.



**Installation**:

```bash

# Download from official site

https://herd.laravel.com/



# Install like any Mac application (.dmg file)

```



Official documentation: https://herd.laravel.com/docs



**Key Features**:

- Native Mac app with clean GUI

- Visual site management

- Built-in database UI

- One-click PHP version switching

- One-click SSL per site



**Project Setup**:

- Open Herd preferences

- Add a "parked" directory (e.g., ~/Sites)

- All projects in parked directories automatically get .test domains



**When to Choose Herd**:

- You prefer GUI over terminal commands

- You want official Laravel tooling

- You need a visual overview of all sites

- You're new to Mac development



**Quick Tips**:

- Use the Herd menu bar icon to quickly access sites

- Switch PHP versions per site in the GUI

- Enable SSL per site with a toggle

- Built-in database manager replaces phpMyAdmin



### Valet for Mac and Linux



**What is Valet**: Valet is a minimalist Laravel environment for Mac and Linux. It's CLI-based, lightweight, and doesn't use virtual machines or Docker. Everything runs natively on your system.



**Installation (Mac)**:

```bash

# Install PHP via Homebrew

brew install php



# Install Valet via Composer

composer global require laravel/valet



# Install Valet

valet install

```



Official documentation: https://laravel.com/docs/valet



**Installation (Linux - Valet Linux Plus)**:



Valet Linux Plus is a community fork that adds better Linux support with multiple PHP versions, database management, and more features.



```bash

# Install via Composer

composer global require genesisweb/valet-linux-plus



# Install Valet

valet install

```



Official documentation: https://github.com/genesisweb/valet-linux-plus



**Project Organization Approach**:



Here's a practical directory structure that separates business files from code:



```bash

/home/user/work/          # Business files

├── client-a/

│   ├── proposals/

│   ├── contracts/

│   └── backups/

└── client-b/



/home/user/www/           # Development projects

├── php/                  # Non-Laravel PHP projects

├── laravel/              # Laravel projects

├── html/                 # Static sites

├── react/                # React projects

├── reactnative/          # React Native projects

├── go/                   # Go projects

└── others/               # Learning & experiments

```



**Using valet park vs valet link**:



```bash

# Park entire directories for automatic domains

cd ~/www/php && valet park

cd ~/www/laravel && valet park

cd ~/www/html && valet park



# Now any project in these directories gets a .test domain

# ~/www/laravel/invoicing-app becomes invoicing-app.test



# Link specific projects outside parked directories

cd ~/projects/special-client && valet link client-name

# Access at client-name.test

```



**PHP Version Management**:



```bash

# Switch PHP globally

valet use php@8.3



# Isolate PHP version for specific project

cd ~/www/laravel/old-project

valet isolate php@7.4



# Now this project uses PHP 7.4, others use global version

```



**SSL Setup**:



```bash

# Secure specific site

cd ~/www/laravel/my-project

valet secure



# Access at https://my-project.test



# Remove SSL

valet unsecure

```



**When to Choose Valet Over Herd**:

- You prefer terminal/CLI workflows

- You want minimal resource usage

- You need Linux support

- You want more control and scriptability

- You're comfortable with command-line tools



## Quick Comparison Matrix



| Feature | Laragon (Win) | Herd (Mac) | Valet (Mac/Linux) | Docker (Sail) | Native (XAMPP) |

|---------|---------------|------------|-------------------|---------------|----------------|

| Setup Difficulty | Easy | Very Easy | Moderate | Hard | Easy |

| PHP Version Switching | GUI | GUI | CLI | Per Project | Manual |

| SSL Support | Built-in | Built-in | One Command | Manual Config | Manual Setup |

| Custom Domains | Automatic | Automatic | Automatic | Manual | Manual Hosts File |

| Performance | Fast | Fast | Fast | Slower | Fast |

| Resource Usage | Light | Light | Minimal | Heavy | Light |

| Interface | GUI | GUI | CLI | CLI | GUI |

| Learning Curve | Low | Very Low | Low-Medium | High | Low |

| Best For | Windows users | Mac (GUI preference) | Mac/Linux (CLI preference) | Complex setups | Beginners only |



**Notes on Docker**: Docker appears "Hard" and "Heavy" because it requires understanding containers, volumes, and networking. File system performance is noticeably slower on Mac and Windows due to how Docker handles volume mounts. It's powerful but adds complexity that most Laravel projects don't need.



**Notes on Native Tools**: XAMPP/WAMP work but are difficult for team collaboration because every developer must manually replicate the setup. There's no project-level configuration to ensure consistency.



All recommended tools (Laragon, Herd, Valet) support team collaboration through project-level configuration files that can be committed to version control.



## When to Use Docker Instead



Docker (Laravel Sail) is not the default recommendation for most Laravel projects, but there are specific scenarios where it makes sense:



**Use Docker when you need**:

- Specific system dependencies like ElasticSearch, Redis Cluster, or RabbitMQ

- Identical environments across team members using different operating systems

- Container-based deployment to production (Kubernetes, ECS, Fargate)

- Complex microservices architecture with multiple interconnected services



**Why Docker isn't recommended for beginners**:

- Steeper learning curve with new concepts (containers, images, volumes)

- Slower file system performance, especially on Mac and Windows

- More moving parts to debug when something goes wrong

- Overkill for standard CRUD Laravel applications



If your project needs Docker, Laravel Sail is the easiest way to get started. But for most projects, start with the recommended tools for your operating system and graduate to Docker only when you have a specific requirement that demands it.



## Best Practices for Local Development



### Project Directory Structure



Separate your business files from your code. This prevents confusion between project documentation, proposals, and the actual codebase.



**Example structure**:

```

/home/user/work/           # Business and client files

├── client-name/

│   ├── proposals/

│   ├── contracts/

│   ├── designs/

│   └── backups/



/home/user/www/            # Code and development

├── php/

├── laravel/

│   ├── invoicing-app/

│   ├── client-dashboard/

│   └── legacy-project/

├── html/

├── react/

└── others/                # Experiments don't clutter main projects

```



**Why this works**: You know exactly where to find things. Business files stay separate from code. Experiments don't pollute your production project directories. New team members understand the structure immediately.



### Environment File Management



Never commit `.env` files to version control. These contain secrets, database credentials, and environment-specific configuration that shouldn't be shared.



**Best practices**:

- Commit `.env.example` with placeholder values

- Document required environment variables in README

- Use consistent database naming: `projectname_local` or `projectname_dev`

- Keep local and production `.env` files obviously different



**Example .env.example**:

```

APP_NAME="Project Name"

APP_ENV=local

APP_KEY=

APP_URL=http://projectname.test



DB_CONNECTION=mysql

DB_HOST=127.0.0.1

DB_PORT=3306

DB_DATABASE=projectname_local

DB_USERNAME=root

DB_PASSWORD=

```



### Database Management



**One database per project** is the golden rule. Don't try to reuse databases across projects—it leads to migration conflicts and accidental data loss.



**Database naming convention**: Use `projectname_local` or `projectname_dev` to make it obvious these are local databases.



**Database GUI tools**:

- **Laragon**: Built-in phpMyAdmin (accessible from menu)

- **Herd**: Built-in database UI

- **Valet**: Install phpMyAdmin, Adminer, or use cross-platform tools like DBeaver or TablePlus



**Backup important local data** before running destructive migrations. Local databases can be valuable when testing data transformations.



### Version Control Considerations



**Always commit**:

- Application code

- `.env.example` (not `.env`)

- Database migrations

- Configuration for tools (if using `valet isolate` or similar)



**Never commit**:

- `.env` (contains secrets)

- `vendor/` (regenerated by `composer install`)

- `node_modules/` (regenerated by `npm install`)

- Local database dumps (usually)

- IDE-specific config files (`.idea/`, `.vscode/` unless team-standardized)



### Practical Tips for Junior Developers



Based on common mistakes and best practices from experienced developers:



**1. Never use spaces in directory or file names**



Use `my-project` or `my_project`, never `my project`. Spaces cause problems with command-line tools, build systems, and deployment scripts. This applies to your entire project path.



**2. Document your setup immediately**



When you get a project running locally, document the steps you took while they're fresh in your mind. Future you (and your teammates) will be grateful. Include any non-obvious steps like "had to install this extension" or "needed to change this config value."



**3. Test your .env.example actually works**



After setting up a project, clone it to a different directory and follow your own instructions using only `.env.example`. If you can't get it running, neither can your teammates. Fix your documentation and `.env.example` until it works from scratch.



**4. Keep tools updated but not immediately**



Don't update Laragon/Herd/Valet the day a new version releases. Wait 1-2 weeks to let others find critical bugs. But don't let your tools get too outdated either—update every few months during downtime.



**5. Use consistent PHP versions across the team**



Document the PHP version in your project README. While the tools support per-project PHP versions, your entire team should standardize on the same version for each project to avoid "works on my machine" issues with language features or library compatibility.



**6. Create a fresh clone test before saying "it works"**



Before declaring a project "ready to share," clone it fresh and run through the setup. This catches missing dependencies, uncommitted files, and incorrect documentation. It takes 10 minutes and prevents hours of teammate frustration.



## Team Onboarding Checklist



Use this checklist when setting up a new developer's environment:



**Before starting**:

- [ ] Identify your operating system (Windows/Mac/Linux)

- [ ] Install the appropriate tool:

  - Windows: [Laragon](https://laragon.org/download/)

  - Mac: [Herd](https://herd.laravel.com/) or [Valet](https://laravel.com/docs/valet)

  - Linux: [Valet Linux Plus](https://github.com/genesisweb/valet-linux-plus)

- [ ] Set up project directory structure (`~/www/laravel`, etc.)

- [ ] Install database GUI tool if needed (DBeaver, TablePlus, etc.)



**Setting up your first project**:

- [ ] Clone project repository

- [ ] Copy `.env.example` to `.env`

- [ ] Update database credentials in `.env`

- [ ] Create database (`projectname_local`)

- [ ] Run `composer install`

- [ ] Run `npm install`

- [ ] Run `php artisan key:generate`

- [ ] Run `php artisan migrate`

- [ ] Verify site loads at `projectname.test`



**Common setup issues**:

- Site not accessible → Check parked/linked directories

- Database connection error → Verify database exists and credentials match

- PHP version mismatch → Use isolate command for project-specific version

- SSL not working → Run secure command, trust certificate in browser

- "Command not found" → Check that Composer global bin is in PATH



**Getting help**:

- Check tool's official documentation first

- Review internal team wiki or setup guide

- Ask senior developers (if documentation is unclear, update it afterward)



## Conclusion



A well-configured local development environment eliminates the "works on my machine" problem and lets you focus on building features instead of fighting with configuration. The tools recommended here—Laragon for Windows, Herd or Valet for Mac, and Valet Linux Plus for Linux—solve real problems: multiple PHP versions, SSL requirements, custom domains, and messy project organization.



Start with the recommended tool for your operating system. Follow the project organization patterns. Keep your environment files clean and documented. These practices compound over time into dramatically improved productivity.



Save complex setups like Docker for when you actually need them. Most Laravel applications work perfectly with these simpler tools, and you'll spend more time coding and less time debugging environment issues.



**Official Documentation**:

- [Laragon](https://laragon.org/docs/)

- [Laravel Herd](https://herd.laravel.com/docs)

- [Laravel Valet](https://laravel.com/docs/valet)

- [Valet Linux Plus](https://github.com/genesisweb/valet-linux-plus)