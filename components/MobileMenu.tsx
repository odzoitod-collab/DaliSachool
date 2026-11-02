'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowUpRight, X } from 'lucide-react';

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open && !element.open) { element.showModal(); document.body.style.overflow = 'hidden'; }
    if (!open && element.open) { element.close(); document.body.style.overflow = ''; trigger.current?.focus(); }
    return () => { document.body.style.overflow = ''; };
  }, [open]);
  const close = () => setOpen(false);
  return <div className="mobile-menu">
    <button ref={trigger} className="menu-trigger" type="button" aria-label="Відкрити меню" aria-haspopup="dialog" onClick={() => setOpen(true)}><span></span><span></span></button>
    <dialog ref={dialog} className="menu-dialog" aria-labelledby="menu-title" onCancel={(event) => { event.preventDefault(); close(); }}>
      <div className="menu-dialog-top"><button className="circle-button menu-back" type="button" aria-label="Повернутися до сайту" onClick={close}><ArrowLeft size={20}/></button><span id="menu-title">НАВІГАЦІЯ</span><button className="circle-button menu-close" type="button" aria-label="Закрити меню" onClick={close}><X size={21}/></button></div>
      <nav aria-label="Мобільна навігація" className="menu-links">
        <a onClick={close} href="#subjects"><span>01</span> Курси <ArrowUpRight/></a>
        <a onClick={close} href="#benefits"><span>02</span> Переваги <ArrowUpRight/></a>
        <a onClick={close} href="#how"><span>03</span> Як навчаємо <ArrowUpRight/></a>
        <a onClick={close} href="#faq"><span>04</span> Запитання <ArrowUpRight/></a>
      </nav>
      <div className="menu-bottom"><p>Готуємося до НМТ<br/><strong>і рухаємося далі.</strong></p><a onClick={close} className="button button-dark" href="#contact">Залишити заявку <ArrowUpRight size={18}/></a><small>МАТЕМАТИКА · УКРАЇНСЬКА МОВА</small></div>
    </dialog>
  </div>;
}
