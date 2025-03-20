const { test, expect } = require('@playwright/test');
const fs = require('fs');

test('Validate multiple products from BigW API', async ({ request }) => {
    // Read test data from JSON file
    const testData = JSON.parse(fs.readFileSync('product.json', 'utf-8'));

    for (const product of testData.products) {
        const { productCode, state, expectedResults } = product;

        // Construct API URL dynamically
        const apiUrl = `https://api.bigw.com.au/api/pricing/v0/product/${productCode}?state=${state}`;
        console.log(`📌 Requesting: ${apiUrl}`);

        // Make API request
        const response = await request.get(apiUrl);
        expect(response.status()).toBe(200);

        // Convert response to JSON
        const responseData = await response.json();
        console.log(`🔹 API Response for ${productCode}:`, JSON.stringify(responseData, null, 2));

        // Extract product data
        const productData = responseData.products?.[productCode];
        expect(productData).toBeTruthy();

        // ✅ Validate All Expected Fields
        expect(productData).toHaveProperty('productCode', productCode);
        expect(productData.priceRange?.min?.amount).toBe(expectedResults.priceRange.min.amount);
        expect(productData.priceRange?.max).toBe(expectedResults.priceRange.max);
        expect(productData.savingsRange?.min?.amount).toBe(expectedResults.savingsRange.min.amount);
        expect(productData.savingsRange?.max).toBe(expectedResults.savingsRange.max);
        expect(productData.unitPrice).toStrictEqual(expectedResults.unitPrice);

        // ✅ Validate Promo Details
        expect(productData).toHaveProperty('promo');
        expect(productData.promo).toHaveProperty('label', expectedResults.promo.label);
        expect(productData.promo).toHaveProperty('colourCode', expectedResults.promo.colourCode);
        expect(productData.promo).toHaveProperty('messages', expectedResults.promo.messages);
        expect(productData.promo).toHaveProperty('promoMessages', expectedResults.promo.promoMessages);
        expect(productData.promo).toHaveProperty('promoLabel', expectedResults.promo.promoLabel);
        expect(productData.promo).toHaveProperty('rrrpromoMessagePresent', expectedResults.promo.rrrpromoMessagePresent);
        expect(productData.promo).toHaveProperty('onlineOnlyPromotion', expectedResults.promo.onlineOnlyPromotion);

        // ✅ Validate Payment Options
        expect(productData.afterPay?.amount).toBe(expectedResults.afterPay.amount);
        expect(productData.eligibleForZipPay).toBe(expectedResults.eligibleForZipPay);

        // ✅ Validate Delivery and Pricing Details
        expect(productData.minDeliveryCost).toBe(expectedResults.minDeliveryCost);
        expect(productData.potentialPromotions).toStrictEqual(expectedResults.potentialPromotions);
        expect(productData.rrp).toBe(expectedResults.rrp);
        expect(productData.wasPrice).toBe(expectedResults.wasPrice);
        expect(productData.wasPriceDate).toBe(expectedResults.wasPriceDate);

        console.log(`✅ All validations passed for product ${productCode}!\n`);
    }
});
