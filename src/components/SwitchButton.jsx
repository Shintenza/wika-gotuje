'use client';
import { usePathname, useRouter } from 'next/navigation';

export default function SwitchButton({ active, option, children }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <button
      className={`switch_button ${active ? 'switch_button_active' : ''}`}
      onClick={() => {
        if (active) return;
        const params = new URLSearchParams();
        params.set('mode', option);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        router.refresh();
      }}
    >
      {children}
    </button>
  );
}
