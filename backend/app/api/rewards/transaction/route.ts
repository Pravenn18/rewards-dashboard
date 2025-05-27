import { NextRequest, NextResponse } from 'next/server';
import { transactions } from '@/data/transactions';

export async function GET(req: NextRequest) {
  const latestData = transactions.slice(0, 10);
  return NextResponse.json({ transactions: latestData });
}
