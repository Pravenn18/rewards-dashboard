import { transactions } from '@/data/transactions';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { pointsToRedeem, categoryId } = await req.json();
  const totalPoints = transactions.reduce((sum, t) => sum + t.points, 0);

  if (pointsToRedeem > totalPoints) {
    return NextResponse.json({ error: 'Insufficient points' }, { status: 400 });
  }

  transactions.push({
    id: (transactions.length + 1).toString(),
    points: -pointsToRedeem,
    category: categoryId,
    date: new Date().toISOString(),
  });

  return NextResponse.json({ success: true, newPointsBalance: totalPoints - pointsToRedeem });
}
