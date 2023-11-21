import ListCard, { TopProjectCard } from "./ListCard";
import ProjectCard, { CurrentProjects } from "./ProjectCard";
import circle from "../../assets/Vector.png";
import plus from "../../assets/plus.png"
import addButton from "../../assets/Add Button.png"

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
          <TopProjectCard card_title="Top Projects" card_width="w-full" />
        </div>
        {/* <img src={circle} width={66} height={66} alt="" /> */}
        {/* <div className="h-[66px] w-[66px] rounded-[30px] bg-[#93979D] flex items-center justify-center">
          <img src={circle} alt=""  />
          <img src={plus} alt=""  /> 
        </div> */}
        <img src={addButton} alt="" />
      </div>
    </div>
  );
};

export default HomeTab;
