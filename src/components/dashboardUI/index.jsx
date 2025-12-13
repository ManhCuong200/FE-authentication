import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MoreHorizontal, Trash2 } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export default function DashboardUI({
  handleCreateProject,
  role,
  projects,
  handleDeleteProject,
  loading,
  loadingDelete,
}) {
  return (
    <div className="relative p-6 w-full">
      {loading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <Spinner className="h-12 w-12 text-white" />
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <Input placeholder="Search projects..." className="pl-10 w-[260px]" />
          </div>

          {role === 'admin' && (
            <Button onClick={() => handleCreateProject()} className="font-medium bg-blue-600 hover:bg-blue-700 text-white">
              + New Project
            </Button>
          )}

          <Button variant="outline" size="icon">
            <MoreHorizontal size={20} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {projects.map((p) => (
          <Card
            key={p._id}
            className="rounded-xl shadow-sm hover:shadow-md transition group relative"
          >
            <CardHeader className="p-0">
              <img
                src={p.img || "https://picsum.photos/300/200"}
                alt="project thumbnail"
                className="w-full h-40 object-cover rounded-t-xl"
              />
            </CardHeader>

            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-medium text-lg">{p.title}</h2>
                  <Badge variant="secondary" className="mt-2">
                    {p.status}
                  </Badge>
                </div>

                {role === "admin" && (
                  <Button
                    disabled={loadingDelete}
                    variant="destructive"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleDeleteProject(p._id)}
                  >
                    {loadingDelete ? (
                      <Spinner className="h-5 w-5 text-white" />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  );
}
