let computerHand = null; // コンピューターの手を保存する変数
let inst=["勝って","あいこ","負けて"];
let hands=["グー","チョキ","パー"];
let userHand = null; // ユーザーの手を保存する変数
let winCount = 0; // 勝利回数を保存する変数
let totalGames = 0; // 総プレイ回数を保存する変数
let startTime = null; // ゲーム開始時の時間を保存する変数
let startCount = 0; // Startボタンを押した回数を管理する変数
let ranking = [];//ランキングを管理するための配列

const startButton = document.getElementById("btn_start");
const winRateElement = document.getElementById("winRate"); // 勝率を表示する要素
const playtimeElement = document.getElementById("playtime"); // プレイ時間を表示する要素
const restartButton = document.getElementById("reStart");
const audio = document.getElementById("btn_audio");

startButton.addEventListener("click", function() {
  // console.log("ボタンが押されました")
  totalGames = startCount;
    // ユーザーの選んだ手の画像を空にして？に戻す
    $('#g_btn_str_you').html('?');
    // 結果を空にして初期に戻す    
    $('#outcome').html('結果');
    //反省文を初期値に戻す
    $('#reflection').html('');
    startTime = new Date(); // ゲーム開始時の時間を記録
    console.log(startTime);
    // 音楽再生
    audio.play();
    const i = Math.floor(Math.random() * inst.length);
    const j = Math.floor(Math.random() * hands.length);
    const instElement = document.querySelector('.instructions');
    instElement.innerText = inst[i];
    instructions = inst[i]; //コンピュータの指示を保存
    const handsElement = document.querySelector('#computerHand');
    handsElement.innerText = hands[j];
    computerHand = hands[j]; // コンピューターの手を保存
    // console.log(instructions);
    // console.log(computerHand);
    //コンピュータが選んだグーチョキパーの画像を表示
	  $('#computerHand').html('<img src="img/janken_'+ j + '.png" />');
    // ボタンを有効化する
    rockButton.disabled = false;
    paperButton.disabled = false;
    scissorsButton.disabled = false;
    document.getElementById("instructions").style.display = "block";
    startButton.disabled = true; // Startボタンを無効化
    restartButton.disabled = false; // reStartボタンを有効化
});

const rockButton = document.getElementById("rock");
const paperButton = document.getElementById("paper");
const scissorsButton = document.getElementById("scissors");
const audio2 = document.getElementById("btn_audio2");

rockButton.addEventListener("click", function() {
  userHand = "rock";
  // console.log(userHand);
  audio2.play();
  	//ユーザーの選んだグーチョキパーの画像を表示
	$('#g_btn_str_you').html('<img src="img/janken_0.png" />');
  const result = judge();
    // 二度押しおよび他のボタンを押せなくする
    rockButton.disabled = true;
    paperButton.disabled = true;
    scissorsButton.disabled = true;
});

paperButton.addEventListener("click", function() {
  userHand = "paper";
  audio2.play();
  // console.log(userHand);
    	//ユーザーの選んだグーチョキパーの画像を表示
	$('#g_btn_str_you').html('<img src="img/janken_2.png" />');
  const result = judge();
    // ユーザーが選んだ手以外のボタンを無効化する
    rockButton.disabled = true;
    scissorsButton.disabled = true;
    paperButton.disabled = true;
});

scissorsButton.addEventListener("click", function() {
  userHand = "scissors";
  audio2.play();
  // console.log(userHand);
    	//ユーザーの選んだグーチョキパーの画像を表示
	$('#g_btn_str_you').html('<img src="img/janken_1.png" />');
  const result = judge();
    // ユーザーが選んだ手以外のボタンを無効化する
    paperButton.disabled = true;
    rockButton.disabled = true;
    scissorsButton.disabled = true;
});

function judge() {
    const resultElement = document.getElementById("outcome");
    const winCountElement = document.getElementById("win");
    const loseCountElement = document.getElementById("lose");
    const winRateElement = document.getElementById("winRate");
    const playtimeElement = document.getElementById("playtime");
    const audio3 = document.getElementById("btn_audio3");
    const audio4 = document.getElementById("btn_audio4");

  if ((instructions === "勝って" && computerHand === "グー" && userHand === "paper") ||
      (instructions === "勝って" && computerHand === "チョキ" && userHand === "rock") ||
      (instructions === "勝って" && computerHand === "パー" && userHand === "scissors") ||
      (instructions === "あいこ" && computerHand === "グー" && userHand === "rock") ||
      (instructions === "あいこ" && computerHand === "チョキ" && userHand === "scissors") ||
      (instructions === "あいこ" && computerHand === "パー" && userHand === "paper") ||
      (instructions === "負けて" && computerHand === "グー" && userHand === "scissors") ||
      (instructions === "負けて" && computerHand === "チョキ" && userHand === "paper") ||
      (instructions === "負けて" && computerHand === "パー" && userHand === "rock")) {

    // console.log("勝ちました");
    resultElement.innerText = "あなたの勝ち！";
    audio3.play();

    totalGames++;
    // console.log(winCount);
    winCountElement.innerText = parseInt(winCountElement.innerText) + 1;
    winCount++;
// 勝利回数が5回に達した場合、ゲーム終了とする
if (winCount === 5) {
  resultElement.innerText = "ゲーム終了！";
  startButton.disabled = true;
  const endTime = new Date();
    // 勝率の計算と表示を行う
    const winRate = (winCount / totalGames) * 100;
    winRateElement.innerText = `勝率: ${winRate.toFixed(2)}%`;

    const playtime = Math.floor((endTime - startTime) / 1000);
    playtimeElement.innerText = "プレイ時間: " + playtime + "秒";

    winRateElement.style.display = "block";
    playtimeElement.style.display = "block";
  // 音楽停止
    audio.pause();
    audio.currentTime = 0;
    saveRanking(playtime);//ランキングを追加するために時間をセーブする

  return resultElement.innerText;
} else {
  setTimeout(startNextGame, 500);//0.5秒後に次のゲームに移る
}
    return "win";
  } else {
    // console.log("負けました");
    resultElement.innerText = "あなたの負け…";
    audio4.play();
    loseCountElement.innerText = parseInt(loseCountElement.innerText) + 1;
    totalGames++;
    // 負けた場合の反省文を表示する
    const reflectionElement = document.getElementById("reflection");
    reflectionElement.innerText = "もっと頑張りましょう！";
    setTimeout(startNextGame, 1000);
    return "lose";
  }
}
function startNextGame() {
  const i = Math.floor(Math.random() * inst.length);
  const j = Math.floor(Math.random() * hands.length);
  const instElement = document.querySelector('.instructions');
  instElement.innerText = inst[i];
  instructions = inst[i]; // コンピュータの指示を保存
  const handsElement = document.querySelector('#computerHand');
  handsElement.innerText = hands[j];
  computerHand = hands[j]; // コンピューターの手を保存
  // コンピュータが選んだグーチョキパーの画像を表示
  $('#computerHand').html('<img src="img/janken_' + j + '.png" />');

  // ボタンを有効化する
  rockButton.disabled = false;
  paperButton.disabled = false;
  scissorsButton.disabled = false;

  // ユーザーの選んだ手の画像を空にして？に戻す
  $('#g_btn_str_you').html('?');
  // 結果を空にして初期に戻す
  $('#outcome').html('結果');
  // 反省文を初期値に戻す
  $('#reflection').html('');
}

// ゲームの結果をランキングに追加し、localStorageに保存する
function saveRanking(playtime) {
  const rankingEntry = {
    playtime: playtime,
    winCount: winCount,
    totalGames: totalGames,
  };
  ranking.push(rankingEntry);
  localStorage.setItem('ranking', JSON.stringify(ranking));
}

// localStorageからランキングを読み出す
function loadRanking() {
  const loadedRanking = localStorage.getItem('ranking');
  if (loadedRanking) {
    ranking = JSON.parse(loadedRanking);
  }
}

// ページが読み込まれたときにランキングを読み出す
window.onload = function() {
  loadRanking();
}

// localStorageからランキングを読み出し、HTMLに表示する
function loadRanking() {
  const loadedRanking = localStorage.getItem('ranking');
  if (loadedRanking) {
    ranking = JSON.parse(loadedRanking);
    updateRankingDisplay();  // ランキングの表示を更新
  }
}
// ランキングの表示を更新する
function updateRankingDisplay() {
  // プレイ時間の昇順にランキングをソート
  ranking.sort((a, b) => a.playtime - b.playtime);
  
  // HTML要素の準備
  const rankingElement = document.getElementById("ranking");
  rankingElement.innerHTML = '';  // 既存のランキング表示をクリア

  // ソートされたランキングをHTMLに反映
  ranking.forEach((entry, index) => {
    const li = document.createElement('li');
    li.innerText = `順位 ${index + 1}位: ${entry.playtime} 秒 (正解: ${entry.winCount}回, 総プレイ数: ${entry.totalGames}回)`;
    rankingElement.appendChild(li);
  });
}

