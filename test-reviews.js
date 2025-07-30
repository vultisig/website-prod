// Test script to verify Google Play scraper works
async function testGooglePlayScraper() {
  try {
    console.log('Testing Google Play scraper...');
    
    const gplayModule = await import('google-play-scraper');
    console.log('Import successful');
    console.log('Available methods:', Object.keys(gplayModule.default));
    
    const reviews = await gplayModule.default.reviews({
      appId: 'com.vultisig.wallet',
      sort: 2, // NEWEST = 2
      num: 5,
      lang: 'en',
      country: 'us'
    });
    
    console.log('Reviews fetched successfully:', reviews.data.length);
    console.log('Sample review:', reviews.data[0]);
    
  } catch (error) {
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
  }
}

testGooglePlayScraper(); 