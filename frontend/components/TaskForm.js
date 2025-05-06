// Example: TaskForm.js

export default function TaskForm({ onSubmit, onChange, form }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f9f9f9"
      }}
    >
      <form
        onSubmit={onSubmit}
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          gap: "1.2rem",
          minWidth: "320px"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <label htmlFor="title" style={{ minWidth: "100px", textAlign: "left" }}>Title:</label>
          <input
            id="title"
            type="text"
            name="title"
            value={form.title || ""}
            onChange={onChange}
            required
            style={{ flex: 1 }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <label htmlFor="description" style={{ minWidth: "100px", textAlign: "left" }}>Description:</label>
          <input
            id="description"
            type="text"
            name="description"
            value={form.description || ""}
            onChange={onChange}
            required
            style={{ flex: 1 }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <label htmlFor="dueDate" style={{ minWidth: "100px", textAlign: "left" }}>Due Date:</label>
          <input
            id="dueDate"
            type="date"
            name="dueDate"
            value={form.dueDate || ""}
            onChange={onChange}
            required
            style={{ flex: 1 }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <label htmlFor="priority" style={{ minWidth: "100px", textAlign: "left" }}>Priority:</label>
          <select
            id="priority"
            name="priority"
            value={form.priority || ""}
            onChange={onChange}
            required
            style={{ flex: 1 }}
          >
            <option value="">Select</option>
            <option value="Low">Low</option>
            <option value="Normal">Normal</option>
            <option value="High">High</option>
          </select>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <label htmlFor="status" style={{ minWidth: "100px", textAlign: "left" }}>Status:</label>
          <select
            id="status"
            name="status"
            value={form.status || ""}
            onChange={onChange}
            required
            style={{ flex: 1 }}
          >
            <option value="">Select</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <button type="submit" style={{ marginTop: "1rem" }}>Create Task</button>
      </form>
    </div>
  );
}
