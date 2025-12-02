"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronRight, ChevronLeft } from "lucide-react";

type CarouselImage = {
  src: StaticImageData | string;
  alt?: string;
};

type ImageCarouselProps = {
  images: CarouselImage[];
  className?: string;
};

export default function ImageCarousel({
  images,
  className,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  if (!images || images.length === 0) return null;

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToIndex = (index: number) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const currentImage = images[currentIndex];

  return (
    <div
      className={`relative w-full flex items-center justify-center gap-4 ${
        className ?? ""
      }`}
    >
      <div className="relative overflow-hidden rounded-2xl bg-neutral-100 shadow-sm w-full max-w-5xl">
        <div className="relative w-full aspect-[1000/700]">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentIndex}
              initial={{
                x: direction === 1 ? 40 : -40,
                scale: 0.98,
              }}
              animate={{ x: 0, scale: 1 }}
              exit={{
                x: direction === 1 ? -40 : 40,
                scale: 0.98,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 30,
                mass: 0.8,
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Image
                src={currentImage.src}
                alt={currentImage.alt ?? `Image ${currentIndex + 1}`}
                fill
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={goToPrevious}
                className="flex absolute left-4 top-1/2 md:h-10 md:w-10 h-4 w-4 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition active:translate-y-[5px]"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={goToNext}
                className="flex absolute right-4 top-1/2 md:h-10 md:w-10 h-4 w-4 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition active:translate-y-[5px]"
                aria-label="Next image"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-4 flex w-full justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToIndex(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === currentIndex
                  ? "w-6 bg-black/70"
                  : "w-2 bg-black/30 hover:bg-black/50"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
