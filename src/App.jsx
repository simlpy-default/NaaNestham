import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Phone, Mail, MapPin, Heart, Calendar, Users, 
  BookOpen, User, Languages, CheckCircle, Smartphone, Camera, 
  Facebook, ChevronRight, ArrowLeft, Youtube
} from 'lucide-react';

// --- DATA: TRUST INFO & TRUSTEES ---

const TRUST_INFO = {
  name_en: "NAA NESTHAM CHARITABLE TRUST",
  name_te: "నా నేస్తం చారిటబుల్ ట్రస్ట్",
  reg_no: "Regd. No. 185/2013",
  tagline_en: "Service without greed. Empowering the old, poor, and youth.",
  tagline_te: "ప్రార్థించే పెదవుల కన్నా సహాయం చేసే చేతులు మిన్న.",
  est: "Est. 2013",
  batch: "ZPSS Eligaid 1987-88 SSC Batch",
  batch_te: "ZPSS ఎలిగేడు 1987-88 SSC బ్యాచ్",
  builder: "Bhanu Prasad Vengaladas",
  facebook_url: "https://www.facebook.com/naanestham2013",
  youtube_url: "https://www.youtube.com/@naanesthamnaanestham7868",
  email: "naanestham2013@gmail.com"
};

// UPDATED TRUST COMMITTEE (11th Anniversary - New Body)
const HEADS = [
  // --- Honorary Presidents ---
  { name_en: "Bairi Purnachander", name_te: "బైరి పూర్ణ చందర్", role_en: "Honorary President", role_te: "గౌరవ అధ్యక్షుడు", image: "/images/trustees/purnachander.jpeg" },
  { name_en: "Arshanapelli Rajeshwar Rao", name_te: "అర్షనపెల్లి రాజేశ్వర్ రావు", role_en: "Honorary President", role_te: "గౌరవ అధ్యక్షుడు", image: null },
  { name_en: "Devasani Srinivas", name_te: "దేవసాని శ్రీనివాస్", role_en: "Honorary President", role_te: "గౌరవ అధ్యక్షుడు", image: "/images/trustees/srinivas_d.jpg" },
  { name_en: "Burla Venkateshwarlu", name_te: "బూర్ల వెంకటేశ్వర్లు", role_en: "Honorary President", role_te: "గౌరవ అధ్యక్షుడు", image: "/images/trustees/venkateshwarlu.jpeg" },
  { name_en: "Penta Srinivas", name_te: "పెంట శ్రీనివాస్", role_en: "Honorary President", role_te: "గౌరవ అధ్యక్షుడు", image: "/images/trustees/srinivas_p.jpeg" },

  // --- Main Executive Committee ---
  { name_en: "Katla Satyanarayana", name_te: "కట్ల సత్యనారాయణ", role_en: "President", role_te: "అధ్యక్షుడు", image: "/images/trustees/satyanarayana.jpeg" },
  { name_en: "Veeragoni Laxmi Narayana", name_te: "వీరగోని లక్ష్మి నారాయణ", role_en: "General Secretary", role_te: "ప్రధాన కార్యదర్శి", image: "/images/trustees/laxminarayana.jpeg" },
  { name_en: "Ponaganti Sumathi", name_te: "పొనగంటి సుమతి", role_en: "Women's President", role_te: "మహిళా అధ్యక్షురాలు", image: null },
  { name_en: "Vala Neeraja", name_te: "వాల నీరజ", role_en: "Women's Secretary", role_te: "మహిళా కార్యదర్శి", image: null },
  { name_en: "Asampalli Shankar", name_te: "ఆసంపల్లి శంకర్", role_en: "Treasurer", role_te: "కోశాధికారి", image: null },
  { name_en: "Busarapu Srinivas", name_te: "బూసారపు శ్రీనివాస్", role_en: "Executive Secretary", role_te: "నిర్వాహక కార్యదర్శి", image: null },
  { name_en: "Rangu Ramulu", name_te: "రంగు రాములు", role_en: "Joint Secretary", role_te: "సహాయ కార్యదర్శి", image: null },

  // --- Vice Presidents ---
  { name_en: "Thaniparthi Sudhakar Rao", name_te: "తానిపర్తి సుధాకర్ రావు", role_en: "Vice President", role_te: "ఉపాధ్యక్షుడు", image: null },
  { name_en: "Vala Neeraja", name_te: "వాల నీరజ", role_en: "Vice President", role_te: "ఉపాధ్యక్షురాలు", image: null },
  { name_en: "Vengaldas Ashok", name_te: "వెంగళదాస్ అశోక్", role_en: "Vice President", role_te: "ఉపాధ్యక్షుడు", image: "/images/trustees/ashok.jpeg" },
  { name_en: "Vanga Satyanarayana", name_te: "వంగ సత్యనారాయణ", role_en: "Vice President", role_te: "ఉపాధ్యక్షుడు", image: null },
  { name_en: "Kothireddy Mallareddy", name_te: "కొత్తిరెడ్డి మల్లారెడ్డి", role_en: "Vice President", role_te: "ఉపాధ్యక్షుడు", image: null },
  { name_en: "Baireddy Rajireddy", name_te: "బైరెడ్డి రాజిరెడ్డి", role_en: "Vice President", role_te: "ఉపాధ్యక్షుడు", image: "/images/trustees/rajireddy.jpg" },

  // --- Organizing Secretaries ---
  { name_en: "Vanga Srishailam", name_te: "వంగ శ్రీశైలం", role_en: "Organizing Secretary", role_te: "ఆర్గనైజింగ్ కార్యదర్శి", image: null },
  { name_en: "Namani Suvarna", name_te: "నామని సువర్ణ", role_en: "Organizing Secretary", role_te: "ఆర్గనైజింగ్ కార్యదర్శి", image: "/images/trustees/suvarna.jpg" },
  { name_en: "Katla Sampath", name_te: "కట్ల సంపత్", role_en: "Organizing Secretary", role_te: "ఆర్గనైజింగ్ కార్యదర్శి", image: null },
  { name_en: "Pegada Swarnalatha", name_te: "పెగడ స్వర్ణలత", role_en: "Organizing Secretary", role_te: "ఆర్గనైజింగ్ కార్యదర్శి", image: null },

  // --- Information Secretaries ---
  { name_en: "Burra Anjaneyulu", name_te: "బుర్ర ఆంజనేయులు", role_en: "Information Secretary", role_te: "సమాచార కార్యదర్శి", image: null },
  { name_en: "Kunta Anil Kumar", name_te: "కుంట అనిల్ కుమార్", role_en: "Information Secretary", role_te: "సమాచార కార్యదర్శి", image: null },

  // --- Executive Members ---
  { name_en: "Arshanapelli Laxmi", name_te: "అర్షనపెల్లి లక్ష్మి", role_en: "Executive Member", role_te: "కార్యవర్గ సభ్యురాలు", image: null },
  { name_en: "Singireddy Vijayareddy", name_te: "సింగిరెడ్డి విజయారెడ్డి", role_en: "Executive Member", role_te: "కార్యవర్గ సభ్యురాలు", image: null },
  { name_en: "Theetla Ramesh", name_te: "తీట్ల రమేష్", role_en: "Executive Member", role_te: "కార్యవర్గ సభ్యుడు", image: null },
  { name_en: "K. Satyanarayana", name_te: "కె. సత్యనారాయణ", role_en: "Executive Member", role_te: "కార్యవర్గ సభ్యుడు", image: null },
  { name_en: "Palle Veeraswamy", name_te: "పల్లె వీరాస్వామి", role_en: "Executive Member", role_te: "కార్యవర్గ సభ్యుడు", image: null },
  { name_en: "A. Kanukaiah", name_te: "ఏ. కనుకయ్య", role_en: "Executive Member", role_te: "కార్యవర్గ సభ్యుడు", image: null },
  { name_en: "B. Ashok", name_te: "బి.అశోక్", role_en: "Executive Member", role_te: "కార్యవర్గ సభ్యుడు", image: null },
];

// --- DATA: EVENTS TIMELINE ---
const ALL_EVENTS = [
  {
    id: 101,
    year: "2024",
    date: "2024-06-10",
    title_en: "Driving School Applications Invited",
    title_te: "డ్రైవింగ్ స్కూల్ దరఖాస్తుల ఆహ్వానం",
    desc_en: "Inviting applications from unemployed youth of Eligaid mandal for the new batch of free car driving training. Training starts June 17th.",
    desc_te: "ఎలిగేడు మండల నిరుద్యోగ యువకుల నుండి కార్ డ్రైవింగ్ శిక్షణకు దరఖాస్తులు ఆహ్వానిస్తున్నాం. జూన్ 17న శిక్షణ ప్రారంభం.",
    category: "Skill Development",
    images: ["/images/car2.jpg","/images/car1.jpg"] 
  },
  {
    id: 102,
    year: "2024",
    date: "2024-03-08",
    title_en: "Seva Bhavanam & Driving School Inauguration",
    title_te: "సేవా భవనం & డ్రైవింగ్ స్కూల్ ప్రారంభం",
    desc_en: "Grand opening of Naa Nestham Seva Bhavanam and permanent Driving School at Hanuman Nagar, Eligaid.",
    desc_te: "ఎలిగేడు హనుమాన్ నగర్ లో నా నేస్తం సేవా భవనం మరియు డ్రైవింగ్ స్కూల్ ప్రారంభోత్సవం.",
    category: "Infrastructure",
    images: ["/images/seva0.jpg","/images/seva5.jpg", "/images/seva1.jpg","/images/seva2.jpg","/images/seva3.jpg","/images/seva4.jpg","/images/seva6.jpg","/images/seva7.jpg","/images/seva8.jpg"]
  },
  {
    id: 201,
    year: "2023",
    date: "2023-07-23",
    title_en: "Aid to NEET Ranker",
    title_te: "నీట్ ర్యాంకర్ కు ఆర్థిక సాయం",
    desc_en: "Provided ₹25,016 financial assistance to Keerthi Sharanya of Sultanpur, who secured 979 rank in NEET, for her MBBS studies.",
    desc_te: "నీట్ లో 979 ర్యాంకు సాధించిన సుల్తాన్ పూర్ విద్యార్థిని కీర్తి శరణ్యకు ఎంబిబిఎస్ చదువు కోసం రూ. 25,016 సాయం.",
    category: "Education",
    images: ["/images/neet1.jpg","/images/neet2.jpg","/images/neet3.jpg"]
  },
  {
    id: 202,
    year: "2023",
    date: "2023-06-23",
    title_en: "Vaikunta Ratham Dedication",
    title_te: "వైకుంఠ రథం అంకితం",
    desc_en: "Dedication of the Hearse Vehicle (Vaikunta Ratham) to the people of Eligaid Mandal. Inaugurated at Madhura Function Hall.",
    desc_te: "ఎలిగేడు మండల ప్రజల అవసరార్థం వైకుంఠ రథం (అంతిమ యాత్ర వాహనం) ప్రారంభం.",
    category: "Service",
    images: ["/images/v0.jpg","/images/v1.jpg","/images/v2.jpg","/images/v3.jpg","/images/v4.jpg","/images/v5.jpg"]
  },
  {
    id: 203,
    year: "2023",
    date: "2023-05-13",
    title_en: "Body Freezer Donation",
    title_te: "బాడీ ఫ్రీజర్ విరాళం",
    desc_en: "Donated a Body Freezer worth ₹55,000 in memory of Late Katla Venkatarajam for public use in Eligaid.",
    desc_te: "కీ.శే. కట్ల వెంకటరాజం జ్ఞాపకార్థం రూ. 55,000 విలువైన బాడీ ఫ్రీజర్ ప్రజలకు అంకితం.",
    category: "Service",
    images: ["/images/free00.jpg","/images/free01.jpg","/images/free1.jpg","/images/free2.jpg"]
  },
  {
    id: 204,
    year: "2023",
    date: "2023-04-21",
    title_en: "Vehicle Purchase for Ratham",
    title_te: "వైకుంఠ రథం వాహన కొనుగోలు",
    desc_en: "Trustees purchased a new vehicle costing ₹9.5 Lakhs (with body building) for the Vaikunta Ratham project.",
    desc_te: "వైకుంఠ రథం తయారీ కోసం కొత్త వాహనం కొనుగోలు.",
    category: "Infrastructure",
    images: ["/images/buy0.jpg","/images/buy1.jpg","/images/buy2.jpg"]
  },
  {
    id: 301,
    year: "2022",
    date: "2022-10-24",
    title_en: "Support for Orphan Siblings",
    title_te: "అనాథలకు ఆర్థిక సాయం",
    desc_en: "Provided ₹20,000 financial aid and ₹5,000 worth of essentials to siblings in Katnapally who lost both parents.",
    desc_te: "కాట్నపల్లిలో తల్లిదండ్రులను కోల్పోయిన అన్నాచెల్లెళ్లకు రూ. 20,000 ఆర్థిక సాయం మరియు రూ. 5,000 నిత్యావసరాలు.",
    category: "Social Welfare",
    images: ["/images/sib0.jpg","/images/sib1.jpg","/images/sib2.jpg","/images/sib3.jpg","/images/sib4.jpg","/images/sib5.jpg"]
  },
  {
    id: 302,
    year: "2022",
    date: "2022-09-25",
    title_en: "9th Anniversary & Medical Camp",
    title_te: "9వ వార్షికోత్సవం & వైద్య శిబిరం",
    desc_en: "Massive free medical camp organized in Eligaid with CVVM Hospital Karimnagar on the occasion of 9th Anniversary.",
    desc_te: "9వ వార్షికోత్సవం సందర్భంగా ఎలిగేడులో CVVM హాస్పిటల్ సౌజన్యంతో భారీ ఉచిత వైద్య శిబిరం.",
    category: "Health",
    images: ["/images/nine0.jpg","/images/nine1.jpg","/images/nine2.jpg","/images/nine3.jpg","/images/nine4.jpg","/images/nine5.jpg","/images/nine6.jpg","/images/nine7.jpg","/images/nine8.jpg","/images/nine9.jpg","/images/nine10.jpg","/images/nine11.jpg","/images/nine12.jpg","/images/nine13.jpg"]
  },
  {
    id: 303,
    year: "2022",
    date: "2022-08-29",
    title_en: "Education Aid in Dhulikatta",
    title_te: "విద్యార్థినికి ఆర్థిక సాయం",
    desc_en: "Provided ₹10,000 and essentials for a poor student's education in Dhulikatta.",
    desc_te: "ధూళికట్టలో నిరుపేద విద్యార్థిని చదువు కోసం రూ. 10,000 మరియు నిత్యావసరాలు.",
    category: "Education",
    images: ["/images/d1.png"]
  },
  {
    id: 304,
    year: "2022",
    date: "2022-08-15",
    title_en: "Merit Awards (Independence Day)",
    title_te: "ప్రతిభ పురస్కారాలు",
    desc_en: "₹5,000 cash prize awarded to top performing 10th-grade students in Eligaid.",
    desc_te: "స్వాతంత్ర దినోత్సవం నాడు పదవ తరగతిలో ఉత్తమ గ్రేడు సాధించిన విద్యార్థులకు రూ. 5000 బహుమతి.",
    category: "Education",
    images: ["/images/temp0.png","/images/temp1.png"]
  },
  {
    id: 305,
    year: "2022",
    date: "2022-07-28",
    title_en: "Trust Family Tour",
    title_te: "విహార యాత్ర",
    desc_en: "One day tour to Devunipalli with trust family members to strengthen bonds.",
    desc_te: "దేవునిపల్లికి ట్రస్ట్ కుటుంబ సభ్యులతో ఒకరోజు విహార యాత్ర.",
    category: "Community",
    images: ["/images/tour0.png","/images/tour1.png","/images/tour2.png"]
  },
  {
    id: 306,
    year: "2022",
    date: "2022-07-06",
    title_en: "Notebook Distribution",
    title_te: "నోట్ పుస్తకాల పంపిణీ",
    desc_en: "Distributed notebooks worth ₹20,000 to 120 students at ZPSS Eligaid High School.",
    desc_te: "జడ్పీ హైస్కూల్ ఎలిగేడులోని 120 మంది విద్యార్థులకు రూ. 20,000 విలువైన నోటు పుస్తకాల పంపిణీ.",
    category: "Education",
    images: ["/images/book0.jpg","/images/book1.jpg","/images/book2.jpg","/images/book3.jpg","/images/book4.jpg","/images/book5.jpg","/images/book6.jpg"]
  },
  {
    id: 401,
    year: "2021",
    date: "2021-06-27",
    title_en: "Aid to Trust Member's Family",
    title_te: "ట్రస్ట్ సభ్యుని కుటుంబానికి సాయం",
    desc_en: "₹30,000 financial aid and essentials to member V. Prakash's family in Sultanpur after his wife's demise due to Covid.",
    desc_te: "సుల్తాన్ పూర్ లో ట్రస్ట్ సభ్యుడు వి. ప్రకాష్ భార్య కరోనాతో మరణించగా, ఆ కుటుంబానికి రూ. 30,000 మరియు నిత్యావసరాలు.",
    category: "Social Welfare",
    images: ["/images/co1.jpg","/images/co2.jpg","/images/co3.jpg"]
  },
  {
    id: 501,
    year: "2020",
    date: "2020-04-25",
    title_en: "COVID-19 Relief",
    title_te: "కరోనా సహాయక చర్యలు",
    desc_en: "Distributed essentials worth ₹35,000 to 55 sanitation workers and poor families in Eligaid, Dhulikatta, Narsapur during lockdown.",
    desc_te: "కరోనా లాక్ డౌన్ సమయంలో 55 పారిశుద్ధ్య కార్మికులు మరియు నిరుపేద కుటుంబాలకు రూ. 35,000 విలువైన నిత్యావసరాల పంపిణీ.",
    category: "Disaster Relief",
    images: ["/images/c0.jpg","/images/c1.jpg","/images/c2.jpg","/images/c3.jpg","/images/c4.jpg","/images/c5.jpg","/images/c6.jpg","/images/c7.jpg","/images/c8.jpg","/images/c9.jpg","/images/c10.jpg"]
  },
  {
    id: 601,
    year: "2019",
    date: "2019-12-15",
    title_en: "Accident Victim Aid",
    title_te: "ప్రమాద బాధితులకు సాయం",
    desc_en: "₹7,500 aid to Bauthu Kumar's family in Nyatakanipalli who died in a bus accident.",
    desc_te: "న్యాతకానిపల్లిలో బస్సు ప్రమాదంలో మరణించిన బౌతు కుమార్ కుటుంబానికి రూ. 7,500 సాయం.",
    category: "Social Welfare",
    images: ["/images/acc0.jpg"]
  },
  {
    id: 602,
    year: "2019",
    date: "2019-09-14",
    title_en: "Education Aid",
    title_te: "విద్యాభ్యాసానికి సాయం",
    desc_en: "₹15,500 aid provided for G. Ratnamala's daughter's education after her father's death.",
    desc_te: "జి. రత్నమాల భర్త మరణించగా, ఆమె కూతురి విద్యాభ్యాసానికి రూ. 15,500 ఆర్థిక సాయం.",
    category: "Education",
    images: ["/images/ed0.jpg","/images/ed1.jpg","/images/ed2.jpg","/images/ed3.jpg"]
  },
  {
    id: 603,
    year: "2019",
    date: "2019-06-30",
    title_en: "Kaleshwaram Project Tour",
    title_te: "కాళేశ్వరం ప్రాజెక్టు సందర్శన",
    desc_en: "Trust members and families visited the Kaleshwaram Project.",
    desc_te: "నా నేస్తం బృందం కాళేశ్వరం ప్రాజెక్టు సందర్శన.",
    category: "Community",
    images: ["/images/k0.png","/images/k1.png"]
  },
  {
    id: 604,
    year: "2019",
    date: "2019-05-28",
    title_en: "Computer Training Certificates",
    title_te: "కంప్యూటర్ శిక్షణ సర్టిఫికెట్లు",
    desc_en: "Distribution of certificates to students who completed the one-month free computer training.",
    desc_te: "నెల రోజుల ఉచిత కంప్యూటర్ శిక్షణ పూర్తి చేసుకున్న వారికి సర్టిఫికెట్ల ప్రదానం.",
    category: "Skill Development",
    images: ["/images/sp0.jpg","/images/sp1.jpg","/images/sp2.jpg","/images/sp3.jpg","/images/sp4.jpg","/images/sp5.jpg","/images/sp6.jpg","/images/sp7.jpg","/images/sp8.jpg","/images/sp9.jpg","/images/sp10.jpg"]
  },
  {
    id: 605,
    year: "2019",
    date: "2019-04-22",
    title_en: "Computer Training & Tricycle",
    title_te: "కంప్యూటర్ శిక్షణ & మూడు చక్రాల సైకిల్",
    desc_en: "Inaugurated Free Computer Training, distributed driving licenses, and donated a tricycle to a disabled person.",
    desc_te: "ఉచిత కంప్యూటర్ శిక్షణ ప్రారంభం, లైసెన్సుల ప్రదానం మరియు దివ్యాంగునికి రూ. 5000 విలువైన సైకిల్.",
    category: "Skill Development",
    images: ["/images/cp0.jpg","/images/cp1.jpg","/images/cp2.jpg","/images/cp3.jpg","/images/cp4.jpg","/images/cp5.jpg","/images/cp6.jpg"]
  },
  {
    id: 701,
    year: "2018",
    date: "2018-11-21",
    title_en: "Office Relocation",
    title_te: "కార్యాలయం మార్పు",
    desc_en: "Trust office shifted from Jyothinagar to Bank Colony.",
    desc_te: "ట్రస్ట్ కార్యాలయం జ్యోతినగర్ నుండి బ్యాంక్ కాలనీకి మార్చబడింది.",
    category: "Admin",
    images: ["/images/or0.jpg","/images/or1.jpg","/images/or2.jpg","/images/or3.jpg","/images/or4.jpg"]
  },
  {
    id: 7015,
    year: "2018",
    date: "2018-08-15",
    title_en: "Merit Awards & Medals",
    title_te: "ప్రతిభ పురస్కారాలు & పతకాలు",
    desc_en: "Naa Nestham members presented Cash Prize and Medals for X Class toppers of both mediums at ZPHS Eligaid, ZPHS Sultanpur, and ZPHS Dhoolikatta.",
    desc_te: "ZPHS ఎలిగేడు, సుల్తాన్ పూర్ మరియు ధూళికట్ట పాఠశాలల్లో పదవ తరగతి టాపర్లకు నగదు బహుమతులు మరియు పతకాలు అందజేశారు.",
    category: "Education",
    images: ["/images/au0.jpg","/images/au1.jpg","/images/au2.jpg"]
  },
  {
    id: 7016,
    year: "2018",
    date: "2018-06-24",
    title_en: "Learning License Presentation",
    title_te: "లెర్నింగ్ లైసెన్స్ ప్రదానం",
    desc_en: "Aspirants completed training and received Learning licenses. Famous poet Sri Annavaram Devendar presented certificates at Karimnagar Sport School after solo test drives.",
    desc_te: "డ్రైవింగ్ శిక్షణ పూర్తి చేసుకున్న అభ్యర్థులకు కరీంనగర్ స్పోర్ట్స్ స్కూల్ లో ప్రముఖ కవి శ్రీ అన్నవరం దేవేందర్ గారి చేతుల మీదుగా లెర్నింగ్ లైసెన్స్ పత్రాల అందజేత.",
    category: "Skill Development",
    images: ["/images/l0.jpg","/images/l1.jpg","/images/l2.jpg","/images/l3.jpg","/images/l4.jpg","/images/l5.jpg","/images/l6.jpg","/images/l7.jpg"]
  },
  {
    id: 702,
    year: "2018",
    date: "2018-06-03",
    title_en: "Free Car Driving Training Launch",
    title_te: "ఉచిత కార్ డ్రైవింగ్ శిక్షణ ప్రారంభం",
    desc_en: "Launched free car driving training for 15 unemployed youth of Eligaid (License fee only).",
    desc_te: "ఎలిగేడు మండలంలోని 15 మంది నిరుద్యోగ యువతకు ఉచిత కార్ డ్రైవింగ్ శిక్షణ ప్రారంభం.",
    category: "Skill Development",
    images: ["/images/dl0.jpg","/images/dl1.jpg","/images/dl2.jpg","/images/dl3.jpg","/images/dl4.jpg"]
  },
  { 
    id: 703,
    year: "2018",
    date: "2018-02-03",
    title_en: "Water Camp at Jatara",
    title_te: "జాతరలో మినరల్ వాటర్",
    desc_en: "Distributed free mineral water to devotees at Eligaid Sammakka Saralamma Jatara.",
    desc_te: "ఎలిగేడు సమ్మక్క సారలమ్మ జాతరలో భక్తులకు ఉచిత మినరల్ వాటర్ పంపిణీ.",
    category: "Service",
    images: ["/images/water0.jpg","/images/water1.jpg"]
  },
  {
    id: 801,
    year: "2017",
    date: "2017-12-03",
    title_en: "4th Library Setup (Lalapalli)",
    title_te: "లాలపల్లిలో గ్రంథాలయం",
    desc_en: "Established the 4th Library of the Trust in Lalapalli village near Hanuman Temple.",
    desc_te: "లాలపల్లి గ్రామంలో హనుమాన్ దేవాలయం వద్ద 4వ గ్రంథాలయ స్థాపన.",
    category: "Education",
    images: ["/images/ll0.jpg","/images/ll1.jpg","/images/ll2.jpg","/images/ll3.jpg","/images/ll4.jpg","/images/ll5.jpg","/images/ll6.jpg","/images/ll7.jpg"]
  },
  {
    id: 802,
    year: "2017",
    date: "2017-08-14",
    title_en: "3rd Library Setup (Dhulikatta)",
    title_te: "ధూళికట్టలో గ్రంథాలయం",
    desc_en: "Established the 3rd Library of the Trust in Dhulikatta village.",
    desc_te: "ధూళికట్ట గ్రామంలో 3వ గ్రంథాలయ స్థాపన.",
    category: "Education",
    images: ["/images/d0.jpg","/images/d1.jpg","/images/d2.jpg","/images/d3.jpg","/images/d4.jpg","/images/d5.jpg"]
  },
  {
    id: 803,
    year: "2017",
    date: "2017-05-03",
    title_en: "Spoken English Classes",
    title_te: "స్పోకెన్ ఇంగ్లీష్ తరగతులు",
    desc_en: "Started one month free Spoken English classes for 30 students.",
    desc_te: "30 మంది విద్యార్థులకు నెల రోజుల పాటు ఉచిత స్పోకెన్ ఇంగ్లీష్ క్లాసుల నిర్వహణ.",
    category: "Education",
    images: ["/images/spe0.jpg"]
  },
  {
    id: 804,
    year: "2017",
    date: "2017-04-13",
    title_en: "2nd Library Setup (Sultanpur)",
    title_te: "సుల్తాన్ పూర్ లో గ్రంథాలయం",
    desc_en: "Inaugurated a new Library at Sultanpur village.",
    desc_te: "సుల్తాన్ పూర్ గ్రామంలో గ్రంథాలయ ప్రారంభోత్సవం.",
    category: "Education",
    images: ["/images/sl0.jpg","/images/sl1.jpg","/images/sl2.jpg"]
  },
  {
    id: 901,
    year: "2016",
    date: "2016-09-18",
    title_en: "3rd Anniversary & Awards",
    title_te: "తృతీయ వార్షికోత్సవం",
    desc_en: "Celebrated 3rd Anniversary at GAK Gardens, Karimnagar. Distributed merit awards and financial aid to trust members.",
    desc_te: "కరీంనగర్ లోని GAK గార్డెన్స్ లో తృతీయ వార్షికోత్సవం. విద్యార్థులకు మరియు ట్రస్ట్ సభ్యులకు ఆర్థిక సాయం.",
    category: "Celebration",
    images: ["/images/th0.jpg","/images/th1.jpg","/images/th2.jpg","/images/th3.jpg","/images/th3.jpg","/images/th4.jpg","/images/th5.jpg","/images/th6.jpg"]
  },
  {
    id: 902,
    year: "2016",
    date: "2016-09-12",
    title_en: "Library Books Donation",
    title_te: "గ్రంథాలయానికి పుస్తకాలు",
    desc_en: "Donated ₹15,000 worth of competitive exam and personality development books to Eligaid Library.",
    desc_te: "ఎలిగేడు గ్రంథాలయానికి రూ. 15,000 విలువైన పోటీ పరీక్షల మరియు వ్యక్తిత్వ వికాస పుస్తకాలు.",
    category: "Education",
    images: ["/images/e0.jpg","/images/e1.jpg","/images/e2.jpg"]
  },
  {
    id: 903,
    year: "2016",
    date: "2016-06-22",
    title_en: "Aid to Disabled",
    title_te: "వికలాంగునికి ఆర్థిక సాయం",
    desc_en: "Provided financial aid of ₹500/month for one year to Katla Srinivas for medicines.",
    desc_te: "వికలాంగుడు కట్ల శ్రీనివాస్ కు మందుల కొరకు నెలకు రూ. 500 చొప్పున ఏడాది పాటు సాయం.",
    category: "Social Welfare",
    images: []
  },
  {
    id: 904,
    year: "2016",
    date: "2016-04-01",
    title_en: "Chalivendram (Water Kiosk)",
    title_te: "చలివేంద్రం ఏర్పాటు",
    desc_en: "Set up a water kiosk (Chalivendram) near Naa Nestham Library for summer relief.",
    desc_te: "వేసవి దాహార్తిని తీర్చడానికి నా నేస్తం గ్రంథాలయం వద్ద చలివేంద్రం ఏర్పాటు.",
    category: "Service",
    images: []
  },
  {
    id: 1001,
    year: "2015",
    date: "2015-09-20",
    title_en: "2nd Anniversary & Eye Donation",
    title_te: "నేత్రదానం & ద్వితీయ వార్షికోత్సవం",
    desc_en: "Celebrated 2nd Anniversary. Trust members pledged for eye donation.",
    desc_te: "ద్వితీయ వార్షికోత్సవం మరియు ట్రస్ట్ కుటుంబ సభ్యులచే నేత్రదాన ప్రతిజ్ఞ.",
    category: "Celebration",
    images: ["/images/eye0.png"]
  },
  {
    id: 10015,
    year: "2015",
    date: "2015-08-15",
    title_en: "Independence Day Service",
    title_te: "స్వాతంత్ర్య దినోత్సవ సేవ",
    desc_en: "Presented ₹5,000 cash incentives to 10th-grade students at ZPSS Eligaid and distributed 100 meal plates to students at ZPSS Dhulikatta.",
    desc_te: "ఎలిగేడు పదవ తరగతి విద్యార్థులకు రూ. 5000 నగదు ప్రోత్సాహం మరియు ధూళికట్ట పాఠశాల విద్యార్థులకు 100 భోజన ప్లేట్ల పంపిణీ.",
    category: "Education",
    images: ["/images/aid0.png"]
  },
  {
    id: 1002,
    year: "2015",
    date: "2015-07-12",
    title_en: "Blood Donation Camp",
    title_te: "రక్తదాన శిబిరం",
    desc_en: "Organized a voluntary blood donation camp at Krishnaveni Talent School, Sultanabad.",
    desc_te: "సుల్తానాబాద్ లోని కృష్ణవేణి టాలెంట్ స్కూల్ లో రక్తదాన శిబిరం ఏర్పాటు.",
    category: "Health",
    images: ["/images/blood0.jpg"]
  },
  {
    id: 1003,
    year: "2015",
    date: "2015-05-31",
    title_en: "Dictionary Distribution",
    title_te: "డిక్షనరీల బహుకరణ",
    desc_en: "Distributed dictionaries to students who attended the Spoken English classes.",
    desc_te: "స్పోకెన్ ఇంగ్లీష్ తరగతులకు హాజరైన విద్యార్థులకు డిక్షనరీల బహుకరణ.",
    category: "Education",
    images: []
  },
  {
    id: 1004,
    year: "2015",
    date: "2015-01-26",
    title_en: "1st Library Inauguration (Eligaid)",
    title_te: "ఎలిగేడులో గ్రంథాలయం",
    desc_en: "Inaugurated the first Library and Reading Room in Eligaid with daily newspapers and books.",
    desc_te: "ఎలిగేడులో గ్రంథాలయం మరియు పత్రికా పఠనాలయం ప్రారంభం.",
    category: "Education",
    images: []
  },
  {
    id: 1101,
    year: "2014",
    date: "2014-09-22",
    title_en: "1st Anniversary & Family Aid",
    title_te: "ప్రథమ వార్షికోత్సవం",
    desc_en: "1st Anniversary. Provided ₹20,000 aid to families of deceased members Late Rajayya and Laxminarsayya.",
    desc_te: "ప్రథమ వార్షికోత్సవం. కీ.శే. రాజయ్య, లక్ష్మీనర్సయ్య కుటుంబాలకు రూ. 20,000 ఆర్థిక సాయం.",
    category: "Celebration",
    images: ["/images/one0.jpg","/images/one1.jpg","/images/one2.jpg"]
  },
  {
    id: 1102,
    year: "2014",
    date: "2014-07-28",
    title_en: "Donation to Old Age Home",
    title_te: "వృద్ధాశ్రమానికి విరాళం",
    desc_en: "Donated clothes, fruits, and daily items worth ₹30,000 to Karimnagar Old Age Home.",
    desc_te: "కరీంనగర్ వృద్ధాశ్రమంలో రూ. 30,000 విలువైన వస్త్రాలు, పండ్లు మరియు వస్తువుల పంపిణీ.",
    category: "Social Welfare",
    images: ["/images/an0.jpg","/images/an1.jpg","/images/an2.jpg","/images/an3.jpg","/images/an4.jpg","/images/an18.jpg","/images/an19.jpg","/images/an5.jpg","/images/an6.jpg","/images/an7.jpg","/images/an8.jpg","/images/an9.jpg","/images/an10.jpg","/images/an11.jpg","/images/an12.jpg","/images/an13.jpg","/images/an14.jpg","/images/an15.jpg","/images/an16.jpg","/images/an17.jpg"]
  },
  {
    id: 1103,
    year: "2014",
    date: "2014-07-11",
    title_en: "Scout Dress Donation",
    title_te: "స్కౌట్ డ్రెస్ల బహుకరణ",
    desc_en: "Donated scout dresses worth ₹20,000 to students at Kasturba Vidyalaya, Tangallapalli.",
    desc_te: "కస్తూర్బా విద్యాలయం తంగళ్లపల్లిలో రూ. 20,000 విలువైన స్కౌట్ డ్రెస్ల బహుకరణ.",
    category: "Education",
    images: ["/images/dr0.jpg","/images/dr1.jpg","/images/dr2.jpg","/images/dr3.jpg","/images/dr4.jpg","/images/dr5.jpg","/images/dr6.jpg","/images/dr7.jpg","/images/dr8.jpg",]
  },
  {
    id: 1104,
    year: "2014",
    date: "2014-01-19",
    title_en: "Mega Medical Camp",
    title_te: "ఉచిత వైద్య శిబిరం",
    desc_en: "Conducted a free medical camp in Dhulikatta. Medicines worth ₹50,000 distributed to 500 patients.",
    desc_te: "ధూళికట్టలో ఉచిత వైద్య శిబిరం. 500 మంది రోగులకు రూ. 50,000 విలువైన మందుల పంపిణీ.",
    category: "Health",
    images: ["/images/mc0.jpg","/images/mc1.jpg","/images/mc2.jpg","/images/mc3.jpg","/images/mc4.jpg","/images/mc5.jpg","/images/mc6.jpg","/images/mc7.jpg","/images/mc8.jpg","/images/mc9.jpg","/images/mc10.jpg","/images/mc11.jpg","/images/mc12.jpg","/images/mc13.jpg","/images/mc14.jpg"]
  },
  {
    id: 1201,
    year: "2013",
    date: "2013-10-02",
    title_en: "Blood Donation Camp",
    title_te: "రక్తదాన శిబిరం",
    desc_en: "Organized first voluntary blood donation camp at Eligaid High School on Gandhi Jayanthi.",
    desc_te: "గాంధీ జయంతి సందర్భంగా ఎలిగేడు ఉన్నత పాఠశాల ఆవరణలో స్వచ్ఛంద రక్తదాన శిబిరం.",
    category: "Health",
    images: ["/images/bc0.jpg","/images/bc1.jpg","/images/bc2.jpg","/images/bc3.jpg","/images/bc4.jpg","/images/bc5.jpg"]
  },
  {
    id: 1202,
    year: "2013",
    date: "2013-09-23",
    title_en: "First Donations",
    title_te: "పాఠశాలకు విరాళం",
    desc_en: "Donated ₹25,000 to ZPSS Eligaid and ₹5,000 to a dog bite victim immediately after trust formation.",
    desc_te: "ZPSS ఎలిగేడు పాఠశాలకు రూ. 25,000 విరాళం మరియు కుక్కకాటు బాధితురాలికి సాయం.",
    category: "Social Welfare",
    images: []
  },
  {
    id: 1203,
    year: "2013",
    date: "2013-09-22",
    title_en: "Trust Formation & Reunion",
    title_te: "ట్రస్ట్ ఏర్పాటు & సమ్మేళనం",
    desc_en: "The 1987-88 SSC batch reunited after 25 years and formed 'Naa Nestham Charitable Trust' to serve society.",
    desc_te: "1987-88 SSC బ్యాచ్ మిత్రుల సమ్మేళనం మరియు సేవా లక్ష్యంతో ట్రస్ట్ ఏర్పాటు.",
    category: "Admin",
    images: ["/images/first.jpg","/images/first1.jpg",]
  }
];

// --- COMPONENTS ---

// 1. Language Toggle Button
const LangToggle = ({ lang, setLang }) => (
  <button
    onClick={() => setLang(lang === 'en' ? 'te' : 'en')}
    className="flex items-center px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-full transition-colors shadow-sm font-bold text-sm"
  >
    <Languages className="w-4 h-4 mr-2" />
    {lang === 'en' ? 'తెలుగు' : 'English'}
  </button>
);

const NavBar = ({ lang, setLang, activePage, handlePageChange, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const navItems = [
    { id: 'home', en: 'Home', te: 'హోమ్' },
    { id: 'about', en: 'About', te: 'మా గురించి' },
    { id: 'services', en: 'Services', te: 'సేవలు' },
    { id: 'timeline', en: 'Events Timeline', te: 'కార్యక్రమాలు' },
    { id: 'trustees', en: 'Trustees', te: 'కార్యవర్గం' },
    { id: 'donate', en: 'Donate', te: 'విరాళం' },
    { id: 'contact', en: 'Contact', te: 'సంప్రదించండి' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b-4 border-amber-500">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handlePageChange('home')}>
          <img 
            src="/images/logo.jpg" 
            alt="Naa Nestham Logo" 
            className="w-12 h-12 rounded-full object-cover shadow-lg border-2 border-amber-400"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
        />
          <div>
            <h1 className="text-base md:text-2xl font-extrabold text-blue-900 leading-tight tracking-tight">
              {lang === 'en' ? TRUST_INFO.name_en : TRUST_INFO.name_te}
            </h1>
            <p className="text-[10px] md:text-xs text-amber-600 font-bold block tracking-widest uppercase mt-1">
              {lang === 'en' ? "Service is our Passion" : "ప్రార్థించే పెదవుల కన్నా సహాయం చేసే చేతులు మిన్న."}
            </p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handlePageChange(item.id)}
              className={`font-semibold transition-colors ${activePage === item.id ? 'text-amber-600' : 'text-gray-600 hover:text-blue-700'}`}
            >
              {lang === 'en' ? item.en : item.te}
            </button>
          ))}
          <LangToggle lang={lang} setLang={setLang} />
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center space-x-4 lg:hidden">
          <button onClick={() => setLang(lang === 'en' ? 'te' : 'en')} className="font-bold text-amber-600">
            {lang === 'en' ? 'తె' : 'En'}
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-700">
            {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                handlePageChange(item.id);
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left px-6 py-4 text-gray-700 hover:bg-amber-50 font-medium border-b border-gray-100 last:border-0"
            >
              {lang === 'en' ? item.en : item.te}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

// 3. Hero Section (UPDATED WITH VIDEO)
const HomeHero = ({ lang, handlePageChange }) => (
  <section className="relative bg-white text-gray-800 py-20 text-center">
    <div className="container mx-auto px-4">
      {/* Video Container - No controls, Autoplay, Muted, No Loop (stops on last frame) */}
      <div className="w-full max-w-4xl mx-auto mb-8 bg-white rounded-xl shadow-2xl border border-amber-200 overflow-hidden">
        <video 
          className="w-full h-auto object-cover"
          autoPlay 
          muted 
          playsInline
          src="/videos/welcome1.mp4"
          onEnded={(e) => { e.target.pause(); }} // Explicitly pause at the end
        >
          Your browser does not support the video tag.
        </video>
      </div>
       
      {/* Group Photo Container - Placed below video */}
      <div className="w-full max-w-4xl mx-auto mb-8 p-1 bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="w-full h-auto rounded-lg overflow-hidden">
             <img 
               src="/images/group.jpg" 
               alt="Classmates Group Photo" 
               className="w-full h-auto object-cover"
               onError={(e) => { e.target.style.display = 'none'; }}
             />
             {/* Fallback if image fails to load */}
             <div className="bg-gray-100 w-full h-64 flex flex-col items-center justify-center text-gray-500" style={{display: 'none'}}>
                 <Users className="w-16 h-16 mb-2 opacity-40" />
                 <span>Group Photo</span>
             </div>
        </div>
        
        {/* ADDED BATCH DETAILS HERE */}
        <div className="py-3 bg-gray-50 text-center border-t border-gray-100 mt-1">
            <p className="text-sm md:text-base font-bold text-blue-900">
                {lang === 'en' ? TRUST_INFO.batch : TRUST_INFO.batch_te}
            </p>
        </div>
      </div>
       
      <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-700 drop-shadow-sm">
        {lang === 'en' ? TRUST_INFO.name_en : TRUST_INFO.name_te}
      </h2>
      <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-gray-600 font-serif italic">
        "{lang === 'en' ? TRUST_INFO.tagline_en : TRUST_INFO.tagline_te}"
      </p>
       
      <div className="flex flex-wrap justify-center gap-4">
        <button onClick={() => handlePageChange('donate')} className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-full shadow-lg text-lg font-bold flex items-center transition-transform hover:scale-105">
            <Heart className="w-5 h-5 mr-2 fill-current" /> {lang === 'en' ? "Donate Now" : "విరాళం ఇవ్వండి"}
        </button>
        <button onClick={() => handlePageChange('timeline')} className="px-8 py-3 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-full shadow-lg text-lg font-bold flex items-center transition-transform hover:scale-105">
            <Calendar className="w-5 h-5 mr-2" /> {lang === 'en' ? "Our Activities" : "మా కార్యక్రమాలు"}
        </button>
      </div>
    </div>
  </section>
);

const AboutPage = ({ lang }) => (
  <div className="min-h-screen bg-gray-50 py-12 animate-fadeIn">
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{lang === 'en' ? "About Us" : "మా గురించి"}</h2>
      </div>
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          {lang === 'en' 
            ? "Naa Nestham Charitable Trust was born from the noble thought of the 10th class classmates of Eligaid ZPSS 1987-88 SSC Batch. Reunited after 25 years in 2013, they decided to give back to society." 
            : "ఎలిగేడు ZPSS 1987-88 పదవ తరగతి బ్యాచ్ మిత్రుల గొప్ప ఆలోచన నుండి ఈ ట్రస్ట్ పుట్టింది. 25 సంవత్సరాల తర్వాత 2013లో ఒకే వేదికపైకి వచ్చి, సమాజానికి ఏదైనా మంచి చేయాలనే సంకల్పంతో ఈ సంస్థను స్థాపించారు."}
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          {lang === 'en'
            ? "They serve without any greed, solely for the good of the old, poor, and disabled. The trust focuses on empowering youth with free spoken English classes, computer education, and car driving skills."
            : "ఎలాంటి స్వార్థం లేకుండా, కేవలం వృద్ధులు, పేదలు మరియు వికలాంగుల అభ్యున్నతి కోసం సేవ చేస్తున్నారు. యువతకు ఉచిత స్పోకెన్ ఇంగ్లీష్, కంప్యూటర్ విద్య మరియు డ్రైవింగ్ శిక్షణ అందిస్తున్నారు."}
        </p>
        
        <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600 mt-8">
           <h3 className="text-xl font-bold text-blue-900 mb-2">{lang === 'en' ? "Our Vision" : "మా లక్ష్యం"}</h3>
           <p className="text-blue-800 italic">"{lang === 'en' ? TRUST_INFO.tagline_en : TRUST_INFO.tagline_te}"</p>
        </div>

        <div className="mt-8 text-center">
           <a href={TRUST_INFO.youtube_url} target="_blank" rel="noreferrer" className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-colors shadow-md">
             <Youtube className="w-6 h-6 mr-2" />
             {lang === 'en' ? "Watch Our Story on YouTube" : "మా ప్రస్థానాన్ని యూట్యూబ్ లో చూడండి"}
           </a>
        </div>
      </div>
    </div>
  </div>
);

// 4. Detailed Event Modal (With Gallery Support and Scroll Fix)
const EventDetail = ({ event, lang, onClose }) => {
  // Push state for modal to support back button
  useEffect(() => {
    // Push a new history entry when modal opens
    window.history.pushState({ modalOpen: true }, '');

    // Handle back button (popstate)
    const handlePopState = (e) => {
      // If the modalOpen flag is gone from state (meaning we went back), close the modal
      if (!e.state?.modalOpen) {
        onClose();
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [onClose]);

  // Function to handle manual closing (Button or Click Outside)
  // We use history.back() to simulate a back press, which triggers popstate and closes the modal
  const handleManualClose = () => {
    window.history.back(); 
  };

  if (!event) return null;

  return (
    <div 
      className="fixed inset-0 z-[60] overflow-y-auto bg-black/80 backdrop-blur-sm"
      onClick={handleManualClose} // Click outside closes modal
    >
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Modal Content - Stop propagation prevents click from reaching the background */}
        <div 
          className="bg-white rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl relative animate-fadeIn my-8"
          onClick={(e) => e.stopPropagation()}
        >
            <button 
              onClick={handleManualClose}
              className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors z-10"
            >
            <X className="w-6 h-6 text-gray-600" />
            </button>

            <div className="h-48 bg-gradient-to-r from-blue-900 to-blue-800 p-8 flex items-end">
            <div>
                <span className="bg-amber-500 text-white px-3 py-1 rounded-md text-sm font-bold mb-2 inline-block shadow-sm">
                {event.year}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                {lang === 'en' ? event.title_en : event.title_te}
                </h2>
                <p className="text-blue-200 mt-2 flex items-center text-sm">
                <Calendar className="w-4 h-4 mr-2" /> {event.date}
                </p>
            </div>
            </div>

            <div className="p-8">
            <div className="prose max-w-none text-gray-700 text-lg leading-relaxed mb-8">
                {lang === 'en' ? event.desc_en : event.desc_te}
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 flex items-center">
                <Camera className="w-5 h-5 mr-2 text-amber-500" />
                {lang === 'en' ? "Event Gallery" : "ఫోటో గ్యాలరీ"}
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {event.images && event.images.length > 0 ? (
                    event.images.map((img, index) => (
                        <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-all">
                            <img 
                                src={img} 
                                alt={`Event ${index}`} 
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" 
                                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x400/cccccc/333333?text=Image+Load+Error"; }}
                            />
                        </div>
                    ))
                ) : (
                    // Fallback Placeholders if no images are added
                    [1, 2, 3].map((i) => (
                    <div key={i} className="aspect-square bg-gray-50 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
                        <Camera className="w-8 h-8 text-gray-300 mb-2" />
                        <span className="text-xs text-gray-400">
                            {lang === 'en' ? "Add Photos Here" : "ఇక్కడ ఫోటోలు జోడించండి"}
                        </span>
                    </div>
                    ))
                )}
            </div>
            </div>
            
            <div className="bg-gray-50 p-4 text-center border-t">
            <button onClick={handleManualClose} className="text-blue-600 font-semibold hover:underline">
                {lang === 'en' ? "Close Details" : "మూసివేయండి"}
            </button>
            </div>
        </div>
      </div>
    </div>
  );
};

// 5. Timeline Page
const TimelinePage = ({ lang }) => {
  const [filterYear, setFilterYear] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const years = ['All', ...new Set(ALL_EVENTS.map(e => e.year))].sort((a, b) => b - a);

  const filteredEvents = filterYear === 'All'
      ? ALL_EVENTS
      : ALL_EVENTS.filter(e => e.year === filterYear);

  return (
    <div className="min-h-screen bg-gray-50 py-12 animate-fadeIn">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{lang === 'en' ? "Events Timeline" : "సేవా ప్రస్థానం"}</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">{lang === 'en' ? "A decade of dedication. Explore our journey from 2013 to present." : "2013 నుండి నేటి వరకు మా ప్రస్థానం. దశాబ్ద కాలపు సేవ."}</p>
        </div>

        {/* Facebook Link */}
        <div className="max-w-2xl mx-auto mb-10 bg-white border border-blue-100 rounded-xl shadow-sm p-4 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
               <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <Facebook className="w-6 h-6 text-white" />
               </div>
               <div>
                 <p className="font-bold text-gray-800">{lang === 'en' ? "Connect on Facebook" : "ఫేస్‌బుక్ లో చేరండి"}</p>
                 <p className="text-xs text-gray-500">{lang === 'en' ? "For live updates and more photos" : "తాజా సమాచారం మరియు ఫోటోల కోసం"}</p>
               </div>
            </div>
            <a href={TRUST_INFO.facebook_url} target="_blank" rel="noreferrer" className="px-5 py-2 bg-blue-50 text-blue-600 font-bold rounded-lg hover:bg-blue-100 transition-colors text-sm">
                {lang === 'en' ? "Visit Page" : "పేజీని చూడండి"}
            </a>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {years.map(year => (
            <button
              key={year}
              onClick={() => setFilterYear(year)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105 ${filterYear === year ? 'bg-amber-500 text-white shadow-lg' : 'bg-white text-gray-600 border border-gray-200 hover:border-amber-300'}`}
            >
              {year === 'All' && lang === 'te' ? 'అన్నీ' : year}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <div 
              key={event.id} 
              onClick={() => setSelectedEvent(event)}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group border border-gray-100 flex flex-col h-full"
            >
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                  {/* Thumbnail Image Logic */}
                  {event.images && event.images.length > 0 ? (
                      <img 
                        src={event.images[0]} 
                        alt="Event thumbnail" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x400/cccccc/333333?text=Image+Load+Error"; }}
                      />
                  ) : (
                      <div className={`absolute inset-0 flex items-center justify-center text-gray-400 group-hover:scale-110 transition-transform duration-700 ${event.category === 'Health' ? 'bg-red-50' : event.category === 'Education' ? 'bg-green-50' : 'bg-blue-50'}`}>
                          {event.category === 'Health' && <Heart className="w-16 h-16 text-red-200" />}
                          {event.category === 'Education' && <BookOpen className="w-16 h-16 text-green-200" />}
                          {event.category === 'Service' && <Users className="w-16 h-16 text-blue-200" />}
                          {event.category === 'Skill Development' && <Smartphone className="w-16 h-16 text-purple-200" />}
                          {(event.category !== 'Health' && event.category !== 'Education' && event.category !== 'Service' && event.category !== 'Skill Development') && <Camera className="w-16 h-16 opacity-20" />}
                      </div>
                  )}
                  
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-md text-xs font-bold text-gray-800 shadow-sm uppercase tracking-wide">
                      {event.category}
                  </div>
                  <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-md text-xs font-bold shadow-sm">
                      {event.year}
                  </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <div className="text-xs text-gray-500 font-semibold mb-2 flex items-center">
                    <Calendar className="w-3 h-3 mr-1" /> {event.date}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-3 leading-tight group-hover:text-blue-700 transition-colors">
                  {lang === 'en' ? event.title_en : event.title_te}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
                  {lang === 'en' ? event.desc_en : event.desc_te}
                </p>
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center text-blue-600 text-sm font-bold group-hover:translate-x-2 transition-transform">
                    {lang === 'en' ? "View Photos & Details" : "ఫోటోలు & వివరాలు చూడండి"} <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedEvent && (
            <EventDetail 
                event={selectedEvent} 
                lang={lang} 
                onClose={() => setSelectedEvent(null)} 
            />
        )}
      </div>
    </div>
  );
};

// 6. Services Page (Simplified - No Feedback Form)
const ServicesPage = ({ lang }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 animate-fadeIn">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">{lang === 'en' ? "Our Services" : "మా సేవలు"}</h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Service 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-green-500 hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
                  <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{lang === 'en' ? "Education & Libraries" : "విద్య & గ్రంథాలయాలు"}</h3>
              <p className="text-gray-600 mb-4">
                  {lang === 'en' 
                  ? "Established 4 libraries in Eligaid, Sultanpur, Dhulikatta, and Lalapalli. Distributing notebooks and providing Spoken English classes."
                  : "ఎలిగేడు, సుల్తాన్ పూర్, ధూళికట్ట, లాలపల్లిలో 4 గ్రంథాలయాలు స్థాపన. నోటు పుస్తకాల పంపిణీ మరియు స్పోకెన్ ఇంగ్లీష్ తరగతులు."}
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-red-500 hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 text-red-600">
                  <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{lang === 'en' ? "Health & Medical Camps" : "ఆరోగ్యం & వైద్య శిబిరాలు"}</h3>
              <p className="text-gray-600 mb-4">
                  {lang === 'en' 
                  ? "Organizing mega medical camps, blood donation drives, and eye checkups. Donated Body Freezer for public use."
                  : "భారీ వైద్య శిబిరాలు, రక్తదాన మరియు నేత్ర వైద్య శిబిరాలు. ప్రజల అవసరార్థం బాడీ ఫ్రీజర్ విరాళం."}
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-blue-500 hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-blue-600">
                  <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{lang === 'en' ? "Skill Development" : "నైపుణ్యాభివృద్ధి"}</h3>
              <p className="text-gray-600 mb-4">
                  {lang === 'en' 
                  ? "Free Driving School for unemployed youth. Computer training programs to empower the next generation."
                  : "నిరుద్యోగ యువతకు ఉచిత డ్రైవింగ్ స్కూల్. కంప్యూటర్ శిక్షణ మరియు డ్రైవింగ్ లైసెన్సుల జారీ."}
              </p>
            </div>
        </div>
      </div>
    </div>
  );
};

// 7. Trustees Page
const TrusteesPage = ({ lang }) => (
  <div className="min-h-screen bg-white py-12 animate-fadeIn">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{lang === 'en' ? "Trust Committee" : "ట్రస్ట్ కార్యవర్గం"}</h2>
        <p className="text-gray-500">{lang === 'en' ? "The dedicated team working behind the scenes." : "సేవా కార్యక్రమాల వెనుక ఉన్న అంకితభావం గల బృందం."}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {HEADS.map((head, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all group">
            <div className="h-32 bg-gradient-to-r from-blue-900 to-blue-700 relative">
               <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
                  <div className="w-24 h-24 bg-white p-1 rounded-full shadow-md">
                      <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                          {/* UPDATED: Check if image exists, otherwise show User icon */}
                          {head.image ? (
                            <img 
                              src={head.image} 
                              alt={head.name_en} 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                // Fallback to icon if image fails to load
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }} 
                           />
                          ) : null}
                          {/* Fallback Icon (Hidden if image loads successfully) */}
                          <div className={`w-full h-full flex items-center justify-center bg-gray-100 ${head.image ? 'hidden' : ''}`}>
                              <User className="w-12 h-12 text-gray-400" />
                          </div>
                      </div>
                  </div>
               </div>
            </div>
            <div className="pt-12 pb-6 px-4 text-center">
               <h4 className="text-lg font-bold text-gray-800 mb-1">{lang === 'en' ? head.name_en : head.name_te}</h4>
               <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full uppercase tracking-wider">
                 {lang === 'en' ? head.role_en : head.role_te}
               </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// 8. Donate Page
const DonatePage = ({ lang }) => (
  <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center animate-fadeIn">
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-5/12 bg-blue-900 p-10 text-white flex flex-col justify-center text-center relative">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
             <Heart className="w-20 h-20 mb-6 mx-auto animate-pulse text-amber-400" />
             <h4 className="text-3xl font-bold mb-4">{lang === 'en' ? "Support Us" : "సహకరించండి"}</h4>
             <p className="text-blue-100 mb-8 leading-relaxed">
               {lang === 'en' ? "Your contribution helps us maintain libraries, run medical camps, and support the needy." : "మీ చిన్న సహాయం గ్రంథాలయాల నిర్వహణకు, వైద్య శిబిరాలకు మరియు పేదలకు అండగా నిలుస్తుంది."}
             </p>
        </div>
        <div className="w-full md:w-7/12 p-10">
            <h5 className="text-2xl font-bold text-gray-800 mb-8 border-b pb-4">
                {lang === 'en' ? "Bank Account Details" : "బ్యాంకు ఖాతా వివరాలు"}
            </h5>
            <div className="space-y-6">
                <div className="flex flex-col p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-xs text-gray-500 uppercase font-bold mb-1">Account Name</span>
                    <span className="font-bold text-lg text-gray-900">NAA NESTHAM CHARITABLE TRUST</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <span className="text-xs text-gray-500 uppercase font-bold mb-1">Account Number</span>
                        <span className="font-mono font-bold text-lg text-blue-700">62321599315</span>
                    </div>
                    <div className="flex flex-col p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <span className="text-xs text-gray-500 uppercase font-bold mb-1">IFSC Code</span>
                        <span className="font-mono font-bold text-lg text-gray-900">SBIN0020893</span>
                    </div>
                </div>
                <div className="flex flex-col p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-xs text-gray-500 uppercase font-bold mb-1">Bank & Branch</span>
                    <span className="font-semibold text-gray-900">State Bank of India (SBI), Ashok Nagar Branch, Karimnagar</span>
                </div>
            </div>
            
            <div className="mt-8 text-center">
               <p className="text-sm text-gray-500 italic mb-4">
                 {lang === 'en' ? "Scan to Pay via UPI" : "UPI ద్వారా చెల్లించడానికి స్కాన్ చేయండి"}
               </p>
               
               {/* QR Code Section */}
               <div className="w-48 h-48 bg-white mx-auto mb-6 p-2 rounded-xl border-2 border-gray-200 shadow-sm relative group">
                  <div className="absolute inset-0 border-2 border-amber-400 rounded-xl opacity-20 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                  {/* PLACE YOUR SCANNER IMAGE HERE */}
                  <img 
                    src="/images/trust_scanner.jpeg" 
                    alt="Scan Trust Donation QR Code" 
                    className="w-full h-full object-contain rounded-lg"
                    onError={(e) => { 
                       e.target.onerror = null; 
                       // Fallback to a generated QR code if local image is missing
                       e.target.src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=9246934929@sbi&pn=NaaNesthamTrust"; 
                    }}
                  />
               </div>

               {/* UPI Icons Strip */}
               <div className="flex justify-center items-center space-x-6">
                  {/* PhonePe */}
                  <div className="flex flex-col items-center group cursor-default">
                    <div className="w-10 h-10 bg-[#5f259f] text-white rounded-full flex items-center justify-center shadow-md transform group-hover:-translate-y-1 transition-transform">
                       <span className="font-bold text-xs">Pe</span>
                    </div>
                    <span className="text-[10px] font-semibold text-gray-500 mt-1">PhonePe</span>
                  </div>

                  {/* GPay */}
                  <div className="flex flex-col items-center group cursor-default">
                    <div className="w-10 h-10 bg-white border border-gray-200 text-gray-800 rounded-full flex items-center justify-center shadow-md transform group-hover:-translate-y-1 transition-transform overflow-hidden">
                       <div className="flex text-xs font-bold">
                         <span className="text-blue-500">G</span>
                         <span className="text-green-500">P</span>
                       </div>
                    </div>
                    <span className="text-[10px] font-semibold text-gray-500 mt-1">GPay</span>
                  </div>

                  {/* Paytm */}
                  <div className="flex flex-col items-center group cursor-default">
                    <div className="w-10 h-10 bg-[#00baf2] text-white rounded-full flex items-center justify-center shadow-md transform group-hover:-translate-y-1 transition-transform">
                       <span className="font-bold text-[8px]">Paytm</span>
                    </div>
                    <span className="text-[10px] font-semibold text-gray-500 mt-1">Paytm</span>
                  </div>

                  {/* BHIM/UPI */}
                  <div className="flex flex-col items-center group cursor-default">
                    <div className="w-10 h-10 bg-orange-500 text-white border border-orange-600 rounded-full flex items-center justify-center shadow-md transform group-hover:-translate-y-1 transition-transform">
                       <span className="font-bold text-[10px]">UPI</span>
                    </div>
                    <span className="text-[10px] font-semibold text-gray-500 mt-1">BHIM</span>
                  </div>
               </div>
            </div>
        </div>
      </div>
    </div>
  </div>
);

// 9. Contact Page with Google Map
const ContactPage = ({ lang }) => (
  <div className="min-h-screen bg-white py-12 animate-fadeIn">
    <div className="container mx-auto px-4 max-w-4xl">
       <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{lang === 'en' ? "Get in Touch" : "మమ్మల్ని సంప్రదించండి"}</h2>
       </div>
       
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* Info Section */}
           <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-100 h-full">
                <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">{lang === 'en' ? "Contact Details" : "సంప్రదించవలసిన వివరాలు"}</h3>
                <div className="space-y-8">
                    <div className="flex items-start">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                            <MapPin className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 text-sm uppercase mb-1">Address / చిరునామా</h4>
                            <p className="text-gray-600">
                            Hanuman Nagar, Near Rythu Vedika,<br/>
                            Vill & Mdl: Eligaid,<br/>
                            Dist: Peddapalli, Telangana.
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex items-start">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                            <Phone className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 text-sm uppercase mb-1">Phone / ఫోన్</h4>
                            <a href="tel:+919246934929" className="block text-gray-600 font-mono hover:text-green-600">+91 92469 34929</a>
                            <a href="tel:+919848621773" className="block text-gray-600 font-mono hover:text-green-600">+91 98486 21773</a>
                            <a href="tel:+919849283806" className="block text-gray-600 font-mono hover:text-green-600">+91 98492 83806</a>
                        </div>
                    </div>
                    
                    <div className="flex items-start">
                        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                            <Mail className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 text-sm uppercase mb-1">Email / ఇమెయిల్</h4>
                            <a href={`mailto:${TRUST_INFO.email}`} className="text-gray-600 hover:text-amber-600 font-medium break-all">
                                {TRUST_INFO.email}
                            </a>
                        </div>
                    </div>
                </div>
           </div>

           {/* Google Map Section */}
           <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 h-full min-h-[400px]">
                <iframe 
                    title="Google Map Eligaid"
                    src="https://maps.google.com/maps?q=Eligaid%20Mandal%20Peddapalli&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    width="100%" 
                    height="100%" 
                    style={{border:0, minHeight: '400px'}} 
                    allowFullScreen="" 
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
           </div>
       </div>
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---

const App = () => {
  const [lang, setLang] = useState('en'); // 'en' or 'te'
  const [activePage, setActivePage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle Global Back Button for Page Navigation
  useEffect(() => {
    const handlePopState = (event) => {
      if (!event.state?.modalOpen) {
          if (event.state && event.state.page) {
            setActivePage(event.state.page);
          } else {
            setActivePage('home');
          }
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handlePageChange = (pageId) => {
    if (pageId === activePage) return;
    setActivePage(pageId);
    if (pageId !== 'home') {
        window.history.pushState({ page: pageId }, '', `#${pageId}`);
    } else {
        window.history.pushState({ page: 'home' }, '', '#home');
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  const renderPage = () => {
    switch (activePage) {
      case 'home': return (
        <>
          <HomeHero lang={lang} handlePageChange={handlePageChange} />
          {/* Featured Sections Preview on Home */}
          <div className="py-16 bg-gray-50">
              <div className="container mx-auto px-4 text-center">
                 <h3 className="text-2xl font-bold mb-8 text-gray-800">{lang === 'en' ? "What We Do" : "మా సేవా విభాగాలు"}</h3>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div onClick={() => handlePageChange('services')} className="bg-white p-6 rounded-xl shadow hover:shadow-md cursor-pointer transition-transform hover:scale-105">
                       <BookOpen className="w-10 h-10 text-green-500 mx-auto mb-3" />
                       <span className="font-bold text-gray-700">{lang === 'en' ? "Libraries" : "గ్రంథాలయాలు"}</span>
                    </div>
                    <div onClick={() => handlePageChange('services')} className="bg-white p-6 rounded-xl shadow hover:shadow-md cursor-pointer transition-transform hover:scale-105">
                       <Heart className="w-10 h-10 text-red-500 mx-auto mb-3" />
                       <span className="font-bold text-gray-700">{lang === 'en' ? "Medical" : "వైద్యం"}</span>
                    </div>
                    <div onClick={() => handlePageChange('services')} className="bg-white p-6 rounded-xl shadow hover:shadow-md cursor-pointer transition-transform hover:scale-105">
                       <Smartphone className="w-10 h-10 text-blue-500 mx-auto mb-3" />
                       <span className="font-bold text-gray-700">{lang === 'en' ? "Skills" : "నైపుణ్యాలు"}</span>
                    </div>
                    <div onClick={() => handlePageChange('services')} className="bg-white p-6 rounded-xl shadow hover:shadow-md cursor-pointer transition-transform hover:scale-105">
                       <Users className="w-10 h-10 text-amber-500 mx-auto mb-3" />
                       <span className="font-bold text-gray-700">{lang === 'en' ? "Welfare" : "సంక్షేమం"}</span>
                    </div>
                 </div>
                 <button onClick={() => handlePageChange('timeline')} className="mt-12 text-blue-600 font-bold hover:underline flex items-center justify-center w-full">
                    {lang === 'en' ? "View All Activities" : "అన్ని కార్యక్రమాలు చూడండి"} <ArrowLeft className="w-4 h-4 ml-1 rotate-180" />
                 </button>
              </div>
          </div>
        </>
      );
      case 'about': return <AboutPage lang={lang} />;
      case 'timeline': return <TimelinePage lang={lang} />;
      case 'services': return <ServicesPage lang={lang} />;
      case 'trustees': return <TrusteesPage lang={lang} />;
      case 'donate': return <DonatePage lang={lang} />;
      case 'contact': return <ContactPage lang={lang} />;
      default: return <HomeHero lang={lang} handlePageChange={handlePageChange} />;
    }
  };

  return (
    <div className="font-sans text-gray-800 min-h-screen flex flex-col bg-white">
      <NavBar 
        lang={lang} 
        setLang={setLang} 
        activePage={activePage} 
        handlePageChange={handlePageChange}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main className="flex-grow">
        {renderPage()}
      </main>

      <footer className="bg-gray-900 text-gray-400 py-12 border-t-8 border-amber-500">
        <div className="container mx-auto px-4 text-center md:text-left">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                 <h4 className="text-white font-bold text-lg mb-4">{lang === 'en' ? "About Trust" : "ట్రస్ట్ గురించి"}</h4>
                 <p className="text-sm leading-relaxed">
                   {lang === 'en' ? "Born from the thought of 1987-88 SSC Batch, Eligaid ZPSS. Serving the needy and empowering the youth." : "ఎలిగేడు ZPSS 1987-88 SSC బ్యాచ్ మిత్రుల ఆలోచన నుండి పుట్టిన సేవా సంస్థ."}
                 </p>
              </div>
              <div>
                 <h4 className="text-white font-bold text-lg mb-4">{lang === 'en' ? "Address" : "చిరునామా"}</h4>
                 <p className="text-sm">Hanuman Nagar, Near Rythu Vedika,<br/>Vill & Mdl:Eligaid,<br/>Dist: Peddapalli.</p>
              </div>
              <div>
                 <h4 className="text-white font-bold text-lg mb-4">{lang === 'en' ? "Contact" : "ఫోన్"}</h4>
                 <p className="text-sm font-mono">+91 92469 34929</p>
                 <p className="text-sm font-mono">+91 98486 21773</p>
                 <p className="text-sm font-mono">+91 98492 83806</p>
              </div>
              <div>
                 <h4 className="text-white font-bold text-lg mb-4">{lang === 'en' ? "Follow Us" : "సోషల్ మీడియా"}</h4>
                 <a href={TRUST_INFO.facebook_url} target="_blank" rel="noreferrer" className="inline-flex items-center text-blue-400 hover:text-white transition-colors">
                    <Facebook className="w-5 h-5 mr-2" /> Facebook
                 </a>
                 <br/>
                 <a href={TRUST_INFO.youtube_url} target="_blank" rel="noreferrer" className="inline-flex items-center text-red-500 hover:text-white transition-colors">
                      <Youtube className="w-5 h-5 mr-2" /> Youtube
                 </a>
              </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center relative">
            <p className="text-xs mb-2 md:mb-0">&copy; {new Date().getFullYear()} Naa Nestham Charitable Trust. All rights reserved.</p>
            
            <p className="text-xs flex items-center">
              Website built and managed by 
              <a 
                href="https://www.instagram.com/simply.bhanu/" 
                target="_blank" 
                rel="noreferrer" 
                className="text-amber-500 font-semibold hover:text-amber-400 transition-colors ml-1"
                style={{textDecoration: 'none'}}
              >
                {TRUST_INFO.builder}
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;