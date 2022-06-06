import { Fragment, PropsWithChildren } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function ModalWrapper({ isOpen, onClose, children }: PropsWithChildren<Props>) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="bg-brand-black/75 fixed inset-0 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 flex items-start justify-center overflow-hidden">
            <div className="pointer-events-none mt-[20vh] flex max-w-md ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-100"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-50"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="pointer-events-auto w-screen px-6">
                  <>{children}</>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default ModalWrapper;
