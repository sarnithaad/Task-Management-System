import TaskFilters from '../components/TaskFilters';

export default function SearchFilterPage() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginTop: "2rem" }}>Search & Filter Tasks</h2>
      <TaskFilters showResults />
    </div>
  );
}
