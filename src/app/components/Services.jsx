import Image from 'next/image';
import React from 'react';

const Services = () => {
    const cards = [
        {
            title: "PROGRESSION",
            description: "Track your progress and reach your fitness goals.",
            bgImage: "/banner.jpg",
            icon: "/checklist.png",
        },
        {
            title: "WORKOUT",
            description: "Personalized workout plans tailored for you.",
            bgImage: "/banner2.jpg",
            icon: "/weightlifting.png",
        },
        {
            title: "NUTRITION",
            description: "Fuel your body with the right nutrition.",
            bgImage: "/banner3.jpg",
            icon: "/whey.png",
        },
    ];

    return (
        <div className='px-6'>
            <h1 className='text-black text-5xl text-center font-bold'>Our Services</h1>
            <section className="grid grid-cols-1 md:grid-cols-3 pt-10 gap-6">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="relative h-96 shadow-lg text-white flex flex-col justify-center items-center p-6 group overflow-hidden"
                    >
                        <div className="absolute inset-0">
                            <Image
                                width={600}
                                height={400}
                                src={card.bgImage}
                                alt={card.title}
                                className="w-full h-full object-cover blur-[1px]"
                            />
                        </div>
                        <div className="relative z-10 text-center">
                            <div className="text-4xl flex justify-center pb-5">
                                <Image
                                    width={100}
                                    height={100}
                                    src={card.icon}
                                    alt={card.title}
                                    className="object-cover self-center h-20 w-20"
                                />
                            </div>
                            <div className="relative  overflow-hidden">
                                <h2 className="text-3xl md:text-5xl font-bold  relative">
                                    <span className="relative z-10">{card.title}</span>
                                    <span className="absolute inset-0 bg-black pb-10 md:pb-14 left-0 w-0 group-hover:w-full transition-all duration-500 ease-in-out"></span>
                                </h2>
                                <p className="mt-2 text-lg">{card.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Services;
