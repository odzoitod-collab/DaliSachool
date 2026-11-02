'use client';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
export default function LeadForm() {
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');
  const [message, setMessage] = useState('');
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus('loading');
    const form = event.currentTarget; const data = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch('/api/leads', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      form.reset(); setStatus('success'); setMessage('Дякуємо! Вашу заявку отримано.');
    } catch (error) { setStatus('error'); setMessage(error instanceof Error ? error.message : 'Спробуйте ще раз.'); }
  }
  return <form className="lead-form" onSubmit={submit}>
    <label>Як вас звати?<input name="name" placeholder="Ваше ім’я" required minLength={2} maxLength={100}/></label>
    <label>Номер телефону<input name="phone" type="tel" placeholder="+380" required pattern="[+0-9\s()\-]{10,25}" title="Введіть номер телефону"/></label>
    <label>Що хочете вивчати?<select name="subject" defaultValue="" required><option value="" disabled>Оберіть предмет</option><option>Математика</option><option>Українська мова</option><option>Обидва предмети</option></select></label>
    <button className="button button-dark" disabled={status === 'loading'}>{status === 'loading' ? 'Надсилаємо…' : 'Залишити заявку'} <ArrowUpRight size={19}/></button>
    <p className="form-note">Натискаючи кнопку, ви погоджуєтеся на обробку контактних даних для зв’язку щодо навчання.</p>
    {message && <p role="status" className={status === 'error' ? 'form-error' : 'form-success'}>{message}</p>}
  </form>;
}
