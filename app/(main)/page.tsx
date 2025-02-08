import Hero from "../component/hero";
import PopluarTopics from "../component/popluarTopics";
import TrendingCourses from "../component/trendingCourses";
import WhyChooseUs from "../component/whyChooseUs";

export default function Home() {
  return (
    <>
      <Hero />
      <PopluarTopics />
      <TrendingCourses />
      <WhyChooseUs />
    </>
  );
}
