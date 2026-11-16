/* Wubber: English / Italian.
   The app is written in English. When Italian is chosen, this file swaps the
   text on screen for its Italian version as it appears. To fix a translation,
   edit the line in D below (English on the left, Italian on the right).
   Switch language with the flags at the bottom of the menu; it changes at once. */
(function () {
  "use strict";
  var KEY = "wubber.lang";
  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  var saved = get();
  var lang = saved === "it" || saved === "en" ? saved : ((navigator.language || "").toLowerCase().indexOf("it") === 0 ? "it" : "en");

  var D = {
    // Ride screen
    "Loading the map of Torino…": "Caricamento della mappa di Torino…",
    "Open menu": "Apri il menu",
    "Safety and emergency": "Sicurezza ed emergenza",
    "Book a ride": "Prenota una corsa",
    "Good morning": "Buongiorno", "Good afternoon": "Buon pomeriggio", "Good evening": "Buonasera",
    "Where to?": "Dove vai?",
    "Now": "Ora",
    "Set your pickup point": "Imposta il punto di partenza",
    "Pickup": "Partenza",
    "Use my current location": "Usa la mia posizione attuale",
    "Set pickup with your phone's GPS": "Imposta la partenza con il GPS del telefono",
    "Every driver is a woman": "Ogni autista è una donna",
    "whose ID and NCC licence our team checked in person.": "e il nostro team ha verificato di persona il suo documento e la licenza NCC.",
    "Back": "Indietro",
    "Choose a ride": "Scegli la corsa",
    "Request Wubber": "Richiedi Wubber",
    "Torino pilot": "Pilota a Torino",
    "Welcome to Wubber": "Benvenuta su Wubber",
    "Log in or create an account to book a ride with a verified female driver.": "Accedi o crea un account per prenotare una corsa con un'autista verificata.",
    "Loading your account…": "Caricamento del tuo account…",
    "Account": "Account",
    "Log in": "Accedi",
    "Create account": "Crea account",
    "Email": "Email",
    "Password": "Password",
    "Forgot your password?": "Hai dimenticato la password?",
    "First name": "Nome",
    "Phone": "Telefono",
    "Your driver calls this number if she can't find you.": "La tua autista chiama questo numero se non ti trova.",
    "At least 8 characters": "Almeno 8 caratteri",
    "Repeat password": "Ripeti la password",
    "Trusted contact": "Contatto di fiducia",
    "(optional)": "(facoltativo)",
    "Someone you'll send your trip details to, like a friend or flatmate.": "Una persona a cui inviare i dettagli del viaggio, come un'amica o una coinquilina.",
    "Name": "Nome",
    "I've read the": "Ho letto",
    "privacy notice": "l'informativa sulla privacy",
    "and agree to take part in the Wubber pilot. The pilot team and my driver can see my first name and phone number.": "e accetto di partecipare al pilota Wubber. Il team e la mia autista possono vedere il mio nome e il mio numero di telefono.",
    "Required": "Obbligatorio",
    "Send reset link": "Invia il link per reimpostarla",
    "Back to log in": "Torna all'accesso",
    "New password": "Nuova password",
    "Repeat new password": "Ripeti la nuova password",
    "Save new password": "Salva la nuova password",
    "Privacy": "Privacy",
    "You've arrived": "Sei arrivata",
    "Thanks for riding with us. Two minutes of feedback helps us decide whether to launch.": "Grazie per aver viaggiato con noi. Due minuti di feedback ci aiutano a decidere se lanciare il servizio.",
    "How was your ride? (1 = poor, 5 = excellent)": "Com'è andata la corsa? (1 = male, 5 = benissimo)",
    "Compared with your usual ride at night, you felt": "Rispetto al tuo solito modo di spostarti di notte, ti sei sentita",
    "Safer": "Più sicura", "About the same": "Più o meno uguale", "Less safe": "Meno sicura",
    "How often would you use it?": "Quanto spesso lo useresti?",
    "Every week": "Ogni settimana", "A few times a month": "Qualche volta al mese", "About once a month": "Circa una volta al mese", "Rarely": "Raramente",
    "Compared with Uber or a taxi, you'd pay": "Rispetto a Uber o a un taxi, pagheresti",
    "The same price": "Lo stesso prezzo", "Same price": "Stesso prezzo", "Up to €1 more": "Fino a €1 in più", "Up to €2 more": "Fino a €2 in più",
    "€3 or more extra": "€3 o più in più", "Only if cheaper": "Solo se costa meno",
    "Anything that would make you trust it more?": "Cosa ti farebbe fidare di più?",
    "Optional": "Facoltativo",
    "Send feedback": "Invia feedback",
    "Skip feedback": "Salta il feedback",
    "Plan your ride": "Pianifica la corsa",
    "Pickup location": "Luogo di partenza",
    "Destination": "Destinazione",
    "Type a street and house number, for example Via Po 17.": "Scrivi via e numero civico, per esempio Via Po 17.",
    "Pickup suggestions": "Suggerimenti per la partenza",
    "Destination suggestions": "Suggerimenti per la destinazione",
    "Choose on the map": "Scegli sulla mappa",
    "Drop a pin on the exact spot": "Metti un segnaposto nel punto esatto",
    "Add a house number for an exact pickup": "Aggiungi il numero civico per una partenza precisa",
    "Use this address as typed": "Usa l'indirizzo così come l'hai scritto",
    "Pinned location": "Posizione sulla mappa",
    "The map couldn't load. You can still search for addresses.": "Non è stato possibile caricare la mappa. Puoi comunque cercare gli indirizzi.",
    "The map couldn't load on this device. Search for the address instead.": "La mappa non si carica su questo dispositivo. Cerca l'indirizzo.",
    "The map is still loading. Try again in a moment.": "La mappa si sta ancora caricando. Riprova tra un attimo.",
    "Move the map to your pickup": "Sposta la mappa sul punto di partenza",
    "Move the map to your destination": "Sposta la mappa sulla destinazione",
    "Move the map to place the pin": "Sposta la mappa per posizionare il segnaposto",
    "Drag the map so the pin sits on the exact spot.": "Trascina la mappa finché il segnaposto è nel punto esatto.",
    "Confirm pickup": "Conferma la partenza",
    "Confirm destination": "Conferma la destinazione",
    "Pickup and destination are the same place. Change one of them.": "Partenza e destinazione coincidono. Cambiane una.",
    "Verified female driver": "Autista donna verificata",
    "Distance checked by the team": "Distanza verificata dal team",
    "Set by team": "Deciso dal team",
    "Add a trusted contact": "Aggiungi un contatto di fiducia",
    "You'll send her your trip details": "Le invierai i dettagli del viaggio",
    "Optional: someone to send your trip details to": "Facoltativo: qualcuno a cui inviare i dettagli del viaggio",
    "Pay your driver directly": "Paghi direttamente l'autista",
    "The team confirms your price before pickup": "Il team ti conferma il prezzo prima della partenza",
    "Ride cancelled": "Corsa annullata",
    "You cancelled this ride.": "Hai annullato questa corsa.",
    "The pilot team couldn't find a driver for this ride. We're sorry; please try again later or book another way home.": "Il team non ha trovato un'autista per questa corsa. Ci dispiace: riprova più tardi o torna a casa in un altro modo.",
    "Book a new ride": "Prenota una nuova corsa",
    "Requested": "Richiesta", "Driver assigned": "Autista assegnata", "On the way": "In viaggio", "Arrived": "Arrivata",
    "Finding your driver": "Cerchiamo la tua autista",
    "Our team is matching you with a verified female driver.": "Il nostro team ti sta abbinando a un'autista verificata.",
    "Enjoy your ride. Your trip is shared with the pilot team.": "Buon viaggio. La tua corsa è visibile al team del pilota.",
    "Ride PIN": "PIN della corsa",
    "Tell your driver your PIN. She can only start the trip with it.": "Comunica il PIN alla tua autista: può iniziare la corsa solo con quello.",
    "Identity checked": "Identità verificata",
    "NCC licence": "Licenza NCC",
    "Car": "Auto", "Plate": "Targa", "Price": "Prezzo",
    "Ask your driver": "Chiedi all'autista",
    "Set by the team": "Deciso dal team",
    "Driver phone": "Telefono autista",
    "Check her face and the plate before you get in.": "Controlla il suo volto e la targa prima di salire.",
    "Check the plate before you get in.": "Controlla la targa prima di salire.",
    "Keep this screen open; it updates on its own.": "Tieni aperta questa schermata: si aggiorna da sola.",
    "Share trip": "Condividi", "Call driver": "Chiama l'autista", "Safety": "Sicurezza",
    "Trip details": "Dettagli del viaggio",
    "Your trip is shared live.": "Il tuo viaggio è condiviso dal vivo.",
    "Anyone with your link sees your ride and where you are until 1 hour after you arrive.": "Chi ha il link vede la tua corsa e dove ti trovi fino a 1 ora dopo l'arrivo.",
    "Stop sharing my location": "Smetti di condividere la mia posizione",
    "Cancel ride": "Annulla la corsa",
    "Log in to book a ride.": "Accedi per prenotare una corsa.",
    "Ride requested": "Corsa richiesta",
    "Pick at least one answer, or skip feedback.": "Scegli almeno una risposta oppure salta il feedback.",
    "Thank you! Feedback sent.": "Grazie! Feedback inviato.",
    "Get help now": "Chiedi aiuto ora",
    "European emergency number": "Numero di emergenza europeo",
    "If you are in danger, call 112 from your phone.": "Se sei in pericolo, chiama il 112 dal tuo telefono.",
    "Call 112": "Chiama il 112",
    "may open your dialer; if it doesn't, dial the number yourself.": "potrebbe aprire il tastierino; altrimenti componi tu il numero.",
    "Close": "Chiudi",
    "Alert the pilot team": "Avvisa il team del pilota",
    "Sends your ride, driver and trusted contact to the pilot team's dashboard so they can call you.": "Invia la tua corsa, l'autista e il contatto di fiducia al team, che potrà chiamarti.",
    // Accounts
    "first name": "nome", "a valid email": "un'email valida", "a phone number": "un numero di telefono",
    "a password of at least 8 characters": "una password di almeno 8 caratteri", "the same password twice": "la stessa password due volte",
    "agreement to the privacy notice": "il consenso all'informativa sulla privacy",
    "All set. You can create your account.": "Tutto pronto. Puoi creare il tuo account.",
    "Reset your password": "Reimposta la password",
    "Choose a new password": "Scegli una nuova password",
    "Enter your email and we'll send you a link to choose a new password.": "Inserisci la tua email e ti invieremo un link per scegliere una nuova password.",
    "Pick a new password for your account.": "Scegli una nuova password per il tuo account.",
    "Wrong email or password.": "Email o password errate.",
    "Confirm your email first: open the link we sent you, then log in.": "Prima conferma la tua email: apri il link che ti abbiamo inviato, poi accedi.",
    "An account with this email already exists. Log in instead.": "Esiste già un account con questa email. Accedi.",
    "Too many tries. Wait a minute and try again.": "Troppi tentativi. Aspetta un minuto e riprova.",
    "That email address isn't valid.": "Questo indirizzo email non è valido.",
    "Can't reach the server. Check your internet connection and try again.": "Impossibile raggiungere il server. Controlla la connessione e riprova.",
    "Your session has ended. Log in again.": "La sessione è scaduta. Accedi di nuovo.",
    "You don't have permission to do that.": "Non hai il permesso per farlo.",
    "That's already saved.": "È già salvato.",
    "Log in first.": "Prima accedi.",
    "Enter your email address.": "Inserisci il tuo indirizzo email.",
    "Enter your password.": "Inserisci la password.",
    "Logging in…": "Accesso in corso…",
    "Welcome back!": "Bentornata!",
    "Creating your account…": "Creazione dell'account…",
    "Account created. Open the confirmation link we emailed you, then log in.": "Account creato. Apri il link di conferma che ti abbiamo inviato per email, poi accedi.",
    "Sending…": "Invio…",
    "If an account exists for that email, we've sent a link to reset your password.": "Se esiste un account con questa email, ti abbiamo inviato un link per reimpostare la password.",
    "Choose a password of at least 8 characters.": "Scegli una password di almeno 8 caratteri.",
    "The two passwords don't match.": "Le due password non coincidono.",
    "Saving…": "Salvataggio…",
    "New password saved.": "Nuova password salvata.",
    "That link has expired. Request a new one.": "Il link è scaduto. Richiedine uno nuovo.",
    "Your email is confirmed. Welcome!": "La tua email è confermata. Benvenuta!",
    "Logged out": "Disconnessa",
    "Your first name can't be empty.": "Il nome non può essere vuoto.",
    "Add a phone number your driver can call.": "Aggiungi un numero che l'autista possa chiamare.",
    "Account details saved": "Dati dell'account salvati",
    "You're not logged in.": "Non hai effettuato l'accesso.",
    "Your account": "Il tuo account",
    "Your details": "I tuoi dati",
    "The person you send your trip details to during a ride.": "La persona a cui invii i dettagli del viaggio durante una corsa.",
    "Save": "Salva",
    "Log out": "Esci",
    // Menu & pages
    "Menu": "Menu", "Ride": "Corsa", "Drive with us": "Guida con noi", "Socials": "Social",
    "Install the app": "Installa l'app",
    "Connecting…": "Connessione…", "Live": "In linea", "Offline": "Offline",
    "Map data ©": "Dati mappa ©", "Map ©": "Mappa ©",
    "Follow Wubber": "Segui Wubber",
    "News about the Torino pilot, safety tips and behind the scenes.": "Novità sul pilota a Torino, consigli di sicurezza e dietro le quinte.",
    "Follow": "Segui",
    "Add Wubber to your home screen": "Aggiungi Wubber alla schermata Home",
    "Open this page in": "Apri questa pagina in",
    "Tap the": "Tocca il pulsante",
    "Share": "Condividi",
    "button at the bottom of the screen.": "in fondo allo schermo.",
    "Scroll down and tap": "Scorri e tocca",
    "Add to Home Screen": "Aggiungi alla schermata Home",
    ", then": ", poi",
    "Add": "Aggiungi",
    "Wubber is on your home screen.": "Wubber è nella tua schermata Home.",
    // Location
    "This browser can't share your location. Type the address instead.": "Questo browser non può condividere la tua posizione. Scrivi l'indirizzo.",
    "Finding your location…": "Cerco la tua posizione…",
    "My location": "La mia posizione",
    "Pickup set to where you are": "Partenza impostata dove ti trovi",
    "Destination set to where you are": "Destinazione impostata dove ti trovi",
    "Location access is blocked. Allow it in your browser settings, or type the address.": "L'accesso alla posizione è bloccato. Consentilo nelle impostazioni del browser o scrivi l'indirizzo.",
    "Couldn't find your location. Type the address or drop a pin instead.": "Non riesco a trovare la tua posizione. Scrivi l'indirizzo o usa il segnaposto.",
    "Location is blocked, so the link shows your ride but not where you are.": "La posizione è bloccata: il link mostra la corsa ma non dove ti trovi.",
    "One moment, preparing your link…": "Un attimo, preparo il link…",
    "Select the text and copy it.": "Seleziona il testo e copialo.",
    "Trip link copied. Paste it into a chat.": "Link del viaggio copiato. Incollalo in una chat.",
    "Location sharing stopped. The link still shows your ride status.": "Condivisione della posizione interrotta. Il link mostra ancora lo stato della corsa.",
    // Drive
    "Drive": "Guida",
    "Drive women home safely": "Riporta a casa le donne in sicurezza",
    "Join the Torino pilot. Choose your hours, and every passenger is a woman booked through the app.": "Unisciti al pilota di Torino. Scegli i tuoi orari: ogni passeggera è una donna che prenota dall'app.",
    "Full name": "Nome e cognome",
    "Do you hold an NCC licence?": "Hai una licenza NCC?",
    "Yes": "Sì", "Applying": "In corso", "Not yet": "Non ancora",
    "Your photo": "La tua foto",
    "A clear photo of your face. Passengers see it when you're assigned, so they know it's you.": "Una foto chiara del tuo viso. Le passeggere la vedono quando vieni assegnata, così sanno che sei tu.",
    "When can you drive?": "Quando puoi guidare?",
    "Evenings 18–22h": "Sera 18–22", "Late night 22–3h": "Notte 22–3", "Weekends": "Weekend", "Weekdays": "Giorni feriali",
    "Areas you'd cover": "Zone che copriresti",
    "Bring your ID and NCC licence to a short meeting with the pilot team. We check them in person and don't store copies.": "Porta documento e licenza NCC a un breve incontro con il team. Li verifichiamo di persona e non ne conserviamo copie.",
    "I agree to identity and licence checks, and to my first name, photo, car and plate being shown to passengers I drive. See the": "Accetto la verifica di identità e licenza, e che nome, foto, auto e targa siano mostrati alle passeggere che accompagno. Leggi",
    "Join the pilot": "Unisciti al pilota",
    "Verified": "Verificata", "Not approved": "Non approvata", "Waiting for verification": "In attesa di verifica",
    "No car details yet": "Nessun dato sull'auto",
    "Change your photo": "Cambia la foto", "Add your photo": "Aggiungi la tua foto",
    "We can't add you to this pilot": "Non possiamo aggiungerti a questo pilota",
    "Next step: meet the pilot team": "Prossimo passo: incontra il team",
    "Thank you for signing up. Contact the pilot team if you think this is a mistake.": "Grazie per esserti iscritta. Contatta il team se pensi che sia un errore.",
    "Bring your ID and NCC licence. Once we've checked them, rides will appear here.": "Porta documento e licenza NCC. Dopo la verifica, le corse appariranno qui.",
    "Your rides": "Le tue corse",
    "No rides assigned right now. Keep this screen open during your shift; new rides appear here automatically.": "Nessuna corsa assegnata al momento. Tieni aperta questa schermata durante il turno: le nuove corse appaiono qui da sole.",
    "Go to pickup": "Vai alla partenza", "On trip": "In corsa",
    "From": "Da", "To": "A", "Passenger": "Passeggera", "Ask the team": "Chiedi al team", "Pickup in": "Partenza tra",
    "Passenger PIN": "PIN della passeggera", "4 digits": "4 cifre", "Start trip": "Inizia la corsa",
    "Ask the passenger to read her PIN from her app before she gets in.": "Chiedi alla passeggera di leggerti il PIN dall'app prima che salga.",
    "Passenger dropped off": "Passeggera arrivata",
    "The passenger pressed Emergency. The pilot team has been alerted.": "La passeggera ha premuto Emergenza. Il team è stato avvisato.",
    "Couldn't upload the photo. Check your connection.": "Impossibile caricare la foto. Controlla la connessione.",
    "Uploading your photo…": "Caricamento della foto…",
    "Photo saved": "Foto salvata",
    "Choose a photo (JPG or PNG).": "Scegli una foto (JPG o PNG).",
    "Add your name and phone number.": "Aggiungi nome e numero di telefono.",
    "Tell us whether you hold an NCC licence.": "Dicci se hai una licenza NCC.",
    "Add a photo of yourself. Passengers see it before they get in.": "Aggiungi una tua foto. Le passeggere la vedono prima di salire.",
    "Tick the consent box to continue.": "Spunta la casella del consenso per continuare.",
    "You're signed up. The team will be in touch.": "Iscrizione fatta. Il team ti contatterà.",
    "Type the passenger's 4-digit PIN.": "Inserisci il PIN di 4 cifre della passeggera.",
    "That PIN doesn't match. Ask the passenger to read hers from the app.": "Il PIN non corrisponde. Chiedi alla passeggera di leggerlo dall'app.",
    "Trip started. Drive safe.": "Corsa iniziata. Guida con prudenza.",
    "Trip completed": "Corsa completata",
    "NCC in progress": "NCC in corso", "No NCC yet": "Ancora senza NCC",
    // Team dashboard
    "Pilot team": "Team del pilota", "Pilot dashboard": "Pannello del pilota",
    "Match requests to drivers, verify sign-ups and track the numbers from your MVP plan.": "Abbina le richieste alle autiste, verifica le iscrizioni e segui i numeri del piano MVP.",
    "New requests": "Nuove richieste", "Rides in progress": "Corse in corso", "Pilot numbers": "Numeri del pilota",
    "Drivers": "Autiste", "Past rides": "Corse passate", "Download results": "Scarica i risultati",
    "Spreadsheet files for your analysis: every ride with its feedback, and every driver sign-up.": "File per l'analisi: ogni corsa con il suo feedback e ogni iscrizione di autiste.",
    "Rides and feedback (CSV)": "Corse e feedback (CSV)", "Drivers (CSV)": "Autiste (CSV)",
    "Unknown driver": "Autista sconosciuta", "Emergency": "Emergenza", "Driver": "Autista", "Not assigned": "Non assegnata",
    "Ride status": "Stato della corsa",
    "Call the passenger now. If she doesn't answer, call her trusted contact and 112.": "Chiama subito la passeggera. Se non risponde, chiama il suo contatto di fiducia e il 112.",
    "Mark as handled": "Segna come gestita", "Choose a driver": "Scegli un'autista", "Loading requests…": "Caricamento delle richieste…",
    "No one is waiting. New ride requests appear here the moment a passenger books.": "Nessuno è in attesa. Le nuove richieste appaiono qui appena una passeggera prenota.",
    "No verified drivers yet. Verify a driver below before assigning rides.": "Ancora nessuna autista verificata. Verificane una qui sotto prima di assegnare corse.",
    "Waiting": "In attesa", "Female driver requested": "Richiesta autista donna", "Any verified driver": "Qualsiasi autista verificata",
    "See route": "Vedi il percorso", "Price €": "Prezzo €", "Assign driver": "Assegna autista", "No driver available": "Nessuna autista disponibile",
    "Driver on the way": "Autista in arrivo", "Mark completed": "Segna come completata", "No rides on the road.": "Nessuna corsa in strada.",
    "Ride requests": "Richieste di corsa", "Drivers verified": "Autiste verificate", "Rider accounts": "Account passeggere",
    "Feedback charts appear here after the first passenger completes a ride and answers the survey.": "I grafici appaiono qui dopo che la prima passeggera completa una corsa e risponde al sondaggio.",
    "Felt safer than usual (H3)": "Si è sentita più sicura del solito (H3)", "How often they'd ride (H4)": "Quanto spesso viaggerebbero (H4)",
    "Price they'd accept (H6)": "Prezzo che accetterebbero (H6)", "What would build trust": "Cosa aumenterebbe la fiducia",
    "No drivers yet. Sign-ups from the Drive tab appear here for you to verify.": "Ancora nessuna autista. Le iscrizioni dalla sezione Guida appaiono qui da verificare.",
    "To verify": "Da verificare", "Check that the photo matches her ID.": "Controlla che la foto corrisponda al documento.", "No photo yet.": "Ancora nessuna foto.",
    "Licence": "Licenza", "Hours": "Orari", "Areas": "Zone", "Verified in person": "Verificata di persona",
    "Completed": "Completata", "Cancelled": "Annullata",
    "Completed and cancelled rides are listed here.": "Qui trovi le corse completate e annullate.",
    "Download started": "Download avviato", "Couldn't create the download. Try again.": "Impossibile creare il file. Riprova.",
    "Choose a driver first.": "Prima scegli un'autista.", "Driver assigned. The passenger can see her now.": "Autista assegnata. Ora la passeggera la vede.",
    "Marked completed": "Segnata come completata", "Emergency marked as handled": "Emergenza segnata come gestita",
    "Driver verified": "Autista verificata", "Driver marked not approved": "Autista segnata come non approvata",
    // Trip page
    "Wubber trip": "Viaggio Wubber",
    "Loading the trip…": "Caricamento del viaggio…",
    "Her phone": "Il suo telefono",
    "If you're worried": "Se sei preoccupata",
    "Call her first. If you think she's in danger, call the emergency number": "Prima chiamala. Se pensi che sia in pericolo, chiama il numero di emergenza",
    ". Every Wubber driver is a woman whose ID and licence the pilot team checked in person.": ". Ogni autista Wubber è una donna di cui il team ha verificato di persona documento e licenza.",
    "Trip not found": "Viaggio non trovato",
    "This link doesn't match a Wubber ride. Check that you copied the whole link.": "Questo link non corrisponde a nessuna corsa Wubber. Controlla di averlo copiato tutto.",
    "This trip has ended": "Questo viaggio è terminato",
    "Shared trips stop showing 1 hour after the ride ends.": "I viaggi condivisi non sono più visibili 1 ora dopo la fine della corsa.",
    "She pressed the emergency button. The pilot team has been alerted.": "Ha premuto il pulsante di emergenza. Il team è stato avvisato.",
    "Arrived safely.": "Arrivata sana e salva.",
    "Her driver": "La sua autista",
    "Can't reach Wubber right now. Retrying…": "Impossibile raggiungere Wubber ora. Riprovo…"
  };

  var MON = { Jan: "gen", Feb: "feb", Mar: "mar", Apr: "apr", May: "mag", Jun: "giu", Jul: "lug", Aug: "ago", Sep: "set", Oct: "ott", Nov: "nov", Dec: "dic" };
  function T(s) { return D[s] != null ? D[s] : s; }
  var P = [
    [/^just now$/, function () { return "adesso"; }],
    [/^(\d+) min ago$/, function (m) { return m[1] + " min fa"; }],
    [/^(\d+) h ago$/, function (m) { return m[1] + " h fa"; }],
    [/^(\d+) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)$/, function (m) { return m[1] + " " + MON[m[2]]; }],
    [/^Required\. Still needed: (.+)\.$/, function (m) { return "Obbligatorio. Mancano ancora: " + m[1].split(", ").map(T).join(", ") + "."; }],
    [/^Account created\. Welcome, (.+)!$/, function (m) { return "Account creato. Benvenuta, " + m[1] + "!"; }],
    [/^Hi (.+)$/, function (m) { return "Ciao " + m[1]; }],
    [/^(.+) is on her way$/, function (m) { return m[1] + " sta arrivando"; }],
    [/^Pickup in about (\d+) min · (.+)$/, function (m) { return "Arrivo tra circa " + m[1] + " min · " + m[2]; }],
    [/^Pickup in about (\d+) min$/, function (m) { return "Arrivo tra circa " + m[1] + " min"; }],
    [/^Heading to (.+)$/, function (m) { return "Verso " + m[1]; }],
    [/^~(\d+) min ride · ([\d.,]+) km$/, function (m) { return "~" + m[1] + " min di viaggio · " + m[2] + " km"; }],
    [/^Share trip with (.+)$/, function (m) { return "Condividi il viaggio con " + m[1]; }],
    [/^Send live trip to (.+) on WhatsApp$/, function (m) { return "Invia il viaggio dal vivo a " + m[1] + " su WhatsApp"; }],
    [/^Call (.+)$/, function (m) { return "Chiama " + m[1]; }],
    [/^Pilot team alerted at ([\d:]+)\. Call 112 if you are in danger\.$/, function (m) { return "Team avvisato alle " + m[1] + ". Chiama il 112 se sei in pericolo."; }],
    [/^Pilot team alerted at ([\d:]+)\. They can see your ride, your driver and your trusted contact, and will call you\.$/, function (m) { return "Team avvisato alle " + m[1] + ". Vede la tua corsa, l'autista e il contatto di fiducia, e ti chiamerà."; }],
    [/^(€[\d.,]+–[\d.,]+) estimate$/, function (m) { return m[1] + " stimati"; }],
    [/^(€[\d.,]+) agreed$/, function (m) { return m[1] + " concordati"; }],
    [/^Estimated fare (€[\d.,]+–[\d.,]+)\. Keep this screen open; it updates on its own\.$/, function (m) { return "Prezzo stimato " + m[1] + ". Tieni aperta questa schermata: si aggiorna da sola."; }],
    [/^You made it to (.+)\. Two minutes of feedback helps us decide whether to launch\.$/, function (m) { return "Sei arrivata a " + m[1] + ". Due minuti di feedback ci aiutano a decidere se lanciare il servizio."; }],
    [/^(\d+) completed$/, function (m) { return m[1] + " completate"; }],
    [/^(\d+) waiting$/, function (m) { return m[1] + " in attesa"; }],
    [/^(\d+) completed rides?(.*)$/, function (m) {
      return m[1] + (m[1] === "1" ? " corsa completata" : " corse completate") + m[2].replace(" · member since ", " · iscritta dal ").replace(" · pilot team", " · team del pilota");
    }],
    [/^Closest number to (.+) · Torino$/, function (m) { return "Numero più vicino al " + m[1] + " · Torino"; }],
    [/^Near (.+)$/, function (m) { return "Vicino a " + m[1]; }],
    [/^About (\d+) m away · pin placed exactly$/, function (m) { return "A circa " + m[1] + " m · segnaposto preciso"; }],
    [/^Outside the addresses we know · (.+)$/, function (m) { return "Fuori dagli indirizzi che conosciamo · " + m[1]; }],
    [/^That link didn't work: (.+)\. Request a new one\.$/, function (m) { return "Il link non ha funzionato: " + m[1] + ". Richiedine uno nuovo."; }],
    [/^Couldn't upload the photo \((\d+)\)\.$/, function (m) { return "Impossibile caricare la foto (" + m[1] + ")."; }],
    [/^Pilot dashboard \((\d+) SOS\)$/, function (m) { return "Pannello del pilota (" + m[1] + " SOS)"; }],
    // Trip page
    [/^(.+) is waiting for a driver$/, function (m) { return m[1] + " aspetta un'autista"; }],
    [/^Booked at ([\d:]+)\. The pilot team is matching her with a verified female driver\.$/, function (m) { return "Prenotata alle " + m[1] + ". Il team la sta abbinando a un'autista verificata."; }],
    [/^(.+) is on her way to pick up (.+)$/, function (m) { return m[1] + " sta andando a prendere " + m[2]; }],
    [/^(.+) is on the road$/, function (m) { return m[1] + " è in viaggio"; }],
    [/^(.+) has arrived$/, function (m) { return m[1] + " è arrivata"; }],
    [/^(.+)'s ride was cancelled$/, function (m) { return "La corsa di " + m[1] + " è stata annullata"; }],
    [/^(Driver assigned|Picked up|Dropped off|Cancelled) at ([\d:]+)$/, function (m) {
      return ({ "Driver assigned": "Autista assegnata alle ", "Picked up": "Partita alle ", "Dropped off": "Arrivata alle ", "Cancelled": "Annullata alle " })[m[1]] + m[2];
    }],
    [/^Her phone's location updated (.+)\. This page refreshes on its own\.$/, function (m) { return "Posizione del telefono aggiornata " + T2(m[1]) + ". Questa pagina si aggiorna da sola."; }],
    [/^She isn't sharing her location right now; you'll still see her ride status\. This page refreshes on its own\.$/, function () { return "Ora non sta condividendo la posizione; vedrai comunque lo stato della corsa. Questa pagina si aggiorna da sola."; }],
    [/^Your friend$/, function () { return "La tua amica"; }],
    [/^Photo of (.+)$/, function (m) { return "Foto di " + m[1]; }],
    [/^PIN ([\d· ]+)$/, function (m) { return "PIN " + m[1]; }]
  ];
  function T2(t) {
    if (D[t] != null) return D[t];
    for (var i = 0; i < P.length; i++) { var m = t.match(P[i][0]); if (m) return P[i][1](m); }
    return null;
  }
  function tr(s) {
    var t = s.trim();
    if (!t || t.length > 400) return s;
    var out = T2(t);
    if (out == null || out === t) return s;
    var lead = s.match(/^\s*/)[0], trail = s.match(/\s*$/)[0];
    return lead + out + trail;
  }
  window.WUBBER_T = function (s) { return lang === "it" ? tr(String(s)) : String(s); };

  // Remember the English we replaced, so switching back to English is instant.
  var done = new Set(), REC = "__wubberI18n";
  var ATTRS = ["placeholder", "aria-label", "title", "alt"];
  // Only used for placeholders, so a driver whose car really is a grey Corolla keeps her own words.
  var PH = { "Grey Toyota Corolla": "Toyota Corolla grigia", "name@mail.com": "nome@mail.com" };
  function skip(el) { return !el || el.nodeName === "SCRIPT" || el.nodeName === "STYLE" || el.nodeName === "TEXTAREA" || (el.closest && el.closest("[data-no-translate]")); }
  function doAttrs(el) {
    for (var i = 0; i < ATTRS.length; i++) {
      var k = ATTRS[i], v = el.getAttribute(k);
      if (!v) continue;
      var rec = el[REC] && el[REC][k];
      if (rec && v === rec.tr) continue;
      var n = k === "placeholder" && PH[v] ? PH[v] : tr(v);
      if (n !== v) { el[REC] = el[REC] || {}; el[REC][k] = { orig: v, tr: n }; done.add(el); el.setAttribute(k, n); }
    }
  }
  function walk(node) {
    if (node.nodeType === 3) {
      if (skip(node.parentNode)) return;
      var v = node.nodeValue, rec = node[REC];
      if (rec && v === rec.tr) return;
      var n = tr(v);
      if (n !== v) { node[REC] = { orig: v, tr: n }; done.add(node); node.nodeValue = n; }
      return;
    }
    if (node.nodeType !== 1 || skip(node)) return;
    doAttrs(node);
    for (var c = node.firstChild; c; c = c.nextSibling) walk(c);
  }
  function restore() {
    done.forEach(function (node) {
      var rec = node[REC];
      if (!rec) return;
      if (node.nodeType === 3) { if (node.nodeValue === rec.tr) node.nodeValue = rec.orig; }
      else for (var k in rec) { if (node.getAttribute(k) === rec[k].tr) node.setAttribute(k, rec[k].orig); }
      node[REC] = null;
    });
    done.clear();
  }
  var obs = new MutationObserver(function (list) {
    for (var i = 0; i < list.length; i++) {
      var m = list[i];
      if (m.type === "childList") { for (var j = 0; j < m.addedNodes.length; j++) walk(m.addedNodes[j]); }
      else if (m.type === "characterData") walk(m.target);
      else if (m.type === "attributes" && !skip(m.target)) doAttrs(m.target);
    }
  });
  var titleEN = document.title;

  function apply(l, announce) {
    lang = l;
    window.WUBBER_LANG = l;
    document.documentElement.lang = l;
    document.documentElement.setAttribute("data-lang", l);
    var fs = document.querySelectorAll(".flag[data-lang]");
    for (var i = 0; i < fs.length; i++) fs[i].setAttribute("aria-pressed", fs[i].getAttribute("data-lang") === l ? "true" : "false");
    if (!document.body) return;
    if (l === "it") {
      document.title = tr(titleEN);
      walk(document.body);
      obs.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
    } else {
      obs.disconnect();
      restore();
      document.title = titleEN;
    }
    if (announce) { try { window.dispatchEvent(new CustomEvent("wubber:lang", { detail: l })); } catch (e) {} }
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest(".flag[data-lang]");
    if (!b) return;
    e.preventDefault();
    var l = b.getAttribute("data-lang");
    set(l);
    if (l !== lang) apply(l, true);
  });
  window.WUBBER_LANG = lang;
  if (document.body) apply(lang, false); else document.addEventListener("DOMContentLoaded", function () { apply(lang, false); });
})();
