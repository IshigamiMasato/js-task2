const num_bth = document.querySelectorAll('.num_bth');
let output_sub = document.getElementById('output_sub');
const output_total = document.getElementById('output_total');
let total = 0;
let state = 'start';
let mode = 'integer_mode';

//1-9のボタンを押した時
const one_nine = document.querySelectorAll('.one_nine');
one_nine.forEach(function (index){
  index.addEventListener('click', function(){
    if(state === 'start'){
      total = index.dataset.indexId;
    }else if(state === 'finish'){
      reset();
      total = index.dataset.indexId;
    }else if(state === 'calculation'||state ==='calBtn'){
      total += index.dataset.indexId;
    }
    output_sub.innerHTML = total;
    state = 'calculation'
    changeOutput()
  });
});

//0の数字を押した時
const zero = document.getElementById('zero');
zero.addEventListener('click', function(){
 if(state === 'start'|| state === 'finish'||state === 'calBtn'){
   if(output_sub.innerHTML.slice(-1) === 0){
     return;
   }
 }
  if(state === 'start'){
    total = zero.dataset.indexId;
  }else{
    total += zero.dataset.indexId
  }
  output_sub.innerHTML = total;
  //state = 'calculation'
  changeOutput()
});

//.小数点ボタンを押した時
const point = document.getElementById('point');
point.addEventListener('click', function(){
  console.log(point.dataset.indexId);
  if(mode === 'decimal_mode'){
    return;
  }if(total === 0){
    total = point.dataset.indexId;
  }else{
    total += point.dataset.indexId;
  }
  output_sub.innerHTML = total;
  state = 'calculation';
  mode = 'decimal_mode';
  changeOutput()
});

//演算記号を押した時
const cal = document.querySelectorAll('.cal');
cal.forEach(function(index){
  index.addEventListener('click', function(){
    if(state === 'start'){
      return;
    }else if(state === 'calculation'){
      console.log(index.dataset.indexId);
      total += index.dataset.indexId;
    }else if(state === 'finish'){
      total = output_total.innerHTML;
      total += index.dataset.indexId;
      output_total.innerHTML = 0;
    }else if(state === 'calBtn'){
      total = total.slice(0, -1)
      total += index.dataset.indexId;
    }
    output_sub.innerHTML = total;
    state = 'calBtn'
    mode = 'integer_mode'
    changeOutput()
  });
});

//イコールを押した時
const equal_btn = document.getElementById('equal_btn');
  equal_btn.addEventListener('click', function() {
    console.log(eval(total));
    output_total.textContent = digitNum(eval(total));
    state = 'finish'
    mode = 'integer_mode'
    changeOutput()
  });
  
  const clear = document.getElementById('clear')
  clear.addEventListener('click', function(){
    reset();
  });
  
  //リセットを行う関数
  function reset (){
    total = 0;
    output_sub.innerHTML = 0;
    output_total.innerHTML = 0;
    mode = 'integer_mode'
    state ='start'
    changeOutput()
  };
  
  function changeOutput(){
    if(state === 'finish'){
      output_total.classList.add('active');
      output_sub.classList.remove('active');
    }else{
      output_sub.classList.add('active');
      output_total.classList.remove('active');
    }
  };
  
  function digitNum(num) {
    return Math.round(num*100000000)/100000000;
  }
