# Testing Checklist - Media E-commerce Platform

Use this checklist to verify all features are working correctly.

## 🏠 Home Page (index.html)

### Navigation
- [ ] Logo links to home page
- [ ] "Home" link is highlighted
- [ ] "Products" link navigates correctly
- [ ] "Cart" link shows cart page
- [ ] Cart counter displays "0" initially
- [ ] "Login" button shows when not authenticated
- [ ] Profile avatar shows when authenticated

### Hero Carousel
- [ ] Carousel displays first slide on load
- [ ] Auto-rotates every 5 seconds
- [ ] Previous button works
- [ ] Next button works
- [ ] All 3 slides display correctly
- [ ] "Shop Now" buttons link to products page

### Featured Products
- [ ] 8 products display in grid
- [ ] Product images load correctly
- [ ] Product names display
- [ ] Prices show with $ symbol
- [ ] Hover effect scales cards
- [ ] "Add to Cart" buttons work
- [ ] Alert shows when item added
- [ ] Cart counter increments
- [ ] "View All Products" button navigates to products page

### Categories Section
- [ ] 4 category cards display
- [ ] Category links work
- [ ] Hover effects work

### Footer
- [ ] Footer displays at bottom
- [ ] Copyright text shows

## 🛍️ Products Page (products.html)

### Navigation
- [ ] All navbar elements work
- [ ] "Products" link is highlighted
- [ ] Cart counter persists from home page

### Search Functionality
- [ ] Search input is visible
- [ ] Typing updates results instantly (onInput)
- [ ] Search is case-insensitive
- [ ] Searching "laptop" shows only laptops
- [ ] Searching "mouse" shows only mice
- [ ] Searching nonsense shows "No products found"
- [ ] Clearing search shows all products

### Category Filters
- [ ] "All Products" button is active by default
- [ ] All 24 products display initially
- [ ] Clicking "Laptops" filters to laptops only
- [ ] Clicking "Monitors" filters to monitors only
- [ ] Clicking "Keyboards" filters to keyboards only
- [ ] Clicking "Mice" filters to mice only
- [ ] Clicking "Headsets" filters to headsets only
- [ ] Active filter button is highlighted
- [ ] Filters work with search simultaneously

### Product Grid
- [ ] Products display in responsive grid
- [ ] 4 columns on desktop
- [ ] 2 columns on tablet
- [ ] 1 column on mobile
- [ ] All product images load
- [ ] Hover effect works on cards
- [ ] Clicking card navigates to product details
- [ ] "Add to Cart" button works without navigating

### URL Parameters
- [ ] Visiting `products.html?category=laptop` filters to laptops
- [ ] URL category parameter sets active filter

## 📦 Product Details Page (product-details.html)

### Navigation
- [ ] Navbar works correctly
- [ ] "Back to Products" link works
- [ ] Cart counter shows correct count

### Product Display
- [ ] Product image loads and displays large
- [ ] Product name displays correctly
- [ ] Price shows with $ symbol
- [ ] Description text displays
- [ ] Category shows capitalized

### Quantity Selector
- [ ] Quantity starts at 1
- [ ] Plus button increases quantity
- [ ] Minus button decreases quantity
- [ ] Quantity cannot go below 1
- [ ] Price updates when quantity changes
- [ ] Button text shows: "Add to Cart - $XX.XX"

### Add to Cart
- [ ] "Add to Cart" button works
- [ ] Toast notification appears
- [ ] Toast shows correct quantity and product name
- [ ] Toast disappears after 3 seconds
- [ ] Cart counter updates
- [ ] Quantity resets to 1 after adding
- [ ] Multiple adds increase cart quantity

### Product Details Section
- [ ] Category displays correctly
- [ ] Shipping info shows
- [ ] Return policy shows
- [ ] Warranty info shows

### Invalid Product ID
- [ ] Visiting `product-details.html?id=999` redirects to products page

## 🛒 Shopping Cart (cart.html)

### Empty Cart
- [ ] "Your cart is empty" message shows when cart is empty
- [ ] "Continue Shopping" button links to products page

### Cart Items
- [ ] All cart items display
- [ ] Product images show
- [ ] Product names display
- [ ] Individual prices show
- [ ] Quantities display correctly
- [ ] Line totals calculate correctly (price × quantity)

### Quantity Controls
- [ ] Plus button increases quantity
- [ ] Minus button decreases quantity
- [ ] Quantity cannot go below 1
- [ ] Line total updates when quantity changes
- [ ] Cart counter updates
- [ ] Order summary updates

### Remove Items
- [ ] "Remove" button shows confirmation
- [ ] Confirming removes item from cart
- [ ] Canceling keeps item in cart
- [ ] Cart counter updates after removal
- [ ] Empty cart message shows when last item removed

### Order Summary
- [ ] Subtotal calculates correctly
- [ ] Tax shows as 10% of subtotal
- [ ] Total = Subtotal + Tax
- [ ] All amounts format with 2 decimals
- [ ] Summary updates when cart changes

### Persistence
- [ ] Cart persists after page refresh
- [ ] Cart persists after closing browser
- [ ] Cart persists across different pages

### Checkout Button
- [ ] "Proceed to Checkout" button is visible
- [ ] Button is clickable (placeholder functionality)

## 🔐 Authentication (auth.html)

### Login Form
- [ ] Login form displays by default
- [ ] Email input validates email format
- [ ] Password input masks characters
- [ ] "Sign In" button submits form
- [ ] Empty fields show validation error
- [ ] Invalid credentials show error message
- [ ] Valid credentials log user in
- [ ] Successful login redirects to profile page

### Register Form
- [ ] "Sign up" link shows register form
- [ ] Register form displays correctly
- [ ] Email input validates
- [ ] Password input validates
- [ ] Confirm password input validates
- [ ] Passwords must match
- [ ] Password must be 6+ characters
- [ ] "Create Account" button submits
- [ ] Successful registration redirects to profile
- [ ] "Sign in" link returns to login form

### Google Login
- [ ] Google button displays with icon
- [ ] Clicking opens Google sign-in popup
- [ ] Selecting account logs user in
- [ ] Successful login redirects to profile
- [ ] User photo from Google displays in navbar

### Facebook Login
- [ ] Facebook button displays with icon
- [ ] Button is clickable
- [ ] Shows error if not configured (expected)

### GitHub Login
- [ ] GitHub button displays with icon
- [ ] Button is clickable
- [ ] Shows error if not configured (expected)

### Form Toggle
- [ ] Login and register forms toggle correctly
- [ ] Only one form visible at a time

## 👤 Profile Page (profile.html)

### Access Control
- [ ] Redirects to auth.html if not logged in
- [ ] Displays profile if logged in

### Profile Display
- [ ] User avatar displays
- [ ] Avatar from social login shows correctly
- [ ] Fallback avatar shows for email users
- [ ] Display name shows (or email username)
- [ ] Email address displays

### Sign Out
- [ ] "Sign Out" button is visible
- [ ] Clicking signs user out
- [ ] Redirects to home page after sign out
- [ ] Navbar updates to show "Login" button

### My Orders Section
- [ ] "My Orders" section displays
- [ ] "No orders yet" message shows
- [ ] "Start Shopping" button links to products

## 🔄 Cross-Page Functionality

### Cart Counter
- [ ] Counter shows on all pages
- [ ] Counter updates when items added
- [ ] Counter updates when quantities changed
- [ ] Counter updates when items removed
- [ ] Counter persists across page navigation

### Authentication State
- [ ] Login button shows when not authenticated
- [ ] Profile avatar shows when authenticated
- [ ] Auth state persists across pages
- [ ] Auth state persists after refresh

### Navigation
- [ ] All navbar links work on all pages
- [ ] Active page is highlighted
- [ ] Logo always returns to home

## 📱 Responsive Design

### Mobile (< 768px)
- [ ] Navbar stacks correctly
- [ ] Product grid shows 1 column
- [ ] Cart items stack vertically
- [ ] Forms are full width
- [ ] Buttons are touch-friendly
- [ ] Text is readable

### Tablet (768px - 1024px)
- [ ] Product grid shows 2 columns
- [ ] Navbar shows all items
- [ ] Cart layout works
- [ ] Forms are appropriately sized

### Desktop (> 1024px)
- [ ] Product grid shows 4 columns
- [ ] All elements properly spaced
- [ ] Max width containers center content
- [ ] Hover effects work

## 🎨 Visual Design

### Colors
- [ ] Background is Slate-950
- [ ] Cards are Slate-900
- [ ] Primary buttons are Blue-600
- [ ] Hover states are Blue-700
- [ ] Text is white/gray
- [ ] Prices are Blue-500

### Animations
- [ ] Product cards scale on hover
- [ ] Buttons have hover effects
- [ ] Carousel transitions smoothly
- [ ] Toast slides in and out
- [ ] All transitions are smooth

### Typography
- [ ] All text is readable
- [ ] Headings are properly sized
- [ ] Font weights are appropriate
- [ ] Line heights are comfortable

## 🐛 Error Handling

### Network Errors
- [ ] Firebase errors show user-friendly messages
- [ ] Failed auth shows error alert
- [ ] Console logs errors for debugging

### Invalid Data
- [ ] Invalid product ID redirects
- [ ] Empty cart shows appropriate message
- [ ] Missing user data handled gracefully

### Edge Cases
- [ ] Cart with 0 quantity items handled
- [ ] Very long product names don't break layout
- [ ] Large quantities calculate correctly
- [ ] Multiple rapid clicks don't break functionality

## ⚡ Performance

### Load Times
- [ ] Home page loads quickly
- [ ] Images load progressively
- [ ] No blocking JavaScript
- [ ] Smooth scrolling

### Interactions
- [ ] Search is instant (< 100ms)
- [ ] Filter changes are immediate
- [ ] Cart updates are instant
- [ ] No lag when clicking buttons

## 🔒 Security

### Authentication
- [ ] Passwords are masked
- [ ] Firebase handles auth securely
- [ ] Profile page requires login
- [ ] No sensitive data in console

### Data Storage
- [ ] Cart data in localStorage only
- [ ] No passwords stored locally
- [ ] Firebase config is public (expected)

## ✅ Final Checks

- [ ] No console errors on any page
- [ ] All images load successfully
- [ ] All links work correctly
- [ ] All buttons are functional
- [ ] Forms validate properly
- [ ] localStorage works
- [ ] Firebase auth works
- [ ] Cart persists correctly
- [ ] Responsive on all devices
- [ ] Cross-browser compatible

## 📊 Test Results

**Date Tested:** _______________

**Browser:** _______________

**Device:** _______________

**Issues Found:** _______________

**Status:** ⬜ Pass  ⬜ Fail

---

**Notes:**
_______________________________________
_______________________________________
_______________________________________