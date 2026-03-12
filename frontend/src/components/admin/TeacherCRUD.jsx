import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const FIELDS = [
  { key: "first_name", label: "First Name",  type: "text",     required: true  },
  { key: "last_name",  label: "Last Name",   type: "text",     required: true  },
  { key: "email",      label: "Email",       type: "email",    required: true  },
  { key: "phone",      label: "Phone",       type: "text",     required: false },
  { key: "password",   label: "Password",    type: "password", required: false },
  { key: "is_admin",   label: "Admin Role",  type: "checkbox", required: false },
];

const EMPTY = { first_name: "", last_name: "", email: "", phone: "", password: "", is_admin: false };

const tok = () => localStorage.getItem("access_token");
const authH = () => ({ Authorization: `Bearer ${tok()}` });

// ── small eye-toggle for password ────────────────────────────────────────────
const EyeIcon = ({ off }) =>
  off ? (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88L6.59 6.59m7.532 7.532l3.29 3.29M3 3l18 18" />
    </svg>
  ) : (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );

function TeacherCRUD({ notifyUser }) {
  const [teachers, setTeachers]   = useState([]);
  const [form, setForm]           = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading]     = useState(true);
  const [saving, setSaving]       = useState(false);
  const [showForm, setShowForm]   = useState(false);
  const [search, setSearch]       = useState("");
  const [showPass, setShowPass]   = useState(false);
  const [deleteId, setDeleteId]   = useState(null); // confirm modal
  const formRef = useRef(null);
  const navigate = useNavigate();

  // ── fetch ──────────────────────────────────────────────────────────────────
  const fetch = async () => {
    if (!tok()) { navigate("/"); return; }
    setLoading(true);
    try {
      const res = await axios.get("/api/admin/teachers/", { headers: authH() });
      setTeachers(res.data);
    } catch (err) {
      if (err.response?.status === 401) navigate("/");
      else notifyUser("Failed to load teachers", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch(); }, []);

  // ── open form ──────────────────────────────────────────────────────────────
  const openCreate = () => {
    setForm(EMPTY);
    setEditingId(null);
    setShowForm(true);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const openEdit = (item) => {
    setForm({ ...EMPTY, ...item, password: "" });
    setEditingId(item.id);
    setShowForm(true);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    notifyUser("Teacher loaded for editing", "info");
  };

  const closeForm = () => { setShowForm(false); setEditingId(null); setForm(EMPTY); };

  // ── submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.first_name.trim() || !form.last_name.trim() || !form.email.trim()) {
      notifyUser("First name, last name, and email are required.", "error");
      return;
    }
    setSaving(true);
    const payload = { ...form };
    if (!payload.password) delete payload.password; // don't send blank password on edit
    try {
      if (editingId) {
        const res = await axios.put(`/api/admin/teachers/${editingId}/`, payload, { headers: authH() });
        notifyUser(res.data?.message || "Teacher updated successfully", "info");
      } else {
        const res = await axios.post("/api/admin/teachers/", payload, { headers: authH() });
        notifyUser(res.data?.message || "Teacher created successfully", "success");
      }
      closeForm();
      fetch();
    } catch (err) {
      const detail = err.response?.data
        ? JSON.stringify(err.response.data)
        : "Unknown error";
      notifyUser(`Failed to save: ${detail}`, "error");
    } finally {
      setSaving(false);
    }
  };

  // ── delete ─────────────────────────────────────────────────────────────────
  const confirmDelete = async () => {
    try {
      const res = await axios.delete(`/api/admin/teachers/${deleteId}/`, { headers: authH() });
      notifyUser(res.data?.message || "Teacher deleted", "warning");
      setTeachers(prev => prev.filter(t => t.id !== deleteId));
    } catch (err) {
      notifyUser("Failed to delete: " + (err.response?.data?.detail || "Unknown error"), "error");
    } finally {
      setDeleteId(null);
    }
  };

  // ── search filter ──────────────────────────────────────────────────────────
  const filtered = teachers.filter(t => {
    const q = search.toLowerCase();
    return (
      t.first_name?.toLowerCase().includes(q) ||
      t.last_name?.toLowerCase().includes(q)  ||
      t.email?.toLowerCase().includes(q)      ||
      t.phone?.includes(q)
    );
  });

  // ── field change ───────────────────────────────────────────────────────────
  const onChange = (key, val) => setForm(f => ({ ...f, [key]: val }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-6">

      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Manage Teachers
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">{teachers.length} teacher{teachers.length !== 1 ? "s" : ""} registered</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold shadow hover:from-indigo-700 hover:to-purple-700 transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Teacher
          </button>
          <button
            onClick={() => navigate("/admin")}
            className="px-4 py-2 rounded-xl border border-indigo-200 text-indigo-700 text-sm font-semibold hover:bg-indigo-50 transition"
          >
            ← Dashboard
          </button>
        </div>
      </div>

      {/* ── Slide-in Form ── */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            ref={formRef}
            key="form"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22 }}
            className="bg-white rounded-2xl shadow-xl border border-indigo-100 p-6 mb-6"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-indigo-700">
                {editingId ? "✏️ Edit Teacher" : "➕ New Teacher"}
              </h2>
              <button onClick={closeForm} className="text-gray-400 hover:text-gray-700 transition p-1 rounded-full hover:bg-gray-100">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {FIELDS.map(({ key, label, type, required }) => (
                  <div key={key} className={type === "checkbox" ? "flex items-center gap-3 sm:col-span-2" : ""}>
                    {type === "checkbox" ? (
                      <>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={!!form[key]}
                            onChange={e => onChange(key, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-400 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                        <span className="text-sm font-medium text-gray-700">
                          {label} {form[key] && <span className="text-indigo-600 font-semibold">(Admin access enabled)</span>}
                        </span>
                      </>
                    ) : (
                      <>
                        <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
                          {label}{required && <span className="text-red-400 ml-0.5">*</span>}
                        </label>
                        <div className="relative">
                          <input
                            type={type === "password" ? (showPass ? "text" : "password") : type}
                            value={form[key]}
                            onChange={e => onChange(key, e.target.value)}
                            placeholder={key === "password" && editingId ? "Leave blank to keep current" : ""}
                            required={required}
                            className="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                          />
                          {type === "password" && (
                            <button type="button" tabIndex={-1}
                              onClick={() => setShowPass(v => !v)}
                              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition">
                              <EyeIcon off={showPass} />
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-3 justify-end">
                <button type="button" onClick={closeForm}
                  className="px-5 py-2 rounded-xl border border-gray-300 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition">
                  Cancel
                </button>
                <button type="submit" disabled={saving}
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold shadow hover:from-indigo-700 hover:to-purple-700 transition disabled:opacity-60 flex items-center gap-2">
                  {saving && <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>}
                  {editingId ? "Update Teacher" : "Create Teacher"}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Search ── */}
      <div className="mb-4">
        <div className="relative max-w-sm">
          <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, email or phone…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 rounded-xl border border-gray-300 bg-white text-sm text-gray-900 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition w-full"
          />
        </div>
      </div>

      {/* ── Table ── */}
      {loading ? (
        <div className="flex items-center justify-center py-24 text-indigo-600 gap-3">
          <svg className="animate-spin w-6 h-6" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
          Loading teachers…
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <div className="text-5xl mb-3">👩‍🏫</div>
          <p className="text-lg font-medium">{search ? "No teachers match your search" : "No teachers yet"}</p>
          {!search && <p className="text-sm mt-1">Click <strong>Add Teacher</strong> to get started.</p>}
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">#</th>
                  <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">Name</th>
                  <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">Email</th>
                  <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">Phone</th>
                  <th className="px-4 py-3 text-center font-semibold whitespace-nowrap">Role</th>
                  <th className="px-4 py-3 text-center font-semibold whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((t, idx) => (
                  <motion.tr key={t.id}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.03 }}
                    className="hover:bg-indigo-50 transition-colors">
                    <td className="px-4 py-3 text-gray-400 text-xs">{idx + 1}</td>
                    <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 text-xs font-extrabold flex items-center justify-center shrink-0">
                          {(t.first_name?.[0] || "").toUpperCase()}{(t.last_name?.[0] || "").toUpperCase()}
                        </span>
                        {t.first_name} {t.last_name}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{t.email || "—"}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{t.phone || "—"}</td>
                    <td className="px-4 py-3 text-center">
                      {t.is_admin
                        ? <span className="inline-block px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700">👑 Admin</span>
                        : <span className="inline-block px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">🎓 Teacher</span>
                      }
                    </td>
                    <td className="px-4 py-3 text-center whitespace-nowrap">
                      <button onClick={() => openEdit(t)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition mr-2">
                        ✏️ Edit
                      </button>
                      <button onClick={() => setDeleteId(t.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition">
                        🗑 Delete
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2.5 border-t border-gray-100 bg-gray-50 text-xs text-gray-400">
            Showing {filtered.length} of {teachers.length} teacher{teachers.length !== 1 ? "s" : ""}
          </div>
        </motion.div>
      )}

      {/* ── Delete confirm modal ── */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center"
            >
              <div className="text-4xl mb-3">🗑️</div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Delete Teacher?</h3>
              <p className="text-sm text-gray-500 mb-5">
                <strong>{teachers.find(t => t.id === deleteId)?.first_name} {teachers.find(t => t.id === deleteId)?.last_name}</strong> will be permanently removed.
              </p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => setDeleteId(null)}
                  className="px-5 py-2 rounded-xl border border-gray-300 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition">
                  Cancel
                </button>
                <button onClick={confirmDelete}
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold shadow transition">
                  Yes, Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TeacherCRUD;
