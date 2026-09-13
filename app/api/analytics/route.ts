import { NextResponse } from 'next/server';
import { generateDashboardData } from '@/lib/mockData';

export async function GET() {
  const data = generateDashboardData();
  return NextResponse.json(data);
}
