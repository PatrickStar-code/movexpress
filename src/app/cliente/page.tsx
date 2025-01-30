import React from "react";
import { Hero } from "./_components/Hero";
import { SectionTitle } from "./_components/SectionTitle";
import { Benefits } from "./_components/Benefits";
import { Testimonials } from "./_components/Testimonials";
import { Cta } from "./_components/Cta";

import { benefitOne } from "./_components/data";
import { benefitTwo } from "./_components/data";
import { Faq } from "./_components/Faq";
import { VideoPlayer } from "./_components/Video";
import { Container } from "./_components/Container";

export default function ClientPage() {
  return (
    <main className="bg-background overflow-x-hidden">
      <Container>
        <Hero />
        <SectionTitle
          preTitle="Nextly Benefits"
          title=" Why should you use this landing page"
        >
          Nextly is a free landing page & marketing website template for
          startups and indie projects. Its built with Next.js & TailwindCSS. And
          its completely open-source.
        </SectionTitle>
        <Benefits data={benefitOne} />
        <Benefits imgPos="right" data={benefitTwo} />
        <SectionTitle
          preTitle="Watch a video"
          title="Learn how to fullfil your needs"
        >
          This section is to highlight a promo or demo video of your product.
          Analysts says a landing page with video has 3% more conversion rate.
          So, don&apos;t forget to add one. Just like this.
        </SectionTitle>
        <VideoPlayer videoId="0O2aHWkGhG4" />
        <SectionTitle
          preTitle="Testimonials"
          title="Here's what our customers said"
        >
          Testimonials is a great way to increase the brand trust and awareness.
          Use this section to highlight your popular customers.
        </SectionTitle>
        <Testimonials />
        <SectionTitle preTitle="FAQ" title="Frequently Asked Questions">
          Answer your customers possible questions here, it will increase the
          conversion rate as well as support or chat requests.
        </SectionTitle>
        <Faq />
        <Cta />{" "}
      </Container>
    </main>
  );
}
