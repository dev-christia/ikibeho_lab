import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function DetailTab() {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          <span className="font-medium">Chapter 1 - The Solid State</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="destructive" size="sm">
            Delete
          </Button>
          <Button variant="outline" size="sm">
            Move to Draft
          </Button>
          <Button size="sm">Add Course</Button>
        </div>
      </div>

      <Tabs defaultValue="details" className="p-4">
        <TabsList className="mb-4">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Chapter details</h2>
            <p className="text-sm text-slate-600 mb-4">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <div className="p-2 border rounded-md bg-slate-50">
                  Chapter 1 - The Solid State
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Subtitle
                </label>
                <div className="p-2 border rounded-md bg-slate-50">
                  Learn about the solid states with ease and get sample papers
                  and notes too!
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <div className="p-2 border rounded-md bg-slate-50 min-h-24">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="resources">
          <div className="min-h-40 flex items-center justify-center text-slate-500">
            Resources content goes here
          </div>
        </TabsContent>

        <TabsContent value="seo">
          <div className="min-h-40 flex items-center justify-center text-slate-500">
            SEO content goes here
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
