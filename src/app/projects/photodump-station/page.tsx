import { ProjectContentTemplate } from "@/components/project-content-template";
import LogoPhotodumpStation from "@/assets/logo_photodump.webp";

export default function PhotodumpStationPage() {
  const descriptionBlocks = [
    "Developed a website and Windows desktop app for Photodump Station, a photo booth service across Indonesia. Built a Next.js web platform integrated with a desktop application using Electron, enabling seamless communication between systems and payment gateway integration.",
    "TECH STACK: ELECTRON, NEXT.JS, SUPABASE, MIDTRANS",
  ];
  return (
    <ProjectContentTemplate
      projectName="Photodump Station"
      heroLogo={{
        src: LogoPhotodumpStation,
        alt: "Photodump Station Logo",
      }}
      descriptionBlocks={descriptionBlocks}
      // projectLink="https://photodumpstation.com"
    />
  );
}
