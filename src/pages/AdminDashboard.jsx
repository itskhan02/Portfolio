import { useEffect, useMemo, useState } from "react";
import { Edit3, FileText, ImagePlus, LogOut, Plus, Save, Trash2, X } from "lucide-react";
import { api, assetUrl, getStoredImageUrl } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { fallbackSettings } from "../data/defaultPortfolio";

const emptyProject = {
  title: "",
  description: "",
  techStack: "",
  githubUrl: "",
  liveUrl: "",
  imageUrl: "",
  imageFileId: null,
  featured: false,
  image: null,
};

const isValidImageSource = (value) => {
  if (!value) return false;

  const source = value.trim();

  if (/^data:image\//i.test(source)) {
    return true;
  }

  try {
    const url = new URL(source);

    return ["http:", "https:"].includes(url.protocol);
  } catch {
    return false;
  }
};

const getSkillMode = (skill = {}) => {
  if (skill.iconFileId) return "upload";
  if (skill.icon) return "url";
  return "upload";
};

const AdminDashboard = () => {
  const { admin, logout } = useAuth();
  const [settings, setSettings] = useState(fallbackSettings);
  const [projects, setProjects] = useState([]);
  const [resume, setResume] = useState(null);
  const [projectForm, setProjectForm] = useState(emptyProject);
  const [editingId, setEditingId] = useState(null);
  const [resumeForm, setResumeForm] = useState({ buttonText: "Download Resume", resume: null });
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState(false);
  const [isProjectImageDragging, setProjectImageDragging] = useState(false);
  const [projectImageObjectUrl, setProjectImageObjectUrl] = useState("");

  const projectImagePreview = useMemo(() => {
    if (projectForm.image) return projectImageObjectUrl;
    return getStoredImageUrl({ fileId: projectForm.imageFileId, legacyUrl: projectForm.imageUrl, fallback: "/logo1.png" });
  }, [projectForm.image, projectForm.imageFileId, projectForm.imageUrl, projectImageObjectUrl]);

  const stats = useMemo(
    () => [
      { label: "Projects", value: projects.length },
      { label: "Featured", value: projects.filter((project) => project.featured).length },
      { label: "Skills", value: settings.skills?.length || 0 }
    ],
    [projects, settings.skills]
  );

  const loadData = async () => {
    const [settingsResponse, projectsResponse, resumeResponse] = await Promise.all([
      api.get("/settings"),
      api.get("/projects"),
      api.get("/resume")
    ]);

    setSettings(settingsResponse.data || fallbackSettings);
    setProjects(projectsResponse.data || []);
    setResume(resumeResponse.data);
    setResumeForm((current) => ({
      ...current,
      buttonText: resumeResponse.data?.buttonText || settingsResponse.data?.resumeButtonText || "Download Resume"
    }));
  };

  useEffect(() => {
    loadData().catch(() => setNotice("Could not load admin data. Check that the API and MongoDB are running."));
  }, []);

  useEffect(() => {
    if (!projectForm.image) {
      setProjectImageObjectUrl("");
      return undefined;
    }

    const objectUrl = URL.createObjectURL(projectForm.image);
    setProjectImageObjectUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [projectForm.image]);

  const flash = (message) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3500);
  };

  const broadcastUpdate = () => {
    localStorage.setItem("portfolio:last-updated", String(Date.now()));
    window.dispatchEvent(new Event("portfolio:updated"));
  };

  const updateSetting = (key, value) => setSettings((current) => ({ ...current, [key]: value }));
  const updateSocial = (key, value) =>
    setSettings((current) => ({ ...current, socialLinks: { ...current.socialLinks, [key]: value } }));

  const updateArrayItem = (collection, index, key, value) => {
    setSettings((current) => ({
      ...current,
      [collection]: current[collection].map((item, itemIndex) => (itemIndex === index ? { ...item, [key]: value } : item))
    }));
  };

  const addArrayItem = (collection, item) => {
    setSettings((current) => ({ ...current, [collection]: [...(current[collection] || []), item] }));
  };

  const removeArrayItem = async (collection, index) => {
    if (collection === "skills") {
      const item = settings[collection]?.[index];
      const fileId = item?.iconFileId;

      if (fileId) {
        try {
          await api.delete(`/images/${fileId}`);
        } catch (error) {
          console.warn("Skill GridFS cleanup failed:", error);
        }
      }
    }

    setSettings((current) => ({
      ...current,
      [collection]: current[collection].filter((_, itemIndex) => itemIndex !== index)
    }));
  };

  const saveSettings = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      const response = await api.put("/settings", settings);
      setSettings(response.data);
      broadcastUpdate();
      flash("Portfolio settings saved.");
    } catch (err) {
      flash(err.response?.data?.message || "Settings could not be saved.");
    } finally {
      setSaving(false);
    }
  };

  const submitProject = async (event) => {
    event.preventDefault();
    setSaving(true);

    const formData = new FormData();
    formData.append("title", projectForm.title);
    formData.append("description", projectForm.description);
    formData.append("techStack", projectForm.techStack);
    formData.append("githubUrl", projectForm.githubUrl);
    formData.append("liveUrl", projectForm.liveUrl);
    formData.append("featured", String(projectForm.featured));
    if (projectForm.image) formData.append("image", projectForm.image);

    try {
      if (editingId) {
        await api.put(`/projects/${editingId}`, formData);
        flash("Project updated.");
      } else {
        await api.post("/projects", formData);
        flash("Project added.");
      }
      setProjectForm(emptyProject);
      setEditingId(null);
      broadcastUpdate();
      await loadData();
    } catch (err) {
      flash(err.response?.data?.message || "Project could not be saved.");
    } finally {
      setSaving(false);
    }
  };

  const editProject = (project) => {
    setEditingId(project._id);
    setProjectForm({
      title: project.title,
      description: project.description,
      techStack: project.techStack?.join(", ") || "",
      githubUrl: project.githubUrl || "",
      liveUrl: project.liveUrl || "",
      imageUrl: project.imageUrl || "",
      imageFileId: project.imageFileId || null,
      featured: Boolean(project.featured),
      image: null
    });
    document.getElementById("project-editor")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const setProjectImage = (file) => {
    if (!file) return;
    setProjectForm((current) => ({ ...current, image: file }));
  };

  const handleProjectImageDrop = (event) => {
    event.preventDefault();
    setProjectImageDragging(false);
    setProjectImage(event.dataTransfer.files?.[0]);
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    await api.delete(`/projects/${id}`);
    setProjects((current) => current.filter((project) => project._id !== id));
    broadcastUpdate();
    flash("Project deleted.");
  };

  const saveResume = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      if (resumeForm.resume) {
        const formData = new FormData();
        formData.append("resume", resumeForm.resume);
        formData.append("buttonText", resumeForm.buttonText);
        const response = await api.post("/resume", formData);
        setResume(response.data);
      } else {
        const response = await api.patch("/resume/button-text", { buttonText: resumeForm.buttonText });
        setResume(response.data);
      }
      setSettings((current) => ({ ...current, resumeButtonText: resumeForm.buttonText }));
      broadcastUpdate();
      flash("Resume settings saved.");
    } catch (err) {
      flash(err.response?.data?.message || "Resume could not be saved.");
    } finally {
      setSaving(false);
    }
  };

  const deleteResume = async () => {
    if (!window.confirm("Remove the active resume?")) return;
    await api.delete("/resume");
    setResume(null);
    broadcastUpdate();
    flash("Resume removed.");
  };

  return (
    <main className="admin-dashboard">
      <aside className="admin-sidebar">
        <a className="brand" href="/">
          <img src="/logo1.png" alt="" />
          <span>Portfolio Admin</span>
        </a>
        <nav>
          <a href="#overview">Overview</a>
          <a href="#project-editor">Projects</a>
          <a href="#resume-manager">Resume</a>
          <a href="#settings-manager">Settings</a>
        </nav>
        <button
          className="button button-ghost px-2"
          type="button"
          onClick={logout}
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      <section className="admin-content">
        <header className="admin-topbar" id="overview">
          <div>
            <span className="eyebrow">Logged in as {admin?.email}</span>
            <h1>Manage your portfolio</h1>
            <p>
              Updates here are reflected on the public portfolio automatically.
            </p>
          </div>
          <a
            className="button button-primary"
            href="/"
            target="_blank"
            rel="noreferrer"
          >
            View Site
          </a>
        </header>

        {notice && (
          <div className="admin-notice" role="status">
            {notice}
          </div>
        )}

        <div className="admin-stats">
          {stats.map((stat) => (
            <article className="glass-panel" key={stat.label}>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </article>
          ))}
        </div>

        <section className="admin-panel glass-panel" id="project-editor">
          <div className="panel-heading mb-4">
            <div>
              <span className="eyebrow">Project Management</span>
              <h3>{editingId ? "Edit Project" : "Add Project"}</h3>
            </div>
            {editingId && (
              <button
                className="icon-button"
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setProjectForm(emptyProject);
                }}
                aria-label="Cancel edit"
              >
                <X size={18} />
              </button>
            )}
          </div>
          <form className="admin-form" onSubmit={submitProject}>
            <div className="admin-editor-grid">
              <label
                className={`image-upload-card ${isProjectImageDragging ? "is-dragging" : ""}`}
                onDragOver={(event) => {
                  event.preventDefault();
                  setProjectImageDragging(true);
                }}
                onDragLeave={() => setProjectImageDragging(false)}
                onDrop={handleProjectImageDrop}
              >
                {projectImagePreview ? (
                  <>
                    <img src={projectImagePreview} alt="Project preview" />
                    <span className="image-upload-overlay">
                      <ImagePlus size={22} /> Replace image
                    </span>
                  </>
                ) : (
                  <span>
                    <ImagePlus size={28} /> Drop or choose project image
                  </span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => setProjectImage(event.target.files?.[0])}
                />
              </label>
              <div className="admin-editor-stack">
                <input
                  value={projectForm.title}
                  onChange={(event) =>
                    setProjectForm((current) => ({
                      ...current,
                      title: event.target.value,
                    }))
                  }
                  placeholder="Project title"
                  required
                />
                <textarea
                  value={projectForm.description}
                  onChange={(event) =>
                    setProjectForm((current) => ({
                      ...current,
                      description: event.target.value,
                    }))
                  }
                  placeholder="Description"
                  required
                />
                <input
                  value={projectForm.techStack}
                  onChange={(event) =>
                    setProjectForm((current) => ({
                      ...current,
                      techStack: event.target.value,
                    }))
                  }
                  placeholder="Tech stack, comma separated"
                />
                <div className="two-column">
                  <input
                    value={projectForm.githubUrl}
                    onChange={(event) =>
                      setProjectForm((current) => ({
                        ...current,
                        githubUrl: event.target.value,
                      }))
                    }
                    placeholder="GitHub URL"
                  />
                  <input
                    value={projectForm.liveUrl}
                    onChange={(event) =>
                      setProjectForm((current) => ({
                        ...current,
                        liveUrl: event.target.value,
                      }))
                    }
                    placeholder="Live URL"
                  />
                </div>
                <div className="admin-form-row">
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={projectForm.featured}
                      onChange={(event) =>
                        setProjectForm((current) => ({
                          ...current,
                          featured: event.target.checked,
                        }))
                      }
                    />
                    <span>Featured project</span>
                  </label>
                  {projectForm.image && (
                    <button
                      className="button button-ghost"
                      type="button"
                      onClick={() =>
                        setProjectForm((current) => ({
                          ...current,
                          image: null,
                        }))
                      }
                    >
                      <X size={17} /> Clear selected image
                    </button>
                  )}
                </div>
                <button
                  className="button button-primary"
                  type="submit"
                  disabled={saving}
                >
                  {editingId ? "Update Project" : "Add Project"}{" "}
                  <Save size={18} />
                </button>
              </div>
            </div>
          </form>

          <div className="admin-project-list">
            {projects.map((project) => (
              <article key={project._id} className="admin-project-card">
                <img
                  src={getStoredImageUrl({
                    fileId: project.imageFileId,
                    legacyUrl: project.imageUrl,
                    fallback: "/logo1.png",
                  })}
                  onError={(event) => {
                    event.currentTarget.src = "/logo1.png";
                  }}
                  alt={project.title}
                />
                <div className="admin-project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
                <div className="admin-project-actions">
                  <button
                    className="icon-button"
                    onClick={() => editProject(project)}
                  >
                    <Edit3 size={17} />
                  </button>

                  <button
                    className="icon-button danger"
                    onClick={() => deleteProject(project._id)}
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="admin-panel glass-panel" id="resume-manager">
          <div className="panel-heading mb-4">
            <div>
              <span className="eyebrow">Resume Management</span>
              <h3>Latest Resume</h3>
            </div>
            {resume?.fileUrl && (
              <a
                className="button button-ghost"
                href={assetUrl(resume.fileUrl)}
                target="_blank"
                rel="noreferrer"
              >
                <FileText size={18} /> Open
              </a>
            )}
          </div>
          <form className="admin-form" onSubmit={saveResume}>
            <input
              value={resumeForm.buttonText}
              onChange={(event) =>
                setResumeForm((current) => ({
                  ...current,
                  buttonText: event.target.value,
                }))
              }
              placeholder="Resume "
              required
            />
            <label className="file-drop">
              <FileText size={18} />
              <span>
                {resumeForm.resume?.name ||
                  resume?.fileName ||
                  "Upload PDF resume"}
              </span>
              <input
                type="file"
                accept="application/pdf"
                onChange={(event) =>
                  setResumeForm((current) => ({
                    ...current,
                    resume: event.target.files?.[0] || null,
                  }))
                }
              />
            </label>
            <div className="admin-actions">
              <button
                className="button button-primary"
                type="submit"
                disabled={saving}
              >
                Save Resume <Save size={18} />
              </button>
              <button
                className="button button-danger"
                type="button"
                onClick={deleteResume}
                disabled={!resume}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </form>
        </section>

        <section className="admin-panel glass-panel" id="settings-manager">
          <div className="panel-heading mb-4">
            <div>
              <span className="eyebrow">Portfolio Settings</span>
              <h3>Edit Profile Content</h3>
            </div>
          </div>
          <form className="admin-form" onSubmit={saveSettings}>
            <div className="two-column">
              <input
                value={settings.name}
                onChange={(event) => updateSetting("name", event.target.value)}
                placeholder="Name"
                required
              />
              <input
                value={settings.jobTitle}
                onChange={(event) =>
                  updateSetting("jobTitle", event.target.value)
                }
                placeholder="Job title"
                required
              />
            </div>
            <textarea
              value={settings.summary}
              onChange={(event) => updateSetting("summary", event.target.value)}
              placeholder="Summary"
              required
            />
            <textarea
              value={settings.about}
              onChange={(event) => updateSetting("about", event.target.value)}
              placeholder="About me"
              required
            />
            <div className="two-column">
              <input
                value={settings.email}
                onChange={(event) => updateSetting("email", event.target.value)}
                placeholder="Email"
                required
              />
              <input
                value={settings.phone}
                onChange={(event) => updateSetting("phone", event.target.value)}
                placeholder="Phone"
                required
              />
            </div>
            <input
              value={settings.location}
              onChange={(event) =>
                updateSetting("location", event.target.value)
              }
              placeholder="Location"
              required
            />
            <div className="two-column">
              {["linkedin", "github", "instagram", "telegram"].map((key) => (
                <input
                  key={key}
                  value={settings.socialLinks?.[key] || ""}
                  onChange={(event) => updateSocial(key, event.target.value)}
                  placeholder={`${key} URL`}
                />
              ))}
            </div>

            <EditableList
              title="Skills"
              items={settings.skills || []}
              fields={["name", "icon"]}
              onChange={(index, key, value) =>
                updateArrayItem("skills", index, key, value)
              }
              onAdd={() =>
                addArrayItem("skills", {
                  name: "",
                  icon: "",
                  iconFileId: null,
                })
              }
              onRemove={(index) => removeArrayItem("skills", index)}
            />
            <EditableList
              title="Experience"
              items={settings.experience || []}
              fields={["role", "company", "period", "description"]}
              onChange={(index, key, value) =>
                updateArrayItem("experience", index, key, value)
              }
              onAdd={() =>
                addArrayItem("experience", {
                  role: "",
                  company: "",
                  period: "",
                  description: "",
                })
              }
              onRemove={(index) => removeArrayItem("experience", index)}
            />
            <EditableList
              title="Education"
              items={settings.education || []}
              fields={["title", "institution", "period", "image"]}
              onChange={(index, key, value) =>
                updateArrayItem("education", index, key, value)
              }
              onAdd={() =>
                addArrayItem("education", {
                  title: "",
                  institution: "",
                  period: "",
                  image: "",
                })
              }
              onRemove={(index) => removeArrayItem("education", index)}
            />

            <button
              className="button button-primary"
              type="submit"
              disabled={saving}
            >
              Save Settings <Save size={18} />
            </button>
          </form>
        </section>
      </section>
    </main>
  );
};

const EditableList = ({ title, items, fields, onChange, onAdd, onRemove }) => {
  const [imageModes, setImageModes] = useState({});
  const [urlLoadErrors, setUrlLoadErrors] = useState({});

  const getImageMode = (index, item, field) => {
    const key = `${title}-${index}-${field}`;

    if (imageModes[key]) {
      return imageModes[key];
    }

    if (item[`${field}FileId`]) {
      return "upload";
    }

    if (item[field]) {
      return "url";
    }

    return "upload";
  };

  const handleImageUpload = async (index, field, file) => {
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("type", field === "icon" ? "skill" : "project");
      const currentItem = items[index] || {};
      const response = await api.post("/images/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (
        currentItem.iconFileId &&
        currentItem.iconFileId !== response.data.fileId
      ) {
        try {
          await api.delete(`/images/${currentItem.iconFileId}`);
        } catch (deleteError) {
          console.warn("Previous GridFS image cleanup failed:", deleteError);
        }
      }

      onChange(index, field, "");
      onChange(index, `${field}FileId`, response.data.fileId);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const renderSkillRow = (item, index) => {
    const modeKey = `${title}-${index}`;
    const mode = imageModes[modeKey] || getImageMode(index, item, "icon");
    const previewUrl = getStoredImageUrl({
      fileId: item.iconFileId,
      legacyUrl: item.icon,
      fallback: "",
    });

    const switchImageMode = (index, field, mode) => {
      const key = `${title}-${index}-${field}`;

      setImageModes((current) => ({
        ...current,
        [key]: mode,
      }));
    };

    const urlErrorKey = `skill-${index}`;
    const hasUrlLoadError = Boolean(urlLoadErrors[urlErrorKey]);



    const handleUrlChange = (nextValue) => {
      setImageModes((current) => ({
        ...current,
        [modeKey]: "url",
      }));
      onChange(index, "icon", nextValue || "");
      onChange(index, "iconFileId", null);
      setUrlLoadErrors((current) => {
        if (!current[urlErrorKey]) return current;
        const next = { ...current };
        delete next[urlErrorKey];
        return next;
      });
    };

    return (
      <div className="editable-row" key={`${title}-${index}`}>
        <input
          value={item.name || ""}
          onChange={(event) => onChange(index, "name", event.target.value)}
          placeholder="Skill name"
        />

        <div className="settings-image-field">
          <div className="admin-form-row" style={{ marginBottom: "10px" }}>
            <button
              className={`button ${
                mode === "upload" ? "button-primary" : "button-ghost"
              }`}
              type="button"
              aria-pressed={mode === "upload"}
              onClick={() => switchImageMode(index, "icon", "upload")}
            >
              <ImagePlus size={17} />
              Upload Image
            </button>

            <button
              className={`button ${
                mode === "url" ? "button-primary" : "button-ghost"
              }`}
              type="button"
              aria-pressed={mode === "url"}
              onClick={() => switchImageMode(index, "icon", "url")}
            >
              🔗 Image URL
            </button>
          </div>

          {mode === "upload" ? (
            <>
              <label
                className="settings-image-preview"
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();
                  const droppedFile = event.dataTransfer.files?.[0];
                  handleImageUpload(index, "icon", droppedFile);
                }}
              >
                {previewUrl ? (
                  <img src={previewUrl} alt="" />
                ) : (
                  <span>
                    <ImagePlus size={20} /> Drop or choose image
                  </span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    handleImageUpload(index, "icon", event.target.files?.[0])
                  }
                />
              </label>
              <div className="admin-form-row">
                <button
                  className="button button-ghost"
                  type="button"
                  onClick={() => {
                    if (item.iconFileId) {
                      api
                        .delete(`/images/${item.iconFileId}`)
                        .catch((error) => {
                          console.warn("GridFS image cleanup failed:", error);
                        });
                    }
                    onChange(index, "icon", "");
                    onChange(index, "iconFileId", null);
                  }}
                >
                  Clear
                </button>
              </div>
            </>
          ) : (
            <>
              <input
                type="url"
                value={item.icon || ""}
                onChange={(event) => handleUrlChange(event.target.value)}
                placeholder="https://example.com/react-icon.png"
              />
              {isValidImageSource(item.icon) ? (
                hasUrlLoadError ? (
                  <div
                    className="settings-image-preview"
                    style={{ marginTop: "8px" }}
                  >
                    <span>
                      <ImagePlus size={20} /> Unable to load image from this
                      URL.
                    </span>
                  </div>
                ) : (
                  <div
                    className="settings-image-preview"
                    style={{ marginTop: "8px" }}
                  >
                    <img
                      src={assetUrl(item.icon)}
                      alt={`${item.name || "Skill"} icon`}
                      onError={() =>
                        setUrlLoadErrors((current) => ({
                          ...current,
                          [urlErrorKey]: true,
                        }))
                      }
                      onLoad={() =>
                        setUrlLoadErrors((current) => {
                          const next = { ...current };
                          delete next[urlErrorKey];
                          return next;
                        })
                      }
                    />
                  </div>
                )
              ) : item.icon ? (
                <div
                  className="settings-image-preview"
                  style={{ marginTop: "8px" }}
                >
                  <span>Unable to load image from this URL.</span>
                </div>
              ) : null}
              <div className="admin-form-row">
                <button
                  className="button button-ghost"
                  type="button"
                  onClick={() => {
                    if (item.iconFileId) {
                      api
                        .delete(`/images/${item.iconFileId}`)
                        .catch((error) => {
                          console.warn("GridFS image cleanup failed:", error);
                        });
                    }
                    onChange(index, "icon", "");
                    onChange(index, "iconFileId", null);
                  }}
                >
                  Clear
                </button>
              </div>
            </>
          )}
        </div>

        <button
          className="icon-button danger"
          type="button"
          onClick={() => onRemove(index)}
          aria-label={`Remove ${title} item`}
        >
          <Trash2 size={17} />
        </button>
      </div>
    );
  };

  return (
    <div className={`editable-list editable-list--${title.toLowerCase()}`}>
      <div className="editable-list-heading">
        <h3>{title}</h3>
        <button className="button button-ghost" type="button" onClick={onAdd}>
          <Plus size={17} /> Add
        </button>
      </div>
      {items.map((item, index) => {
        if (title === "Skills") return renderSkillRow(item, index);

        return (
          <div className="editable-row" key={`${title}-${index}`}>
            {fields.map((field) =>
              field === "image" || field === "icon" ? (
                <div className="settings-image-field" key={field}>
                  <label
                    className="settings-image-preview"
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={(event) => {
                      event.preventDefault();
                      const droppedFile = event.dataTransfer.files?.[0];
                      handleImageUpload(index, field, droppedFile);
                    }}
                  >
                    {getStoredImageUrl({
                      fileId: item[`${field}FileId`],
                      legacyUrl: item[field],
                      fallback: "",
                    }) ? (
                      <img
                        src={getStoredImageUrl({
                          fileId: item[`${field}FileId`],
                          legacyUrl: item[field],
                          fallback: "",
                        })}
                        alt=""
                      />
                    ) : (
                      <span>
                        <ImagePlus size={20} /> Upload image
                      </span>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        handleImageUpload(index, field, event.target.files?.[0])
                      }
                    />
                  </label>
                  <button
                    className="button button-ghost"
                    type="button"
                    onClick={() => {
                      onChange(index, field, "");
                      onChange(index, `${field}FileId`, null);
                    }}
                  >
                    Delete Image
                  </button>
                </div>
              ) : field === "description" ? (
                <textarea
                  key={field}
                  value={item[field] || ""}
                  onChange={(event) =>
                    onChange(index, field, event.target.value)
                  }
                  placeholder={field}
                />
              ) : (
                <input
                  key={field}
                  value={item[field] || ""}
                  onChange={(event) =>
                    onChange(index, field, event.target.value)
                  }
                  placeholder={field}
                />
              ),
            )}
            <button
              className="icon-button danger"
              type="button"
              onClick={() => onRemove(index)}
              aria-label={`Remove ${title} item`}
            >
              <Trash2 size={17} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default AdminDashboard;
