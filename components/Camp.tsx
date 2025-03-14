'use client'

import { PEOPLE_URL } from "@/constants";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

interface CampProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
  peopleJoined: string;
}

const campSites = [
  {
    backgroundImage: "bg-bg-img-1",
    title: "Wangedigala Camping",
    subtitle: "Badulla, Sri Lanka",
    peopleJoined: "50+ Joined"
  },
  {
    backgroundImage: "bg-bg-img-2",
    title: "Knuckles Wilderness Camp",
    subtitle: "Matale, Sri Lanka",
    peopleJoined: "50+ Joined"
  },
  {
    backgroundImage: "bg-bg-img-3", // You'll need to add this image to your project
    title: "Horton Plains Camping",
    subtitle: "Nuwara Eliya, Sri Lanka",
    peopleJoined: "30+ Joined"
  },
  {
    backgroundImage: "bg-bg-img-4", // You'll need to add this image to your project
    title: "Yala Safari Camp",
    subtitle: "Yala, Sri Lanka",
    peopleJoined: "40+ Joined"
  },
];

const CampSite = ({ backgroundImage, title, subtitle, peopleJoined }: CampProps) => {
  return (
    <div className={`h-full w-full min-w-[1100px] ${backgroundImage} bg-cover bg-no-repeat lg:rounded-r-5xl 2xl:rounded-5xl`}>
      <div className="flex h-full flex-col items-start justify-between p-6 lg:px-20 lg:py-10">
        <div className="flexCenter gap-4">
          <div className="rounded-full bg-green-50 p-4">
            <Image
              src="/folded-map.svg"
              alt="map"
              width={28}
              height={28}
            />
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="bold-18 text-white">{title}</h4>
            <p className="regular-14 text-white">{subtitle}</p>
          </div>
        </div>

        <div className="flexCenter gap-6">
          <span className="flex -space-x-4 overflow-hidden">
            {PEOPLE_URL.map((url) => (
              <Image 
                className="inline-block h-10 w-10 rounded-full"
                src={url}
                key={url}
                alt="person"
                width={52}
                height={52}
              />
            ))}
          </span>
          <p className="bold-16 md:bold-20 text-white">{peopleJoined}</p>
        </div>
      </div>
    </div>
  );
};

const Camp = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (currentIndex < campSites.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back to beginning
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(campSites.length - 1); // Loop to end
    }
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: currentIndex * 1100, // Based on your min-width
        behavior: "smooth"
      });
    }
  }, [currentIndex]);

  return (
    <section className="2xl:max-container relative flex flex-col py-10 lg:mb-10 lg:py-20 xl:mb-20">
      <div className="relative">
        <div 
          ref={sliderRef}
          className="hide-scrollbar flex h-[340px] w-full items-start justify-start gap-8 overflow-x-auto no-scrollbar lg:h-[400px] xl:h-[640px] scroll-smooth"
        >
          {campSites.map((camp, index) => (
            <CampSite 
              key={index}
              backgroundImage={camp.backgroundImage}
              title={camp.title}
              subtitle={camp.subtitle}
              peopleJoined={camp.peopleJoined}
            />
          ))}
        </div>
        
        {/* Navigation arrows */}
        <div className="absolute inset-y-0 left-0 flex items-center">
          <button 
            onClick={prevSlide}
            className="bg-white bg-opacity-50 hover:bg-opacity-100 rounded-full p-2 ml-2 focus:outline-none"
          >
            <Image src="/arrow-left.svg" width={24} height={24} alt="Previous" />
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center">
          <button 
            onClick={nextSlide}
            className="bg-white bg-opacity-50 hover:bg-opacity-100 rounded-full p-2 mr-2 focus:outline-none"
          >
            <Image src="/arrow-right.svg" width={24} height={24} alt="Next" />
          </button>
        </div>
        
        {/* Pagination dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {campSites.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-8 rounded-full ${currentIndex === index ? 'bg-green-50' : 'bg-gray-300'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="flexEnd mt-10 px-6 lg:-mt-60 lg:mr-6">
        <div className="bg-green-50 p-8 lg:max-w-[500px] xl:max-w-[734px] xl:rounded-5xl xl:px-16 xl:py-20 relative w-full overflow-hidden rounded-3xl">
          <h2 className="regular-24 md:regular-32 2xl:regular-64 capitalize text-white">
            <strong>Feeling Lost</strong> And Not Knowing The Way?
          </h2>
          <p className="regular-14 xl:regular-16 mt-5 text-white">
            Starting from the anxiety of the climbers when visiting a new climbing location, the possibility of getting lost is very large. That's why we are here for those of you who want to start an adventure
          </p>
          <Image 
            src="/quote.svg"
            alt="camp-2"
            width={186}
            height={219}
            className="camp-quote"
          />
        </div>
      </div>
    </section>
  );
};

export default Camp;