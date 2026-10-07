'use strict';
const SHEET_URL='https://script.google.com/macros/s/AKfycbx5Owt1l49wR-Xh7okBjlk_pTJwS8BZrpcRnFV394JGaFcI18g4Hf4OXZOBepHNS28vrw/exec';
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
form.addEventListener('submit',async event=>{
  event.preventDefault(); if(!form.reportValidity())return;
  const submitButton=form.querySelector('[type="submit"]');
  const errorNote=document.querySelector('#form-error');
  if(errorNote)errorNote.textContent='';
  submitButton.disabled=true;
  try{
    await fetch(SHEET_URL,{method:'POST',mode:'no-cors',body:new URLSearchParams(new FormData(form))});
    form.reset(); updateProfile();
    dialog.showModal();
  }catch{
    if(errorNote)errorNote.textContent='L’envoi n’a pas abouti. Vérifiez votre connexion et réessayez, ou écrivez-nous à champeroux@me.com.';
  }finally{
    submitButton.disabled=false;
  }
});
