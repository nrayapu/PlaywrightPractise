import { test, expect } from '@playwright/test';
import fs from 'fs';

// Load test data
const testData = JSON.parse(fs.readFileSync('product.json', 'utf-8'));

test.describe('API Validation - Product Pricing', () => {
  testData.products.forEach((product) => {
    test(`Validate all fields for product ${product.productCode}`, async ({ request }) => {
      // Construct API URL
      const apiUrl = `https://api.bigw.com.au/api/pricing/v0/product/${product.productCode}?state=${product.state || 'NSW'}`;
      
      // Send API Request
      const response = await request.get(apiUrl);
      expect(response.ok()).toBeTruthy(); // Check API response is successful
      
      // Get JSON Response
      const productData = await response.json();

      // ✅ Extract the correct product object
      const productResponse = productData.products[product.productCode]; 
      expect(productResponse).toBeTruthy(); // Ensure we have the expected product

      // ✅ Validate product-level fields
      expect(productResponse).toHaveProperty('productCode', product.productCode);
      //expect(productResponse).toHaveProperty('state', product.state);

      // ✅ Validate priceRange
      expect(productResponse.priceRange?.min?.amount ?? null).toBe(product.priceRange.min?.amount ?? null);
      expect(productResponse.priceRange?.max ?? null).toBe(product.priceRange.max ?? null);

      // ✅ Validate savingsRange
      expect(productResponse.savingsRange?.min?.amount ?? null).toBe(product.savingsRange.min?.amount ?? null);
      expect(productResponse.savingsRange?.max ?? null).toBe(product.savingsRange.max ?? null);

      // ✅ Validate unitPrice
      expect(productResponse.unitPrice ?? null).toBe(product.unitPrice ?? null);

      // ✅ Validate promo fields
      expect(productResponse.promo?.label ?? null).toBe(product.promo.label ?? null);
      expect(productResponse.promo?.colourCode ?? null).toBe(product.promo.colourCode ?? null);
      expect(productResponse.promo?.messages ?? null).toBe(product.promo.messages ?? null);
      expect(productResponse.promo?.promoMessages ?? null).toBe(product.promo.promoMessages ?? null);
      expect(productResponse.promo?.promoLabel ?? false).toBe(product.promo.promoLabel ?? false);
      expect(productResponse.promo?.rrrpromoMessagePresent ?? false).toBe(product.promo.rrrpromoMessagePresent ?? false);
      expect(productResponse.promo?.onlineOnlyPromotion ?? false).toBe(product.promo.onlineOnlyPromotion ?? false);

      // ✅ Validate afterPay
      expect(productResponse.afterPay?.amount ?? null).toBe(product.afterPay.amount ?? null);

      // ✅ Validate eligibility
      expect(productResponse.eligibleForZipPay ?? false).toBe(product.eligibleForZipPay ?? false);

      // ✅ Validate minDeliveryCost
      expect(productResponse.minDeliveryCost ?? null).toBe(product.minDeliveryCost ?? null);

      // ✅ Validate potentialPromotions
      expect(productResponse.potentialPromotions ?? []).toEqual(product.potentialPromotions ?? []);

      // ✅ Validate rrp
      expect(productResponse.rrp ?? null).toBe(product.rrp ?? null);

      // ✅ Validate wasPrice
      expect(productResponse.wasPrice ?? null).toBe(product.wasPrice ?? null);

      // ✅ Validate wasPriceDate
      expect(productResponse.wasPriceDate ?? null).toBe(product.wasPriceDate ?? null);
    });
  });
});
