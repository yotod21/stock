# Demo Data for Stock Management System

This project includes static demo data that can be used for frontend display and testing.

## How to Use Demo Data

### Option 1: Automatic Fallback (Default)
The components automatically fall back to demo data if the API is unavailable or returns an error. This happens by default.

### Option 2: Force Demo Mode
To force demo mode, create a `.env` file in the `Client` directory with:

```
REACT_APP_USE_DEMO_DATA=true
```

## Demo Data Includes

### Products (8 items)
- Electronics: Laptops, Mice, Printers, USB cables
- Furniture: Office chairs, Desk lamps
- Food & Beverages: Coffee beans
- Stationery: Notebook sets

### Stores (3 locations)
- Main Store Downtown
- Branch Store North
- Warehouse South

### Sales Records (5 transactions)
- Various product sales with dates, quantities, and totals

### Transfers (3 transfers)
- Product transfers between stores

### Admins (3 users)
- Admin accounts with usernames and emails

### Low Stock Products (2 items)
- Products with quantity less than 5

## File Structure

- `Client/src/data/demoData.js` - Contains all demo data exports
- Components automatically import and use demo data when needed

## Notes

- Demo data is read-only and won't be saved to the database
- When using demo data, form submissions (add/edit/delete) will show success messages but won't persist
- To use real data, ensure the backend API is running on `http://localhost:3002`

