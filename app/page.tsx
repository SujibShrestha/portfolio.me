import HeroSection from "@/components/HeroSection";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://www.sujibshrestha.com.np/#person",
        "name": "Sujib Shrestha",
        "jobTitle": "Backend & Generative AI Developer",
        "alternateName": "Sujib Shrestha Developer",
        "description": "Sujib Shrestha is a Backend and Generative AI developer skilled in full-stack development, React, Node.js, and AI-powered applications.",
        "url": "https://www.sujibshrestha.com.np/",
        "image": "https://www.sujibshrestha.com.np/assets/profile.png",
        "sameAs": [
          "https://github.com/SujibShrestha",
          "https://www.linkedin.com/in/sujib-shrestha-245868282/",
          "https://twitter.com/sujibshrestha"
        ],
        "email": "sujibshrestha78@gmail.com",
        "gender": "http://schema.org/Male",
        "knowsAbout": [
          "Software Engineering",
          "Generative AI",
          "AI Engineering",
          "React",
          "Next.js",
          "FastAPI",
          "Python",
          "TypeScript",
          "JavaScript",
          "Large Language Models",
          "Machine Learning",
          "Web Development",
          "Backend Development",
          "Frontend Development",
          "REST APIs",
          "PostgreSQL",
          "Docker"
        ],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Kathmandu",
          "addressCountry": "Nepal"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://www.sujibshrestha.com.np/#website",
        "url": "https://www.sujibshrestha.com.np/",
        "name": "Sujib Shrestha Portfolio",
        "description": "Portfolio of Sujib Shrestha, a Backend and Generative AI developer skilled in full-stack development, React, Node.js, and AI-powered applications.",
        "publisher": {
          "@id": "https://www.sujibshrestha.com.np/#person"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://www.sujibshrestha.com.np/#webpage",
        "url": "https://www.sujibshrestha.com.np/",
        "name": "Sujib Shrestha | Backend & AI Developer Portfolio",
        "description": "Portfolio of Sujib Shrestha, showcasing full-stack and AI projects.",
        "isPartOf": {
          "@id": "https://www.sujibshrestha.com.np/#website"
        },
        "about": {
          "@id": "https://www.sujibshrestha.com.np/#person"
        }
      },
      {
        "@type": "ProfilePage",
        "@id": "https://www.sujibshrestha.com.np/#profile",
        "url": "https://www.sujibshrestha.com.np/",
        "name": "Sujib Shrestha Profile Page",
        "mainEntity": {
          "@id": "https://www.sujibshrestha.com.np/#person"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.sujibshrestha.com.np/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.sujibshrestha.com.np/"
          }
        ]
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://www.sujibshrestha.com.np/#popcornlist",
        "name": "Popcorn List",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "All",
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "description": "A cinematic watchlist application (Popcorn List) that lets users discover, search, and manage movies with a sleek dashboard UI, integrated with TMDB API or custom database.",
        "softwareVersion": "1.0.0",
        "url": "https://movie-watchlist-py3q.vercel.app/",
        "downloadUrl": "https://github.com/SujibShrestha/Movie-watchlist",
        "author": {
          "@id": "https://www.sujibshrestha.com.np/#person"
        },
        "offers": {
          "@type": "Offer",
          "price": "0.00",
          "priceCurrency": "USD"
        }
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://www.sujibshrestha.com.np/#videosummary",
        "name": "AI Video Summary Assistant",
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "All",
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "description": "An intelligent video agent that processes YouTube videos to extract concise summaries and answers user questions about the video content in real-time.",
        "softwareVersion": "1.0.0",
        "downloadUrl": "https://github.com/SujibShrestha/video-agent",
        "author": {
          "@id": "https://www.sujibshrestha.com.np/#person"
        },
        "offers": {
          "@type": "Offer",
          "price": "0.00",
          "priceCurrency": "USD"
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <HeroSection />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </>
  );
}

