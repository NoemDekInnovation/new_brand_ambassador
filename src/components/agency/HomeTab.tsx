import ListCard, { TopProjectCard } from "./ListCard";
import ProjectCard, { CurrentProjects } from "./ProjectCard";
import circle from "../../assets/Group.png"

const currentProject = {
  isCurrent: true,
  content: [1],
};

const avaibleProject = {
  isCurrent: false,
  content: [1, 2, 3, 4],
};

const HomeTab = () => {
  return (
    <div className=" bg-bm_card_grey h-full">
      <div className="px-4 md:px-12 xl:px-40 flex py-10 md:space-x-8 flex-col items-center space-y-8 md:flex-row md:space-y-0 md:items-start">
        <div className=" space-y-8 flex-1 flex flex-col items-center sm:block">
          <CurrentProjects
            card_content={currentProject}
            card_title="Current Projects"
          />
          <ProjectCard
            card_content={avaibleProject}
            card_title="Leading Talent"
          />
          <ProjectCard card_content={avaibleProject} card_title="Favorites" />
        </div>
        <div className="space-y-8 hidden sm:block">
          <ListCard card_title="My Projects" card_width="w-full" />
          <TopProjectCard card_title="Agencies" card_width="w-full" />
        </div>
        {/* <img src={circle} width={60.87} height={60.88} alt="" /> */}
      </div>
    </div>
  );
};

export default HomeTab;
