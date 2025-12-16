# Hobbyist Decals E-commerce API Documentation

Complete API documentation for the Hobbyist Decals e-commerce platform.

## Table of Contents

- [Base URL](#base-url)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Products](#products)
- [Categories](#categories)
- [Cart](#cart)
- [Orders](#orders)
- [Checkout & Payments](#checkout--payments)
- [Reviews](#reviews)
- [Address Management](#address-management)
- [User Profile](#user-profile)
- [Quote Requests](#quote-requests)
- [Admin Endpoints](#admin-endpoints)
- [Example Workflows](#example-workflows)

---

## Base URL

- **Development**: `http://localhost:3000`
- **Production**: `https://api.hobbyistdecals.com`

All endpoints are prefixed with `/api`.

---

## Authentication

The API uses **Clerk** for authentication. Most endpoints require authentication via Bearer token.

### How to Authenticate

1. User signs in through Clerk authentication
2. Clerk provides a JWT token
3. Include the token in the `Authorization` header:

```
Authorization: Bearer <clerk_jwt_token>
```

### Public Endpoints

The following endpoints do not require authentication:
- `GET /api/product` - List products
- `GET /api/product/details` - Product details
- `GET /api/categories` - List categories
- `GET /api/reviews` - Get product reviews
- `POST /api/quote` - Submit quote request

### Guest User Support

Some endpoints support both authenticated and guest users:
- Cart operations (`/api/cart/*`)
- Guest users receive data for localStorage management

---

## Error Handling

All error responses follow this format:

```json
{
  "success": false,
  "error": "Error message description"
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (duplicate resource)
- `500` - Internal Server Error

---

## Products

### Get All Products

**GET** `/api/product`

Fetch paginated list of active products.

**Query Parameters:**
- `page` (integer, default: 1) - Page number
- `limit` (integer, default: 12, max: 50) - Items per page
- `category` (string, optional) - Filter by category name

**Response:**
```json
{
  "success": true,
  "results": [
    {
      "id": 1,
      "name": "Truck Decal Set",
      "sku": "HD123456",
      "price_range": "14.50 - 19.99",
      "category": "Truck Decals",
      "tags": ["featured"],
      "images": ["/uploads/products/image.jpg"]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 100,
    "totalPages": 9,
    "hasMore": true
  }
}
```

### Get Product Details

**GET** `/api/product/details?name={productName}`

Fetch detailed product information including scales, materials, and variations.

**Query Parameters:**
- `name` (string, required) - Product name (URL encoded)

**Response:**
```json
{
  "id": 1,
  "name": "Truck Decal Set",
  "price": "14.50",
  "image": "/uploads/products/image.jpg",
  "description": "Product description",
  "sku": "HD123456",
  "scales": [
    {
      "scale_id": 1,
      "scale_name": "1/25",
      "additional_price": 5.99
    }
  ],
  "materials": [
    {
      "material_id": 1,
      "material_type": "Waterslide",
      "additional_price": 3.50
    }
  ],
  "variations": [
    {
      "variation_id": 1,
      "variation_name": "V1",
      "additional_price": 2.00
    }
  ]
}
```

---

## Categories

### Get All Categories

**GET** `/api/categories`

Fetch all product categories with product counts.

**Response:**
```json
{
  "success": true,
  "categories": [
    {
      "category_id": 1,
      "name": "Truck Decals",
      "image": "/uploads/categories/truck.jpg",
      "description": "Truck decal products",
      "product_count": 45
    }
  ]
}
```

---

## Cart

### Get Cart

**GET** `/api/cart/get`

Retrieve the user's cart. Works for both authenticated and guest users.

**Response (Authenticated):**
```json
{
  "success": true,
  "isAuthenticated": true,
  "cart": {
    "cart_id": 1,
    "items": [
      {
        "cart_item_id": 1,
        "variant_id": 5,
        "product_id": 1,
        "product_name": "Truck Decal Set",
        "product_image": "/uploads/products/image.jpg",
        "quantity": 2,
        "base_price": 14.50,
        "final_price": 19.99,
        "variant_details": {
          "scale_name": "1/25",
          "material_type": "Waterslide",
          "variation_name": null
        }
      }
    ],
    "subtotal": 39.98,
    "shipping_amount": 5.00,
    "discount_amount": 0,
    "total_amount": 44.98,
    "coupon_code": null
  }
}
```

**Response (Guest):**
```json
{
  "success": true,
  "isAuthenticated": false,
  "cart": {
    "cart_id": null,
    "items": [],
    "subtotal": 0,
    "shipping_amount": 0,
    "discount_amount": 0,
    "total_amount": 0,
    "coupon_code": null
  },
  "message": "Guest user - use localStorage for cart management"
}
```

### Add Item to Cart

**POST** `/api/cart/add`

Add a product variant to the cart. Creates variant if it doesn't exist.

**Request Body:**
```json
{
  "product_id": 1,
  "variant_id": 5,
  "scale_id": 1,
  "material_id": 2,
  "variation_id": null,
  "quantity": 2
}
```

**Response:**
```json
{
  "success": true,
  "isAuthenticated": true,
  "cart_item": {
    "cart_item_id": 1,
    "variant_id": 5,
    "product_id": 1,
    "product_name": "Truck Decal Set",
    "product_image": "/uploads/products/image.jpg",
    "quantity": 2,
    "base_price": 14.50,
    "final_price": 19.99,
    "variant_details": {
      "scale_name": "1/25",
      "material_type": "Waterslide",
      "variation_name": null
    }
  },
  "message": "Item added to cart successfully"
}
```

### Update Cart Item

**PUT** `/api/cart/update`

Update the quantity of a cart item.

**Request Body:**
```json
{
  "cart_item_id": 1,
  "quantity": 3
}
```

### Remove Cart Item

**POST** `/api/cart/remove`

Remove an item from the cart.

**Request Body:**
```json
{
  "cart_item_id": 1
}
```

### Apply Coupon

**POST** `/api/cart/coupon/apply`

Apply a discount coupon to the cart.

**Request Body:**
```json
{
  "code": "SAVE10",
  "subtotal": 100.00
}
```

**Response:**
```json
{
  "success": true,
  "discount_amount": 10.00,
  "coupon": {
    "code": "SAVE10",
    "discount_percent": 10,
    "discount_id": 1
  }
}
```

### Remove Coupon

**POST** `/api/cart/coupon/remove`

Remove applied coupon from the cart.

---

## Orders

### Get User Orders

**GET** `/api/profile/orders`

Fetch user's orders with optional filters.

**Query Parameters:**
- `filter` (string, default: "all") - Filter by status: `all`, `buy_again`, `not_shipped`, `cancelled`
- `page` (integer, default: 1) - Page number
- `limit` (integer, default: 10) - Items per page

**Response:**
```json
{
  "success": true,
  "orders": [
    {
      "order_id": 1,
      "order_code": "ORD123456789",
      "total_amount": 44.98,
      "shipping_amount": 5.00,
      "total_discount": 0,
      "order_status": "delivered",
      "payment_status": "paid",
      "payment_method": "stripe",
      "created_at": "2024-01-15T10:30:00Z",
      "product_image": "/uploads/products/image.jpg",
      "product_name": "Truck Decal Set - 1/25, Waterslide",
      "shipping_address": {
        "full_name": "John Doe",
        "phone": "+1234567890",
        "address": "123 Main St, City, State, 12345, Country"
      },
      "tracking_id": "TRACK123",
      "shipment_status": "delivered",
      "items": [
        {
          "order_item_id": 1,
          "product_id": 1,
          "product_name": "Truck Decal Set",
          "product_image": "/uploads/products/image.jpg",
          "quantity": 2,
          "base_price": 14.50,
          "final_price": 19.99,
          "variant_details": {
            "scale": "1/25",
            "material": "Waterslide",
            "variation": null
          },
          "review": {
            "has_review": true,
            "rating": 5,
            "comments": "Great product!",
            "created_at": "2024-01-20T10:00:00Z"
          }
        }
      ]
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalCount": 1,
    "itemsPerPage": 10
  }
}
```

### Get Order Details

**GET** `/api/profile/orders/{orderId}`

Fetch detailed information about a specific order.

### Track Order

**GET** `/api/profile/orders/{orderId}/track`

Get tracking information for an order.

### Request Order Return

**POST** `/api/profile/orders/{orderId}/return`

Submit a return request for an order.

**Request Body:**
```json
{
  "reason": "Defective product",
  "comments": "Item arrived damaged"
}
```

### Get Order Invoice

**GET** `/api/profile/orders/{orderId}/invoice`

Generate invoice data for an order.

---

## Checkout & Payments

### Process Checkout

**POST** `/api/checkout/process`

Create an order from the cart and initiate payment.

**Request Body:**
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "phone": "+1234567890",
  "email": "john@example.com",
  "use_different_address": false,
  "address_id": 1,
  "payment_method": "stripe",
  "order_note": "Please handle with care"
}
```

**Response:**
```json
{
  "success": true,
  "order_id": 1,
  "order_code": "ORD123456789",
  "payment_intent_id": "pi_1234567890",
  "session_id": null,
  "transaction_id": null,
  "redirect_url": "https://checkout.stripe.com/pay/..."
}
```

**Payment Methods:**
- `stripe` - Stripe payment gateway
- `paypal` - PayPal payment
- `pay_on_delivery` - Cash on delivery

### Confirm Payment

**POST** `/api/checkout/confirm-payment`

Confirm payment completion after payment gateway callback.

**Request Body:**
```json
{
  "order_id": 1,
  "payment_status": "paid",
  "transaction_id": "txn_1234567890"
}
```

---

## Reviews

### Get Product Reviews

**GET** `/api/reviews?productId={productId}`

Fetch reviews for a product with pagination and rating filter.

**Query Parameters:**
- `productId` (integer, required) - Product ID
- `rating` (integer, optional) - Filter by rating (1-5)
- `page` (integer, default: 1) - Page number
- `limit` (integer, default: 10, max: 50) - Items per page

**Response:**
```json
{
  "success": true,
  "reviews": [
    {
      "review_id": 1,
      "rating": 5,
      "comments": "Excellent product quality!",
      "created_at": "2024-01-20T10:00:00Z",
      "updated_at": "2024-01-20T10:00:00Z",
      "user": {
        "user_id": 1,
        "name": "John Doe",
        "first_name": "John",
        "last_name": "Doe",
        "email": "john@example.com",
        "image": "/uploads/users/avatar.jpg"
      }
    }
  ],
  "stats": {
    "total_reviews": 150,
    "avg_rating": 4.5,
    "five_star": 100,
    "four_star": 30,
    "three_star": 10,
    "two_star": 5,
    "one_star": 5
  },
  "pagination": {
    "currentPage": 1,
    "totalPages": 15,
    "totalCount": 150,
    "itemsPerPage": 10
  }
}
```

### Create or Update Review

**POST** `/api/reviews`

Submit a review for a product. Only allowed if user has purchased and received the product.

**Request Body:**
```json
{
  "productId": 1,
  "rating": 5,
  "comments": "Great product, highly recommended!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Review submitted successfully",
  "review_id": 1,
  "is_update": false
}
```

**Note:** If the user has already reviewed the product, the existing review will be updated instead of creating a new one.

### Get User's Review

**GET** `/api/reviews/my-review?productId={productId}`

Fetch the current user's review for a specific product.

**Response:**
```json
{
  "success": true,
  "review": {
    "review_id": 1,
    "rating": 5,
    "comments": "Great product!",
    "created_at": "2024-01-20T10:00:00Z",
    "updated_at": "2024-01-20T10:00:00Z",
    "user": {
      "user_id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

---

## Address Management

### Get User Addresses

**GET** `/api/profile/address`

Fetch all shipping addresses for the authenticated user.

**Response:**
```json
{
  "success": true,
  "addresses": [
    {
      "address_id": 1,
      "full_name": "John Doe",
      "phone": "+1234567890",
      "company_name": null,
      "country": "United States",
      "street_address": "123 Main St",
      "city": "New York",
      "state": "NY",
      "postal_code": "10001",
      "is_default": true,
      "address_type": "shipping"
    }
  ]
}
```

### Create Address

**POST** `/api/profile/address`

Create a new shipping address.

**Request Body:**
```json
{
  "full_name": "John Doe",
  "phone": "+1234567890",
  "company_name": "Acme Corp",
  "country": "United States",
  "street_address": "123 Main St",
  "city": "New York",
  "state": "NY",
  "postal_code": "10001",
  "is_default": true
}
```

### Update Address

**PUT** `/api/profile/address/{id}`

Update an existing address.

### Delete Address

**DELETE** `/api/profile/address/{id}`

Delete an address.

### Set Default Address

**POST** `/api/profile/address/{id}/set-default`

Set an address as the default shipping address.

---

## User Profile

### Get User Profile

**GET** `/api/profile/user`

Fetch the authenticated user's profile information.

**Response:**
```json
{
  "success": true,
  "user": {
    "user_id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "image": "/uploads/users/avatar.jpg"
  }
}
```

### Get User Role

**GET** `/api/profile/user/role`

Get the current user's role (admin, manager, customer).

**Response:**
```json
{
  "success": true,
  "role": "customer"
}
```

---

## Quote Requests

### Submit Quote Request

**POST** `/api/quote`

Submit a custom decal design quote request.

**Request Body (FormData):**
- `firstName` (string, required)
- `lastName` (string, optional)
- `email` (string, required)
- `phone` (string, optional)
- `subject` (string, optional)
- `quantity` (string, optional)
- `message` (string, optional)
- `file` (File, optional) - Max 10MB, allowed types: JPG, PNG, PDF, DOC, DOCX, PSD, ZIP

**Response:**
```json
{
  "success": true,
  "message": "Quote submitted successfully",
  "quote_id": 1
}
```

---

## Admin Endpoints

All admin endpoints require authentication with `admin` or `manager` role. Some endpoints (like user management) require `admin` role only.

### Admin Products

#### List Products (Admin)

**GET** `/api/admin/products?page=1&limit=10&search=term&category_id=1`

Get paginated list of products with optional search and filtering.

#### Create Product (Admin)

**POST** `/api/admin/products`

Create a new product with optional image upload.

**Request Body (FormData):**
- `name` (string, required)
- `sku` (string, optional)
- `short_description` (string, optional)
- `long_description` (string, optional)
- `price` (string, required)
- `category_id` (string, optional)
- `in_stock` (string, optional)
- `tag` (string, optional) - Values: `none`, `featured`, `premium`, `new`, `bestseller`
- `images` (File[], optional)
- `selectedScales` (JSON string, optional) - Array of scale IDs
- `selectedMaterials` (JSON string, optional) - Array of material IDs
- `selectedVariations` (JSON string, optional) - Array of variation IDs

#### Update Product (Admin)

**PUT** `/api/admin/products/{productId}`

Update an existing product.

#### Delete Product (Admin)

**DELETE** `/api/admin/products/{productId}`

Delete a product and all related data.

### Admin Coupons

#### List Coupons (Admin)

**GET** `/api/admin/coupons?page=1&limit=10`

Get paginated list of discount codes.

#### Create Coupon (Admin)

**POST** `/api/admin/coupons`

Create a new discount code.

**Request Body:**
```json
{
  "code": "SAVE10",
  "discount_percent": 10,
  "valid_from": "2024-01-01T00:00:00Z",
  "valid_to": "2024-12-31T23:59:59Z",
  "max_uses": 100
}
```

#### Update Coupon (Admin)

**PUT** `/api/admin/coupons`

Update an existing discount code.

#### Delete Coupon (Admin)

**DELETE** `/api/admin/coupons?discount_id=1`

Delete a discount code.

### Admin Analytics

#### Get Sales Analytics

**GET** `/api/admin/analytics/sales?days=30`

Get sales analytics including revenue, orders, and trends.

#### Get Customer Analytics

**GET** `/api/admin/analytics/customers`

Get customer statistics and trends.

#### Get Top Products

**GET** `/api/admin/analytics/top-products?limit=10`

Get best-selling products analytics.

### Admin Users (Admin Only)

#### List Admin/Manager Users

**GET** `/api/admin/users`

Get list of users with admin or manager roles.

#### Assign Admin/Manager Role

**POST** `/api/admin/users`

Assign admin or manager role to a user by email.

**Request Body:**
```json
{
  "email": "admin@example.com",
  "role": "admin"
}
```

#### Update User Role

**PUT** `/api/admin/users/{userId}`

Update a user's role.

#### Remove Admin/Manager Role

**DELETE** `/api/admin/users/{userId}`

Remove admin/manager role from a user (sets to customer).

---

## Example Workflows

### 1. Creating a Product (Admin)

```bash
# 1. Create product
POST /api/admin/products
Content-Type: multipart/form-data

{
  "name": "Truck Decal Set",
  "price": "14.50",
  "category_id": "1",
  "in_stock": "true",
  "tag": "featured",
  "images": [file]
}

# Response: { "success": true, "product": { "product_id": 1, ... } }
```

### 2. Adding to Cart

```bash
# 1. Get product details
GET /api/product/details?name=Truck%20Decal%20Set

# 2. Add to cart
POST /api/cart/add
{
  "product_id": 1,
  "scale_id": 1,
  "material_id": 2,
  "quantity": 2
}

# 3. Apply coupon
POST /api/cart/coupon/apply
{
  "code": "SAVE10",
  "subtotal": 39.98
}

# 4. Get cart
GET /api/cart/get
```

### 3. Creating an Order

```bash
# 1. Add address
POST /api/profile/address
{
  "full_name": "John Doe",
  "phone": "+1234567890",
  "country": "United States",
  "street_address": "123 Main St",
  "city": "New York",
  "state": "NY",
  "postal_code": "10001",
  "is_default": true
}

# 2. Process checkout
POST /api/checkout/process
{
  "first_name": "John",
  "last_name": "Doe",
  "phone": "+1234567890",
  "email": "john@example.com",
  "use_different_address": false,
  "address_id": 1,
  "payment_method": "stripe"
}

# Response: { "success": true, "order_id": 1, "order_code": "ORD123", ... }

# 3. Confirm payment (after payment gateway callback)
POST /api/checkout/confirm-payment
{
  "order_id": 1,
  "payment_status": "paid",
  "transaction_id": "txn_123"
}
```

### 4. Posting a Review

```bash
# 1. Wait for order to be delivered
# 2. Get order details
GET /api/profile/orders/1

# 3. Submit review
POST /api/reviews
{
  "productId": 1,
  "rating": 5,
  "comments": "Great product!"
}

# Response: { "success": true, "review_id": 1, ... }
```

---

## Rate Limiting

Currently, there are no rate limits implemented. However, it's recommended to:
- Cache product and category data on the client side
- Use pagination for large data sets
- Implement request throttling in production

## Caching

Some endpoints implement caching:
- Product listings: 5 minutes
- Product details: 5 minutes
- Categories: 1 hour
- Reviews: 60 seconds

Cache headers are included in responses:
```
Cache-Control: public, s-maxage=300, stale-while-revalidate=600
```

---

## Support

For API support, contact: support@hobbyistdecals.com

---

**Last Updated:** 2024-01-20
**API Version:** 1.0.0

