---
date: 2026-04-04
title: "RESTful API Standards for Laravel Applications"
description: "Principles and practical patterns for building consistent, professional APIs in Laravel."
tags: guide, developer, php, laravel, backend
---

## Table of Contents

1. [Introduction](#introduction)
2. [REST Principles: The Foundation](#rest-principles-the-foundation)
   - [Resources, Not Actions](#resources-not-actions)
   - [Statelessness](#statelessness)
   - [HTTP Methods and When to Use Them](#http-methods-and-when-to-use-them)
   - [PUT vs PATCH in Practice](#put-vs-patch-in-practice)
   - [Grey Areas: Non-CRUD Operations](#grey-areas-non-crud-operations)
   - [Resource Naming Conventions](#resource-naming-conventions)
   - [Status Codes That Matter](#status-codes-that-matter)
3. [API Design Before Coding](#api-design-before-coding)
   - [Questions to Ask First](#questions-to-ask-first)
   - [Writing Endpoints First](#writing-endpoints-first)
   - [Designing Request/Response Examples](#designing-requestresponse-examples)
   - [Why Skipping Design Causes Problems](#why-skipping-design-causes-problems)
4. [Response and Error Standards](#response-and-error-standards)
   - [Success Response Format](#success-response-format)
   - [Error Response Format](#error-response-format)
   - [Laravel's Default Validation Format](#laravels-default-validation-format)
5. [Laravel Implementation](#laravel-implementation)
   - [Route Organization and Versioning](#route-organization-and-versioning)
   - [API Resources for Consistent Responses](#api-resources-for-consistent-responses)
   - [Form Requests for Validation](#form-requests-for-validation)
   - [Consistent Error Handling](#consistent-error-handling)
6. [Authentication](#authentication)
   - [How Token Authentication Fits REST](#how-token-authentication-fits-rest)
   - [Basic Sanctum Setup](#basic-sanctum-setup)
   - [Authentication Endpoints](#authentication-endpoints)
   - [Protecting Routes](#protecting-routes)
   - [Token Abilities for Authorization](#token-abilities-for-authorization)
7. [Documentation](#documentation)
   - [Why Documentation Is Not Optional](#why-documentation-is-not-optional)
   - [Scramble for Laravel](#scramble-for-laravel)
   - [Scribe as an Alternative](#scribe-as-an-alternative)
   - [Postman Collections for Non-Laravel Projects](#postman-collections-for-non-laravel-projects)
   - [Keeping Documentation Updated](#keeping-documentation-updated)
8. [Common Mistakes Checklist](#common-mistakes-checklist)
9. [Conclusion](#conclusion)

---

## Introduction

Building APIs without standards is like writing code without a style guide. It works until someone else has to use it. Then the questions start: Why does this endpoint return `data` but that one returns `result`? Why is login a GET request? Why do some errors have codes and others just have messages?

This guide covers the principles and practical patterns for building consistent, professional APIs in Laravel. Whether you're building for a mobile app, a frontend SPA, or third-party integrations, these standards will save your team hours of confusion and your future self from painful debugging sessions.

## REST Principles: The Foundation

REST (Representational State Transfer) is not a protocol or a standard. It's an architectural style with a set of constraints. Understanding these constraints helps you make better decisions when the textbook examples don't fit your situation.

### Resources, Not Actions

REST treats everything as a resource. A resource is any concept that can be named: users, orders, products, invoices. Each resource has a unique identifier (URI) and can be represented in different formats (usually JSON for APIs).

Think in nouns, not verbs:

| Wrong (action-focused) | Right (resource-focused) |
|------------------------|--------------------------|
| `/getUser` | `/users/{id}` |
| `/createOrder` | `/orders` |
| `/updateProduct` | `/products/{id}` |
| `/deleteInvoice` | `/invoices/{id}` |

The action is determined by the HTTP method, not the URL.

### Statelessness

Each request must contain all the information needed to process it. The server does not store client session state between requests. This is why APIs use tokens instead of sessions: every request carries its own authentication.

This constraint makes APIs scalable and predictable. Any server can handle any request without needing to know what happened before.

### HTTP Methods and When to Use Them

| Method | Purpose | Idempotent | Safe | Example |
|--------|---------|------------|------|---------|
| GET | Retrieve a resource | Yes | Yes | `GET /users/1` |
| POST | Create a new resource | No | No | `POST /users` |
| PUT | Replace a resource entirely | Yes | No | `PUT /users/1` |
| PATCH | Update part of a resource | Yes | No | `PATCH /users/1` |
| DELETE | Remove a resource | Yes | No | `DELETE /users/1` |

**Idempotent** means calling it multiple times produces the same result. GET the same user 10 times, you get the same user. DELETE the same user 10 times, the user is still deleted (even if subsequent calls return 404).

**Safe** means it doesn't modify anything. GET is safe; POST is not.

### PUT vs PATCH in Practice

This distinction confuses many developers. Here's the practical difference:

**PUT** replaces the entire resource. If you PUT a user with only a name field, all other fields get cleared or set to defaults.

**PATCH** updates only the fields you send. If you PATCH a user with only a name field, everything else stays the same.

In practice, most APIs use PATCH for updates because clients rarely want to replace entire resources. Use PUT when the client genuinely wants to replace everything.

### Grey Areas: Non-CRUD Operations

REST maps cleanly to CRUD operations, but real applications have actions that don't fit neatly into create/read/update/delete.

**Actions on resources** use POST with a descriptive endpoint:

```
POST /orders/{id}/cancel
POST /users/{id}/verify-email
POST /invoices/{id}/send
```

These are still resources (order, user, invoice) with actions performed on them. The action is in the URL because POST already means "do something."

**Complex searches** that don't fit in query parameters can use POST:

```
POST /users/search
{
    "filters": {
        "roles": ["admin", "manager"],
        "created_after": "2024-01-01",
        "departments": [1, 2, 3]
    },
    "sort": "-created_at"
}
```

This violates REST purity (searches should be GET), but it's a practical solution when query strings become unwieldy. Document it clearly.

### Resource Naming Conventions

1. **Use plural nouns**: `/users`, not `/user`
2. **Use lowercase with hyphens**: `/order-items`, not `/orderItems` or `/order_items`
3. **Nest when there's a clear parent-child relationship**: `/users/{id}/orders`
4. **Keep nesting shallow**: `/users/{id}/orders` is fine; `/users/{id}/orders/{order_id}/items/{item_id}/options` is too deep. Flatten to `/order-items/{id}` when needed.

### Status Codes That Matter

You don't need to memorize all HTTP status codes. Focus on these:

**Success (2xx)**
- `200 OK` - Request succeeded, response has data
- `201 Created` - Resource created, response usually has the new resource
- `204 No Content` - Request succeeded, no data to return (common for DELETE)

**Client Errors (4xx)**
- `400 Bad Request` - Malformed request (invalid JSON, missing required structure)
- `401 Unauthorized` - No authentication or invalid credentials
- `403 Forbidden` - Authenticated but not authorized for this action
- `404 Not Found` - Resource doesn't exist
- `422 Unprocessable Entity` - Valid request format but invalid data (validation errors)

**Server Errors (5xx)**
- `500 Internal Server Error` - Something broke on the server

The difference between 400 and 422 matters: 400 means the request itself is broken (bad JSON syntax); 422 means the request is valid but the data fails validation (email already taken, price is negative).

## API Design Before Coding

The most valuable habit you can develop is designing your API before writing code. Jumping straight into controllers leads to inconsistent responses, missing endpoints, and APIs that don't match what consumers actually need.

### Questions to Ask First

Before designing any endpoint, answer these questions:

1. **Who consumes this API?** Mobile app, web frontend, third-party integrations, or all of them?
2. **What data do they need?** Don't expose your entire database schema. Think about what the consumer actually uses.
3. **What actions can they perform?** List the operations, then map them to resources and methods.
4. **What are the access levels?** Public, authenticated, admin-only?
5. **What can go wrong?** Think about error cases upfront.

### Writing Endpoints First

Create a simple document listing your endpoints before touching code. This is not formal documentation yet, just a planning tool.

**Example: Task Management Feature**

```
Feature: Task Management
Consumers: Web dashboard, mobile app

Endpoints:

GET    /api/v1/tasks              - List tasks (paginated, filterable by status/assignee)
POST   /api/v1/tasks              - Create new task
GET    /api/v1/tasks/{id}         - Get single task with details
PATCH  /api/v1/tasks/{id}         - Update task fields
DELETE /api/v1/tasks/{id}         - Delete task
POST   /api/v1/tasks/{id}/assign  - Assign task to user
POST   /api/v1/tasks/{id}/complete - Mark task as complete

Query parameters for list:
- status: pending, in_progress, completed
- assignee_id: filter by assigned user
- page, per_page: pagination
- sort: field name, prefix with - for descending
```

### Designing Request/Response Examples

For each endpoint, write out what the request and response look like. This catches issues before you write code.

**POST /api/v1/tasks - Create Task**

Request:
```json
{
    "title": "Review Q3 reports",
    "description": "Check all department submissions",
    "due_date": "2024-04-15",
    "priority": "high",
    "assignee_id": 5
}
```

Success Response (201 Created):
```json
{
    "data": {
        "id": 42,
        "title": "Review Q3 reports",
        "description": "Check all department submissions",
        "due_date": "2024-04-15",
        "priority": "high",
        "status": "pending",
        "assignee": {
            "id": 5,
            "name": "Jane Smith"
        },
        "created_at": "2024-03-20T10:30:00Z",
        "updated_at": "2024-03-20T10:30:00Z"
    }
}
```

Validation Error Response (422):
```json
{
    "message": "The given data was invalid.",
    "errors": {
        "title": ["The title field is required."],
        "due_date": ["The due date must be a future date."]
    }
}
```

**GET /api/v1/tasks - List Tasks**

Request: `GET /api/v1/tasks?status=pending&sort=-created_at&page=1&per_page=20`

Response (200 OK):
```json
{
    "data": [
        {
            "id": 42,
            "title": "Review Q3 reports",
            "status": "pending",
            "priority": "high",
            "due_date": "2024-04-15",
            "assignee": {
                "id": 5,
                "name": "Jane Smith"
            }
        }
    ],
    "meta": {
        "current_page": 1,
        "per_page": 20,
        "total": 45,
        "last_page": 3
    }
}
```

Writing these examples reveals problems early:
- Do you need the full assignee object in the list view, or just the ID?
- Should `due_date` be a date or datetime?
- Is the nested `assignee` object returned consistently across endpoints?

### Why Skipping Design Causes Problems

When you skip the design phase:

1. **Inconsistent responses**: One endpoint returns `{ user: {...} }`, another returns `{ data: {...} }`. Consumers have to handle each endpoint differently.

2. **Missing endpoints**: You build CRUD for tasks but forget the `/assign` action. The frontend developer works around it with PATCH, setting assignee_id directly. Later you need to add assignment notifications, but now the workaround is in production.

3. **Wrong data shapes**: You return the database model directly, exposing internal fields. Now changing your database schema breaks the API.

4. **Undocumented assumptions**: You know that status only accepts three values, but the mobile developer doesn't. They send "done" instead of "completed" and get a cryptic 500 error.

Thirty minutes of design prevents hours of refactoring.

## Response and Error Standards

Consistency in response format is more important than which format you choose. Pick a structure and use it everywhere.

### Success Response Format

**Single resource:**
```json
{
    "data": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com"
    }
}
```

**Collection with pagination:**
```json
{
    "data": [
        {"id": 1, "name": "John Doe"},
        {"id": 2, "name": "Jane Smith"}
    ],
    "meta": {
        "current_page": 1,
        "per_page": 15,
        "total": 45,
        "last_page": 3
    }
}
```

The `data` wrapper might seem redundant for single resources, but it provides consistency. Consumers can always access `response.data` regardless of endpoint.

### Error Response Format

**Validation errors (422):**
```json
{
    "message": "The given data was invalid.",
    "errors": {
        "email": [
            "The email has already been taken."
        ],
        "password": [
            "The password must be at least 8 characters.",
            "The password must contain at least one uppercase letter."
        ]
    }
}
```

**Business logic errors (4xx):**
```json
{
    "message": "Cannot cancel order",
    "error": {
        "code": "ORDER_ALREADY_SHIPPED",
        "details": "This order was shipped on 2024-03-15 and cannot be cancelled."
    }
}
```

**Server errors (500):**
```json
{
    "message": "An unexpected error occurred.",
    "error": {
        "code": "INTERNAL_ERROR"
    }
}
```

In production, never expose stack traces or internal details in 500 errors. Log them server-side for debugging.

### Laravel's Default Validation Format

Laravel's validation errors already follow a sensible format. Don't fight it:

```json
{
    "message": "The given data was invalid.",
    "errors": {
        "field_name": ["Error message 1", "Error message 2"]
    }
}
```

This works well for form validation where you need to show errors next to specific fields.

## Laravel Implementation

Now let's implement these standards in Laravel.

### Route Organization and Versioning

Group your API routes with versioning from the start:

```php
// routes/api.php

Route::prefix('v1')->group(function () {
    
    // Public routes
    Route::post('auth/login', [AuthController::class, 'login']);
    Route::post('auth/register', [AuthController::class, 'register']);
    
    // Protected routes
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('auth/user', [AuthController::class, 'user']);
        Route::post('auth/logout', [AuthController::class, 'logout']);
        
        Route::apiResource('tasks', TaskController::class);
        Route::post('tasks/{task}/assign', [TaskController::class, 'assign']);
        Route::post('tasks/{task}/complete', [TaskController::class, 'complete']);
        
        Route::apiResource('users', UserController::class);
    });
});
```

**Why version from the start?**

Mobile apps can't force users to update immediately. Once someone downloads your app, they might use that version for months. If you change your API responses without versioning, old app versions break.

URL versioning (`/api/v1/`) is explicit and easy to understand. When you need breaking changes, create `/api/v2/` routes and deprecate v1 over time.

### API Resources for Consistent Responses

API Resources transform your models into consistent JSON structures. Never return Eloquent models directly.

```php
// app/Http/Resources/TaskResource.php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'status' => $this->status,
            'priority' => $this->priority,
            'due_date' => $this->due_date?->format('Y-m-d'),
            'assignee' => new UserResource($this->whenLoaded('assignee')),
            'created_at' => $this->created_at->toIso8601String(),
            'updated_at' => $this->updated_at->toIso8601String(),
        ];
    }
}
```

```php
// app/Http/Resources/TaskCollection.php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class TaskCollection extends ResourceCollection
{
    public function toArray(Request $request): array
    {
        return [
            'data' => $this->collection,
            'meta' => [
                'current_page' => $this->currentPage(),
                'per_page' => $this->perPage(),
                'total' => $this->total(),
                'last_page' => $this->lastPage(),
            ],
        ];
    }
}
```

In your controller:

```php
public function index(Request $request)
{
    $tasks = Task::with('assignee')
        ->when($request->status, fn($q, $status) => $q->where('status', $status))
        ->paginate($request->per_page ?? 15);
    
    return new TaskCollection($tasks);
}

public function show(Task $task)
{
    return new TaskResource($task->load('assignee'));
}
```

### Form Requests for Validation

Keep validation out of controllers. Form Requests make validation rules reusable and testable.

```php
// app/Http/Requests/StoreTaskRequest.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTaskRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Handle authorization in policies
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'due_date' => ['nullable', 'date', 'after:today'],
            'priority' => ['required', 'in:low,medium,high'],
            'assignee_id' => ['nullable', 'exists:users,id'],
        ];
    }

    public function messages(): array
    {
        return [
            'due_date.after' => 'The due date must be a future date.',
            'priority.in' => 'Priority must be low, medium, or high.',
        ];
    }
}
```

In your controller:

```php
public function store(StoreTaskRequest $request)
{
    $task = Task::create($request->validated());
    
    return new TaskResource($task);
}
```

Laravel automatically returns 422 with validation errors in the standard format when validation fails.

### Consistent Error Handling

Create a base exception handler for API errors:

```php
// app/Exceptions/ApiException.php

namespace App\Exceptions;

use Exception;

class ApiException extends Exception
{
    public function __construct(
        string $message,
        public string $errorCode,
        public int $statusCode = 400,
        public ?array $details = null
    ) {
        parent::__construct($message);
    }

    public function render()
    {
        $response = [
            'message' => $this->message,
            'error' => [
                'code' => $this->errorCode,
            ],
        ];

        if ($this->details) {
            $response['error']['details'] = $this->details;
        }

        return response()->json($response, $this->statusCode);
    }
}
```

Use it in your business logic:

```php
public function cancel(Order $order)
{
    if ($order->status === 'shipped') {
        throw new ApiException(
            message: 'Cannot cancel order',
            errorCode: 'ORDER_ALREADY_SHIPPED',
            statusCode: 422,
            details: ['shipped_at' => $order->shipped_at->toIso8601String()]
        );
    }
    
    $order->update(['status' => 'cancelled']);
    
    return new OrderResource($order);
}
```

In `app/Exceptions/Handler.php`, ensure API routes return JSON for all exceptions:

```php
public function register(): void
{
    $this->renderable(function (Throwable $e, Request $request) {
        if ($request->is('api/*')) {
            if ($e instanceof ModelNotFoundException) {
                return response()->json([
                    'message' => 'Resource not found',
                    'error' => ['code' => 'NOT_FOUND']
                ], 404);
            }

            if ($e instanceof AuthenticationException) {
                return response()->json([
                    'message' => 'Unauthenticated',
                    'error' => ['code' => 'UNAUTHENTICATED']
                ], 401);
            }

            // Don't expose internal errors in production
            if (!config('app.debug')) {
                return response()->json([
                    'message' => 'An unexpected error occurred',
                    'error' => ['code' => 'INTERNAL_ERROR']
                ], 500);
            }
        }
    });
}
```

## Authentication

Most Laravel APIs use token-based authentication. Laravel Sanctum is the standard choice for SPAs and mobile apps.

### How Token Authentication Fits REST

REST is stateless, meaning the server doesn't store session data. Instead, every request includes a token that identifies the user. The flow:

1. Client sends credentials to login endpoint
2. Server validates credentials and returns a token
3. Client stores the token and includes it in subsequent requests
4. Server validates the token on each request

### Basic Sanctum Setup

Install and configure Sanctum:

```bash
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

Add Sanctum's trait to your User model:

```php
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
}
```

### Authentication Endpoints

```php
// app/Http/Controllers/Api/AuthController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
            'device_name' => ['required', 'string'],
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken($request->device_name)->plainTextToken;

        return response()->json([
            'data' => [
                'user' => new UserResource($user),
                'token' => $token,
            ]
        ]);
    }

    public function user(Request $request)
    {
        return new UserResource($request->user());
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }
}
```

### Protecting Routes

Use the `auth:sanctum` middleware:

```php
Route::middleware('auth:sanctum')->group(function () {
    Route::get('auth/user', [AuthController::class, 'user']);
    Route::apiResource('tasks', TaskController::class);
});
```

Clients include the token in the Authorization header:

```
Authorization: Bearer 1|abc123def456...
```

### Token Abilities for Authorization

Sanctum supports token abilities (scopes) for fine-grained permissions:

```php
// Creating a token with limited abilities
$token = $user->createToken('api-token', ['tasks:read', 'tasks:write']);

// Checking abilities in controller
public function store(StoreTaskRequest $request)
{
    if (!$request->user()->tokenCan('tasks:write')) {
        abort(403, 'Token does not have permission to create tasks');
    }
    
    // ...
}
```

For more complex authorization, use Laravel's policies alongside Sanctum.

## Documentation

An undocumented API is an unusable API. If consumers have to read your code to understand your API, you've failed them.

### Why Documentation Is Not Optional

- Frontend and mobile developers can't work in parallel with you without knowing the API contract
- Third-party integrators won't adopt an API they can't understand
- You yourself will forget the details in six months

### Scramble for Laravel

Scramble generates documentation automatically by analyzing your code. No PHPDoc annotations required for most cases. It uses static analysis to infer types from your controllers, Form Requests, and API Resources.

Install it:

```bash
composer require dedoc/scramble
php artisan vendor:publish --provider="Dedoc\Scramble\ScrambleServiceProvider" --tag="scramble-config"
```

Visit `/docs/api` to see your documentation. That's it. Scramble automatically documents:

- Request parameters from Form Requests
- Response structure from API Resources
- Path parameters from route model binding
- Validation rules and their types

For endpoints that need additional context, add PHPDoc comments:

```php
/**
 * List all tasks
 *
 * Returns a paginated list of tasks. Can be filtered by status and assignee.
 */
public function index(Request $request)
{
    // ...
}

/**
 * Create a new task
 */
public function store(StoreTaskRequest $request)
{
    // Scramble reads StoreTaskRequest automatically
}
```

Scramble's advantage is that documentation stays in sync with your code. When you change a Form Request validation rule, the documentation updates automatically. No need to remember to update PHPDoc annotations.

For authentication, configure the security scheme in a service provider:

```php
use Dedoc\Scramble\Scramble;
use Dedoc\Scramble\Support\Generator\OpenApi;
use Dedoc\Scramble\Support\Generator\SecurityScheme;

public function boot(): void
{
    Scramble::configure()
        ->withDocumentTransformer(function (OpenApi $openApi) {
            $openApi->secure(
                SecurityScheme::http('bearer')
            );
        });
}
```

### Scribe as an Alternative

Scribe is the more established option with additional features like "Try It Out" (in-browser API testing) and automatic Postman collection generation. It requires more PHPDoc annotations but gives you finer control over the output.

Install it:

```bash
composer require --dev knuckleswtf/scribe
php artisan vendor:publish --tag=scribe-config
```

Add docblocks to your controllers:

```php
/**
 * List all tasks
 *
 * Returns a paginated list of tasks. Can be filtered by status and assignee.
 *
 * @queryParam status string Filter by task status. Example: pending
 * @queryParam assignee_id integer Filter by assigned user ID. Example: 5
 * @queryParam page integer Page number. Example: 1
 * @queryParam per_page integer Items per page (max 100). Example: 20
 */
public function index(Request $request)
{
    // ...
}
```

Generate the documentation:

```bash
php artisan scribe:generate
```

**When to choose which:**

| Scenario | Recommendation |
|----------|----------------|
| New project, want minimal maintenance | Scramble |
| Need "Try It Out" in docs | Scribe |
| Heavy use of Laravel Data / Spatie packages | Scramble (PRO) |
| Need maximum control over output | Scribe |
| Team forgets to update annotations | Scramble |

Both tools generate OpenAPI specs, so you can switch later if needed.

### Postman Collections for Non-Laravel Projects

When Scribe isn't available, maintain a Postman collection:

1. Create a collection with folders matching your API structure
2. Add requests with example bodies and descriptions
3. Use environment variables for base URL and tokens
4. Export and version control the collection JSON

Share the collection with your team. Update it whenever the API changes.

### Keeping Documentation Updated

Documentation rot is real. Combat it by:

1. Choosing tools that minimize manual work (Scramble's automatic inference helps here)
2. Making documentation review part of your PR checklist
3. Having frontend/mobile developers report when docs don't match reality
4. Running documentation generation in CI to catch issues early

If you use Scribe, consider running `scribe:generate` in CI to catch missing docblocks. With Scramble, the documentation updates automatically, but review it periodically to ensure descriptions are still accurate.

Outdated documentation is worse than no documentation because it actively misleads consumers.

## Common Mistakes Checklist

Use this list to review your APIs:

**Response consistency**
- [ ] All endpoints wrap data in a `data` key
- [ ] Collections include pagination in `meta`
- [ ] Error responses follow the same structure
- [ ] Date/time formats are consistent (ISO 8601)

**HTTP methods**
- [ ] GET for reading, POST for creating, PATCH for updating, DELETE for removing
- [ ] No sensitive data in GET query parameters
- [ ] Non-CRUD actions use POST with descriptive endpoints

**Status codes**
- [ ] 200 for success with data, 201 for created, 204 for success without data
- [ ] 400 for malformed requests, 422 for validation errors
- [ ] 401 for unauthenticated, 403 for unauthorized
- [ ] 404 for missing resources
- [ ] 500 never exposes internal details in production

**URLs**
- [ ] Plural nouns for resources (`/users`, not `/user`)
- [ ] Lowercase with hyphens (`/order-items`)
- [ ] Versioned (`/api/v1/`)
- [ ] Nesting is shallow (max 2 levels)

**Implementation**
- [ ] API Resources transform all responses (never raw models)
- [ ] Form Requests handle validation
- [ ] Consistent error handling across all endpoints
- [ ] Authentication tokens in Authorization header

**Documentation**
- [ ] All endpoints documented
- [ ] Request/response examples provided
- [ ] Error responses documented
- [ ] Documentation updated when API changes

## Conclusion

Building good APIs is about discipline more than complexity. The standards in this guide are not revolutionary. They're the accumulated wisdom of developers who learned the hard way that inconsistency creates pain.

Start with design. Write your endpoints and example responses before touching code. Use Laravel's API Resources and Form Requests to enforce consistency. Document everything. When you're unsure about an edge case, make a decision and apply it consistently across your API.

Your future self, your team, and your API consumers will thank you.
