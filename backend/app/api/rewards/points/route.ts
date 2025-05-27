import { NextRequest, NextResponse } from 'next/server';
import { transactions } from '@/data/transactions';

export async function GET(req: NextRequest) {
  const totalPoints = transactions.reduce((sum, t) => sum + t.points, 0);
  return NextResponse.json({ points: totalPoints });
}
