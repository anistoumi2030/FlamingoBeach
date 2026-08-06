import fs from 'fs';
const f = 'src/app/listing/[id]/page.tsx';
let s = fs.readFileSync(f, 'utf8');

// Add Phone import
s = s.replace('CheckCircle2,\n} from "lucide-react";', 'CheckCircle2,\n  Phone,\n} from "lucide-react";');

// Add phone state and update bookingData type
s = s.replace('const [email, setEmail] = useState("");\n  const [password, setPassword] = useState("");', 'const [email, setEmail] = useState("");\n  const [phone, setPhone] = useState("");\n  const [password, setPassword] = useState("");');
s = s.replace('const [bookingData, setBookingData] = useState<{\n    name: string;\n    email: string;\n    password: string;\n    date: string;\n    guests: string;\n  } | null>(null);', 'const [bookingData, setBookingData] = useState<{\n    name: string;\n    email: string;\n    password: string;\n    phone: string;\n    date: string;\n    guests: string;\n  } | null>(null);');

// Add useEffect to clear email/password on mount
s = s.replace('const today = new Date().toISOString().split("T")[0];\n\n  if (!listing) {', 'const today = new Date().toISOString().split("T")[0];\n\n  useEffect(() => {\n    setEmail("");\n    setPassword("");\n  }, []);\n\n  if (!listing) {');

// Update handleSubmit payload to include phone
s = s.replace('const payload = {\n      name,\n      email,\n      password,\n      date,\n      guests,', 'const payload = {\n      name,\n      email,\n      password,\n      phone,\n      date,\n      guests,');

// Update handleNewBooking to reset phone
s = s.replace('setBookingData(null);\n    setName("");\n    setEmail("");\n    setPassword("");\n    setDate("");\n    setGuests("2");', 'setBookingData(null);\n    setName("");\n    setEmail("");\n    setPassword("");\n    setPhone("");\n    setDate("");\n    setGuests("2");');

// Insert phone field in form before email field
s = s.replace('                </div>\n\n                <div>\n                  <label className="block text-sm font-medium text-gray-700 mb-1.5">\n                    Adresse email', '                </div>\n\n                <div>\n                  <label className="block text-sm font-medium text-gray-700 mb-1.5">\n                    Numéro de téléphone <span className="text-red-500">*</span>\n                  </label>\n                  <div className="relative">\n                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />\n                    <input\n                      type="tel"\n                      value={phone}\n                      onChange={(e) => setPhone(e.target.value)}\n                      placeholder="+216 12 345 678"\n                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white transition-all"\n                      required\n                    />\n                  </div>\n                  <p className="text-xs text-gray-400 mt-1">Format tunisien: +216 XX XXX XXX</p>\n                </div>\n\n                <div>\n                  <label className="block text-sm font-medium text-gray-700 mb-1.5">\n                    Adresse email');

fs.writeFileSync(f, s);
console.log('Booking form updated successfully');