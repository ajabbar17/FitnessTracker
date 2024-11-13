import Image from "next/image";

const About = () => {
  return (
    <section className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
          TRACK, TRAIN, EXCEL. <br /> LOG WORKOUTS. <br /> ACHIEVE YOUR GOALS .
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Easily track your Workouts, set Training Plans, and discover new
            Workout Routines to crush your goals.
          </p>
          <button className="bg-black text-white font-bold px-6 py-3 rounded hover:bg-gray-800 transition">
            GET STARTED
          </button>
        </div>

        {/* Right Content */}
        <div className="md:w-1/2 mt-8 md:mt-0 ">
          <Image
            src="/workout.jpg"
            alt="Fitness"
            width={600}
            height={400}
            className="w-full h-auto shadow-lg"
          />
         
        </div>
      </div>
    </section>
  );
};

export default About;
