window.LONGWAVE_SEED={"users": [{"id": 1, "name": "Anna Kowalska", "email": "demo@longwave.local", "role": "client"}, {"id": 2, "name": "Zespół Longwave", "email": "admin@longwave.local", "role": "admin"}], "participants": [{"id": 1, "user_id": 1, "first_name": "Maja", "last_name": "Kowalska", "birth_date": "2015-05-12", "falki": 200}, {"id": 2, "user_id": 1, "first_name": "Antoni", "last_name": "Kowalski", "birth_date": "2012-10-03", "falki": 150}], "offers": [{"id": 1, "title": "Jastarnia · Home Spot", "place": "Jastarnia", "start_date": "2026-08-01", "end_date": "2026-08-08", "price": 309000, "age_min": 10, "age_max": 15, "capacity": 30, "description": "Windsurfing, SUP i czas na świeżym powietrzu. Kameralna ekipa, nowe przyjaźnie i codziennie kolejna okazja, żeby spróbować czegoś po raz pierwszy.", "image": "coast", "active": 1, "category": "Camp", "falki": 50}, {"id": 2, "title": "Dąbki · Wind4You", "place": "Dąbki", "start_date": "2026-08-15", "end_date": "2026-08-22", "price": 299000, "age_min": 7, "age_max": 15, "capacity": 30, "description": "Windsurfing, SUP i czas na świeżym powietrzu. Kameralna ekipa, nowe przyjaźnie i codziennie kolejna okazja, żeby spróbować czegoś po raz pierwszy.", "image": "dabki", "active": 1, "category": "Camp", "falki": 50}, {"id": 3, "title": "Jastarnia · Czarna Perła", "place": "Jastarnia", "start_date": "2026-07-25", "end_date": "2026-08-01", "price": 299000, "age_min": 7, "age_max": 15, "capacity": 30, "description": "Windsurfing, SUP i czas na świeżym powietrzu. Kameralna ekipa, nowe przyjaźnie i codziennie kolejna okazja, żeby spróbować czegoś po raz pierwszy.", "image": "category-camp", "active": 1, "category": "Camp", "falki": 50}, {"id": 4, "title": "Jastarnia · Home Spot", "place": "Jastarnia", "start_date": "2026-07-25", "end_date": "2026-08-01", "price": 309000, "age_min": 10, "age_max": 15, "capacity": 30, "description": "Windsurfing, SUP i czas na świeżym powietrzu. Kameralna ekipa, nowe przyjaźnie i codziennie kolejna okazja, żeby spróbować czegoś po raz pierwszy.", "image": "sunset", "active": 1, "category": "Camp", "falki": 50}, {"id": 5, "title": "Dąbki · Wind4You", "place": "Dąbki", "start_date": "2026-08-08", "end_date": "2026-08-15", "price": 299000, "age_min": 7, "age_max": 15, "capacity": 30, "description": "Windsurfing, SUP i czas na świeżym powietrzu. Kameralna ekipa, nowe przyjaźnie i codziennie kolejna okazja, żeby spróbować czegoś po raz pierwszy.", "image": "together", "active": 1, "category": "Camp", "falki": 50}, {"id": 6, "title": "Dąbki · Surfing po hiszpańsku", "place": "Dąbki", "start_date": "2026-08-01", "end_date": "2026-08-08", "price": 299000, "age_min": 7, "age_max": 15, "capacity": 30, "description": "Sporty wodne i hiszpański przez zabawę. Wakacje pełne ruchu, nauki i przyjaźni.", "image": "friends", "active": 1, "category": "Camp", "falki": 50}], "bookings": [{"id": 1, "user_id": 1, "participant_id": 1, "offer_id": 1, "amount": 309000, "paid": 100000, "created_at": "2026-09-30", "falki_awarded": 0, "falki_value": null}], "rewards": [{"id": 1, "title": "Bidon Longwave", "description": "Przykładowa nagroda: bidon na kolejną przygodę.", "cost": 100, "active": 1, "image": ""}, {"id": 2, "title": "Czapka Longwave", "description": "Przykładowa nagroda: czapka z logo ekipy.", "cost": 150, "active": 1, "image": ""}, {"id": 3, "title": "Koszulka Longwave", "description": "Przykładowa nagroda: koszulka na camp.", "cost": 200, "active": 1, "image": ""}], "redemptions": []};
// Public presentation adapter. No server accounts, passwords or shared personal data.
window.LONGWAVE_PREVIEW=true;
const previewKey='longwave-public-demo-v1';
let previewDB;
try{previewDB=JSON.parse(localStorage.getItem(previewKey))}catch{}
if(!previewDB)previewDB=structuredClone(window.LONGWAVE_SEED);
// One-time migration preserves existing browser-local offers and participants.
if(!previewDB.loyaltyVersion){
 previewDB.participants.forEach(p=>{const seed=window.LONGWAVE_SEED.participants.find(x=>x.id===p.id&&x.user_id===p.user_id&&x.first_name===p.first_name&&x.last_name===p.last_name);p.falki=seed?.falki||0});
 previewDB.offers.forEach(o=>o.falki=50);previewDB.bookings.forEach(b=>{b.falki_awarded=0;b.falki_value=null});
 previewDB.rewards=structuredClone(window.LONGWAVE_SEED.rewards);previewDB.redemptions=[];previewDB.default_falki=50;previewDB.loyaltyVersion=1;
 localStorage.setItem(previewKey,JSON.stringify(previewDB));
}
let previewUser=Number(sessionStorage.getItem(previewKey+'-user'))||null;
const savePreview=()=>{try{localStorage.setItem(previewKey,JSON.stringify(previewDB))}catch{throw Error('Brak miejsca w pamięci przeglądarki.')}};
const previewAge=(birth,start)=>{const b=new Date(birth),d=new Date(start);return d.getFullYear()-b.getFullYear()-((d.getMonth()<b.getMonth()||d.getMonth()===b.getMonth()&&d.getDate()<b.getDate())?1:0)};
window.longwavePreviewApi=async function(path,data,method){
 const db=previewDB,u=db.users.find(x=>x.id===previewUser);
 if(path==='session')return {user:u||null,demo:true};
 if(path==='login'){const found=db.users.find(x=>x.email===data.email);if(!found)throw Error('Wybierz Panel rodzica lub Administrator.');previewUser=found.id;sessionStorage.setItem(previewKey+'-user',previewUser);return {ok:true}}
 if(path==='logout'){previewUser=null;sessionStorage.removeItem(previewKey+'-user');return {ok:true}}
 if(!u)throw Error('Wybierz konto.');
 const admin=u.role==='admin';
 if(path.startsWith('admin/')&&!admin)throw Error('Ta funkcja jest dostępna dla administratora.');
 const bookings=db.bookings.map(b=>{const p=db.participants.find(p=>p.id===b.participant_id),o=db.offers.find(o=>o.id===b.offer_id),owner=db.users.find(x=>x.id===b.user_id);return {...o,...p,...b,client_name:owner.name,client_email:owner.email}}).reverse();
 if(path==='state')return structuredClone({user:u,default_falki:db.default_falki,rewards:db.rewards.filter(r=>admin||r.active),redemptions:db.redemptions.map(r=>{const p=db.participants.find(p=>p.id===r.participant_id);return {...r,first_name:p.first_name,last_name:p.last_name,user_id:p.user_id}}).filter(r=>admin||r.user_id===u.id).reverse(),offers:db.offers.filter(o=>admin||o.active).map(o=>{const booked=db.bookings.filter(b=>b.offer_id===o.id).length;if(admin)return {...o,booked};const {capacity,...visible}=o;return {...visible,available:booked<capacity}}),participants:db.participants.filter(p=>admin||p.user_id===u.id).map(p=>({...p,owner_name:db.users.find(x=>x.id===p.user_id).name})),bookings:bookings.filter(b=>admin||b.user_id===u.id),clients:admin?db.users.filter(x=>x.role==='client').map(x=>({...x,participants:db.participants.filter(p=>p.user_id===x.id).length})):[]});
 const next=rows=>Math.max(0,...rows.map(x=>x.id))+1;
 if(path==='participants'||path.startsWith('participants/')){
  if(!data.first_name?.trim()||!data.last_name?.trim()||!/^\d{4}-\d{2}-\d{2}$/.test(data.birth_date)||data.birth_date>new Date().toISOString().slice(0,10))throw Error('Sprawdź dane uczestnika.');
  const fields={first_name:data.first_name.trim(),last_name:data.last_name.trim(),birth_date:data.birth_date};
  if(method==='PUT'){const p=db.participants.find(p=>p.id===+path.split('/')[1]&&p.user_id===u.id);if(!p)throw Error('Nie znaleziono uczestnika.');Object.assign(p,fields)}else db.participants.push({id:next(db.participants),user_id:u.id,falki:0,...fields});
 }else if(path==='bookings'){
  const p=db.participants.find(p=>p.id===data.participant_id&&p.user_id===u.id),o=db.offers.find(o=>o.id===data.offer_id&&o.active);
  if(!p||!o)throw Error('Wybierz uczestnika i wydarzenie.');
  if(db.bookings.some(b=>b.participant_id===p.id&&b.offer_id===o.id))throw Error('Uczestnik jest już zapisany.');
  if(db.bookings.filter(b=>b.offer_id===o.id).length>=o.capacity)throw Error('Brak wolnych miejsc.');
  const years=previewAge(p.birth_date,o.start_date);if(years<o.age_min||years>o.age_max)throw Error('Wiek poza zakresem wydarzenia.');
  db.bookings.push({id:next(db.bookings),user_id:u.id,participant_id:p.id,offer_id:o.id,amount:o.price,paid:0,created_at:new Date().toISOString()});
 }else if(path.startsWith('admin/bookings/')){
  const b=db.bookings.find(b=>b.id===+path.split('/')[2]);if(!b||!Number.isInteger(data.paid)||data.paid<0||data.paid>b.amount)throw Error('Sprawdź kwotę wpłaty.');
  const p=db.participants.find(p=>p.id===b.participant_id),value=b.falki_value??db.offers.find(o=>o.id===b.offer_id).falki,target=data.paid===b.amount?value:0,delta=target-(b.falki_awarded||0);
  if(p.falki+delta<0)throw Error('Nie można cofnąć wpłaty: falki zostały już wykorzystane.');
  p.falki+=delta;b.falki_awarded=target;if(data.paid===b.amount)b.falki_value=value;b.paid=data.paid;
 }else if(path==='redeem'){
  const p=db.participants.find(p=>p.id===data.participant_id&&p.user_id===u.id),r=db.rewards.find(r=>r.id===data.reward_id&&r.active);
  if(!p)throw Error('Nie znaleziono uczestnika.');
  if(!/^[a-zA-Z0-9-]{10,80}$/.test(data.request_id||''))throw Error('Odśwież wybór nagrody.');
  const prior=db.redemptions.find(r=>r.request_id===data.request_id);if(prior){if(prior.participant_id!==p.id||prior.reward_id!==data.reward_id)throw Error('Niepoprawne ponowienie wymiany.');return {ok:true}}
  if(!r)throw Error('Nagroda jest niedostępna.');if(p.falki<r.cost)throw Error('Za mało falek na tę nagrodę.');
  p.falki-=r.cost;db.redemptions.push({id:next(db.redemptions),participant_id:p.id,reward_id:r.id,title:r.title,cost:r.cost,status:'pending',created_at:new Date().toISOString(),request_id:data.request_id});
 }else if(path==='admin/loyalty'){
  const n=Number(data.default_falki);if(!Number.isInteger(n)||n<0||n>10000)throw Error('Podaj od 0 do 10000 falek.');db.default_falki=n;
 }else if(path==='admin/rewards'||path.startsWith('admin/rewards/')){
  const priorReward=db.rewards.find(r=>r.id===+path.split('/')[2]);const image=data.image??priorReward?.image??'';if(image&&!db.covers?.[image])throw Error('Wybierz poprawne zdjęcie nagrody.');
  const r={image,title:String(data.title||'').trim(),description:String(data.description||'').trim(),cost:Number(data.cost),active:!!data.active};
  if(r.title.length<2||r.title.length>100||r.description.length>500||!Number.isInteger(r.cost)||r.cost<1||r.cost>100000)throw Error('Sprawdź nazwę i koszt nagrody.');
  if(method==='PUT'){const old=db.rewards.find(r=>r.id===+path.split('/')[2]);if(!old)throw Error('Nie znaleziono nagrody.');Object.assign(old,r)}else db.rewards.push({...r,id:next(db.rewards)});
 }else if(path.startsWith('admin/redemptions/')){
  const r=db.redemptions.find(r=>r.id===+path.split('/')[2]);if(!r||data.status!=='fulfilled')throw Error('Nie znaleziono wymiany.');r.status='fulfilled';
 }else if(path==='admin/cover'){
  if(data.data?.length>6700000)throw Error('Zdjęcie może mieć maksymalnie 5 MB.');
  const im=new Image();await new Promise((resolve,reject)=>{im.onload=resolve;im.onerror=()=>reject(Error('Niepoprawne zdjęcie.'));im.src='data:image/jpeg;base64,'+data.data});
  const canvas=document.createElement('canvas'),scale=Math.min(1,1000/im.width,1000/im.height);canvas.width=im.width*scale;canvas.height=im.height*scale;canvas.getContext('2d').drawImage(im,0,0,canvas.width,canvas.height);
  const name='demo_'+Date.now();db.covers??={};db.covers[name]=canvas.toDataURL('image/webp',.8);savePreview();return {image:name};
 }else if(path==='admin/offers'||path.startsWith('admin/offers/')){
  const o={...data,falki:Number(data.falki??db.default_falki)};if(!Number.isInteger(o.falki)||o.falki<0||o.falki>10000)throw Error('Podaj od 0 do 10000 falek.');for(const k of ['price','age_min','age_max','capacity'])o[k]=Number(o[k]);
  if(!o.title?.trim()||!o.place?.trim()||!(o.start_date<o.end_date)||o.price<=0||o.capacity<1||o.age_min<1||o.age_min>o.age_max)throw Error('Sprawdź pola wydarzenia.');
  if(method==='PUT'){const old=db.offers.find(x=>x.id===+path.split('/')[2]);if(!old)throw Error('Nie znaleziono wydarzenia.');const enrolled=db.bookings.filter(b=>b.offer_id===old.id);if(enrolled.length>o.capacity||enrolled.some(b=>{const p=db.participants.find(p=>p.id===b.participant_id),years=previewAge(p.birth_date,o.start_date);return years<o.age_min||years>o.age_max}))throw Error('Zmiana niezgodna z istniejącymi zapisami.');Object.assign(old,o)}else db.offers.push({...o,id:next(db.offers)});
 }else throw Error('Ta funkcja wymaga pełnego serwera aplikacji.');
 savePreview();return {ok:true};
};
window.previewAsset=image=>previewDB.covers?.[image]||'assets/'+image+'.webp';
