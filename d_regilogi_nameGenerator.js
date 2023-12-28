let firstNames = ["Aldas","Justė", "AKiss", "Ąžuolas", "Kamilė", "Dalia", "Saulius", "Juratė", "Lukas", "Dovydas", "Ignas", "Inga", "Laura", "Kristina", 
"Valdelis", "Marius", "Tania", "Rūta", "Gintarė", "Tomas", "Erlandas", "Giedrius", "Viktorija", "Ramas", "Efka", "Reno", "Rex", "Mama", "Tete", 
"Sese", "Teta", "Egidijus", "Auksė", "Virgilijus", "Rokas", "Gintautas", "Elvyra", "Martyna", "Tomas", "Birutė", "Edvardas", "Aistė", "Eglė", 
"Darius", "Paulius", "Dangiras", "Daiva", "Jurga", "Mindaugas", "Jolanta", "Giedrė", "Mantas", "Raimonda", "Eimantas", "Almira", "Stasys", "Vida", 
"Gediminas", "Viktoras", "Jolita", "Greta", "Gertrūda", "Antanas", "Birutė", "Arūnas", "Evelina", "Nerijus", "Darius", "Monika", "Egidijus", 
"Rūta", "Ausra", "Jolita", "Paulius", "Saulius", "Linas", "Justina", "Zita", "Egle", "Ramunė", "Irena", "Rimantas", "Egidijus", "Virginijus", 
"Darius", "Rūta", "Elena", "Jolanta", "Gediminas", "Jurga", "Martynas", "Vytautas", "Rokas", "Algirdas", "Tomas", "Dalia", "Gintarė", "Birutė", 
"Rimantas", "Jolanta", "Vytautas", "Augustė", "Eglė", "Mindaugas", "Marija", "Daiva", "Jonas", "Rūta", "Rimantas", "Birutė", "Darius", 
"Jūratė", "Dainius", "Greta", "Vilhelmas", "Evelina", "Kęstutis", "Laima", "Arūnas", "Giedrė", "Tautvydas", "Dovilė", "Andrius", "Jovita", 
"Virginija", "Viktoras", "Dalius", "Saulė", "Ema", "Linas", "Gintarė", "Vaidotas", "Mantas", "Laura", "Marius", "Reda", "Aušra", "Vaidas", 
"Zita", "Justas", "Rimvydas", "Rasa", "Simona", "Modestas", "Laimutė", "Danguolė", "Kazys", "Inga", "Dovydas", "Viktorija", "Algirdas", "Neringa", 
"Laurynas", "Edita", "Alvydas", "Jurga", "Aistė", "Petras", "Asta", "Gediminas", "Viktoras", "Irena", "Ausra", "Rimas", "Rūta", "Vitalijus", 
"Audronė", "Stasys", "Aušrinė", "Eligijus", "Milda", "Genovaitė", "Darius", "Virginijus", "Tadas", "Ramūnas", "Zita", "Deimantė", "Gintaras", 
"Žygimantas", "Inga", "Bronislovas", "Vilma", "Mantas", "Rimantė", "Vida", "Kęstutis", "Jovita", "Kristina", "Daumantas", "Eglė", "Ignas", 
"Rūta", "Rita", "Marius", "Gabrielė", "Tomas", "Laima", "Živilė", "Gediminas", "Kristijonas", "Viktorija", "Vilhelmina", "Ramūnas", "Egidijus", 
"Sigita", "Algimantas","Emily", "Hannah", "Sarah", "Lauren", "Amber", "Brianna", "Jordan", "Victoria", "Haley", "Megan", "Kayla", "Heather", 
"Abby", "Kaitlyn", "Allison", "Alexis", "Morgan", "Bailey", "Savannah", "Samantha", "Rachel", "Sydney", "Mackenzie", "Madeline", "Katie", "Erin", 
"Olivia", "Emma", "Brooke", "Danielle", "Katherine", "Lily", "Hailey", "Jenna", "Chloe", "Isabella", "Mia", "Grace", "Taylor", "Leah"];

let secondNames = ["Uoga","Pupa","Super","Linksmuolis","Bambalinis","Kukli","Paprastutė","Generolas","Nuolanki","Trapi","Išmintinga","Kietasis",
"1","2","3","69","99","4","","Sasiska","Puikioji","Išmanusis","Piktas","Rusas","Kiškis","Genijus","Babulė","Dundukas","Siaubūnas", "Protinguolis", "Afigienas", 
"Beprotis", "Juokingas", "Tikintis", "Storulis", "Beprotis", "Pilotas", "Trumparegis", "Mamos", "Koldūnas", "Sliekas", "Baršiasriubis", "Gudrus", 
"Gerasis", "Išprotejusi", "Karšta", "Gudri", "Putiovas","Digimonas", "Pokemonas", "Gražioji", "Auskleidžiantis", "Nepaprastas", "Paprastas", 
"Stiprus", "Silpnas", "Ištikimas", "Neištikimas", "Geras", "Blogas", "Niekšingas", "Švelnus", "Stiprus", "Ryžtingas", "Atsargus", "Neatsargus", "Ramus", 
"neramus", "puikus", "prastas", "gražus", "negražus", "malonus", "nemalonus", "Didelis", "Mažas", "Stambus", "Mažytis", "Ilgas", "Trumpas", 
"Platus", "Siauras", "Aukštas", "Žemas", "Storegtas", "Apvalus", "Kvadratinis", "apvalus","švelnus", "naujas", "didžiulis", "mažas", "lengvas", 
"Ryškus", "Sunkus", "Aukštas", "Ilgas", "siauras", "trumpas", "storas", "plonas", "gyvas", "miręs", "kvailas", "protingas", "gražus", "negražus", 
"šiltas", "šaltas", "sveikas", "ligotas", "baltas", "juodas", "raudonas", "geltonas", "melynas", "žalias", "oranžinis", "violetinis", "rožinis", 
"mėlynas", "rudas", "sidabrinis", "auksinis", "brangus", "pigus", "geras", "blogas", "greitas", "lėtas", "jaunas", "senas", "linksmas", "liūdnas", 
"nerimastingas", "ramus", "didelis", "mažas", "galingas", "silpnas", "daugelis", "mažai", "šviesus", "tamsus", "nepaprastas", "įprastas", 
"nepaprastas", "įdomus", "nuobodus", "sveikas", "ligotas", "pilnas", "tuščias", "didelis", "mažas", "įtarus", "draugiškas", "priešiškas", 
"nepaklusnus", "paklusnus", "šiltas", "šaltas", "atviras", "uždarytas", "geras", "blogas", "teisingas", "neteisingas", "patikimas", 
"nepatikimas", "drąsus", "bijantis", "patogus", "nepatogus", "patrauklus", "nepatrauklus", "prieinamas", "neprieinamas", "patvarus", 
"nepatvarus", "paslaugus", "nepaslaugus", "greitas", "lėtas", "tiesus", "kreivas", "siauras", "platus", "apvalus","Balta", "Mėlyna", "Žalia", 
"Geltona", "Raudona", "Violetinė", "Auksinė", "Ruda", "Minkšta", "Tamsi", "Ryški", "Drėgnos", "Baltos", "Sviesios", "Tamsios", "Šviesios", 
"Vėsios", "Karštos", "Sviestos", "Kvepiančios", "Saldžios", "Sūrios", "Šarminės", "Aitrios", "Grietinėlės", "Saulės", "Saldžių", "Sūrių", 
"Sviestų", "Šaltų", "Karštų", "Gėlių", "Vaisių", "Pieno", "Medaus", "Miltų", "Vandens", "Debesų", "Dangaus", "Žemės", "Vėjo", "Žalios", "Mėlynos", 
"Rudos", "Baltos", "Žalios", "Raudonos", "Violetinės", "Auksinės", "Juodos", "Baltos","juoda", "Balta", "raudona", "geltona", "žalia", "mėlyna", 
"purpurinė", "tamsusis", "raudona", "geltona", "žalia", "tamsiukė", "sidabrinė", "auksinė", "bronzinė", 
"persikų", "rožinė", "rožinė", "citrinų", "oranžinė", "žali", "oranžinė", "žali", "citrinų", "persikutė", 
"rožinė", "rožė", "raudė", "geltona", "mėlynai", "purpuriukė", "citrinukė","Spinta","Colis","Džiazas","Mazgas","Lempa","Rūkas","Lizdas","Kedras", 
"mėlynai persikų", "mėlynojus", "mėlynė", "gintariukas", "žaliojo", "smaragdo", "žalias", "žalioji", 
"turkio", "akmens", "granato", "rubino", "raudonoji", "topazo","Darbininkas","Sukti","Ropė","Ragauti","Vynuogė","Vijoklis","Kvepalai",
"Statybininkas","Medikas","Gydytojas","Mokytojas","Pro","jis","Inžinierius","Mokslininkas","Rašytojas","Dailininkas","Muzikantas","Fotografas",
"Kirpėjas","Konditeris","Vairuotojas","Statybos","vadybininkas","Inžinierius","Analitikas","Verslininkas","Policininkas","Gaisrininkas",
"Herojus","Žurnalistas","Buhalteris","Direktorius","Technikas","Vadybinis","Sprendimų","priėmėjas",
"Kirpėjas","padėjėjas","Statybos","Darbininkas","Finansininkas","Vadybininkas","Adminas","Policijos", "Komisaras","Gaisri","ninkas",
"Režisierius","Žiniukas","Buhalterė","Specialistas","Progno","zuotojas","Superman","Batman","Wonder Woman","Akys","Dūmai","Migla","Raidės","Šviesa","Bičių",
"The","Flash","Green Lantern","Spider","Man","Iron Man","Captain","America","Black", "Widow","Hulk","Thor","Aquaman","X","Men","Cyclops","Storm","Wolverine",
"Rogue","Gambit","Nightcrawler","Daredevil","Punisher","Green","Arrow","Black","Canary","Starfire","Raven","Beast","Boy","Wonder","Girl","Black","Lightning",
"Martian","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",
"","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",
"","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",
"","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",
"","","","","","","","","","","","","","Cat","Dog","Sun","Moon",
"Fish","Bird","Rain","Snow","Star","Book","Ball","Jump","Cake","Hug","Kiss","Run","Play","Duck","Sing","Bike","Tree","Wind","Fire","Love","Cool","Fast","Soft","Loud","Tiny",
"Big","Cute","Red","Blue","Green","Pink","Gray","Gold","Hot","Cold","Wet","Dry","Fast","Slow","Tall","Short","Hard","Soft","Old","New","Nice","Ripe","Bold","Neat","Flat",
"Deep","Wide","Thin","Fair","Free","Gift","Hope","Kind","Luck","Mild","Puff","Rain","Song","Tide","Vast","Wave","Zest","Beam","Clam","Dawn","Eyes","Fuzz","Glow","Hive","Inch",
"Jazz","Knot","Lamp","Mist","Nest","Oven","Pine","Quad","Rise","Spin","Toad","Urge","Vine","Wisp","Xeno","Yarn","Zest","Aura","Bark","Calm","Daze","Katė","Šuo","Saulė","Mėnulis",
"Žuvis","Paukštis","Lietus","Sniegas","Žvaigždė","Knyga","Kamuolys","Šokti","Pyragas","Apkabinti","Bučiuoti","Aurora","Šuo","Ramumas","Užgimimas","Dramblys","Vytis","Zvimblys",
"Bėgti","Žaisti","Antis","Dainuoti","Dviratis","Medis","Vėjas","Ugnis","Meilė","Geras","Greitas","Minkštas","Garsus","Mažas","Didelis","Mielas","Raudonas","Mėlynas","Žalias",
"Rožinis","Pilka","Auksinis","Karštas","Šaltas","Šlapia","Sausas","Sparčiai","Lėtai","Aukštas","Žemas","Sunkus","Minkštas","Senas","Naujas","Geras","Brandus","Ryškus","Tvirtas",
"Lygus","Gili","Platus","Plonas","Šviesus","Laisvas","Dovana","Viltis","Geras","Malonus","Švelnus","Pūkuotas","Lietus","Daina","Bangos","Platus","Bangos","Šviesa","Užuolaida",
"Rytas","Kvadratas","Kilti","Katinas","Šuo","Lokys","Liūtas","Vilkas","Tigras","Sliekas","Meška","Gorila","Bebras","Ragana","Šikšnosparnis","Pingvinas","Paukštis","Paukščiukas",
"Varlė","Uodas","Kurmis","Elnias","Rykliai","Delfinas","Gyvatė","Krokodilas","žuvis","Strutis","Pelikanas","Beždžionė","Skruzdė","Vabzdys","Dėmėtas suo","Pelekas","Zebras",
"Arklys","triušis","Žiurkėnas","Žirafa","Šikšnosparnis","Paukščiukas","Pūkuotas","kiškis","Lapė","Servalas","Orka","Beždžionė","banginis","Pelė","Gyvate","Varlė","Austriakiai",
"Avis","Ožka","Veršis","Karvė","Paukštis","Jautis","Ežys","Lapė","Meška","Didysis kalnas","Stirna","Sniego leopardas","Žiurkė","Paukščiukas","Stumbro","vaikas","Beždžionė",
"Zebras","Sraigė","Lapė","Kengūra","Vilkas","Paukščiukas","Tigras","Lokys","Ragana","Meška","Sliekas","Paukštis","Bebras","Dramblys","Liūtas","Katinas","Šuo","Uodas","Gorila",
"Elnias","Ragana","Pingvinas","Paukštis","Žiurkė","Krokodilas","Delfinas","Beždžionė","Pelė","Vabzdys","Strutis","Varlė","Vaivorykštės","žuvis","Pelekas","Žirafa","Servalas","",
"","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",
"","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",
"","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",
"","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",
"","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",
"","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",
"","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",
"","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",
"","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""];

let getRandomNumber = (max) => Math.floor(Math.random() * max)

// Function to generate a random name
let getRandomName = () => {

  const randomFirstName = firstNames[getRandomNumber(firstNames.length)]
  const randomSecondName = secondNames[getRandomNumber(secondNames.length)]

  const fullName = `${randomFirstName} ${randomSecondName}`.trim()

  return fullName
}

// Function to handle name generation
let handleNameGeneration = () => {
  const randomName = getRandomName()
  document.getElementById("random-name").innerText = randomName
  document.getElementById("name-input").value = randomName
  navigator.clipboard.writeText(randomName)
}

// Function to generate a random password
let generatePassword = () => {
  const passwordLength = Math.floor(Math.random() * 9) + 8
  let password = ""
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{};':\"\\|,.<>/?`~"
  for (let i = 0; i < passwordLength; i++) {
    password += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  document.getElementById("password").innerHTML = password
  document.getElementById("password-input").value = password

  if (document.queryCommandSupported("copy")) {
    let tempInput = document.createElement("input")
    tempInput.value = password
    document.body.appendChild(tempInput)
    tempInput.select()
    document.execCommand("copy")
    document.body.removeChild(tempInput)
  }
}

// Event listener bindings
document.getElementById("generuoti-varda").addEventListener("click", handleNameGeneration)
document.getElementById("generate-pasword").addEventListener("click", generatePassword)
