import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "../styles/Workouts.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5050";

/* ---------- date helpers ---------- */
const weekdayLabels = ["M", "T", "W", "T", "F", "S", "S"];
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const pad2 = (n) => String(n).padStart(2, "0");

const dateKey = (d) => {
  const dateObj = d instanceof Date ? d : new Date(d);
  return `${dateObj.getFullYear()}-${pad2(dateObj.getMonth() + 1)}-${pad2(dateObj.getDate())}`;
};

const toInputDate = (d) => {
  const dateObj = d instanceof Date ? d : new Date(d);
  return `${dateObj.getFullYear()}-${pad2(dateObj.getMonth() + 1)}-${pad2(dateObj.getDate())}`;
};

const fromInputDate = (s) => {
  if (!s) return null;
  if (typeof s !== "string") return new Date(s);
  const str = s.includes("T") ? s.split("T")[0] : s;
  const [y, m, d] = str.split("-").map(Number);
  if (!y || !m || !d) return new Date(s);
  return new Date(y, m - 1, d);
};

const USER_ID = "user123";
const distanceBasedTypes = ["Walk", "Run", "Cycling", "Swimming"];

export default function Workouts() {
  const today = useMemo(() => new Date(), []);
  const toastTimeoutRef = useRef(null);

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [monthOpen, setMonthOpen] = useState(false);
  const [viewYear, setViewYear] = useState(today.getFullYear());

  const [workouts, setWorkouts] = useState([]);
  const [selectedDay, setSelectedDay] = useState(today);
  const [syncedDates, setSyncedDates] = useState(new Set());

  const [showSelectWorkout, setShowSelectWorkout] = useState(false);
  const [showManageWorkouts, setShowManageWorkouts] = useState(false);
  const [showImportWorkout, setShowImportWorkout] = useState(false);

  const [selectedWorkoutId, setSelectedWorkoutId] = useState("");
  const [selectedDevice, setSelectedDevice] = useState("Jane’s Watch");

  const [toast, setToast] = useState({ show: false, title: "", message: "" });
  const [form, setForm] = useState({
    title: "New Workout",
    type: "Walk",
    date: today,
    duration: "1hr",
    distance: "",
  });

  function showToast(title, message) {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast({ show: true, title, message });
    toastTimeoutRef.current = setTimeout(() => {
      setToast({ show: false, title: "", message: "" });
      toastTimeoutRef.current = null;
    }, 3200);
  }

  async function fetchAllData() {
    try {
      const woRes = await fetch(`${API_BASE}/workouts/${USER_ID}`);
      if (woRes.ok) {
        const text = await woRes.text();
        const data = text ? JSON.parse(text) : [];
        setWorkouts(
          data.map((w) => ({
            ...w,
            id: w.id || w._id?.toString?.() || w._id || String(Date.now() + Math.random()),
            title: w.title || "Workout",
            type: w.type || "Walk",
            distance: parseFloat(w.distance) || 0,
            caloriesBurned: parseFloat(w.caloriesBurned) || 0,
            stepsAdded: parseInt(w.stepsAdded, 10) || 0,
            date: fromInputDate(w.date) || new Date(),
            createdAt: w.createdAt ? new Date(w.createdAt).getTime() : Date.now(),
          }))
        );
      }
    } catch (error) {
      console.error("Failed to fetch workouts:", error);
    }
  }

  useEffect(() => {
    fetchAllData();
  }, []);

  // Modal scroll lock logic
  const anyModalOpen = showSelectWorkout || showManageWorkouts || showImportWorkout;
  useEffect(() => {
    if (!anyModalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [anyModalOpen]);

  useEffect(() => {
    const onDown = (e) => { if (!e.target.closest(".wk-monthPill")) setMonthOpen(false); };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, []);

  const workoutsByDay = useMemo(() => {
    const map = new Map();
    for (const w of workouts) {
      const workoutDate = w.date instanceof Date ? w.date : new Date(w.date);
      const k = dateKey(workoutDate);
      if (!map.has(k)) map.set(k, []);
      map.get(k).push({ ...w, date: w.date });
    }
    return map;
  }, [workouts]);

  const selectedDayKey = useMemo(() => dateKey(selectedDay), [selectedDay]);
  const selectedDayWorkouts = workoutsByDay.get(selectedDayKey) ?? [];

  const monthLabel = useMemo(() => {
    const d = new Date(year, month, 1);
    return d.toLocaleString("en-GB", { month: "long", year: "numeric" });
  }, [month, year]);

  const calendarCells = useMemo(() => {
    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);
    const firstDow = (first.getDay() + 6) % 7;
    const cells = [];
    for (let i = 0; i < firstDow; i++) cells.push(null);
    for (let day = 1; day <= last.getDate(); day++) cells.push(new Date(year, month, day));
    while (cells.length < 42) cells.push(null);
    return cells;
  }, [month, year]);

  function openSelect(dateObj) {
    const d = dateObj ?? selectedDay ?? today;
    setSelectedDay(d);
    setForm((f) => ({ ...f, date: d }));
    setShowSelectWorkout(true);
  }

  async function addWorkout() {
    const requiresDistance = distanceBasedTypes.includes(form.type);
    const parsedDistance = parseFloat(form.distance);

    if (requiresDistance && (isNaN(parsedDistance) || parsedDistance <= 0)) {
      alert(`Please enter a valid distance (m) for your ${form.type} session.`);
      return;
    }

    const finalDistance = requiresDistance ? parsedDistance : 0;
    const newWorkout = {
      userId: USER_ID,
      date: toInputDate(form.date),
      title: form.title.trim() || "Manual Workout",
      type: form.type,
      duration: form.duration.trim() || "30min",
      distance: finalDistance,
      stepsAdded: finalDistance > 0 ? Math.floor(finalDistance * 1250) : 1500,
      caloriesBurned: finalDistance > 0 ? Math.floor(finalDistance * 60) : 200,
    };

    try {
      const res = await fetch(`${API_BASE}/workouts/record-workout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newWorkout),
      });

      if (!res.ok) throw new Error("Failed to save workout");

      await fetchAllData();
      setShowSelectWorkout(false);
      showToast("Workout saved", `${newWorkout.title} • ${new Date(form.date).toLocaleDateString("en-GB")}`);
    } catch (error) {
      console.error("Failed to add workout:", error);
      alert("Something went wrong while saving workout.");
    }
  }

  async function handleImportWorkout() {
    const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const syncDateKey = toInputDate(selectedDay);
    const syncIdentifier = `${syncDateKey}-${selectedDevice}`;

    if (syncedDates.has(syncIdentifier)) {
      showToast("Already Up to Date", `${selectedDevice} is already synced for this date.`);
      setShowImportWorkout(false);
      return;
    }

    try {
      const type = getRandomItem(["Run", "Cycling", "Swimming", "Walk"]);
      const importedWorkout = {
        userId: USER_ID,
        date: syncDateKey,
        title: `${selectedDevice.split(' ').pop()} Sync: ${type}`,
        type,
        duration: "45min",
        distance: Math.floor(Math.random() * 4000 + 2000),
        stepsAdded: Math.floor(Math.random() * 5000) + 3000,
        caloriesBurned: Math.floor(Math.random() * 300) + 1500,
        sourceDevice: selectedDevice,
      };

      await fetch(`${API_BASE}/workouts/record-workout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(importedWorkout),
      });

      setSyncedDates((prev) => new Set(prev).add(syncIdentifier));
      await fetchAllData();
      setShowImportWorkout(false);
      showToast("Data Sync Complete", `${selectedDevice} synced.`);
    } catch (error) {
      console.error("Sync error:", error);
      alert("Device connection failed.");
    }
  }

  async function deleteWorkoutById(id) {
    try {
      const res = await fetch(`${API_BASE}/workouts/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete workout");
      await fetchAllData();
      showToast("Workout deleted", "The workout was removed successfully.");
    } catch (error) {
      alert("Could not delete workout.");
    }
  }

  return (
    <>
      <div className="wk-page">
        <main className="wk-main">
          <section className="wk-frameOuter">
            <div className="wk-frameInner">
              <div className="wk-monthRow">
                <div className="wk-monthPill" onClick={() => { setViewYear(year); setMonthOpen(!monthOpen); }}>
                  <div className="wk-monthText">{monthLabel}</div>
                  <button type="button" className="wk-monthCaret">▾</button>
                  {monthOpen && (
                    <div className="wk-monthMenu" onClick={(e) => e.stopPropagation()}>
                      <div className="wk-pickerHeader">
                        <button type="button" className="wk-pickerArrow" onClick={() => setViewYear(y => y - 1)}>&lt;</button>
                        <div className="wk-pickerYear">{viewYear}</div>
                        <button type="button" className="wk-pickerArrow" onClick={() => setViewYear(y => y + 1)}>&gt;</button>
                      </div>
                      <div className="wk-pickerGrid">
                        {monthNames.map((m, idx) => (
                          <button key={m} type="button" 
                            className={`wk-pickerMonthBtn ${idx === month && viewYear === year ? "isActive" : ""}`}
                            onClick={() => { setMonth(idx); setYear(viewYear); setMonthOpen(false); }}>
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="wk-grid">
                {weekdayLabels.map((w, i) => <div key={i} className="wk-dow">{w}</div>)}
                {calendarCells.map((d, idx) => {
                  if (!d) return <div key={idx} className="wk-cell wk-empty" />;
                  const k = dateKey(d);
                  const dayWorkouts = workoutsByDay.get(k) ?? [];
                  const hasSync = Array.from(syncedDates).some((entry) => entry.startsWith(k));

                  return (
                    <button key={idx} 
                      className={`wk-cell ${dayWorkouts.length > 0 ? "wk-cellHasWorkout" : ""} ${dateKey(d) === selectedDayKey ? "isSelected" : ""} ${dateKey(d) === dateKey(today) ? "isToday" : ""}`}
                      onClick={() => setSelectedDay(d)}
                      onDoubleClick={() => openSelect(d)}
                      type="button">
                      <div className="wk-cellHeader">
                        <span className="wk-num">{d.getDate()}</span>
                        {hasSync && <span style={{ fontSize: "12px", color: "green", marginLeft: "4px" }}>✓</span>}
                        {dayWorkouts.length > 0 && <span className="wk-cellBadge">{dayWorkouts.length}</span>}
                      </div>
                      <div className="wk-cellFooter">
                        {dayWorkouts.slice(0, 2).map((w) => (
                          <div key={w.id} className={`wk-workoutChip wk-type-${w.type.toLowerCase()}`}>
                            <span className="wk-workoutChipText">{w.title}</span>
                          </div>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          <div className="wk-bottomBtns">
            <button className="wk-pillBtn" onClick={() => openSelect(selectedDay)}>Select Workout</button>
            <button className="wk-pillBtn wk-manageBtn" onClick={() => setShowManageWorkouts(true)} disabled={selectedDayWorkouts.length === 0}>Manage Workouts</button>
            <button className="wk-pillBtn wk-importBtn" onClick={() => setShowImportWorkout(true)}>Sync Device</button>
          </div>
        </main>
      </div>

      {showSelectWorkout && (
        <Modal onClose={() => setShowSelectWorkout(false)}>
          <div className="wk-modalHeader">
            <h2 className="wk-modalTitle">Add Workout</h2>
            <button className="wk-close" onClick={() => setShowSelectWorkout(false)}>X</button>
          </div>
          <div className="wk-form">
            <label className="wk-label">Title</label>
            <input className="wk-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <label className="wk-label">Type</label>
            <select className="wk-input" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <option>Walk</option><option>Run</option><option>Cycling</option><option>Gym</option><option>Swimming</option><option>Yoga</option>
            </select>
            <label className="wk-label">Date</label>
            <input className="wk-input" type="date" value={toInputDate(form.date)} onChange={(e) => setForm({ ...form, date: fromInputDate(e.target.value) })} />
            <label className="wk-label">Duration</label>
            <input className="wk-input" placeholder="e.g. 45min" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
            {distanceBasedTypes.includes(form.type) && (
              <>
                <label className="wk-label">Distance (m)</label>
                <input className="wk-input" type="number" step="0.1" value={form.distance} onChange={(e) => setForm({ ...form, distance: e.target.value })} />
              </>
            )}
            <button className="wk-enterBtn" onClick={addWorkout}>Enter</button>
          </div>
        </Modal>
      )}

      {showManageWorkouts && (
        <Modal onClose={() => setShowManageWorkouts(false)}>
          <div className="wk-modalHeader">
            <h2 className="wk-modalTitle">Manage Workouts</h2>
            <button className="wk-close" onClick={() => setShowManageWorkouts(false)}>X</button>
          </div>
          <div className="wk-form">
            {selectedDayWorkouts.map((w) => (
              <div key={w.id} className="wk-workoutCard">
                <div className="wk-cardInfo">
                  <div className="wk-cardTitle">{w.title}</div>
                  <div className="wk-cardMeta">{w.type} • {w.duration}</div>
                </div>
                <button className="wk-smallBtn wk-dangerBtn" onClick={() => deleteWorkoutById(w.id)}>Delete</button>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {showImportWorkout && (
        <Modal onClose={() => setShowImportWorkout(false)}>
          <div className="wk-modalHeader">
            <h2 className="wk-modalTitle">Sync Device</h2>
            <button className="wk-close" onClick={() => setShowImportWorkout(false)}>X</button>
          </div>
          <div className="wk-deviceBox">
            {["Jane’s iPhone", "Jane’s Laptop 2", "Jane’s Watch"].map(device => (
              <DeviceRow key={device} label={device} checked={selectedDevice === device} onClick={() => setSelectedDevice(device)} />
            ))}
          </div>
          <button className="wk-enterBtn" onClick={handleImportWorkout}>Sync</button>
        </Modal>
      )}

      {toast.show && (
        <div className="wk-toast">
          <div className="wk-toastIcon">✓</div>
          <div className="wk-toastText">
            <div className="wk-toastTitle">{toast.title}</div>
            <div className="wk-toastMessage">{toast.message}</div>
          </div>
        </div>
      )}
    </>
  );
}

function Modal({ children, onClose }) {
  return createPortal(
    <div className="wk-overlay" onMouseDown={onClose}>
      <div className="wk-modal" onMouseDown={(e) => e.stopPropagation()}>{children}</div>
    </div>,
    document.body
  );
}

function DeviceRow({ label, checked, onClick }) {
  return (
    <button className={`wk-deviceRow ${checked ? "isSelected" : ""}`} type="button" onClick={onClick}>
      <div className="wk-deviceIcon" />
      <div className="wk-deviceLabel">{label}</div>
      <div className={`wk-checkbox ${checked ? "isChecked" : ""}`}>{checked ? "✓" : ""}</div>
    </button>
  );
}