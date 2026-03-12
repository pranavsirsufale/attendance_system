import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const EMPTY = { timetable: "", date: "", status: "" };

const tok = () => localStorage.getItem("access_token");
const authH = () => ({ Authorization: `Bearer ${tok()}` });

const STATUS_META = {
  Scheduled: { color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300", dot: "bg-blue-500" },
  Completed: { color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300", dot: "bg-green-500" },
  Cancelled: { color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300", dot: "bg-red-500" },
};

const PAGE_SIZE = 20;

function SessionCRUD({ notifyUser }) {
  const [items, setItems] = useState([]);
  const [timetables, setTimetables] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [formData, setFormData] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();

  /* ── bootstrap fetches (parallel) ────────────────────── */
  useEffect(() => {
    if (!tok()) { navigate("/"); return; }
    Promise.all([fetchTeachers(), fetchTimetables(), fetchSemesters()]);
  }, []);

  useEffect(() => { fetchItems(); }, [page, selectedTeacher, selectedSemester]);

  /* ── helpers ──────────────────────────────────────────── */
  const closeForm = () => { setShowForm(false); setEditingId(null); setFormData(EMPTY); };

  const fmtDate = (d) => {
    if (!d) return "—";
    const [y, m, day] = d.split("-");
    return `${day}/${m}/${y}`;
  };

  /* ── data fetchers ────────────────────────────────────── */
  const fetchItems = async () => {
    try {
      setLoading(true);
      let url = `/api/admin/sessions/?page=${page}&page_size=${PAGE_SIZE}`;
      if (selectedTeacher) url += `&teacher_id=${selectedTeacher}`;
      if (selectedSemester) url += `&semester=${selectedSemester}`;
      const r = await axios.get(url, { headers: authH() });
      const data = r.data;
      setItems(data.results ?? data);
      const count = data.count ?? data.length;
      setTotalCount(count);
      setTotalPages(Math.max(1, Math.ceil(count / PAGE_SIZE)));
    } catch (e) {
      if (e.response?.status === 401 || e.response?.status === 403) navigate("/");
      notifyUser?.(`Failed to load sessions: ${e.response?.data?.detail || e.message}`, "error");
    } finally { setLoading(false); }
  };

  const fetchTeachers = async () => {
    try {
      const r = await axios.get("/api/admin/teachers/", { headers: authH() });
      setTeachers(r.data);
    } catch (e) {
      notifyUser?.("Failed to load teachers", "error");
    }
  };

  const fetchTimetables = async () => {
    try {
      const r = await axios.get("/api/admin/timetables/", { headers: authH() });
      setTimetables(r.data);
    } catch (e) {
      notifyUser?.("Failed to load timetables", "error");
    }
  };

  const fetchSemesters = async () => {
    try {
      const r = await axios.get("/api/admin/subjects/", { headers: authH() });
      const unique = [...new Set(r.data.map(s => s.semester))].sort((a, b) => a - b);
      setSemesters(unique);
    } catch (e) {
      notifyUser?.("Failed to load semesters", "error");
    }
  };

  /* ── form handlers ────────────────────────────────────── */
  const handleSubmit = async () => {
    if (!formData.timetable || !formData.date || !formData.status) {
      notifyUser?.("Please fill in all fields: Timetable, Date, and Status", "error");
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        const r = await axios.put(`/api/admin/sessions/${editingId}/`, formData, { headers: authH() });
        notifyUser?.(r.data?.message || "Session updated", "success");
      } else {
        const r = await axios.post("/api/admin/sessions/", formData, { headers: authH() });
        notifyUser?.(r.data?.message || "Session created", "success");
      }
      closeForm();
      await fetchItems();
    } catch (e) {
      notifyUser?.(
        `Failed to ${editingId ? "update" : "create"} session: ${JSON.stringify(e.response?.data || e.message)}`,
        "error"
      );
    } finally { setSaving(false); }
  };

  const handleEdit = (item) => {
    setFormData({ timetable: item.timetable.id, date: item.date, status: item.status });
    setEditingId(item.id);
    setShowForm(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/api/admin/sessions/${deleteId}/`, { headers: authH() });
      notifyUser?.("Session deleted", "warning");
      setDeleteId(null);
      await fetchItems();
    } catch (e) {
      notifyUser?.(`Delete failed: ${e.response?.data?.detail || e.message}`, "error");
      setDeleteId(null);
    }
  };

  /* ── timetable label helper ───────────────────────────── */
  const ttLabel = (tt) =>
    `${tt.section?.name ?? ""} · ${tt.subject?.name ?? ""}  (${tt.day_of_week ?? ""} ${tt.start_time?.slice(0, 5) ?? ""})`;

  /* ── render ───────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-6">

      {/* ── Page header ── */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate("/admin")}
          className="flex items-center gap-1.5 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 font-medium transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Dashboard
        </button>

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
        >
          Sessions
        </motion.h1>

        <button
          onClick={() => { setFormData(EMPTY); setEditingId(null); setShowForm(true); }}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg active:scale-95 transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Session
        </button>
      </div>

      {/* ── Filter bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-indigo-100 dark:border-gray-700 p-5 mb-8 space-y-4"
      >
        {/* Teacher pills */}
        <div>
          <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 uppercase tracking-wide mb-2">Teacher</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => { setSelectedTeacher(null); setPage(1); }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${!selectedTeacher
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                  : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-indigo-400"
                }`}
            >
              All
            </button>
            {teachers.map(t => (
              <button
                key={t.id}
                onClick={() => { setSelectedTeacher(t.id); setPage(1); }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${selectedTeacher === t.id
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                    : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-indigo-400"
                  }`}
              >
                {t.first_name} {t.last_name}
              </button>
            ))}
          </div>
        </div>

        {/* Semester + count row */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 uppercase tracking-wide">Semester</p>
            <select
              value={selectedSemester}
              onChange={e => { setSelectedSemester(e.target.value); setPage(1); }}
              className="p-2 border border-indigo-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-200  focus:ring-2 focus:ring-indigo-400 transition-all"
            >
              <option value="">All</option>
              {semesters.map(s => <option key={s} value={s}>Semester {s}</option>)}
            </select>
          </div>
          <span className="ml-auto text-sm text-indigo-600 dark:text-indigo-400 text-gray-800 dark:text-gray-200  font-medium">
            {totalCount} session{totalCount !== 1 ? "s" : ""}
          </span>
        </div>
      </motion.div>

      {/* ── Sessions table ── */}
      {loading ? (
        <div className="flex justify-center py-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-10 h-10 border-4 border-indigo-400 border-t-transparent rounded-full"
          />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-24 text-gray-400 dark:text-gray-500">
          <svg className="w-14 h-14 mx-auto mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm">No sessions found for the selected filters</p>
        </div>
      ) : (
        <>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-indigo-100 dark:border-gray-700 overflow-hidden mb-6">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm">
                  <th className="p-4 text-left font-semibold">Timetable</th>
                  <th className="p-4 text-left font-semibold">Date</th>
                  <th className="p-4 text-left font-semibold">Status</th>
                  <th className="p-4 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => {
                  const meta = STATUS_META[item.status] ?? STATUS_META.Scheduled;
                  return (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-t border-indigo-50 dark:border-gray-700 hover:bg-indigo-50/50 dark:hover:bg-gray-700/40 transition-colors"
                    >
                      {/* Timetable cell */}
                      <td className="p-4">
                        <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                          {item.timetable.section?.name} · {item.timetable.subject?.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {item.timetable.day_of_week} {item.timetable.start_time?.slice(0, 5)}
                        </div>
                      </td>
                      {/* Date cell */}
                      <td className="p-4">
                        <span className="font-mono text-sm text-gray-700 dark:text-gray-300">
                          {fmtDate(item.date)}
                        </span>
                      </td>
                      {/* Status badge */}
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${meta.color}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                          {item.status}
                        </span>
                      </td>
                      {/* Actions */}
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-800/40 px-3 py-1.5 rounded-lg font-medium transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteId(item.id)}
                            className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800/40 px-3 py-1.5 rounded-lg font-medium transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 disabled:opacity-40 transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Prev
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(p => p === 1 || p === totalPages || (p >= page - 1 && p <= page + 1))
                  .reduce((acc, p, idx, arr) => {
                    if (idx > 0 && p - arr[idx - 1] > 1) acc.push("…");
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((p, i) => p === "…" ? (
                    <span key={`e${i}`} className="px-1 text-gray-400 text-sm">…</span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${p === page
                          ? "bg-indigo-600 text-white shadow-md"
                          : "text-gray-600 dark:text-gray-400 hover:bg-indigo-50 dark:hover:bg-gray-700"
                        }`}
                    >
                      {p}
                    </button>
                  ))
                }
              </div>

              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 disabled:opacity-40 transition-all"
              >
                Next
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </>
      )}

      {/* ── Slide-in form panel ── */}
      <AnimatePresence>
        {showForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeForm}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col"
            >
              {/* header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {editingId ? "Edit Session" : "New Session"}
                </h2>
                <button
                  onClick={closeForm}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-5">

                {/* Timetable */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                    Timetable <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={formData.timetable}
                    onChange={e => setFormData(f => ({ ...f, timetable: e.target.value }))}
                    className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-400 transition-all"
                  >
                    <option value="">— Select Timetable —</option>
                    {timetables.map(tt => (
                      <option key={tt.id} value={tt.id}>{ttLabel(tt)}</option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                    Date <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={e => setFormData(f => ({ ...f, date: e.target.value }))}
                    className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-400 transition-all"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                    Status <span className="text-red-400">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    {Object.entries(STATUS_META).map(([s, meta]) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setFormData(f => ({ ...f, status: s }))}
                        className={`py-2.5 rounded-xl text-xs font-semibold border-2 transition-all ${formData.status === s
                            ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 shadow-sm"
                            : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300"
                          }`}
                      >
                        <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${meta.dot}`} />
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* footer */}
              <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-3">
                <button
                  onClick={closeForm}
                  className="flex-1 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={saving}
                  className="flex-1 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {saving && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                  )}
                  {editingId ? "Update Session" : "Create Session"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Delete confirmation modal ── */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl max-w-sm w-full border border-red-100 dark:border-red-900/40"
            >
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-center text-gray-900 dark:text-gray-100 mb-1">Delete Session?</h3>
              <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-6">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default SessionCRUD;
