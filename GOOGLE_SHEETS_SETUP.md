# Google Sheets Integration Setup

To save orders to Google Sheets, follow these steps:

## Option 1: Using Google Apps Script (Recommended - Easiest)

1. **Create a Google Sheet:**
   - Go to [Google Sheets](https://sheets.google.com)
   - Create a new sheet
   - Add these column headers in the first row:
     ```
     Full Name | Email | Phone | Address | City | State | Pincode | Location | Notes | Items | Subtotal | Delivery Charge | Total | Order Date
     ```

2. **Create a Google Apps Script:**
   - In your Google Sheet, go to `Extensions` → `Apps Script`
   - Delete any existing code and paste this:

   ```javascript
   function doPost(e) {
     try {
       const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
       
       // Parse the JSON data
       const data = JSON.parse(e.postData.contents);
       
       // Add a new row with the order data
       sheet.appendRow([
         data['Full Name'] || '',
         data['Email'] || '',
         data['Phone'] || '',
         data['Address'] || '',
         data['City'] || '',
         data['State'] || '',
         data['Pincode'] || '',
         data['Location'] || '',
         data['Notes'] || '',
         data['Items'] || '',
         data['Subtotal'] || 0,
         data['Delivery Charge'] || 0,
         data['Total'] || 0,
         data['Order Date'] || new Date()
       ]);
       
       return ContentService.createTextOutput(JSON.stringify({success: true}))
         .setMimeType(ContentService.MimeType.JSON);
     } catch (error) {
       return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()}))
         .setMimeType(ContentService.MimeType.JSON);
     }
   }
   ```

3. **Deploy as Web App:**
   - Click `Deploy` → `New deployment`
   - Click the gear icon (⚙️) next to "Select type" and choose "Web app"
   - Set:
     - Description: "Order submission endpoint"
     - **Execute as: "Me"** (Recommended - see explanation below)
     - Who has access: "Anyone" (or "Anyone with Google account" for more security)
   - Click "Deploy"
   - Copy the Web App URL

   **About "Execute as" options:**
   
   - **"Me" (Recommended):** 
     - The script runs with YOUR permissions (the person who deployed it)
     - Works perfectly for anonymous POST requests from your web app
     - No authorization required from users placing orders
     - The script writes to YOUR Google Sheet using YOUR credentials
     - ✅ **Use this option for your order submission system**
   
   - **"User accessing the web app":**
     - The script runs with the permissions of the person making the request
     - Requires each user to authorize the script (not practical for anonymous orders)
     - Only works if the user is authenticated with Google
     - ❌ **Not recommended** for this use case because:
       - Your React app sends anonymous POST requests (no authenticated user)
       - Users would need to sign in and authorize, which breaks the flow
       - More complex and unnecessary for this scenario

4. **Add the URL to your project:**
   - Create a `.env` file in the root of your project (if it doesn't exist)
   - Add:
     ```
     VITE_GOOGLE_SHEETS_URL=your_web_app_url_here
     ```
   - Restart your development server

## Option 2: Using Google Sheets API (Advanced)

This requires OAuth setup and API credentials. See the `saveOrderToGoogleSheetsAPI` function in `src/utils/googleSheets.ts` for implementation details.

## Testing

After setup, when a user places an order, it will automatically be saved to your Google Sheet.

