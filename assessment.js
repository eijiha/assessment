(function () {
    'use strict';
    const userNameInput = document.getElementById('user-name');
    const assessmentButton = document.getElementById('assessment');
    const resultDivided = document.getElementById('result-area');
    const tweetDivided = document.getElementById('tweet-area');

    /**
     * 指定した要素の子供をすべて削除する
     * @param {HTMLElement} element HTMLの要素
     */
    function removeAllChildren(element){
        while(element.firstChild){
            element.removeChild(element.firstChild);
        }
    }

    //テキストフィールド上でエンターキーが押された場合も診断結果を表示する
    userNameInput.onkeydown = (event) => {
        if (event.key === 'Enter'){
            assessmentButton.onclick();
        }
    };

    //アロー関数で記載
    assessmentButton.onclick = () => {
        const userName = userNameInput.value;
        if (userName.length === 0){
            return;    
        }
        //診断結果表示エリアの作成
        removeAllChildren(resultDivided);
        removeAllChildren(tweetDivided);

        const header = document.createElement('h3');
        header.innerText = '診断結果';
        resultDivided.appendChild(header);

        const paragraph = document.createElement('p');
        const result = assessment(userName);
        paragraph.innerText = result;
        resultDivided.appendChild(paragraph);

        //TODOツイートエリアの作成
        removeAllChildren(tweetDivided);
        const anchor = document.createElement('a');
        const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
            + encodeURIComponent('あなたのいいところ')
            + '&ref_src=twsrc%5Etfw';
        anchor.setAttribute('href',hrefValue);
        anchor.className = 'twitter-hashtag-button';
        anchor.setAttribute('data-text', result);
        anchor.innerText = 'Tweet #あなたのいいところ';
        tweetDivided.appendChild(anchor);
        
        twttr.widgets.load();
    };
    const answers = [
        '{username}のいいところは声です。{username}の特徴的な声は皆を惹きつけ、心に残ります。',
        '{username}のいいところはまなざしです。{username}に見つめられた人は、気になって仕方がないでしょう。',
        '{username}のいいところは情熱です。{username}の情熱に周りの人は感化されます。',
        '{username}のいいところは厳しさです。{username}の厳しさがものごとをいつも成功に導きます。',
        '{username}のいいところは知識です。{username}を多くの人が頼りにしています。',
        '{username}のいいところはユニークさです。{username}だけのその特徴が皆を楽しくさせます。',
        '{username}のいいところは用心さです。{username}の洞察に、多くの人が助けられます。',
        '{username}のいいところは見た目です。内側から溢れる{username}の良さに皆が気を惹かれます。',
        '{username}のいいところは決断力です。{username}がする決断にいつも助けられる人がいます。',
        '{username}のいいところは思いやりです。{username}に気を掛けてもらった多くの人が感謝しています。',
        '{username}のいいところは感受性です。{username}が感じたことに皆が共感し、分かり合うことができます。',
        '{username}のいいところは節度です。強引すぎない{username}の考えに皆が感謝しています。',
        '{username}のいいところは好奇心です。新しいことに向かっていく{username}の心構えが多くの人に魅力的に映ります。',
        '{username}のいいところは気配りです。{username}の配慮が多くの人を救っています。',
        '{username}のいいところはその全てです。ありのままの{username}自身がいいところなのです。',
        '{username}のいいところは自制心です。やばいとおもったときにしっかりと衝動を抑えられる{username}がみんなから評価されています。'
        '{userName}のいいところは厳しさです。あなたの的確な指摘は厳しいながらを思いやりを感じることができます。'
    ];

    /**
     * 名前の文字列を渡すと診断結果を返す関数
     * @param {string} username ユーザーの名前
     * @return {string} 診断結果
     */
    function assessment(username){
        //全文字のコード番号を取得してたし合わせる
        //※letは{}で囲まれた中での利用に限る
        let sumOfcharCode = 0;
        for(let i=0 ; i < username.length; i++){
            sumOfcharCode = sumOfcharCode + username.charCodeAt(i);
        }

        //文字のコード番号の合計を回答の数で割って添え字の数値を求める
        const index = sumOfcharCode % answers.length;
        let result = answers[index];
        result = result.replace(/\{username}/g,username);
    
        return result;
    }

    console.assert(
        assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
        '診断結果の文言に特定の部分を名前に置き換える処理が正しくありません。'
    );
    console.assert(
        assessment('次郎') === assessment('次郎'),
        '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
    );
})();
