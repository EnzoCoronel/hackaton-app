import { Card } from "@/components/Card";
import { ICardProps } from "@/components/Card/types";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import React from "react";

export default function Home() {
  const components: { title: string; href: string; description: string }[] = [
    {
      title: "Alert Dialog",
      href: "/docs/primitives/alert-dialog",
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Hover Card",
      href: "/docs/primitives/hover-card",
      description:
        "For sighted users to preview content available behind a link.",
    },
    {
      title: "Progress",
      href: "/docs/primitives/progress",
      description:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
      title: "Scroll-area",
      href: "/docs/primitives/scroll-area",
      description: "Visually or semantically separates content.",
    },
    {
      title: "Tabs",
      href: "/docs/primitives/tabs",
      description:
        "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
      title: "Tooltip",
      href: "/docs/primitives/tooltip",
      description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
  ];

  const cards: ICardProps[] = [
    {
      name: "Santos",
      image: {
        src: "/images.jpeg",
        alt: "santos",
      },
      urgent: true,
    },
  ];

  return (
    <>
      <nav>
        <div>NOME HACKATON</div>
        <Navigation items={components} />
      </nav>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Button>Button</Button>
        <Button variant={"outline"}>Button</Button>

        <div className="w-full grid grid-cols-2 px-5 gap-5">
          {cards.map(({name, image, urgent}, index) => (
            <Card key={index} name={name} image={image} urgent={urgent} />
          ))}
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </>
  );
}
