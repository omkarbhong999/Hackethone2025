// import React, { useState, useEffect, useRef } from 'react';
// import { initializeApp } from 'firebase/app';
// import { 
//     getAuth, 
//     createUserWithEmailAndPassword, 
//     signInWithEmailAndPassword, 
//     onAuthStateChanged, 
//     signOut 
// } from 'firebase/auth';
// import { 
//     getFirestore, 
//     collection, 
//     doc, 
//     setDoc, 
//     getDoc, 
//     query, 
//     where, 
//     getDocs,
//     updateDoc,
//     onSnapshot
// } from 'firebase/firestore';

// // --- YOUR FIREBASE CONFIGURATION ---
// const firebaseConfig = {
//   apiKey: "AIzaSyDg5-Df7zvJAAgRaemb7kKl1flo1CcfY48",
//   authDomain: "mediconnect-79877.firebaseapp.com",
//   projectId: "mediconnect-79877",
//   storageBucket: "mediconnect-79877.firebasestorage.app",
//   messagingSenderId: "630994353571",
//   appId: "1:630994353571:web:d3db6f78566bd81e2bae16",
//   measurementId: "G-F0QZD7YYL8"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// const DOCTOR_SECRET_CODE = "DOC123";

// // --- SVG Icons ---
// const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
// const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;
// const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;

// // --- Main App Component ---
// export default function App() {
//     const [user, setUser] = useState(null);
//     const [userData, setUserData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [currentCall, setCurrentCall] = useState(null);

//     useEffect(() => {
//         let userSnapshotUnsubscribe = null;
//         const authUnsubscribe = onAuthStateChanged(auth, (currentUser) => {
//             if (userSnapshotUnsubscribe) {
//                 userSnapshotUnsubscribe();
//             }
//             if (currentUser) {
//                 setUser(currentUser);
//                 const userDocRef = doc(db, "users", currentUser.uid);
//                 userSnapshotUnsubscribe = onSnapshot(userDocRef, (doc) => {
//                     if (doc.exists()) {
//                         setUserData({ id: doc.id, ...doc.data() });
//                     }
//                     setLoading(false);
//                 });
//             } else {
//                 setUser(null);
//                 setUserData(null);
//                 setLoading(false);
//             }
//         });

//         return () => {
//             authUnsubscribe();
//             if (userSnapshotUnsubscribe) {
//                 userSnapshotUnsubscribe();
//             }
//         };
//     }, []);

//     const handleSignOut = async () => {
//         if (userData?.role === 'doctor') {
//             await updateDoc(doc(db, "users", user.uid), { status: 'offline' });
//         }
//         await signOut(auth);
//         setCurrentCall(null);
//     };

//     const handleEndCall = async (appointmentId) => {
//         if (appointmentId) {
//             await updateDoc(doc(db, "appointments", appointmentId), { 
//                 status: 'completed',
//                 callStatus: null
//             });
//         }
//         setCurrentCall(null);
//     };

//     if (loading) return <div className="flex items-center justify-center h-screen bg-slate-50"><div className="text-2xl font-semibold text-gray-700 animate-pulse">Loading Secure Health Portal...</div></div>;
//     if (currentCall) return <VideoCall appointment={currentCall} user={userData} onEndCall={() => handleEndCall(currentCall.id)} />;

//     return (
//         <div className="min-h-screen bg-slate-50 font-sans text-gray-800">
//             {user && <Header userData={userData} onSignOut={handleSignOut} />}
//             <main>
//                 {!user ? <AuthPage /> : (
//                     <div className="container mx-auto p-4 md:p-8">
//                         {userData ? (
//                             userData.role === 'doctor' 
//                                 ? <DoctorDashboard user={user} userData={userData} onStartCall={setCurrentCall} /> 
//                                 : <PatientDashboard user={user} userData={userData} onStartCall={setCurrentCall} />
//                         ) : (
//                              <div className="text-center text-slate-500">Loading user data...</div>
//                         )}
//                     </div>
//                 )}
//             </main>
//         </div>
//     );
// }

// // --- Auth & Header Components (Largely Unchanged) ---
// function Header({ userData, onSignOut }) {
//     return (
//         <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-slate-200">
//             <div className="container mx-auto p-4 flex justify-between items-center">
//                 <div className="text-2xl font-bold text-blue-600 tracking-tight">MediConnect</div>
//                 {userData && <div className="flex items-center space-x-4">
//                     <span className="hidden sm:block text-slate-600">
//                         Welcome, <span className="font-semibold text-slate-900">{userData.name || "User"}</span>
//                     </span>
//                     <button onClick={onSignOut} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors">Sign Out</button>
//                 </div>}
//             </div>
//         </header>
//     );
// }

// function AuthPage() {
//     const [isLoginView, setIsLoginView] = useState(true);
//     return (
//         <div className="min-h-screen flex items-center justify-center bg-white p-4">
//             <div className="grid md:grid-cols-2 max-w-5xl w-full rounded-2xl shadow-2xl overflow-hidden">
//                 <div className="p-8 md:p-12 order-last md:order-first"><h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4 tracking-tight">MediConnect</h1><h2 className="text-xl md:text-2xl font-medium text-slate-700 mb-8">{isLoginView ? "Sign in to your account" : "Create a new account"}</h2>{isLoginView ? <Login /> : <SignUp />}<p className="mt-6 text-center text-sm text-slate-600">{isLoginView ? "Don't have an account? " : "Already have an account? "}<button onClick={() => setIsLoginView(!isLoginView)} className="font-semibold text-blue-600 hover:text-blue-500">{isLoginView ? "Sign Up" : "Sign In"}</button></p></div>
//                 <div className="hidden md:block bg-blue-600 p-12"><div className="w-full h-full rounded-lg bg-cover bg-center" style={{backgroundImage: `url(https://placehold.co/600x800/e0e7ff/334155?text=Compassionate\\nCare+Online&font=raleway)`}}></div></div>
//             </div>
//         </div>
//     );
// }

// const InputField = ({ icon, ...props }) => (<div className="relative"><span className="absolute inset-y-0 left-0 flex items-center pl-3">{icon}</span><input {...props} className="w-full pl-10 p-3 bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" /></div>);

// function Login() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const handleLogin = async (e) => { e.preventDefault(); setError(''); try { await signInWithEmailAndPassword(auth, email, password); } catch (err) { setError(err.message.replace('Firebase: ', '')); }};
//     return (<form onSubmit={handleLogin} className="space-y-5">{error && <p className="text-red-500 bg-red-100 p-3 rounded-lg text-center text-sm">{error}</p>}<InputField type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com" required icon={<MailIcon />} /><InputField type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required icon={<LockIcon />} /><button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-transform transform hover:-translate-y-0.5 shadow-md hover:shadow-lg">Login</button></form>);
// }

// function SignUp() {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [secretCode, setSecretCode] = useState('');
//     const [isDoctor, setIsDoctor] = useState(false);
//     const [error, setError] = useState('');
//     const handleSignUp = async (e) => { e.preventDefault(); setError(''); if (isDoctor && secretCode !== DOCTOR_SECRET_CODE) { setError("Invalid secret code for doctor registration."); return; } try { const userCredential = await createUserWithEmailAndPassword(auth, email, password); const user = userCredential.user; const role = isDoctor ? 'doctor' : 'patient'; const userData = { uid: user.uid, name, email, role, ...(isDoctor && { status: 'offline' }) }; await setDoc(doc(db, "users", user.uid), userData); } catch (err) { setError(err.message.replace('Firebase: ', '')); }};
//     return (<form onSubmit={handleSignUp} className="space-y-4">{error && <p className="text-red-500 bg-red-100 p-3 rounded-lg text-center text-sm">{error}</p>}<InputField type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" required icon={<UserIcon />} /><InputField type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required icon={<MailIcon />} /><InputField type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password (min. 6 characters)" required icon={<LockIcon />} /><label htmlFor="isDoctor" className="flex items-center space-x-2 text-sm text-slate-700 cursor-pointer"><input type="checkbox" id="isDoctor" checked={isDoctor} onChange={() => setIsDoctor(!isDoctor)} className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"/><span>Are you a doctor?</span></label>{isDoctor && <InputField type="text" value={secretCode} onChange={e => setSecretCode(e.target.value)} placeholder="Secret Registration Code" required icon={<LockIcon />} />}<button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-transform transform hover:-translate-y-0.5 shadow-md hover:shadow-lg">Create Account</button></form>);
// }

// // --- PatientDashboard ---
// function PatientDashboard({ user, userData, onStartCall }) {
//     const [doctors, setDoctors] = useState([]);
//     const [appointments, setAppointments] = useState([]);
//     const [notification, setNotification] = useState({ type: '', message: '' });
//     useEffect(() => { const doctorsQuery = query(collection(db, "users"), where("role", "==", "doctor")); const unsubDoctors = onSnapshot(doctorsQuery, (snapshot) => { const doctorsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); doctorsList.sort((a, b) => { if (a.status === 'available' && b.status !== 'available') return -1; if (a.status !== 'available' && b.status === 'available') return 1; return 0; }); setDoctors(doctorsList); }); const appointmentsQuery = query(collection(db, "appointments"), where("patientId", "==", user.uid)); const unsubAppointments = onSnapshot(appointmentsQuery, (snapshot) => { const appts = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})); setAppointments(appts.sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0))); }); return () => { unsubDoctors(); unsubAppointments(); }; }, [user.uid]);
//     const showNotification = (type, message) => { setNotification({ type, message }); setTimeout(() => setNotification({ type: '', message: '' }), 4000); };
//     const handleBookAppointment = async (doctorId) => { const appointmentId = `appt_${user.uid.substring(0,5)}_${doctorId.substring(0,5)}_${Date.now()}`; try { await setDoc(doc(db, "appointments", appointmentId), { patientId: user.uid, patientName: userData.name || user.email, doctorId, status: 'pending', createdAt: new Date(), callStatus: null }); showNotification('success', "Appointment requested successfully!"); } catch (error) { showNotification('error', "Failed to book appointment."); }};
//     const StatusBadge = ({ status }) => { const isAvailable = status === 'available'; return <span className={`px-2 py-1 text-xs font-semibold rounded-full ${isAvailable ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-600'}`}>{isAvailable ? 'Available' : 'Offline'}</span>; };
//     const activeAppointments = appointments.filter(appt => (appt.status === 'pending' || appt.status === 'accepted')).sort((a, b) => (a.status === 'accepted' && b.status !== 'accepted') ? -1 : 1);
//     const pastAppointments = appointments.filter(appt => appt.status === 'completed');
//     return (<div>{notification.message && <div className={`p-4 mb-6 rounded-lg text-center font-semibold ${notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{notification.message}</div>}<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"><div className="lg:col-span-2"><h2 className="text-3xl font-bold text-slate-800 mb-6">Find a Doctor</h2><div className="grid grid-cols-1 md:grid-cols-2 gap-6">{doctors.map(doctor => { const isAvailable = doctor.status === 'available'; return (<div key={doctor.id} className={`bg-white p-6 rounded-xl shadow-lg flex flex-col transition-all ${isAvailable ? 'hover:shadow-xl hover:-translate-y-1' : 'opacity-60'}`}><div className="flex justify-between items-start mb-4"><div className="flex items-center"><img src={`https://placehold.co/80x80/e0e7ff/334155?text=${doctor.name.charAt(0)}`} alt={doctor.name} className="w-16 h-16 rounded-full mr-4"/><div><h3 className="text-xl font-semibold text-slate-900">Dr. {doctor.name}</h3><p className="text-slate-500 text-sm">General Physician</p></div></div><StatusBadge status={doctor.status} /></div><p className="text-slate-600 text-sm mb-4 flex-grow">Dr. {doctor.name} is currently {isAvailable ? 'available' : 'offline'}.</p><button onClick={() => handleBookAppointment(doctor.id)} disabled={!isAvailable} className="mt-auto w-full p-2 rounded-lg font-semibold transition disabled:bg-slate-300 disabled:cursor-not-allowed bg-blue-600 text-white hover:bg-blue-700">Book Appointment</button></div>); })}</div></div><div className="space-y-8"><div className="bg-white p-6 rounded-xl shadow-lg"><h2 className="text-2xl font-bold text-slate-800 mb-6">Active Appointments</h2><div className="space-y-4">{activeAppointments.length > 0 ? activeAppointments.map(appt => { const doctor = doctors.find(d => d.id === appt.doctorId); const isAccepted = appt.status === 'accepted'; const isCalling = appt.callStatus === 'calling'; return (<div key={appt.id} className={`p-4 rounded-lg border-l-4 transition-all ${isCalling ? 'border-blue-500 bg-blue-50 animate-pulse-bg' : isAccepted ? 'border-green-500 bg-green-50' : 'border-yellow-500 bg-yellow-50'}`}><div className="flex items-center justify-between"><p className="font-semibold text-slate-800">Dr. {doctor?.name || '...'}</p><span className={`flex items-center text-xs font-bold uppercase p-1 rounded ${isAccepted ? 'text-green-700 bg-green-200' : 'text-yellow-700 bg-yellow-200'}`}><span className="ml-1">{appt.status}</span></span></div>{appt.createdAt && <p className="text-sm text-slate-500 mt-1">Booked: {new Date(appt.createdAt.seconds * 1000).toLocaleDateString()}</p>}{isCalling && <p className="text-sm font-semibold text-blue-700 mt-2">Dr. {doctor?.name} is waiting for you...</p>}{isAccepted && <button onClick={() => onStartCall(appt)} className={`mt-3 w-full p-2 rounded-lg font-semibold transition text-sm ${isCalling ? 'bg-blue-500 text-white animate-pulse' : 'bg-green-500 text-white hover:bg-green-600'}`}>Join Video Call</button>}</div>)}) : <p className="text-slate-500 p-4 text-center bg-slate-100 rounded-lg">No active appointments.</p>}</div></div><div className="bg-white p-6 rounded-xl shadow-lg"><h2 className="text-2xl font-bold text-slate-800 mb-6">Consultation History</h2><div className="space-y-3">{pastAppointments.length > 0 ? pastAppointments.map(appt => { const doctor = doctors.find(d => d.id === appt.doctorId); return (<div key={appt.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200"><p className="font-semibold text-slate-700">Dr. {doctor?.name || '...'}</p>{appt.createdAt && <p className="text-xs text-slate-500">Consulted on: {new Date(appt.createdAt.seconds * 1000).toLocaleDateString()}</p>}</div>)}) : <p className="text-slate-500 p-4 text-center bg-slate-100 rounded-lg">No past consultations.</p>}</div></div></div></div></div>);
// }

// // --- DoctorDashboard with Bug Fix ---
// function DoctorDashboard({ user, userData, onStartCall }) {
//     const [appointments, setAppointments] = useState([]);
//     const [isAvailable, setIsAvailable] = useState(userData?.status === 'available');

//     useEffect(() => {
//         setIsAvailable(userData?.status === 'available');
//     }, [userData?.status]);

//     useEffect(() => {
//         const q = query(collection(db, "appointments"), where("doctorId", "==", user.uid));
//         const unsubscribe = onSnapshot(q, (snapshot) => {
//             const appts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//             setAppointments(appts.sort((a,b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0)));
//         });

//         const handleBeforeUnload = () => {
//             if (userData?.status === 'available') {
//                 updateDoc(doc(db, "users", user.uid), { status: 'offline' });
//             }
//         };
//         window.addEventListener('beforeunload', handleBeforeUnload);

//         return () => {
//             unsubscribe();
//             window.removeEventListener('beforeunload', handleBeforeUnload);
//         };
//     }, [user.uid, userData?.status]);

//     const handleToggleAvailability = async () => {
//         const newStatus = !isAvailable;
//         setIsAvailable(newStatus);
//         await updateDoc(doc(db, "users", user.uid), { status: newStatus ? 'available' : 'offline' });
//     };

//     const handleAcceptAppointment = async (appointmentId) => {
//         await updateDoc(doc(db, "appointments", appointmentId), { status: 'accepted' });
//     };

//     const handleStartCall = async (appointment) => {
//         await updateDoc(doc(db, "appointments", appointment.id), { callStatus: 'calling' });
//         onStartCall(appointment);
//     };
    
//     const pendingAppointments = appointments.filter(appt => appt.status === 'pending');
//     const upcomingAppointments = appointments.filter(appt => appt.status === 'accepted');

//     return (
//         <div className="space-y-12">
//             <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col sm:flex-row justify-between items-center">
//                 <div><h2 className="text-2xl font-bold text-slate-800">Your Status</h2><p className="text-slate-500">Set your status to "Available" to receive new patient requests.</p></div>
//                 <div className="flex items-center space-x-4 mt-4 sm:mt-0"><span className={`font-bold ${isAvailable ? 'text-green-600' : 'text-slate-500'}`}>{isAvailable ? 'Available' : 'Offline'}</span><button onClick={handleToggleAvailability} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isAvailable ? 'bg-green-500' : 'bg-slate-300'}`}><span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAvailable ? 'translate-x-6' : 'translate-x-1'}`}/></button></div>
//             </div>
//             <div><h2 className="text-3xl font-bold text-slate-800 mb-6">New Patient Requests</h2><div className="bg-white p-6 rounded-xl shadow-lg">{pendingAppointments.length > 0 ? <div className="space-y-4">{pendingAppointments.map(appt => (<div key={appt.id} className="flex flex-col sm:flex-row justify-between sm:items-center p-4 border rounded-lg bg-yellow-50 border-yellow-200 gap-4"><div className="flex items-center"><img src={`https://placehold.co/80x80/fffbeb/f59e0b?text=${appt.patientName.charAt(0)}`} alt={appt.patientName} className="w-12 h-12 rounded-full mr-4"/><div><p className="font-semibold text-slate-800">{appt.patientName}</p>{appt.createdAt && <p className="text-sm text-slate-500">Requested: {new Date(appt.createdAt.seconds * 1000).toLocaleString()}</p>}</div></div><button onClick={() => handleAcceptAppointment(appt.id)} className="px-6 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex-shrink-0">Accept</button></div>))}</div> : <p className="text-slate-500 p-4 text-center bg-slate-100 rounded-lg">You have no new patient requests.</p>}</div></div>
//             <div><h2 className="text-3xl font-bold text-slate-800 mb-6">Upcoming Appointments</h2><div className="bg-white p-6 rounded-xl shadow-lg">{upcomingAppointments.length > 0 ? <div className="space-y-4">{upcomingAppointments.map(appt => (<div key={appt.id} className="flex flex-col sm:flex-row justify-between sm:items-center p-4 border rounded-lg bg-slate-50 gap-4"><div className="flex items-center"><img src={`https://placehold.co/80x80/e0e7ff/334155?text=${appt.patientName.charAt(0)}`} alt={appt.patientName} className="w-12 h-12 rounded-full mr-4"/><div><p className="font-semibold text-slate-800">{appt.patientName}</p>{appt.createdAt && <p className="text-sm text-slate-500">Accepted: {new Date(appt.createdAt.seconds * 1000).toLocaleString()}</p>}</div></div><button onClick={() => handleStartCall(appt)} className="px-6 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex-shrink-0">Start Call</button></div>))}</div> : <p className="text-slate-500 p-4 text-center bg-slate-100 rounded-lg">You have no upcoming appointments.</p>}</div></div>
//         </div>
//     );
// }

// // --- VideoCall Component ---
// function VideoCall({ appointment, user, onEndCall }) {
//     const localVideoRef = useRef(null);
//     const remoteVideoRef = useRef(null);
//     const peerRef = useRef(null);
//     const [status, setStatus] = useState("Connecting...");
//     useEffect(() => { const peer = user.role === 'doctor' ? new window.Peer(appointment.id) : new window.Peer(); peerRef.current = peer; peer.on('open', () => { navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => { if (localVideoRef.current) localVideoRef.current.srcObject = stream; if (user.role === 'patient') { setStatus(`Calling doctor...`); const call = peer.call(appointment.id, stream); call.on('stream', remoteStream => { if (remoteVideoRef.current) { remoteVideoRef.current.srcObject = remoteStream; setStatus("Connected"); } }); call.on('close', onEndCall); } else { setStatus("Waiting for patient to join..."); peer.on('call', call => { call.answer(stream); call.on('stream', remoteStream => { if (remoteVideoRef.current) { remoteVideoRef.current.srcObject = remoteStream; setStatus("Connected"); } }); call.on('close', onEndCall); }); } }).catch(() => setStatus("Error: Camera/Mic access denied.")); }); peer.on('error', () => setStatus("Connection error.")); return () => peerRef.current?.destroy(); }, [appointment.id, user.role, onEndCall]);
//     const handleEndCall = () => { localVideoRef.current?.srcObject?.getTracks().forEach(track => track.stop()); onEndCall(); };
//     return (<div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-4 antialiased"><div className="absolute top-4 left-4 text-lg font-bold text-blue-400">MediConnect Call</div><p className="mb-4 text-lg text-gray-300">{status}</p><div className="relative w-full max-w-5xl aspect-video"><video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full bg-black rounded-lg object-cover shadow-2xl"></video><video ref={localVideoRef} autoPlay playsInline muted className="absolute w-32 md:w-48 bottom-4 right-4 bg-gray-800 border-2 border-gray-600 rounded-lg object-cover shadow-lg"></video></div><button onClick={handleEndCall} className="mt-6 px-8 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition text-lg flex items-center space-x-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3.59 1.322a1 1 0 0 0-1.414 0L.764 2.736a1 1 0 0 0 0 1.414l4.95 4.95a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414L3.59 1.322zM12.636 7.464a1 1 0 0 0-1.414 0l-1.414 1.414a1 1 0 0 0 0 1.414l4.95 4.95a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414l-4.95-4.95zM2.736 12.05a1 1 0 0 0-1.414 0L-.092 13.464a1 1 0 0 0 0 1.414l8.485 8.485a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414L2.736 12.05z"/></svg><span>End Call</span></button></div>);
// }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect, useRef } from 'react';
// import { initializeApp } from 'firebase/app';
// import { 
//     getAuth, 
//     createUserWithEmailAndPassword, 
//     signInWithEmailAndPassword, 
//     onAuthStateChanged, 
//     signOut 
// } from 'firebase/auth';
// import { 
//     getFirestore, 
//     collection, 
//     doc, 
//     setDoc, 
//     getDoc, 
//     query, 
//     where, 
//     getDocs,
//     updateDoc,
//     onSnapshot
// } from 'firebase/firestore';

// // --- YOUR FIREBASE CONFIGURATION ---
// const firebaseConfig = {
//   apiKey: "AIzaSyDg5-Df7zvJAAgRaemb7kKl1flo1CcfY48",
//   authDomain: "mediconnect-79877.firebaseapp.com",
//   projectId: "mediconnect-79877",
//   storageBucket: "mediconnect-79877.firebasestorage.app",
//   messagingSenderId: "630994353571",
//   appId: "1:630994353571:web:d3db6f78566bd81e2bae16",
//   measurementId: "G-F0QZD7YYL8"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// const DOCTOR_SECRET_CODE = "DOC123";

// // --- SVG Icons ---
// const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
// const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;
// const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;

// // --- Main App Component ---
// export default function App() {
//     const [user, setUser] = useState(null);
//     const [userData, setUserData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [currentCall, setCurrentCall] = useState(null);

//     useEffect(() => {
//         let userSnapshotUnsubscribe = null;
//         const authUnsubscribe = onAuthStateChanged(auth, (currentUser) => {
//             if (userSnapshotUnsubscribe) {
//                 userSnapshotUnsubscribe();
//             }
//             if (currentUser) {
//                 setUser(currentUser);
//                 const userDocRef = doc(db, "users", currentUser.uid);
//                 userSnapshotUnsubscribe = onSnapshot(userDocRef, (doc) => {
//                     if (doc.exists()) {
//                         setUserData({ id: doc.id, ...doc.data() });
//                     }
//                     setLoading(false);
//                 });
//             } else {
//                 setUser(null);
//                 setUserData(null);
//                 setLoading(false);
//             }
//         });

//         return () => {
//             authUnsubscribe();
//             if (userSnapshotUnsubscribe) {
//                 userSnapshotUnsubscribe();
//             }
//         };
//     }, []);

//     const handleSignOut = async () => {
//         if (userData?.role === 'doctor') {
//             await updateDoc(doc(db, "users", user.uid), { status: 'offline' });
//         }
//         await signOut(auth);
//         setCurrentCall(null);
//     };

//     const handleEndCall = async (appointmentId) => {
//         if (appointmentId) {
//             await updateDoc(doc(db, "appointments", appointmentId), { 
//                 status: 'completed',
//                 callStatus: null 
//             });
//         }
//         setCurrentCall(null);
//     };

//     if (loading) return <div className="flex items-center justify-center h-screen bg-slate-50"><div className="text-2xl font-semibold text-gray-700 animate-pulse">Loading Secure Health Portal...</div></div>;
//     if (currentCall) return <VideoCall appointment={currentCall} user={userData} onEndCall={() => handleEndCall(currentCall.id)} />;

//     return (
//         <div className="min-h-screen bg-slate-50 font-sans text-gray-800">
//             {user && <Header userData={userData} onSignOut={handleSignOut} />}
//             <main>
//                 {!user ? <AuthPage /> : (
//                     <div className="container mx-auto p-4 md:p-8">
//                         {userData ? (
//                             userData.role === 'doctor' 
//                                 ? <DoctorDashboard user={user} userData={userData} onStartCall={setCurrentCall} /> 
//                                 : <PatientDashboard user={user} userData={userData} onStartCall={setCurrentCall} />
//                         ) : (
//                              <div className="text-center text-slate-500">Loading user data...</div>
//                         )}
//                     </div>
//                 )}
//             </main>
//         </div>
//     );
// }

// // --- Auth & Header Components ---
// function Header({ userData, onSignOut }) {
//     return (
//         <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-slate-200">
//             <div className="container mx-auto p-4 flex justify-between items-center">
//                 <div className="text-2xl font-bold text-blue-600 tracking-tight">MediConnect</div>
//                 {userData && <div className="flex items-center space-x-4">
//                     <span className="hidden sm:block text-slate-600">
//                         Welcome, <span className="font-semibold text-slate-900">{userData.name || "User"}</span>
//                     </span>
//                     <button onClick={onSignOut} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors">Sign Out</button>
//                 </div>}
//             </div>
//         </header>
//     );
// }

// function AuthPage() {
//     const [isLoginView, setIsLoginView] = useState(true);
//     return (
//         <div className="min-h-screen flex items-center justify-center bg-white p-4">
//             <div className="grid md:grid-cols-2 max-w-5xl w-full rounded-2xl shadow-2xl overflow-hidden">
//                 <div className="p-8 md:p-12 order-last md:order-first">
//                     <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4 tracking-tight">MediConnect</h1>
//                     <h2 className="text-xl md:text-2xl font-medium text-slate-700 mb-8">{isLoginView ? "Sign in to your account" : "Create a new account"}</h2>
//                     {isLoginView ? <Login /> : <SignUp />}
//                     <p className="mt-6 text-center text-sm text-slate-600">
//                         {isLoginView ? "Don't have an account? " : "Already have an account? "}
//                         <button onClick={() => setIsLoginView(!isLoginView)} className="font-semibold text-blue-600 hover:text-blue-500">{isLoginView ? "Sign Up" : "Sign In"}</button>
//                     </p>
//                 </div>
//                 <div className="hidden md:flex items-center justify-center bg-blue-50 p-12">
//                      <lottie-player
//                         src="https://lottie.host/80b57499-1317-46c2-8064-3ab20b2f3a67/q609Gvj5pM.json"
//                         background="transparent"
//                         speed="1"
//                         style={{ width: '100%', maxWidth: '400px', height: 'auto' }}
//                         loop
//                         autoplay
//                     ></lottie-player>
//                 </div>
//             </div>
//         </div>
//     );
// }

// const InputField = ({ icon, ...props }) => (<div className="relative"><span className="absolute inset-y-0 left-0 flex items-center pl-3">{icon}</span><input {...props} className="w-full pl-10 p-3 bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" /></div>);

// function Login() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const handleLogin = async (e) => { e.preventDefault(); setError(''); try { await signInWithEmailAndPassword(auth, email, password); } catch (err) { setError(err.message.replace('Firebase: ', '')); }};
//     return (<form onSubmit={handleLogin} className="space-y-5">{error && <p className="text-red-500 bg-red-100 p-3 rounded-lg text-center text-sm">{error}</p>}<InputField type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com" required icon={<MailIcon />} /><InputField type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required icon={<LockIcon />} /><button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-transform transform hover:-translate-y-0.5 shadow-md hover:shadow-lg">Login</button></form>);
// }

// function SignUp() {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [secretCode, setSecretCode] = useState('');
//     const [isDoctor, setIsDoctor] = useState(false);
//     const [error, setError] = useState('');
//     const handleSignUp = async (e) => { e.preventDefault(); setError(''); if (isDoctor && secretCode !== DOCTOR_SECRET_CODE) { setError("Invalid secret code for doctor registration."); return; } try { const userCredential = await createUserWithEmailAndPassword(auth, email, password); const user = userCredential.user; const role = isDoctor ? 'doctor' : 'patient'; const userData = { uid: user.uid, name, email, role, ...(isDoctor && { status: 'offline' }) }; await setDoc(doc(db, "users", user.uid), userData); } catch (err) { setError(err.message.replace('Firebase: ', '')); }};
//     return (<form onSubmit={handleSignUp} className="space-y-4">{error && <p className="text-red-500 bg-red-100 p-3 rounded-lg text-center text-sm">{error}</p>}<InputField type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" required icon={<UserIcon />} /><InputField type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required icon={<MailIcon />} /><InputField type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password (min. 6 characters)" required icon={<LockIcon />} /><label htmlFor="isDoctor" className="flex items-center space-x-2 text-sm text-slate-700 cursor-pointer"><input type="checkbox" id="isDoctor" checked={isDoctor} onChange={() => setIsDoctor(!isDoctor)} className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"/><span>Are you a doctor?</span></label>{isDoctor && <InputField type="text" value={secretCode} onChange={e => setSecretCode(e.target.value)} placeholder="Secret Registration Code" required icon={<LockIcon />} />}<button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-transform transform hover:-translate-y-0.5 shadow-md hover:shadow-lg">Create Account</button></form>);
// }

// // --- PatientDashboard ---
// function PatientDashboard({ user, userData, onStartCall }) {
//     const [doctors, setDoctors] = useState([]);
//     const [appointments, setAppointments] = useState([]);
//     const [notification, setNotification] = useState({ type: '', message: '' });
//     useEffect(() => { const doctorsQuery = query(collection(db, "users"), where("role", "==", "doctor")); const unsubDoctors = onSnapshot(doctorsQuery, (snapshot) => { const doctorsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); doctorsList.sort((a, b) => { if (a.status === 'available' && b.status !== 'available') return -1; if (a.status !== 'available' && b.status === 'available') return 1; return 0; }); setDoctors(doctorsList); }); const appointmentsQuery = query(collection(db, "appointments"), where("patientId", "==", user.uid)); const unsubAppointments = onSnapshot(appointmentsQuery, (snapshot) => { const appts = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})); setAppointments(appts.sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0))); }); return () => { unsubDoctors(); unsubAppointments(); }; }, [user.uid]);
//     const showNotification = (type, message) => { setNotification({ type, message }); setTimeout(() => setNotification({ type: '', message: '' }), 4000); };
//     const handleBookAppointment = async (doctorId) => { const appointmentId = `appt_${user.uid.substring(0,5)}_${doctorId.substring(0,5)}_${Date.now()}`; try { await setDoc(doc(db, "appointments", appointmentId), { patientId: user.uid, patientName: userData.name || user.email, doctorId, status: 'pending', createdAt: new Date(), callStatus: null }); showNotification('success', "Appointment requested successfully!"); } catch (error) { showNotification('error', "Failed to book appointment."); }};
//     const StatusBadge = ({ status }) => { const isAvailable = status === 'available'; return <span className={`px-2 py-1 text-xs font-semibold rounded-full ${isAvailable ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-600'}`}>{isAvailable ? 'Available' : 'Offline'}</span>; };
//     const activeAppointments = appointments.filter(appt => (appt.status === 'pending' || appt.status === 'accepted')).sort((a, b) => (a.status === 'accepted' && b.status !== 'accepted') ? -1 : 1);
//     const pastAppointments = appointments.filter(appt => appt.status === 'completed');
//     return (
//     <div>{notification.message && <div className={`p-4 mb-6 rounded-lg text-center font-semibold ${notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{notification.message}</div>}<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"><div className="lg:col-span-2"><h2 className="text-3xl font-bold text-slate-800 mb-6">Find a Doctor</h2><div className="grid grid-cols-1 md:grid-cols-2 gap-6">{doctors.map(doctor => { const isAvailable = doctor.status === 'available'; return (<div key={doctor.id} className={`bg-white p-6 rounded-xl shadow-lg flex flex-col transition-all ${isAvailable ? 'hover:shadow-xl hover:-translate-y-1' : 'opacity-60'}`}><div className="flex justify-between items-start mb-4"><div className="flex items-center"><img src={`https://placehold.co/80x80/e0e7ff/334155?text=${doctor.name.charAt(0)}`} alt={doctor.name} className="w-16 h-16 rounded-full mr-4"/><div><h3 className="text-xl font-semibold text-slate-900">Dr. {doctor.name}</h3><p className="text-slate-500 text-sm">General Physician</p></div></div><StatusBadge status={doctor.status} /></div><p className="text-slate-600 text-sm mb-4 flex-grow">Dr. {doctor.name} is currently {isAvailable ? 'available' : 'offline'}.</p><button onClick={() => handleBookAppointment(doctor.id)} disabled={!isAvailable} className="mt-auto w-full p-2 rounded-lg font-semibold transition disabled:bg-slate-300 disabled:cursor-not-allowed bg-blue-600 text-white hover:bg-blue-700">Book Appointment</button></div>); })}</div></div><div className="space-y-8"><div className="bg-white p-6 rounded-xl shadow-lg"><h2 className="text-2xl font-bold text-slate-800 mb-6">Active Appointments</h2><div className="space-y-4">{activeAppointments.length > 0 ? activeAppointments.map(appt => { const doctor = doctors.find(d => d.id === appt.doctorId); const isAccepted = appt.status === 'accepted'; const isCalling = appt.callStatus === 'calling'; return (<div key={appt.id} className={`p-4 rounded-lg border-l-4 transition-all ${isCalling ? 'border-blue-500 bg-blue-50 animate-pulse-bg' : isAccepted ? 'border-green-500 bg-green-50' : 'border-yellow-500 bg-yellow-50'}`}><div className="flex items-center justify-between"><p className="font-semibold text-slate-800">Dr. {doctor?.name || '...'}</p><span className={`flex items-center text-xs font-bold uppercase p-1 rounded ${isAccepted ? 'text-green-700 bg-green-200' : 'text-yellow-700 bg-yellow-200'}`}><span className="ml-1">{appt.status}</span></span></div>{appt.createdAt && <p className="text-sm text-slate-500 mt-1">Booked: {new Date(appt.createdAt.seconds * 1000).toLocaleDateString()}</p>}{isCalling && <p className="text-sm font-semibold text-blue-700 mt-2">Dr. {doctor?.name} is waiting for you...</p>}{isAccepted && <button onClick={() => onStartCall(appt)} className={`mt-3 w-full p-2 rounded-lg font-semibold transition text-sm ${isCalling ? 'bg-blue-500 text-white animate-pulse' : 'bg-green-500 text-white hover:bg-green-600'}`}>Join Video Call</button>}</div>)}) : <p className="text-slate-500 p-4 text-center bg-slate-100 rounded-lg">No active appointments.</p>}</div></div><div className="bg-white p-6 rounded-xl shadow-lg"><h2 className="text-2xl font-bold text-slate-800 mb-6">Consultation History</h2><div className="space-y-3">{pastAppointments.length > 0 ? pastAppointments.map(appt => { const doctor = doctors.find(d => d.id === appt.doctorId); return (<div key={appt.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200"><p className="font-semibold text-slate-700">Dr. {doctor?.name || '...'}</p>{appt.createdAt && <p className="text-xs text-slate-500">Consulted on: {new Date(appt.createdAt.seconds * 1000).toLocaleDateString()}</p>}</div>)}) : <p className="text-slate-500 p-4 text-center bg-slate-100 rounded-lg">No past consultations.</p>}</div></div></div></div></div>);
// }

// // --- DoctorDashboard ---
// function DoctorDashboard({ user, userData, onStartCall }) {
//     const [appointments, setAppointments] = useState([]);
//     const [isAvailable, setIsAvailable] = useState(userData?.status === 'available');

//     useEffect(() => {
//         setIsAvailable(userData?.status === 'available');
//     }, [userData?.status]);

//     useEffect(() => {
//         const q = query(collection(db, "appointments"), where("doctorId", "==", user.uid));
//         const unsubscribe = onSnapshot(q, (snapshot) => { const appts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); setAppointments(appts.sort((a,b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0))); });
//         const handleBeforeUnload = () => { if (userData?.status === 'available') { updateDoc(doc(db, "users", user.uid), { status: 'offline' }); } };
//         window.addEventListener('beforeunload', handleBeforeUnload);
//         return () => { unsubscribe(); window.removeEventListener('beforeunload', handleBeforeUnload); if(userData?.status === 'available') { updateDoc(doc(db, "users", user.uid), { status: 'offline' }); } };
//     }, [user.uid, userData?.status]);

//     const handleToggleAvailability = async () => { const newStatus = !isAvailable; setIsAvailable(newStatus); await updateDoc(doc(db, "users", user.uid), { status: newStatus ? 'available' : 'offline' }); };
//     const handleAcceptAppointment = async (appointmentId) => { await updateDoc(doc(db, "appointments", appointmentId), { status: 'accepted' }); };
//     const handleStartCall = async (appointment) => { await updateDoc(doc(db, "appointments", appointment.id), { callStatus: 'calling' }); onStartCall(appointment); };
    
//     const pendingAppointments = appointments.filter(appt => appt.status === 'pending');
//     const upcomingAppointments = appointments.filter(appt => appt.status === 'accepted');

//     return (
//         <div className="space-y-12">
//             <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col sm:flex-row justify-between items-center">
//                 <div><h2 className="text-2xl font-bold text-slate-800">Your Status</h2><p className="text-slate-500">Set your status to "Available" to receive new patient requests.</p></div>
//                 <div className="flex items-center space-x-4 mt-4 sm:mt-0"><span className={`font-bold ${isAvailable ? 'text-green-600' : 'text-slate-500'}`}>{isAvailable ? 'Available' : 'Offline'}</span><button onClick={handleToggleAvailability} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isAvailable ? 'bg-green-500' : 'bg-slate-300'}`}><span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAvailable ? 'translate-x-6' : 'translate-x-1'}`}/></button></div>
//             </div>
//             <div><h2 className="text-3xl font-bold text-slate-800 mb-6">New Patient Requests</h2><div className="bg-white p-6 rounded-xl shadow-lg">{pendingAppointments.length > 0 ? <div className="space-y-4">{pendingAppointments.map(appt => (<div key={appt.id} className="flex flex-col sm:flex-row justify-between sm:items-center p-4 border rounded-lg bg-yellow-50 border-yellow-200 gap-4"><div className="flex items-center"><img src={`https://placehold.co/80x80/fffbeb/f59e0b?text=${appt.patientName.charAt(0)}`} alt={appt.patientName} className="w-12 h-12 rounded-full mr-4"/><div><p className="font-semibold text-slate-800">{appt.patientName}</p>{appt.createdAt && <p className="text-sm text-slate-500">Requested: {new Date(appt.createdAt.seconds * 1000).toLocaleString()}</p>}</div></div><button onClick={() => handleAcceptAppointment(appt.id)} className="px-6 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex-shrink-0">Accept</button></div>))}</div> : <p className="text-slate-500 p-4 text-center bg-slate-100 rounded-lg">You have no new patient requests.</p>}</div></div>
//             <div><h2 className="text-3xl font-bold text-slate-800 mb-6">Upcoming Appointments</h2><div className="bg-white p-6 rounded-xl shadow-lg">{upcomingAppointments.length > 0 ? <div className="space-y-4">{upcomingAppointments.map(appt => (<div key={appt.id} className="flex flex-col sm:flex-row justify-between sm:items-center p-4 border rounded-lg bg-slate-50 gap-4"><div className="flex items-center"><img src={`https://placehold.co/80x80/e0e7ff/334155?text=${appt.patientName.charAt(0)}`} alt={appt.patientName} className="w-12 h-12 rounded-full mr-4"/><div><p className="font-semibold text-slate-800">{appt.patientName}</p>{appt.createdAt && <p className="text-sm text-slate-500">Accepted: {new Date(appt.createdAt.seconds * 1000).toLocaleString()}</p>}</div></div><button onClick={() => handleStartCall(appt)} className="px-6 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex-shrink-0">Start Call</button></div>))}</div> : <p className="text-slate-500 p-4 text-center bg-slate-100 rounded-lg">You have no upcoming appointments.</p>}</div></div>
//         </div>
//     );
// }

// // --- VideoCall Component ---
// function VideoCall({ appointment, user, onEndCall }) {
//     const localVideoRef = useRef(null);
//     const remoteVideoRef = useRef(null);
//     const peerRef = useRef(null);
//     const [status, setStatus] = useState("Initializing...");
//     useEffect(() => { const peerConfig = { config: { iceServers: [ { urls: 'stun:stun.l.google.com:19302' }, { urls: 'stun:stun1.l.google.com:19302' }, ], }, }; const peer = user.role === 'doctor' ? new window.Peer(appointment.id, peerConfig) : new window.Peer(peerConfig); peerRef.current = peer; peer.on('open', () => { setStatus("Requesting camera access..."); navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => { if (localVideoRef.current) localVideoRef.current.srcObject = stream; if (user.role === 'patient') { setStatus(`Calling doctor...`); const call = peer.call(appointment.id, stream); call.on('stream', remoteStream => { if (remoteVideoRef.current) { remoteVideoRef.current.srcObject = remoteStream; setStatus("Connected"); } }); call.on('close', onEndCall); } else { setStatus("Waiting for patient to join..."); peer.on('call', call => { call.answer(stream); call.on('stream', remoteStream => { if (remoteVideoRef.current) { remoteVideoRef.current.srcObject = remoteStream; setStatus("Connected"); } }); call.on('close', onEndCall); }); } }).catch(() => setStatus("Error: Camera/Mic access denied.")); }); peer.on('error', (err) => { console.error("PeerJS Error:", err); setStatus("Connection error. Please try again."); }); return () => { peerRef.current?.destroy(); }; }, [appointment.id, user.role, onEndCall]);
//     const handleEndCall = () => { localVideoRef.current?.srcObject?.getTracks().forEach(track => track.stop()); onEndCall(); };
//     return (<div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-4 antialiased"><div className="absolute top-4 left-4 text-lg font-bold text-blue-400">MediConnect Call</div><p className="mb-4 text-lg text-gray-300">{status}</p><div className="relative w-full max-w-5xl aspect-video"><video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full bg-black rounded-lg object-cover shadow-2xl"></video><video ref={localVideoRef} autoPlay playsInline muted className="absolute w-32 md:w-48 bottom-4 right-4 bg-gray-800 border-2 border-gray-600 rounded-lg object-cover shadow-lg"></video></div><button onClick={handleEndCall} className="mt-6 px-8 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition text-lg flex items-center space-x-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3.59 1.322a1 1 0 0 0-1.414 0L.764 2.736a1 1 0 0 0 0 1.414l4.95 4.95a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414L3.59 1.322zM12.636 7.464a1 1 0 0 0-1.414 0l-1.414 1.414a1 1 0 0 0 0 1.414l4.95 4.95a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414l-4.95-4.95zM2.736 12.05a1 1 0 0 0-1.414 0L-.092 13.464a1 1 0 0 0 0 1.414l8.485 8.485a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414L2.736 12.05z"/></svg><span>End Call</span></button></div>);
// }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////


import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut 
} from 'firebase/auth';
import { 
    getFirestore, 
    collection, 
    doc, 
    setDoc, 
    getDoc, 
    query, 
    where, 
    getDocs,
    updateDoc,
    onSnapshot
} from 'firebase/firestore';

// --- YOUR FIREBASE CONFIGURATION ---
const firebaseConfig = {
  apiKey: "AIzaSyDg5-Df7zvJAAgRaemb7kKl1flo1CcfY48",
  authDomain: "mediconnect-79877.firebaseapp.com",
  projectId: "mediconnect-79877",
  storageBucket: "mediconnect-79877.firebasestorage.app",
  messagingSenderId: "630994353571",
  appId: "1:630994353571:web:d3db6f78566bd81e2bae16",
  measurementId: "G-F0QZD7YYL8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const DOCTOR_SECRET_CODE = "DOC123";

// --- SVG Icons ---
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;

// --- Main App Component ---
export default function App() {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentCall, setCurrentCall] = useState(null);

    useEffect(() => {
        let userSnapshotUnsubscribe = null;
        const authUnsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (userSnapshotUnsubscribe) {
                userSnapshotUnsubscribe();
            }
            if (currentUser) {
                setUser(currentUser);
                const userDocRef = doc(db, "users", currentUser.uid);
                userSnapshotUnsubscribe = onSnapshot(userDocRef, (doc) => {
                    if (doc.exists()) {
                        setUserData({ id: doc.id, ...doc.data() });
                    }
                    setLoading(false);
                });
            } else {
                setUser(null);
                setUserData(null);
                setLoading(false);
            }
        });

        return () => {
            authUnsubscribe();
            if (userSnapshotUnsubscribe) {
                userSnapshotUnsubscribe();
            }
        };
    }, []);

    const handleSignOut = async () => {
        if (userData?.role === 'doctor') {
            await updateDoc(doc(db, "users", user.uid), { status: 'offline' });
        }
        await signOut(auth);
        setCurrentCall(null);
    };

    const handleEndCall = async (appointmentId) => {
        if (appointmentId) {
            await updateDoc(doc(db, "appointments", appointmentId), { 
                status: 'completed',
                callStatus: null 
            });
        }
        setCurrentCall(null);
    };

    if (loading) return <div className="flex items-center justify-center h-screen bg-slate-50"><div className="text-2xl font-semibold text-gray-700 animate-pulse">Loading Secure Health Portal...</div></div>;
    if (currentCall) return <VideoCall appointment={currentCall} user={userData} onEndCall={() => handleEndCall(currentCall.id)} />;

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-gray-800">
            {user && <Header userData={userData} onSignOut={handleSignOut} />}
            <main>
                {!user ? <AuthPage /> : (
                    <div className="container mx-auto p-4 md:p-8">
                        {userData ? (
                            userData.role === 'doctor' 
                                ? <DoctorDashboard user={user} userData={userData} onStartCall={setCurrentCall} /> 
                                : <PatientDashboard user={user} userData={userData} onStartCall={setCurrentCall} />
                        ) : (
                             <div className="text-center text-slate-500">Loading user data...</div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}

// --- Auth & Header Components ---
function Header({ userData, onSignOut }) {
    return (
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-slate-200">
            <div className="container mx-auto p-4 flex justify-between items-center">
                <div className="text-2xl font-bold text-blue-600 tracking-tight">MediConnect</div>
                {userData && <div className="flex items-center space-x-4">
                    <span className="hidden sm:block text-slate-600">
                        Welcome, <span className="font-semibold text-slate-900">{userData.name || "User"}</span>
                    </span>
                    <button onClick={onSignOut} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors">Sign Out</button>
                </div>}
            </div>
        </header>
    );
}

function AuthPage() {
    const [isLoginView, setIsLoginView] = useState(true);
    return (
        <div className="min-h-screen flex items-center justify-center bg-white p-4">
            <div className="grid md:grid-cols-2 max-w-5xl w-full rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-8 md:p-12 order-last md:order-first"><h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4 tracking-tight">MediConnect</h1><h2 className="text-xl md:text-2xl font-medium text-slate-700 mb-8">{isLoginView ? "Sign in to your account" : "Create a new account"}</h2>{isLoginView ? <Login /> : <SignUp />}<p className="mt-6 text-center text-sm text-slate-600">{isLoginView ? "Don't have an account? " : "Already have an account? "}<button onClick={() => setIsLoginView(!isLoginView)} className="font-semibold text-blue-600 hover:text-blue-500">{isLoginView ? "Sign Up" : "Sign In"}</button></p></div>
                <div className="hidden md:flex items-center justify-center bg-blue-50 p-12">
                     <lottie-player
                        src="https://lottie.host/80b57499-1317-46c2-8064-3ab20b2f3a67/q609Gvj5pM.json"
                        background="transparent"
                        speed="1"
                        style={{ width: '100%', maxWidth: '400px', height: 'auto' }}
                        loop
                        autoplay
                    ></lottie-player>
                </div>
            </div>
        </div>
    );
}

const InputField = ({ icon, ...props }) => (<div className="relative"><span className="absolute inset-y-0 left-0 flex items-center pl-3">{icon}</span><input {...props} className="w-full pl-10 p-3 bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" /></div>);

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handleLogin = async (e) => { e.preventDefault(); setError(''); try { await signInWithEmailAndPassword(auth, email, password); } catch (err) { setError(err.message.replace('Firebase: ', '')); }};
    return (<form onSubmit={handleLogin} className="space-y-5">{error && <p className="text-red-500 bg-red-100 p-3 rounded-lg text-center text-sm">{error}</p>}<InputField type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com" required icon={<MailIcon />} /><InputField type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required icon={<LockIcon />} /><button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-transform transform hover:-translate-y-0.5 shadow-md hover:shadow-lg">Login</button></form>);
}

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secretCode, setSecretCode] = useState('');
    const [isDoctor, setIsDoctor] = useState(false);
    const [error, setError] = useState('');
    const handleSignUp = async (e) => { e.preventDefault(); setError(''); if (isDoctor && secretCode !== DOCTOR_SECRET_CODE) { setError("Invalid secret code for doctor registration."); return; } try { const userCredential = await createUserWithEmailAndPassword(auth, email, password); const user = userCredential.user; const role = isDoctor ? 'doctor' : 'patient'; const userData = { uid: user.uid, name, email, role, ...(isDoctor && { status: 'offline' }) }; await setDoc(doc(db, "users", user.uid), userData); } catch (err) { setError(err.message.replace('Firebase: ', '')); }};
    return (<form onSubmit={handleSignUp} className="space-y-4">{error && <p className="text-red-500 bg-red-100 p-3 rounded-lg text-center text-sm">{error}</p>}<InputField type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" required icon={<UserIcon />} /><InputField type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required icon={<MailIcon />} /><InputField type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password (min. 6 characters)" required icon={<LockIcon />} /><label htmlFor="isDoctor" className="flex items-center space-x-2 text-sm text-slate-700 cursor-pointer"><input type="checkbox" id="isDoctor" checked={isDoctor} onChange={() => setIsDoctor(!isDoctor)} className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"/><span>Are you a doctor?</span></label>{isDoctor && <InputField type="text" value={secretCode} onChange={e => setSecretCode(e.target.value)} placeholder="Secret Registration Code" required icon={<LockIcon />} />}<button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-transform transform hover:-translate-y-0.5 shadow-md hover:shadow-lg">Create Account</button></form>);
}

// --- PatientDashboard ---
function PatientDashboard({ user, userData, onStartCall }) {
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [notification, setNotification] = useState({ type: '', message: '' });
    useEffect(() => { const doctorsQuery = query(collection(db, "users"), where("role", "==", "doctor")); const unsubDoctors = onSnapshot(doctorsQuery, (snapshot) => { const doctorsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); doctorsList.sort((a, b) => { if (a.status === 'available' && b.status !== 'available') return -1; if (a.status !== 'available' && b.status === 'available') return 1; return 0; }); setDoctors(doctorsList); }); const appointmentsQuery = query(collection(db, "appointments"), where("patientId", "==", user.uid)); const unsubAppointments = onSnapshot(appointmentsQuery, (snapshot) => { const appts = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})); setAppointments(appts.sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0))); }); return () => { unsubDoctors(); unsubAppointments(); }; }, [user.uid]);
    const showNotification = (type, message) => { setNotification({ type, message }); setTimeout(() => setNotification({ type: '', message: '' }), 4000); };
    const handleBookAppointment = async (doctorId) => { const appointmentId = `appt_${user.uid.substring(0,5)}_${doctorId.substring(0,5)}_${Date.now()}`; try { await setDoc(doc(db, "appointments", appointmentId), { patientId: user.uid, patientName: userData.name || user.email, doctorId, status: 'pending', createdAt: new Date(), callStatus: null }); showNotification('success', "Appointment requested successfully!"); } catch (error) { showNotification('error', "Failed to book appointment."); }};
    const StatusBadge = ({ status }) => { const isAvailable = status === 'available'; return <span className={`px-2 py-1 text-xs font-semibold rounded-full ${isAvailable ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-600'}`}>{isAvailable ? 'Available' : 'Offline'}</span>; };
    const activeAppointments = appointments.filter(appt => (appt.status === 'pending' || appt.status === 'accepted')).sort((a, b) => (a.status === 'accepted' && b.status !== 'accepted') ? -1 : 1);
    const pastAppointments = appointments.filter(appt => appt.status === 'completed');
    return (<div>{notification.message && <div className={`p-4 mb-6 rounded-lg text-center font-semibold ${notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{notification.message}</div>}<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"><div className="lg:col-span-2"><h2 className="text-3xl font-bold text-slate-800 mb-6">Find a Doctor</h2><div className="grid grid-cols-1 md:grid-cols-2 gap-6">{doctors.map(doctor => { const isAvailable = doctor.status === 'available'; return (<div key={doctor.id} className={`bg-white p-6 rounded-xl shadow-lg flex flex-col transition-all ${isAvailable ? 'hover:shadow-xl hover:-translate-y-1' : 'opacity-60'}`}><div className="flex justify-between items-start mb-4"><div className="flex items-center"><img src={`https://placehold.co/80x80/e0e7ff/334155?text=${(doctor.name || 'D').charAt(0)}`} alt={doctor.name} className="w-16 h-16 rounded-full mr-4"/><div><h3 className="text-xl font-semibold text-slate-900">Dr. {doctor.name}</h3><p className="text-slate-500 text-sm">General Physician</p></div></div><StatusBadge status={doctor.status} /></div><p className="text-slate-600 text-sm mb-4 flex-grow">Dr. {doctor.name} is currently {isAvailable ? 'available' : 'offline'}.</p><button onClick={() => handleBookAppointment(doctor.id)} disabled={!isAvailable} className="mt-auto w-full p-2 rounded-lg font-semibold transition disabled:bg-slate-300 disabled:cursor-not-allowed bg-blue-600 text-white hover:bg-blue-700">Book Appointment</button></div>); })}</div></div><div className="space-y-8"><div className="bg-white p-6 rounded-xl shadow-lg"><h2 className="text-2xl font-bold text-slate-800 mb-6">Active Appointments</h2><div className="space-y-4">{activeAppointments.length > 0 ? activeAppointments.map(appt => { const doctor = doctors.find(d => d.id === appt.doctorId); const isAccepted = appt.status === 'accepted'; const isCalling = appt.callStatus === 'calling'; return (<div key={appt.id} className={`p-4 rounded-lg border-l-4 transition-all ${isCalling ? 'border-blue-500 bg-blue-50 animate-pulse-bg' : isAccepted ? 'border-green-500 bg-green-50' : 'border-yellow-500 bg-yellow-50'}`}><div className="flex items-center justify-between"><p className="font-semibold text-slate-800">Dr. {doctor?.name || '...'}</p><span className={`flex items-center text-xs font-bold uppercase p-1 rounded ${isAccepted ? 'text-green-700 bg-green-200' : 'text-yellow-700 bg-yellow-200'}`}><span className="ml-1">{appt.status}</span></span></div>{appt.createdAt && <p className="text-sm text-slate-500 mt-1">Booked: {new Date(appt.createdAt.seconds * 1000).toLocaleDateString()}</p>}{isCalling && <p className="text-sm font-semibold text-blue-700 mt-2">Dr. {doctor?.name} is waiting for you...</p>}{isAccepted && <button onClick={() => onStartCall(appt)} className={`mt-3 w-full p-2 rounded-lg font-semibold transition text-sm ${isCalling ? 'bg-blue-500 text-white animate-pulse' : 'bg-green-500 text-white hover:bg-green-600'}`}>Join Video Call</button>}</div>)}) : <p className="text-slate-500 p-4 text-center bg-slate-100 rounded-lg">No active appointments.</p>}</div></div><div className="bg-white p-6 rounded-xl shadow-lg"><h2 className="text-2xl font-bold text-slate-800 mb-6">Consultation History</h2><div className="space-y-3">{pastAppointments.length > 0 ? pastAppointments.map(appt => { const doctor = doctors.find(d => d.id === appt.doctorId); return (<div key={appt.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200"><p className="font-semibold text-slate-700">Dr. {doctor?.name || '...'}</p>{appt.createdAt && <p className="text-xs text-slate-500">Consulted on: {new Date(appt.createdAt.seconds * 1000).toLocaleDateString()}</p>}</div>)}) : <p className="text-slate-500 p-4 text-center bg-slate-100 rounded-lg">No past consultations.</p>}</div></div></div></div></div>);
}

// --- DoctorDashboard ---
function DoctorDashboard({ user, userData, onStartCall }) {
    const [appointments, setAppointments] = useState([]);
    const [isAvailable, setIsAvailable] = useState(userData?.status === 'available');

    useEffect(() => {
        setIsAvailable(userData?.status === 'available');
    }, [userData?.status]);

    useEffect(() => {
        const q = query(collection(db, "appointments"), where("doctorId", "==", user.uid));
        const unsubscribe = onSnapshot(q, (snapshot) => { const appts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); setAppointments(appts.sort((a,b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0))); });
        const handleBeforeUnload = () => { if (userData?.status === 'available') { updateDoc(doc(db, "users", user.uid), { status: 'offline' }); } };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => { unsubscribe(); window.removeEventListener('beforeunload', handleBeforeUnload); if(userData?.status === 'available') { updateDoc(doc(db, "users", user.uid), { status: 'offline' }); } };
    }, [user.uid, userData?.status]);

    const handleToggleAvailability = async () => { const newStatus = !isAvailable; setIsAvailable(newStatus); await updateDoc(doc(db, "users", user.uid), { status: newStatus ? 'available' : 'offline' }); };
    const handleAcceptAppointment = async (appointmentId) => { await updateDoc(doc(db, "appointments", appointmentId), { status: 'accepted' }); };
    const handleStartCall = async (appointment) => { await updateDoc(doc(db, "appointments", appointment.id), { callStatus: 'calling' }); onStartCall(appointment); };
    
    const pendingAppointments = appointments.filter(appt => appt.status === 'pending');
    const upcomingAppointments = appointments.filter(appt => appt.status === 'accepted');

    return (
        <div className="space-y-12">
            <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col sm:flex-row justify-between items-center">
                <div><h2 className="text-2xl font-bold text-slate-800">Your Status</h2><p className="text-slate-500">Set your status to "Available" to receive new patient requests.</p></div>
                <div className="flex items-center space-x-4 mt-4 sm:mt-0"><span className={`font-bold ${isAvailable ? 'text-green-600' : 'text-slate-500'}`}>{isAvailable ? 'Available' : 'Offline'}</span><button onClick={handleToggleAvailability} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isAvailable ? 'bg-green-500' : 'bg-slate-300'}`}><span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAvailable ? 'translate-x-6' : 'translate-x-1'}`}/></button></div>
            </div>
            <div><h2 className="text-3xl font-bold text-slate-800 mb-6">New Patient Requests</h2><div className="bg-white p-6 rounded-xl shadow-lg">{pendingAppointments.length > 0 ? <div className="space-y-4">{pendingAppointments.map(appt => (<div key={appt.id} className="flex flex-col sm:flex-row justify-between sm:items-center p-4 border rounded-lg bg-yellow-50 border-yellow-200 gap-4"><div className="flex items-center"><img src={`https://placehold.co/80x80/fffbeb/f59e0b?text=${(appt.patientName || 'P').charAt(0)}`} alt={appt.patientName} className="w-12 h-12 rounded-full mr-4"/><div><p className="font-semibold text-slate-800">{appt.patientName}</p>{appt.createdAt && <p className="text-sm text-slate-500">Requested: {new Date(appt.createdAt.seconds * 1000).toLocaleString()}</p>}</div></div><button onClick={() => handleAcceptAppointment(appt.id)} className="px-6 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex-shrink-0">Accept</button></div>))}</div> : <p className="text-slate-500 p-4 text-center bg-slate-100 rounded-lg">You have no new patient requests.</p>}</div></div>
            <div><h2 className="text-3xl font-bold text-slate-800 mb-6">Upcoming Appointments</h2><div className="bg-white p-6 rounded-xl shadow-lg">{upcomingAppointments.length > 0 ? <div className="space-y-4">{upcomingAppointments.map(appt => (<div key={appt.id} className="flex flex-col sm:flex-row justify-between sm:items-center p-4 border rounded-lg bg-slate-50 gap-4"><div className="flex items-center"><img src={`https://placehold.co/80x80/e0e7ff/334155?text=${(appt.patientName || 'P').charAt(0)}`} alt={appt.patientName} className="w-12 h-12 rounded-full mr-4"/><div><p className="font-semibold text-slate-800">{appt.patientName}</p>{appt.createdAt && <p className="text-sm text-slate-500">Accepted: {new Date(appt.createdAt.seconds * 1000).toLocaleString()}</p>}</div></div><button onClick={() => handleStartCall(appt)} className="px-6 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex-shrink-0">Start Call</button></div>))}</div> : <p className="text-slate-500 p-4 text-center bg-slate-100 rounded-lg">You have no upcoming appointments.</p>}</div></div>
        </div>
    );
}

// --- VideoCall Component ---
function VideoCall({ appointment, user, onEndCall }) {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const peerRef = useRef(null);
    const [status, setStatus] = useState("Initializing...");
    useEffect(() => { const peerConfig = { config: { iceServers: [ { urls: 'stun:stun.l.google.com:19302' }, { urls: 'stun:stun1.l.google.com:19302' }, ], }, }; const peer = user.role === 'doctor' ? new window.Peer(appointment.id, peerConfig) : new window.Peer(peerConfig); peerRef.current = peer; peer.on('open', () => { setStatus("Requesting camera access..."); navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => { if (localVideoRef.current) localVideoRef.current.srcObject = stream; if (user.role === 'patient') { setStatus(`Calling doctor...`); const call = peer.call(appointment.id, stream); call.on('stream', remoteStream => { if (remoteVideoRef.current) { remoteVideoRef.current.srcObject = remoteStream; setStatus("Connected"); } }); call.on('close', onEndCall); } else { setStatus("Waiting for patient to join..."); peer.on('call', call => { call.answer(stream); call.on('stream', remoteStream => { if (remoteVideoRef.current) { remoteVideoRef.current.srcObject = remoteStream; setStatus("Connected"); } }); call.on('close', onEndCall); }); } }).catch(() => setStatus("Error: Camera/Mic access denied.")); }); peer.on('error', (err) => { console.error("PeerJS Error:", err); setStatus("Connection error. Please try again."); }); return () => { peerRef.current?.destroy(); }; }, [appointment.id, user.role, onEndCall]);
    const handleEndCall = () => { localVideoRef.current?.srcObject?.getTracks().forEach(track => track.stop()); onEndCall(); };
    return (<div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-4 antialiased"><div className="absolute top-4 left-4 text-lg font-bold text-blue-400">MediConnect Call</div><p className="mb-4 text-lg text-gray-300">{status}</p><div className="relative w-full max-w-5xl aspect-video"><video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full bg-black rounded-lg object-cover shadow-2xl"></video><video ref={localVideoRef} autoPlay playsInline muted className="absolute w-32 md:w-48 bottom-4 right-4 bg-gray-800 border-2 border-gray-600 rounded-lg object-cover shadow-lg"></video></div><button onClick={handleEndCall} className="mt-6 px-8 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition text-lg flex items-center space-x-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="currentColor"><path d="M3.59 1.322a1 1 0 0 0-1.414 0L.764 2.736a1 1 0 0 0 0 1.414l4.95 4.95a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414L3.59 1.322zM12.636 7.464a1 1 0 0 0-1.414 0l-1.414 1.414a1 1 0 0 0 0 1.414l4.95 4.95a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414l-4.95-4.95zM2.736 12.05a1 1 0 0 0-1.414 0L-.092 13.464a1 1 0 0 0 0 1.414l8.485 8.485a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414L2.736 12.05z"/></svg><span>End Call</span></button></div>);
}

