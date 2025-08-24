import { Dialog, Transition } from "@headlessui/react";
import { cn } from "@libs/utils/cn";
import { VariantProps, cva } from "class-variance-authority";
import { FC, Fragment } from "react";
import { X } from "react-feather";

const modalDialogVariants = cva(
  "w-full transform overflow-hidden rounded-t-2xl p-4 text-left align-middle shadow-xl transition-all",
  {
    variants: {
      size: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
        full: "max-w-full",
      },
      color: {
        white: "bg-white",
        blue: "bg-primary",
      },
    },
    defaultVariants: {
      size: "full",
      color: "white",
    },
  }
);

interface ModalDialogProps extends VariantProps<typeof modalDialogVariants> {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
  clickOutside?: boolean;
  titleSeparator?: boolean;
  hide?: string;
}

const BottomSheet: FC<ModalDialogProps> = ({
  isOpen,
  onClose,
  children,
  title = "",
  size,
  className,
  hide,
  clickOutside = true,
  titleSeparator = false,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        open={isOpen}
        onClose={clickOutside ? onClose : () => null}
      >
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </Transition.Child>

        {/* Bottom Sheet */}
        <div className="fixed inset-0 flex items-end justify-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="translate-y-full"
            enterTo="translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="translate-y-0"
            leaveTo="translate-y-full"
          >
            <Dialog.Panel className={cn(modalDialogVariants({ size, className }))}>
              {/* Header */}
              <Dialog.Title
                as="h3"
                className="flex items-center justify-between text-lg font-semibold text-gray-900"
              >
                <span>{title}</span>
                {/* <button
                  className={`${hide ? "hidden" : "flex"}`}
                  onClick={onClose}
                >
                  <X />
                </button> */}
              </Dialog.Title>

              {titleSeparator && <hr className="my-2" />}

              {/* Content */}
              <div className="mt-2">{children}</div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default BottomSheet;
