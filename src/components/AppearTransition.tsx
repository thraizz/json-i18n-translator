import { Transition } from "@headlessui/react";
import { PropsWithChildren } from "react";

/**
 * A simple Transition that animates the appearance of its children.
 * */
export const AppearTransition = ({
  id,
  className,
  show = true,
  children,
  appear = true,
}: PropsWithChildren<{
  appear?: boolean;
  id?: string;
  className?: string;
  show?: boolean;
}>) => (
  <Transition
    id={id}
    appear={appear}
    className={className}
    show={show}
    enter="transition-opacity ease-linear duration-150"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="transition-opacity ease-linear duration-300"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
  >
    {show && children}
  </Transition>
);
