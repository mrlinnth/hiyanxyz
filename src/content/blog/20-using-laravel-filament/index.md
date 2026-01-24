---
title: "Using Laravel Filament"
description: "A comprehensive guide to Laravel Filament, a TALL stack admin panel builder."
date: "Sep 29 2022"
---

If you just wish to learn about Filament, please read their documentation and check their demo. This guide documents my implementation experience.

## Overview

Laravel Filament is a TALL stack admin panel builder. It's open-source and free, with good documentation and community support.

## Step 1 - First CRUD

Establishes a superhero database project with heroes, skills, and teams.

### Key Topics Covered
- Generating models, migrations, and Filament resources
- Three approaches: default, simple, generate
- Form fields and table columns
- File uploads via Spatie Media Library
- One-to-many relationships
- Many-to-many relationships
- Relation managers
- Custom view pages

## Step 2 - Roles & Permissions

Integrates authentication and authorization.

### Filament Plugins Used
- Shield
- Breezy
- Environment Indicator
- Impersonate

### Additional Features
- Spatie's permission package
- Settings management
- Filtering and sorting functionality

## Step 3 - JSON API

Develops RESTful API endpoints.

### Implementation
- Laravel JSON API package
- Proper schema definitions
- Authorization policies

## Repository

Check out the example project on GitHub for reference code.
