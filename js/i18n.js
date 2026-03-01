// Internationalization Module - Arabic & English (Production - No Console)
(function() {
    const translations = {
        en: {
            'nav.home': 'Home',
            'nav.products': 'All Products',
            'nav.pcbuilder': 'PC Builder',
            'nav.deals': 'Deals',
            'nav.contact': 'Contact',
            'nav.search': 'Search products...',
            'nav.login': 'Login',
            'nav.cart': 'Cart',
            'hero.laptops.title': 'Premium Laptops',
            'hero.laptops.subtitle': 'Power meets portability',
            'hero.laptops.cta': 'Shop Now',
            'hero.gaming.title': 'Gaming Gear',
            'hero.gaming.subtitle': 'Elevate your setup',
            'hero.gaming.cta': 'Explore',
            'hero.monitors.title': '4K Monitors',
            'hero.monitors.subtitle': 'Crystal clear visuals',
            'hero.monitors.cta': 'Discover',
            'products.featured': 'Featured Products',
            'products.viewall': 'View All Products',
            'products.addtocart': 'Add to Cart',
            'products.loading': 'Loading products...',
            'products.noproducts': 'No products available',
            'categories.title': 'Shop by Category',
            'categories.laptops': 'Laptops',
            'categories.monitors': 'Monitors',
            'categories.keyboards': 'Keyboards',
            'categories.mice': 'Mice',
            'cart.added': 'Added to cart!',
            'cart.increased': 'Increased quantity',
            'cart.empty': 'Your cart is empty',
            'cart.total': 'Total',
            'cart.checkout': 'Checkout',
            'cart.remove': 'Remove',
            'footer.rights': 'All rights reserved.',
            'msg.success': 'Success!',
            'msg.error': 'Error occurred',
            'msg.loading': 'Loading...',
            'product.price': 'Price',
            'product.category': 'Category',
            'product.stock': 'In Stock',
            'product.outofstock': 'Out of Stock',
            'product.description': 'Description',
            'product.specifications': 'Specifications',
            
            // Auth
            'auth.welcome': 'Welcome Back',
            'auth.email': 'Email',
            'auth.password': 'Password',
            'auth.confirm': 'Confirm Password',
            'auth.signin': 'Sign In',
            'auth.signup': 'Sign up',
            'auth.create': 'Create Account',
            'auth.createaccount': 'Create Account',
            'auth.or': 'or continue with',
            'auth.noaccount': "Don't have an account?",
            'auth.haveaccount': 'Already have an account?',
        },
        ar: {
            'nav.home': 'الرئيسية',
            'nav.products': 'جميع المنتجات',
            'nav.pcbuilder': 'بناء الكمبيوتر',
            'nav.deals': 'العروض',
            'nav.contact': 'اتصل بنا',
            'nav.search': 'ابحث عن المنتجات...',
            'nav.login': 'تسجيل الدخول',
            'nav.cart': 'السلة',
            'hero.laptops.title': 'لابتوبات مميزة',
            'hero.laptops.subtitle': 'القوة تلتقي بالحمل',
            'hero.laptops.cta': 'تسوق الآن',
            'hero.gaming.title': 'معدات الألعاب',
            'hero.gaming.subtitle': 'ارتقِ بإعدادك',
            'hero.gaming.cta': 'استكشف',
            'hero.monitors.title': 'شاشات 4K',
            'hero.monitors.subtitle': 'صور واضحة تماماً',
            'hero.monitors.cta': 'اكتشف',
            'products.featured': 'المنتجات المميزة',
            'products.viewall': 'عرض جميع المنتجات',
            'products.addtocart': 'أضف للسلة',
            'products.loading': 'جاري تحميل المنتجات...',
            'products.noproducts': 'لا توجد منتجات متاحة',
            'categories.title': 'تسوق حسب الفئة',
            'categories.laptops': 'لابتوبات',
            'categories.monitors': 'شاشات',
            'categories.keyboards': 'لوحات مفاتيح',
            'categories.mice': 'فأرات',
            'cart.added': 'تمت الإضافة للسلة!',
            'cart.increased': 'تم زيادة الكمية',
            'cart.empty': 'سلتك فارغة',
            'cart.total': 'الإجمالي',
            'cart.checkout': 'إتمام الشراء',
            'cart.remove': 'إزالة',
            'footer.rights': 'جميع الحقوق محفوظة.',
            'msg.success': 'نجح!',
            'msg.error': 'حدث خطأ',
            'msg.loading': 'جاري التحميل...',
            'product.price': 'السعر',
            'product.category': 'الفئة',
            'product.stock': 'متوفر',
            'product.outofstock': 'غير متوفر',
            'product.description': 'الوصف',
            'product.specifications': 'المواصفات',
            
            // Auth
            'auth.welcome': 'مرحباً بعودتك',
            'auth.email': 'البريد الإلكتروني',
            'auth.password': 'كلمة المرور',
            'auth.confirm': 'تأكيد كلمة المرور',
            'auth.signin': 'تسجيل الدخول',
            'auth.signup': 'إنشاء حساب',
            'auth.create': 'إنشاء حساب جديد',
            'auth.createaccount': 'إنشاء حساب',
            'auth.or': 'أو تابع باستخدام',
            'auth.noaccount': 'ليس لديك حساب؟',
            'auth.haveaccount': 'لديك حساب بالفعل؟',
        }
    };

    let currentLang = localStorage.getItem('media_lang') || 'en';

    window.t = function(key) {
        return translations[currentLang][key] || key;
    };

    window.getCurrentLang = function() {
        return currentLang;
    };

    window.setLanguage = function(lang) {
        if (!translations[lang]) return;
        
        currentLang = lang;
        localStorage.setItem('media_lang', lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        updatePageTranslations();
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    };

    function updatePageTranslations() {
        try {
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                const translation = window.t(key);
                
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            });
        } catch (e) {
            // Silent fail
        }
    }

    window.initI18n = function() {
        try {
            document.documentElement.lang = currentLang;
            document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
            createLanguageSwitcher();
            updatePageTranslations();
        } catch (e) {
            // Silent fail
        }
    };

    function createLanguageSwitcher() {
        try {
            const navbar = document.querySelector('.navbar-glass .flex.items-center.space-x-4');
            if (!navbar || document.getElementById('langSwitcher')) return;
            
            const langSwitcher = document.createElement('button');
            langSwitcher.id = 'langSwitcher';
            langSwitcher.className = 'nav-icon-btn flex items-center gap-2';
            langSwitcher.title = 'Switch Language';
            langSwitcher.innerHTML = `
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
                </svg>
                <span class="hidden md:inline text-sm font-medium">${currentLang === 'ar' ? 'EN' : 'ع'}</span>
            `;
            
            langSwitcher.addEventListener('click', toggleLanguage);
            
            const themeToggle = document.getElementById('themeToggle');
            if (themeToggle) {
                navbar.insertBefore(langSwitcher, themeToggle);
            } else {
                navbar.insertBefore(langSwitcher, navbar.firstChild);
            }
        } catch (e) {
            // Silent fail
        }
    }

    function toggleLanguage() {
        try {
            const newLang = currentLang === 'en' ? 'ar' : 'en';
            window.setLanguage(newLang);
            
            const langSwitcher = document.getElementById('langSwitcher');
            if (langSwitcher) {
                const span = langSwitcher.querySelector('span');
                if (span) {
                    span.textContent = newLang === 'ar' ? 'EN' : 'ع';
                }
            }
            
            window.location.reload();
        } catch (e) {
            // Silent fail
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', window.initI18n);
    } else {
        window.initI18n();
    }
})();
