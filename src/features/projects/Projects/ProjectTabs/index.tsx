import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../ui/tabs";
import PublishedProjects from "./PublishedProjects";

export function ProjectTabs() {
  return (
    <Tabs defaultValue="published" className="w-full">
      <TabsList className="grid w-full max-w-[400px] mb-6 grid-cols-4">
        <TabsTrigger
          value="published"
          className="hover:border-b hover:border-b-2 hover:border-b-[#800000]  data-[state=active]:border-b data-[state=active]:border-b-2 data-[state=active]:border-b-[#800000] data-[state=active]:font-semibold data-[state=active]:text-[15px]  data-[state=active]:bg-[#F7F7F7]"
        >
          Published
        </TabsTrigger>
        <TabsTrigger
          className="hover:border-b hover:border-b-2 hover:border-b-[#800000]  data-[state=active]:border-b data-[state=active]:border-b-2 data-[state=active]:border-b-[#800000] data-[state=active]:font-semibold data-[state=active]:text-[15px]  data-[state=active]:bg-[#F7F7F7]"
          value="current"
        >
          Current
        </TabsTrigger>
        <TabsTrigger
          className="hover:border-b hover:border-b-2 hover:border-b-[#800000]  data-[state=active]:border-b data-[state=active]:border-b-2 data-[state=active]:border-b-[#800000] data-[state=active]:font-semibold data-[state=active]:text-[15px]  data-[state=active]:bg-[#F7F7F7]"
          value="completed"
        >
          Completed
        </TabsTrigger>
        <TabsTrigger
          className="hover:border-b hover:border-b-2 hover:border-b-[#800000]  data-[state=active]:border-b data-[state=active]:border-b-2 data-[state=active]:border-b-[#800000] data-[state=active]:font-semibold data-[state=active]:text-[15px]  data-[state=active]:bg-[#F7F7F7]"
          value="drafts"
        >
          Drafts
        </TabsTrigger>
      </TabsList>
      <TabsContent value="published">
        <PublishedProjects />
      </TabsContent>
      <TabsContent value="current">
        <div className="text-[40px]">Current</div>
      </TabsContent>
      <TabsContent value="completed">
        <div className="text-[40px]">Completed</div>
      </TabsContent>
      <TabsContent value="drafts">
        <div className="text-[40px]">Drafts</div>
      </TabsContent>
    </Tabs>
  );
}
