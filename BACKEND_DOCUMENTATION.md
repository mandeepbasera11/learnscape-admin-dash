# Backend Documentation - Student Portal

## Complete Backend Infrastructure

This document outlines all backend functionality, edge functions, and database setup for the student portal application.

---

## Edge Functions

### 1. **Authentication Functions**

#### `/request-password-reset`
- **Method**: POST
- **Authentication**: Not required
- **Purpose**: Send password reset email to user
- **Request Body**:
  ```json
  {
    "email": "user@example.com"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Password reset email sent successfully"
  }
  ```

#### `/change-password`
- **Method**: POST
- **Authentication**: Required (JWT)
- **Purpose**: Update user password after reset
- **Request Body**:
  ```json
  {
    "newPassword": "newSecurePassword123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Password updated successfully"
  }
  ```

---

### 2. **Payment Functions**

#### `/create-payment` (Stripe)
- **Method**: POST
- **Authentication**: Required (JWT)
- **Purpose**: Create Stripe checkout session for course purchase
- **Request Body**:
  ```json
  {
    "course_id": "uuid",
    "coupon_code": "SAVE20" // optional
  }
  ```
- **Response**:
  ```json
  {
    "url": "https://checkout.stripe.com/...",
    "applied_coupon": {
      "code": "SAVE20",
      "discount_amount": 200,
      "final_amount": 800
    }
  }
  ```

#### `/create-razorpay-payment` (Razorpay/UPI)
- **Method**: POST
- **Authentication**: Required (JWT)
- **Purpose**: Create Razorpay order for UPI and other Indian payment methods
- **Request Body**:
  ```json
  {
    "course_id": "uuid",
    "coupon_code": "SAVE20" // optional
  }
  ```
- **Response**:
  ```json
  {
    "order_id": "order_xyz123",
    "amount": 80000,
    "currency": "INR",
    "key": "rzp_test_...",
    "user_email": "user@example.com",
    "course_name": "Anatomy Course"
  }
  ```

#### `/verify-razorpay-payment`
- **Method**: POST
- **Authentication**: Required (JWT)
- **Purpose**: Verify Razorpay payment signature and complete enrollment
- **Request Body**:
  ```json
  {
    "razorpay_order_id": "order_xyz123",
    "razorpay_payment_id": "pay_xyz123",
    "razorpay_signature": "signature_hash"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Payment verified successfully",
    "order_id": "uuid"
  }
  ```

#### `/verify-coupon`
- **Method**: POST
- **Authentication**: Not required
- **Purpose**: Validate coupon code and calculate discount
- **Request Body**:
  ```json
  {
    "coupon_code": "SAVE20",
    "course_price": 1000
  }
  ```
- **Response**:
  ```json
  {
    "valid": true,
    "coupon": {
      "code": "SAVE20",
      "discount_type": "percentage",
      "discount_value": 20,
      "discount_amount": 200,
      "final_amount": 800
    }
  }
  ```

---

### 3. **Course Management**

#### `/course-management`
- **Method**: GET, POST, PUT, DELETE
- **Authentication**: Not required for GET, Required for modifications
- **Purpose**: Manage courses (admin functionality)
- **Endpoints**:
  - GET: Fetch all published courses
  - POST: Create new course
  - PUT: Update course details
  - DELETE: Delete course

---

### 4. **Test Management**

#### `/test-management`
- **Method**: GET, POST, PUT, DELETE
- **Authentication**: Not required for GET, Required for modifications
- **Purpose**: Manage test series and individual tests
- **Features**:
  - Create test series
  - Add tests to series
  - Track test attempts
  - Calculate scores

---

### 5. **User Management**

#### `/profile-management`
- **Method**: GET, PUT
- **Authentication**: Required (JWT)
- **Purpose**: Manage user profile information
- **Request Body** (PUT):
  ```json
  {
    "full_name": "John Doe",
    "phone": "+91-1234567890",
    "medical_college": "AIIMS Delhi",
    "year_of_study": 3,
    "target_exam": "NEET PG"
  }
  ```

#### `/user-orders`
- **Method**: GET
- **Authentication**: Required (JWT)
- **Purpose**: Fetch user's order history
- **Response**:
  ```json
  {
    "orders": [...],
    "summary": {
      "totalOrders": 5,
      "totalSpent": 5000,
      "completedOrders": 4
    }
  }
  ```

---

### 6. **Search & Analytics**

#### `/search`
- **Method**: POST
- **Authentication**: Not required
- **Purpose**: Search courses and test series
- **Request Body**:
  ```json
  {
    "query": "anatomy",
    "type": "courses" // or "tests"
  }
  ```

#### `/analytics`
- **Method**: GET
- **Authentication**: Not required
- **Purpose**: Get platform analytics and statistics

---

## Database Schema

### Core Tables

1. **profiles**
   - User profile information
   - Linked to auth.users via user_id
   - Stores medical college, target exam, year of study

2. **courses**
   - Course catalog
   - Includes pricing, instructor info, thumbnails
   - Category-based organization

3. **course_enrollments**
   - Tracks user course enrollments
   - Progress tracking
   - Completion status

4. **test_series**
   - Test series catalog
   - Subject-based organization
   - Duration and question count

5. **tests**
   - Individual tests within series
   - Sequence number for ordering
   - Passing score requirements

6. **test_attempts**
   - User test attempt records
   - Score calculation
   - Time tracking

7. **orders**
   - Payment transaction records
   - Supports both Stripe and Razorpay
   - Coupon application tracking

8. **coupons**
   - Discount coupon management
   - Usage limits and validity periods
   - Percentage or fixed amount discounts

9. **Core Subjects**
   - Subject categories
   - Color coding for UI

---

## Payment Integration

### Stripe Integration
- **Currency**: INR
- **Payment Flow**: Checkout session → Success page → Order completion
- **Webhook**: Not yet implemented (manual verification via success page)

### Razorpay Integration (NEW)
- **Currency**: INR
- **Payment Methods**: Credit/Debit Cards, UPI, NetBanking, Wallets
- **Payment Flow**: 
  1. Create order via `/create-razorpay-payment`
  2. Open Razorpay checkout
  3. User completes payment
  4. Verify signature via `/verify-razorpay-payment`
  5. Enroll user in course

---

## Required Environment Variables

### Supabase (Auto-configured)
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### Stripe
- `STRIPE_SECRET_KEY` - Get from https://dashboard.stripe.com/

### Razorpay (NEW - Required for UPI)
- `RAZORPAY_KEY_ID` - Get from https://dashboard.razorpay.com/
- `RAZORPAY_KEY_SECRET` - Get from https://dashboard.razorpay.com/

---

## Security Features

1. **Row Level Security (RLS)**
   - All tables have RLS enabled
   - Users can only access their own data
   - Public data (courses, tests) accessible to all

2. **JWT Authentication**
   - Edge functions require valid JWT tokens
   - Auth state managed via Supabase Auth

3. **Payment Verification**
   - Razorpay signature verification prevents tampering
   - Server-side amount calculation prevents manipulation

4. **Coupon Validation**
   - Server-side coupon verification
   - Usage limit enforcement
   - Expiry date checking

---

## Course Images Generated

High-quality HD images have been generated for all subjects:
- Anatomy
- Physiology
- Biochemistry
- Pharmacology
- Pathology
- Microbiology
- Surgery
- Medicine
- RTI Act
- Leave Rules
- Financial Rules
- Travel Allowance
- Pension Rules
- Hero Banner

All images are stored in `src/assets/courses/` and should be imported as ES6 modules.

---

## Setup Instructions

### 1. Configure Razorpay
```bash
# Add Razorpay secrets via Supabase dashboard
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
```

### 2. Test Payment Integration
- Use Razorpay test cards for testing
- Test card: 4111 1111 1111 1111
- Any future expiry date and CVV

### 3. Deploy Edge Functions
All edge functions are automatically deployed when you push code.

---

## API Usage Examples

### Creating a Payment with Razorpay
```typescript
const { data, error } = await supabase.functions.invoke('create-razorpay-payment', {
  body: {
    course_id: 'course-uuid',
    coupon_code: 'SAVE20' // optional
  }
});

if (data) {
  const options = {
    key: data.key,
    amount: data.amount,
    currency: data.currency,
    order_id: data.order_id,
    name: 'Student Portal',
    description: data.course_name,
    handler: async (response) => {
      // Verify payment
      await supabase.functions.invoke('verify-razorpay-payment', {
        body: {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature
        }
      });
    }
  };
  
  const razorpay = new Razorpay(options);
  razorpay.open();
}
```

### Requesting Password Reset
```typescript
const { error } = await supabase.functions.invoke('request-password-reset', {
  body: { email: 'user@example.com' }
});
```

---

## Troubleshooting

### Password Reset Not Working
- Check email confirmation is disabled in Supabase Auth settings
- Verify redirect URL is correctly configured
- Check spam folder for reset emails

### Payment Issues
- Verify API keys are correctly set in Supabase secrets
- Check browser console for errors
- Test with Razorpay test credentials first

### Database Errors
- Ensure RLS policies are correctly configured
- Check user is authenticated before operations
- Verify foreign key constraints

---

## Future Enhancements

1. **Webhook Integration**
   - Implement Stripe/Razorpay webhooks for automated order processing
   - Background payment verification

2. **Email Notifications**
   - Course enrollment confirmation
   - Payment receipts
   - Test reminders

3. **Admin Dashboard**
   - Course management UI
   - User analytics
   - Revenue reports

4. **Advanced Features**
   - Course reviews and ratings
   - Discussion forums
   - Live classes integration
   - Certificate generation

---

For more information, contact the development team or refer to the Supabase documentation.
