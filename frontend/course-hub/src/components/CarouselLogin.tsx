import {
  Carousel,
  CarouselContent,
  CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"

export const CarouselLogin = () => {
  return (
    <Carousel 
        className="relative  bg-neutral-100 rounded-2xl overflow-hidden"
        opts={{
            loop: true,
        }}
        plugins={[
            Autoplay({
                delay: 4000,
                stopOnInteraction: false
            })
        ]}
        >
      <CarouselContent className="h-full">
        <CarouselItem className="m-0 p-0">
            <img className="lg:h-screen object-cover h-full" src="/webp/carousel-images/carousel-1.webp" alt="persona programadora" />
        </CarouselItem>
        <CarouselItem className="m-0 p-0">
            <img className="lg:h-screen object-cover h-full" src="/webp/carousel-images/carousel-2.webp" alt="persona programadora" />
        </CarouselItem>
        <CarouselItem className="m-0 p-0">
            <img className="lg:h-screen object-cover h-full" src="/webp/carousel-images/carousel-3.webp" alt="persona programadora" />
        </CarouselItem>
      </CarouselContent>

      
      {/* <CarouselPrevious className="absolute left-0 cursor-pointer"/>
      <CarouselNext className="absolute right-0 cursor-pointer"/> */}
    </Carousel>
  );
};
