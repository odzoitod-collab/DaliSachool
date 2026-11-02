import { NextResponse } from 'next/server';
import { getPool } from '@/lib/db';

export const runtime = 'nodejs';
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
    const subject = typeof body.subject === 'string' ? body.subject : '';
    if (name.length < 2 || name.length > 100 || !/^[+\d\s()\-]{10,25}$/.test(phone) || !['Математика', 'Українська мова', 'Обидва предмети'].includes(subject)) {
      return NextResponse.json({ error: 'Перевірте ім’я, номер телефону та предмет.' }, { status: 400 });
    }
    const pool = getPool();
    await pool.query(`CREATE TABLE IF NOT EXISTS leads (id BIGSERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, phone VARCHAR(25) NOT NULL, subject VARCHAR(50) NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`);
    await pool.query('INSERT INTO leads (name, phone, subject) VALUES ($1, $2, $3)', [name, phone, subject]);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error('Could not save lead:', error);
    return NextResponse.json({ error: 'Не вдалося надіслати заявку. Спробуйте ще раз пізніше.' }, { status: 500 });
  }
}
