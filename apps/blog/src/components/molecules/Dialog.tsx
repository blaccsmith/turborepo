import { Dialog as HeadlessDialog, Transition } from '@headlessui/react';
import * as React from 'react';
import { XIcon } from '../atoms/Icons';

type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  initialFocus?: React.MutableRefObject<HTMLElement | null>;
};

export const Dialog = ({ isOpen, onClose, children, initialFocus }: DialogProps) => (
  <Transition.Root show={isOpen} as={React.Fragment}>
    <HeadlessDialog
      as="div"
      className="fixed inset-0 z-10 overflow-y-auto"
      onClose={onClose}
      initialFocus={initialFocus}
    >
      <div className="min-h-screen px-4 text-center">
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-50"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <HeadlessDialog.Overlay className="fixed inset-0 bg-gray-700 opacity-90 transition-opacity dark:bg-gray-900" />
        </Transition.Child>

        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-100"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-50"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="bg-primary mt-[15vh] mb-8 inline-block w-full max-w-md transform overflow-hidden rounded-lg text-left align-middle shadow-xl transition-all dark:border">
            {children}
          </div>
        </Transition.Child>
      </div>
    </HeadlessDialog>
  </Transition.Root>
);

export const DialogContent = ({ children }: { children: React.ReactNode }) => (
  <div className="px-6 pt-6 pb-12">{children}</div>
);

export const DialogActions = ({ children }: { children: React.ReactNode }) => (
  <div className="flex gap-4 border-t px-6 py-4">{children}</div>
);

export const DialogTitle = ({ children }: { children: React.ReactNode }) => (
  <HeadlessDialog.Title as="h3" className="text-lg font-semibold">
    {children}
  </HeadlessDialog.Title>
);

export const DialogDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <HeadlessDialog.Description className={className}>{children}</HeadlessDialog.Description>;

export const DialogCloseButton = ({ onClick }: { onClick: () => void }) => (
  <div className="absolute top-0 right-0 pt-6 pr-6">
    <button
      type="button"
      className="text-secondary hover:text-primary hover:bg-secondary inline-flex items-center justify-center rounded-sm transition-colors"
      onClick={onClick}
    >
      <span className="sr-only">Close</span>
      <XIcon className="h-6 w-6" aria-hidden="true" />
    </button>
  </div>
);
