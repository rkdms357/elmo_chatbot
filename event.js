let count = 0;
let follow = 0;
let comedy = 0;

let key = 0;
let question = "";
let answer = "";

let json = [{
    "question" : "이름",
    "answer" : "Elmo."
},
{
    "question" : "나이",
    "answer" : "3 years old."
}]

var app = document.getElementById("typed");
var typewriter = new Typewriter(app, {
    loop: false,
});

typewriter
.start()
.typeString("☝️엘모에게 인사하거나 채팅창에 '불 꺼줘',<br>'불 켜줘', '따라해',<br>'심심해'라고 입력해<br>보세요.")
.pauseFor(1300)

function checkText() {
    let value = document.getElementById("talk").value;
    let talkbox = document.getElementById("talkbox");

    for (let i = 0; i < json.length; i++) {
		if(value == json[i].question) {
			talkbox.innerHTML = value+" "+json[i].answer;
			return;
		}
	}

    if (value=="") {
        count++;
        talkbox.innerHTML = "말을 해.";
        checkError();
    }

    else if (value.includes("반가워")||value.includes("안녕")||value.includes("hi")||value.includes("하이")) {
        talkbox.innerHTML = "방가방가^^";
    }

    else if (value=="불 꺼줘") {
        count++;
        setTimeout(function(){
            talkbox.innerHTML = "불 껐어.";
            document.body.style.backgroundColor = "black";
        }, 500);
        checkError();
    }

    else if (value=="불 켜줘") {
        count++;
        setTimeout(function(){
            talkbox.innerHTML = "불 켰어.";
            document.body.style.backgroundColor = "white";
        }, 500);
        checkError();
    }

    else if (value.includes("심심해")) {
        count++;
        talkbox.innerHTML = "'엘모개그'라고<br>입력해 봐.";
        checkError();
    }

    else if (follow==1) {
        talkbox.innerHTML = value;
        follow--;
    }

    else if (value.includes("따라해")) {
        follow++;
        talkbox.innerHTML = "오케이.";
    }

    else if (value.includes("엘모개그")) {
        comedy++;
        talkbox.innerHTML = "⭐1, 2, 3⭐<br>중에 골라 봐.<br>";
    }

    else if (comedy==1) {
        if (isNaN(value)==false) {
            if (value==1) {
                talkbox.innerHTML = "어떤 기자가 가수 신화 멤버 앤디한테 왜 결혼 안하냐고 물었는데 앤디 왈 👉'저 아직 앤디요?'👈";
            }
            else if (value==2) {
                talkbox.innerHTML = "중딩 때 수업시간에 졸아서 선생님이 '너 이름 뭐야'해서 말했더니 죄송한 거 아는데 너 이름 뭐냐고 함.<br>👉그녀의 이름은 최성회👈";
            }
            else if (value==3) {
                talkbox.innerHTML = "'개기'라는 아이가 친구 '재수' 집에 놀러 가서 재수를 불렀다. 재수 어머니 왈<br>👉'개기니? 재수 없다.'👈";
            }
            else {
                talkbox.innerHTML = "이건 보기에 없는 숫자야.";
            }
            comedy--;
        }

        else {
            talkbox.innerHTML = "이건 숫자가 아니야.";
            comedy--;
        }
    }

    else if (key==1) {
        if (value=="응") {
            talkbox.innerHTML = "대답을 입력해.";
            key = 2;
        }
        else {
            talkbox.innerHTML = "Zzz"
            key = 0;
        }
        return
    }

    else if (key==2) {
        answer = value;
        pushJson();
    }

    else {
        count++;
        talkbox.innerHTML = "무슨 말인지 모르겠어..<br>가르쳐 줄래?<br>(응 또는 아니)"
        key = 1;
        question = value;
        checkError();
    }
}

function checkError() {
    if (count > 1) {
        alert("잘못된 접근입니다.");
        count = 0;
    }
}

function pushJson(){
	json.push({question: `${question}`, answer: `${answer}`});
	talkbox.innerHTML = "말을 배웠다!";
	key = 0;
}