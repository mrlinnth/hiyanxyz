---
date: 2026-03-31
title: E-commerce Client Questionnaire
description: What to Ask Before Scoping a Project
tags: guide, project-manager, sale
---
Before you can estimate timeline, budget, or recommend a solution for an e-commerce project, you need to understand what the client actually needs. This questionnaire helps you gather the right information during initial client conversations.



## Why This Matters



E-commerce projects fail or go over budget when requirements are unclear upfront. A client saying "I want an online store" tells you almost nothing. The difference between a simple catalog with payment integration and a multi-vendor marketplace with custom pricing rules is enormous in scope.



This questionnaire helps you:

- Understand the client's business model before discussing technology

- Identify complexity early so you can set realistic expectations

- Spot red flags that indicate the client isn't ready for e-commerce

- Gather enough detail for developers to estimate accurately



---



## 1. Business Overview



Start broad. Understand the business before diving into features.



| Question | Why It Matters |

|----------|----------------|

| What does your business sell? | Physical products, digital goods, and services have very different requirements. |

| Who are your customers? (B2C, B2B, or both) | B2B often requires account-based pricing, bulk orders, and approval workflows. |

| Are you currently selling online elsewhere? | Existing stores mean data migration and potential platform comparison expectations. |

| What problem are you trying to solve with this e-commerce site? | Reveals true goals vs. assumed features. |

| Who are your main competitors online? | Helps understand market expectations and feature benchmarks. |



### Red Flags to Watch For

- Client cannot clearly describe their target customer

- Goals are vague ("I just want to sell online")

- Competitor examples are massive platforms like Amazon or Alibaba (unrealistic expectations)



---



## 2. Product Catalog



The size and complexity of the catalog significantly affects scope.



| Question | Why It Matters |

|----------|----------------|

| How many products do you have? | 50 products vs. 5,000 products = very different data entry and management needs. |

| Do products have variations? (size, color, material) | Variant handling adds complexity to catalog structure. |

| How often do you add or update products? | Determines how important the admin interface usability is. |

| Do you have existing product data? (spreadsheets, another system) | Affects data migration scope. |

| Do products require custom attributes? (e.g., technical specs, certifications) | Custom fields require flexible catalog architecture. |

| Will you sell digital products or downloads? | Requires different delivery mechanism than physical goods. |



### Red Flags to Watch For

- "We have thousands of products but no organized data"

- Constantly changing catalog with no internal process for updates

- Complex product configurations that require a product builder/configurator



---



## 3. Pricing and Discounts



Pricing logic can be simple or extremely complex. Clarify early.



| Question | Why It Matters |

|----------|----------------|

| Is pricing the same for all customers? | Customer-specific pricing (B2B) adds significant complexity. |

| Do you offer volume/tiered pricing? | Buy 10 get 15% off requires pricing rules engine. |

| What types of discounts do you need? (coupons, promotions, bundles) | Each discount type is a feature to implement. |

| Do prices change frequently? | May need integration with external pricing system. |

| Do you need multi-currency support? | Adds currency conversion and display logic. |

| Are there tax considerations? (multiple rates, tax-exempt customers) | Tax calculation can be complex depending on regions served. |



### Red Flags to Watch For

- "Pricing depends on the customer relationship" with no clear rules

- Complex discount stacking requirements

- Requirement to match pricing from an ERP system in real-time



---



## 4. Orders and Checkout



How customers complete purchases affects both UX and backend complexity.



| Question | Why It Matters |

|----------|----------------|

| Do customers need to create an account to purchase? | Guest checkout vs. mandatory registration. |

| What information do you need to collect at checkout? | Custom fields, business details for B2B, etc. |

| Do you need order approval workflows? | Common in B2B where managers approve purchases. |

| Will you accept pre-orders or backorders? | Requires inventory status handling beyond simple stock count. |

| Do customers need to request quotes instead of direct purchase? | Quote-to-order workflow is different from standard checkout. |

| Do you need recurring orders or subscriptions? | Subscription commerce requires recurring billing and management. |



### Red Flags to Watch For

- Multi-step approval processes with complex business rules

- Mixed checkout flows (some products quote-based, others direct purchase)

- Subscription requirements added late in the project



---



## 5. Payment



Payment handling has both technical and business implications.



| Question | Why It Matters |

|----------|----------------|

| What payment methods do you need? (credit card, bank transfer, COD, mobile payment) | Each payment method requires integration. |

| Do you have existing payment provider relationships? | May need to integrate with specific providers. |

| Do you need to support installment payments or buy-now-pay-later? | Additional payment provider integrations. |

| For B2B: Do you offer credit terms or invoicing? | Payment on account requires credit management features. |

| What currencies do you need to accept? | Multi-currency payment processing. |



### Red Flags to Watch For

- Requirement for obscure or regional payment providers with poor API documentation

- Complex credit terms with varying rules per customer

- Client expects payment integration to be "simple" regardless of provider



---



## 6. Shipping and Fulfillment



Logistics requirements vary widely and affect both customer experience and operations.



| Question | Why It Matters |

|----------|----------------|

| Where do you ship to? (local, national, international) | Affects shipping zone setup and carrier integrations. |

| Do you use specific shipping carriers? | May require carrier-specific API integrations. |

| How do you calculate shipping costs? (flat rate, weight-based, real-time carrier rates) | Real-time rates require carrier API integration. |

| Do you have multiple warehouses or fulfillment locations? | Multi-location inventory is significantly more complex. |

| Do you offer in-store pickup or local delivery? | Additional fulfillment options to implement. |

| Do you dropship any products? | Dropship orders may route to different suppliers. |



### Red Flags to Watch For

- Multiple warehouses with complex inventory allocation rules

- Requirement for real-time rates from carriers with poor API support

- Mixed fulfillment (some items shipped, some pickup, some dropship) in single orders



---



## 7. Integrations



E-commerce rarely exists in isolation. Understand the systems ecosystem.



| Question | Why It Matters |

|----------|----------------|

| Do you use accounting software? (QuickBooks, Xero, etc.) | Order and financial data sync requirements. |

| Do you have an ERP or inventory management system? | Often the most complex integration requirement. |

| Do you use a CRM? | Customer data sync between systems. |

| Do you need integration with marketplaces? (Lazada, Shopee, etc.) | Multi-channel selling adds inventory and order sync complexity. |

| Are there any other systems that need to connect? | Reveals hidden integration scope. |



### Red Flags to Watch For

- "We need real-time sync with our ERP" (often more complex than expected)

- Client assumes integrations are plug-and-play

- Legacy systems with no API or documentation



---



## 8. Content and Marketing



Beyond transactions, e-commerce sites need content capabilities.



| Question | Why It Matters |

|----------|----------------|

| Do you need a blog or content pages? | CMS requirements alongside e-commerce. |

| What SEO requirements do you have? | May need specific URL structures, metadata management. |

| Do you need email marketing integration? | Newsletter signups, abandoned cart emails, etc. |

| Will you run promotions that need landing pages? | Campaign-specific page creation needs. |

| Do you need multi-language support? | Internationalization adds significant complexity. |



### Red Flags to Watch For

- Expectation of "full CMS capabilities" without defining what that means

- Multi-language requirement mentioned casually (it's not simple)

- Complex SEO requirements for a site that doesn't exist yet



---



## 9. Users and Permissions



Who will manage the store and what can they do?



| Question | Why It Matters |

|----------|----------------|

| How many people will manage the store? | Determines admin user management needs. |

| Do different staff need different permissions? | Role-based access control requirements. |

| Will external parties need access? (suppliers, fulfillment partners) | May need separate portals or limited access roles. |



---



## 10. Timeline and Budget



Critical for setting expectations.



| Question | Why It Matters |

|----------|----------------|

| Do you have a target launch date? Why that date? | Understanding the "why" reveals flexibility. |

| Is there an event or season driving the timeline? | Hard deadlines vs. soft preferences. |

| What is your budget range for this project? | Helps determine if expectations are realistic. |

| Have you built e-commerce sites before? | First-timers often underestimate complexity. |



### Red Flags to Watch For

- Unrealistic timeline for the scope described

- Budget that doesn't match the feature list

- "We need it live before [major holiday]" with insufficient lead time



---



## 11. Post-Launch Considerations



Think beyond the initial build.



| Question | Why It Matters |

|----------|----------------|

| Who will handle day-to-day operations? | Affects training and documentation needs. |

| Do you have technical staff for maintenance? | Self-hosted solutions require ongoing technical management. |

| What does growth look like? (traffic, products, transactions) | Scalability planning. |

| What support level do you expect after launch? | Sets service expectations. |



---



## Summary: The Questions That Matter Most



If you only have 10 minutes with a client, focus on these:



1. What does your business sell and to whom?

2. How many products, and do they have variations?

3. What payment methods do you need?

4. Where do you ship and how?

5. What existing systems need to connect?

6. What is your timeline and budget?



The answers to these six areas will tell you whether this is a straightforward project or something that requires deeper discovery.



---



## When to Recommend Against Self-Hosted E-commerce



Not every client needs a custom self-hosted solution. Based on the questionnaire answers, consider recommending simpler alternatives (like hosted platforms) when:



- Product catalog is small and simple (under 100 products, no variants)

- No custom pricing or complex discount requirements

- No integration requirements beyond basic payment

- Limited budget and timeline

- No technical staff available for ongoing maintenance

- Client's primary need is "just start selling quickly"



Self-hosted solutions like Aimeos make sense when clients need:

- Complex catalog structures or product configurations

- Custom pricing logic (B2B, tiered, customer-specific)

- Deep integrations with existing business systems

- Full control over the platform and data

- Customizations that hosted platforms cannot accommodate



Being honest about fit builds trust and avoids projects that frustrate both sides.