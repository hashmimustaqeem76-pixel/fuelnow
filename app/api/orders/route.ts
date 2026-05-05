// In-memory storage for MVP - replace with database for production
let orders: any[] = [];

const fuelPrices: { [key: string]: number } = {
  petrol: 280,
  diesel: 250,
  cng: 150,
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { location, fuelType, quantity, paymentMethod, totalPrice } = body;

    // Basic validation
    if (!location || !fuelType || !quantity || !paymentMethod) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate fuel type and calculate price
    const pricePerLiter = fuelPrices[fuelType];
    if (!pricePerLiter) {
      return Response.json({ error: 'Invalid fuel type' }, { status: 400 });
    }

    const calculatedTotal = pricePerLiter * quantity;
    if (totalPrice !== calculatedTotal) {
      return Response.json({ error: 'Price mismatch' }, { status: 400 });
    }

    // Generate order ID
    const orderId = `FNP${Date.now()}`;

    const order = {
      id: orderId,
      location,
      fuelType,
      quantity,
      pricePerLiter,
      totalPrice,
      paymentMethod,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    orders.push(order);

    return Response.json({ orderId, message: 'Order created successfully' });
  } catch (error) {
    console.error('Error creating order:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Optional: GET to retrieve orders (for admin purposes)
export async function GET() {
  return Response.json({ orders });
}