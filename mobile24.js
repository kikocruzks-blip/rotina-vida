'use strict';
// Incremental mobile presentation only. Existing editors, data and handlers remain authoritative.
const query24=window.matchMedia('(max-width:800px)');
function viewport24(){const v=window.visualViewport;document.documentElement.style.setProperty('--vv-height24',(v?.height||window.innerHeight)+'px');document.documentElement.style.setProperty('--vv-bottom24',Math.max(0,window.innerHeight-(v?.height||window.innerHeight)-(v?.offsetTop||0))+'px');}
window.visualViewport?.addEventListener('resize',viewport24);window.visualViewport?.addEventListener('scroll',viewport24);window.addEventListener('resize',viewport24);viewport24();
function mobile24(){if(!query24.matches)return;const main=document.getElementById('main');
if(page==='inicio'){
 const summary=main.querySelector('.routine-summary'),metrics=main.querySelector('.routine-metrics'),next=main.querySelector('.next-activity'),timeline=main.querySelector('.routine-timeline');
 if(metrics&&timeline){const details=document.createElement('details');details.className='routine-stats24';details.innerHTML='<summary>Consistência e evolução <span>Semana · mês · sequências</span></summary>';details.append(metrics);const journey=main.querySelector('.consistency-detail22');if(journey)details.append(journey);timeline.after(details);}
 if(next){const wrapper=document.createElement('div');wrapper.className='next-wrap24';next.before(wrapper);wrapper.append(next);summary.after(wrapper);const id=next.dataset.jumpTask,t=HabitEngine.scheduled(state,selectedDate).find(t=>t.id===id);if(t&&selectedDate<=localDate()){const button=document.createElement('button');button.className='next-done24';button.dataset.task=id;button.setAttribute('aria-label','Concluir próxima atividade: '+t.text);button.innerHTML=lineIcon('check');wrapper.append(button);}}
 const toolbar=main.querySelector('.timeline-toolbar');if(toolbar){const more=document.createElement('details');more.className='routine-options24';more.innerHTML='<summary aria-label="Opções da rotina">···</summary><div></div>';const destination=more.querySelector('div');for(const b of toolbar.querySelectorAll('.text-button'))destination.append(b);toolbar.querySelector('.flex').prepend(more);}
}
if(page==='goals'){
 const overview=main.querySelector('.goal-overview22'),gs=state.goals,done=gs.filter(g=>{const v=goalValue22(g);return v.available&&Product22.goalState(g,v.value,localDate())==='Concluída';}).length,paused=gs.filter(g=>g.status==='paused').length;
 if(overview){const label=document.createElement('small');label.className='goal-active24';label.textContent=(gs.length-done-paused)+' em progresso'+(paused?' · '+paused+' pausadas':'');overview.firstElementChild.append(label);const average=overview.querySelector('.goal-average22');if(average){const details=document.createElement('details');details.className='goal-mean24';const value=average.querySelector('small')?.textContent.split(' · ')[0]||'—';details.innerHTML='<summary>'+esc(value)+'<small>média ⌄</small></summary>';average.before(details);details.append(average);}} 
}
if(page==='fitness'){
 const strip=main.querySelector('.datebar'),head=main.querySelector('.v2-head'),health=main.querySelector('.health-summary');if(strip&&head){const details=document.createElement('details');details.className='health-date24';details.innerHTML='<summary>'+esc(new Intl.DateTimeFormat('pt-PT',{weekday:'short',day:'numeric',month:'short'}).format(dateAt(selectedDate)))+' <span>Alterar dia ⌄</span></summary>';details.append(strip);if(health)health.after(details);else head.after(details);}
 const graph=main.querySelector('.weight-chart');if(graph&&state.weights.length===1){graph.classList.add('single-weight24');const note=document.createElement('p');note.className='weight-start24';note.textContent='Primeiro registo guardado. Regista o peso noutro dia para veres a evolução.';graph.after(note);}
 for(const input of main.querySelectorAll('.set-grid input[type="checkbox"]')){const label=document.createElement('label');label.className='set-done24';input.before(label);label.append(input);}
}
if(page==='money'){
 const wealth=main.querySelector('.wealth');if(wealth){const split=document.createElement('div');split.className='cash-split24';for(const item of Array.from(main.querySelectorAll('.comparison22>div')).slice(0,2))split.append(item.cloneNode(true));if(split.children.length)wealth.append(split);const actions=document.createElement('div');actions.className='finance-actions24';actions.setAttribute('aria-label','Registo rápido');actions.innerHTML='<button class="secondary" data-mobile-action24="expense">− Despesa</button><button class="secondary" data-mobile-action24="income">+ Receita</button><button class="secondary" data-action22="transfer">↔ Transferir</button>';wealth.after(actions);}
 for(const row of main.querySelectorAll('.record-row')){if(row.querySelector('.positive'))row.classList.add('income24');if(row.querySelector('.negative'))row.classList.add('expense24');}
}
for(const input of document.querySelectorAll('input[type="number"]'))input.inputMode=input.step==='1'?'numeric':'decimal';
}
const renderBefore24=render;render=function(){const priorPage=document.body.dataset.page,scroll=window.scrollY,opened=Array.from(document.querySelectorAll('.routine-stats24[open],.health-date24[open]')).map(e=>e.className);renderBefore24();mobile24();if(query24.matches&&priorPage===page){for(const name of opened){const detail=document.querySelector('.'+name);if(detail)detail.open=true;}window.scrollTo({top:scroll,behavior:'instant'});}};
query24.addEventListener('change',()=>render());
document.addEventListener('click',event=>{const b=event.target.closest('[data-mobile-action24]');if(!b)return;editTransaction();document.getElementById('f-type').value=b.dataset.mobileAction24;document.getElementById('dialog-title').textContent=b.dataset.mobileAction24==='expense'?'Nova despesa':'Novo rendimento';});
const editorBefore24=editor;editor=function(...args){const result=editorBefore24(...args);if(query24.matches){for(const input of document.querySelectorAll('#fields input[type="number"]'))input.inputMode=input.step==='1'?'numeric':'decimal';document.getElementById('fields').scrollTop=0;}return result;};
render();

const settingsBefore24=settings2;settings2=function(){settingsBefore24();if(!query24.matches)return;const fields=document.getElementById('fields'),details=document.createElement('details');details.className='backup-list24';details.innerHTML='<summary>Cópias de segurança anteriores</summary><button type="button" class="text-button" data-backup24>Exportar cópia anterior à 2.4 ↗</button>';for(const b of Array.from(fields.querySelectorAll('button')).filter(b=>/cópia anterior/i.test(b.textContent)))details.append(b);fields.append(details);};
document.addEventListener('click',event=>{if(event.target.closest('[data-backup24]')){const raw=localStorage.getItem(KEY+':backup-before-2.4');if(raw)download(raw,'application/json','rotina-vida-antes-2.4.json');else toast('Não existe cópia anterior neste navegador.');}});

document.addEventListener('pointerdown',event=>{if(!query24.matches)return;for(const details of document.querySelectorAll('.routine-options24[open],.goal-mean24[open]'))if(!details.contains(event.target))details.open=false;});
document.addEventListener('click',event=>{const b=event.target.closest('.routine-options24 button');if(b)b.closest('details').open=false;});
