import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Pill, Stethoscope, Trash2, Clock } from "lucide-react";

interface Medication {
  id: number;
  name: string;
  dosage: string;
  time: string; // e.g. "09:30"
}

interface Appointment {
  id: number;
  date: string; // YYYY-MM-DD
  doctor: string;
  purpose: string;
  notes: string;
}

const HealthMedication: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [med, setMed] = useState({ name: "", dosage: "", time: "" });
  const [appt, setAppt] = useState({ date: "", doctor: "", purpose: "", notes: "" });

  // ✅ Ask permission for notifications
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  // ✅ Load from localStorage
  useEffect(() => {
    const savedMeds = localStorage.getItem("medications");
    const savedAppts = localStorage.getItem("appointments");
    if (savedMeds) setMedications(JSON.parse(savedMeds));
    if (savedAppts) setAppointments(JSON.parse(savedAppts));
  }, []);

  // ✅ Save to localStorage
  useEffect(() => {
    localStorage.setItem("medications", JSON.stringify(medications));
  }, [medications]);
  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  // ✅ Check for upcoming reminders every 60 seconds
  useEffect(() => {
    const interval = setInterval(checkReminders, 60000);
    checkReminders(); // run immediately
    return () => clearInterval(interval);
  }, [medications, appointments]);

  // 🔔 Function to check reminders
  const checkReminders = () => {
    if (!("Notification" in window) || Notification.permission !== "granted") return;

    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5); // HH:MM format
    const currentDate = now.toISOString().slice(0, 10); // YYYY-MM-DD

    // 💊 Medication reminders
    medications.forEach((m) => {
      if (m.time === currentTime) {
        new Notification("💊 Time to take your medicine!", {
          body: `${m.name} — ${m.dosage}`,
        });
      }
    });

    // 🩺 Appointment reminders (1 hour before)
    appointments.forEach((a) => {
      const apptDateTime = new Date(`${a.date}T09:00`); // assume 9 AM appointment
      const diff = apptDateTime.getTime() - now.getTime();
      if (diff > 0 && diff < 60 * 60 * 1000 && currentDate === a.date) {
        new Notification("🩺 Upcoming Appointment", {
          body: `You have an appointment with Dr. ${a.doctor} for ${a.purpose} in 1 hour.`,
        });
      }
    });
  };

  // ---------- Handlers ----------
  const addMedication = () => {
    if (med.name && med.dosage && med.time) {
      setMedications([...medications, { ...med, id: Date.now() }]);
      setMed({ name: "", dosage: "", time: "" });
    }
  };
  const deleteMedication = (id: number) => setMedications(medications.filter((m) => m.id !== id));

  const addAppointment = () => {
    if (appt.date && appt.doctor && appt.purpose) {
      setAppointments([...appointments, { ...appt, id: Date.now() }]);
      setAppt({ date: "", doctor: "", purpose: "", notes: "" });
    }
  };
  const deleteAppointment = (id: number) => setAppointments(appointments.filter((a) => a.id !== id));

  // ---------- JSX ----------
  return (
    <div className="p-6 space-y-6">
      <motion.h1
        className="text-3xl font-bold text-center text-pink-600"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        💊 Medication & Appointments Tracker
      </motion.h1>

      {/* ----------- Medications ----------- */}
      <Card className="shadow-lg border-pink-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-pink-700">
            <Pill className="text-pink-600" /> Medications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid md:grid-cols-4 gap-3">
            <Input placeholder="Medicine Name" value={med.name} onChange={(e) => setMed({ ...med, name: e.target.value })} />
            <Input placeholder="Dosage (e.g., 500mg)" value={med.dosage} onChange={(e) => setMed({ ...med, dosage: e.target.value })} />
            <Input type="time" value={med.time} onChange={(e) => setMed({ ...med, time: e.target.value })} />
            <Button className="bg-pink-500 hover:bg-pink-600" onClick={addMedication}>Add</Button>
          </div>

          {medications.length > 0 ? (
            <ul className="space-y-2 mt-3">
              {medications.map((m) => (
                <li key={m.id} className="flex justify-between items-center bg-pink-50 p-3 rounded-xl">
                  <div>
                    <strong>{m.name}</strong> — {m.dosage} at <span className="text-pink-700 font-medium">{m.time}</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => deleteMedication(m.id)} className="text-red-500 hover:text-red-600">
                    <Trash2 />
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center mt-3">No medications added yet.</p>
          )}
        </CardContent>
      </Card>

      {/* ----------- Appointments ----------- */}
      <Card className="shadow-lg border-pink-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-pink-700">
            <Stethoscope className="text-pink-600" /> Appointments
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid md:grid-cols-5 gap-3">
            <Input type="date" value={appt.date} onChange={(e) => setAppt({ ...appt, date: e.target.value })} />
            <Input placeholder="Doctor Name" value={appt.doctor} onChange={(e) => setAppt({ ...appt, doctor: e.target.value })} />
            <Input placeholder="Purpose" value={appt.purpose} onChange={(e) => setAppt({ ...appt, purpose: e.target.value })} />
            <Input placeholder="Notes" value={appt.notes} onChange={(e) => setAppt({ ...appt, notes: e.target.value })} />
            <Button className="bg-pink-500 hover:bg-pink-600" onClick={addAppointment}>Add</Button>
          </div>

          {appointments.length > 0 ? (
            <ul className="space-y-2 mt-3">
              {appointments.map((a) => (
                <li key={a.id} className="flex justify-between items-start bg-pink-50 p-3 rounded-xl">
                  <div>
                    <strong>{a.date}</strong> — {a.purpose} with Dr. {a.doctor}
                    {a.notes && <div className="text-sm text-gray-600 mt-1">{a.notes}</div>}
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => deleteAppointment(a.id)} className="text-red-500 hover:text-red-600">
                    <Trash2 />
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center mt-3">No appointments scheduled yet.</p>
          )}
        </CardContent>
      </Card>

      {/* ----------- Motivation ----------- */}
      <Card className="text-center shadow-lg border-pink-200">
        <CardHeader>
          <CardTitle className="flex justify-center items-center gap-2 text-pink-700">
            <Clock className="text-pink-600" /> Reminder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">⏰ Stay consistent with your medications and check-ups — your health is your power!</p>
          <p className="text-pink-700 mt-2 font-medium">“A small pill today keeps big worries away.”</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthMedication;
