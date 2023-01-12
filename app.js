const containers = document.querySelectorAll('.input-container');
const form = document.querySelector('form');

const tl = gsap.timeline({defaults: { duration: 1}});

//line

const start = 'M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512'
const end = 'M1 0.999512C1 0.999512 61.5 7.5 151 7.5C240.5 7.5 301 0.999512 301 0.999512'

//elastic effect

containers.forEach(container => {
 const input = container.querySelector('.input');
 const line = container.querySelector('.elastic-line');
 const placeholder = container.querySelector('.placeholder');

 input.addEventListener('focus', () => {
  if(!input.value){
   tl.fromTo(line,
    {attr: {d: start}},
    {attr: {d: end}, ease: 'Power2.easeOut', duration: 0.75});
    tl.to(line, {attr: {d: start},ease: 'elastic.out(3, 0.5)' }, '<50%');
    //placeholder shift
    tl.to(placeholder, {top: -15, left: 0, scale: 0.7, duration: 0.5, ease: 'Power2.easeOut'},'<15%')
  }
 })
});

//revert back if not focused

form.addEventListener('click', ()=> {
 containers.forEach(container => {
  const input = container.querySelector('.input');
  const line = container.querySelector('.elastic-line');
  const placeholder = container.querySelector('.placeholder');

  if (document.activeElement !== input){
   if(!input.value){
    gsap.to(placeholder, {
     top:0,
     left: 0,
     scale:1,
     duration: 0.5,
     ease: 'Power2.easeOut'})
   }
  }
  //validation
  //name validtion
  input.addEventListener('input', (e)=> {
   if(e.target.type === 'text'){
    let inputText = e.target.value;
    if(inputText.length >= 2){
     colorize('#086370', line, placeholder)
    }else{
     colorize('#983A5D', line, placeholder)
    }
   }
   //email validation
    if(e.target.type === 'email'){
    let valid = validateEmail(e.target.value);
    if(valid){
     colorize('#086370', line, placeholder)
    }else{
     colorize('#983A5D', line, placeholder)
    }
   }
   //validate phone
   if(e.target.type === 'tel'){
    let valid = validatePhone(e.target.value);
    if(valid){
     colorize('#086370', line, placeholder)
    }else{
     colorize('#983A5D', line, placeholder)
    }
   }
  });
 
 })
})

//checking email validation

function validateEmail(email){
 let re = /\S+@\S+\.\S+/;
 return re.test(email)
}
function validatePhone(phone){
 let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
 return re.test(phone)
}

//colorize function

function colorize(color, line, placeholder){
 gsap.to(line, {stroke: color, duration: 0.75});
 gsap.to(placeholder, {color: color, duration: 0.75});
}

// Checkbox animation fill

const checkbox = document.querySelector('.checkbox');
const tl2 = gsap.timeline({defaults: { duration: 0.5, ease: "Power2.easeOut"}});

const tickMarkPath = document.querySelector('.tick-mark path');
const pathLength = tickMarkPath.getTotalLength();

gsap.set(tickMarkPath, {
 strokeDashoffset: pathLength,
  strokeDasharray: pathLength,
 });

checkbox.addEventListener('click', () => {
 if(checkbox.checked){
  tl2.to('.checkbox-fill', {top: 0});
  tl2.fromTo(tickMarkPath,
   {strokeDashoffset: pathLength},
   {strokeDashoffset:0}, '<50%');
   tl2.to('.checkbox-label', {color: '#983A5D'}, "<");
 }else{
  tl2.to('.checkbox-fill', {top: '100%'})
  tl2.fromTo(tickMarkPath, {strokeDashoffset: 0}, { strokeDashoffset: pathLength}, '<50%');
  tl2.to('.checkbox-label', {color: '#C5C5C5'}, "<");
 }
});


//Animating Character
// gsap.set('#hair', {transformOrigin:'center'});
// gsap.fromTo('#hair', {rotation: 0, y:0},{rotation: -5,y:10, repeat:-1, repeatDelay: 1, ease: 'Power2.easeOut'})

gsap.fromTo('.small-star', {opacity:0, y:10},{opacity:1,y:0, repeat:-1,ease: 'Power2.easeOut', repeatDelay:3, yoyo:true, stagger: 0.25});
gsap.fromTo('.big-star', {opacity:0, scale:0, y:-15},{opacity:1,scale:1.2,y:0, repeat:-1,ease: 'Power2.easeOut', yoyo:true, repeatDelay:3, stagger: 0.55});

// gsap.set('#leg',{transformOrigin:'right'})
// gsap.fromTo('#leg', { rotation:0, y:0}, {rotation: -10, y:2, repeat:-1, duration:2,yoyo:true, delay: 1})


// gsap.set('#leg2',{transformOrigin:'left'})
// gsap.fromTo('#leg2', { rotation:0, y:0}, {rotation: 10, y:2, repeat:-1, duration:2,yoyo:true, delay: 1})


// gsap.set('#hand',{transformOrigin:'right'});
// gsap.fromTo('#hand', { rotation:0, y:0}, {rotation: -10, y:2, repeat:-1, duration:2,yoyo:true, delay: 1});

// gsap.set('#message',{transformOrigin:'left'})
// gsap.fromTo('#message', { rotation:0, y:0}, {rotation: -5, y:2, repeat:-1, duration:2,yoyo:true, delay: 1})



//submit button

const button = document.querySelector('button');
const tl3 = gsap.timeline({defaults: {duration: 0.75, ease: 'Power2.easeOut'}});

button.addEventListener('click', (e)=> {
 e.preventDefault();
 tl3.to('.contact-right, .contact-left', {
  y: 30,
  opacity:0,
  pointerEvents: 'none',
 });
 tl3.to('form', {scale: 0.8}, '<');
 tl3.fromTo('.submitted', {opacity:0, y: 30}, {opacity:1, y:0});
 //hand wave
 gsap.set('#hand',{transformOrigin:'right'});
 gsap.fromTo('#hand', { rotation:0, y:0}, {rotation: -10, y:2, repeat:-1, duration:2,yoyo:true, delay: 1});
 
 gsap.set('#message',{transformOrigin:'left'})
 gsap.fromTo('#message', { rotation:0, y:0}, {rotation: -5, y:2, repeat:-1, duration:2,yoyo:true, delay: 1})
 
 gsap.set('#leg',{transformOrigin:'right'})
gsap.fromTo('#leg', { rotation:0, y:0}, {rotation: -10, y:2, repeat:-1, duration:2,yoyo:true, delay: 1})


gsap.set('#leg2',{transformOrigin:'left'})
gsap.fromTo('#leg2', { rotation:0, y:0}, {rotation: 10, y:2, repeat:-1, duration:2,yoyo:true, delay: 1})

 gsap.fromTo('#character',{x:0, opacity:1},{x:-30, opacity:0,duration:3,delay: 1})
 
})
