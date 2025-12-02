import { ProjectContentTemplate } from "@/components/project-content-template";
import LogoEdibly from "@/assets/logo_edibly.webp";

export default function EdiblyPage() {
  const descriptionBlocks = [
    "From the get go of this project we focused on inclusivity especially towards people with impaired vision. By the end of the project we were able to develop an app that detects the freshness and quality of grocery products.",
    "TECH STACK: SWIFTUI, CORE ML",
  ];

  return (
    <ProjectContentTemplate
      projectName="Edibly"
      heroLogo={{ src: LogoEdibly, alt: "Edibly Logo" }}
      descriptionBlocks={descriptionBlocks}
      imagesSection={
        <div className="flex gap-4 justify-evenly">
          <div className="w-1/2 flex justify-center items-center">
            <iframe
              src="https://youtube.com/embed/qo_VreqnvwI?autoplay=1&mute=1&controls=0&loop=1&playlist=qo_VreqnvwI"
              className="h-full w-full aspect-[6/13] rounded-2xl"
            />
          </div>
          <div className="w-1/2 flex justify-center items-center">
            <iframe
              src="https://youtube.com/embed/omhdzs0Suuo?autoplay=1&mute=1&controls=0&loop=1&playlist=omhdzs0Suuo"
              className="h-full w-full aspect-[6/13] rounded-2xl"
            />
          </div>
        </div>
      }
    />
  );
}
