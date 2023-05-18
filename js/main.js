const container = document.querySelector(".container");
const text = document.getElementById("text");
const button = document.getElementById("button"); 
const remainingNumberSpan = document.querySelector("#remainingNumber span"); 

let totalTime = 7500; // 7.5s
let breatheTime = (totalTime / 5) * 2; // 3s
let holdTime = totalTime / 5; // 1.5s
let iterationCount = 0; // 反復カウンター
let updatedIterationCount = 3; // 初期反復回数を設定
let breatheTimer = null; // 呼吸アニメーションのタイマーIDを保存するための変数
let holdTimer = null; // "止めて"のタイマーIDを保存するための変数

// ボタン要素を取得
const startButton = document.getElementById('startButton');

// 'click' イベントリスナーを追加
startButton.addEventListener('click', function() {
    // ボタンを非表示にする
    this.style.display = 'none';
    // アニメーションを開始
    breatheAnimation();
});


// breatheAnimation(); //アニメーションスタート

function breatheAnimation() {
  console.log("start");
  text.innerHTML = "take a breath";
  remainingNumberSpan.innerHTML = `${updatedIterationCount - iterationCount}`;
  // 膨らませる
  container.classList.add("grow");
  container.classList.remove("shrink");

   // "止めて"のタイマーを設定
   holdTimer = setTimeout(() => {
    text.innerHTML = "hold";

    setTimeout(() => {
      text.innerHTML = "exhale";
  // 萎ませる
   container.className = "container shrink";


    }, holdTime); // 3s + 1.5s= 4.5sたったら始まる
  }, breatheTime); //3sたったら始まる

    // 要素の取得
    const janken_start = document.getElementById("jankenStartButton");
    // ボタンとメッセージを出現させる
    janken_start.style.display = "block";
    document.getElementById("startMessage").style.display = "block";


  iterationCount++; // 回数をカウントする

  if (iterationCount === updatedIterationCount) {
    setTimeout(() => {
      window.location.href = "janken_main.html";
    }, totalTime);
  } else {
    remainingNumberSpan.innerHTML = `${updatedIterationCount - iterationCount}`; // 残りの回数を更新
    breatheTimer = setTimeout(breatheAnimation, totalTime);
  }
}

