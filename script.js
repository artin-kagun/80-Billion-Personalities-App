/**
 * 80 Billion Personalities
 * Logic Script
 */

// --- Constants & Data ---

const QUESTIONS = [
    { text: "朝起きて最初に思うことは？", options: ["今日も世界を変えよう", "二度寝したい"] },
    { text: "無人島に持っていくなら？", options: ["実用的なナイフ", "哲学書"] },
    { text: "あなたはトマトですか？", options: ["はい", "いいえ、私は概念です"] },
    { text: "宇宙の終わりについて考えたことがある？", options: ["毎日考えている", "今日の夕飯の方が大事"] },
    { text: "道に迷ったらどうする？", options: ["地図アプリを見る", "風の向くままに進む"] },
    { text: "猫派？犬派？", options: ["猫", "犬"] },
    { text: "タイムマシンがあったら？", options: ["未来で宝くじの番号を見る", "過去で黒歴史を消す"] },
    { text: "あなたの人生のテーマソングは？", options: ["壮大なオーケストラ", "ノイズミュージック"] },
    { text: "冷蔵庫のプリンが勝手に食べられていたら？", options: ["犯人を論理的に追い詰める", "新しいプリンを作る"] },
    { text: "エイリアンに遭遇したら？", options: ["友好条約を結ぶ", "とりあえず逃げる"] },
    { text: "魔法が一つ使えるなら？", options: ["空を飛ぶ", "透明になる"] },
    { text: "休日の過ごし方は？", options: ["予定を詰め込む", "ベッドと一体化する"] },
    { text: "ゾンビパニックが起きたら？", options: ["ショッピングモールに立てこもる", "ゾンビのふりをして生き延びる"] },
    { text: "自分を色に例えるなら？", options: ["情熱的な赤", "冷静な青"] },
    { text: "カレーの味は？", options: ["激辛", "甘口"] },
    { text: "生まれ変わるなら？", options: ["大富豪の飼い猫", "深海の謎の生物"] },
    { text: "約束の時間に遅れそう！", options: ["正直に連絡する", "瞬間移動を試みる"] },
    { text: "幽霊はいると思う？", options: ["科学的にありえない", "後ろにいる気がする"] },
    { text: "宝くじで10億円当たったら？", options: ["投資して増やす", "豪遊して使い切る"] },
    { text: "好きな季節は？", options: ["活動的な夏", "思索的な冬"] },
    { text: "SNSで炎上したら？", options: ["誠心誠意謝罪する", "スマホを海に投げる"] },
    { text: "最後の晩餐は？", options: ["高級フレンチ", "お母さんの卵焼き"] },
    { text: "映画を見るなら？", options: ["感動のヒューマンドラマ", "爆発するアクション"] },
    { text: "自分の性格を一言で言うと？", options: ["カオス", "秩序"] },
    { text: "明日地球が滅亡するとしたら？", options: ["愛する人に会いに行く", "借金を踏み倒す"] },
    { text: "きのこの山？たけのこの里？", options: ["きのこ", "たけのこ"] },
    { text: "AIについてどう思う？", options: ["人類の良きパートナー", "いつか反乱を起こす"] },
    { text: "旅行に行くなら？", options: ["綿密な計画を立てる", "行き当たりばったり"] },
    { text: "部屋の片付けは？", options: ["毎日少しずつ", "年末にまとめて"] },
    { text: "初対面の人と話すのは？", options: ["得意", "苦痛"] },
    { text: "サプライズパーティーは？", options: ["嬉しい", "反応に困る"] },
    { text: "雨の日は？", options: ["憂鬱", "落ち着く"] },
    { text: "行列のできる店に並ぶ？", options: ["並ぶ価値がある", "並ぶ時間が無駄"] },
    { text: "自分の直感を信じる？", options: ["絶対的に信じる", "データの方を信じる"] },
    { text: "夜更かしは好き？", options: ["大好き", "健康第一"] },
    { text: "芸術とは？", options: ["爆発だ", "調和だ"] },
    { text: "ルールは？", options: ["守るためにある", "破るためにある"] },
    { text: "成功とは？", options: ["金と名誉", "心の平穏"] },
    { text: "愛とは？", options: ["与えるもの", "奪うもの"] },
    { text: "この診断を信じる？", options: ["運命を感じる", "ただのプログラムだ"] }
];

// --- State ---
let currentQuestionIndex = 0;
let userAnswers = []; // Array of 0 or 1

// --- DOM Elements ---
const screens = {
    start: document.getElementById('start-screen'),
    question: document.getElementById('question-screen'),
    loading: document.getElementById('loading-screen'),
    result: document.getElementById('result-screen')
};

const ui = {
    startBtn: document.getElementById('start-btn'),
    questionText: document.getElementById('question-text'),
    optionBtns: document.querySelectorAll('.option-btn'),
    progress: document.getElementById('progress-bar'),
    qCurrent: document.getElementById('q-current'),
    qTotal: document.getElementById('q-total'),
    loadingDetail: document.getElementById('loading-detail'),
    resultId: document.getElementById('result-id'),
    resultTitle: document.getElementById('result-title'),
    resultDesc: document.getElementById('result-description'),
    avatarCanvas: document.getElementById('avatar-canvas'),
    bgCanvas: document.getElementById('bg-canvas'),
    shareBtn: document.getElementById('share-btn'),
    retryBtn: document.getElementById('retry-btn')
};

// --- Initialization ---
function init() {
    setupEventListeners();
    initBackgroundAnimation();
}

function setupEventListeners() {
    ui.startBtn.addEventListener('click', startGame);

    ui.optionBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const val = parseInt(e.target.dataset.value);
            handleAnswer(val);
        });
    });

    ui.retryBtn.addEventListener('click', resetGame);
    ui.shareBtn.addEventListener('click', shareResult);
}

// --- Game Flow ---

function startGame() {
    switchScreen('question');
    currentQuestionIndex = 0;
    userAnswers = [];
    updateQuestionUI();
}

function handleAnswer(value) {
    userAnswers.push(value);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
        currentQuestionIndex++;
        updateQuestionUI();
    } else {
        finishGame();
    }
}

function updateQuestionUI() {
    const q = QUESTIONS[currentQuestionIndex];

    // Animate text change
    ui.questionText.style.opacity = 0;
    setTimeout(() => {
        ui.questionText.textContent = q.text;
        ui.optionBtns[0].textContent = q.options[0];
        ui.optionBtns[1].textContent = q.options[1];
        ui.questionText.style.opacity = 1;
    }, 200);

    // Update progress
    ui.qCurrent.textContent = currentQuestionIndex + 1;
    const progressPercent = ((currentQuestionIndex) / QUESTIONS.length) * 100;
    ui.progress.style.width = `${progressPercent}%`;
}

function finishGame() {
    switchScreen('loading');

    // Fake loading sequence
    const messages = [
        "DNAシーケンスを解析しています...",
        "80億人のデータベースと照合中...",
        "量子もつれを観測中...",
        "あなたの魂の形を計算しています...",
        "ユニークIDを生成中..."
    ];

    let step = 0;
    const interval = setInterval(() => {
        if (step < messages.length) {
            ui.loadingDetail.textContent = messages[step];
            step++;
        } else {
            clearInterval(interval);
            generateAndShowResult();
        }
    }, 800);
}

function generateAndShowResult() {
    // Core Logic here (BigInt conversion, Name Generation, Avatar Drawing)
    const dna = calculateDNA(userAnswers);
    const result = generateResultFromDNA(dna);

    renderResult(result);
    switchScreen('result');
}

function resetGame() {
    switchScreen('start');
    // Clear canvas
    const ctx = ui.avatarCanvas.getContext('2d');
    ctx.clearRect(0, 0, 300, 300);
}

// --- Helper Functions ---

function switchScreen(screenName) {
    Object.values(screens).forEach(s => {
        s.classList.add('hidden');
        s.classList.remove('active');
    });
    screens[screenName].classList.remove('hidden');
    setTimeout(() => {
        screens[screenName].classList.add('active');
    }, 50);
}

// --- Word Lists for Name Generation ---
const WORDS = {
    adjectives1: ["銀河の", "量子的", "虚無の", "真夜中の", "爆走する", "伝説の", "哀愁の", "無限の", "透明な", "逆説的", "聖なる", "邪悪な", "冷凍", "灼熱の", "微炭酸の", "高解像度の"], // 4 bits (16)
    adjectives2: ["憂鬱な", "陽気な", "哲学的な", "好戦的な", "眠そうな", "腹ペコの", "光る", "踊る", "歌う", "叫ぶ", "沈黙する", "浮遊する", "回転する", "爆発する", "溶ける", "凍る"], // 4 bits (16)
    nouns: ["トースター", "公務員", "スライム", "電気羊", "ブラックホール", "サボテン", "AI", "哲学者", "勇者", "魔王", "ニート", "猫", "トマト", "宇宙船", "ラーメン", "概念"], // 4 bits (16)
    verbs: ["夢見る", "破壊する", "愛でる", "創造する", "分析する", "無視する", "崇拝する", "恐れる", "食べる", "投げる", "隠す", "探す", "売る", "買う", "盗む", "守る"], // 4 bits (16)
    objects: ["既成概念を", "確定申告を", "宇宙の真理を", "昨日の夕飯を", "自分自身を", "隣人を", "世界平和を", "ビットコインを", "黒歴史を", "未来を", "希望を", "絶望を", "愛を", "嘘を", "真実を", "虚構を"], // 4 bits (16)
    situations: ["雨の中で", "微笑みながら", "永遠に", "光の速さで", "誰にも知られずに", "大音量で", "全裸で", "真顔で", "泣きながら", "爆笑しながら", "夢の中で", "ネットの海で", "成層圏で", "深海で", "異世界で", "来世で"] // 4 bits (16)
};

// --- Core Logic ---

function calculateDNA(answers) {
    // Convert array of 0/1 to BigInt
    // answers[0] is MSB, answers[39] is LSB
    let dnaStr = answers.join('');
    return BigInt('0b' + dnaStr);
}

function generateResultFromDNA(dna) {
    // 1. Generate ID String
    const id = dna.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // 2. Generate Title (Name)
    // To ensure any answer change affects the title, we use a simple hash/mixing of the DNA.
    // We need 6 indices, each 0-15 (4 bits). Total 24 bits needed.
    // We'll generate a pseudo-random sequence seeded by the DNA.

    let seed = dna;

    // Mix bits thoroughly so that changes in upper bits (earlier questions) affect the lower bits.
    // Using a SplitMix64-like mixing step.
    seed ^= seed >> 30n;
    seed *= 0xbf58476d1ce4e5b9n;
    seed ^= seed >> 27n;
    seed *= 0x94d049bb133111ebn;
    seed ^= seed >> 31n;

    const random = () => {
        seed = (seed * 6364136223846793005n + 1442695040888963407n) & 0xFFFFFFFFFFFFFFFFn;
        return Number(seed % 16n);
    };

    const idxAdj1 = random();
    const idxAdj2 = random();
    const idxNoun = random();
    const idxVerb = random();
    const idxObj = random();
    const idxSit = random();

    const title = `${WORDS.adjectives1[idxAdj1]} ${WORDS.adjectives2[idxAdj2]} ${WORDS.nouns[idxNoun]} は ${WORDS.verbs[idxVerb]} ${WORDS.objects[idxObj]} ${WORDS.situations[idxSit]}`;

    // 3. Generate Description (The "You are you" Ending)
    // Instead of categorizing, we deliver the truth.

    const description = `
        <p>80億人（正確には1兆通り以上）のデータを照合しました。</p>
        <p>その結果、判明したあなたのタイプは...</p>
        <br>
        <p class="highlight-text"><strong>「分類不能」</strong></p>
        <br>
        <p>あなたは、たった40問の質問で定義できるほど単純な存在ではありません。</p>
        <p>あなたは、あなたです。</p>
        <p>このID（No. ${id}）は、世界で唯一のあなただけのものです。<br>
        誰とも違う、かけがえのない存在として、胸を張って生きてください。</p>
    `;

    // 4. Generate Color Palette
    // Use the random generator again for colors
    const r = Math.floor(random() * 16); // 0-15 -> scale to 0-255
    const g = Math.floor(random() * 16);
    const b = Math.floor(random() * 16);
    // Make it vibrant
    const color = `rgb(${r * 16}, ${g * 16}, ${b * 16})`;

    return {
        id: id,
        title: title,
        desc: description,
        color: color,
        dna: dna // Pass BigInt for canvas drawing
    };
}

function renderResult(result) {
    ui.resultId.textContent = `No. ${result.id}`;
    ui.resultTitle.textContent = result.title;
    ui.resultDesc.innerHTML = result.desc;

    // Draw Avatar
    drawAvatar(result.dna, ui.avatarCanvas);
}

function drawAvatar(dna, canvas) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    // Reset
    ctx.clearRect(0, 0, w, h);

    // Pseudo-random number generator based on DNA
    // We need a deterministic random function seeded by the BigInt
    let seed = dna;
    const random = () => {
        // Linear Congruential Generator
        seed = (seed * 6364136223846793005n + 1442695040888963407n) & 0xFFFFFFFFFFFFFFFFn;
        return Number(seed % 10000n) / 10000;
    };

    // Background
    const hue = Math.floor(random() * 360);
    const sat = 50 + Math.floor(random() * 30);
    const lig = 20 + Math.floor(random() * 20);
    ctx.fillStyle = `hsl(${hue}, ${sat}%, ${lig}%)`;
    ctx.fillRect(0, 0, w, h);

    // Shapes
    const numShapes = 5 + Math.floor(random() * 10);

    for (let i = 0; i < numShapes; i++) {
        ctx.save();
        ctx.translate(w / 2, h / 2);

        const shapeType = Math.floor(random() * 3); // 0: Circle, 1: Rect, 2: Triangle
        const x = (random() - 0.5) * w * 0.8;
        const y = (random() - 0.5) * h * 0.8;
        const size = 20 + random() * 100;
        const rot = random() * Math.PI * 2;
        const shapeHue = (hue + random() * 180) % 360;

        ctx.translate(x, y);
        ctx.rotate(rot);

        ctx.fillStyle = `hsla(${shapeHue}, 70%, 60%, 0.7)`;
        ctx.strokeStyle = `hsla(${shapeHue}, 70%, 80%, 0.9)`;
        ctx.lineWidth = 2;

        ctx.beginPath();
        if (shapeType === 0) {
            ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
        } else if (shapeType === 1) {
            ctx.rect(-size / 2, -size / 2, size, size);
        } else {
            ctx.moveTo(0, -size / 2);
            ctx.lineTo(size / 2, size / 2);
            ctx.lineTo(-size / 2, size / 2);
            ctx.closePath();
        }

        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }

    // Overlay pattern
    ctx.globalCompositeOperation = 'overlay';
    for (let i = 0; i < 20; i++) {
        ctx.beginPath();
        ctx.moveTo(random() * w, random() * h);
        ctx.lineTo(random() * w, random() * h);
        ctx.strokeStyle = `rgba(255, 255, 255, ${random() * 0.2})`;
        ctx.stroke();
    }
    ctx.globalCompositeOperation = 'source-over';
}

function initBackgroundAnimation() {
    const canvas = ui.bgCanvas;
    const ctx = canvas.getContext('2d');

    let w, h;
    const particles = [];

    const resize = () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 3;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0) this.x = w;
            if (this.x > w) this.x = 0;
            if (this.y < 0) this.y = h;
            if (this.y > h) this.y = 0;
        }

        draw() {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }

    const animate = () => {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        // Connect particles
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    };

    animate();
}

function shareResult() {
    const text = `私は1兆通り中、No.${ui.resultId.textContent.replace('No. ', '')}の「${ui.resultTitle.textContent}」でした。\n\n#80億パーソナリティ診断 #80BillionPersonalities`;
    const url = "https://artin-kagun.github.io/80-Billion-Personalities-App";
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
}

// Start
init();
