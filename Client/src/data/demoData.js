// Demo/Static data for frontend display
export const demoProducts = [
    {
        id: 1,
        product_name: "Laptop Dell XPS 15",
        catagory: "Electronics",
        quantity: 25,
        price: 1299.99,
        expiered_date: "2025-12-31",
        store_id: "1"
    },
    {
        id: 2,
        product_name: "Wireless Mouse",
        catagory: "Electronics",
        quantity: 150,
        price: 29.99,
        expiered_date: "2025-06-30",
        store_id: "1"
    },
    {
        id: 3,
        product_name: "Office Chair Ergonomic",
        catagory: "Furniture",
        quantity: 45,
        price: 249.99,
        expiered_date: null,
        store_id: "2"
    },
    {
        id: 4,
        product_name: "Coffee Beans Premium",
        catagory: "Food & Beverages",
        quantity: 3,
        price: 19.99,
        expiered_date: "2024-03-15",
        store_id: "1"
    },
    {
        id: 5,
        product_name: "Notebook Set",
        catagory: "Stationery",
        quantity: 200,
        price: 12.50,
        expiered_date: null,
        store_id: "2"
    },
    {
        id: 6,
        product_name: "Printer HP LaserJet",
        catagory: "Electronics",
        quantity: 8,
        price: 349.99,
        expiered_date: "2025-08-20",
        store_id: "1"
    },
    {
        id: 7,
        product_name: "Desk Lamp LED",
        catagory: "Furniture",
        quantity: 2,
        price: 45.00,
        expiered_date: null,
        store_id: "2"
    },
    {
        id: 8,
        product_name: "USB-C Cable",
        catagory: "Electronics",
        quantity: 75,
        price: 15.99,
        expiered_date: "2026-01-01",
        store_id: "1"
    }
];

export const demoStores = [
    {
        id: 1,
        store_name: "Main Store Downtown",
        address: "123 Main Street, City Center, 10001"
    },
    {
        id: 2,
        store_name: "Branch Store North",
        address: "456 North Avenue, North District, 20002"
    },
    {
        id: 3,
        store_name: "Warehouse South",
        address: "789 South Boulevard, Industrial Area, 30003"
    }
];

export const demoSales = [
    {
        id: 1,
        date: "2024-01-15",
        product_name: "Laptop Dell XPS 15",
        selling_price: 1299.99,
        selled_quantity: 2,
        total: 2599.98
    },
    {
        id: 2,
        date: "2024-01-16",
        product_name: "Wireless Mouse",
        selling_price: 29.99,
        selled_quantity: 10,
        total: 299.90
    },
    {
        id: 3,
        date: "2024-01-17",
        product_name: "Office Chair Ergonomic",
        selling_price: 249.99,
        selled_quantity: 3,
        total: 749.97
    },
    {
        id: 4,
        date: "2024-01-18",
        product_name: "Coffee Beans Premium",
        selling_price: 19.99,
        selled_quantity: 5,
        total: 99.95
    },
    {
        id: 5,
        date: "2024-01-19",
        product_name: "Notebook Set",
        selling_price: 12.50,
        selled_quantity: 20,
        total: 250.00
    }
];

export const demoTransfers = [
    {
        id: 1,
        tdate: "2024-01-10",
        from_store: "Main Store Downtown",
        to_store: "Branch Store North",
        product_id: "1"
    },
    {
        id: 2,
        tdate: "2024-01-12",
        from_store: "Branch Store North",
        to_store: "Warehouse South",
        product_id: "3"
    },
    {
        id: 3,
        tdate: "2024-01-14",
        from_store: "Main Store Downtown",
        to_store: "Branch Store North",
        product_id: "5"
    }
];

export const demoAdmins = [
    {
        id: 1,
        username: "admin",
        email: "admin@stockmanagement.com"
    },
    {
        id: 2,
        username: "manager1",
        email: "manager1@stockmanagement.com"
    },
    {
        id: 3,
        username: "supervisor",
        email: "supervisor@stockmanagement.com"
    }
];

export const demoLowProducts = [
    {
        id: 4,
        product_name: "Coffee Beans Premium",
        catagory: "Food & Beverages",
        quantity: 3,
        price: 19.99,
        store_id: "1"
    },
    {
        id: 7,
        product_name: "Desk Lamp LED",
        catagory: "Furniture",
        quantity: 2,
        price: 45.00,
        store_id: "2"
    }
];

// Helper function to check if we should use demo data
export const USE_DEMO_DATA = process.env.REACT_APP_USE_DEMO_DATA === 'true' || 
                             !process.env.REACT_APP_API_URL;

