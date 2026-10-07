'use strict';
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { menuButton.setAttribute('aria-expanded','false'); menuButton.setAttribute('aria-label','Ouvrir le menu'); navigation.classList.remove('open'); document.body.classList.remove('menu-open'); }
menuButton.addEventListener('click',()=>{ const open=menuButton.getAttribute('aria-expanded')!=='true'; menuButton.setAttribute('aria-expanded',String(open)); menuButton.setAttribute('aria-label',open?'Fermer le menu':'Ouvrir le menu'); navigation.classList.toggle('open',open); document.body.classList.toggle('menu-open',open); });
navigation.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&navigation.classList.contains('open')){closeMenu();menuButton.focus();}});
window.matchMedia('(min-width:721px)').addEventListener('change',event=>{if(event.matches)closeMenu();});
if('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});},{threshold:.08});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el)); document.documentElement.classList.add('motion-ready');
}
const form=document.querySelector('#registration-form');
const company=document.querySelector('.company-fields');
function updateProfile(){ const professional=form.elements.profil.value==='Professionnel';company.hidden=!professional;company.querySelectorAll('input').forEach(input=>input.disabled=!professional);form.elements.entreprise.required=professional; }
form.querySelectorAll('[name="profil"]').forEach(input=>input.addEventListener('change',updateProfile));
document.querySelector('#professional-cta').addEventListener('click',()=>{form.elements.profil.value='Professionnel';updateProfile();});
const dialog=document.querySelector('#request-dialog');
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
let draft={subject:'',body:''};
let emlUrl='';
form.addEventListener('submit',event=>{
  event.preventDefault(); if(!form.reportValidity())return;
  const data=new FormData(form);const field=name=>String(data.get(name)||'').trim();
  draft.subject='Voitures et Café — Demande de participation — '+field('prenom')+' '+field('nom');
  draft.body=[ 'Bonjour,','', 'Je souhaite participer à Voitures et Café au Château de Prunay, le dimanche 8 novembre 2026, de 09:00 à 12:00.','', 'COORDONNÉES','Prénom : '+field('prenom'),'Nom : '+field('nom'),'Téléphone : '+field('telephone'),'E-mail : '+field('email'),'', 'VÉHICULE','Marque et Modèle : '+field('vehicule'),'Numéro d’immatriculation : '+field('immatriculation'),'', 'PARTICIPATION','Profil : '+field('profil'),...(field('profil')==='Professionnel'?['Entreprise : '+field('entreprise'),'Site / Instagram : '+field('site')]:[]),'', 'CONSENTEMENTS','Utilisation des informations pour l’organisation : oui','Photos et vidéos du véhicule pendant l’événement : '+(data.has('imageConsent')?'oui':'non'),'', 'Merci de me confirmer ma participation après examen de ma demande.',field('prenom')+' '+field('nom')].join('\n');
  document.querySelector('#email-draft').href='mailto:champeroux@me.com?subject='+encodeURIComponent(draft.subject)+'&body='+encodeURIComponent(draft.body);
  document.querySelector('#download-note').textContent='';
  document.querySelector('#request-text').value=draft.body;
  document.querySelector('#download-request').hidden=true;
  dialog.showModal();
  prepareEml();
});
function base64Bytes(bytes){let binary='';for(let offset=0;offset<bytes.length;offset+=8192)binary+=String.fromCharCode(...bytes.subarray(offset,offset+8192));return btoa(binary);}
const wrapBase64=value=>value.match(/.{1,76}/g)?.join('\r\n')||'';
function prepareEml(){
  const link=document.querySelector('#download-request');
  try{
    const subject='=?UTF-8?B?'+base64Bytes(new TextEncoder().encode(draft.subject))+'?=';
    const eml=['To: champeroux@me.com','Subject: '+subject,'X-Unsent: 1','MIME-Version: 1.0','Content-Type: text/plain; charset=UTF-8','Content-Transfer-Encoding: base64','',wrapBase64(base64Bytes(new TextEncoder().encode(draft.body)))].join('\r\n')+'\r\n';
    if(emlUrl)URL.revokeObjectURL(emlUrl);
    emlUrl=URL.createObjectURL(new Blob([eml],{type:'message/rfc822'}));link.href=emlUrl;link.hidden=false;
  }catch{document.querySelector('#download-note').textContent='Le téléchargement n’a pas abouti. Vous pouvez ouvrir votre messagerie ou copier le texte ci-dessous.';}
}
