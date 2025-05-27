import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  console.log("email", email)

  if (!email || !password) {
    return NextResponse.json({ message: 'Phone number and OTP are required.' }, { status: 400 });
  }
  try {
    if (email === 'test@example.com' && password === '123456') {
        const token = 'ey.mocked.jwt.token.abc123';
        const user = { id: '123', name: 'Test User', email };
        return NextResponse.json({ message: 'Login successfull', token: token, user: user}, { status: 200 });
    }     
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to send OTP', error }, { status: 500 });
  }
}