import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Navbar from "../components/Navbar";
import "../styles/workouts.css";

/* ---------- date helpers (Date datatype) ---------- */
const weekdayLabels = ["M", "T", "W", "T", "F", "S", "S"];
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const pad2 = (n) => String(n).padStart(2, "0");

const dateKey = (d) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

const toInputDate = (d) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
const fromInputDate = (s) => {
  const [y, m, d] = s.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
};

/* ---------- localStorage (store ISO, revive Date) ---------- */
const LS_KEY = "cardiyo_workouts_v9";

const loadWorkouts = () => {
  const raw = localStorage.getItem(LS_KEY);
  if (!raw) return [];
  try {
    const arr = JSON.parse(raw);
    return arr.map((w) => ({ ...w, date: new Date(w.date) }));
  } catch {
    return [];
  }
};

const saveWorkouts = (workouts) => {
  localStorage.setItem(
    LS_KEY,
    JSON.stringify(workouts.map((w) => ({ ...w, date: w.date.toISOString() })))
  );
};

export default function Workouts() {
  const today = useMemo(() => new Date(), []);
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const [monthOpen, setMonthOpen] = useState(false);
  const [viewYear, setViewYear] = useState(year);

  const [workouts, setWorkouts] = useState([]);
  const [selectedDay, setSelectedDay] = useState(today);

  const [showSelectWorkout, setShowSelectWorkout] = useState(false);
  const [showManageWorkouts, setShowManageWorkouts] = useState(false);
  const [showImportWorkout, setShowImportWorkout] = useState(false);
  const [showMountains, setShowMountains] = useState(false);

  const [selectedWorkoutId, setSelectedWorkoutId] = useState("");
  const [selectedMountain, setSelectedMountain] = useState(null);

  const [form, setForm] = useState({
    title: "New Workout",
    type: "Walk",
    date: today,
    duration: "1hr",
  });

  const mountains = useMemo(
    () => [
      { name: "Mount Fuji", img: "https://api.dicebear.com/7.x/shapes/svg?seed=Fuji&backgroundColor=ffb3ba,ffdfba", locked: false },
      { name: "Chimborazo", img: "https://api.dicebear.com/7.x/shapes/svg?seed=Chimborazo&backgroundColor=baffc9,bae1ff", locked: false },
      { name: "Aoraki", img: "https://api.dicebear.com/7.x/shapes/svg?seed=Aoraki&backgroundColor=e2f0cb,ffb3ba", locked: true },
      { name: "Mount Annapurna", img: "https://api.dicebear.com/7.x/shapes/svg?seed=Anna&backgroundColor=bae1ff,f3b0e1", locked: false },
      { name: "Eiger", img: "https://api.dicebear.com/7.x/shapes/svg?seed=Eiger&backgroundColor=ffffba,baffc9", locked: true },
      { name: "Ben Nevis", img: "https://api.dicebear.com/7.x/shapes/svg?seed=Ben&backgroundColor=ffb3ba,ffffba", locked: false },
      { name: "Matterhorn", img: "https://api.dicebear.com/7.x/shapes/svg?seed=Matter&backgroundColor=bae1ff,e2f0cb", locked: true },
      { name: "Mount Kinabalu", img: "https://api.dicebear.com/7.x/shapes/svg?seed=Kina&backgroundColor=f3b0e1,ffffba", locked: true },
    ],
    []
  );

  useEffect(() => setWorkouts(loadWorkouts()), []);
  useEffect(() => saveWorkouts(workouts), [workouts]);

  const anyModalOpen = showSelectWorkout || showManageWorkouts || showImportWorkout || showMountains;
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
      const k = dateKey(w.date);
      if (!map.has(k)) map.set(k, []);
      map.get(k).push(w);
    }
    for (const [k, arr] of map.entries()) {
      arr.sort((a, b) => a.createdAt - b.createdAt);
      map.set(k, arr);
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
    const daysInMonth = last.getDate();

    const cells = [];
    for (let i = 0; i < firstDow; i++) cells.push(null);
    for (let day = 1; day <= daysInMonth; day++) cells.push(new Date(year, month, day));
    while (cells.length < 42) cells.push(null);
    return cells;
  }, [month, year]);

  function openSelect(dateObj) {
    const d = dateObj ?? selectedDay ?? today;
    setSelectedDay(d);
    setForm((f) => ({ ...f, date: d }));

    const dayList = workoutsByDay.get(dateKey(d)) ?? [];
    setSelectedWorkoutId(dayList[0]?.id ?? "");

    setShowSelectWorkout(true);
  }

  function addWorkout() {
    const newWorkout = {
      id: crypto?.randomUUID ? crypto.randomUUID() : String(Date.now()),
      date: new Date(form.date.getTime()),
      title: form.title.trim() || "Workout",
      type: form.type,
      duration: form.duration.trim() || "1hr",
      createdAt: Date.now(),
    };

    setWorkouts((prev) => [...prev, newWorkout]);
    setSelectedWorkoutId(newWorkout.id);
    setShowSelectWorkout(false);
  }

  function deleteWorkoutById(id) {
    setWorkouts((prev) => prev.filter((w) => w.id !== id));
    if (selectedWorkoutId === id) {
      const remaining = selectedDayWorkouts.filter((x) => x.id !== id);
      setSelectedWorkoutId(remaining[0]?.id ?? "");
    }
  }

  return (
    <>
      <Navbar />

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
                        <button type="button" className="wk-pickerArrow" onClick={() => setViewYear((y) => y - 1)}>
                          &lt;
                        </button>
                        <div className="wk-pickerYear">{viewYear}</div>
                        <button type="button" className="wk-pickerArrow" onClick={() => setViewYear((y) => y + 1)}>
                          &gt;
                        </button>
                      </div>
                      <div className="wk-pickerGrid">
                        {monthNames.map((m, idx) => (
                          <button
                            key={m}
                            type="button"
                            className={`wk-pickerMonthBtn ${idx === month && viewYear === year ? "isActive" : ""}`}
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
                      className={`wk-cell ${hasWorkout ? "wk-cellHasWorkout" : ""} ${isSelected ? "isSelected" : ""} ${isToday ? "isToday" : ""}`}
                      onClick={() => setSelectedDay(d)}
                      onDoubleClick={() => openSelect(d)}
                      type="button"
                      title="Click to select day, double-click to open Select Workout"
                    >
                      <div className="wk-cellHeader">
                        <span className="wk-num">{d.getDate()}</span>

                        {hasWorkout && (
                          <span className="wk-cellBadge">{dayWorkouts.length}</span>
                        )}
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
                            <div className="wk-cellWorkoutMore">
                              +{dayWorkouts.length - 2} more
                            </div>
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
            <div className="wk-leftBtns">
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
            </div>

            <button className="wk-pillBtn" onClick={() => setShowImportWorkout(true)} type="button">
              Import
            </button>
          </div>

          <section className="wk-dataSection">
            <div className="wk-dataTopBar" />
            <h2 className="wk-dataTitle">Workout Data</h2>
            <div className="wk-dataBottomBar" />

            <div className="wk-dataBtns">
              <button className="wk-dataBtn" type="button">
                Biomarker
              </button>

              <button className="wk-dataBtn" type="button" onClick={() => setShowMountains(true)}>
                Mountain
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
                      <button className="wk-smallBtn" type="button" onClick={() => setSelectedWorkoutId(w.id)}>
                        Select
                      </button>
                      <button className="wk-smallBtn wk-dangerBtn" type="button" onClick={() => deleteWorkoutById(w.id)}>
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
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
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
              value={form.duration}
              onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}
            />

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
                        {w.type} • {w.duration}
                      </div>
                    </div>

                    <div className="wk-cardBtns">
                      <button className="wk-smallBtn wk-dangerBtn" type="button" onClick={() => deleteWorkoutById(w.id)}>
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
            <h2 className="wk-modalTitle">Import Workout</h2>
            <button className="wk-close" onClick={() => setShowImportWorkout(false)} type="button">
              X
            </button>
          </div>

          <div className="wk-importSub">Choose Device</div>

          <div className="wk-deviceBox">
            <DeviceRow label="Joe’s Iphone" checked={false} />
            <DeviceRow label="Jane’s Laptop 2" checked={false} />
            <DeviceRow label="Jane’s Watch" checked />
          </div>
        </Modal>
      )}

      {showMountains && (
        <Modal
          onClose={() => {
            setShowMountains(false);
            setSelectedMountain(null);
          }}
        >
          <div className="wk-modalHeader">
            <h2 className="wk-modalTitle">Mountains</h2>
            <button
              className="wk-close"
              type="button"
              onClick={() => {
                setShowMountains(false);
                setSelectedMountain(null);
              }}
            >
              X
            </button>
          </div>

          {!selectedMountain ? (
            <div className="wk-mountainsGrid">
              {mountains.map((m) => (
                <button
                  key={m.name}
                  type="button"
                  className={`wk-mountainCard ${m.locked ? "isLocked" : ""}`}
                  onClick={() => {
                    if (!m.locked) {
                      setSelectedMountain(m);
                    }
                  }}
                >
                  <div className="wk-mountainImgWrap">
                    {m.img ? <img className="wk-mountainImg" src={m.img} alt={m.name} /> : null}
                    {m.locked && (
                      <div className="wk-lockOverlay" aria-hidden="true">
                        🔒
                      </div>
                    )}
                  </div>
                  <div className="wk-mountainName">{m.name}</div>
                </button>
              ))}
            </div>
          ) : (
            <div className="wk-mountainSingleView">
              <div className="wk-mountainImgLargeWrap">
                {selectedMountain.img && (
                  <img className="wk-mountainImg" src={selectedMountain.img} alt={selectedMountain.name} />
                )}
              </div>
              <div className="wk-mountainNameLarge">{selectedMountain.name}</div>

              <button
                className="wk-enterBtn"
                type="button"
                onClick={() => {
                  setShowMountains(false);
                  setSelectedMountain(null);
                }}
              >
                Confirm
              </button>
            </div>
          )}
        </Modal>
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

function DeviceRow({ label, checked }) {
  return (
    <div className="wk-deviceRow">
      <div className="wk-deviceIcon" aria-hidden="true" />
      <div className="wk-deviceLabel">{label}</div>
      <div className={`wk-checkbox ${checked ? "isChecked" : ""}`}>{checked ? "✓" : ""}</div>
    </div>
  );
}