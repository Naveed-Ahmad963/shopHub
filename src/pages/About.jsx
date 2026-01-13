import { STATS_DATA, VALUES_DATA, STORY_PARAGRAPHS } from "./data/aboutData";
import { StatCard } from "./componentData/StatsCard";
import { ValueCard } from "./componentData/ValueCard";
import { SectionHeader } from "./componentData/SectionHeader";

const About = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-blue-600">
              <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-6">
                Our Story
              </h2>
              {STORY_PARAGRAPHS.map((paragraph, index) => (
                <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600"
                alt="Our team"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our Impact"
            subtitle="Numbers that tell our story"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS_DATA.map((stat) => (
              <StatCard key={stat.id} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our Values"
            subtitle="The principles that guide everything we do"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES_DATA.map((value) => (
              <ValueCard key={value.id} {...value} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
