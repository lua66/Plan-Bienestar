document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     FORMULARIO GOOGLE
  ========================= */
  const FORM_URL="https://docs.google.com/forms/d/e/1FAIpQLSd8Aa3XbUNnkYVEDa1lKZ7mTeP-T2QLguIFR6fdmXS6iekeHQ/viewform?usp=publish-editor";


  /* =========================
     1) DATOS SEMANA (TUS TEXTOS EXACTOS)
  ========================= */
  const DAYS = ["L","M","X","J","V","S","D"];
  const FULL = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];

  const WEEK = [
    {
      diet:`DESAYUNO (9:30 aprox)
• Café o infusión
• Yogur natural con nueces
• 1 fruta (kiwi o manzana)

COMIDA
• Verduras cocinadas (calabacín, zanahoria o judía verde)
• Proteína suave: pescado blanco
• Aceite de oliva (poco)

CENA (antes de las 21:00)
• Crema de verduras o caldo
• Huevo
• Fruta`,
      work:`• Al levantarte: estiramientos 20 min
• 2 minutos de respiración profunda`
    },
    {
      diet:`DESAYUNO (9:30 aprox)
• Café o infusión
• 1 tostada integral
• Medio aguacate
• 1 huevo

COMIDA
• Verduras cocinadas o salteadas suaves
• Proteína: pechuga de pollo
• Pequeña ración de arroz
• Fruta

CENA (antes de las 21:00)
• Ensalada
• Proteína ligera
• Yogur`,
      work:`• Al levantarte: estiramientos 20 min
• 3 minutos de respiración profunda en posición yoga`
    },
    {
      diet:`DESAYUNO (9:30 aprox)
• Café o infusión
• Yogur natural o kéfir
• Avena suave (2–3 cucharadas)
• Canela y fruta cocida

COMIDA
• Verduras cocinadas (brócoli, calabaza o zanahoria)
• Proteína: salmón
• Pequeña ración de legumbres (lentejas o garbanzos)

CENA (antes de las 21:00)
• Verduras cocinadas o crema
• Proteína ligera
• Sin pan, sin dulce`,
      work:`• Al levantarte: estiramientos 20 min
• Sentadillas espalda en la pared (20 seg x 2)
• 3 minutos de respiración en posición yoga`
    },
    {
      diet:`DESAYUNO (9:30 aprox)
• Café o infusión
• Tostada integral con queso crema y pavo
• Aceite de oliva

COMIDA
• Ensalada (zanahoria, lechuga, brócoli, tomate y queso)
• Proteína: pescado imperial
• Pequeña ración de patata

CENA (antes de las 21:00)
• Crema de verduras con jamón dulce
• 1 manzana`,
      work:`• Al levantarte: estiramientos 20 min
• Sentadillas espalda en la pared (30 seg x 2)
• 3 minutos de respiración en posición yoga`
    },
    {
      diet:`DESAYUNO (9:30 aprox)
• Café o infusión
• Yogur natural o kéfir
• 1 fruta (plátano)

COMIDA (más severo)
• Verduras cocinadas (calabacín, judía verde, zanahoria)
• Proteína ligera: entrecot
• Naranja

CENA (antes de las 21:00)
• Crema de verduras o caldo
• Sin pan, sin postre`,
      work:`• Al levantarte: estiramientos 20 min
• Sentadillas espalda en la pared (40 seg x 2)
• 3 minutos de respiración en posición yoga`
    },
    {
      diet:`Hoy decides tú
✔ Desayuna normal
✔ Come algo que te guste y dobla la proteína 
✔ Si quieres un postre, disfrutalo sin culpas
✔ Cena ligero
Disfruta el día sin culpa.`,
      work:`• Muévete como te apetezca
• Pasear, ordenar la casa o descansar
• Cualquier movimiento cuenta`
    },
    {
      diet:`Alimentación tranquila
• Come despacio
• Prioriza comida casera
• Cena ligera para empezar bien la semana`,
      work:`Reto del domingo
• Caminar 45 minutos
• Ritmo cómodo, sin prisas
• Disfruta el paseo`
    }
  ];


  /* =========================
     2) ESTADOS + FRASES
  ========================= */

  const STATUS = {
    good:{ e:"😁", p:"Muy bien hoy 💚" },
    mid: { e:"😯", p:"Vas bien, sigue 💚" },
    bad: { e:"😴", p:"Mañana seguimos 💚" }
  };

  const PHRASES = {
    good:[
      "Hoy sumaste salud. Eso vale muchísimo 💚",
      "Constancia tranquila: así se consigue 💚",
      "Hoy lo hiciste muy bien. Sigue así 💚"
    ],
    mid:[
      "No hace falta perfecto, hace falta constante 💚",
      "Un paso pequeño hoy, un cambio grande en 3 meses 💚",
      "Lo importante es volver al plan sin culpa 💚"
    ],
    bad:[
      "Descansar también es avanzar. Sin culpa 💚",
      "Hoy no salió, mañana sí. Tú puedes 💚",
      "Tu objetivo sigue ahí. Solo continúa 💚"
    ]
  };

  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const progress = Array.from({length:7}, () => ({ diet:false, work:false }));
  let currentDay = 0;

  const getState = (i) => {
    const d = progress[i];
    if (d.diet && d.work) return "good";
    if (d.diet || d.work) return "mid";
    return "bad";
  };

  const todayIndex = () => {
    const d = new Date().getDay();
    return d === 0 ? 6 : d - 1;
  };


  /* =========================
     3) UI
  ========================= */

  const homeCard = document.getElementById("homeCard");
  const dayCard  = document.getElementById("dayCard");
  const gymCard  = document.getElementById("gymCard");
  const commitCard = document.getElementById("commitCard");

  function show(section){
    homeCard.style.display="none";
    dayCard.style.display="none";
    gymCard.style.display="none";
    commitCard.style.display="none";
    section.style.display="block";
  }

  function renderHome(){
    const weekGrid = document.getElementById("weekGrid");
    weekGrid.innerHTML="";

    for(let i=0;i<7;i++){
      const st=getState(i);
      const div=document.createElement("div");
      div.className=`dayBtn ${st}`;
      div.innerHTML=`<div class="dow">${DAYS[i]}</div><div class="emoji">${STATUS[st].e}</div>`;
      div.onclick=()=>{currentDay=i;renderDay();};
      weekGrid.appendChild(div);
    }

    const stToday=getState(todayIndex());
    document.getElementById("phraseText").textContent=pick(PHRASES[stToday]);
    document.getElementById("phraseHint").textContent="Consejo: entra en tu día y marca Dieta/Ejercicio cuando lo completes.";

    show(homeCard);
  }

  function renderDay(){
    const st=getState(currentDay);
    document.getElementById("dayTitle").textContent=FULL[currentDay];
    document.getElementById("dayMood").textContent=`${STATUS[st].e} ${STATUS[st].p}`;
    document.getElementById("dietText").textContent=WEEK[currentDay].diet;
    document.getElementById("workText").textContent=WEEK[currentDay].work;
    document.getElementById("dietToggle").classList.toggle("on",progress[currentDay].diet);
    document.getElementById("workToggle").classList.toggle("on",progress[currentDay].work);
    show(dayCard);
  }

  document.getElementById("dietToggle").onclick=()=>{
    progress[currentDay].diet=!progress[currentDay].diet;
    renderDay();
  };

  document.getElementById("workToggle").onclick=()=>{
    progress[currentDay].work=!progress[currentDay].work;
    renderDay();
  };

  document.getElementById("closeDay").onclick=renderHome;
  document.getElementById("btnHome").onclick=renderHome;

  document.getElementById("openCommit").onclick=()=>show(commitCard);
  document.getElementById("closeCommit").onclick=renderHome;
  document.getElementById("goToForm").onclick=()=>window.open(FORM_URL,"_blank");


  /* =========================
     GYM COMPLETO
  ========================= */

  const gymData={
    yoga:{
      title:"CLASES DE YOGA",
      subtitle:"Tu dosis semanal de paz y equilibrio 🧘‍♀️",
      days:[
        ["Lunes","Yoga para despertar el cuerpo","https://youtu.be/v7AYKMP6rOE"],
        ["Martes","Yoga para la salud de tu espalda","https://youtu.be/pYqd8fZR_YE"],
        ["Miércoles","Flexibilidad y apertura de cadera","https://www.youtube.com/shorts/sljcy0UTfL4?feature=share"],
        ["Jueves","Flow dinámico suave","https://youtu.be/BfBgJ-ljQ8Q"],
        ["Viernes","Relajación profunda ante el estrés","https://youtu.be/tYwnSBkc_To"]
      ]
    },
    pilates:{
      title:"CLASES DE PILATES",
      subtitle:"Control, fuerza y postura 🤸",
      days:[
        ["Lunes","Pilates para principiantes (20 min)","https://youtu.be/U_b4jsAK644"],
        ["Martes","Core y abdominales hipopresivos","https://youtu.be/l2CWqDMxRQY"],
        ["Miércoles","Pilates con silla para casa","https://youtu.be/k7e8dgig_cs"],
        ["Jueves","Glúteos y piernas de acero","https://youtu.be/jFQIewEEf9o"],
        ["Viernes","Pilates Total Body Flow","https://youtu.be/uqe5tz0UNEM"]
      ]
    },
    tonificacion:{
      title:"TONIFICACIÓN",
      subtitle:"Fuerza y definición muscular 💪",
      days:[
        ["Lunes","Tonificación de brazos y hombros","https://youtu.be/ERpr_cBUT-4"],
        ["Martes","Rutina GAP","https://youtu.be/ERpr_cBUT-4"],
        ["Miércoles","Full Body con peso ligero","https://youtu.be/MIggnK1WwFE"],
        ["Jueves","Espalda sana y firme","https://youtu.be/iUJasLbuN3Q"],
        ["Viernes","Circuito quemagrasas intenso","https://youtu.be/whT8Q2vE5Tg"]
      ]
    }
  };

  document.querySelectorAll(".gymItem").forEach(item=>{
    item.onclick=()=>{
      const key=item.dataset.gym;
      const data=gymData[key];
      document.getElementById("gymTitle").textContent=data.title;
      document.getElementById("gymSubtitle").textContent=data.subtitle;
      const gymDays=document.getElementById("gymDays");
      gymDays.innerHTML="";
      data.days.forEach(d=>{
        const div=document.createElement("div");
        div.className="gymDay";
        div.innerHTML=`<span>${d[0]} · ${d[1]}</span><span>›</span>`;
        div.onclick=()=>window.open(d[2],"_blank","noopener");
        gymDays.appendChild(div);
      });
      show(gymCard);
    };
  });

  document.getElementById("closeGym").onclick=renderHome;

  /* START */
  currentDay=todayIndex();
  renderHome();

});

