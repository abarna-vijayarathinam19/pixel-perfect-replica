import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "ta" | "si";
export const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "English" },
  { code: "ta", label: "தமிழ்" },
  { code: "si", label: "සිංහල" },
];

const en = {
  nav: { home: "Home", about: "About", product: "Product", book: "Book a Demo", contact: "Contact", cta: "Book Appointment" },
  hero: {
    badge: "AI meeting intelligence for healthcare",
    title: "Every doctor consultation, captured & understood.",
    sub: "Avenset runs secure video consultations and turns every conversation into transcripts, summaries, decisions and action items — automatically.",
    primary: "Book an Appointment",
    secondary: "Explore Product",
  },
  filter: {
    doctor: "Doctor name", doctorPh: "Search doctor name",
    spec: "Specialization", specPh: "Select specialization",
    hospital: "Hospital", hospitalPh: "Select hospital",
    date: "Date", search: "Find Doctor",
  },
  services: {
    eyebrow: "Services", title: "Four engines behind every consultation",
    items: [
      { t: "Online Video Consultations", d: "HD, encrypted doctor-patient calls in the browser — no installs." },
      { t: "Live Transcription", d: "Speech-to-text pipelines that capture every word in real time." },
      { t: "AI Summaries & Decisions", d: "Clinical summaries, decisions and follow-ups drafted in seconds." },
      { t: "Action Items & Review", d: "Assign tasks, review records and keep a clean audit trail." },
    ],
  },
  about: {
    eyebrow: "About Avenset", title: "Built for doctors who'd rather listen than type.",
    body: "Avenset is an enterprise conversation and meeting intelligence platform focused on healthcare communication. We record, structure and protect the conversations that matter most — so care teams can focus on patients.",
    points: ["Secure record management", "Multilingual speech pipeline", "Review & approval workflows"],
    btn: "Learn more about us",
  },
  testi: {
    eyebrow: "Testimonials", title: "Trusted by care teams",
    items: [
      { q: "Consultation notes used to take me an hour a day. Now Avenset drafts them before I close the call.", n: "Dr. Nirmala Perera", r: "General Physician" },
      { q: "The Tamil transcription is remarkably accurate.", n: "Dr. Arun Kumar", r: "Cardiologist" },
      { q: "Action items are finally tracked. Nothing falls through the cracks between visits.", n: "Shanika Fernando", r: "Clinic Manager" },
      { q: "Patients love booking online and joining from their phone.", n: "Dr. Ravi Shankar", r: "Pediatrician" },
      { q: "The review workflow gives our compliance team the audit trail they always asked for.", n: "Kasun Jayasuriya", r: "Hospital IT Lead" },
      { q: "Clean, fast and simple.", n: "Dr. Meena Rajan", r: "Dermatologist" },
    ],
  },
  pricing: {
    eyebrow: "Pricing", title: "Plans that scale with your practice", month: "/month", popular: "Most popular", choose: "Get started",
    plans: [
      { n: "Starter", p: "$29", d: "For independent doctors", f: ["50 consultations / month", "Live transcription", "AI summaries", "Email support"] },
      { n: "Clinic", p: "$99", d: "For growing clinics", f: ["Unlimited consultations", "Decisions & action items", "Multilingual (EN, TA, SI)", "Review workflows", "Priority support"] },
      { n: "Enterprise", p: "Custom", d: "For hospitals & networks", f: ["Dedicated infrastructure", "SSO & audit logs", "Custom integrations", "24/7 support"] },
    ],
  },
  booking: {
    eyebrow: "Online booking", title: "Book a consultation in under a minute",
    body: "Choose your doctor, pick a date and time, and get a booking reference instantly. Reschedule or cancel anytime.",
    btn1: "Book Now", btn2: "Manage Booking",
  },
  cta: { title: "Ready to make every conversation count?", body: "See Avenset in action with a guided demo for your team.", btn: "Book a Demo" },
  footer: {
    tag: "Enterprise conversation & meeting intelligence for healthcare.",
    company: "Company", legal: "Legal", contact: "Contact", privacy: "Privacy Policy", terms: "Terms & Conditions",
    rights: "All rights reserved.",
  },
  aboutPage: {
    title: "Making clinical conversations work harder for care.",
    sub: "We believe the best medical insight lives in the conversation between doctor and patient.",
    missionT: "Our mission", mission: "To give every healthcare team a reliable, secure memory of their conversations — searchable, summarised and actionable.",
    visionT: "Our vision", vision: "A world where doctors spend their time with patients, not paperwork.",
    stats: [{ v: "120k+", l: "Consultations processed" }, { v: "3", l: "Languages supported" }, { v: "98%", l: "Transcript accuracy" }, { v: "40+", l: "Partner clinics" }],
    valuesT: "What we value",
    values: [{ t: "Privacy first", d: "Patient data is encrypted and access is reviewed." }, { t: "Clinically useful", d: "Every feature earns its place in a real consultation." }, { t: "Inclusive", d: "Built for English, Tamil and Sinhala speakers." }],
  },
  productPage: {
    title: "The Avenset platform", sub: "One workspace for consultations, transcripts, summaries, decisions and reviews.",
    features: [
      { t: "Meeting & conversation records", d: "Every consultation stored with participants, time and context." },
      { t: "Transcripts", d: "Speaker-separated, timestamped and searchable." },
      { t: "Summaries", d: "Concise clinical summaries ready to share." },
      { t: "Decisions", d: "Key diagnoses and decisions extracted automatically." },
      { t: "Action items", d: "Follow-ups assigned with owners and due dates." },
      { t: "Review activity", d: "Approvals and edits tracked for compliance." },
    ],
    archT: "Proposed technical architecture",
    archNote: "NVIDIA technologies are shown as proposed architectural components only and are not part of the current web application, backend or database implementation.",
    arch: [
      { t: "Web application", d: "Responsive app for doctors, patients and admins." },
      { t: "Backend services & SQL database", d: "Records, transcripts, summaries and reviews." },
      { t: "Speech & language pipeline (proposed)", d: "NVIDIA Riva for ASR and NVIDIA NeMo for language models." },
      { t: "GPU inference (proposed)", d: "NVIDIA Triton Inference Server for scalable model serving." },
    ],
  },
  bookPage: {
    title: "Book an Appointment", sub: "Schedule an online video consultation or a product demo.",
    tabNew: "New booking", tabManage: "Manage booking",
    name: "Full name", email: "Email", phone: "Phone", doctor: "Doctor", spec: "Specialization", hospital: "Hospital",
    date: "Date", time: "Time", notes: "Notes (optional)", submit: "Confirm Booking", saving: "Saving...",
    success: "Booking confirmed!", refLabel: "Your booking reference", refHint: "Keep this reference with your email to manage your booking.",
    another: "Make another booking",
    lookupT: "Find your booking", ref: "Booking reference", find: "Find Booking",
    notFound: "No booking found with that email and reference.",
    update: "Save Changes", cancel: "Cancel Booking", confirmCancel: "Cancel this booking permanently?",
    updated: "Booking updated", cancelled: "Booking cancelled", status: "Status", taken: "That time slot is already booked for this doctor.",
    required: "Please fill in all required fields.", pastDate: "Please choose today or a future date.",
  },
  contactPage: {
    title: "Get in touch", sub: "Questions about Avenset, pricing or a demo? We'd love to hear from you.",
    office1: "Colombo Office", office2: "Jaffna Office", email: "Email", phone: "Phone", social: "Follow us",
    formT: "Send us a message", name: "Your name", emailF: "Email address", subject: "Subject", message: "Message",
    send: "Send Message", sending: "Sending...", sent: "Thanks! Your message has been received.",
    faqT: "Frequently asked questions",
    faq: [
      { q: "Is patient data secure?", a: "Yes. Conversations are encrypted in transit and at rest, with role-based access." },
      { q: "Which languages are supported?", a: "English, Tamil and Sinhala for both the interface and transcription." },
      { q: "Do patients need to install anything?", a: "No. Consultations run directly in a modern web browser." },
      { q: "Can I reschedule a booking?", a: "Yes. Use the Manage Booking tab with your email and booking reference." },
    ],
  },
  legal: {
    privacyT: "Privacy Policy", termsT: "Terms & Conditions", updated: "Last updated: October 2026",
    privacy: [
      { h: "Information we collect", p: "We collect the details you provide when booking or contacting us, such as name, email, phone and appointment information." },
      { h: "How we use it", p: "We use your information to schedule consultations, respond to enquiries and improve our services." },
      { h: "Data security", p: "Data is stored securely and only accessible to authorised staff." },
      { h: "Your rights", p: "You may request access to, correction of or deletion of your personal data at any time by contacting us." },
    ],
    terms: [
      { h: "Use of service", p: "By using Avenset you agree to use the platform lawfully and only for its intended purpose." },
      { h: "Bookings", p: "Appointments are subject to doctor availability. You may reschedule or cancel through Manage Booking." },
      { h: "Medical disclaimer", p: "Avenset is a communication tool and does not replace professional medical judgement." },
      { h: "Changes", p: "We may update these terms; continued use means you accept the updated terms." },
    ],
  },
  common: { learnMore: "Learn more", all: "All" },
};

type Dict = typeof en;

const ta: Dict = {
  nav: { home: "முகப்பு", about: "எங்களைப் பற்றி", product: "தயாரிப்பு", book: "டெமோ பதிவு", contact: "தொடர்பு", cta: "சந்திப்பு பதிவு" },
  hero: {
    badge: "சுகாதாரத்திற்கான AI சந்திப்பு நுண்ணறிவு",
    title: "ஒவ்வொரு மருத்துவர் ஆலோசனையும் பதிவு செய்யப்பட்டு புரிந்துகொள்ளப்படுகிறது.",
    sub: "Avenset பாதுகாப்பான வீடியோ ஆலோசனைகளை நடத்தி, ஒவ்வொரு உரையாடலையும் எழுத்துப்படிகள், சுருக்கங்கள், முடிவுகள் மற்றும் செயல் பணிகளாக தானாக மாற்றுகிறது.",
    primary: "சந்திப்பை பதிவு செய்யவும்", secondary: "தயாரிப்பைப் பார்க்க",
  },
  filter: {
    doctor: "மருத்துவர் பெயர்", doctorPh: "மருத்துவர் பெயரைத் தேடுக",
    spec: "சிறப்புத் துறை", specPh: "துறையைத் தேர்ந்தெடுக்கவும்",
    hospital: "மருத்துவமனை", hospitalPh: "மருத்துவமனையைத் தேர்ந்தெடுக்கவும்",
    date: "தேதி", search: "மருத்துவரைக் கண்டறி",
  },
  services: {
    eyebrow: "சேவைகள்", title: "ஒவ்வொரு ஆலோசனைக்கும் பின்னால் நான்கு இயந்திரங்கள்",
    items: [
      { t: "ஆன்லைன் வீடியோ ஆலோசனை", d: "நிறுவல் இல்லாமல் உலாவியில் HD, குறியாக்கப்பட்ட அழைப்புகள்." },
      { t: "நேரடி எழுத்துப்படி", d: "ஒவ்வொரு வார்த்தையையும் நேரடியாகப் பதிவு செய்யும் பேச்சு-எழுத்து அமைப்பு." },
      { t: "AI சுருக்கங்கள் & முடிவுகள்", d: "மருத்துவச் சுருக்கங்கள் மற்றும் முடிவுகள் சில நொடிகளில்." },
      { t: "செயல் பணிகள் & மதிப்பாய்வு", d: "பணிகளை ஒதுக்கி, பதிவுகளை மதிப்பாய்வு செய்யுங்கள்." },
    ],
  },
  about: {
    eyebrow: "Avenset பற்றி", title: "தட்டச்சு செய்வதை விட கேட்க விரும்பும் மருத்துவர்களுக்காக.",
    body: "Avenset என்பது சுகாதார தொடர்பாடலை மையமாகக் கொண்ட நிறுவன உரையாடல் மற்றும் சந்திப்பு நுண்ணறிவு தளம். முக்கியமான உரையாடல்களை நாங்கள் பதிவு செய்து, ஒழுங்கமைத்து, பாதுகாக்கிறோம்.",
    points: ["பாதுகாப்பான பதிவு மேலாண்மை", "பன்மொழி பேச்சு அமைப்பு", "மதிப்பாய்வு & ஒப்புதல் செயல்முறை"],
    btn: "மேலும் அறிக",
  },
  testi: {
    eyebrow: "சான்றுரைகள்", title: "சுகாதாரக் குழுக்களின் நம்பிக்கை",
    items: [
      { q: "ஆலோசனைக் குறிப்புகள் எழுத தினமும் ஒரு மணி நேரம் ஆனது. இப்போது அழைப்பு முடிவதற்குள் Avenset தயாரிக்கிறது.", n: "டாக்டர் நிர்மலா பெரேரா", r: "பொது மருத்துவர்" },
      { q: "தமிழ் எழுத்துப்படி மிகவும் துல்லியமாக உள்ளது.", n: "டாக்டர் அருண் குமார்", r: "இதய நிபுணர்" },
      { q: "செயல் பணிகள் இறுதியாகக் கண்காணிக்கப்படுகின்றன.", n: "ஷானிகா பெர்னாண்டோ", r: "மருத்துவமனை மேலாளர்" },
      { q: "நோயாளிகள் ஆன்லைனில் பதிவு செய்து தொலைபேசியில் இணைவதை விரும்புகிறார்கள்.", n: "டாக்டர் ரவி சங்கர்", r: "குழந்தை மருத்துவர்" },
      { q: "மதிப்பாய்வு செயல்முறை எங்கள் இணக்கக் குழுவுக்கு முழுமையான தணிக்கைப் பதிவைத் தருகிறது.", n: "கசுன் ஜயசூரிய", r: "IT தலைவர்" },
      { q: "சுத்தமானது, வேகமானது, எளிமையானது.", n: "டாக்டர் மீனா ராஜன்", r: "தோல் மருத்துவர்" },
    ],
  },
  pricing: {
    eyebrow: "விலை", title: "உங்கள் மருத்துவமனையுடன் வளரும் திட்டங்கள்", month: "/மாதம்", popular: "மிகவும் பிரபலம்", choose: "தொடங்குங்கள்",
    plans: [
      { n: "தொடக்கம்", p: "$29", d: "தனி மருத்துவர்களுக்கு", f: ["மாதம் 50 ஆலோசனைகள்", "நேரடி எழுத்துப்படி", "AI சுருக்கங்கள்", "மின்னஞ்சல் ஆதரவு"] },
      { n: "கிளினிக்", p: "$99", d: "வளரும் கிளினிக்குகளுக்கு", f: ["வரம்பற்ற ஆலோசனைகள்", "முடிவுகள் & செயல் பணிகள்", "பன்மொழி (EN, TA, SI)", "மதிப்பாய்வு செயல்முறை", "முன்னுரிமை ஆதரவு"] },
      { n: "நிறுவனம்", p: "தனிப்பயன்", d: "மருத்துவமனைகளுக்கு", f: ["பிரத்யேக உள்கட்டமைப்பு", "SSO & தணிக்கைப் பதிவுகள்", "தனிப்பயன் ஒருங்கிணைப்புகள்", "24/7 ஆதரவு"] },
    ],
  },
  booking: {
    eyebrow: "ஆன்லைன் பதிவு", title: "ஒரு நிமிடத்திற்குள் ஆலோசனையைப் பதிவு செய்யுங்கள்",
    body: "மருத்துவர், தேதி மற்றும் நேரத்தைத் தேர்ந்தெடுத்து உடனடியாக பதிவு எண்ணைப் பெறுங்கள். எப்போது வேண்டுமானாலும் மாற்றலாம் அல்லது ரத்து செய்யலாம்.",
    btn1: "இப்போது பதிவு", btn2: "பதிவை நிர்வகி",
  },
  cta: { title: "ஒவ்வொரு உரையாடலையும் பயனுள்ளதாக்கத் தயாரா?", body: "உங்கள் குழுவுக்கான வழிகாட்டப்பட்ட டெமோவுடன் Avenset-ஐப் பாருங்கள்.", btn: "டெமோ பதிவு" },
  footer: {
    tag: "சுகாதாரத்திற்கான நிறுவன உரையாடல் & சந்திப்பு நுண்ணறிவு.",
    company: "நிறுவனம்", legal: "சட்டம்", contact: "தொடர்பு", privacy: "தனியுரிமைக் கொள்கை", terms: "விதிமுறைகள் & நிபந்தனைகள்",
    rights: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
  },
  aboutPage: {
    title: "மருத்துவ உரையாடல்களை சிகிச்சைக்காக அதிகம் பயன்படுத்துதல்.",
    sub: "சிறந்த மருத்துவ நுண்ணறிவு மருத்துவர்-நோயாளி உரையாடலில் உள்ளது என்று நாங்கள் நம்புகிறோம்.",
    missionT: "எங்கள் நோக்கம்", mission: "ஒவ்வொரு சுகாதாரக் குழுவுக்கும் அவர்களின் உரையாடல்களின் நம்பகமான, பாதுகாப்பான நினைவகத்தை வழங்குதல்.",
    visionT: "எங்கள் தொலைநோக்கு", vision: "மருத்துவர்கள் காகித வேலையில் அல்ல, நோயாளிகளுடன் நேரத்தைச் செலவிடும் உலகம்.",
    stats: [{ v: "120k+", l: "செயலாக்கப்பட்ட ஆலோசனைகள்" }, { v: "3", l: "ஆதரிக்கப்படும் மொழிகள்" }, { v: "98%", l: "எழுத்துப்படி துல்லியம்" }, { v: "40+", l: "கூட்டாளர் கிளினிக்குகள்" }],
    valuesT: "எங்கள் மதிப்புகள்",
    values: [{ t: "தனியுரிமை முதலில்", d: "நோயாளி தரவு குறியாக்கப்படுகிறது." }, { t: "மருத்துவ ரீதியாக பயனுள்ளது", d: "ஒவ்வொரு அம்சமும் உண்மையான ஆலோசனைக்கு உதவுகிறது." }, { t: "உள்ளடக்கியது", d: "ஆங்கிலம், தமிழ், சிங்களம் பேசுபவர்களுக்காக." }],
  },
  productPage: {
    title: "Avenset தளம்", sub: "ஆலோசனைகள், எழுத்துப்படிகள், சுருக்கங்கள், முடிவுகள் மற்றும் மதிப்பாய்வுகளுக்கு ஒரே இடம்.",
    features: [
      { t: "சந்திப்பு & உரையாடல் பதிவுகள்", d: "ஒவ்வொரு ஆலோசனையும் பங்கேற்பாளர்கள், நேரத்துடன் சேமிக்கப்படுகிறது." },
      { t: "எழுத்துப்படிகள்", d: "பேச்சாளர் வாரியாக, நேரமுத்திரையுடன், தேடக்கூடியது." },
      { t: "சுருக்கங்கள்", d: "பகிரத் தயாரான சுருக்கமான மருத்துவச் சுருக்கங்கள்." },
      { t: "முடிவுகள்", d: "முக்கிய நோயறிதல்கள் தானாக பிரித்தெடுக்கப்படுகின்றன." },
      { t: "செயல் பணிகள்", d: "பொறுப்பாளர்கள் மற்றும் காலக்கெடுவுடன் பின்தொடர்தல்." },
      { t: "மதிப்பாய்வு செயல்பாடு", d: "ஒப்புதல்கள் மற்றும் திருத்தங்கள் கண்காணிக்கப்படுகின்றன." },
    ],
    archT: "முன்மொழியப்பட்ட தொழில்நுட்பக் கட்டமைப்பு",
    archNote: "NVIDIA தொழில்நுட்பங்கள் முன்மொழியப்பட்ட கூறுகளாக மட்டுமே காட்டப்படுகின்றன; தற்போதைய செயலி, பின்தளம் அல்லது தரவுத்தளத்தில் சேர்க்கப்படவில்லை.",
    arch: [
      { t: "வலை செயலி", d: "மருத்துவர்கள், நோயாளிகள், நிர்வாகிகளுக்கான செயலி." },
      { t: "பின்தள சேவைகள் & SQL தரவுத்தளம்", d: "பதிவுகள், எழுத்துப்படிகள், சுருக்கங்கள்." },
      { t: "பேச்சு & மொழி அமைப்பு (முன்மொழிவு)", d: "ASR-க்கு NVIDIA Riva, மொழி மாதிரிகளுக்கு NVIDIA NeMo." },
      { t: "GPU அனுமானம் (முன்மொழிவு)", d: "NVIDIA Triton Inference Server." },
    ],
  },
  bookPage: {
    title: "சந்திப்பை பதிவு செய்யவும்", sub: "ஆன்லைன் வீடியோ ஆலோசனை அல்லது தயாரிப்பு டெமோவைத் திட்டமிடுங்கள்.",
    tabNew: "புதிய பதிவு", tabManage: "பதிவை நிர்வகி",
    name: "முழுப் பெயர்", email: "மின்னஞ்சல்", phone: "தொலைபேசி", doctor: "மருத்துவர்", spec: "சிறப்புத் துறை", hospital: "மருத்துவமனை",
    date: "தேதி", time: "நேரம்", notes: "குறிப்புகள் (விருப்பம்)", submit: "பதிவை உறுதிப்படுத்து", saving: "சேமிக்கிறது...",
    success: "பதிவு உறுதிப்படுத்தப்பட்டது!", refLabel: "உங்கள் பதிவு எண்", refHint: "பதிவை நிர்வகிக்க இந்த எண்ணையும் மின்னஞ்சலையும் வைத்திருங்கள்.",
    another: "மற்றொரு பதிவு",
    lookupT: "உங்கள் பதிவைக் கண்டறியவும்", ref: "பதிவு எண்", find: "பதிவைக் கண்டறி",
    notFound: "அந்த மின்னஞ்சல் மற்றும் எண்ணுடன் பதிவு இல்லை.",
    update: "மாற்றங்களைச் சேமி", cancel: "பதிவை ரத்து செய்", confirmCancel: "இந்தப் பதிவை நிரந்தரமாக ரத்து செய்யவா?",
    updated: "பதிவு புதுப்பிக்கப்பட்டது", cancelled: "பதிவு ரத்து செய்யப்பட்டது", status: "நிலை", taken: "இந்த நேரம் ஏற்கனவே பதிவு செய்யப்பட்டுள்ளது.",
    required: "தேவையான அனைத்து புலங்களையும் நிரப்பவும்.", pastDate: "இன்று அல்லது எதிர்கால தேதியைத் தேர்ந்தெடுக்கவும்.",
  },
  contactPage: {
    title: "தொடர்பு கொள்ளுங்கள்", sub: "Avenset, விலை அல்லது டெமோ பற்றிய கேள்விகள் உள்ளதா?",
    office1: "கொழும்பு அலுவலகம்", office2: "யாழ்ப்பாண அலுவலகம்", email: "மின்னஞ்சல்", phone: "தொலைபேசி", social: "எங்களைப் பின்தொடருங்கள்",
    formT: "எங்களுக்கு செய்தி அனுப்புங்கள்", name: "உங்கள் பெயர்", emailF: "மின்னஞ்சல் முகவரி", subject: "தலைப்பு", message: "செய்தி",
    send: "செய்தி அனுப்பு", sending: "அனுப்புகிறது...", sent: "நன்றி! உங்கள் செய்தி பெறப்பட்டது.",
    faqT: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
    faq: [
      { q: "நோயாளி தரவு பாதுகாப்பானதா?", a: "ஆம். உரையாடல்கள் குறியாக்கப்பட்டு, பங்கு அடிப்படையிலான அணுகலுடன் சேமிக்கப்படுகின்றன." },
      { q: "எந்த மொழிகள் ஆதரிக்கப்படுகின்றன?", a: "ஆங்கிலம், தமிழ் மற்றும் சிங்களம்." },
      { q: "நோயாளிகள் எதையாவது நிறுவ வேண்டுமா?", a: "இல்லை. ஆலோசனைகள் உலாவியில் நேரடியாக இயங்கும்." },
      { q: "பதிவை மாற்ற முடியுமா?", a: "ஆம். மின்னஞ்சல் மற்றும் பதிவு எண்ணுடன் 'பதிவை நிர்வகி' பகுதியைப் பயன்படுத்தவும்." },
    ],
  },
  legal: {
    privacyT: "தனியுரிமைக் கொள்கை", termsT: "விதிமுறைகள் & நிபந்தனைகள்", updated: "கடைசியாக புதுப்பிக்கப்பட்டது: அக்டோபர் 2026",
    privacy: [
      { h: "நாங்கள் சேகரிக்கும் தகவல்", p: "பதிவு செய்யும்போது அல்லது தொடர்பு கொள்ளும்போது நீங்கள் வழங்கும் பெயர், மின்னஞ்சல், தொலைபேசி மற்றும் சந்திப்பு விவரங்கள்." },
      { h: "நாங்கள் எவ்வாறு பயன்படுத்துகிறோம்", p: "ஆலோசனைகளைத் திட்டமிடவும், விசாரணைகளுக்குப் பதிலளிக்கவும், சேவைகளை மேம்படுத்தவும்." },
      { h: "தரவு பாதுகாப்பு", p: "தரவு பாதுகாப்பாக சேமிக்கப்பட்டு அங்கீகரிக்கப்பட்ட ஊழியர்களுக்கு மட்டுமே அணுகக்கூடியது." },
      { h: "உங்கள் உரிமைகள்", p: "எப்போது வேண்டுமானாலும் உங்கள் தரவை அணுக, திருத்த அல்லது நீக்கக் கோரலாம்." },
    ],
    terms: [
      { h: "சேவையின் பயன்பாடு", p: "Avenset-ஐ சட்டப்பூர்வமாகவும் அதன் நோக்கத்திற்காக மட்டுமே பயன்படுத்த ஒப்புக்கொள்கிறீர்கள்." },
      { h: "பதிவுகள்", p: "சந்திப்புகள் மருத்துவர் கிடைப்பதைப் பொறுத்தது. 'பதிவை நிர்வகி' மூலம் மாற்றலாம் அல்லது ரத்து செய்யலாம்." },
      { h: "மருத்துவ மறுப்பு", p: "Avenset ஒரு தொடர்பாடல் கருவி; தொழில்முறை மருத்துவ தீர்ப்பை மாற்றாது." },
      { h: "மாற்றங்கள்", p: "இந்த விதிமுறைகளை நாங்கள் புதுப்பிக்கலாம்." },
    ],
  },
  common: { learnMore: "மேலும் அறிக", all: "அனைத்தும்" },
};

const si: Dict = {
  nav: { home: "මුල් පිටුව", about: "අප ගැන", product: "නිෂ්පාදනය", book: "ඩෙමෝ වෙන්කරන්න", contact: "සම්බන්ධ වන්න", cta: "හමුවීමක් වෙන්කරන්න" },
  hero: {
    badge: "සෞඛ්‍ය සේවා සඳහා AI රැස්වීම් බුද්ධිය",
    title: "සෑම වෛද්‍ය උපදේශනයක්ම සටහන් කර තේරුම් ගනී.",
    sub: "Avenset ආරක්ෂිත වීඩියෝ උපදේශන පවත්වා, සෑම සංවාදයක්ම පිටපත්, සාරාංශ, තීරණ සහ ක්‍රියා අයිතම බවට ස්වයංක්‍රීයව පරිවර්තනය කරයි.",
    primary: "හමුවීමක් වෙන්කරන්න", secondary: "නිෂ්පාදනය බලන්න",
  },
  filter: {
    doctor: "වෛද්‍ය නම", doctorPh: "වෛද්‍ය නම සොයන්න",
    spec: "විශේෂඥතාව", specPh: "විශේෂඥතාව තෝරන්න",
    hospital: "රෝහල", hospitalPh: "රෝහල තෝරන්න",
    date: "දිනය", search: "වෛද්‍යවරයා සොයන්න",
  },
  services: {
    eyebrow: "සේවාවන්", title: "සෑම උපදේශනයක් පිටුපසම එන්ජින් හතරක්",
    items: [
      { t: "ඔන්ලයින් වීඩියෝ උපදේශන", d: "ස්ථාපනයකින් තොරව බ්‍රවුසරයේ HD, සංකේතිත ඇමතුම්." },
      { t: "සජීවී පිටපත් කිරීම", d: "සෑම වචනයක්ම තත්‍ය කාලීනව ග්‍රහණය කරයි." },
      { t: "AI සාරාංශ සහ තීරණ", d: "වෛද්‍ය සාරාංශ සහ තීරණ තත්පර කිහිපයකින්." },
      { t: "ක්‍රියා අයිතම සහ සමාලෝචනය", d: "කාර්යයන් පවරා, වාර්තා සමාලෝචනය කරන්න." },
    ],
  },
  about: {
    eyebrow: "Avenset ගැන", title: "ටයිප් කිරීමට වඩා සවන් දීමට කැමති වෛද්‍යවරුන් සඳහා.",
    body: "Avenset යනු සෞඛ්‍ය සන්නිවේදනය කේන්ද්‍ර කරගත් ව්‍යවසාය සංවාද සහ රැස්වීම් බුද්ධි වේදිකාවකි. වැදගත්ම සංවාද අපි සටහන් කර, සංවිධානය කර, ආරක්ෂා කරමු.",
    points: ["ආරක්ෂිත වාර්තා කළමනාකරණය", "බහුභාෂා කථන පද්ධතිය", "සමාලෝචන සහ අනුමැතිය"],
    btn: "අප ගැන තව දැනගන්න",
  },
  testi: {
    eyebrow: "ප්‍රතිචාර", title: "සෞඛ්‍ය කණ්ඩායම්වල විශ්වාසය",
    items: [
      { q: "උපදේශන සටහන් ලිවීමට දිනකට පැයක් ගත විය. දැන් ඇමතුම අවසන් වීමට පෙර Avenset ඒවා සකසයි.", n: "වෛද්‍ය නිර්මලා පෙරේරා", r: "සාමාන්‍ය වෛද්‍ය" },
      { q: "දෙමළ පිටපත් කිරීම ඉතා නිවැරදියි.", n: "වෛද්‍ය අරුන් කුමාර්", r: "හෘද විශේෂඥ" },
      { q: "ක්‍රියා අයිතම අවසානයේ නිසි ලෙස ලුහුබඳිනු ලැබේ.", n: "ශානිකා ප්‍රනාන්දු", r: "සායන කළමනාකරු" },
      { q: "රෝගීන් ඔන්ලයින් වෙන්කර දුරකථනයෙන් සම්බන්ධ වීමට කැමතියි.", n: "වෛද්‍ය රවි ශංකර්", r: "ළමා වෛද්‍ය" },
      { q: "සමාලෝචන ක්‍රියාවලිය අපගේ අනුකූලතා කණ්ඩායමට සම්පූර්ණ විගණන සටහනක් ලබා දෙයි.", n: "කසුන් ජයසූරිය", r: "IT ප්‍රධානී" },
      { q: "පිරිසිදු, වේගවත්, සරලයි.", n: "වෛද්‍ය මීනා රාජන්", r: "චර්ම වෛද්‍ය" },
    ],
  },
  pricing: {
    eyebrow: "මිල ගණන්", title: "ඔබේ සායනය සමඟ වර්ධනය වන සැලසුම්", month: "/මාසය", popular: "වඩාත් ජනප්‍රිය", choose: "ආරම්භ කරන්න",
    plans: [
      { n: "ආරම්භක", p: "$29", d: "ස්වාධීන වෛද්‍යවරුන් සඳහා", f: ["මසකට උපදේශන 50", "සජීවී පිටපත්", "AI සාරාංශ", "ඊමේල් සහාය"] },
      { n: "සායන", p: "$99", d: "වර්ධනය වන සායන සඳහා", f: ["අසීමිත උපදේශන", "තීරණ සහ ක්‍රියා අයිතම", "බහුභාෂා (EN, TA, SI)", "සමාලෝචන ක්‍රියාවලි", "ප්‍රමුඛ සහාය"] },
      { n: "ව්‍යවසාය", p: "අභිරුචි", d: "රෝහල් සඳහා", f: ["කැපවූ යටිතල පහසුකම්", "SSO සහ විගණන සටහන්", "අභිරුචි ඒකාබද්ධ කිරීම්", "24/7 සහාය"] },
    ],
  },
  booking: {
    eyebrow: "ඔන්ලයින් වෙන්කිරීම", title: "විනාඩියකට අඩු කාලයකින් උපදේශනයක් වෙන්කරන්න",
    body: "වෛද්‍යවරයා, දිනය සහ වේලාව තෝරා වහාම වෙන්කිරීම් අංකයක් ලබාගන්න. ඕනෑම වේලාවක වෙනස් කිරීමට හෝ අවලංගු කිරීමට හැක.",
    btn1: "දැන් වෙන්කරන්න", btn2: "වෙන්කිරීම කළමනාකරණය",
  },
  cta: { title: "සෑම සංවාදයක්ම වටිනා කිරීමට සූදානම්ද?", body: "ඔබේ කණ්ඩායම සඳහා මාර්ගෝපදේශිත ඩෙමෝවක් සමඟ Avenset බලන්න.", btn: "ඩෙමෝ වෙන්කරන්න" },
  footer: {
    tag: "සෞඛ්‍ය සේවා සඳහා ව්‍යවසාය සංවාද සහ රැස්වීම් බුද්ධිය.",
    company: "සමාගම", legal: "නීතිමය", contact: "සම්බන්ධතා", privacy: "රහස්‍යතා ප්‍රතිපත්තිය", terms: "නියම සහ කොන්දේසි",
    rights: "සියලු හිමිකම් ඇවිරිණි.",
  },
  aboutPage: {
    title: "වෛද්‍ය සංවාද ප්‍රතිකාර සඳහා වඩාත් ඵලදායී කිරීම.",
    sub: "හොඳම වෛද්‍ය අවබෝධය වෛද්‍ය-රෝගී සංවාදය තුළ ඇති බව අපි විශ්වාස කරමු.",
    missionT: "අපගේ මෙහෙවර", mission: "සෑම සෞඛ්‍ය කණ්ඩායමකටම ඔවුන්ගේ සංවාදවල විශ්වාසනීය, ආරක්ෂිත මතකයක් ලබා දීම.",
    visionT: "අපගේ දැක්ම", vision: "වෛද්‍යවරුන් කඩදාසි වැඩ වෙනුවට රෝගීන් සමඟ කාලය ගත කරන ලෝකයක්.",
    stats: [{ v: "120k+", l: "සැකසූ උපදේශන" }, { v: "3", l: "සහාය දක්වන භාෂා" }, { v: "98%", l: "පිටපත් නිරවද්‍යතාව" }, { v: "40+", l: "හවුල්කාර සායන" }],
    valuesT: "අප අගය කරන දේ",
    values: [{ t: "රහස්‍යතාව මුලින්", d: "රෝගී දත්ත සංකේතනය කර ඇත." }, { t: "වෛද්‍ය වශයෙන් ප්‍රයෝජනවත්", d: "සෑම විශේෂාංගයක්ම සැබෑ උපදේශනයකට උපකාරී වේ." }, { t: "සියල්ලන් ඇතුළත්", d: "ඉංග්‍රීසි, දෙමළ සහ සිංහල කථිකයින් සඳහා." }],
  },
  productPage: {
    title: "Avenset වේදිකාව", sub: "උපදේශන, පිටපත්, සාරාංශ, තීරණ සහ සමාලෝචන සඳහා එක් ස්ථානයක්.",
    features: [
      { t: "රැස්වීම් සහ සංවාද වාර්තා", d: "සෑම උපදේශනයක්ම සහභාගිවන්නන් සහ වේලාව සමඟ ගබඩා වේ." },
      { t: "පිටපත්", d: "කථිකයා අනුව, කාල මුද්‍රා සහිතව, සෙවිය හැකි." },
      { t: "සාරාංශ", d: "බෙදාගැනීමට සූදානම් කෙටි වෛද්‍ය සාරාංශ." },
      { t: "තීරණ", d: "ප්‍රධාන රෝග විනිශ්චය ස්වයංක්‍රීයව උපුටා ගනී." },
      { t: "ක්‍රියා අයිතම", d: "හිමිකරුවන් සහ නියමිත දින සමඟ පසු විපරම්." },
      { t: "සමාලෝචන ක්‍රියාකාරකම්", d: "අනුමැතීන් සහ සංස්කරණ ලුහුබඳිනු ලැබේ." },
    ],
    archT: "යෝජිත තාක්ෂණික ගෘහ නිර්මාණය",
    archNote: "NVIDIA තාක්ෂණයන් යෝජිත සංරචක ලෙස පමණක් පෙන්වා ඇති අතර වර්තමාන යෙදුම, පසුපෙළ හෝ දත්ත සමුදායට ඇතුළත් නොවේ.",
    arch: [
      { t: "වෙබ් යෙදුම", d: "වෛද්‍යවරුන්, රෝගීන් සහ පරිපාලකයින් සඳහා." },
      { t: "පසුපෙළ සේවා සහ SQL දත්ත සමුදාය", d: "වාර්තා, පිටපත්, සාරාංශ සහ සමාලෝචන." },
      { t: "කථන සහ භාෂා පද්ධතිය (යෝජිත)", d: "ASR සඳහා NVIDIA Riva, භාෂා ආකෘති සඳහා NVIDIA NeMo." },
      { t: "GPU අනුමානය (යෝජිත)", d: "NVIDIA Triton Inference Server." },
    ],
  },
  bookPage: {
    title: "හමුවීමක් වෙන්කරන්න", sub: "ඔන්ලයින් වීඩියෝ උපදේශනයක් හෝ නිෂ්පාදන ඩෙමෝවක් සැලසුම් කරන්න.",
    tabNew: "නව වෙන්කිරීම", tabManage: "වෙන්කිරීම කළමනාකරණය",
    name: "සම්පූර්ණ නම", email: "ඊමේල්", phone: "දුරකථනය", doctor: "වෛද්‍යවරයා", spec: "විශේෂඥතාව", hospital: "රෝහල",
    date: "දිනය", time: "වේලාව", notes: "සටහන් (විකල්ප)", submit: "වෙන්කිරීම තහවුරු කරන්න", saving: "සුරකිමින්...",
    success: "වෙන්කිරීම තහවුරුයි!", refLabel: "ඔබේ වෙන්කිරීම් අංකය", refHint: "වෙන්කිරීම කළමනාකරණයට මෙම අංකය සහ ඊමේල් තබා ගන්න.",
    another: "තවත් වෙන්කිරීමක්",
    lookupT: "ඔබේ වෙන්කිරීම සොයන්න", ref: "වෙන්කිරීම් අංකය", find: "සොයන්න",
    notFound: "එම ඊමේල් සහ අංකය සමඟ වෙන්කිරීමක් නැත.",
    update: "වෙනස්කම් සුරකින්න", cancel: "වෙන්කිරීම අවලංගු කරන්න", confirmCancel: "මෙම වෙන්කිරීම ස්ථිරවම අවලංගු කරන්නද?",
    updated: "වෙන්කිරීම යාවත්කාලීන විය", cancelled: "වෙන්කිරීම අවලංගු විය", status: "තත්ත්වය", taken: "මෙම වේලාව දැනටමත් වෙන්කර ඇත.",
    required: "අවශ්‍ය සියලු ක්ෂේත්‍ර පුරවන්න.", pastDate: "අද හෝ අනාගත දිනයක් තෝරන්න.",
  },
  contactPage: {
    title: "අප හා සම්බන්ධ වන්න", sub: "Avenset, මිල ගණන් හෝ ඩෙමෝ ගැන ප්‍රශ්න තිබේද?",
    office1: "කොළඹ කාර්යාලය", office2: "යාපනය කාර්යාලය", email: "ඊමේල්", phone: "දුරකථනය", social: "අපව අනුගමනය කරන්න",
    formT: "අපට පණිවිඩයක් එවන්න", name: "ඔබේ නම", emailF: "ඊමේල් ලිපිනය", subject: "මාතෘකාව", message: "පණිවිඩය",
    send: "පණිවිඩය යවන්න", sending: "යවමින්...", sent: "ස්තූතියි! ඔබේ පණිවිඩය ලැබුණි.",
    faqT: "නිතර අසන ප්‍රශ්න",
    faq: [
      { q: "රෝගී දත්ත ආරක්ෂිතද?", a: "ඔව්. සංවාද සංකේතනය කර භූමිකා මත පදනම් වූ ප්‍රවේශය සමඟ ගබඩා කෙරේ." },
      { q: "සහාය දක්වන භාෂා මොනවාද?", a: "ඉංග්‍රීසි, දෙමළ සහ සිංහල." },
      { q: "රෝගීන්ට කිසිවක් ස්ථාපනය කළ යුතුද?", a: "නැත. උපදේශන බ්‍රවුසරයේ සෘජුවම ක්‍රියාත්මක වේ." },
      { q: "වෙන්කිරීමක් වෙනස් කළ හැකිද?", a: "ඔව්. ඊමේල් සහ වෙන්කිරීම් අංකය සමඟ 'වෙන්කිරීම කළමනාකරණය' භාවිතා කරන්න." },
    ],
  },
  legal: {
    privacyT: "රහස්‍යතා ප්‍රතිපත්තිය", termsT: "නියම සහ කොන්දේසි", updated: "අවසන් යාවත්කාලීනය: ඔක්තෝබර් 2026",
    privacy: [
      { h: "අප එකතු කරන තොරතුරු", p: "වෙන්කිරීමේදී හෝ සම්බන්ධ වීමේදී ඔබ ලබා දෙන නම, ඊමේල්, දුරකථන සහ හමුවීම් විස්තර." },
      { h: "අප එය භාවිතා කරන ආකාරය", p: "උපදේශන සැලසුම් කිරීමට, විමසීම්වලට පිළිතුරු දීමට සහ සේවා වැඩිදියුණු කිරීමට." },
      { h: "දත්ත ආරක්ෂාව", p: "දත්ත ආරක්ෂිතව ගබඩා කර බලයලත් කාර්ය මණ්ඩලයට පමණක් ප්‍රවේශ විය හැක." },
      { h: "ඔබේ අයිතිවාසිකම්", p: "ඕනෑම වේලාවක ඔබේ දත්ත වෙත ප්‍රවේශය, නිවැරදි කිරීම හෝ මකා දැමීම ඉල්ලිය හැක." },
    ],
    terms: [
      { h: "සේවා භාවිතය", p: "Avenset නීත්‍යානුකූලව සහ එහි අරමුණ සඳහා පමණක් භාවිතා කිරීමට ඔබ එකඟ වේ." },
      { h: "වෙන්කිරීම්", p: "හමුවීම් වෛද්‍යවරයාගේ ලබා ගැනීමේ හැකියාව මත රඳා පවතී." },
      { h: "වෛද්‍ය වියාචනය", p: "Avenset සන්නිවේදන මෙවලමක් වන අතර වෘත්තීය වෛද්‍ය විනිශ්චය ප්‍රතිස්ථාපනය නොකරයි." },
      { h: "වෙනස්කම්", p: "අපට මෙම නියම යාවත්කාලීන කළ හැක." },
    ],
  },
  common: { learnMore: "තව දැනගන්න", all: "සියල්ල" },
};

const dicts: Record<Lang, Dict> = { en, ta, si };

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Dict }>({ lang: "en", setLang: () => {}, t: en });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    const saved = localStorage.getItem("avenset-lang") as Lang | null;
    if (saved && dicts[saved]) setLangState(saved);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("avenset-lang", l);
  };
  return <Ctx.Provider value={{ lang, setLang, t: dicts[lang] }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);
