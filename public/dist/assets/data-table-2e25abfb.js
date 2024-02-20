import{_ as ne}from"./AppTextField-39a45d2a.js";import{u as me}from"./useApi-63fa4e73.js";import{V as q,a as h}from"./VRow-0990f1b0.js";import{V as Z}from"./VCardText-5b1570fa.js";import{V as C}from"./VImg-f2e8baad.js";import{V as _}from"./VAvatar-60fa6094.js";import{r as T,bb as ce,a as re,o as d,c as k,b as e,e as a,n as s,aW as Q,d as r,x as o,F as le,i as de,f as g,a2 as U,v as b,z as ue,y as P,be as Y,da as R,bp as x,b1 as N,bq as F,bd as j,b2 as K,b3 as J,H as ie,ak as O,s as pe}from"./index-7474f5b2.js";import{V as M}from"./VChip-188b13af.js";import{V as S}from"./VDataTable-241d237b.js";import{a as z}from"./formatters-b3558c7d.js";import{V as $}from"./VTextField-f506f2c1.js";import{V as ve}from"./VPagination-57cd9c8a.js";import{_ as fe}from"./AppSelect-24b239c9.js";import{V as ee,b as ae,c as te}from"./VCard-5a5536f3.js";import{V as ye}from"./VContainer-2a774386.js";import{V as X}from"./VSpacer-8657084e.js";import{V as se}from"./VDialog-cd6e898d.js";import{_ as ge}from"./AppCardCode-e48f1a17.js";import"./form-1daec3d8.js";import"./VSelect-3104a182.js";import"./forwardRefs-8348545e.js";import"./VList-11197605.js";import"./ssrBoot-6b4d2448.js";import"./VDivider-495a0759.js";import"./dialog-transition-7fca3df4.js";import"./easing-9f15041e.js";import"./VMenu-d68be952.js";import"./VOverlay-0eaff922.js";import"./lazy-a3d78126.js";import"./scopeId-3b168ed5.js";import"./VCheckboxBtn-64a51864.js";import"./VSelectionControl-6ad5757d.js";import"./VTable-ee5f9e0c.js";import"./filter-0dc041cf.js";import"./helpers-61e4df1a.js";/* empty css                   */import"./VCounter-13e09909.js";import"./VField-e8f1f600.js";import"./VInput-0a1cf06c.js";const xe={class:"d-flex align-center"},he={class:"d-flex flex-column ms-3"},be={class:"d-block font-weight-medium text-truncate text-high-emphasis"},De={class:"text-xs"},Ve={class:"d-flex align-center"},Ae={class:"ms-1 text-no-wrap"},ke={class:"d-flex align-center"},Ie={key:1},Ne={class:"text-no-wrap font-weight-medium text-high-emphasis ms-2"},Te={class:"d-flex flex-column"},Se={class:"d-flex align-center"},Ce={class:"text-high-emphasis font-weight-medium"},_e={key:0},we={class:"text-xs text-no-wrap"},Ee={__name:"DemoDataTableKitchenSink",async setup(I){let c,m;const l=T(""),i=T([]),t=[{title:"PRODUCT",key:"product.name"},{title:"DATE",key:"date"},{title:"CATEGORY",key:"product.category"},{title:"BUYERS",key:"buyer.name"},{title:"PAYMENT",key:"payment",sortable:!1},{title:"STATUS",key:"status",sortable:!1},{title:"DELETE",key:"delete",sortable:!1}],u=D=>{const V=i.value.findIndex(L=>L.product.id===D);i.value.splice(V,1)},p=[{name:"Mouse",icon:"tabler-mouse",color:"warning"},{name:"Glass",icon:"tabler-eyeglass",color:"primary"},{name:"Smart Watch",icon:"tabler-device-watch",color:"success"},{name:"Bag",icon:"tabler-briefcase",color:"info"},{name:"Storage Device",icon:"tabler-device-audio-tape",color:"warning"},{name:"Bluetooth",icon:"tabler-bluetooth",color:"error"},{name:"Gaming",icon:"tabler-device-gamepad-2",color:"warning"},{name:"Home",icon:"tabler-home",color:"error"},{name:"VR",icon:"tabler-badge-vr",color:"primary"},{name:"Shoes",icon:"tabler-shoe",color:"success"},{name:"Electronics",icon:"tabler-cpu",color:"info"},{name:"Projector",icon:"tabler-theater",color:"warning"},{name:"iPod",icon:"tabler-device-airpods",color:"error"},{name:"Keyboard",icon:"tabler-keyboard",color:"primary"},{name:"Smart Phone",icon:"tabler-device-mobile",color:"success"},{name:"Smart TV",icon:"tabler-device-tv",color:"info"},{name:"Google Home",icon:"tabler-brand-google",color:"warning"},{name:"Mac",icon:"tabler-brand-apple",color:"error"},{name:"Headphone",icon:"tabler-headphones",color:"primary"},{name:"iMac",icon:"tabler-device-imac",color:"success"},{name:"iPhone",icon:"tabler-brand-apple",color:"warning"}],v=D=>{if(D==="Confirmed")return"primary";if(D==="Completed")return"success";if(D==="Cancelled")return"error"},w=D=>{const V=p.findIndex(L=>L.name===D);return V!==-1?[{icon:p[V].icon,color:p[V].color}]:[{icon:"tabler-help-circle",color:"primary"}]},{data:E,error:G}=([c,m]=ce(()=>me("pages/datatable")),c=await c,m(),c);return G.value?console.error(G.value):E.value&&(i.value=E.value),(D,V)=>{const L=ne,W=re("IconBtn");return d(),k("div",null,[e(Z,null,{default:a(()=>[e(q,null,{default:a(()=>[e(h,{cols:"12","offset-md":"8",md:"4"},{default:a(()=>[e(L,{modelValue:s(l),"onUpdate:modelValue":V[0]||(V[0]=n=>Q(l)?l.value=n:null),density:"compact",placeholder:"Search ...","append-inner-icon":"tabler-search","single-line":"","hide-details":"",dense:"",outlined:""},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(s(S),{headers:t,items:s(i),search:s(l),"items-per-page":5,class:"text-no-wrap"},{"item.product.name":a(({item:n})=>[r("div",xe,[r("div",null,[e(C,{src:n.product.image,height:"40",width:"40"},null,8,["src"])]),r("div",he,[r("span",be,o(n.product.name),1),r("span",De,o(n.product.brand),1)])])]),"item.product.category":a(({item:n})=>[r("div",Ve,[(d(!0),k(le,null,de(w(n.product.category),(f,H)=>(d(),g(_,{key:H,size:"26",color:f.color,variant:"tonal"},{default:a(()=>[e(U,{size:"20",color:f.color,class:"rounded-0"},{default:a(()=>[b(o(f.icon),1)]),_:2},1032,["color"])]),_:2},1032,["color"]))),128)),r("span",Ae,o(n.product.category),1)])]),"item.buyer.name":a(({item:n})=>[r("div",ke,[e(_,{size:"1.875rem",color:n.avatar?void 0:"primary",variant:n.avatar?void 0:"tonal"},{default:a(()=>[n.buyer.avatar?(d(),g(C,{key:0,src:n.buyer.avatar},null,8,["src"])):(d(),k("span",Ie,o(n.buyer.name.slice(0,2).toUpperCase()),1))]),_:2},1032,["color","variant"]),r("span",Ne,o(n.buyer.name),1)])]),"item.payment":a(({item:n})=>[r("div",Te,[r("div",Se,[r("span",Ce,"$"+o(n.payment.paidAmount),1),n.payment.paidAmount!==n.payment.total?(d(),k("span",_e,"/"+o(n.payment.total),1)):ue("",!0)]),r("span",we,o(n.payment.receivedPaymentStatus),1)])]),"item.status":a(({item:n})=>[e(M,{color:v(n.payment.status),class:P([`text-${v(n.payment.status)}`,"font-weight-medium"]),size:"small"},{default:a(()=>[b(o(n.payment.status),1)]),_:2},1032,["color","class"])]),"item.delete":a(({item:n})=>[e(W,{onClick:f=>u(n.product.id)},{default:a(()=>[e(U,{icon:"tabler-trash"})]),_:2},1032,["onClick"])]),_:1},8,["items","search"])])}}},B=[{responsiveId:"",id:95,avatar:Y,fullName:"Edwina Ebsworth",post:"Human Resources Assistant",email:"eebsworth2m@sbwire.com",city:"Puzi",startDate:"09/27/2018",salary:19586.23,age:"27",experience:"2 Years",status:1},{responsiveId:"",id:1,avatar:R,fullName:"Korrie O'Crevy",post:"Nuclear Power Engineer",email:"kocrevy0@thetimes.co.uk",city:"Krasnosilka",startDate:"09/23/2016",salary:23896.35,age:"61",experience:"1 Year",status:2},{responsiveId:"",id:7,avatar:"",fullName:"Eileen Diehn",post:"Environmental Specialist",email:"ediehn6@163.com",city:"Lampuyang",startDate:"10/15/2017",salary:18991.67,age:"59",experience:"9 Years",status:3},{responsiveId:"",id:11,avatar:"",fullName:"De Falloon",post:"Sales Representative",email:"dfalloona@ifeng.com",city:"Colima",startDate:"06/12/2018",salary:19252.12,age:"30",experience:"0 Year",status:4},{responsiveId:"",id:3,avatar:x,fullName:"Stella Ganderton",post:"Operator",email:"sganderton2@tuttocitta.it",city:"Golcowa",startDate:"03/24/2018",salary:13076.28,age:"66",experience:"6 Years",status:5},{responsiveId:"",id:5,avatar:"",fullName:"Harmonia Nisius",post:"Senior Cost Accountant",email:"hnisius4@gnu.org",city:"Lucan",startDate:"08/25/2017",salary:10909.52,age:"33",experience:"3 Years",status:2},{responsiveId:"",id:6,avatar:"",fullName:"Genevra Honeywood",post:"Geologist",email:"ghoneywood5@narod.ru",city:"Maofan",startDate:"06/01/2017",salary:17803.8,age:"61",experience:"1 Year",status:1},{responsiveId:"",id:4,avatar:R,fullName:"Dorolice Crossman",post:"Cost Accountant",email:"dcrossman3@google.co.jp",city:"Paquera",startDate:"12/03/2017",salary:12336.17,age:"22",experience:"2 Years",status:2},{responsiveId:"",id:8,avatar:x,fullName:"Richardo Aldren",post:"Senior Sales Associate",email:"raldren7@mtv.com",city:"Skoghall",startDate:"11/05/2016",salary:19230.13,age:"55",experience:"5 Years",status:3},{responsiveId:"",id:9,avatar:Y,fullName:"Allyson Moakler",post:"Safety Technician",email:"amoakler8@shareasale.com",city:"Mogilany",startDate:"12/29/2018",salary:11677.32,age:"39",experience:"9 Years",status:5},{responsiveId:"",id:10,avatar:x,fullName:"Merline Penhalewick",post:"Junior Executive",email:"mpenhalewick9@php.net",city:"Kanuma",startDate:"04/19/2019",salary:15939.52,age:"23",experience:"3 Years",status:2},{responsiveId:"",id:12,avatar:"",fullName:"Cyrus Gornal",post:"Senior Sales Associate",email:"cgornalb@fda.gov",city:"Boro Utara",startDate:"12/09/2017",salary:16745.47,age:"22",experience:"2 Years",status:4},{responsiveId:"",id:13,avatar:"",fullName:"Tallou Balf",post:"Staff Accountant",email:"tbalfc@sina.com.cn",city:"Siliana",startDate:"01/21/2016",salary:15488.53,age:"36",experience:"6 Years",status:4},{responsiveId:"",id:14,avatar:"",fullName:"Othilia Extill",post:"Associate Professor",email:"oextilld@theatlantic.com",city:"Brzyska",startDate:"02/01/2016",salary:18442.34,age:"43",experience:"3 Years",status:2},{responsiveId:"",id:15,avatar:"",fullName:"Wilmar Bourton",post:"Administrative Assistant",email:"wbourtone@sakura.ne.jp",city:"Bích Động",startDate:"04/25/2018",salary:13304.45,age:"19",experience:"9 Years",status:5},{responsiveId:"",id:16,avatar:N,fullName:"Robinson Brazenor",post:"General Manager",email:"rbrazenorf@symantec.com",city:"Gendiwu",startDate:"12/23/2017",salary:11953.08,age:"66",experience:"6 Years",status:5},{responsiveId:"",id:17,avatar:"",fullName:"Nadia Bettenson",post:"Environmental Tech",email:"nbettensong@joomla.org",city:"Chabařovice",startDate:"07/11/2018",salary:20484.44,age:"64",experience:"4 Years",status:1},{responsiveId:"",id:18,avatar:"",fullName:"Titus Hayne",post:"Web Designer",email:"thayneh@kickstarter.com",city:"Yangon",startDate:"05/25/2019",salary:16871.48,age:"59",experience:"9 Years",status:1},{responsiveId:"",id:19,avatar:N,fullName:"Roxie Huck",post:"Administrative Assistant",email:"rhucki@ed.gov",city:"Polýkastro",startDate:"04/04/2019",salary:19653.56,age:"41",experience:"1 Year",status:4},{responsiveId:"",id:20,avatar:x,fullName:"Latashia Lewtey",post:"Actuary",email:"llewteyj@sun.com",city:"Hougong",startDate:"08/03/2017",salary:18303.87,age:"35",experience:"5 Years",status:1},{responsiveId:"",id:21,avatar:"",fullName:"Natalina Tyne",post:"Software Engineer",email:"ntynek@merriam-webster.com",city:"Yanguan",startDate:"03/16/2019",salary:15256.4,age:"30",experience:"0 Year",status:2},{responsiveId:"",id:22,avatar:"",fullName:"Faun Josefsen",post:"Analog Circuit Design manager",email:"fjosefsenl@samsung.com",city:"Wengyang",startDate:"07/08/2017",salary:11209.16,age:"40",experience:"0 Year",status:3},{responsiveId:"",id:23,avatar:x,fullName:"Rosmunda Steed",post:"Assistant Media Planner",email:"rsteedm@xing.com",city:"Manzanares",startDate:"12/23/2017",salary:13778.34,age:"21",experience:"1 Year",status:5},{responsiveId:"",id:24,avatar:"",fullName:"Scott Jiran",post:"Graphic Designer",email:"sjirann@simplemachines.org",city:"Pinglin",startDate:"05/26/2016",salary:23081.71,age:"23",experience:"3 Years",status:1},{responsiveId:"",id:25,avatar:"",fullName:"Carmita Medling",post:"Accountant",email:"cmedlingo@hp.com",city:"Bourges",startDate:"07/31/2019",salary:13602.24,age:"47",experience:"7 Years",status:3},{responsiveId:"",id:26,avatar:Y,fullName:"Morgen Benes",post:"Senior Sales Associate",email:"mbenesp@ted.com",city:"Cà Mau",startDate:"04/10/2016",salary:16969.63,age:"42",experience:"2 Years",status:4},{responsiveId:"",id:27,avatar:"",fullName:"Onfroi Doughton",post:"Civil Engineer",email:"odoughtonq@aboutads.info",city:"Utrecht (stad)",startDate:"09/29/2018",salary:23796.62,age:"28",experience:"8 Years",status:3},{responsiveId:"",id:28,avatar:"",fullName:"Kliment McGinney",post:"Chief Design Engineer",email:"kmcginneyr@paginegialle.it",city:"Xiaocheng",startDate:"07/09/2018",salary:24027.81,age:"28",experience:"8 Years",status:4},{responsiveId:"",id:29,avatar:"",fullName:"Devin Bridgland",post:"Tax Accountant",email:"dbridglands@odnoklassniki.ru",city:"Baoli",startDate:"07/17/2016",salary:13508.15,age:"48",experience:"8 Years",status:3},{responsiveId:"",id:30,avatar:F,fullName:"Gilbert McFade",post:"Biostatistician",email:"gmcfadet@irs.gov",city:"Deje",startDate:"08/28/2018",salary:21632.3,age:"20",experience:"0 Year",status:2},{responsiveId:"",id:31,avatar:"",fullName:"Teressa Bleakman",post:"Senior Editor",email:"tbleakmanu@phpbb.com",city:"Žebrák",startDate:"09/03/2016",salary:24875.41,age:"37",experience:"7 Years",status:5},{responsiveId:"",id:32,avatar:"",fullName:"Marcelia Alleburton",post:"Safety Technician",email:"malleburtonv@amazon.com",city:"Basail",startDate:"06/02/2016",salary:23888.98,age:"53",experience:"3 Years",status:2},{responsiveId:"",id:33,avatar:x,fullName:"Aili De Coursey",post:"Environmental Specialist",email:"adew@etsy.com",city:"Łazy",startDate:"09/30/2016",salary:14082.44,age:"27",experience:"7 Years",status:5},{responsiveId:"",id:34,avatar:F,fullName:"Charlton Chatres",post:"Analyst Programmer",email:"cchatresx@goo.gl",city:"Reguengos de Monsaraz",startDate:"04/07/2016",salary:21386.52,age:"22",experience:"2 Years",status:3},{responsiveId:"",id:35,avatar:j,fullName:"Nat Hugonnet",post:"Financial Advisor",email:"nhugonnety@wufoo.com",city:"Pimentel",startDate:"09/11/2019",salary:13835.97,age:"46",experience:"6 Years",status:4},{responsiveId:"",id:36,avatar:"",fullName:"Lorine Hearsum",post:"Payment Adjustment Coordinator",email:"lhearsumz@google.co.uk",city:"Shuiying",startDate:"03/05/2019",salary:22093.91,age:"47",experience:"7 Years",status:4},{responsiveId:"",id:37,avatar:K,fullName:"Sheila-kathryn Haborn",post:"Environmental Specialist",email:"shaborn10@about.com",city:"Lewolang",startDate:"11/10/2018",salary:24624.23,age:"51",experience:"1 Year",status:3},{responsiveId:"",id:38,avatar:J,fullName:"Alma Harvatt",post:"Administrative Assistant",email:"aharvatt11@addtoany.com",city:"Ulundi",startDate:"11/04/2016",salary:21782.82,age:"41",experience:"1 Year",status:1},{responsiveId:"",id:39,avatar:Y,fullName:"Beatrix Longland",post:"VP Quality Control",email:"blongland12@gizmodo.com",city:"Damu",startDate:"07/18/2016",salary:22794.6,age:"62",experience:"2 Years",status:2},{responsiveId:"",id:40,avatar:N,fullName:"Hammad Condell",post:"Project Manager",email:"hcondell13@tiny.cc",city:"Bulung'ur",startDate:"11/04/2018",salary:10872.83,age:"37",experience:"7 Years",status:4},{responsiveId:"",id:41,avatar:"",fullName:"Parker Bice",post:"Technical Writer",email:"pbice14@ameblo.jp",city:"Shanlian",startDate:"03/02/2016",salary:17471.92,age:"65",experience:"5 Years",status:5},{responsiveId:"",id:42,avatar:"",fullName:"Lowrance Orsi",post:"Biostatistician",email:"lorsi15@wp.com",city:"Dengteke",startDate:"12/10/2018",salary:24719.51,age:"64",experience:"4 Years",status:1},{responsiveId:"",id:43,avatar:R,fullName:"Ddene Chaplyn",post:"Environmental Tech",email:"dchaplyn16@nymag.com",city:"Lattes",startDate:"01/23/2019",salary:11958.33,age:"38",experience:"8 Years",status:2},{responsiveId:"",id:44,avatar:"",fullName:"Washington Bygraves",post:"Human Resources Manager",email:"wbygraves17@howstuffworks.com",city:"Zlaté Hory",startDate:"09/07/2016",salary:10552.43,age:"37",experience:"7 Years",status:1},{responsiveId:"",id:45,avatar:x,fullName:"Meghann Bodechon",post:"Operator",email:"mbodechon18@1und1.de",city:"Itō",startDate:"07/23/2018",salary:23024.28,age:"61",experience:"1 Year",status:4},{responsiveId:"",id:46,avatar:j,fullName:"Moshe De Ambrosis",post:"Recruiting Manager",email:"mde19@purevolume.com",city:"San Diego",startDate:"02/10/2018",salary:10409.9,age:"47",experience:"7 Years",status:5},{responsiveId:"",id:47,avatar:N,fullName:"Had Chatelot",post:"Cost Accountant",email:"hchatelot1a@usatoday.com",city:"Mercedes",startDate:"11/23/2016",salary:11446.3,age:"64",experience:"4 Years",status:4},{responsiveId:"",id:48,avatar:"",fullName:"Georgia McCrum",post:"Registered Nurse",email:"gmccrum1b@icio.us",city:"Nggalak",startDate:"04/19/2018",salary:14002.31,age:"63",experience:"3 Years",status:1},{responsiveId:"",id:49,avatar:K,fullName:"Krishnah Stilldale",post:"VP Accounting",email:"kstilldale1c@chronoengine.com",city:"Slavs'ke",startDate:"03/18/2017",salary:10704.29,age:"56",experience:"6 Years",status:1},{responsiveId:"",id:50,avatar:N,fullName:"Mario Umbert",post:"Research Assistant",email:"mumbert1d@digg.com",city:"Chorotis",startDate:"05/13/2019",salary:21813.54,age:"43",experience:"3 Years",status:1},{responsiveId:"",id:51,avatar:"",fullName:"Edvard Dixsee",post:"Graphic Designer",email:"edixsee1e@unblog.fr",city:"Rancharia",startDate:"04/23/2019",salary:18053.11,age:"46",experience:"6 Years",status:3},{responsiveId:"",id:52,avatar:x,fullName:"Tammie Davydoch",post:"VP Quality Control",email:"tdavydoch1f@examiner.com",city:"Mamedkala",startDate:"04/19/2016",salary:17617.08,age:"47",experience:"7 Years",status:3},{responsiveId:"",id:53,avatar:"",fullName:"Benito Rodolico",post:"Safety Technician",email:"brodolico1g@sciencedirect.com",city:"Wonosobo",startDate:"10/06/2018",salary:18866.55,age:"21",experience:"1 Year",status:5},{responsiveId:"",id:54,avatar:"",fullName:"Marco Pennings",post:"Compensation Analyst",email:"mpennings1h@bizjournals.com",city:"Umag",startDate:"06/15/2017",salary:13722.18,age:"30",experience:"0 Year",status:3},{responsiveId:"",id:55,avatar:"",fullName:"Tommie O'Corr",post:"Quality Engineer",email:"tocorr1i@nyu.edu",city:"Olhos de Água",startDate:"09/26/2018",salary:15228.8,age:"51",experience:"1 Year",status:1},{responsiveId:"",id:56,avatar:j,fullName:"Cybill Poyle",post:"Cost Accountant",email:"cpoyle1j@amazon.com",city:"Hamm",startDate:"01/03/2016",salary:13951.96,age:"29",experience:"9 Years",status:1},{responsiveId:"",id:57,avatar:F,fullName:"Norry Stoller",post:"Human Resources Manager",email:"nstoller1k@noaa.gov",city:"Ruukki",startDate:"02/04/2018",salary:15100,age:"27",experience:"7 Years",status:4},{responsiveId:"",id:58,avatar:"",fullName:"Wendi Somerlie",post:"Systems Administrator",email:"wsomerlie1l@accuweather.com",city:"Meicheng",startDate:"04/22/2016",salary:20023.52,age:"28",experience:"9 Years",status:5},{responsiveId:"",id:59,avatar:"",fullName:"Ferdie Georgeon",post:"Geologist",email:"fgeorgeon1m@nhs.uk",city:"Tanahbeureum",startDate:"04/08/2019",salary:12630.26,age:"28",experience:"1 Year",status:2},{responsiveId:"",id:60,avatar:"",fullName:"Jules Auten",post:"Desktop Support Technician",email:"jauten1n@foxnews.com",city:"Mojo",startDate:"08/13/2019",salary:13870.62,age:"48",experience:"5 Years",status:4},{responsiveId:"",id:61,avatar:J,fullName:"Nichole Dacres",post:"Mechanical Systems Engineer",email:"ndacres1o@apache.org",city:"Kimanuit",startDate:"11/06/2017",salary:18220.51,age:"20",experience:"0 Year",status:3},{responsiveId:"",id:62,avatar:j,fullName:"Holly Edgworth",post:"Junior Executive",email:"hedgworth1p@craigslist.org",city:"Pedreira",startDate:"08/05/2017",salary:13999.88,age:"37",experience:"0 Year",status:5},{responsiveId:"",id:63,avatar:x,fullName:"Henriette Croft",post:"Food Chemist",email:"hcroft1q@desdev.cn",city:"Taizhou",startDate:"09/12/2019",salary:11049.79,age:"53",experience:"1 Year",status:5},{responsiveId:"",id:64,avatar:"",fullName:"Annetta Glozman",post:"Staff Accountant",email:"aglozman1r@storify.com",city:"Pendawanbaru",startDate:"08/25/2017",salary:10745.32,age:"27",experience:"3 Years",status:5},{responsiveId:"",id:65,avatar:"",fullName:"Cletis Cervantes",post:"Health Coach",email:"ccervantes1s@de.vu",city:"Solnechnyy",startDate:"05/24/2018",salary:24769.08,age:"22",experience:"7 Years",status:1},{responsiveId:"",id:66,avatar:x,fullName:"Christos Kiley",post:"Geologist",email:"ckiley1t@buzzfeed.com",city:"El Bolsón",startDate:"02/27/2019",salary:16053.15,age:"46",experience:"2 Years",status:1},{responsiveId:"",id:67,avatar:x,fullName:"Silvain Siebert",post:"VP Sales",email:"ssiebert1u@domainmarket.com",city:"Cadiz",startDate:"09/23/2017",salary:23347.17,age:"47",experience:"8 Years",status:5},{responsiveId:"",id:68,avatar:"",fullName:"Sharla Ibberson",post:"Payment Adjustment Coordinator",email:"sibberson1v@virginia.edu",city:"Lamam",startDate:"11/01/2016",salary:15658.4,age:"51",experience:"8 Years",status:1},{responsiveId:"",id:69,avatar:x,fullName:"Ripley Rentcome",post:"Physical Therapy Assistant",email:"rrentcome1w@youtu.be",city:"Dashkawka",startDate:"07/15/2018",salary:15396.66,age:"41",experience:"8 Years",status:2},{responsiveId:"",id:70,avatar:"",fullName:"Chrisse Birrane",post:"Chemical Engineer",email:"cbirrane1x@google.com.br",city:"Las Toscas",startDate:"05/22/2016",salary:15823.4,age:"62",experience:"0 Year",status:5},{responsiveId:"",id:71,avatar:"",fullName:"Georges Tesyro",post:"Human Resources Manager",email:"gtesyro1y@last.fm",city:"Gabao",startDate:"01/27/2019",salary:19051.25,age:"37",experience:"7 Years",status:1},{responsiveId:"",id:72,avatar:"",fullName:"Bondon Hazard",post:"Geological Engineer",email:"bhazard1z@over-blog.com",city:"Llano de Piedra",startDate:"01/17/2019",salary:11632.84,age:"65",experience:"3 Years",status:4},{responsiveId:"",id:73,avatar:N,fullName:"Aliza MacElholm",post:"VP Sales",email:"amacelholm20@printfriendly.com",city:"Sosnovyy Bor",startDate:"11/17/2017",salary:16741.31,age:"64",experience:"7 Years",status:2},{responsiveId:"",id:74,avatar:Y,fullName:"Lucas Witherdon",post:"Senior Quality Engineer",email:"lwitherdon21@storify.com",city:"Staré Křečany",startDate:"09/26/2016",salary:19387.76,age:"38",experience:"2 Years",status:3},{responsiveId:"",id:75,avatar:"",fullName:"Pegeen Peasegod",post:"Web Designer",email:"ppeasegod22@slideshare.net",city:"Keda",startDate:"05/21/2016",salary:24014.04,age:"59",experience:"6 Years",status:3},{responsiveId:"",id:76,avatar:"",fullName:"Elyn Watkinson",post:"Structural Analysis Engineer",email:"ewatkinson23@blogspot.com",city:"Osan",startDate:"09/30/2016",salary:14493.51,age:"55",experience:"7 Years",status:1},{responsiveId:"",id:77,avatar:R,fullName:"Babb Skirving",post:"Analyst Programmer",email:"bskirving24@cbsnews.com",city:"Balky",startDate:"09/27/2016",salary:24733.28,age:"39",experience:"1 Year",status:4},{responsiveId:"",id:78,avatar:"",fullName:"Shelli Ondracek",post:"Financial Advisor",email:"sondracek25@plala.or.jp",city:"Aoluguya Ewenke Minzu",startDate:"03/28/2016",salary:21922.17,age:"23",experience:"1 Year",status:3},{responsiveId:"",id:79,avatar:x,fullName:"Stanislaw Melloy",post:"Sales Associate",email:"smelloy26@fastcompany.com",city:"Funafuti",startDate:"04/13/2017",salary:16944.42,age:"30",experience:"2 Years",status:2},{responsiveId:"",id:80,avatar:"",fullName:"Seamus Eisikovitsh",post:"Legal Assistant",email:"seisikovitsh27@usgs.gov",city:"Cangkringan",startDate:"05/28/2018",salary:21963.69,age:"22",experience:"7 Years",status:1},{responsiveId:"",id:81,avatar:Y,fullName:"Tammie Wattins",post:"Web Designer",email:"twattins28@statcounter.com",city:"Xilin",startDate:"08/07/2018",salary:16049.93,age:"36",experience:"5 Years",status:2},{responsiveId:"",id:82,avatar:K,fullName:"Aila Quailadis",post:"Technical Writer",email:"aquail29@prlog.org",city:"Shuangchahe",startDate:"02/11/2018",salary:24137.29,age:"43",experience:"4 Years",status:4},{responsiveId:"",id:83,avatar:"",fullName:"Myrvyn Gilogly",post:"Research Associate",email:"mgilogly2a@elpais.com",city:"Prince Rupert",startDate:"05/13/2018",salary:10089.96,age:"19",experience:"8 Years",status:4},{responsiveId:"",id:84,avatar:N,fullName:"Hanna Langthorne",post:"Analyst Programmer",email:"hlangthorne2b@stumbleupon.com",city:"Guaynabo",startDate:"11/11/2018",salary:14227.1,age:"21",experience:"7 Years",status:3},{responsiveId:"",id:85,avatar:"",fullName:"Ruby Gimblet",post:"Registered Nurse",email:"rgimblet2c@1688.com",city:"Nanyulinxi",startDate:"03/28/2016",salary:19562.59,age:"30",experience:"1 Year",status:2},{responsiveId:"",id:86,avatar:N,fullName:"Louis Paszak",post:"Programmer",email:"lpaszak2d@behance.net",city:"Chiscas",startDate:"04/25/2016",salary:17178.86,age:"51",experience:"7 Years",status:5},{responsiveId:"",id:87,avatar:"",fullName:"Glennie Riolfi",post:"Computer Systems Analyst",email:"griolfi2e@drupal.org",city:"Taung",startDate:"06/18/2018",salary:15089.83,age:"29",experience:"4 Years",status:3},{responsiveId:"",id:88,avatar:"",fullName:"Jemimah Morgan",post:"Staff Accountant",email:"jmorgan2f@nifty.com",city:"La Esperanza",startDate:"01/17/2016",salary:18330.72,age:"27",experience:"3 Years",status:1},{responsiveId:"",id:89,avatar:R,fullName:"Talya Brandon",post:"Food Chemist",email:"tbrandon2g@ucoz.com",city:"Zaječar",startDate:"10/08/2018",salary:16284.64,age:"28",experience:"6 Years",status:1},{responsiveId:"",id:90,avatar:F,fullName:"Renate Shay",post:"Recruiter",email:"rshay2h@tumblr.com",city:"Pueblo Viejo",startDate:"03/15/2017",salary:18523.75,age:"28",experience:"3 Years",status:1},{responsiveId:"",id:91,avatar:"",fullName:"Julianne Bartosik",post:"Senior Cost Accountant",email:"jbartosik2i@state.gov",city:"Botlhapatlou",startDate:"02/06/2017",salary:17607.66,age:"48",experience:"6 Years",status:3},{responsiveId:"",id:92,avatar:J,fullName:"Yvonne Emberton",post:"Recruiter",email:"yemberton2j@blog.com",city:"Nagcarlan",startDate:"02/13/2017",salary:17550.18,age:"20",experience:"1 Year",status:4},{responsiveId:"",id:93,avatar:K,fullName:"Danya Faichnie",post:"Social Worker",email:"dfaichnie2k@weather.com",city:"Taling",startDate:"07/29/2019",salary:18469.35,age:"37",experience:"3 Years",status:4},{responsiveId:"",id:94,avatar:"",fullName:"Ronica Hasted",post:"Software Consultant",email:"rhasted2l@hexun.com",city:"Gangkou",startDate:"07/04/2019",salary:24866.66,age:"53",experience:"7 Years",status:4},{responsiveId:"",id:96,avatar:"",fullName:"Alaric Beslier",post:"Tax Accountant",email:"abeslier2n@zimbio.com",city:"Ocucaje",startDate:"04/16/2017",salary:19366.53,age:"22",experience:"8 Years",status:4},{responsiveId:"",id:2,avatar:j,fullName:"Bailie Coulman",post:"VP Quality Control",email:"bcoulman1@yolasite.com",city:"Hinigaran",startDate:"05/20/2018",salary:13633.69,age:"63",experience:"3 Years",status:2},{responsiveId:"",id:97,avatar:"",fullName:"Reina Peckett",post:"Quality Control Specialist",email:"rpeckett2o@timesonline.co.uk",city:"Anyang",startDate:"05/20/2018",salary:16619.4,age:"46",experience:"8 Years",status:4},{responsiveId:"",id:98,avatar:x,fullName:"Olivette Gudgin",post:"Paralegal",email:"ogudgin2p@gizmodo.com",city:"Fujinomiya",startDate:"04/09/2019",salary:15211.6,age:"47",experience:"8 Years",status:2},{responsiveId:"",id:99,avatar:R,fullName:"Evangelina Carnock",post:"Cost Accountant",email:"ecarnock2q@washington.edu",city:"Doushaguan",startDate:"01/26/2017",salary:23704.82,age:"51",experience:"0 Year",status:4},{responsiveId:"",id:100,avatar:"",fullName:"Glyn Giacoppo",post:"Software Test Engineer",email:"ggiacoppo2r@apache.org",city:"Butha-Buthe",startDate:"04/15/2017",salary:24973.48,age:"41",experience:"7 Years",status:2}],Ye={class:"d-flex align-center"},Re={key:1},Pe={class:"d-flex flex-column ms-3"},Me={class:"d-block font-weight-medium text-high-emphasis text-truncate"},Be={class:"d-flex flex-wrap justify-center justify-sm-space-between gap-y-2 mt-2"},Le={__name:"DemoDataTableExternalPagination",setup(I){const c=T([]),m=T({page:1,itemsPerPage:5,sortBy:[""],sortDesc:[!1]}),l=[{title:"NAME",key:"fullName"},{title:"EMAIL",key:"email"},{title:"DATE",key:"startDate"},{title:"SALARY",key:"salary"},{title:"AGE",key:"age"},{title:"STATUS",key:"status"}],i=t=>t===1?{color:"primary",text:"Current"}:t===2?{color:"success",text:"Professional"}:t===3?{color:"error",text:"Rejected"}:t===4?{color:"warning",text:"Resigned"}:{color:"info",text:"Applied"};return ie(()=>{c.value=JSON.parse(JSON.stringify(B))}),(t,u)=>(d(),g(s(S),{headers:l,items:s(c),"items-per-page":s(m).itemsPerPage,page:s(m).page,options:s(m)},{"item.fullName":a(({item:p})=>[r("div",Ye,[e(_,{size:"32",color:p.avatar?"":"primary",class:P(p.avatar?"":"v-avatar-light-bg primary--text"),variant:p.avatar?void 0:"tonal"},{default:a(()=>[p.avatar?(d(),g(C,{key:0,src:p.avatar},null,8,["src"])):(d(),k("span",Re,o(("avatarText"in t?t.avatarText:s(z))(p.fullName)),1))]),_:2},1032,["color","class","variant"]),r("div",Pe,[r("span",Me,o(p.fullName),1),r("small",null,o(p.post),1)])])]),"item.status":a(({item:p})=>[e(M,{color:i(p.status).color,class:"font-weight-medium",size:"small"},{default:a(()=>[b(o(i(p.status).text),1)]),_:2},1032,["color"])]),bottom:a(()=>[e(Z,{class:"pt-2"},{default:a(()=>[r("div",Be,[e($,{modelValue:s(m).itemsPerPage,"onUpdate:modelValue":u[0]||(u[0]=p=>s(m).itemsPerPage=p),label:"Rows per page:",type:"number",min:"-1",max:"15","hide-details":"",variant:"underlined",style:{"max-inline-size":"8rem","min-inline-size":"5rem"}},null,8,["modelValue"]),e(ve,{modelValue:s(m).page,"onUpdate:modelValue":u[1]||(u[1]=p=>s(m).page=p),"total-visible":t.$vuetify.display.smAndDown?3:5,length:Math.ceil(s(c).length/s(m).itemsPerPage)},null,8,["modelValue","total-visible","length"])])]),_:1})]),_:1},8,["items","items-per-page","page","options"]))}},ze={class:"d-flex align-center"},Ge={key:1},je={class:"d-flex flex-column ms-3"},$e={class:"d-block font-weight-medium text-high-emphasis text-truncate"},Oe={class:"d-flex gap-1"},Ue=r("span",{class:"headline"},"Edit Item",-1),He={__name:"DemoDataTableRowEditingViaDialog",setup(I){const c=T(!1),m=T(!1),l=T({responsiveId:"",id:-1,avatar:"",fullName:"",post:"",email:"",city:"",startDate:"",salary:-1,age:"",experience:"",status:-1}),i=T(l.value),t=T(-1),u=T([]),p=[{text:"Current",value:1},{text:"Professional",value:2},{text:"Rejected",value:3},{text:"Resigned",value:4},{text:"Applied",value:5}],v=[{title:"NAME",key:"fullName"},{title:"EMAIL",key:"email"},{title:"DATE",key:"startDate"},{title:"SALARY",key:"salary"},{title:"AGE",key:"age"},{title:"STATUS",key:"status"},{title:"ACTIONS",key:"actions"}],w=n=>n===1?{color:"primary",text:"Current"}:n===2?{color:"success",text:"Professional"}:n===3?{color:"error",text:"Rejected"}:n===4?{color:"warning",text:"Resigned"}:{color:"info",text:"Applied"},E=n=>{t.value=u.value.indexOf(n),i.value={...n},c.value=!0},G=n=>{t.value=u.value.indexOf(n),i.value={...n},m.value=!0},D=()=>{c.value=!1,t.value=-1,i.value={...l.value}},V=()=>{m.value=!1,t.value=-1,i.value={...l.value}},L=()=>{t.value>-1?Object.assign(u.value[t.value],i.value):u.value.push(i.value),D()},W=()=>{u.value.splice(t.value,1),V()};return ie(()=>{u.value=JSON.parse(JSON.stringify(B))}),(n,f)=>{const H=re("IconBtn"),oe=fe;return d(),k(le,null,[e(s(S),{headers:v,items:s(u),"items-per-page":5},{"item.fullName":a(({item:y})=>[r("div",ze,[e(_,{size:"32",color:y.avatar?"":"primary",class:P(y.avatar?"":"v-avatar-light-bg primary--text"),variant:y.avatar?void 0:"tonal"},{default:a(()=>[y.avatar?(d(),g(C,{key:0,src:y.avatar},null,8,["src"])):(d(),k("span",Ge,o(("avatarText"in n?n.avatarText:s(z))(y.fullName)),1))]),_:2},1032,["color","class","variant"]),r("div",je,[r("span",$e,o(y.fullName),1),r("small",null,o(y.post),1)])])]),"item.status":a(({item:y})=>[e(M,{color:w(y.status).color,size:"small"},{default:a(()=>[b(o(w(y.status).text),1)]),_:2},1032,["color"])]),"item.actions":a(({item:y})=>[r("div",Oe,[e(H,{onClick:A=>E(y.raw)},{default:a(()=>[e(U,{icon:"tabler-edit"})]),_:2},1032,["onClick"]),e(H,{onClick:A=>G(y.raw)},{default:a(()=>[e(U,{icon:"tabler-trash"})]),_:2},1032,["onClick"])])]),_:1},8,["items"]),e(se,{modelValue:s(c),"onUpdate:modelValue":f[6]||(f[6]=y=>Q(c)?c.value=y:null),"max-width":"600px"},{default:a(()=>[e(ee,null,{default:a(()=>[e(ae,null,{default:a(()=>[Ue]),_:1}),e(Z,null,{default:a(()=>{var y;return[b(o((y=s(i))==null?void 0:y.fullName)+" ",1),e(ye,null,{default:a(()=>[e(q,null,{default:a(()=>[e(h,{cols:"12",sm:"6",md:"4"},{default:a(()=>[e($,{modelValue:s(i).fullName,"onUpdate:modelValue":f[0]||(f[0]=A=>s(i).fullName=A),label:"User name"},null,8,["modelValue"])]),_:1}),e(h,{cols:"12",sm:"6",md:"4"},{default:a(()=>[e($,{modelValue:s(i).email,"onUpdate:modelValue":f[1]||(f[1]=A=>s(i).email=A),label:"Email"},null,8,["modelValue"])]),_:1}),e(h,{cols:"12",sm:"6",md:"4"},{default:a(()=>[e($,{modelValue:s(i).salary,"onUpdate:modelValue":f[2]||(f[2]=A=>s(i).salary=A),label:"Salary",prefix:"$",type:"number"},null,8,["modelValue"])]),_:1}),e(h,{cols:"12",sm:"6",md:"4"},{default:a(()=>[e($,{modelValue:s(i).age,"onUpdate:modelValue":f[3]||(f[3]=A=>s(i).age=A),label:"Age",type:"number"},null,8,["modelValue"])]),_:1}),e(h,{cols:"12",sm:"6",md:"4"},{default:a(()=>[e($,{modelValue:s(i).startDate,"onUpdate:modelValue":f[4]||(f[4]=A=>s(i).startDate=A),label:"Date"},null,8,["modelValue"])]),_:1}),e(h,{cols:"12",sm:"6",md:"4"},{default:a(()=>[e(oe,{modelValue:s(i).status,"onUpdate:modelValue":f[5]||(f[5]=A=>s(i).status=A),items:p,"item-title":"text","item-value":"value",label:"Standard",variant:"underlined",readonly:""},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})]}),_:1}),e(te,null,{default:a(()=>[e(X),e(O,{color:"error",variant:"outlined",onClick:D},{default:a(()=>[b(" Cancel ")]),_:1}),e(O,{color:"success",variant:"elevated",onClick:L},{default:a(()=>[b(" Save ")]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),e(se,{modelValue:s(m),"onUpdate:modelValue":f[7]||(f[7]=y=>Q(m)?m.value=y:null),"max-width":"500px"},{default:a(()=>[e(ee,null,{default:a(()=>[e(ae,null,{default:a(()=>[b(" Are you sure you want to delete this item? ")]),_:1}),e(te,null,{default:a(()=>[e(X),e(O,{color:"error",variant:"outlined",onClick:V},{default:a(()=>[b(" Cancel ")]),_:1}),e(O,{color:"success",variant:"elevated",onClick:W},{default:a(()=>[b(" OK ")]),_:1}),e(X)]),_:1})]),_:1})]),_:1},8,["modelValue"])],64)}}},Fe={class:"d-flex align-center"},Ke={key:1},We={class:"d-flex flex-column ms-3"},Je={class:"d-block font-weight-medium text-high-emphasis text-truncate"},Xe={__name:"DemoDataTableGroupingRows",setup(I){const c=[{responsiveId:"",id:1,avatar:R,fullName:"Korrie O'Crevy",post:"Nuclear Power Engineer",email:"kocrevy0@thetimes.co.uk",city:"Krasnosilka",startDate:"09/23/2016",salary:23896.35,age:"61",experience:"1 Year",status:"Professional"},{responsiveId:"",id:2,avatar:j,fullName:"Bailie Coulman",post:"VP Quality Control",email:"bcoulman1@yolasite.com",city:"Hinigaran",startDate:"05/20/2018",salary:13633.69,age:"63",experience:"3 Years",status:"Professional"},{responsiveId:"",id:3,avatar:x,fullName:"Stella Ganderton",post:"Operator",email:"sganderton2@tuttocitta.it",city:"Golcowa",startDate:"03/24/2018",salary:13076.28,age:"66",experience:"6 Years",status:"Applied"},{responsiveId:"",id:4,avatar:R,fullName:"Dorolice Crossman",post:"Cost Accountant",email:"dcrossman3@google.co.jp",city:"Paquera",startDate:"12/03/2017",salary:12336.17,age:"22",experience:"2 Years",status:"Professional"},{responsiveId:"",id:6,avatar:"",fullName:"Genevra Honeywood",post:"Geologist",email:"ghoneywood5@narod.ru",city:"Maofan",startDate:"06/01/2017",salary:17803.8,age:"61",experience:"1 Year",status:"Current"},{responsiveId:"",id:7,avatar:"",fullName:"Eileen Diehn",post:"Environmental Specialist",email:"ediehn6@163.com",city:"Lampuyang",startDate:"10/15/2017",salary:18991.67,age:"59",experience:"9 Years",status:"Rejected"},{responsiveId:"",id:8,avatar:x,fullName:"Richardo Aldren",post:"Senior Sales Associate",email:"raldren7@mtv.com",city:"Skoghall",startDate:"11/05/2016",salary:19230.13,age:"55",experience:"5 Years",status:"Rejected"},{responsiveId:"",id:9,avatar:Y,fullName:"Allyson Moakler",post:"Safety Technician",email:"amoakler8@shareasale.com",city:"Mogilany",startDate:"12/29/2018",salary:11677.32,age:"39",experience:"9 Years",status:"Applied"},{responsiveId:"",id:11,avatar:"",fullName:"De Falloon",post:"Sales Representative",email:"dfalloona@ifeng.com",city:"Colima",startDate:"06/12/2018",salary:19252.12,age:"30",experience:"0 Year",status:"Resigned"},{responsiveId:"",id:12,avatar:"",fullName:"Cyrus Gornal",post:"Senior Sales Associate",email:"cgornalb@fda.gov",city:"Boro Utara",startDate:"12/09/2017",salary:16745.47,age:"22",experience:"2 Years",status:"Resigned"},{responsiveId:"",id:13,avatar:"",fullName:"Tallou Balf",post:"Staff Accountant",email:"tbalfc@sina.com.cn",city:"Siliana",startDate:"01/21/2016",salary:15488.53,age:"36",experience:"6 Years",status:"Resigned"},{responsiveId:"",id:15,avatar:"",fullName:"Wilmar Bourton",post:"Administrative Assistant",email:"wbourtone@sakura.ne.jp",city:"Bích Động",startDate:"04/25/2018",salary:13304.45,age:"19",experience:"9 Years",status:"Applied"},{responsiveId:"",id:16,avatar:N,fullName:"Robinson Brazenor",post:"General Manager",email:"rbrazenorf@symantec.com",city:"Gendiwu",startDate:"12/23/2017",salary:11953.08,age:"66",experience:"6 Years",status:"Applied"},{responsiveId:"",id:17,avatar:"",fullName:"Nadia Bettenson",post:"Environmental Tech",email:"nbettensong@joomla.org",city:"Chabařovice",startDate:"07/11/2018",salary:20484.44,age:"64",experience:"4 Years",status:"Current"},{responsiveId:"",id:18,avatar:"",fullName:"Titus Hayne",post:"Web Designer",email:"thayneh@kickstarter.com",city:"Yangon",startDate:"05/25/2019",salary:16871.48,age:"59",experience:"9 Years",status:"Current"},{responsiveId:"",id:19,avatar:N,fullName:"Roxie Huck",post:"Administrative Assistant",email:"rhucki@ed.gov",city:"Polýkastro",startDate:"04/04/2019",salary:19653.56,age:"41",experience:"1 Year",status:"Resigned"},{responsiveId:"",id:23,avatar:x,fullName:"Rosmunda Steed",post:"Assistant Media Planner",email:"rsteedm@xing.com",city:"Manzanares",startDate:"12/23/2017",salary:13778.34,age:"21",experience:"1 Year",status:"Applied"},{responsiveId:"",id:26,avatar:Y,fullName:"Morgen Benes",post:"Senior Sales Associate",email:"mbenesp@ted.com",city:"Cà Mau",startDate:"04/10/2016",salary:16969.63,age:"42",experience:"2 Years",status:"Resigned"},{responsiveId:"",id:28,avatar:"",fullName:"Kliment McGinney",post:"Chief Design Engineer",email:"kmcginneyr@paginegialle.it",city:"Xiaocheng",startDate:"07/09/2018",salary:24027.81,age:"28",experience:"8 Years",status:"Resigned"},{responsiveId:"",id:31,avatar:"",fullName:"Teressa Bleakman",post:"Senior Editor",email:"tbleakmanu@phpbb.com",city:"Žebrák",startDate:"09/03/2016",salary:24875.41,age:"37",experience:"7 Years",status:"Applied"}],m=[{title:"Group by status",key:"data-table-group"},{title:"NAME",key:"fullName"},{title:"EMAIL",key:"email"},{title:"DATE",key:"startDate"},{title:"SALARY",key:"salary"},{title:"AGE",key:"age"},{title:"STATUS",key:"status"}],l=[{key:"status"}],i=u=>u==="Current"?{color:"primary"}:u==="Professional"?{color:"success"}:u==="Rejected"?{color:"error"}:u==="Resigned"?{color:"warning"}:{color:"info"},t=u=>u.icon;return(u,p)=>(d(),g(s(S),{headers:m,items:c,"items-per-page":10,"group-by":l},{"item.fullName":a(({item:v})=>[r("div",Fe,[e(_,{size:"32",color:v.avatar?"":"primary",class:P(v.avatar?"":"v-avatar-light-bg primary--text"),variant:v.avatar?void 0:"tonal"},{default:a(()=>[v.avatar?(d(),g(C,{key:0,src:v.avatar},null,8,["src"])):(d(),k("span",Ke,o(s(z)(v.fullName)),1))]),_:2},1032,["color","class","variant"]),r("div",We,[r("span",Je,o(v.fullName),1),r("small",null,o(v.post),1)])])]),"item.status":a(({item:v})=>[e(M,{color:i(v.status).color,size:"small",class:"font-weight-medium"},{default:a(()=>[b(o(v.status),1)]),_:2},1032,["color"])]),"data-table-group":a(({props:v,item:w,count:E})=>[r("td",null,[e(O,pe(v,{variant:"text",density:"comfortable"}),{default:a(()=>[e(U,{class:"flip-in-rtl",icon:t(v)},null,8,["icon"])]),_:2},1040),r("span",null,o(w.value),1),r("span",null,"("+o(E)+")",1)])]),_:1}))}},Qe={class:"v-data-table__tr"},qe=["colspan"],Ze={class:"my-1"},ea={class:"my-1"},aa={class:"d-flex align-center"},ta={key:1},sa={class:"d-flex flex-column ms-3"},ra={class:"d-block font-weight-medium text-high-emphasis text-truncate"},la={__name:"DemoDataTableExpandableRows",setup(I){const c=[{title:"",key:"data-table-expand"},{title:"NAME",key:"fullName"},{title:"EMAIL",key:"email"},{title:"DATE",key:"startDate"},{title:"SALARY",key:"salary"},{title:"AGE",key:"age"},{title:"STATUS",key:"status"}],m=l=>l===1?{color:"primary",text:"Current"}:l===2?{color:"success",text:"Professional"}:l===3?{color:"error",text:"Rejected"}:l===4?{color:"warning",text:"Resigned"}:{color:"info",text:"Applied"};return(l,i)=>(d(),g(s(S),{headers:c,items:s(B),"items-per-page":5,"expand-on-click":""},{"expanded-row":a(t=>[r("tr",Qe,[r("td",{colspan:c.length},[r("p",Ze," City: "+o(t.item.city),1),r("p",ea," Experience: "+o(t.item.experience),1),r("p",null,"Post: "+o(t.item.post),1)],8,qe)])]),"item.fullName":a(({item:t})=>[r("div",aa,[e(_,{size:"32",color:t.avatar?"":"primary",class:P(t.avatar?"":"v-avatar-light-bg primary--text"),variant:t.avatar?void 0:"tonal"},{default:a(()=>[t.avatar?(d(),g(C,{key:0,src:t.avatar},null,8,["src"])):(d(),k("span",ta,o(("avatarText"in l?l.avatarText:s(z))(t.fullName)),1))]),_:2},1032,["color","class","variant"]),r("div",sa,[r("span",ra,o(t.fullName),1),r("small",null,o(t.post),1)])])]),"item.status":a(({item:t})=>[e(M,{color:m(t.status).color,class:"font-weight-medium",size:"small"},{default:a(()=>[b(o(m(t.status).text),1)]),_:2},1032,["color"])]),_:1},8,["items"]))}},ia={class:"d-flex align-center"},oa={key:1},na={class:"d-flex flex-column ms-3"},ma={class:"d-block font-weight-medium text-high-emphasis text-truncate"},ca={__name:"DemoDataTableFixedHeader",setup(I){const c=[{title:"NAME",key:"fullName"},{title:"EMAIL",key:"email"},{title:"DATE",key:"startDate"},{title:"SALARY",key:"salary"},{title:"AGE",key:"age"},{title:"STATUS",key:"status"}],m=l=>l===1?{color:"primary",text:"Current"}:l===2?{color:"success",text:"Professional"}:l===3?{color:"error",text:"Rejected"}:l===4?{color:"warning",text:"Resigned"}:{color:"info",text:"Applied"};return(l,i)=>(d(),g(s(S),{headers:c,items:s(B),"items-per-page":10,height:"300","fixed-header":""},{"item.fullName":a(({item:t})=>[r("div",ia,[e(_,{size:"32",color:t.avatar?"":"primary",class:P(t.avatar?"":"v-avatar-light-bg primary--text"),variant:t.avatar?void 0:"tonal"},{default:a(()=>[t.avatar?(d(),g(C,{key:0,src:t.avatar},null,8,["src"])):(d(),k("span",oa,o(("avatarText"in l?l.avatarText:s(z))(t.fullName)),1))]),_:2},1032,["color","class","variant"]),r("div",na,[r("span",ma,o(t.fullName),1),r("small",null,o(t.post),1)])])]),"item.status":a(({item:t})=>[e(M,{color:m(t.status).color,class:"font-weight-medium",size:"small"},{default:a(()=>[b(o(m(t.status).text),1)]),_:2},1032,["color"])]),_:1},8,["items"]))}},da={class:"d-flex align-center"},ua={key:1},pa={class:"d-flex flex-column ms-3"},va={class:"d-block font-weight-medium text-high-emphasis text-truncate"},fa={__name:"DemoDataTableRowSelection",setup(I){const c=[{title:"NAME",key:"fullName"},{title:"EMAIL",key:"email"},{title:"DATE",key:"startDate"},{title:"SALARY",key:"salary"},{title:"AGE",key:"age"},{title:"STATUS",key:"status"}],m=l=>l===1?{color:"primary",text:"Current"}:l===2?{color:"success",text:"Professional"}:l===3?{color:"error",text:"Rejected"}:l===4?{color:"warning",text:"Resigned"}:{color:"info",text:"Applied"};return(l,i)=>(d(),g(s(S),{headers:c,items:s(B),"items-per-page":5,"show-select":""},{"item.fullName":a(({item:t})=>[r("div",da,[e(_,{size:"32",color:t.avatar?"":"primary",class:P(t.avatar?"":"v-avatar-light-bg primary--text"),variant:t.avatar?void 0:"tonal"},{default:a(()=>[t.avatar?(d(),g(C,{key:0,src:t.avatar},null,8,["src"])):(d(),k("span",ua,o(("avatarText"in l?l.avatarText:s(z))(t.fullName)),1))]),_:2},1032,["color","class","variant"]),r("div",pa,[r("span",va,o(t.fullName),1),r("small",null,o(t.post),1)])])]),"item.status":a(({item:t})=>[e(M,{color:m(t.status).color,class:"font-weight-medium",size:"small"},{default:a(()=>[b(o(m(t.status).text),1)]),_:2},1032,["color"])]),_:1},8,["items"]))}},ya={class:"d-flex align-center"},ga={key:1},xa={class:"d-flex flex-column ms-3"},ha={class:"d-block font-weight-medium text-high-emphasis text-truncate"},ba={__name:"DemoDataTableCellSlot",setup(I){const c=[{title:"NAME",key:"fullName"},{title:"EMAIL",key:"email"},{title:"DATE",key:"startDate"},{title:"SALARY",key:"salary"},{title:"AGE",key:"age"},{title:"STATUS",key:"status"}],m=l=>l===1?{color:"primary",text:"Current"}:l===2?{color:"success",text:"Professional"}:l===3?{color:"error",text:"Rejected"}:l===4?{color:"warning",text:"Resigned"}:{color:"info",text:"Applied"};return(l,i)=>(d(),g(s(S),{headers:c,items:s(B),"items-per-page":5},{"item.fullName":a(({item:t})=>[r("div",ya,[e(_,{size:"32",color:t.avatar?"":"primary",class:P(t.avatar?"":"v-avatar-light-bg primary--text"),variant:t.avatar?void 0:"tonal"},{default:a(()=>[t.avatar?(d(),g(C,{key:0,src:t.avatar},null,8,["src"])):(d(),k("span",ga,o(("avatarText"in l?l.avatarText:s(z))(t.fullName)),1))]),_:2},1032,["color","class","variant"]),r("div",xa,[r("span",ha,o(t.fullName),1),r("small",null,o(t.post),1)])])]),"item.status":a(({item:t})=>[e(M,{color:m(t.status).color,class:"font-weight-medium",size:"small"},{default:a(()=>[b(o(m(t.status).text),1)]),_:2},1032,["color"])]),_:1},8,["items"]))}},Da={__name:"DemoDataTableDense",setup(I){const c=[{title:"ID",sortable:!1,key:"id"},{title:"NAME",key:"fullName"},{title:"EMAIL",key:"email"},{title:"DATE",key:"startDate"},{title:"EXPERIENCE",key:"experience"},{title:"AGE",key:"age"}];return(m,l)=>(d(),g(s(S),{headers:c,items:s(B),density:"compact","items-per-page":5},null,8,["items"]))}},Va={__name:"DemoDataTableBasic",setup(I){const c=[{title:"ID",sortable:!1,key:"id"},{title:"NAME",key:"fullName"},{title:"EMAIL",key:"email"},{title:"DATE",key:"startDate"},{title:"EXPERIENCE",key:"experience"},{title:"AGE",key:"age"}];return(m,l)=>(d(),g(s(S),{headers:c,items:s(B),"items-per-page":5},null,8,["items"]))}},Aa={ts:`<script setup lang="ts">
import { VDataTable } from 'vuetify/labs/VDataTable'
import data from '@/views/demos/forms/tables/data-table/datatable'

const headers = [
  { title: 'ID', sortable: false, key: 'id' },
  { title: 'NAME', key: 'fullName' },
  { title: 'EMAIL', key: 'email' },
  { title: 'DATE', key: 'startDate' },
  { title: 'EXPERIENCE', key: 'experience' },
  { title: 'AGE', key: 'age' },
]
<\/script>

<template>
  <VDataTable
    :headers="headers"
    :items="data"
    :items-per-page="5"
  />
</template>
`,js:`<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import data from '@/views/demos/forms/tables/data-table/datatable'

const headers = [
  {
    title: 'ID',
    sortable: false,
    key: 'id',
  },
  {
    title: 'NAME',
    key: 'fullName',
  },
  {
    title: 'EMAIL',
    key: 'email',
  },
  {
    title: 'DATE',
    key: 'startDate',
  },
  {
    title: 'EXPERIENCE',
    key: 'experience',
  },
  {
    title: 'AGE',
    key: 'age',
  },
]
<\/script>

<template>
  <VDataTable
    :headers="headers"
    :items="data"
    :items-per-page="5"
  />
</template>
`},ka={ts:`<script setup lang="ts">
import { VDataTable } from 'vuetify/labs/VDataTable'

import data from '@/views/demos/forms/tables/data-table/datatable'

const headers = [
  { title: 'NAME', key: 'fullName' },
  { title: 'EMAIL', key: 'email' },
  { title: 'DATE', key: 'startDate' },
  { title: 'SALARY', key: 'salary' },
  { title: 'AGE', key: 'age' },
  { title: 'STATUS', key: 'status' },
]

const resolveStatusVariant = (status: number) => {
  if (status === 1)
    return { color: 'primary', text: 'Current' }
  else if (status === 2)
    return { color: 'success', text: 'Professional' }
  else if (status === 3)
    return { color: 'error', text: 'Rejected' }
  else if (status === 4)
    return { color: 'warning', text: 'Resigned' }
  else
    return { color: 'info', text: 'Applied' }
}
<\/script>

<template>
  <VDataTable
    :headers="headers"
    :items="data"
    :items-per-page="5"
  >
    <!-- full name -->
    <template #item.fullName="{ item }">
      <div class="d-flex align-center">
        <VAvatar
          size="32"
          :color="item.avatar ? '' : 'primary'"
          :class="item.avatar ? '' : 'v-avatar-light-bg primary--text'"
          :variant="!item.avatar ? 'tonal' : undefined"
        >
          <VImg
            v-if="item.avatar"
            :src="item.avatar"
          />
          <span v-else>{{ avatarText(item.fullName) }}</span>
        </VAvatar>
        <div class="d-flex flex-column ms-3">
          <span class="d-block font-weight-medium text-high-emphasis text-truncate">{{ item.fullName }}</span>
          <small>{{ item.post }}</small>
        </div>
      </div>
    </template>

    <template #item.status="{ item }">
      <VChip
        :color="resolveStatusVariant(item.status).color"
        class="font-weight-medium"
        size="small"
      >
        {{ resolveStatusVariant(item.status).text }}
      </VChip>
    </template>
  </VDataTable>
</template>
`,js:`<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import data from '@/views/demos/forms/tables/data-table/datatable'

const headers = [
  {
    title: 'NAME',
    key: 'fullName',
  },
  {
    title: 'EMAIL',
    key: 'email',
  },
  {
    title: 'DATE',
    key: 'startDate',
  },
  {
    title: 'SALARY',
    key: 'salary',
  },
  {
    title: 'AGE',
    key: 'age',
  },
  {
    title: 'STATUS',
    key: 'status',
  },
]

const resolveStatusVariant = status => {
  if (status === 1)
    return {
      color: 'primary',
      text: 'Current',
    }
  else if (status === 2)
    return {
      color: 'success',
      text: 'Professional',
    }
  else if (status === 3)
    return {
      color: 'error',
      text: 'Rejected',
    }
  else if (status === 4)
    return {
      color: 'warning',
      text: 'Resigned',
    }
  else
    return {
      color: 'info',
      text: 'Applied',
    }
}
<\/script>

<template>
  <VDataTable
    :headers="headers"
    :items="data"
    :items-per-page="5"
  >
    <!-- full name -->
    <template #item.fullName="{ item }">
      <div class="d-flex align-center">
        <VAvatar
          size="32"
          :color="item.avatar ? '' : 'primary'"
          :class="item.avatar ? '' : 'v-avatar-light-bg primary--text'"
          :variant="!item.avatar ? 'tonal' : undefined"
        >
          <VImg
            v-if="item.avatar"
            :src="item.avatar"
          />
          <span v-else>{{ avatarText(item.fullName) }}</span>
        </VAvatar>
        <div class="d-flex flex-column ms-3">
          <span class="d-block font-weight-medium text-high-emphasis text-truncate">{{ item.fullName }}</span>
          <small>{{ item.post }}</small>
        </div>
      </div>
    </template>

    <template #item.status="{ item }">
      <VChip
        :color="resolveStatusVariant(item.status).color"
        class="font-weight-medium"
        size="small"
      >
        {{ resolveStatusVariant(item.status).text }}
      </VChip>
    </template>
  </VDataTable>
</template>
`},Ia={ts:`<script setup lang="ts">
import { VDataTable } from 'vuetify/labs/VDataTable'
import data from '@/views/demos/forms/tables/data-table/datatable'

const headers = [
  { title: 'ID', sortable: false, key: 'id' },
  { title: 'NAME', key: 'fullName' },
  { title: 'EMAIL', key: 'email' },
  { title: 'DATE', key: 'startDate' },
  { title: 'EXPERIENCE', key: 'experience' },
  { title: 'AGE', key: 'age' },
]
<\/script>

<template>
  <VDataTable
    :headers="headers"
    :items="data"
    density="compact"
    :items-per-page="5"
  />
</template>
`,js:`<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import data from '@/views/demos/forms/tables/data-table/datatable'

const headers = [
  {
    title: 'ID',
    sortable: false,
    key: 'id',
  },
  {
    title: 'NAME',
    key: 'fullName',
  },
  {
    title: 'EMAIL',
    key: 'email',
  },
  {
    title: 'DATE',
    key: 'startDate',
  },
  {
    title: 'EXPERIENCE',
    key: 'experience',
  },
  {
    title: 'AGE',
    key: 'age',
  },
]
<\/script>

<template>
  <VDataTable
    :headers="headers"
    :items="data"
    density="compact"
    :items-per-page="5"
  />
</template>
`},Na={ts:`<script setup lang="ts">
import { VDataTable } from 'vuetify/labs/VDataTable'
import data from '@/views/demos/forms/tables/data-table/datatable'

// Headers
const headers = [
  { title: '', key: 'data-table-expand' },
  { title: 'NAME', key: 'fullName' },
  { title: 'EMAIL', key: 'email' },
  { title: 'DATE', key: 'startDate' },
  { title: 'SALARY', key: 'salary' },
  { title: 'AGE', key: 'age' },
  { title: 'STATUS', key: 'status' },
]

const resolveStatusVariant = (status: number) => {
  if (status === 1)
    return { color: 'primary', text: 'Current' }
  else if (status === 2)
    return { color: 'success', text: 'Professional' }
  else if (status === 3)
    return { color: 'error', text: 'Rejected' }
  else if (status === 4)
    return { color: 'warning', text: 'Resigned' }
  else
    return { color: 'info', text: 'Applied' }
}
<\/script>

<template>
  <VDataTable
    :headers="headers"
    :items="data"
    :items-per-page="5"
    expand-on-click
  >
    <!-- Expanded Row Data -->
    <template #expanded-row="slotProps">
      <tr class="v-data-table__tr">
        <td :colspan="headers.length">
          <p class="my-1">
            City: {{ slotProps.item.city }}
          </p>
          <p class="my-1">
            Experience: {{ slotProps.item.experience }}
          </p>
          <p>Post: {{ slotProps.item.post }}</p>
        </td>
      </tr>
    </template>

    <!-- full name -->
    <template #item.fullName="{ item }">
      <div class="d-flex align-center">
        <VAvatar
          size="32"
          :color="item.avatar ? '' : 'primary'"
          :class="item.avatar ? '' : 'v-avatar-light-bg primary--text'"
          :variant="!item.avatar ? 'tonal' : undefined"
        >
          <VImg
            v-if="item.avatar"
            :src="item.avatar"
          />
          <span v-else>{{ avatarText(item.fullName) }}</span>
        </VAvatar>
        <div class="d-flex flex-column ms-3">
          <span class="d-block font-weight-medium text-high-emphasis text-truncate">{{ item.fullName }}</span>
          <small>{{ item.post }}</small>
        </div>
      </div>
    </template>

    <template #item.status="{ item }">
      <VChip
        :color="resolveStatusVariant(item.status).color"
        class="font-weight-medium"
        size="small"
      >
        {{ resolveStatusVariant(item.status).text }}
      </VChip>
    </template>
  </VDataTable>
</template>
`,js:`<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import data from '@/views/demos/forms/tables/data-table/datatable'

// Headers
const headers = [
  {
    title: '',
    key: 'data-table-expand',
  },
  {
    title: 'NAME',
    key: 'fullName',
  },
  {
    title: 'EMAIL',
    key: 'email',
  },
  {
    title: 'DATE',
    key: 'startDate',
  },
  {
    title: 'SALARY',
    key: 'salary',
  },
  {
    title: 'AGE',
    key: 'age',
  },
  {
    title: 'STATUS',
    key: 'status',
  },
]

const resolveStatusVariant = status => {
  if (status === 1)
    return {
      color: 'primary',
      text: 'Current',
    }
  else if (status === 2)
    return {
      color: 'success',
      text: 'Professional',
    }
  else if (status === 3)
    return {
      color: 'error',
      text: 'Rejected',
    }
  else if (status === 4)
    return {
      color: 'warning',
      text: 'Resigned',
    }
  else
    return {
      color: 'info',
      text: 'Applied',
    }
}
<\/script>

<template>
  <VDataTable
    :headers="headers"
    :items="data"
    :items-per-page="5"
    expand-on-click
  >
    <!-- Expanded Row Data -->
    <template #expanded-row="slotProps">
      <tr class="v-data-table__tr">
        <td :colspan="headers.length">
          <p class="my-1">
            City: {{ slotProps.item.city }}
          </p>
          <p class="my-1">
            Experience: {{ slotProps.item.experience }}
          </p>
          <p>Post: {{ slotProps.item.post }}</p>
        </td>
      </tr>
    </template>

    <!-- full name -->
    <template #item.fullName="{ item }">
      <div class="d-flex align-center">
        <VAvatar
          size="32"
          :color="item.avatar ? '' : 'primary'"
          :class="item.avatar ? '' : 'v-avatar-light-bg primary--text'"
          :variant="!item.avatar ? 'tonal' : undefined"
        >
          <VImg
            v-if="item.avatar"
            :src="item.avatar"
          />
          <span v-else>{{ avatarText(item.fullName) }}</span>
        </VAvatar>
        <div class="d-flex flex-column ms-3">
          <span class="d-block font-weight-medium text-high-emphasis text-truncate">{{ item.fullName }}</span>
          <small>{{ item.post }}</small>
        </div>
      </div>
    </template>

    <template #item.status="{ item }">
      <VChip
        :color="resolveStatusVariant(item.status).color"
        class="font-weight-medium"
        size="small"
      >
        {{ resolveStatusVariant(item.status).text }}
      </VChip>
    </template>
  </VDataTable>
</template>
`},Ta={ts:`<script setup lang="ts">
import { VDataTable } from 'vuetify/labs/VDataTable'
import data from '@/views/demos/forms/tables/data-table/datatable'
import type { Data } from '@db/pages/datatable/types'

const userList = ref<Data[]>([])
const options = ref({ page: 1, itemsPerPage: 5, sortBy: [''], sortDesc: [false] })

// headers
const headers = [
  { title: 'NAME', key: 'fullName' },
  { title: 'EMAIL', key: 'email' },
  { title: 'DATE', key: 'startDate' },
  { title: 'SALARY', key: 'salary' },
  { title: 'AGE', key: 'age' },
  { title: 'STATUS', key: 'status' },
]

const resolveStatusVariant = (status: number) => {
  if (status === 1)
    return { color: 'primary', text: 'Current' }
  else if (status === 2)
    return { color: 'success', text: 'Professional' }
  else if (status === 3)
    return { color: 'error', text: 'Rejected' }
  else if (status === 4)
    return { color: 'warning', text: 'Resigned' }
  else
    return { color: 'info', text: 'Applied' }
}

onMounted(() => {
  userList.value = JSON.parse(JSON.stringify(data))
})
<\/script>

<template>
  <VDataTable
    :headers="headers"
    :items="userList"
    :items-per-page="options.itemsPerPage"
    :page="options.page"
    :options="options"
  >
    <!-- full name -->
    <template #item.fullName="{ item }">
      <div class="d-flex align-center">
        <VAvatar
          size="32"
          :color="item.avatar ? '' : 'primary'"
          :class="item.avatar ? '' : 'v-avatar-light-bg primary--text'"
          :variant="!item.avatar ? 'tonal' : undefined"
        >
          <VImg
            v-if="item.avatar"
            :src="item.avatar"
          />
          <span v-else>{{ avatarText(item.fullName) }}</span>
        </VAvatar>
        <div class="d-flex flex-column ms-3">
          <span class="d-block font-weight-medium text-high-emphasis text-truncate">{{ item.fullName }}</span>
          <small>{{ item.post }}</small>
        </div>
      </div>
    </template>

    <!-- status -->
    <template #item.status="{ item }">
      <VChip
        :color="resolveStatusVariant(item.status).color"
        class="font-weight-medium"
        size="small"
      >
        {{ resolveStatusVariant(item.status).text }}
      </VChip>
    </template>

    <template #bottom>
      <VCardText class="pt-2">
        <div class="d-flex flex-wrap justify-center justify-sm-space-between gap-y-2 mt-2">
          <VTextField
            v-model="options.itemsPerPage"
            label="Rows per page:"
            type="number"
            min="-1"
            max="15"
            hide-details
            variant="underlined"
            style="max-inline-size: 8rem;min-inline-size: 5rem;"
          />

          <VPagination
            v-model="options.page"
            :total-visible="$vuetify.display.smAndDown ? 3 : 5"
            :length="Math.ceil(userList.length / options.itemsPerPage)"
          />
        </div>
      </VCardText>
    </template>
  </VDataTable>
</template>
`,js:`<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import data from '@/views/demos/forms/tables/data-table/datatable'

const userList = ref([])

const options = ref({
  page: 1,
  itemsPerPage: 5,
  sortBy: [''],
  sortDesc: [false],
})

// headers
const headers = [
  {
    title: 'NAME',
    key: 'fullName',
  },
  {
    title: 'EMAIL',
    key: 'email',
  },
  {
    title: 'DATE',
    key: 'startDate',
  },
  {
    title: 'SALARY',
    key: 'salary',
  },
  {
    title: 'AGE',
    key: 'age',
  },
  {
    title: 'STATUS',
    key: 'status',
  },
]

const resolveStatusVariant = status => {
  if (status === 1)
    return {
      color: 'primary',
      text: 'Current',
    }
  else if (status === 2)
    return {
      color: 'success',
      text: 'Professional',
    }
  else if (status === 3)
    return {
      color: 'error',
      text: 'Rejected',
    }
  else if (status === 4)
    return {
      color: 'warning',
      text: 'Resigned',
    }
  else
    return {
      color: 'info',
      text: 'Applied',
    }
}

onMounted(() => {
  userList.value = JSON.parse(JSON.stringify(data))
})
<\/script>

<template>
  <VDataTable
    :headers="headers"
    :items="userList"
    :items-per-page="options.itemsPerPage"
    :page="options.page"
    :options="options"
  >
    <!-- full name -->
    <template #item.fullName="{ item }">
      <div class="d-flex align-center">
        <VAvatar
          size="32"
          :color="item.avatar ? '' : 'primary'"
          :class="item.avatar ? '' : 'v-avatar-light-bg primary--text'"
          :variant="!item.avatar ? 'tonal' : undefined"
        >
          <VImg
            v-if="item.avatar"
            :src="item.avatar"
          />
          <span v-else>{{ avatarText(item.fullName) }}</span>
        </VAvatar>
        <div class="d-flex flex-column ms-3">
          <span class="d-block font-weight-medium text-high-emphasis text-truncate">{{ item.fullName }}</span>
          <small>{{ item.post }}</small>
        </div>
      </div>
    </template>

    <!-- status -->
    <template #item.status="{ item }">
      <VChip
        :color="resolveStatusVariant(item.status).color"
        class="font-weight-medium"
        size="small"
      >
        {{ resolveStatusVariant(item.status).text }}
      </VChip>
    </template>

    <template #bottom>
      <VCardText class="pt-2">
        <div class="d-flex flex-wrap justify-center justify-sm-space-between gap-y-2 mt-2">
          <VTextField
            v-model="options.itemsPerPage"
            label="Rows per page:"
            type="number"
            min="-1"
            max="15"
            hide-details
            variant="underlined"
            style="max-inline-size: 8rem;min-inline-size: 5rem;"
          />

          <VPagination
            v-model="options.page"
            :total-visible="$vuetify.display.smAndDown ? 3 : 5"
            :length="Math.ceil(userList.length / options.itemsPerPage)"
          />
        </div>
      </VCardText>
    </template>
  </VDataTable>
</template>
`},Sa={ts:`<script setup lang="ts">
import { VDataTable } from 'vuetify/labs/VDataTable'
import data from '@/views/demos/forms/tables/data-table/datatable'

const headers = [
  { title: 'NAME', key: 'fullName' },
  { title: 'EMAIL', key: 'email' },
  { title: 'DATE', key: 'startDate' },
  { title: 'SALARY', key: 'salary' },
  { title: 'AGE', key: 'age' },
  { title: 'STATUS', key: 'status' },
]

const resolveStatusVariant = (status: number) => {
  if (status === 1)
    return { color: 'primary', text: 'Current' }
  else if (status === 2)
    return { color: 'success', text: 'Professional' }
  else if (status === 3)
    return { color: 'error', text: 'Rejected' }
  else if (status === 4)
    return { color: 'warning', text: 'Resigned' }
  else
    return { color: 'info', text: 'Applied' }
}
<\/script>

<template>
  <VDataTable
    :headers="headers"
    :items="data"
    :items-per-page="10"
    height="300"
    fixed-header
  >
    <!-- full name -->
    <template #item.fullName="{ item }">
      <div class="d-flex align-center">
        <VAvatar
          size="32"
          :color="item.avatar ? '' : 'primary'"
          :class="item.avatar ? '' : 'v-avatar-light-bg primary--text'"
          :variant="!item.avatar ? 'tonal' : undefined"
        >
          <VImg
            v-if="item.avatar"
            :src="item.avatar"
          />
          <span v-else>{{ avatarText(item.fullName) }}</span>
        </VAvatar>
        <div class="d-flex flex-column ms-3">
          <span class="d-block font-weight-medium text-high-emphasis text-truncate">{{ item.fullName }}</span>
          <small>{{ item.post }}</small>
        </div>
      </div>
    </template>

    <!-- status -->
    <template #item.status="{ item }">
      <VChip
        :color="resolveStatusVariant(item.status).color"
        class="font-weight-medium"
        size="small"
      >
        {{ resolveStatusVariant(item.status).text }}
      </VChip>
    </template>
  </VDataTable>
</template>
`,js:`<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import data from '@/views/demos/forms/tables/data-table/datatable'

const headers = [
  {
    title: 'NAME',
    key: 'fullName',
  },
  {
    title: 'EMAIL',
    key: 'email',
  },
  {
    title: 'DATE',
    key: 'startDate',
  },
  {
    title: 'SALARY',
    key: 'salary',
  },
  {
    title: 'AGE',
    key: 'age',
  },
  {
    title: 'STATUS',
    key: 'status',
  },
]

const resolveStatusVariant = status => {
  if (status === 1)
    return {
      color: 'primary',
      text: 'Current',
    }
  else if (status === 2)
    return {
      color: 'success',
      text: 'Professional',
    }
  else if (status === 3)
    return {
      color: 'error',
      text: 'Rejected',
    }
  else if (status === 4)
    return {
      color: 'warning',
      text: 'Resigned',
    }
  else
    return {
      color: 'info',
      text: 'Applied',
    }
}
<\/script>

<template>
  <VDataTable
    :headers="headers"
    :items="data"
    :items-per-page="10"
    height="300"
    fixed-header
  >
    <!-- full name -->
    <template #item.fullName="{ item }">
      <div class="d-flex align-center">
        <VAvatar
          size="32"
          :color="item.avatar ? '' : 'primary'"
          :class="item.avatar ? '' : 'v-avatar-light-bg primary--text'"
          :variant="!item.avatar ? 'tonal' : undefined"
        >
          <VImg
            v-if="item.avatar"
            :src="item.avatar"
          />
          <span v-else>{{ avatarText(item.fullName) }}</span>
        </VAvatar>
        <div class="d-flex flex-column ms-3">
          <span class="d-block font-weight-medium text-high-emphasis text-truncate">{{ item.fullName }}</span>
          <small>{{ item.post }}</small>
        </div>
      </div>
    </template>

    <!-- status -->
    <template #item.status="{ item }">
      <VChip
        :color="resolveStatusVariant(item.status).color"
        class="font-weight-medium"
        size="small"
      >
        {{ resolveStatusVariant(item.status).text }}
      </VChip>
    </template>
  </VDataTable>
</template>
`},Ca={ts:`<script setup lang="ts">
import { VDataTable } from 'vuetify/labs/VDataTable'
import { avatarText } from '@core/utils/formatters'

import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import avatar4 from '@images/avatars/avatar-4.png'
import avatar7 from '@images/avatars/avatar-7.png'
import avatar8 from '@images/avatars/avatar-8.png'

const userList = [
  {
    responsiveId: '',
    id: 1,
    avatar: avatar8,
    fullName: 'Korrie O'Crevy',
    post: 'Nuclear Power Engineer',
    email: 'kocrevy0@thetimes.co.uk',
    city: 'Krasnosilka',
    startDate: '09/23/2016',
    salary: 23896.35,
    age: '61',
    experience: '1 Year',
    status: 'Professional',
  },
  {
    responsiveId: '',
    id: 2,
    avatar: avatar1,
    fullName: 'Bailie Coulman',
    post: 'VP Quality Control',
    email: 'bcoulman1@yolasite.com',
    city: 'Hinigaran',
    startDate: '05/20/2018',
    salary: 13633.69,
    age: '63',
    experience: '3 Years',
    status: 'Professional',
  },
  {
    responsiveId: '',
    id: 3,
    avatar: avatar7,
    fullName: 'Stella Ganderton',
    post: 'Operator',
    email: 'sganderton2@tuttocitta.it',
    city: 'Golcowa',
    startDate: '03/24/2018',
    salary: 13076.28,
    age: '66',
    experience: '6 Years',
    status: 'Applied',
  },
  {
    responsiveId: '',
    id: 4,
    avatar: avatar8,
    fullName: 'Dorolice Crossman',
    post: 'Cost Accountant',
    email: 'dcrossman3@google.co.jp',
    city: 'Paquera',
    startDate: '12/03/2017',
    salary: 12336.17,
    age: '22',
    experience: '2 Years',
    status: 'Professional',
  },
  {
    responsiveId: '',
    id: 6,
    avatar: '',
    fullName: 'Genevra Honeywood',
    post: 'Geologist',
    email: 'ghoneywood5@narod.ru',
    city: 'Maofan',
    startDate: '06/01/2017',
    salary: 17803.8,
    age: '61',
    experience: '1 Year',
    status: 'Current',
  },
  {
    responsiveId: '',
    id: 7,
    avatar: '',
    fullName: 'Eileen Diehn',
    post: 'Environmental Specialist',
    email: 'ediehn6@163.com',
    city: 'Lampuyang',
    startDate: '10/15/2017',
    salary: 18991.67,
    age: '59',
    experience: '9 Years',
    status: 'Rejected',
  },
  {
    responsiveId: '',
    id: 8,
    avatar: avatar7,
    fullName: 'Richardo Aldren',
    post: 'Senior Sales Associate',
    email: 'raldren7@mtv.com',
    city: 'Skoghall',
    startDate: '11/05/2016',
    salary: 19230.13,
    age: '55',
    experience: '5 Years',
    status: 'Rejected',
  },
  {
    responsiveId: '',
    id: 9,
    avatar: avatar2,
    fullName: 'Allyson Moakler',
    post: 'Safety Technician',
    email: 'amoakler8@shareasale.com',
    city: 'Mogilany',
    startDate: '12/29/2018',
    salary: 11677.32,
    age: '39',
    experience: '9 Years',
    status: 'Applied',
  },
  {
    responsiveId: '',
    id: 11,
    avatar: '',
    fullName: 'De Falloon',
    post: 'Sales Representative',
    email: 'dfalloona@ifeng.com',
    city: 'Colima',
    startDate: '06/12/2018',
    salary: 19252.12,
    age: '30',
    experience: '0 Year',
    status: 'Resigned',
  },
  {
    responsiveId: '',
    id: 12,
    avatar: '',
    fullName: 'Cyrus Gornal',
    post: 'Senior Sales Associate',
    email: 'cgornalb@fda.gov',
    city: 'Boro Utara',
    startDate: '12/09/2017',
    salary: 16745.47,
    age: '22',
    experience: '2 Years',
    status: 'Resigned',
  },
  {
    responsiveId: '',
    id: 13,
    avatar: '',
    fullName: 'Tallou Balf',
    post: 'Staff Accountant',
    email: 'tbalfc@sina.com.cn',
    city: 'Siliana',
    startDate: '01/21/2016',
    salary: 15488.53,
    age: '36',
    experience: '6 Years',
    status: 'Resigned',
  },
  {
    responsiveId: '',
    id: 15,
    avatar: '',
    fullName: 'Wilmar Bourton',
    post: 'Administrative Assistant',
    email: 'wbourtone@sakura.ne.jp',
    city: 'Bích Động',
    startDate: '04/25/2018',
    salary: 13304.45,
    age: '19',
    experience: '9 Years',
    status: 'Applied',
  },
  {
    responsiveId: '',
    id: 16,
    avatar: avatar4,
    fullName: 'Robinson Brazenor',
    post: 'General Manager',
    email: 'rbrazenorf@symantec.com',
    city: 'Gendiwu',
    startDate: '12/23/2017',
    salary: 11953.08,
    age: '66',
    experience: '6 Years',
    status: 'Applied',
  },
  {
    responsiveId: '',
    id: 17,
    avatar: '',
    fullName: 'Nadia Bettenson',
    post: 'Environmental Tech',
    email: 'nbettensong@joomla.org',
    city: 'Chabařovice',
    startDate: '07/11/2018',
    salary: 20484.44,
    age: '64',
    experience: '4 Years',
    status: 'Current',
  },
  {
    responsiveId: '',
    id: 18,
    avatar: '',
    fullName: 'Titus Hayne',
    post: 'Web Designer',
    email: 'thayneh@kickstarter.com',
    city: 'Yangon',
    startDate: '05/25/2019',
    salary: 16871.48,
    age: '59',
    experience: '9 Years',
    status: 'Current',
  },
  {
    responsiveId: '',
    id: 19,
    avatar: avatar4,
    fullName: 'Roxie Huck',
    post: 'Administrative Assistant',
    email: 'rhucki@ed.gov',
    city: 'Polýkastro',
    startDate: '04/04/2019',
    salary: 19653.56,
    age: '41',
    experience: '1 Year',
    status: 'Resigned',
  },
  {
    responsiveId: '',
    id: 23,
    avatar: avatar7,
    fullName: 'Rosmunda Steed',
    post: 'Assistant Media Planner',
    email: 'rsteedm@xing.com',
    city: 'Manzanares',
    startDate: '12/23/2017',
    salary: 13778.34,
    age: '21',
    experience: '1 Year',
    status: 'Applied',
  },
  {
    responsiveId: '',
    id: 26,
    avatar: avatar2,
    fullName: 'Morgen Benes',
    post: 'Senior Sales Associate',
    email: 'mbenesp@ted.com',
    city: 'Cà Mau',
    startDate: '04/10/2016',
    salary: 16969.63,
    age: '42',
    experience: '2 Years',
    status: 'Resigned',
  },
  {
    responsiveId: '',
    id: 28,
    avatar: '',
    fullName: 'Kliment McGinney',
    post: 'Chief Design Engineer',
    email: 'kmcginneyr@paginegialle.it',
    city: 'Xiaocheng',
    startDate: '07/09/2018',
    salary: 24027.81,
    age: '28',
    experience: '8 Years',
    status: 'Resigned',
  },
  {
    responsiveId: '',
    id: 31,
    avatar: '',
    fullName: 'Teressa Bleakman',
    post: 'Senior Editor',
    email: 'tbleakmanu@phpbb.com',
    city: 'Žebrák',
    startDate: '09/03/2016',
    salary: 24875.41,
    age: '37',
    experience: '7 Years',
    status: 'Applied',
  },
]

const headers = [
  { title: 'Group by status', key: 'data-table-group' },
  { title: 'NAME', key: 'fullName' },
  { title: 'EMAIL', key: 'email' },
  { title: 'DATE', key: 'startDate' },
  { title: 'SALARY', key: 'salary' },
  { title: 'AGE', key: 'age' },
  { title: 'STATUS', key: 'status' },
]

const groupBy = [{ key: 'status' }]

const resolveStatusVariant = (status: string) => {
  if (status === 'Current')
    return { color: 'primary' }
  else if (status === 'Professional')
    return { color: 'success' }
  else if (status === 'Rejected')
    return { color: 'error' }
  else if (status === 'Resigned')
    return { color: 'warning' }
  else
    return { color: 'info' }
}

const getIcon = (props: Record<string, unknown>) => props.icon as any
<\/script>

<template>
  <VDataTable
    :headers="headers"
    :items="userList"
    :items-per-page="10"
    :group-by="groupBy"
  >
    <!-- full name -->
    <template #item.fullName="{ item }">
      <div class="d-flex align-center">
        <VAvatar
          size="32"
          :color="item.avatar ? '' : 'primary'"
          :class="item.avatar ? '' : 'v-avatar-light-bg primary--text'"
          :variant="!item.avatar ? 'tonal' : undefined"
        >
          <VImg
            v-if="item.avatar"
            :src="item.avatar"
          />
          <span v-else>{{ avatarText(item.fullName) }}</span>
        </VAvatar>
        <div class="d-flex flex-column ms-3">
          <span class="d-block font-weight-medium text-high-emphasis text-truncate">{{ item.fullName }}</span>
          <small>{{ item.post }}</small>
        </div>
      </div>
    </template>

    <template #item.status="{ item }">
      <VChip
        :color="resolveStatusVariant(item.status).color"

        size="small"
        class="font-weight-medium"
      >
        {{ item.status }}
      </VChip>
    </template>

    <template #data-table-group="{ props, item, count }">
      <td>
        <VBtn
          v-bind="props"
          variant="text"
          density="comfortable"
        >
          <VIcon
            class="flip-in-rtl"
            :icon="getIcon(props)"
          />
        </VBtn>

        <span>{{ item.value }}</span>
        <span>({{ count }})</span>
      </td>
    </template>
  </VDataTable>
</template>
`,js:`<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import { avatarText } from '@core/utils/formatters'
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import avatar4 from '@images/avatars/avatar-4.png'
import avatar7 from '@images/avatars/avatar-7.png'
import avatar8 from '@images/avatars/avatar-8.png'

const userList = [
  {
    responsiveId: '',
    id: 1,
    avatar: avatar8,
    fullName: 'Korrie O'Crevy',
    post: 'Nuclear Power Engineer',
    email: 'kocrevy0@thetimes.co.uk',
    city: 'Krasnosilka',
    startDate: '09/23/2016',
    salary: 23896.35,
    age: '61',
    experience: '1 Year',
    status: 'Professional',
  },
  {
    responsiveId: '',
    id: 2,
    avatar: avatar1,
    fullName: 'Bailie Coulman',
    post: 'VP Quality Control',
    email: 'bcoulman1@yolasite.com',
    city: 'Hinigaran',
    startDate: '05/20/2018',
    salary: 13633.69,
    age: '63',
    experience: '3 Years',
    status: 'Professional',
  },
  {
    responsiveId: '',
    id: 3,
    avatar: avatar7,
    fullName: 'Stella Ganderton',
    post: 'Operator',
    email: 'sganderton2@tuttocitta.it',
    city: 'Golcowa',
    startDate: '03/24/2018',
    salary: 13076.28,
    age: '66',
    experience: '6 Years',
    status: 'Applied',
  },
  {
    responsiveId: '',
    id: 4,
    avatar: avatar8,
    fullName: 'Dorolice Crossman',
    post: 'Cost Accountant',
    email: 'dcrossman3@google.co.jp',
    city: 'Paquera',
    startDate: '12/03/2017',
    salary: 12336.17,
    age: '22',
    experience: '2 Years',
    status: 'Professional',
  },
  {
    responsiveId: '',
    id: 6,
    avatar: '',
    fullName: 'Genevra Honeywood',
    post: 'Geologist',
    email: 'ghoneywood5@narod.ru',
    city: 'Maofan',
    startDate: '06/01/2017',
    salary: 17803.8,
    age: '61',
    experience: '1 Year',
    status: 'Current',
  },
  {
    responsiveId: '',
    id: 7,
    avatar: '',
    fullName: 'Eileen Diehn',
    post: 'Environmental Specialist',
    email: 'ediehn6@163.com',
    city: 'Lampuyang',
    startDate: '10/15/2017',
    salary: 18991.67,
    age: '59',
    experience: '9 Years',
    status: 'Rejected',
  },
  {
    responsiveId: '',
    id: 8,
    avatar: avatar7,
    fullName: 'Richardo Aldren',
    post: 'Senior Sales Associate',
    email: 'raldren7@mtv.com',
    city: 'Skoghall',
    startDate: '11/05/2016',
    salary: 19230.13,
    age: '55',
    experience: '5 Years',
    status: 'Rejected',
  },
  {
    responsiveId: '',
    id: 9,
    avatar: avatar2,
    fullName: 'Allyson Moakler',
    post: 'Safety Technician',
    email: 'amoakler8@shareasale.com',
    city: 'Mogilany',
    startDate: '12/29/2018',
    salary: 11677.32,
    age: '39',
    experience: '9 Years',
    status: 'Applied',
  },
  {
    responsiveId: '',
    id: 11,
    avatar: '',
    fullName: 'De Falloon',
    post: 'Sales Representative',
    email: 'dfalloona@ifeng.com',
    city: 'Colima',
    startDate: '06/12/2018',
    salary: 19252.12,
    age: '30',
    experience: '0 Year',
    status: 'Resigned',
  },
  {
    responsiveId: '',
    id: 12,
    avatar: '',
    fullName: 'Cyrus Gornal',
    post: 'Senior Sales Associate',
    email: 'cgornalb@fda.gov',
    city: 'Boro Utara',
    startDate: '12/09/2017',
    salary: 16745.47,
    age: '22',
    experience: '2 Years',
    status: 'Resigned',
  },
  {
    responsiveId: '',
    id: 13,
    avatar: '',
    fullName: 'Tallou Balf',
    post: 'Staff Accountant',
    email: 'tbalfc@sina.com.cn',
    city: 'Siliana',
    startDate: '01/21/2016',
    salary: 15488.53,
    age: '36',
    experience: '6 Years',
    status: 'Resigned',
  },
  {
    responsiveId: '',
    id: 15,
    avatar: '',
    fullName: 'Wilmar Bourton',
    post: 'Administrative Assistant',
    email: 'wbourtone@sakura.ne.jp',
    city: 'Bích Động',
    startDate: '04/25/2018',
    salary: 13304.45,
    age: '19',
    experience: '9 Years',
    status: 'Applied',
  },
  {
    responsiveId: '',
    id: 16,
    avatar: avatar4,
    fullName: 'Robinson Brazenor',
    post: 'General Manager',
    email: 'rbrazenorf@symantec.com',
    city: 'Gendiwu',
    startDate: '12/23/2017',
    salary: 11953.08,
    age: '66',
    experience: '6 Years',
    status: 'Applied',
  },
  {
    responsiveId: '',
    id: 17,
    avatar: '',
    fullName: 'Nadia Bettenson',
    post: 'Environmental Tech',
    email: 'nbettensong@joomla.org',
    city: 'Chabařovice',
    startDate: '07/11/2018',
    salary: 20484.44,
    age: '64',
    experience: '4 Years',
    status: 'Current',
  },
  {
    responsiveId: '',
    id: 18,
    avatar: '',
    fullName: 'Titus Hayne',
    post: 'Web Designer',
    email: 'thayneh@kickstarter.com',
    city: 'Yangon',
    startDate: '05/25/2019',
    salary: 16871.48,
    age: '59',
    experience: '9 Years',
    status: 'Current',
  },
  {
    responsiveId: '',
    id: 19,
    avatar: avatar4,
    fullName: 'Roxie Huck',
    post: 'Administrative Assistant',
    email: 'rhucki@ed.gov',
    city: 'Polýkastro',
    startDate: '04/04/2019',
    salary: 19653.56,
    age: '41',
    experience: '1 Year',
    status: 'Resigned',
  },
  {
    responsiveId: '',
    id: 23,
    avatar: avatar7,
    fullName: 'Rosmunda Steed',
    post: 'Assistant Media Planner',
    email: 'rsteedm@xing.com',
    city: 'Manzanares',
    startDate: '12/23/2017',
    salary: 13778.34,
    age: '21',
    experience: '1 Year',
    status: 'Applied',
  },
  {
    responsiveId: '',
    id: 26,
    avatar: avatar2,
    fullName: 'Morgen Benes',
    post: 'Senior Sales Associate',
    email: 'mbenesp@ted.com',
    city: 'Cà Mau',
    startDate: '04/10/2016',
    salary: 16969.63,
    age: '42',
    experience: '2 Years',
    status: 'Resigned',
  },
  {
    responsiveId: '',
    id: 28,
    avatar: '',
    fullName: 'Kliment McGinney',
    post: 'Chief Design Engineer',
    email: 'kmcginneyr@paginegialle.it',
    city: 'Xiaocheng',
    startDate: '07/09/2018',
    salary: 24027.81,
    age: '28',
    experience: '8 Years',
    status: 'Resigned',
  },
  {
    responsiveId: '',
    id: 31,
    avatar: '',
    fullName: 'Teressa Bleakman',
    post: 'Senior Editor',
    email: 'tbleakmanu@phpbb.com',
    city: 'Žebrák',
    startDate: '09/03/2016',
    salary: 24875.41,
    age: '37',
    experience: '7 Years',
    status: 'Applied',
  },
]

const headers = [
  {
    title: 'Group by status',
    key: 'data-table-group',
  },
  {
    title: 'NAME',
    key: 'fullName',
  },
  {
    title: 'EMAIL',
    key: 'email',
  },
  {
    title: 'DATE',
    key: 'startDate',
  },
  {
    title: 'SALARY',
    key: 'salary',
  },
  {
    title: 'AGE',
    key: 'age',
  },
  {
    title: 'STATUS',
    key: 'status',
  },
]

const groupBy = [{ key: 'status' }]

const resolveStatusVariant = status => {
  if (status === 'Current')
    return { color: 'primary' }
  else if (status === 'Professional')
    return { color: 'success' }
  else if (status === 'Rejected')
    return { color: 'error' }
  else if (status === 'Resigned')
    return { color: 'warning' }
  else
    return { color: 'info' }
}

const getIcon = props => props.icon
<\/script>

<template>
  <VDataTable
    :headers="headers"
    :items="userList"
    :items-per-page="10"
    :group-by="groupBy"
  >
    <!-- full name -->
    <template #item.fullName="{ item }">
      <div class="d-flex align-center">
        <VAvatar
          size="32"
          :color="item.avatar ? '' : 'primary'"
          :class="item.avatar ? '' : 'v-avatar-light-bg primary--text'"
          :variant="!item.avatar ? 'tonal' : undefined"
        >
          <VImg
            v-if="item.avatar"
            :src="item.avatar"
          />
          <span v-else>{{ avatarText(item.fullName) }}</span>
        </VAvatar>
        <div class="d-flex flex-column ms-3">
          <span class="d-block font-weight-medium text-high-emphasis text-truncate">{{ item.fullName }}</span>
          <small>{{ item.post }}</small>
        </div>
      </div>
    </template>

    <template #item.status="{ item }">
      <VChip
        :color="resolveStatusVariant(item.status).color"

        size="small"
        class="font-weight-medium"
      >
        {{ item.status }}
      </VChip>
    </template>

    <template #data-table-group="{ props, item, count }">
      <td>
        <VBtn
          v-bind="props"
          variant="text"
          density="comfortable"
        >
          <VIcon
            class="flip-in-rtl"
            :icon="getIcon(props)"
          />
        </VBtn>

        <span>{{ item.value }}</span>
        <span>({{ count }})</span>
      </td>
    </template>
  </VDataTable>
</template>
`},_a={ts:`<script setup lang="ts">
import { VDataTable } from 'vuetify/labs/VDataTable'
import type { SalesDetails } from '@db/pages/datatable/types'

const search = ref('')
const productList = ref<SalesDetails[]>([])

// headers
const headers = [
  { title: 'PRODUCT', key: 'product.name' },
  { title: 'DATE', key: 'date' },
  { title: 'CATEGORY', key: 'product.category' },
  { title: 'BUYERS', key: 'buyer.name' },
  { title: 'PAYMENT', key: 'payment', sortable: false },
  { title: 'STATUS', key: 'status', sortable: false },
  { title: 'DELETE', key: 'delete', sortable: false },
]

// 👉 methods
const deleteItem = (itemId: number) => {
  const index = productList.value.findIndex(item => item.product.id === itemId)

  productList.value.splice(index, 1)
}

const categoryIcons = [
  { name: 'Mouse', icon: 'tabler-mouse', color: 'warning' },
  { name: 'Glass', icon: 'tabler-eyeglass', color: 'primary' },
  { name: 'Smart Watch', icon: 'tabler-device-watch', color: 'success' },
  { name: 'Bag', icon: 'tabler-briefcase', color: 'info' },
  { name: 'Storage Device', icon: 'tabler-device-audio-tape', color: 'warning' },
  { name: 'Bluetooth', icon: 'tabler-bluetooth', color: 'error' },
  { name: 'Gaming', icon: 'tabler-device-gamepad-2', color: 'warning' },
  { name: 'Home', icon: 'tabler-home', color: 'error' },
  { name: 'VR', icon: 'tabler-badge-vr', color: 'primary' },
  { name: 'Shoes', icon: 'tabler-shoe', color: 'success' },
  { name: 'Electronics', icon: 'tabler-cpu', color: 'info' },
  { name: 'Projector', icon: 'tabler-theater', color: 'warning' },
  { name: 'iPod', icon: 'tabler-device-airpods', color: 'error' },
  { name: 'Keyboard', icon: 'tabler-keyboard', color: 'primary' },
  { name: 'Smart Phone', icon: 'tabler-device-mobile', color: 'success' },
  { name: 'Smart TV', icon: 'tabler-device-tv', color: 'info' },
  { name: 'Google Home', icon: 'tabler-brand-google', color: 'warning' },
  { name: 'Mac', icon: 'tabler-brand-apple', color: 'error' },
  { name: 'Headphone', icon: 'tabler-headphones', color: 'primary' },
  { name: 'iMac', icon: 'tabler-device-imac', color: 'success' },
  { name: 'iPhone', icon: 'tabler-brand-apple', color: 'warning' },
]

const resolveStatusColor = (status: string) => {
  if (status === 'Confirmed')
    return 'primary'
  if (status === 'Completed')
    return 'success'
  if (status === 'Cancelled')
    return 'error'
}

const categoryIconFilter = (categoryName: string): {
  icon: string
  color: string }[] => {
  const index = categoryIcons.findIndex(category => category.name === categoryName)

  if (index !== -1)
    return [{ icon: categoryIcons[index].icon, color: categoryIcons[index].color }]

  return [{ icon: 'tabler-help-circle', color: 'primary' }]
}

const { data, error } = await useApi<SalesDetails[]>('pages/datatable')

if (error.value) {
  console.error(error.value)
}
else {
  if (data.value)
    productList.value = data.value
}
<\/script>

<template>
  <div>
    <VCardText>
      <VRow>
        <VCol
          cols="12"
          offset-md="8"
          md="4"
        >
          <AppTextField
            v-model="search"
            density="compact"
            placeholder="Search ..."
            append-inner-icon="tabler-search"
            single-line
            hide-details
            dense
            outlined
          />
        </VCol>
      </VRow>
    </VCardText>

    <!-- 👉 Data Table  -->
    <VDataTable
      :headers="headers"
      :items="productList"
      :search="search"
      :items-per-page="5"
      class="text-no-wrap"
    >
      <!-- product -->
      <template #item.product.name="{ item }">
        <div class="d-flex align-center">
          <div>
            <VImg
              :src="item.product.image"
              height="40"
              width="40"
            />
          </div>
          <div class="d-flex flex-column ms-3">
            <span class="d-block font-weight-medium text-truncate text-high-emphasis">{{ item.product.name }}</span>
            <span class="text-xs">{{ item.product.brand }}</span>
          </div>
        </div>
      </template>

      <!-- category -->
      <template #item.product.category="{ item }">
        <div class="d-flex align-center">
          <VAvatar
            v-for="(category, index) in categoryIconFilter(item.product.category)"
            :key="index"
            size="26"
            :color="category.color"
            variant="tonal"
          >
            <VIcon
              size="20"
              :color="category.color"
              class="rounded-0"
            >
              {{ category.icon }}
            </VIcon>
          </VAvatar>
          <span class="ms-1 text-no-wrap">{{ item.product.category }}</span>
        </div>
      </template>

      <!-- buyer -->
      <template #item.buyer.name="{ item }">
        <div class="d-flex align-center">
          <VAvatar
            size="1.875rem"
            :color="!item.avatar ? 'primary' : undefined"
            :variant="!item.avatar ? 'tonal' : undefined"
          >
            <VImg
              v-if="item.buyer.avatar"
              :src="item.buyer.avatar"
            />
            <span v-else>{{ item.buyer.name.slice(0, 2).toUpperCase() }}</span>
          </VAvatar>
          <span class="text-no-wrap font-weight-medium text-high-emphasis ms-2">{{ item.buyer.name }}</span>
        </div>
      </template>

      <!-- Payment -->
      <template #item.payment="{ item }">
        <div class="d-flex flex-column">
          <div class="d-flex align-center">
            <span class="text-high-emphasis font-weight-medium">\${{ item.payment.paidAmount }}</span>
            <span v-if="item.payment.paidAmount !== item.payment.total">/{{ item.payment.total }}</span>
          </div>
          <span class="text-xs text-no-wrap">{{ item.payment.receivedPaymentStatus }}</span>
        </div>
      </template>

      <!-- Status -->
      <template #item.status="{ item }">
        <VChip
          :color="resolveStatusColor(item.payment.status)"
          :class="\`text-\${resolveStatusColor(item.payment.status)}\`"
          size="small"
          class="font-weight-medium"
        >
          {{ item.payment.status }}
        </VChip>
      </template>

      <!-- Delete -->
      <template #item.delete="{ item }">
        <IconBtn @click="deleteItem(item.product.id)">
          <VIcon icon="tabler-trash" />
        </IconBtn>
      </template>
    </VDataTable>
  </div>
</template>
`,js:`<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'

const search = ref('')
const productList = ref([])

// headers
const headers = [
  {
    title: 'PRODUCT',
    key: 'product.name',
  },
  {
    title: 'DATE',
    key: 'date',
  },
  {
    title: 'CATEGORY',
    key: 'product.category',
  },
  {
    title: 'BUYERS',
    key: 'buyer.name',
  },
  {
    title: 'PAYMENT',
    key: 'payment',
    sortable: false,
  },
  {
    title: 'STATUS',
    key: 'status',
    sortable: false,
  },
  {
    title: 'DELETE',
    key: 'delete',
    sortable: false,
  },
]

const deleteItem = itemId => {
  const index = productList.value.findIndex(item => item.product.id === itemId)

  productList.value.splice(index, 1)
}

const categoryIcons = [
  {
    name: 'Mouse',
    icon: 'tabler-mouse',
    color: 'warning',
  },
  {
    name: 'Glass',
    icon: 'tabler-eyeglass',
    color: 'primary',
  },
  {
    name: 'Smart Watch',
    icon: 'tabler-device-watch',
    color: 'success',
  },
  {
    name: 'Bag',
    icon: 'tabler-briefcase',
    color: 'info',
  },
  {
    name: 'Storage Device',
    icon: 'tabler-device-audio-tape',
    color: 'warning',
  },
  {
    name: 'Bluetooth',
    icon: 'tabler-bluetooth',
    color: 'error',
  },
  {
    name: 'Gaming',
    icon: 'tabler-device-gamepad-2',
    color: 'warning',
  },
  {
    name: 'Home',
    icon: 'tabler-home',
    color: 'error',
  },
  {
    name: 'VR',
    icon: 'tabler-badge-vr',
    color: 'primary',
  },
  {
    name: 'Shoes',
    icon: 'tabler-shoe',
    color: 'success',
  },
  {
    name: 'Electronics',
    icon: 'tabler-cpu',
    color: 'info',
  },
  {
    name: 'Projector',
    icon: 'tabler-theater',
    color: 'warning',
  },
  {
    name: 'iPod',
    icon: 'tabler-device-airpods',
    color: 'error',
  },
  {
    name: 'Keyboard',
    icon: 'tabler-keyboard',
    color: 'primary',
  },
  {
    name: 'Smart Phone',
    icon: 'tabler-device-mobile',
    color: 'success',
  },
  {
    name: 'Smart TV',
    icon: 'tabler-device-tv',
    color: 'info',
  },
  {
    name: 'Google Home',
    icon: 'tabler-brand-google',
    color: 'warning',
  },
  {
    name: 'Mac',
    icon: 'tabler-brand-apple',
    color: 'error',
  },
  {
    name: 'Headphone',
    icon: 'tabler-headphones',
    color: 'primary',
  },
  {
    name: 'iMac',
    icon: 'tabler-device-imac',
    color: 'success',
  },
  {
    name: 'iPhone',
    icon: 'tabler-brand-apple',
    color: 'warning',
  },
]

const resolveStatusColor = status => {
  if (status === 'Confirmed')
    return 'primary'
  if (status === 'Completed')
    return 'success'
  if (status === 'Cancelled')
    return 'error'
}

const categoryIconFilter = categoryName => {
  const index = categoryIcons.findIndex(category => category.name === categoryName)
  if (index !== -1)
    return [{
      icon: categoryIcons[index].icon,
      color: categoryIcons[index].color,
    }]
  
  return [{
    icon: 'tabler-help-circle',
    color: 'primary',
  }]
}

const { data, error } = await useApi('pages/datatable')
if (error.value) {
  console.error(error.value)
} else {
  if (data.value)
    productList.value = data.value
}
<\/script>

<template>
  <div>
    <VCardText>
      <VRow>
        <VCol
          cols="12"
          offset-md="8"
          md="4"
        >
          <AppTextField
            v-model="search"
            density="compact"
            placeholder="Search ..."
            append-inner-icon="tabler-search"
            single-line
            hide-details
            dense
            outlined
          />
        </VCol>
      </VRow>
    </VCardText>

    <!-- 👉 Data Table  -->
    <VDataTable
      :headers="headers"
      :items="productList"
      :search="search"
      :items-per-page="5"
      class="text-no-wrap"
    >
      <!-- product -->
      <template #item.product.name="{ item }">
        <div class="d-flex align-center">
          <div>
            <VImg
              :src="item.product.image"
              height="40"
              width="40"
            />
          </div>
          <div class="d-flex flex-column ms-3">
            <span class="d-block font-weight-medium text-truncate text-high-emphasis">{{ item.product.name }}</span>
            <span class="text-xs">{{ item.product.brand }}</span>
          </div>
        </div>
      </template>

      <!-- category -->
      <template #item.product.category="{ item }">
        <div class="d-flex align-center">
          <VAvatar
            v-for="(category, index) in categoryIconFilter(item.product.category)"
            :key="index"
            size="26"
            :color="category.color"
            variant="tonal"
          >
            <VIcon
              size="20"
              :color="category.color"
              class="rounded-0"
            >
              {{ category.icon }}
            </VIcon>
          </VAvatar>
          <span class="ms-1 text-no-wrap">{{ item.product.category }}</span>
        </div>
      </template>

      <!-- buyer -->
      <template #item.buyer.name="{ item }">
        <div class="d-flex align-center">
          <VAvatar
            size="1.875rem"
            :color="!item.avatar ? 'primary' : undefined"
            :variant="!item.avatar ? 'tonal' : undefined"
          >
            <VImg
              v-if="item.buyer.avatar"
              :src="item.buyer.avatar"
            />
            <span v-else>{{ item.buyer.name.slice(0, 2).toUpperCase() }}</span>
          </VAvatar>
          <span class="text-no-wrap font-weight-medium text-high-emphasis ms-2">{{ item.buyer.name }}</span>
        </div>
      </template>

      <!-- Payment -->
      <template #item.payment="{ item }">
        <div class="d-flex flex-column">
          <div class="d-flex align-center">
            <span class="text-high-emphasis font-weight-medium">\${{ item.payment.paidAmount }}</span>
            <span v-if="item.payment.paidAmount !== item.payment.total">/{{ item.payment.total }}</span>
          </div>
          <span class="text-xs text-no-wrap">{{ item.payment.receivedPaymentStatus }}</span>
        </div>
      </template>

      <!-- Status -->
      <template #item.status="{ item }">
        <VChip
          :color="resolveStatusColor(item.payment.status)"
          :class="\`text-\${resolveStatusColor(item.payment.status)}\`"
          size="small"
          class="font-weight-medium"
        >
          {{ item.payment.status }}
        </VChip>
      </template>

      <!-- Delete -->
      <template #item.delete="{ item }">
        <IconBtn @click="deleteItem(item.product.id)">
          <VIcon icon="tabler-trash" />
        </IconBtn>
      </template>
    </VDataTable>
  </div>
</template>
`},wa={ts:`<script setup lang="ts">
import { VDataTable } from 'vuetify/labs/VDataTable'
import data from '@/views/demos/forms/tables/data-table/datatable'
import type { Data } from '@db/pages/datatable/types'

const editDialog = ref(false)
const deleteDialog = ref(false)

const defaultItem = ref<Data>({
  responsiveId: '',
  id: -1,
  avatar: '',
  fullName: '',
  post: '',
  email: '',
  city: '',
  startDate: '',
  salary: -1,
  age: '',
  experience: '',
  status: -1,
})

const editedItem = ref<Data>(defaultItem.value)
const editedIndex = ref(-1)
const userList = ref<Data[]>([])

// status options
const selectedOptions = [
  { text: 'Current', value: 1 },
  { text: 'Professional', value: 2 },
  { text: 'Rejected', value: 3 },
  { text: 'Resigned', value: 4 },
  { text: 'Applied', value: 5 },
]

// headers
const headers = [
  { title: 'NAME', key: 'fullName' },
  { title: 'EMAIL', key: 'email' },
  { title: 'DATE', key: 'startDate' },
  { title: 'SALARY', key: 'salary' },
  { title: 'AGE', key: 'age' },
  { title: 'STATUS', key: 'status' },
  { title: 'ACTIONS', key: 'actions' },
]

const resolveStatusVariant = (status: number) => {
  if (status === 1)
    return { color: 'primary', text: 'Current' }
  else if (status === 2)
    return { color: 'success', text: 'Professional' }
  else if (status === 3)
    return { color: 'error', text: 'Rejected' }
  else if (status === 4)
    return { color: 'warning', text: 'Resigned' }
  else
    return { color: 'info', text: 'Applied' }
}

// 👉 methods
const editItem = (item: Data) => {
  editedIndex.value = userList.value.indexOf(item)
  editedItem.value = { ...item }
  editDialog.value = true
}

const deleteItem = (item: Data) => {
  editedIndex.value = userList.value.indexOf(item)
  editedItem.value = { ...item }
  deleteDialog.value = true
}

const close = () => {
  editDialog.value = false
  editedIndex.value = -1
  editedItem.value = { ...defaultItem.value }
}

const closeDelete = () => {
  deleteDialog.value = false
  editedIndex.value = -1
  editedItem.value = { ...defaultItem.value }
}

const save = () => {
  if (editedIndex.value > -1)
    Object.assign(userList.value[editedIndex.value], editedItem.value)

  else
    userList.value.push(editedItem.value)

  close()
}

const deleteItemConfirm = () => {
  userList.value.splice(editedIndex.value, 1)
  closeDelete()
}

onMounted(() => {
  userList.value = JSON.parse(JSON.stringify(data))
})
<\/script>

<template>
  <!-- 👉 Datatable  -->
  <VDataTable
    :headers="headers"
    :items="userList"
    :items-per-page="5"
  >
    <!-- full name -->
    <template #item.fullName="{ item }">
      <div class="d-flex align-center">
        <!-- avatar -->
        <VAvatar
          size="32"
          :color="item.avatar ? '' : 'primary'"
          :class="item.avatar ? '' : 'v-avatar-light-bg primary--text'"
          :variant="!item.avatar ? 'tonal' : undefined"
        >
          <VImg
            v-if="item.avatar"
            :src="item.avatar"
          />
          <span v-else>{{ avatarText(item.fullName) }}</span>
        </VAvatar>

        <div class="d-flex flex-column ms-3">
          <span class="d-block font-weight-medium text-high-emphasis text-truncate">{{ item.fullName }}</span>
          <small>{{ item.post }}</small>
        </div>
      </div>
    </template>

    <!-- status -->
    <template #item.status="{ item }">
      <VChip
        :color="resolveStatusVariant(item.status).color"
        size="small"
      >
        {{ resolveStatusVariant(item.status).text }}
      </VChip>
    </template>

    <!-- Actions -->
    <template #item.actions="{ item }">
      <div class="d-flex gap-1">
        <IconBtn @click="editItem(item.raw)">
          <VIcon icon="tabler-edit" />
        </IconBtn>
        <IconBtn @click="deleteItem(item.raw)">
          <VIcon icon="tabler-trash" />
        </IconBtn>
      </div>
    </template>
  </VDataTable>

  <!-- 👉 Edit Dialog  -->
  <VDialog
    v-model="editDialog"
    max-width="600px"
  >
    <VCard>
      <VCardTitle>
        <span class="headline">Edit Item</span>
      </VCardTitle>

      <VCardText>
        {{ editedItem?.fullName }}
        <VContainer>
          <VRow>
            <!-- fullName -->
            <VCol
              cols="12"
              sm="6"
              md="4"
            >
              <VTextField
                v-model="editedItem.fullName"
                label="User name"
              />
            </VCol>

            <!-- email -->
            <VCol
              cols="12"
              sm="6"
              md="4"
            >
              <VTextField
                v-model="editedItem.email"
                label="Email"
              />
            </VCol>

            <!-- salary -->
            <VCol
              cols="12"
              sm="6"
              md="4"
            >
              <VTextField
                v-model="editedItem.salary"
                label="Salary"
                prefix="$"
                type="number"
              />
            </VCol>

            <!-- age -->
            <VCol
              cols="12"
              sm="6"
              md="4"
            >
              <VTextField
                v-model="editedItem.age"
                label="Age"
                type="number"
              />
            </VCol>

            <!-- start date -->
            <VCol
              cols="12"
              sm="6"
              md="4"
            >
              <VTextField
                v-model="editedItem.startDate"
                label="Date"
              />
            </VCol>

            <!-- status -->
            <VCol
              cols="12"
              sm="6"
              md="4"
            >
              <AppSelect
                v-model="editedItem.status"
                :items="selectedOptions"
                item-title="text"
                item-value="value"
                label="Standard"
                variant="underlined"
                readonly
              />
            </VCol>
          </VRow>
        </VContainer>
      </VCardText>

      <VCardActions>
        <VSpacer />

        <VBtn
          color="error"
          variant="outlined"
          @click="close"
        >
          Cancel
        </VBtn>

        <VBtn
          color="success"
          variant="elevated"
          @click="save"
        >
          Save
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>

  <!-- 👉 Delete Dialog  -->
  <VDialog
    v-model="deleteDialog"
    max-width="500px"
  >
    <VCard>
      <VCardTitle>
        Are you sure you want to delete this item?
      </VCardTitle>

      <VCardActions>
        <VSpacer />

        <VBtn
          color="error"
          variant="outlined"
          @click="closeDelete"
        >
          Cancel
        </VBtn>

        <VBtn
          color="success"
          variant="elevated"
          @click="deleteItemConfirm"
        >
          OK
        </VBtn>

        <VSpacer />
      </VCardActions>
    </VCard>
  </VDialog>
</template>
`,js:`<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import data from '@/views/demos/forms/tables/data-table/datatable'

const editDialog = ref(false)
const deleteDialog = ref(false)

const defaultItem = ref({
  responsiveId: '',
  id: -1,
  avatar: '',
  fullName: '',
  post: '',
  email: '',
  city: '',
  startDate: '',
  salary: -1,
  age: '',
  experience: '',
  status: -1,
})

const editedItem = ref(defaultItem.value)
const editedIndex = ref(-1)
const userList = ref([])

// status options
const selectedOptions = [
  {
    text: 'Current',
    value: 1,
  },
  {
    text: 'Professional',
    value: 2,
  },
  {
    text: 'Rejected',
    value: 3,
  },
  {
    text: 'Resigned',
    value: 4,
  },
  {
    text: 'Applied',
    value: 5,
  },
]

// headers
const headers = [
  {
    title: 'NAME',
    key: 'fullName',
  },
  {
    title: 'EMAIL',
    key: 'email',
  },
  {
    title: 'DATE',
    key: 'startDate',
  },
  {
    title: 'SALARY',
    key: 'salary',
  },
  {
    title: 'AGE',
    key: 'age',
  },
  {
    title: 'STATUS',
    key: 'status',
  },
  {
    title: 'ACTIONS',
    key: 'actions',
  },
]

const resolveStatusVariant = status => {
  if (status === 1)
    return {
      color: 'primary',
      text: 'Current',
    }
  else if (status === 2)
    return {
      color: 'success',
      text: 'Professional',
    }
  else if (status === 3)
    return {
      color: 'error',
      text: 'Rejected',
    }
  else if (status === 4)
    return {
      color: 'warning',
      text: 'Resigned',
    }
  else
    return {
      color: 'info',
      text: 'Applied',
    }
}

const editItem = item => {
  editedIndex.value = userList.value.indexOf(item)
  editedItem.value = { ...item }
  editDialog.value = true
}

const deleteItem = item => {
  editedIndex.value = userList.value.indexOf(item)
  editedItem.value = { ...item }
  deleteDialog.value = true
}

const close = () => {
  editDialog.value = false
  editedIndex.value = -1
  editedItem.value = { ...defaultItem.value }
}

const closeDelete = () => {
  deleteDialog.value = false
  editedIndex.value = -1
  editedItem.value = { ...defaultItem.value }
}

const save = () => {
  if (editedIndex.value > -1)
    Object.assign(userList.value[editedIndex.value], editedItem.value)
  else
    userList.value.push(editedItem.value)
  close()
}

const deleteItemConfirm = () => {
  userList.value.splice(editedIndex.value, 1)
  closeDelete()
}

onMounted(() => {
  userList.value = JSON.parse(JSON.stringify(data))
})
<\/script>

<template>
  <!-- 👉 Datatable  -->
  <VDataTable
    :headers="headers"
    :items="userList"
    :items-per-page="5"
  >
    <!-- full name -->
    <template #item.fullName="{ item }">
      <div class="d-flex align-center">
        <!-- avatar -->
        <VAvatar
          size="32"
          :color="item.avatar ? '' : 'primary'"
          :class="item.avatar ? '' : 'v-avatar-light-bg primary--text'"
          :variant="!item.avatar ? 'tonal' : undefined"
        >
          <VImg
            v-if="item.avatar"
            :src="item.avatar"
          />
          <span v-else>{{ avatarText(item.fullName) }}</span>
        </VAvatar>

        <div class="d-flex flex-column ms-3">
          <span class="d-block font-weight-medium text-high-emphasis text-truncate">{{ item.fullName }}</span>
          <small>{{ item.post }}</small>
        </div>
      </div>
    </template>

    <!-- status -->
    <template #item.status="{ item }">
      <VChip
        :color="resolveStatusVariant(item.status).color"
        size="small"
      >
        {{ resolveStatusVariant(item.status).text }}
      </VChip>
    </template>

    <!-- Actions -->
    <template #item.actions="{ item }">
      <div class="d-flex gap-1">
        <IconBtn @click="editItem(item.raw)">
          <VIcon icon="tabler-edit" />
        </IconBtn>
        <IconBtn @click="deleteItem(item.raw)">
          <VIcon icon="tabler-trash" />
        </IconBtn>
      </div>
    </template>
  </VDataTable>

  <!-- 👉 Edit Dialog  -->
  <VDialog
    v-model="editDialog"
    max-width="600px"
  >
    <VCard>
      <VCardTitle>
        <span class="headline">Edit Item</span>
      </VCardTitle>

      <VCardText>
        {{ editedItem?.fullName }}
        <VContainer>
          <VRow>
            <!-- fullName -->
            <VCol
              cols="12"
              sm="6"
              md="4"
            >
              <VTextField
                v-model="editedItem.fullName"
                label="User name"
              />
            </VCol>

            <!-- email -->
            <VCol
              cols="12"
              sm="6"
              md="4"
            >
              <VTextField
                v-model="editedItem.email"
                label="Email"
              />
            </VCol>

            <!-- salary -->
            <VCol
              cols="12"
              sm="6"
              md="4"
            >
              <VTextField
                v-model="editedItem.salary"
                label="Salary"
                prefix="$"
                type="number"
              />
            </VCol>

            <!-- age -->
            <VCol
              cols="12"
              sm="6"
              md="4"
            >
              <VTextField
                v-model="editedItem.age"
                label="Age"
                type="number"
              />
            </VCol>

            <!-- start date -->
            <VCol
              cols="12"
              sm="6"
              md="4"
            >
              <VTextField
                v-model="editedItem.startDate"
                label="Date"
              />
            </VCol>

            <!-- status -->
            <VCol
              cols="12"
              sm="6"
              md="4"
            >
              <AppSelect
                v-model="editedItem.status"
                :items="selectedOptions"
                item-title="text"
                item-value="value"
                label="Standard"
                variant="underlined"
                readonly
              />
            </VCol>
          </VRow>
        </VContainer>
      </VCardText>

      <VCardActions>
        <VSpacer />

        <VBtn
          color="error"
          variant="outlined"
          @click="close"
        >
          Cancel
        </VBtn>

        <VBtn
          color="success"
          variant="elevated"
          @click="save"
        >
          Save
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>

  <!-- 👉 Delete Dialog  -->
  <VDialog
    v-model="deleteDialog"
    max-width="500px"
  >
    <VCard>
      <VCardTitle>
        Are you sure you want to delete this item?
      </VCardTitle>

      <VCardActions>
        <VSpacer />

        <VBtn
          color="error"
          variant="outlined"
          @click="closeDelete"
        >
          Cancel
        </VBtn>

        <VBtn
          color="success"
          variant="elevated"
          @click="deleteItemConfirm"
        >
          OK
        </VBtn>

        <VSpacer />
      </VCardActions>
    </VCard>
  </VDialog>
</template>
`},Ea={ts:`<script setup lang="ts">
import { VDataTable } from 'vuetify/labs/VDataTable'
import data from '@/views/demos/forms/tables/data-table/datatable'

const headers = [
  { title: 'NAME', key: 'fullName' },
  { title: 'EMAIL', key: 'email' },
  { title: 'DATE', key: 'startDate' },
  { title: 'SALARY', key: 'salary' },
  { title: 'AGE', key: 'age' },
  { title: 'STATUS', key: 'status' },
]

const resolveStatusVariant = (status: number) => {
  if (status === 1)
    return { color: 'primary', text: 'Current' }
  else if (status === 2)
    return { color: 'success', text: 'Professional' }
  else if (status === 3)
    return { color: 'error', text: 'Rejected' }
  else if (status === 4)
    return { color: 'warning', text: 'Resigned' }
  else
    return { color: 'info', text: 'Applied' }
}
<\/script>

<template>
  <VDataTable
    :headers="headers"
    :items="data"
    :items-per-page="5"
    show-select
  >
    <!-- full name -->
    <template #item.fullName="{ item }">
      <div class="d-flex align-center">
        <VAvatar
          size="32"
          :color="item.avatar ? '' : 'primary'"
          :class="item.avatar ? '' : 'v-avatar-light-bg primary--text'"
          :variant="!item.avatar ? 'tonal' : undefined"
        >
          <VImg
            v-if="item.avatar"
            :src="item.avatar"
          />
          <span v-else>{{ avatarText(item.fullName) }}</span>
        </VAvatar>
        <div class="d-flex flex-column ms-3">
          <span class="d-block font-weight-medium text-high-emphasis text-truncate">{{ item.fullName }}</span>
          <small>{{ item.post }}</small>
        </div>
      </div>
    </template>

    <!-- status -->
    <template #item.status="{ item }">
      <VChip
        :color="resolveStatusVariant(item.status).color"
        class="font-weight-medium"
        size="small"
      >
        {{ resolveStatusVariant(item.status).text }}
      </VChip>
    </template>
  </VDataTable>
</template>
`,js:`<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import data from '@/views/demos/forms/tables/data-table/datatable'

const headers = [
  {
    title: 'NAME',
    key: 'fullName',
  },
  {
    title: 'EMAIL',
    key: 'email',
  },
  {
    title: 'DATE',
    key: 'startDate',
  },
  {
    title: 'SALARY',
    key: 'salary',
  },
  {
    title: 'AGE',
    key: 'age',
  },
  {
    title: 'STATUS',
    key: 'status',
  },
]

const resolveStatusVariant = status => {
  if (status === 1)
    return {
      color: 'primary',
      text: 'Current',
    }
  else if (status === 2)
    return {
      color: 'success',
      text: 'Professional',
    }
  else if (status === 3)
    return {
      color: 'error',
      text: 'Rejected',
    }
  else if (status === 4)
    return {
      color: 'warning',
      text: 'Resigned',
    }
  else
    return {
      color: 'info',
      text: 'Applied',
    }
}
<\/script>

<template>
  <VDataTable
    :headers="headers"
    :items="data"
    :items-per-page="5"
    show-select
  >
    <!-- full name -->
    <template #item.fullName="{ item }">
      <div class="d-flex align-center">
        <VAvatar
          size="32"
          :color="item.avatar ? '' : 'primary'"
          :class="item.avatar ? '' : 'v-avatar-light-bg primary--text'"
          :variant="!item.avatar ? 'tonal' : undefined"
        >
          <VImg
            v-if="item.avatar"
            :src="item.avatar"
          />
          <span v-else>{{ avatarText(item.fullName) }}</span>
        </VAvatar>
        <div class="d-flex flex-column ms-3">
          <span class="d-block font-weight-medium text-high-emphasis text-truncate">{{ item.fullName }}</span>
          <small>{{ item.post }}</small>
        </div>
      </div>
    </template>

    <!-- status -->
    <template #item.status="{ item }">
      <VChip
        :color="resolveStatusVariant(item.status).color"
        class="font-weight-medium"
        size="small"
      >
        {{ resolveStatusVariant(item.status).text }}
      </VChip>
    </template>
  </VDataTable>
</template>
`},xt={__name:"data-table",setup(I){return(c,m)=>{const l=Va,i=ge,t=Da,u=ba,p=fa,v=ca,w=la,E=Xe,G=He,D=Le,V=Ee;return d(),g(q,null,{default:a(()=>[e(h,{cols:"12"},{default:a(()=>[e(i,{title:"Basic",code:Aa},{default:a(()=>[e(l)]),_:1},8,["code"])]),_:1}),e(h,null,{default:a(()=>[e(i,{title:"Dense",code:Ia},{default:a(()=>[e(t)]),_:1},8,["code"])]),_:1}),e(h,{cols:"12"},{default:a(()=>[e(i,{title:"Cell Slot",code:ka},{default:a(()=>[e(u)]),_:1},8,["code"])]),_:1}),e(h,{cols:"12"},{default:a(()=>[e(i,{title:"Row Selection",code:Ea},{default:a(()=>[e(p)]),_:1},8,["code"])]),_:1}),e(h,{cols:"12"},{default:a(()=>[e(i,{title:"Fixed Header",code:Sa},{default:a(()=>[e(v)]),_:1},8,["code"])]),_:1}),e(h,{cols:"12"},{default:a(()=>[e(i,{title:"Expandable Rows",code:Na},{default:a(()=>[e(w)]),_:1},8,["code"])]),_:1}),e(h,{cols:"12"},{default:a(()=>[e(i,{title:"Grouping Rows",code:Ca},{default:a(()=>[e(E)]),_:1},8,["code"])]),_:1}),e(h,{cols:"12"},{default:a(()=>[e(i,{title:"Row Editing via Dialog",code:wa},{default:a(()=>[e(G)]),_:1},8,["code"])]),_:1}),e(h,{cols:"12"},{default:a(()=>[e(i,{title:"External Pagination",code:Ta},{default:a(()=>[e(D)]),_:1},8,["code"])]),_:1}),e(h,{cols:"12"},{default:a(()=>[e(i,{title:"Kitchen Sink",code:_a},{default:a(()=>[e(V)]),_:1},8,["code"])]),_:1})]),_:1})}}};export{xt as default};
