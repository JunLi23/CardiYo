import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import "../styles/Workouts.css";

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

  const [preferences, setPreferences] = useState(() => {
    const saved = localStorage.getItem("biomarkerPreferences");
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      Calories: true,
      Steps: true,
      Distance: true,
      BloodSugar: false,
      HeartRate: true,
      BloodPressure: false,
      Cholesterol: false,
      O2Levels: false,
    };
  });

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const [monthOpen, setMonthOpen] = useState(false);
  const [viewYear, setViewYear] = useState(today.getFullYear());

  const [workouts, setWorkouts] = useState([]);
  const [biomarkersList, setBiomarkersList] = useState([]);
  const [selectedDay, setSelectedDay] = useState(today);

  const [syncedDates, setSyncedDates] = useState(new Set());

  const [showSelectWorkout, setShowSelectWorkout] = useState(false);
  const [showManageWorkouts, setShowManageWorkouts] = useState(false);
  const [showImportWorkout, setShowImportWorkout] = useState(false);
  const [showBiomarkers, setShowBiomarkers] = useState(false);

  const [bioView, setBioView] = useState("list");

  const [selectedBios, setSelectedBios] = useState([
    "Resting Heart Rate",
    "VO2 Max",
    "Blood Pressure",
    "HRV",
    "Blood Glucose",
    "Cholesterol",
    "O2 Levels",
    "Calories",
    "Steps",
    "Distance",
    "Active Minutes",
  ]);

  const [selectedWorkoutId, setSelectedWorkoutId] = useState("");
  const [selectedDevice, setSelectedDevice] = useState("Jane’s Watch");

  const [toast, setToast] = useState({
    show: false,
    title: "",
    message: "",
  });

  const [form, setForm] = useState({
    title: "New Workout",
    type: "Walk",
    date: today,
    duration: "1hr",
    distance: "",
  });

  const staticVitals = useMemo(
    () => [
      { name: "Resting Heart Rate", value: "58", unit: "bpm", status: "Good", score: 75, dependsOn: "HeartRate" },
      { name: "HRV", value: "62", unit: "ms", status: "Good", score: 68, dependsOn: "HeartRate" },
      { name: "Blood Pressure", value: "118/76", unit: "mmHg", status: "Normal", score: 85, dependsOn: "BloodPressure" },
      { name: "Blood Glucose", value: "5.1", unit: "mmol/L", status: "Normal", score: 88, dependsOn: "BloodSugar" },
      { name: "Cholesterol", value: "185", unit: "mg/dL", status: "Normal", score: 82, dependsOn: "Cholesterol" },
      { name: "O2 Levels", value: "98", unit: "%", status: "Excellent", score: 95, dependsOn: "O2Levels" },
      { name: "VO2 Max", value: "45.2", unit: "mL/kg/min", status: "Excellent", score: 92, dependsOn: "O2Levels" },
    ],
    []
  );

  function showToast(title, message) {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToast({ show: true, title, message });
    toastTimeoutRef.current = setTimeout(() => {
      setToast({ show: false, title: "", message: "" });
      toastTimeoutRef.current = null;
    }, 3200);
  }

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem("biomarkerPreferences");
      if (saved) {
        setPreferences(JSON.parse(saved));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  async function fetchAllData() {
    try {
      const woRes = await fetch(`http://localhost:5050/workouts/${USER_ID}`);
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

      const bioRes = await fetch(`http://localhost:5050/biomarker/${USER_ID}`);
      if (bioRes.ok) {
        const text = await bioRes.text();
        const data = text ? JSON.parse(text) : [];
        setBiomarkersList(data);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }

  useEffect(() => {
    fetchAllData();
  }, []);

  const anyModalOpen =
    showSelectWorkout || showManageWorkouts || showImportWorkout || showBiomarkers;

  useEffect(() => {
    if (!anyModalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [anyModalOpen]);

  useEffect(() => {
    const onDown = (e) => {
      if (!e.target.closest(".wk-monthPill")) {
        setMonthOpen(false);
      }
    };
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
    for (const [k, arr] of map.entries()) {
      arr.sort((a, b) => a.createdAt - b.createdAt);
      map.set(k, arr);
    }
    return map;
  }, [workouts]);

  const selectedDayKey = useMemo(() => dateKey(selectedDay), [selectedDay]);
  const selectedDayWorkouts = workoutsByDay.get(selectedDayKey) ?? [];

  const selectedDayBiomarker = useMemo(() => {
    const dayBios = biomarkersList.filter((b) => dateKey(b.date) === selectedDayKey);
    if (dayBios.length > 0) {
      dayBios.sort((a, b) => new Date(b.date) - new Date(a.date));
      return dayBios[0];
    }
    return null;
  }, [biomarkersList, selectedDayKey]);

  const monthLabel = useMemo(() => {
    const d = new Date(year, month, 1);
    return d.toLocaleString("en-GB", { month: "long", year: "numeric" });
  }, [month, year]);

  const calendarCells = useMemo(() => {
    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);
    const firstDow = (first.getDay() + 6) % 7;
    const daysInMonth = last.getDate();
    const cells = [];
    for (let i = 0; i < firstDow; i++) cells.push(null);
    for (let day = 1; day <= daysInMonth; day++) cells.push(new Date(year, month, day));
    while (cells.length < 42) cells.push(null);
    return cells;
  }, [month, year]);

  const displayDistance = useMemo(() => {
    let total = 0;
    selectedDayWorkouts.forEach((w) => {
      total += parseFloat(w.distance) || 0;
    });
    return total > 0 ? total.toFixed(2) : "0.00";
  }, [selectedDayWorkouts]);

  const displayCalories = useMemo(() => {
    let totalCals = 0;
    selectedDayWorkouts.forEach((w) => {
      totalCals += parseFloat(w.caloriesBurned) || 0;
    });
    return totalCals > 0 ? String(totalCals) : "0";
  }, [selectedDayWorkouts]);

  const displaySteps = useMemo(() => {
    let totalSteps = 0;
    selectedDayWorkouts.forEach((w) => {
      totalSteps += parseInt(w.stepsAdded, 10) || 0;
    });
    return totalSteps > 0 ? String(totalSteps) : "0";
  }, [selectedDayWorkouts]);

  const displayActiveMins = useMemo(() => {
    let totalMins = 0;
    selectedDayWorkouts.forEach((w) => {
      const durStr = String(w.duration || "").toLowerCase();
      let val = parseInt(durStr, 10);
      if (isNaN(val)) val = 0;
      if (durStr.includes("hr") || durStr.includes("hour")) {
        totalMins += val * 60;
      } else {
        totalMins += val;
      }
    });
    return totalMins > 0 ? String(totalMins) : "0";
  }, [selectedDayWorkouts]);

  function openSelect(dateObj) {
    const d = dateObj ?? selectedDay ?? today;
    setSelectedDay(d);

    setForm((f) => ({
      ...f,
      date: d,
      distance: distanceBasedTypes.includes(f.type) ? f.distance : "",
    }));

    const dayList = workoutsByDay.get(dateKey(d)) ?? [];
    setSelectedWorkoutId(dayList[0]?.id ?? "");
    setShowSelectWorkout(true);
  }

  async function addWorkout() {
    const requiresDistance = distanceBasedTypes.includes(form.type);
    const parsedDistance = parseFloat(form.distance);

    if (requiresDistance && (isNaN(parsedDistance) || parsedDistance <= 0)) {
      alert(`Please enter a valid distance (km) for your ${form.type} session.`);
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
      const res = await fetch("http://localhost:5050/workouts/record-workout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newWorkout),
      });

      if (!res.ok) throw new Error("Failed to save workout");

      if (finalDistance > 0 || newWorkout.stepsAdded > 0) {
        await fetch("http://localhost:5050/biomarker", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: USER_ID,
            date: newWorkout.date,
            distance: finalDistance,
            steps: newWorkout.stepsAdded,
            calories: newWorkout.caloriesBurned,
          }),
        });
      }

      await fetchAllData();
      setSelectedDay(form.date);
      setSelectedWorkoutId("");
      setShowSelectWorkout(false);

      showToast(
        "Workout saved",
        `${newWorkout.title} • ${new Date(form.date).toLocaleDateString("en-GB")}`
      );
    } catch (error) {
      console.error("Failed to add workout:", error);
      alert("Something went wrong while saving workout.");
    }
  }

  async function handleImportWorkout() {
    const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const dayOffset = Math.floor(Math.random() * 3) - 1;
    const randomDateObj = new Date();
    randomDateObj.setDate(randomDateObj.getDate() + dayOffset);
    const syncDateKey = toInputDate(randomDateObj);

    if (syncedDates.has(syncDateKey)) {
      showToast("Already Up to Date", `Health data for ${syncDateKey} is already synced.`);
      setShowImportWorkout(false);
      return;
    }

    try {
      const generatedDistance = parseFloat((Math.random() * 4 + 2).toFixed(1));
      const generatedSteps = Math.floor(Math.random() * 5000) + 3000;
      const generatedCalories = Math.floor(Math.random() * 300) + 1500;

      const type = getRandomItem(["Run", "Cycling", "Swimming", "Walk"]);
      const deviceShortName = selectedDevice.includes("Watch")
        ? "Watch"
        : selectedDevice.includes("Iphone")
        ? "Phone"
        : "Laptop";

      const importedWorkout = {
        userId: USER_ID,
        date: syncDateKey,
        title: `${deviceShortName} Sync: ${type}`,
        type,
        duration: "45min",
        distance: generatedDistance,
        stepsAdded: generatedSteps,
        caloriesBurned: generatedCalories,
        sourceDevice: selectedDevice,
      };

      await fetch("http://localhost:5050/workouts/record-workout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(importedWorkout),
      });

      await fetch("http://localhost:5050/biomarker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: USER_ID,
          date: syncDateKey,
          steps: generatedSteps,
          distance: generatedDistance,
          heartRate: Math.floor(Math.random() * 10) + 60,
          calories: generatedCalories,
        }),
      });

      setSyncedDates((prev) => new Set(prev).add(syncDateKey));
      await fetchAllData();
      setSelectedDay(randomDateObj);
      setShowImportWorkout(false);

      let relativeDay = "Today";
      if (dayOffset === -1) relativeDay = "Yesterday";
      if (dayOffset === 1) relativeDay = "Tomorrow";

      showToast("Data Sync Complete", `Biomarkers & Schedule updated for ${relativeDay}`);
    } catch (error) {
      console.error("Sync error:", error);
      alert("Device connection failed.");
    }
  }

  async function deleteWorkoutById(id) {
    try {
      const res = await fetch(`http://localhost:5050/workouts/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete workout");
      }

      await fetchAllData();

      if (selectedWorkoutId === id) {
        setSelectedWorkoutId("");
      }

      showToast("Workout deleted", "The workout was removed successfully.");
    } catch (error) {
      console.error("Failed to delete workout:", error);
      alert("Could not delete workout.");
    }
  }

  const toggleBio = (name) => {
    setSelectedBios((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const combinedBiomarkers = [
    ...staticVitals,
    { name: "Calories", value: displayCalories, unit: "kcal", status: "Good", score: 85, dependsOn: "Calories" },
    { name: "Steps", value: displaySteps, unit: "steps", status: "Excellent", score: 95, dependsOn: "Steps" },
    { name: "Distance", value: displayDistance, unit: "km", status: "Good", score: 80, dependsOn: "Distance" },
    { name: "Active Minutes", value: displayActiveMins, unit: "min", status: "Excellent", score: 90, dependsOn: null },
  ];

  const availableBiomarkers = useMemo(() => {
    return combinedBiomarkers.filter((b) => b.dependsOn === null || preferences[b.dependsOn]);
  }, [combinedBiomarkers, preferences]);

  const filteredBiomarkers = availableBiomarkers.filter((b) => selectedBios.includes(b.name));

  return (
    <>
      <div className="wk-page">
        <main className="wk-main">
          <section className="wk-frameOuter">
            <div className="wk-frameInner">
              <div className="wk-monthRow">
                <div
                  className="wk-monthPill"
                  onClick={() => {
                    if (!monthOpen) setViewYear(year);
                    setMonthOpen(!monthOpen);
                  }}
                >
                  <div className="wk-monthText">{monthLabel}</div>

                  <button type="button" className="wk-monthCaret">
                    ▾
                  </button>

                  {monthOpen && (
                    <div className="wk-monthMenu" onClick={(e) => e.stopPropagation()}>
                      <div className="wk-pickerHeader">
                        <button
                          type="button"
                          className="wk-pickerArrow"
                          onClick={() => setViewYear((y) => y - 1)}
                        >
                          &lt;
                        </button>
                        <div className="wk-pickerYear">{viewYear}</div>
                        <button
                          type="button"
                          className="wk-pickerArrow"
                          onClick={() => setViewYear((y) => y + 1)}
                        >
                          &gt;
                        </button>
                      </div>

                      <div className="wk-pickerGrid">
                        {monthNames.map((m, idx) => (
                          <button
                            key={m}
                            type="button"
                            className={`wk-pickerMonthBtn ${
                              idx === month && viewYear === year ? "isActive" : ""
                            }`}
                            onClick={() => {
                              setMonth(idx);
                              setYear(viewYear);
                              setMonthOpen(false);
                            }}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="wk-grid">
                {weekdayLabels.map((w, i) => (
                  <div key={i} className="wk-dow">
                    {w}
                  </div>
                ))}

                {calendarCells.map((d, idx) => {
                  if (!d) return <div key={idx} className="wk-cell wk-empty" />;

                  const k = dateKey(d);
                  const dayWorkouts = workoutsByDay.get(k) ?? [];
                  const hasWorkout = dayWorkouts.length > 0;
                  const isSelected = dateKey(d) === selectedDayKey;
                  const isToday = dateKey(d) === dateKey(today);

                  return (
                    <button
                      key={idx}
                      className={`wk-cell ${hasWorkout ? "wk-cellHasWorkout" : ""} ${
                        isSelected ? "isSelected" : ""
                      } ${isToday ? "isToday" : ""}`}
                      onClick={() => setSelectedDay(d)}
                      onDoubleClick={() => openSelect(d)}
                      type="button"
                      title="Click to select day, double-click to open Select Workout"
                    >
                      <div className="wk-cellHeader">
                        <span className="wk-num">{d.getDate()}</span>
                        {syncedDates.has(k) && (
                          <span style={{ fontSize: "12px", color: "green", marginLeft: "4px" }}>✓</span>
                        )}
                        {hasWorkout && <span className="wk-cellBadge">{dayWorkouts.length}</span>}
                      </div>

                      {hasWorkout && (
                        <div className="wk-cellFooter">
                          {dayWorkouts.slice(0, 2).map((w) => (
                            <div
                              key={w.id}
                              className={`wk-workoutChip wk-type-${w.type.toLowerCase()}`}
                            >
                              <span className="wk-workoutDot" />
                              <span className="wk-workoutChipText">{w.title}</span>
                            </div>
                          ))}

                          {dayWorkouts.length > 2 && (
                            <div className="wk-cellWorkoutMore">+{dayWorkouts.length - 2} more</div>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          <div className="wk-bottomBtns">
            <button className="wk-pillBtn" onClick={() => openSelect(selectedDay)} type="button">
              Select Workout
            </button>

            <button
              className="wk-pillBtn wk-manageBtn"
              onClick={() => setShowManageWorkouts(true)}
              type="button"
              disabled={selectedDayWorkouts.length === 0}
              title={
                selectedDayWorkouts.length === 0
                  ? "No workouts on this date"
                  : "Manage workouts for this date"
              }
            >
              Manage Workouts
            </button>

            <button
              className="wk-pillBtn wk-importBtn"
              onClick={() => setShowImportWorkout(true)}
              type="button"
            >
              Sync Device
            </button>
          </div>

          <section 
            className="wk-dataSection"
            style={{
              backgroundColor: "#3C5246",
              borderRadius: "24px",
              padding: "24px 0 32px 0",
              marginTop: "40px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)"
            }}
          >
            <h2 
              className="wk-dataTitle" 
              style={{ 
                color: "white", 
                margin: "0 0 20px 0" 
              }}
            >
              Workout Data
            </h2>

            <div className="wk-dataBtns" style={{ padding: 0 }}>
              <button 
                className="wk-dataBtn" 
                type="button" 
                style={{ backgroundColor: "#5b7a6b", border: "2px solid rgba(255,255,255,0.1)" }}
                onClick={() => setShowBiomarkers(true)}
              >
                Biomarker
              </button>
            </div>
          </section>
        </main>
      </div>

      {showSelectWorkout && (
        <Modal onClose={() => setShowSelectWorkout(false)}>
          <div className="wk-modalHeader">
            <h2 className="wk-modalTitle">Select Workout</h2>
            <button className="wk-close" onClick={() => setShowSelectWorkout(false)} type="button">
              X
            </button>
          </div>

          <div className="wk-form">
            <div className="wk-listHeader">
              <div className="wk-listTitle">Workouts on {selectedDay.toLocaleDateString("en-GB")}</div>
              <div className="wk-listCount">{selectedDayWorkouts.length} total</div>
            </div>

            {selectedDayWorkouts.length === 0 ? (
              <div className="wk-emptyList">No workouts yet — add one below.</div>
            ) : (
              <div className="wk-workoutList">
                {selectedDayWorkouts.map((w) => (
                  <div key={w.id} className="wk-workoutCard">
                    <div className="wk-cardInfo">
                      <div className="wk-cardTitle">{w.title}</div>
                      <div className="wk-cardMeta">
                        {w.type} • {w.duration}
                      </div>
                    </div>

                    <div className="wk-cardBtns">
                      <button
                        className="wk-smallBtn"
                        type="button"
                        onClick={() => setSelectedWorkoutId(w.id)}
                      >
                        Select
                      </button>
                      <button
                        className="wk-smallBtn wk-dangerBtn"
                        type="button"
                        onClick={() => deleteWorkoutById(w.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="wk-divider" />

            <label className="wk-label">Title of Workout</label>
            <input
              className="wk-input"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            />

            <label className="wk-label">Type of Workout</label>
            <select
              className="wk-input wk-selectInput"
              value={form.type}
              onChange={(e) => {
                const newType = e.target.value;
                const newDist = distanceBasedTypes.includes(newType) ? form.distance : "";
                setForm((f) => ({ ...f, type: newType, distance: newDist }));
              }}
            >
              <option>Walk</option>
              <option>Run</option>
              <option>Cycling</option>
              <option>Gym</option>
              <option>Swimming</option>
              <option>Yoga</option>
            </select>

            <label className="wk-label">Date of Workout</label>
            <input
              className="wk-input wk-dateInput"
              type="date"
              value={toInputDate(form.date)}
              onChange={(e) => {
                const d = fromInputDate(e.target.value);
                if (!d) return;
                setForm((f) => ({ ...f, date: d }));
                setSelectedDay(d);
              }}
            />

            <label className="wk-label">Duration of Workout</label>
            <input
              className="wk-input wk-short"
              placeholder="e.g. 45min"
              value={form.duration}
              onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}
            />

            {distanceBasedTypes.includes(form.type) && (
              <>
                <label className="wk-label">Distance (km)</label>
                <input
                  className="wk-input wk-short"
                  type="number"
                  min="0"
                  step="0.1"
                  placeholder="e.g. 5.2"
                  value={form.distance}
                  onChange={(e) => setForm((f) => ({ ...f, distance: e.target.value }))}
                />
              </>
            )}

            <div className="wk-formActions">
              <button className="wk-enterBtn" type="button" onClick={addWorkout}>
                Enter
              </button>
            </div>
          </div>
        </Modal>
      )}

      {showManageWorkouts && (
        <Modal onClose={() => setShowManageWorkouts(false)}>
          <div className="wk-modalHeader">
            <h2 className="wk-modalTitle">Manage Workouts</h2>
            <button className="wk-close" onClick={() => setShowManageWorkouts(false)} type="button">
              X
            </button>
          </div>

          <div className="wk-form">
            <div className="wk-listHeader">
              <div className="wk-listTitle">Workouts on {selectedDay.toLocaleDateString("en-GB")}</div>
              <div className="wk-listCount">{selectedDayWorkouts.length} total</div>
            </div>

            {selectedDayWorkouts.length === 0 ? (
              <div className="wk-emptyList">No workouts on this date.</div>
            ) : (
              <div className="wk-workoutList">
                {selectedDayWorkouts.map((w) => (
                  <div key={w.id} className="wk-workoutCard">
                    <div className="wk-cardInfo">
                      <div className="wk-cardTitle">{w.title}</div>
                      <div className="wk-cardMeta">
                        {w.type} • {w.duration} {w.distance > 0 && `• ${w.distance}km`}
                      </div>
                    </div>

                    <div className="wk-cardBtns">
                      <button
                        className="wk-smallBtn wk-dangerBtn"
                        type="button"
                        onClick={() => deleteWorkoutById(w.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Modal>
      )}

      {showImportWorkout && (
        <Modal onClose={() => setShowImportWorkout(false)}>
          <div className="wk-modalHeader">
            <h2 className="wk-modalTitle">Sync Device Data</h2>
            <button className="wk-close" onClick={() => setShowImportWorkout(false)} type="button">
              X
            </button>
          </div>

          <div className="wk-importSub">Choose device to sync biomarkers & workouts</div>

          <div className="wk-deviceBox">
            <DeviceRow
              label="Jane’s iPhone"
              checked={selectedDevice === "Jane’s iPhone"}
              onClick={() => setSelectedDevice("Jane’s iPhone")}
            />
            <DeviceRow
              label="Jane’s Laptop 2"
              checked={selectedDevice === "Jane’s Laptop 2"}
              onClick={() => setSelectedDevice("Jane’s Laptop 2")}
            />
            <DeviceRow
              label="Jane’s Watch"
              checked={selectedDevice === "Jane’s Watch"}
              onClick={() => setSelectedDevice("Jane’s Watch")}
            />
          </div>

          <div className="wk-formActions">
            <button className="wk-enterBtn" type="button" onClick={handleImportWorkout}>
              Sync
            </button>
          </div>
        </Modal>
      )}

      {showBiomarkers && (
        <Modal onClose={() => setShowBiomarkers(false)}>
          <div className="wk-modalHeader">
            <h2 className="wk-modalTitle">Biomarkers</h2>
            <button className="wk-close" type="button" onClick={() => setShowBiomarkers(false)}>
              X
            </button>
          </div>

          <div className="wk-bioToggleWrap">
            <div className="wk-bioToggle">
              <button
                className={`wk-bioToggleBtn ${bioView === "list" ? "isActive" : ""}`}
                onClick={() => setBioView("list")}
                type="button"
              >
                List View
              </button>
              <button
                className={`wk-bioToggleBtn ${bioView === "chart" ? "isActive" : ""}`}
                onClick={() => setBioView("chart")}
                type="button"
              >
                Chart View
              </button>
            </div>
          </div>

          <div className="wk-bioFilters">
            {availableBiomarkers.map((b) => (
              <button
                key={b.name}
                type="button"
                className={`wk-bioFilterChip ${selectedBios.includes(b.name) ? "isSelected" : ""}`}
                onClick={() => toggleBio(b.name)}
              >
                {b.name}
              </button>
            ))}
          </div>

          {filteredBiomarkers.length === 0 ? (
            <div className="wk-emptyList" style={{ textAlign: "center", marginTop: 20 }}>
              Select at least one biomarker to view data.
            </div>
          ) : bioView === "list" ? (
            <div className="wk-biomarkersGrid">
              {filteredBiomarkers.map((b) => (
                <div key={b.name} className="wk-bioCard">
                  <div className="wk-bioName">{b.name}</div>
                  <div className="wk-bioValueWrap">
                    <span className="wk-bioValue">{b.value}</span>
                    <span className="wk-bioUnit">{b.unit}</span>
                  </div>
                  <div className={`wk-bioStatus status-${b.status.toLowerCase()}`}>{b.status}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="wk-bioChartArea">
              {filteredBiomarkers.map((b) => (
                <div key={b.name} className="wk-bioChartRow">
                  <div className="wk-bioChartLabel">
                    <span>{b.name}</span>
                    <span className="wk-bioChartValue">
                      {b.value} {b.unit}
                    </span>
                  </div>
                  <div className="wk-bioChartTrack">
                    <div
                      className={`wk-bioChartFill status-${b.status.toLowerCase()}`}
                      style={{ width: `${b.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Modal>
      )}

      {toast.show && (
        <div className="wk-toast" role="status" aria-live="polite">
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
    <div className="wk-overlay" onMouseDown={onClose} role="presentation">
      <div className="wk-modal" onMouseDown={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
}

function DeviceRow({ label, checked, onClick }) {
  return (
    <button
      className={`wk-deviceRow ${checked ? "isSelected" : ""}`}
      type="button"
      onClick={onClick}
    >
      <div className="wk-deviceIcon" aria-hidden="true" />
      <div className="wk-deviceLabel">{label}</div>
      <div className={`wk-checkbox ${checked ? "isChecked" : ""}`}>{checked ? "✓" : ""}</div>
    </button>
  );
}