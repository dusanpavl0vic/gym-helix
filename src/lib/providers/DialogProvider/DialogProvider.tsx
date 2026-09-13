import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react';

import { Dialog } from '@/components/common/Dialog';

import { DialogContext, type DialogContextValue, type DialogOptions } from './DialogContext';

interface PendingDialog {
  options: DialogOptions;
  resolve: (key: string | null) => void;
}

export function DialogProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<PendingDialog | null>(null);
  const queue = useRef<PendingDialog[]>([]);
  const busy = useRef(false);

  const show = useCallback<DialogContextValue['show']>(
    (options) =>
      new Promise((resolve) => {
        const pending = { options, resolve };
        if (busy.current) {
          queue.current.push(pending);
          return;
        }
        busy.current = true;
        setCurrent(pending);
      }),
    [],
  );

  const close = useCallback((key: string | null) => {
    setCurrent((active) => {
      active?.resolve(key);
      const next = queue.current.shift() ?? null;
      busy.current = next !== null;
      return next;
    });
  }, []);

  const value = useMemo(() => ({ show }), [show]);

  return (
    <DialogContext.Provider value={value}>
      {children}
      <Dialog
        visible={current !== null}
        title={current?.options.title ?? ''}
        message={current?.options.message}
        icon={current?.options.icon}
        tone={current?.options.tone}
        actions={current?.options.actions ?? []}
        onAction={close}
        onDismiss={() => close(null)}
      />
    </DialogContext.Provider>
  );
}
