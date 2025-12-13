import Dashboard from "../../components/dashboardUI";
import CreateProjectDialog from "../../components/CreateProjectDialog";
import { useState, useEffect } from "react";
import {
  createProject,
  getProjects,
  deleteProject,
} from "../../services/api/project";
import { getUsers, deleteUser, updateUser } from "../../services/api/auth";
import toast from "react-hot-toast";

const DashboardPage = () => {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [projects, setProjects] = useState([]);
  const [ownerId, setOwnerId] = useState("");
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getUsers();
      console.log("API DATA:", res.data);
      setUser(res.data.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUser([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.role) setRole(user.role);
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await getProjects();
      console.log("API DATA:", res.data);
      setProjects(res.data.data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = () => {
    setOpen(true);
    setTitle("");
    setDescription("");
    setStatus("pending");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoadingCreate(true);
      const payload = {
        title,
        description,
        status,
        ownerId: ownerId || JSON.parse(localStorage.getItem("user"))._id,
      };
      const res = await createProject(payload);
      const newProject = res.data.data;
      setProjects([newProject, ...projects]);
      toast.success("Project created successfully");
      setOpen(false);
    } catch (error) {
      console.error("Error creating project:", error);
    } finally {
      setLoadingCreate(false);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      setLoadingDelete(true);
      await deleteProject(id);
      fetchProjects();
      toast.success("Project deleted successfully");
    } catch (error) {
      console.error("Error deleting project:", error);
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <>
      <Dashboard
        handleCreateProject={handleCreateProject}
        role={role}
        projects={projects}
        handleDeleteProject={handleDeleteProject}
        loadingDelete={loadingDelete}
      />

      <CreateProjectDialog
        open={open}
        setOpen={setOpen}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        status={status}
        setStatus={setStatus}
        handleSubmit={handleSubmit}
        ownerId={ownerId}
        setOwnerId={setOwnerId}
        user={user}
        setUser={setUser}
        loadingCreate={loadingCreate}
      />
    </>
  );
};

export default DashboardPage;
