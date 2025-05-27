import { categories } from '@/data/categories';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ categories });
}
