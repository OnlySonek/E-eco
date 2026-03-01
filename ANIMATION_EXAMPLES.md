# 🎨 Animation Examples & Code Snippets

## 📚 دليل الأمثلة الكاملة

### 1️⃣ Basic Animations

#### Fade In
```javascript
gsap.from('.element', {
    opacity: 0,
    duration: 1,
    ease: 'power2.out'
});
```

#### Slide In
```javascript
gsap.from('.element', {
    x: -100,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
});
```

#### Scale Up
```javascript
gsap.from('.element', {
    scale: 0,
    duration: 0.6,
    ease: 'back.out(1.7)'
});
```

#### Rotate
```javascript
gsap.to('.element', {
    rotation: 360,
    duration: 1,
    ease: 'power2.inOut'
});
```

### 2️⃣ Advanced Animations

#### Stagger Effect
```javascript
gsap.from('.items', {
    y: 50,
    opacity: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: 'power2.out'
});
```

#### Timeline Animation
```javascript
const tl = gsap.timeline();
tl.from('.title', { y: -50, opacity: 0, duration: 0.8 })
  .from('.subtitle', { y: 30, opacity: 0, duration: 0.6 }, '-=0.4')
  .from('.button', { scale: 0, duration: 0.4 }, '-=0.2');
```

#### Scroll Trigger
```javascript
gsap.from('.element', {
    scrollTrigger: {
        trigger: '.element',
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1
    },
    x: -200,
    opacity: 0
});
```

### 3️⃣ Hover Animations

#### Product Card Hover
```javascript
card.addEventListener('mouseenter', () => {
    gsap.to(card, {
        y: -10,
        boxShadow: '0 25px 50px rgba(59, 130, 246, 0.4)',
        duration: 0.3
    });
});

card.addEventListener('mouseleave', () => {
    gsap.to(card, {
        y: 0,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        duration: 0.3
    });
});
```

#### Button Hover
```javascript
button.addEventListener('mouseenter', () => {
    gsap.to(button, {
        scale: 1.05,
        duration: 0.2
    });
});
```

### 4️⃣ Special Effects

#### Floating Animation
```javascript
gsap.to('.element', {
    y: -10,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
});
```

#### Pulse Effect
```javascript
gsap.to('.element', {
    scale: 1.1,
    duration: 1,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
});
```

#### Shake Effect
```javascript
gsap.to('.element', {
    x: -10,
    duration: 0.1,
    repeat: 5,
    yoyo: true
});
```

### 5️⃣ Page Transitions

#### Fade In Page
```javascript
gsap.from('body', {
    opacity: 0,
    duration: 0.5,
    ease: 'power2.out'
});
```

#### Slide In Page
```javascript
gsap.from('.container', {
    x: 100,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
});
```

### 6️⃣ Toast Notifications

#### Slide Up Toast
```javascript
gsap.fromTo('.toast',
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
);
```

#### Fade Out Toast
```javascript
gsap.to('.toast', {
    opacity: 0,
    y: -20,
    duration: 0.3,
    delay: 3
});
```

### 7️⃣ Loading Animations

#### Spinner
```javascript
gsap.to('.spinner', {
    rotation: 360,
    duration: 1,
    repeat: -1,
    ease: 'linear'
});
```

#### Progress Bar
```javascript
gsap.to('.progress', {
    width: '100%',
    duration: 2,
    ease: 'power2.out'
});
```

### 8️⃣ Modal Animations

#### Modal Open
```javascript
gsap.fromTo('.modal',
    { scale: 0.8, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }
);
```

#### Modal Close
```javascript
gsap.to('.modal', {
    scale: 0.8,
    opacity: 0,
    duration: 0.2
});
```

### 9️⃣ Menu Animations

#### Dropdown Menu
```javascript
gsap.from('.menu-item', {
    y: -20,
    opacity: 0,
    duration: 0.3,
    stagger: 0.1
});
```

#### Hamburger Menu
```javascript
const tl = gsap.timeline();
tl.to('.line1', { rotation: 45, y: 8, duration: 0.3 })
  .to('.line2', { opacity: 0, duration: 0.2 }, '-=0.3')
  .to('.line3', { rotation: -45, y: -8, duration: 0.3 }, '-=0.3');
```

### 🔟 Cart Animations

#### Add to Cart
```javascript
gsap.fromTo('.cart-item',
    { scale: 0, x: -50 },
    { scale: 1, x: 0, duration: 0.5, ease: 'back.out(1.7)' }
);
```

#### Remove from Cart
```javascript
gsap.to('.cart-item', {
    x: 100,
    opacity: 0,
    duration: 0.3,
    onComplete: () => element.remove()
});
```

## 🎯 Complete Examples

### Example 1: Product Card Animation
```javascript
// HTML
<div class="product-card">
    <img src="product.jpg" alt="Product">
    <h3>Product Name</h3>
    <p class="price">$99</p>
    <button>Add to Cart</button>
</div>

// JavaScript
const card = document.querySelector('.product-card');

// Initial animation
gsap.from(card, {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
});

// Hover animation
card.addEventListener('mouseenter', () => {
    gsap.to(card, {
        y: -10,
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        duration: 0.3
    });
    
    gsap.to(card.querySelector('img'), {
        scale: 1.1,
        duration: 0.3
    });
});

card.addEventListener('mouseleave', () => {
    gsap.to(card, {
        y: 0,
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
        duration: 0.3
    });
    
    gsap.to(card.querySelector('img'), {
        scale: 1,
        duration: 0.3
    });
});
```

### Example 2: Hero Section Animation
```javascript
const tl = gsap.timeline({ delay: 0.5 });

tl.from('.hero h1', {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
})
.from('.hero p', {
    y: 50,
    opacity: 0,
    duration: 0.8
}, '-=0.5')
.from('.hero button', {
    scale: 0,
    opacity: 0,
    duration: 0.6,
    ease: 'back.out(1.7)'
}, '-=0.3');
```

### Example 3: Scroll-Triggered Section
```javascript
gsap.from('.section', {
    scrollTrigger: {
        trigger: '.section',
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse'
    },
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2
});
```

## 🎨 CSS Animations (Complementary)

### Keyframes
```css
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes float {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
}

@keyframes pulse {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
}
```

### Usage
```css
.element {
    animation: fadeIn 1s ease-out;
}

.floating {
    animation: float 3s ease-in-out infinite;
}

.pulsing {
    animation: pulse 2s ease-in-out infinite;
}
```

## 🔧 Best Practices

### 1. Performance
```javascript
// Good: Use transforms
gsap.to('.element', { x: 100, y: 50 });

// Avoid: Use position properties
gsap.to('.element', { left: 100, top: 50 });
```

### 2. Easing
```javascript
// Smooth entrance
ease: 'power3.out'

// Bouncy effect
ease: 'back.out(1.7)'

// Elastic effect
ease: 'elastic.out(1, 0.3)'
```

### 3. Timing
```javascript
// Quick interactions
duration: 0.3

// Standard animations
duration: 0.6

// Dramatic effects
duration: 1.2
```

## 📱 Responsive Animations

```javascript
// Different animations for mobile
if (window.innerWidth < 768) {
    gsap.from('.element', {
        y: 30,
        duration: 0.5
    });
} else {
    gsap.from('.element', {
        x: -100,
        duration: 0.8
    });
}
```

## 🎯 Tips & Tricks

1. **Use timelines for complex sequences**
2. **Add stagger for multiple elements**
3. **Use ScrollTrigger for scroll animations**
4. **Keep animations under 1 second for UI**
5. **Test on different devices**
6. **Use ease functions wisely**
7. **Avoid animating too many elements at once**

---

**Happy Animating! 🎨**
