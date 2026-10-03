"use client";

import { FormEvent, useEffect, useState } from "react";

type Project = {
  _id: string;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  image?: string;
};

type Skill = {
  _id: string;
  name: string;
  tags: string[];
  icon?: string;
};

const inputClass =
  "w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm text-white outline-none transition focus:border-white/40";
const buttonClass =
  "rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50";

async function responseError(response: Response) {
  const body: unknown = await response.json().catch(() => null);
  if (body && typeof body === "object" && "error" in body && typeof body.error === "string") {
    return body.error;
  }
  return `Request failed (${response.status}).`;
}

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(await responseError(response));
  return response.json() as Promise<T>;
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [resumeUrl, setResumeUrl] = useState("");
  const [location, setLocation] = useState("");
  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [editingSkill, setEditingSkill] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    tech: "",
    github: "",
    live: "",
    image: "",
  });
  const [skillForm, setSkillForm] = useState({ name: "", tags: "", icon: "" });

  async function loadData() {
    const [projectData, skillData] = await Promise.all([
      getJson<Project[]>("/api/projects"),
      getJson<Skill[]>("/api/skills"),
    ]);
    const [resumeResponse, locationResponse] = await Promise.all([
      fetch("/api/resume"),
      fetch("/api/location"),
    ]);

    if (!resumeResponse.ok && resumeResponse.status !== 404) {
      throw new Error(await responseError(resumeResponse));
    }
    if (!locationResponse.ok && locationResponse.status !== 404) {
      throw new Error(await responseError(locationResponse));
    }

    const resume = resumeResponse.ok
      ? ((await resumeResponse.json()) as { url: string })
      : null;
    const currentLocation = locationResponse.ok
      ? ((await locationResponse.json()) as { location: string })
      : null;
    setProjects(projectData);
    setSkills(skillData);
    setResumeUrl(resume?.url ?? "");
    setLocation(currentLocation?.location ?? "");
  }

  useEffect(() => {
    let active = true;
    fetch("/api/admin/session")
      .then((response) => response.json())
      .then(async (result: { authenticated: boolean }) => {
        if (!active) return;
        setAuthenticated(result.authenticated);
        if (result.authenticated) await loadData();
      })
      .catch((error: unknown) => {
        if (active) setMessage(error instanceof Error ? error.message : "Unable to load admin.");
      })
      .finally(() => {
        if (active) setCheckingSession(false);
      });
    return () => {
      active = false;
    };
  }, []);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) throw new Error(await responseError(response));
      setAuthenticated(true);
      setPassword("");
      await loadData();
      setMessage("Signed in.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to sign in.");
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    setBusy(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      setAuthenticated(false);
      setProjects([]);
      setSkills([]);
      setMessage("Signed out.");
    } finally {
      setBusy(false);
    }
  }

  async function submitProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const payload = {
      title: projectForm.title,
      description: projectForm.description,
      tech: projectForm.tech.split(",").map((value) => value.trim()).filter(Boolean),
      ...(projectForm.github ? { github: projectForm.github } : {}),
      ...(projectForm.live ? { live: projectForm.live } : {}),
      ...(projectForm.image ? { image: projectForm.image } : {}),
    };
    try {
      const response = await fetch(
        editingProject ? `/api/projects/${editingProject}` : "/api/projects",
        {
          method: editingProject ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) throw new Error(await responseError(response));
      setProjectForm({ title: "", description: "", tech: "", github: "", live: "", image: "" });
      setEditingProject(null);
      await loadData();
      setMessage("Project saved.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to save project.");
    } finally {
      setBusy(false);
    }
  }

  async function submitSkill(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const payload = {
      name: skillForm.name,
      tags: skillForm.tags.split(",").map((value) => value.trim()).filter(Boolean),
      ...(skillForm.icon ? { icon: skillForm.icon } : {}),
    };
    try {
      const response = await fetch(
        editingSkill ? `/api/skills/${editingSkill}` : "/api/skills",
        {
          method: editingSkill ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) throw new Error(await responseError(response));
      setSkillForm({ name: "", tags: "", icon: "" });
      setEditingSkill(null);
      await loadData();
      setMessage("Skill group saved.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to save skill group.");
    } finally {
      setBusy(false);
    }
  }

  async function removeItem(url: string, label: string) {
    if (!window.confirm(`Delete this ${label}?`)) return;
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch(url, { method: "DELETE" });
      if (!response.ok) throw new Error(await responseError(response));
      await loadData();
      setMessage(`${label[0].toUpperCase()}${label.slice(1)} deleted.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : `Unable to delete ${label}.`);
    } finally {
      setBusy(false);
    }
  }

  async function saveSetting(key: "resume" | "location", value: string) {
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch(`/api/${key}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(key === "resume" ? { url: value } : { location: value }),
      });
      if (!response.ok) throw new Error(await responseError(response));
      setMessage(`${key === "resume" ? "Resume link" : "Location"} saved.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : `Unable to save ${key}.`);
    } finally {
      setBusy(false);
    }
  }

  function editProject(project: Project) {
    setEditingProject(project._id);
    setProjectForm({
      title: project.title,
      description: project.description,
      tech: project.tech.join(", "),
      github: project.github ?? "",
      live: project.live ?? "",
      image: project.image ?? "",
    });
  }

  function editSkill(skill: Skill) {
    setEditingSkill(skill._id);
    setSkillForm({
      name: skill.name,
      tags: skill.tags.join(", "),
      icon: skill.icon ?? "",
    });
  }

  if (checkingSession) {
    return <main className="min-h-screen bg-[#09090b] p-8 text-white">Checking admin session...</main>;
  }

  if (!authenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#09090b] px-5 text-white">
        <form onSubmit={login} className="w-full max-w-sm space-y-5 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
          <div>
            <p className="text-sm text-white/50">Portfolio</p>
            <h1 className="mt-1 text-2xl font-semibold">Admin sign in</h1>
          </div>
          <label className="block space-y-2 text-sm text-white/70">
            Username
            <input
              autoComplete="username"
              className={inputClass}
              onChange={(event) => setUsername(event.target.value)}
              required
              value={username}
            />
          </label>
          <label className="block space-y-2 text-sm text-white/70">
            Password
            <input
              autoComplete="current-password"
              className={inputClass}
              onChange={(event) => setPassword(event.target.value)}
              required
              type="password"
              value={password}
            />
          </label>
          {message && <p role="alert" className="text-sm text-red-300">{message}</p>}
          <button className={`${buttonClass} w-full`} disabled={busy} type="submit">
            {busy ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#09090b] px-5 py-8 text-white md:px-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-white/50">Portfolio</p>
            <h1 className="text-3xl font-semibold">Admin dashboard</h1>
          </div>
          <button className={buttonClass} disabled={busy} onClick={logout} type="button">Sign out</button>
        </header>

        {message && <p role="status" className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/80">{message}</p>}

        <section className="grid gap-6 md:grid-cols-2">
          <form
            className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            onSubmit={(event) => {
              event.preventDefault();
              void saveSetting("resume", resumeUrl);
            }}
          >
            <h2 className="text-xl font-medium">Resume link</h2>
            <input
              aria-label="Resume URL"
              className={inputClass}
              onChange={(event) => setResumeUrl(event.target.value)}
              placeholder="https://..."
              type="url"
              value={resumeUrl}
            />
            <div className="flex gap-3">
              <button className={buttonClass} disabled={busy} type="submit">Save link</button>
              <button className={buttonClass} disabled={busy || !resumeUrl} onClick={() => void removeItem("/api/resume", "resume link")} type="button">Delete</button>
            </div>
          </form>
          <form
            className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            onSubmit={(event) => {
              event.preventDefault();
              void saveSetting("location", location);
            }}
          >
            <h2 className="text-xl font-medium">Current location</h2>
            <input
              aria-label="Current location"
              className={inputClass}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="City, Country"
              value={location}
            />
            <div className="flex gap-3">
              <button className={buttonClass} disabled={busy} type="submit">Save location</button>
              <button className={buttonClass} disabled={busy || !location} onClick={() => void removeItem("/api/location", "location")} type="button">Delete</button>
            </div>
          </form>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <form onSubmit={submitProject} className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-xl font-medium">{editingProject ? "Edit project" : "Add project"}</h2>
            <input className={inputClass} onChange={(event) => setProjectForm({ ...projectForm, title: event.target.value })} placeholder="Project title" required value={projectForm.title} />
            <textarea className={`${inputClass} min-h-24`} onChange={(event) => setProjectForm({ ...projectForm, description: event.target.value })} placeholder="Description" required value={projectForm.description} />
            <input className={inputClass} onChange={(event) => setProjectForm({ ...projectForm, tech: event.target.value })} placeholder="Technologies (comma separated)" required value={projectForm.tech} />
            <input className={inputClass} onChange={(event) => setProjectForm({ ...projectForm, github: event.target.value })} placeholder="GitHub URL (optional)" value={projectForm.github} />
            <input className={inputClass} onChange={(event) => setProjectForm({ ...projectForm, live: event.target.value })} placeholder="Live URL (optional)" value={projectForm.live} />
            <input className={inputClass} onChange={(event) => setProjectForm({ ...projectForm, image: event.target.value })} placeholder="Image URL or path (optional)" value={projectForm.image} />
            <div className="flex gap-3">
              <button className={buttonClass} disabled={busy} type="submit">{editingProject ? "Save project" : "Add project"}</button>
              {editingProject && <button className={buttonClass} onClick={() => { setEditingProject(null); setProjectForm({ title: "", description: "", tech: "", github: "", live: "", image: "" }); }} type="button">Cancel</button>}
            </div>
          </form>

          <div className="space-y-3">
            <h2 className="text-xl font-medium">Projects ({projects.length})</h2>
            {projects.map((project) => (
              <article className="flex flex-wrap items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4" key={project._id}>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium">{project.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-white/50">{project.description}</p>
                  <p className="mt-2 text-xs text-white/40">{project.tech.join(" · ")}</p>
                </div>
                <div className="flex gap-2">
                  <button className={buttonClass} onClick={() => editProject(project)} type="button">Edit</button>
                  <button className={buttonClass} disabled={busy} onClick={() => void removeItem(`/api/projects/${project._id}`, "project")} type="button">Delete</button>
                </div>
              </article>
            ))}
            {!projects.length && <p className="text-sm text-white/40">No projects stored yet.</p>}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <form onSubmit={submitSkill} className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-xl font-medium">{editingSkill ? "Edit skill group" : "Add skill group"}</h2>
            <input className={inputClass} onChange={(event) => setSkillForm({ ...skillForm, name: event.target.value })} placeholder="Group name" required value={skillForm.name} />
            <input className={inputClass} onChange={(event) => setSkillForm({ ...skillForm, tags: event.target.value })} placeholder="Skills (comma separated)" required value={skillForm.tags} />
            <input className={inputClass} onChange={(event) => setSkillForm({ ...skillForm, icon: event.target.value })} placeholder="Icon key (optional)" value={skillForm.icon} />
            <div className="flex gap-3">
              <button className={buttonClass} disabled={busy} type="submit">{editingSkill ? "Save skill group" : "Add skill group"}</button>
              {editingSkill && <button className={buttonClass} onClick={() => { setEditingSkill(null); setSkillForm({ name: "", tags: "", icon: "" }); }} type="button">Cancel</button>}
            </div>
          </form>

          <div className="space-y-3">
            <h2 className="text-xl font-medium">Skill groups ({skills.length})</h2>
            {skills.map((skill) => (
              <article className="flex flex-wrap items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4" key={skill._id}>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium">{skill.name}</h3>
                  <p className="mt-1 text-sm text-white/50">{skill.tags.join(" · ")}</p>
                </div>
                <div className="flex gap-2">
                  <button className={buttonClass} onClick={() => editSkill(skill)} type="button">Edit</button>
                  <button className={buttonClass} disabled={busy} onClick={() => void removeItem(`/api/skills/${skill._id}`, "skill group")} type="button">Delete</button>
                </div>
              </article>
            ))}
            {!skills.length && <p className="text-sm text-white/40">No skill groups stored yet.</p>}
          </div>
        </section>
      </div>
    </main>
  );
}
