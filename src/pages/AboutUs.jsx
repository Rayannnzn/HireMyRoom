function AboutUs() {
  const teamMembers = [
    {
      id: 1,
      name: 'Mustansar Ali Khan',
      role: 'CEO',
      description:
        "As the visionary leader of Hire My Room, our CEO drives the company's strategic direction, ensuring innovation and excellence in every aspect of our platform. With a passion for solving real-world challenges, Mustansar Ali Khan has built Hire My Room into a trusted name in the rental industry.",
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 2,
      name: 'Abdullah Atiq',
      role: 'Head of Technical Department',
      description:
        "Abdullah Atiq brings extensive expertise in software development and system architecture to the table. As the Head of Technical Department, he leads the development of our platform, ensuring it remains fast, secure, and user-friendly. His commitment to innovation keeps Hire My Room at the forefront of technological advancements in the rental market.",
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 3,
      name: 'Muhammad Ahmad Tariq',
      role: 'Head of Operations',
      description:
        "Muhammad Ahmad Tariq oversees all operational activities at Hire My Room, ensuring a seamless and reliable experience for our users. His meticulous attention to detail and strategic approach to operations have been instrumental in scaling our platform to meet growing demand.",
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 4,
      name: 'Arslan Sajid Khan',
      role: 'Marketing Head',
      description:
        "Arslan Sajid Khan spearheads our marketing efforts, driving brand visibility and user acquisition. With a deep understanding of digital marketing strategies, Arslan has successfully expanded Hire My Room's reach, connecting more property owners and renters than ever before.",
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    },
  ];

  const whyChooseUs = [
    {
      title: 'Trust & Transparency',
      description: 'We prioritize security and honesty, creating a safe and reliable rental experience for all users.',
      icon: '🛡️',
    },
    {
      title: 'Wide Range of Properties',
      description: 'From single rooms to full homes, our platform caters to a wide range of rental needs.',
      icon: '🏠',
    },
    {
      title: 'User-Friendly Interface',
      description: 'Our intuitive platform is designed for ease of use, making renting and listing properties effortless.',
      icon: '✨',
    },
    {
      title: '24/7 Support',
      description: 'Our dedicated support team is available around the clock to assist you with any queries or concerns.',
      icon: '💬',
    },
    {
      title: 'Optimized Rental Management',
      description:
        'Property owners benefit from advanced tools to manage listings, attract tenants, and maximize rental income.',
      icon: '📊',
    },
  ];

  return (
    <div className="mx-auto w-[92%] max-w-[1600px] px-2 py-10 sm:px-4">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">About Hire My Room</h1>
        <p className="mt-4 text-lg text-slate-600">Transforming the rental market, one property at a time</p>
      </section>

      {/* Our Story */}
      <section className="mb-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-slate-900">Our Story</h2>
          <p className="leading-relaxed text-slate-700">
            At Hire My Room, we were founded with a singular mission: to transform the rental market by bridging the
            gap between property owners and renters. Recognizing the challenges homeowners face in finding trustworthy
            tenants and the struggles renters encounter in securing reliable properties, we created an innovative
            platform that simplifies the process. Hire My Room offers a fast, efficient, and transparent solution for
            both parties. Whether you&apos;re seeking a long-term rental, a vacation home, or a short-term stay, our
            platform ensures a seamless and hassle-free experience, built on trust and confidence.
          </p>
        </div>
      </section>

      {/* Our Vision & Mission */}
      <section className="mb-16 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-slate-900">Our Vision</h2>
          <p className="leading-relaxed text-slate-700">
            Hire My Room aspires to be the global leader in property rental solutions. We envision a future where
            property owners are empowered with cutting-edge tools to manage listings, attract ideal tenants, and
            maximize rental income. For renters, we aim to redefine the search for the perfect home by offering
            unparalleled security, trust, and flexibility. Through technology and transparency, we are committed to
            revolutionizing the rental experience for everyone.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-slate-900">Our Mission</h2>
          <p className="leading-relaxed text-slate-700">
            Our mission is to deliver a seamless, secure, and user-friendly rental platform that fosters trust and
            collaboration between property owners and renters. We are dedicated to simplifying every step of the rental
            journey—from listing to booking—ensuring a smooth, efficient, and stress-free experience for all users.
          </p>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">Meet Our Team</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
                <p className="mb-3 text-sm font-semibold text-indigo-600">{member.role}</p>
                <p className="text-sm leading-relaxed text-slate-600">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Hire My Room */}
      <section className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">Why Choose Hire My Room?</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-4 text-4xl">{item.icon}</div>
              <h3 className="mb-2 text-xl font-bold text-slate-900">{item.title}</h3>
              <p className="text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Us */}
      <section className="rounded-2xl border border-slate-200 bg-gradient-to-r from-indigo-600 to-indigo-700 p-8 text-white shadow-lg">
        <h2 className="mb-6 text-center text-3xl font-bold">Contact Us</h2>
        <div className="mx-auto max-w-2xl">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
              <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-indigo-200">Phone</div>
              <a href="tel:+923001234567" className="text-lg font-semibold hover:text-indigo-200">
                +92 300 1234567
              </a>
            </div>
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
              <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-indigo-200">Email</div>
              <a href="mailto:support@hiremyroom.com" className="text-lg font-semibold hover:text-indigo-200">
                support@hiremyroom.com
              </a>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-indigo-100">
              Our dedicated support team is available 24/7 to assist you with any queries or concerns.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
