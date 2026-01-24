---
title: "mm-regions-cities package"
description: "ဒီတစ်ပတ်က mrlinnth/mm-regions-cities package တစ်ခုပဲ ကောင်းကောင်းလုပ်ဖြစ်တယ်ပြောရမယ်။"
date: "Apr 17 2020"
---

ဒီတစ်ပတ်က mrlinnth/mm-regions-cities package တစ်ခုပဲ ကောင်းကောင်းလုပ်ဖြစ်တယ်ပြောရမယ်။ တစ်ခြားအလုပ်တွေက ဟိုထိ ဒီထိလောက်ပဲ။

## Myanmar's Administrative Structure

Myanmar has a hierarchical administrative structure:
- Regions/States contain Districts
- Districts contain Townships
- Townships contain Wards or Village Groups

## The Challenge

When developers create address forms, Myanmar's administrative structure differs from other countries. It uses **state → district → township** rather than **state → city**. This creates confusion for both users and programmers.

## The Package

The purpose of the [mm-regions-cities](https://github.com/mrlinnth/mm-regions-cities) package is to provide support for address forms where:
- Selecting Myanmar as a country displays relevant states/regions
- Selecting a state/region displays corresponding districts, cities, or townships

## Version 0.1.0

The initial version includes only state/region and city data via REST API.

### Future Plans
- Expand to include districts and townships
- Develop Vue.js components

Data is available in Excel (CSV) and JSON formats.
