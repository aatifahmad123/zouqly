/**
 * Google Sheets integration for saving orders
 * 
 * To use this, you need to:
 * 1. Create a Google Sheet with columns: Full Name, Email, Phone, Address, City, State, Pincode, Location, Notes, Items, Subtotal, Delivery Charge, Total, Order Date
 * 2. Create a Google Apps Script web app that accepts POST requests
 * 3. Set the GOOGLE_SHEETS_WEB_APP_URL environment variable or update the URL below
 */

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  weight: string;
}

interface OrderData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  location: string;
  notes: string;
  items: OrderItem[];
  subtotal: number;
  deliveryCharge: number;
  total: number;
  orderDate: string;
}

// Replace this with your Google Apps Script Web App URL
// You can also set it via environment variable: import.meta.env.VITE_GOOGLE_SHEETS_URL
const GOOGLE_SHEETS_WEB_APP_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL || '';

/**
 * Save order data to Google Sheets
 */
export async function saveOrderToGoogleSheets(orderData: OrderData): Promise<void> {
  if (!GOOGLE_SHEETS_WEB_APP_URL) {
    console.warn('Google Sheets URL not configured. Order data:', orderData);
    // In development, we'll just log the data
    // In production, you should set up the Google Sheets integration
    return;
  }

  try {
    // Format items as a readable string
    const itemsString = orderData.items
      .map(item => `${item.name} (${item.quantity}x ${item.weight}) - ₹${item.price * item.quantity}`)
      .join('; ');

    // Prepare data for Google Sheets
    const sheetData = {
      'Full Name': orderData.fullName,
      'Email': orderData.email,
      'Phone': orderData.phone,
      'Address': orderData.address,
      'City': orderData.city,
      'State': orderData.state,
      'Pincode': orderData.pincode,
      'Location': orderData.location,
      'Notes': orderData.notes,
      'Items': itemsString,
      'Subtotal': orderData.subtotal,
      'Delivery Charge': orderData.deliveryCharge,
      'Total': orderData.total,
      'Order Date': new Date(orderData.orderDate).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'short'
      })
    };

    const response = await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors', // Google Apps Script doesn't support CORS, so we use no-cors
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sheetData)
    });

    // With no-cors mode, we can't read the response, but the request is sent
    // The Google Apps Script will handle the data insertion
    console.log('Order data sent to Google Sheets');
  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    throw error;
  }
}

/**
 * Alternative: Save order using Google Sheets API directly
 * This requires OAuth setup and is more complex
 */
export async function saveOrderToGoogleSheetsAPI(orderData: OrderData, accessToken: string): Promise<void> {
  // This is an alternative implementation using Google Sheets API
  // Requires proper OAuth setup and API credentials
  const SPREADSHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID || '';
  const SHEET_NAME = 'Orders';

  if (!SPREADSHEET_ID) {
    throw new Error('Google Sheet ID not configured');
  }

  const itemsString = orderData.items
    .map(item => `${item.name} (${item.quantity}x ${item.weight}) - ₹${item.price * item.quantity}`)
    .join('; ');

  const values = [[
    orderData.fullName,
    orderData.email,
    orderData.phone,
    orderData.address,
    orderData.city,
    orderData.state,
    orderData.pincode,
    orderData.location,
    orderData.notes,
    itemsString,
    orderData.subtotal,
    orderData.deliveryCharge,
    orderData.total,
    new Date(orderData.orderDate).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short'
    })
  ]];

  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!A:append?valueInputOption=RAW`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: values
      })
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to save to Google Sheets: ${response.statusText}`);
  }
}

