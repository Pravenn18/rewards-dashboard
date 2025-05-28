import { admin } from '@/lib/firebaseAdmin';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { token, title, body } = await req.json();

    if (!token || !title || !body) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const message = {
      token,
      notification: {
        title,
        body,
      },
    };

    const response = await admin.messaging().send(message);
    return NextResponse.json({ success: true, id: response });
  } catch (error: any) {
    console.error('FCM Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
