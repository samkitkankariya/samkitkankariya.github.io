# Analytics Setup Guide for GitHub Pages

## Google Analytics 4 Setup

### Step 1: Create Google Analytics Account
1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click "Start measuring"
4. Create an account name (e.g., "Samkit Portfolio")
5. Choose data sharing settings

### Step 2: Set Up Property
1. Property name: "samkitkankariya.github.io"
2. Reporting time zone: Choose your timezone
3. Currency: Choose your preferred currency
4. Click "Next"

### Step 3: Business Information
1. Industry category: "Technology" or "Professional Services"
2. Business size: Select appropriate size
3. How you intend to use Google Analytics: Select relevant options
4. Click "Create"

### Step 4: Accept Terms of Service
1. Select your country/territory
2. Read and accept the Google Analytics Terms of Service
3. Accept Data Processing Terms

### Step 5: Set Up Data Stream
1. Choose "Web"
2. Website URL: `https://samkitkankariya.github.io`
3. Stream name: "Portfolio Website"
4. Click "Create stream"

### Step 6: Get Your Measurement ID
1. After creating the stream, you'll see your **Measurement ID** (format: G-XXXXXXXXXX)
2. Copy this ID

### Step 7: Update Your Website
1. Open `index.html`
2. Find the line: `<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>`
3. Replace `GA_MEASUREMENT_ID` with your actual Measurement ID
4. Also replace `GA_MEASUREMENT_ID` in the `gtag('config', 'GA_MEASUREMENT_ID');` line
5. Save and commit the changes

### Example:
```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ABC123DEF4"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-ABC123DEF4');
</script>
```

## What You'll Be Able to Track

### Real-time Data
- Current active users
- Page views in real-time
- Traffic sources
- Geographic location of visitors

### Audience Reports
- User demographics (age, gender, interests)
- Geographic data (countries, cities)
- Technology (browsers, operating systems, devices)
- New vs. returning visitors

### Acquisition Reports
- How users find your site (organic search, direct, referral, social)
- Search engine optimization insights
- Campaign tracking (if you run ads)

### Behavior Reports
- Most popular pages
- User flow through your site
- Time spent on pages
- Bounce rate

### Conversion Tracking
- Set up goals (e.g., contact form submissions, email clicks)
- Track specific user actions
- Measure engagement

## GitHub Repository Insights (Alternative/Additional)

### Access Built-in GitHub Analytics:
1. Go to your repository: `https://github.com/samkitkankariya/samkitkankariya.github.io`
2. Click on "Insights" tab
3. Click on "Traffic" in the left sidebar
4. View:
   - Unique visitors (last 14 days)
   - Page views (last 14 days)
   - Popular content
   - Referring sites

### Limitations:
- Only 14 days of data
- Limited metrics
- No demographic information
- No real-time data

## Privacy Considerations

### Google Analytics 4 Features:
- Cookieless tracking options
- Enhanced privacy controls
- GDPR compliance features
- Data retention controls

### Optional: Add Privacy Notice
Consider adding a privacy notice to your website footer:

```html
<p class="privacy-notice">
    This website uses Google Analytics to understand how visitors interact with the site. 
    <a href="/privacy-policy">Privacy Policy</a>
</p>
```

## Viewing Your Analytics

### Google Analytics Dashboard:
1. Go to [analytics.google.com](https://analytics.google.com)
2. Select your property
3. Explore different reports:
   - **Realtime**: See current activity
   - **Audience**: Understand your visitors
   - **Acquisition**: See how people find you
   - **Behavior**: Understand what people do on your site

### Mobile App:
- Download "Google Analytics" app for iOS/Android
- Monitor your site stats on the go

## Tips for Better Analytics

1. **Set up Goals**: Track important actions (contact form submissions, project clicks)
2. **Use UTM Parameters**: Track specific campaigns or links
3. **Regular Monitoring**: Check your analytics weekly
4. **Understand Your Audience**: Use insights to improve your content
5. **Track Trends**: Look for patterns in visitor behavior

## Troubleshooting

### If Analytics Isn't Working:
1. Check that your Measurement ID is correct
2. Ensure the code is in the `<head>` section
3. Wait 24-48 hours for data to appear
4. Use Google Analytics Debugger browser extension
5. Check browser console for JavaScript errors

### Testing Your Setup:
1. Visit your website
2. Go to Google Analytics → Realtime → Overview
3. You should see your visit appear within a few minutes

---

**Note**: After implementing Google Analytics, it may take 24-48 hours before you start seeing comprehensive data in your reports. 