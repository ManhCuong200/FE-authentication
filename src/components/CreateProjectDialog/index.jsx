import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
export default function CreateProjectDialog({
  open,
  setOpen,
  title,
  setTitle,
  description,
  setDescription,
  status,
  setStatus,
  handleSubmit,
  ownerId,
  setOwnerId,
  users = [],
  loadingCreate
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Fill in the details below to get started.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1">
            <Label>Project Title</Label>
            <Input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="Enter project title"
            />
          </div>

          <div className="space-y-1">
            <Label>Project Description</Label>
            <Textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder="Describe the project"
              rows={4}
            />
          </div>

          <div className="space-y-1">
            <Label>Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label>Assign Owner</Label>
            <Select value={ownerId} onValueChange={setOwnerId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a user" />
              </SelectTrigger>

              <SelectContent>
                {users.length === 0 && (
                  <div className="px-3 py-2 text-sm text-gray-500">
                    No users available
                  </div>
                )}

                {users.map((u) => (
                  <SelectItem key={u._id} value={u._id}>
                    {u.name} ({u.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            disabled={loadingCreate}
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loadingCreate ? (
              <div className="flex items-center gap-2">
                <Spinner />
                Creating...
              </div>
            ) : (
                "Create Project"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
