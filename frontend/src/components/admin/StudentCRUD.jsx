import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const EMPTY = {
  first_name: "", last_name: "", email: "",
  phone: "", section: "", semester: "", roll_number: "",
};

const tok = () => localStorage.getItem("access_token");
const authH = () => ({ Authorization: `Bearer ${tok()}` });

const AVATAR_COLORS = [
  "bg-indigo-500", "bg-purple-500", "bg-pink-500",
  "bg-teal-500", "bg-orange-500", "bg-cyan-500",
];

function StudentCRUD({ notifyUser }) {
  const [loading, setLoading] = useState(true);
  const [programs, setPrograms] = useState([]);
  const [sections, setSections] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [formData, setFormData] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  /* ── cascade effects ──────────────────────────────────── */
  useEffect(() => { fetchPrograms(); }, []);

  useEffect(() => {
    if (selectedProgram) fetchSectionsByProgram(selectedProgram);
    else { setSections([]); setSemesters([]); setSelectedSection(""); setSelectedSemester(""); setStudents([]); }
  }, [selectedProgram]);

  useEffect(() => {
    if (selectedSection) fetchSemestersBySection(selectedSection);
    else { setSemesters([]); setSelectedSemester(""); setStudents([]); }
  }, [selectedSection]);

  useEffect(() => {
    if (selectedSection && selectedSemester) fetchStudents(selectedSection, selectedSemester);
    else setStudents([]);
  }, [selectedSection, selectedSemester]);

  /* ── helpers ──────────────────────────────────────────── */
  const closeForm = () => { setShowForm(false); setEditingId(null); setFormData(EMPTY); };

  const initials = (s) => `${s.first_name?.[0] ?? ""}${s.last_name?.[0] ?? ""}`.toUpperCase();
  const avatarColor = (s) => AVATAR_COLORS[(s.first_name?.charCodeAt(0) ?? 0) % AVATAR_COLORS.length];

  /* ── data fetchers ────────────────────────────────────── */
  const fetchPrograms = async () => {
    if (!tok()) { navigate("/"); return; }
    try {
      setLoading(true);
      const r = await axios.get("/api/admin/programs/", { headers: authH() });
      setPrograms(r.data);
    } catch (e) {
      notifyUser?.(`Failed to load programs: ${e.response?.data?.detail || e.message}`, "error");
    } finally { setLoading(false); }
  };

  const fetchSectionsByProgram = async (pid) => {
    try {
      const r = await axios.get(`/api/admin/sections/?program=${pid}`, { headers: authH() });
      setSections(r.data);
    } catch (e) {
      notifyUser?.(`Failed to load sections: ${e.response?.data?.detail || e.message}`, "error");
    }
  };

  const fetchSemestersBySection = async (sid) => {
    try {
      const r = await axios.get(`/api/admin/semesters/?section_id=${sid}`, { headers: authH() });
      setSemesters(r.data.semesters);
    } catch (e) {
      notifyUser?.("Failed to load semesters", "error");
      setSemesters([]);
    }
  };

  const fetchStudents = async (sid, sem) => {
    try {
      const r = await axios.get(
        `/api/admin/students/?section=${sid}&semester=${sem}`,
        { headers: authH() }
      );
      setStudents(r.data);
      notifyUser?.(`${r.data.length} student${r.data.length !== 1 ? "s" : ""} found for Semester ${sem}`, "info");
    } catch (e) {
      notifyUser?.(`Failed to load students: ${e.response?.data?.detail || e.message}`, "error");
    }
  };

  /* ── form handlers ────────────────────────────────────── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === "section") setSelectedSection(value);
    if (name === "semester") setSelectedSemester(value);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    const { section, semester, first_name, last_name, email } = formData;
    if (!section || !semester || !first_name || !last_name || !email) {
      notifyUser?.("Fill required fields: First Name, Last Name, Email, Section, Semester", "error");
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        const r = await axios.put(`/api/admin/students/${editingId}/`, formData, { headers: authH() });
        notifyUser?.(r.data?.message || "Student updated", "info");
      } else {
        const r = await axios.post("/api/admin/students/", formData, { headers: authH() });
        notifyUser?.(`Student created — Roll No: ${r.data.roll_number}`, "success");
      }
      closeForm();
      await fetchStudents(selectedSection, selectedSemester);
    } catch (e) {
      notifyUser?.(
        `Failed to ${editingId ? "update" : "add"} student: ${e.response?.data?.detail || e.message}`,
        "error"
      );
    } finally { setSaving(false); }
  };

  const handleEdit = (s) => {
    setFormData({
      first_name: s.first_name, last_name: s.last_name,
      email: s.email, phone: s.phone || "",
      section: s.section.id, semester: s.semester, roll_number: s.roll_number,
    });
    setEditingId(s.id);
    setShowForm(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/api/admin/students/${deleteId}/`, { headers: authH() });
      notifyUser?.("Student deleted", "warning");
      setDeleteId(null);
      await fetchStudents(selectedSection, selectedSemester);
    } catch (e) {
      notifyUser?.(`Delete failed: ${e.response?.data?.detail || e.message}`, "error");
      setDeleteId(null);
    }
  };

  /* ── derived ──────────────────────────────────────────── */
  const filteredStudents = students.filter(s => {
    const q = searchQuery.toLowerCase();
    return (
      `${s.first_name} ${s.last_name}`.toLowerCase().includes(q) ||
      s.roll_number.toLowerCase().includes(q)
    );
  });

  /* ── loading spinner ──────────────────────────────────── */
  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-10 h-10 border-4 border-indigo-400 border-t-transparent rounded-full"
      />
    </div>
  );

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
          Students
        </motion.h1>

        <button
          onClick={() => {
            setFormData({ ...EMPTY, section: selectedSection, semester: selectedSemester });
            setEditingId(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg active:scale-95 transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Student
        </button>
      </div>

      {/* ── Cascade filter card ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md border border-indigo-100 dark:border-gray-700"
      >
        {[
          {
            label: "Program",
            value: selectedProgram,
            onChange: e => setSelectedProgram(e.target.value),
            disabled: false,
            options: programs.map(p => ({ value: p.id, label: `${p.name} (${p.duration_years}yr)` })),
            placeholder: "— Select Program —",
          },
          {
            label: "Section",
            value: selectedSection,
            onChange: e => setSelectedSection(e.target.value),
            disabled: !selectedProgram,
            options: sections.map(s => ({ value: s.id, label: `Year ${s.year} – ${s.name}` })),
            placeholder: "— Select Section —",
          },
          {
            label: "Semester",
            value: selectedSemester,
            onChange: e => setSelectedSemester(e.target.value),
            disabled: !selectedSection,
            options: semesters.map(sem => ({ value: sem, label: `Semester ${sem}` })),
            placeholder: "— Select Semester —",
          },
        ].map(f => (
          <div key={f.label}>
            <label className="block text-xs font-semibold text-indigo-700 dark:text-indigo-300 uppercase tracking-wide mb-1">
              {f.label}
            </label>
            <select
              value={f.value}
              onChange={f.onChange}
              disabled={f.disabled}
              className="w-full p-3 border border-indigo-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm focus:ring-2 focus:ring-indigo-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">{f.placeholder}</option>
              {f.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        ))}
      </motion.div>

      {/* ── Students table ── */}
      <AnimatePresence>
        {selectedSemester && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {/* search bar */}
            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex-1">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search by name or roll number…"
                  className="w-full pl-10 pr-4 py-3 border border-indigo-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-sm focus:ring-2 focus:ring-indigo-400 transition-all"
                />
              </div>
              <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300 whitespace-nowrap">
                {filteredStudents.length} student{filteredStudents.length !== 1 ? "s" : ""}
              </span>
            </div>

            {filteredStudents.length === 0 ? (
              <div className="text-center py-20 text-gray-400 dark:text-gray-500">
                <svg className="w-14 h-14 mx-auto mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-sm">No students found</p>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-indigo-100 dark:border-gray-700 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm">
                      <th className="p-4 text-left font-semibold">Student</th>
                      <th className="p-4 text-left font-semibold">Roll No.</th>
                      <th className="p-4 text-left font-semibold">Email</th>
                      <th className="p-4 text-left font-semibold">Phone</th>
                      <th className="p-4 text-left font-semibold">Subjects</th>
                      <th className="p-4 text-center font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student, i) => (
                      <motion.tr
                        key={student.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="border-t border-indigo-50 dark:border-gray-700 hover:bg-indigo-50/60 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        {/* avatar + name */}
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-full ${avatarColor(student)} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm`}>
                              {initials(student)}
                            </div>
                            <span className="font-medium text-gray-800 dark:text-gray-200 text-sm">
                              {student.first_name} {student.last_name}
                            </span>
                          </div>
                        </td>
                        {/* roll number */}
                        <td className="p-4">
                          <span className="font-mono text-xs bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-md">
                            {student.roll_number}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">{student.email}</td>
                        <td className="p-4 text-sm text-gray-500 dark:text-gray-400">{student.phone || "—"}</td>
                        {/* subjects */}
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {student.subjects.length > 0
                              ? student.subjects.map(sub => (
                                <span key={sub.id} className="text-xs bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full border border-purple-100 dark:border-purple-800">
                                  {sub.name}
                                </span>
                              ))
                              : <span className="text-xs text-gray-400 italic">None</span>
                            }
                          </div>
                        </td>
                        {/* actions */}
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleEdit(student)}
                              className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-800/40 px-3 py-1.5 rounded-lg font-medium transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => setDeleteId(student.id)}
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
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Slide-in form panel ── */}
      <AnimatePresence>
        {showForm && (
          <>
            {/* backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeForm}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />
            {/* panel */}
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col"
            >
              {/* panel header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {editingId ? "Edit Student" : "Add Student"}
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

              {/* panel body */}
              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">

                {/* Program (filter helper, not stored in formData) */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Program</label>
                  <select
                    value={selectedProgram}
                    onChange={e => setSelectedProgram(e.target.value)}
                    className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-sm focus:ring-2 focus:ring-indigo-400 transition-all"
                  >
                    <option value="">— Select Program —</option>
                    {programs.map(p => <option key={p.id} value={p.id}>{p.name} ({p.duration_years}yr)</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                    Section <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="section"
                    value={formData.section}
                    onChange={handleChange}
                    disabled={!selectedProgram}
                    required
                    className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-sm focus:ring-2 focus:ring-indigo-400 transition-all disabled:opacity-50"
                  >
                    <option value="">— Select Section —</option>
                    {sections.map(s => <option key={s.id} value={s.id}>Year {s.year} – {s.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                    Semester <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                    disabled={!formData.section}
                    required
                    className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-sm focus:ring-2 focus:ring-indigo-400 transition-all disabled:opacity-50"
                  >
                    <option value="">— Select Semester —</option>
                    {semesters.map(sem => <option key={sem} value={sem}>Semester {sem}</option>)}
                  </select>
                </div>

                {/* First + Last name side by side */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "first_name", label: "First Name", required: true },
                    { name: "last_name", label: "Last Name", required: true },
                  ].map(f => (
                    <div key={f.name}>
                      <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                        {f.label} <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name={f.name}
                        value={formData[f.name]}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-sm focus:ring-2 focus:ring-indigo-400 transition-all"
                      />
                    </div>
                  ))}
                </div>

                {/* Email / Phone / Roll Number */}
                {[
                  { name: "email", label: "Email", type: "email", required: true, placeholder: "" },
                  { name: "phone", label: "Phone", type: "text", required: false, placeholder: "" },
                  { name: "roll_number", label: "Roll Number", type: "text", required: false, placeholder: "Auto-generated if blank" },
                ].map(f => (
                  <div key={f.name}>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                      {f.label} {f.required && <span className="text-red-400">*</span>}
                    </label>
                    <input
                      type={f.type}
                      name={f.name}
                      value={formData[f.name]}
                      onChange={handleChange}
                      required={f.required}
                      placeholder={f.placeholder}
                      className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-sm focus:ring-2 focus:ring-indigo-400 transition-all"
                    />
                  </div>
                ))}
              </form>

              {/* panel footer */}
              <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-3">
                <button
                  type="button"
                  onClick={closeForm}
                  className="flex-1 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
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
                  {editingId ? "Update Student" : "Add Student"}
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
              <h3 className="text-lg font-bold text-center text-gray-900 dark:text-gray-100 mb-1">Delete Student?</h3>
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

export default StudentCRUD;
