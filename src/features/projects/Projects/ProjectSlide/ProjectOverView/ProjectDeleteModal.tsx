import { useDispatch, useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../ui/select";
import { Card } from "../../../../../ui/card";
import { Dialog } from "../../../../../ui/dialog";
import { AppDispatch, RootState } from "../../../../../redux/store";
import { authAxiosInstance } from "../../../../../api/axios";
import { fetchpublishprojects } from "../../../../../redux/revmap/projects";

export const ProjectDeleteModal = ({
  projectModal,
  setProjectModal,
  project,
  setModal,
}: {
  setModal: any;
  project: any;
  projectModal: boolean;
  setProjectModal: any;
}) => {
  const { selectedProject } = useSelector(
    (state: RootState) => state.newProjects
  );

  const { user } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch<AppDispatch>();

  const deleteProject = async () => {
    if (user?.accountId !== undefined) {
      try {
        const res = await authAxiosInstance.delete(
          `/delete-project/${selectedProject?._id}`,
          {
            headers: {
              Authorization: `Bearer ${user?.authKey || ""}`,
            },
          }
        );
        dispatch(fetchpublishprojects(null));
        setProjectModal(false);
        setModal(false);
      } catch (err) {
        setProjectModal(false);
        console.log(err);
      }
    }
  };

  return (
    <Dialog open={projectModal} onOpenChange={setProjectModal}>
      {projectModal && (
        <div className=" p-4 h-screen fixed inset-0 bg-black/20 z-[2000] flex justify-center">
          <div className="sm:max-w-[950px] w-full  bg-white text-black m-auto mx-3 rounded-b-lg">
            <div className="bg-black p-3 w-full justify-between text-white flex items-center capitalize">
              <p>Delete Project - {selectedProject?.projectTitle}</p>
              <button onClick={() => setProjectModal(false)}>x</button>
            </div>
            <div className="flex justify-center items-center items-center p-4  rounded-b-lg">
              <div className=" max-w-[800px] w-full flex flex-col items-end gap-3 ">
                <Card className="flex flex-col p-5 w-full gap-4 border-none">
                  <div className=" p-3 w-full">
                    <p className="text-bm__grey__text__100 text-[18px]">
                      Are you sure you want to delete this account?
                    </p>
                    <ul className=" ml-4 text-[12px] flex gap-1 mt-1 list-disc  flex-col">
                      <li>
                        This project will be deleted from your list of projects
                      </li>
                      <li>You will loose all applications on this project</li>{" "}
                      <li>You will loose all details of this project </li>
                    </ul>
                  </div>
                </Card>
                <div className="">
                  <button onClick={deleteProject} className="ox__btn">
                    Delete{" "}
                  </button>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
             
    </Dialog>
  );
};
