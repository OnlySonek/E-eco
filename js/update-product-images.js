// Script to update upload-products.js with real Unsplash images
import { productImages } from './product-images.js';

// This will be used to update the products array in upload-products.js
// Copy the updated products array and paste it into upload-products.js

export function updateProductsWithImages(products) {
    return products.map((product, index) => {
        const categoryImages = productImages[product.category];
        if (categoryImages) {
            const imageIndex = products.filter(p => p.category === product.category).indexOf(product);
            product.image = categoryImages[imageIndex % categoryImages.length];
        }
        return product;
    });
}

console.log('✅ Image updater ready');
