import React from "react";

function About() {
  return (
    <section className="about container mx-auto py-20">
      <div className="content grid grid-cols-2 gap-24">
        <div className="image h-96 w-96 rounded-full bg-pink-200 col-span-1 ms-auto"></div>
        <div className="text col-span-1 flex flex-col items-start justify-center">
          <h1 className="text-3xl font-medium mb-6">Meet Your Lash Tech</h1>
          <p className="w-[25rem] leading-loose">
            Hey Loves! It&apos;s Libs, the face behind the tweezers. Thank you
            for choosing me as your lash tech and shopping with The Bliink Barr.
            You guys changed my life!
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
