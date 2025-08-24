import { Dialog, Transition } from "@headlessui/react";
import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@libs/utils/useOutsideClick";


export const ModalBg = ({ show, onClose }) => {
  return (
    <Transition
      show={show}
      enter="transition-opacity duration-200"
      enterFrom="opacity-0 z-[70] fixed"
      enterTo="opacity-100 z-[70] fixed"
      leave="transition-opacity duration-200"
      leaveFrom="opacity-100 z-[70] fixed"
      leaveTo="opacity-0 z-[70] fixed"
    >
      <div
        onClick={onClose}
        className="z-[70] bg-black-rgba fixed inset-0 outline-none focus:outline-none"
      />
    </Transition>
  );
};

export const ModalContent = ({ show, onClose, children, closeX }) => {
  const ref = useRef();
  useOutsideClick(ref, onClose);

  return (
    <AnimatePresence>
      {show && (
        <Transition
          show={show}
          enter="transition-opacity duration-200"
          enterFrom="opacity-0 z-[70] fixed"
          enterTo="opacity-100 z-[100] fixed"
          leave="transition-opacity duration-200"
          leaveFrom="opacity-100 z-[100] fixed"
          leaveTo="opacity-0 z-[100] fixed"
        >
          <Dialog open={show} onClose={onClose}>
            <motion.div
              initial={{ opacity: 0, y: 100 }} 
              animate={{ opacity: 1, y: 0 }}   
              exit={{ opacity: 0, y: 100 }}      
              transition={{ duration: 0.15 }}
              style={{ zIndex: 80 }}
              className="fixed inset-0 flex items-end justify-center" 
            >
              <div
                ref={show ? ref : null}
                className="relative max-h-screen overflow-x-hidden hide-scroll bg-white text-black rounded-t-xl w-full sm:w-auto max-w-md"
              >
                {children}
                {/* {closeX && (
                  <button
                    className="absolute rounded-full border-2 w-10 h-10 flex items-center justify-center border-[#DDDFE4] text-[#1D1F20] text-xl font-semibold top-3 md:top-5 right-4"
                    onClick={onClose}
                    type="button"
                  >
                    <img src="/icons/panah.svg" />
                  </button>
                )} */}
              </div>
            </motion.div>
          </Dialog>
        </Transition>
      )}
    </AnimatePresence>
  );
};

export const ModalMobile = ({ show, onClose, children, withHead, headTitle, closeX }) => {
  return (
    <>
      <ModalBg show={show} onClose={onClose} />
      <ModalContent
        show={show}
        onClose={onClose}
        withHead={withHead}
        headTitle={headTitle}
        closeX={closeX}
      >
        {children}
      </ModalContent>
    </>
  );
};
