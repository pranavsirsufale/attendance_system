import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const EMPTY = { name: "", semester: "", is_law_subject: false };

const tok = () => localStorage.getItem("access_token");
const authH = () => ({ Authorization: `Bearer ${tok()}` });

function SubjectCRUD({ notifyUser }) {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [filterSem, setFilterSem] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!tok()) { navigate("/"); return; }
    fetchItems();
  }, []);

  /* ── helpers ─────────────────────────────────────── */
  const closeForm = () => { setShowForm(false); setEditingId(null); setFormData(EMPTY); };

  const uniqueSemesters = [...new Set(items.map(s => s.semester))].sort((a, b) => a - b);

  const filtered = items.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchSem = filterSem === "" || String(s.semester) === filterSem;
    return matchSearch && matchSem;
  });

  const teacherName = (t) => {
    if (!t) return "—";
    if (typeof t === "object") return `${t.first_name ?? ""} ${t.last_name ?? ""}`.trim() || "—";
    return String(t);
  };

  /* ── fetch ───────────────────────────────────────── */
  const fetchItems = async () => {
    try {
      setLoading(true);
      const r = await axios.get("/api/admin/subjects/", { headers: authH() });
      setItems(r.data);
    } catch (e) {
      if (e.response?.status === 401 || e.response?.status === 403) navigate("/");
      notifyUser?.(`Failed to load subjects: ${e.response?.data?.detail || e.message}`, "error");
    } finally { setLoading(false); }
  };

  /* ── save ────────────────────────────────────────── */
  const handleSubmit = async () => {
    if (!formData.name.trim() || formData.semester === "") {
      notifyUser?.("Name and Semester are required", "error");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        name: formData.name.trim(),
        semester: parseInt(formData.semester),
        is_law_subject: Boolean(formData.is_law_subject),
      };
      if (editingId) {
        await axios.put(`/api/admin/subjects/${editingId}/`, payload, { headers: authH() });
        notifyUser?.("Subject updated", "success");
      } else {
        await axios.post("/api/admin/subjects/", payload, { headers: authH() });
        notifyUser?.("Subject created", "success");
      }
      closeForm();
      await fetchItems();
    } catch (e) {
      notifyUser?.(
        `Failed to ${editingId ? "update" : "create"}: ${JSON.stringify(e.response?.data || e.message)}`,
        "error"
      );
    } finally { setSaving(false); }
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      semester: String(item.semester),
      is_law_subject: item.is_law_subject,
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/api/admin/subjects/${deleteId}/`, { headers: authH() });
      notifyUser?.("Subject deleted", "warning");
      setItems(prev => prev.filter(s => s.id !== deleteId));
      setDeleteId(null);
    } catch (e) {
      notifyUser?.(`Delete failed: ${e.response?.data?.detail || e.message}`, "error");
      setDeleteId(null);
    }
  };

  /* ── loading ─────────────────────────────────────── */
  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-10 h-10 border-4 border-indigo-400 border-t-transparent rounded-full"
      />
    </div>
  );

  /* ── render ──────────────────────────────────────── */
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
          Subjects
        </motion.h1>

        <button
          onClick={() => { setFormData(EMPTY); setEditingId(null); setShowForm(true); }}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg active:scale-95 transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Subject
        </button>
      </div>

      {/* ── Search + filter bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row gap-3 mb-6"
      >
        {/* search */}
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search subjects…"
            className="w-full pl-10 pr-4 py-3 border border-indigo-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-sm focus:ring-2 focus:ring-indigo-400 transition-all"
          />
        </div>
        {/* semester filter */}
        <select
          value={filterSem}
          onChange={e => setFilterSem(e.target.value)}
          className="sm:w-44 p-3 border border-indigo-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-sm focus:ring-2 focus:ring-indigo-400 transition-all"
        >
          <option value="">All Semesters</option>
          {uniqueSemesters.map(s => <option key={s} value={s}>Semester {s}</option>)}
        </select>
        <span className="hidden sm:flex items-center px-3 text-sm font-medium text-indigo-600 dark:text-indigo-400 whitespace-nowrap">
          {filtered.length} subject{filtered.length !== 1 ? "s" : ""}
        </span>
      </motion.div>

      {/* ── Table ── */}
      {filtered.length === 0 ? (
        <div className="text-center py-24 text-gray-400 dark:text-gray-500">
          <svg className="w-14 h-14 mx-auto mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <p className="text-sm">No subjects found</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-indigo-100 dark:border-gray-700 overflow-hidden"
        >
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm">
                <th className="p-4 text-left font-semibold">Name</th>
                <th className="p-4 text-left font-semibold">Semester</th>
                <th className="p-4 text-left font-semibold">Law Subject</th>
                <th className="p-4 text-left font-semibold">Teacher</th>
                <th className="p-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, i) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-t border-indigo-50 dark:border-gray-700 hover:bg-indigo-50/50 dark:hover:bg-gray-700/40 transition-colors"
                >
                  {/* Name */}
                  <td className="p-4 font-medium text-gray-800 dark:text-gray-200 text-sm">{item.name}</td>

                  {/* Semester badge */}
                  <td className="p-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800">
                      Sem {item.semester}
                    </span>
                  </td>

                  {/* Law subject badge */}
                  <td className="p-4">
                    {item.is_law_subject ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border border-purple-100 dark:border-purple-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                        Law
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                        General
                      </span>
                    )}
                  </td>

                  {/* Teacher */}
                  <td className="p-4 text-sm text-gray-500 dark:text-gray-400">{teacherName(item.teacher)}</td>

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
              ))}
            </tbody>
          </table>
        </motion.div>
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
                  {editingId ? "Edit Subject" : "New Subject"}
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

                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-white dark:text-gray-400 uppercase tracking-wide mb-1">
                    Subject Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                    placeholder="e.g. Constitutional Law"
                    className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200  text-sm focus:ring-2 focus:ring-indigo-400 transition-all"
                  />
                </div>

                {/* Semester */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                    Semester <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={formData.semester}
                    onChange={e => setFormData(f => ({ ...f, semester: e.target.value }))}
                    placeholder="e.g. 1"
                    className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-400 transition-all"
                  />
                </div>

                {/* Is Law Subject toggle */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                    Subject Type
                  </label>
                  <label className="relative flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors">
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Law Subject</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Mark if this is a law-specific subject</p>
                    </div>
                    <div className="relative ml-4 flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={!!formData.is_law_subject}
                        onChange={e => setFormData(f => ({ ...f, is_law_subject: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer peer-checked:bg-indigo-500 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5 transition-colors" />
                    </div>
                  </label>
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
                  {editingId ? "Update Subject" : "Add Subject"}
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
              <h3 className="text-lg font-bold text-center text-gray-900 dark:text-gray-100 mb-1">Delete Subject?</h3>
              <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-6">
                {(() => { const s = items.find(i => i.id === deleteId); return s ? `"${s.name}"` : "This subject"; })()}
                {" "}will be permanently removed.
              </p>
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

export default SubjectCRUD;
