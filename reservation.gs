// チャネルアクセストークン
const ACCESS_TOKEN = "ACCESS_TOKEN";
const HEADERS = {
  "Content-Type": "application/json; charset=UTF-8",
  "Authorization": "Bearer " + ACCESS_TOKEN
};

// Googleスプレッドシート
const SS_ID = "SS_ID";
const SS = SpreadsheetApp.openById(SS_ID);
const sheet = SS.getSheetByName('シート1');

// POSTメソッド
function doPost(e) {
  const data = e.postData.getDataAsString();
  const req = JSON.parse(data);
  const res = handleWebhook(req);

  return ContentService.createTextOutput(JSON.stringify(res));
}

/* 
お知らせ先のメールアドレス
本応募のご本人の氏名（メールの宛先）
参加するお子様の氏名（漢字・ふりがな）と学年
参加する保護者様の氏名（漢字・ふりがな）
落選時の場合、次回の案内を要望しますか
【ご確認】本イベントは抽選で、当選者が参加となります
【ご確認】全日程が参加可能であることを確認しました
【ご確認】個人情報の取り扱いについて
*/

  if(queryText == "イベントへ申し込む")
  {
    const text = "申し込みありがとうございます。\n保護者様の氏名\n（漢字）を入力してください。";
    const res = {
      "fulfillmentMessages": [
        {
          "text": {
            "text": [
              text
            ]
          }
        }
      ]
    };

    // next_Input = '保護者様の氏名（漢字）';
    sheet.getRange(2, 1).setValue(2, 1).setValue('保護者様の氏名（漢字）');

    return res;
  } // 追加
  else if(next_Input == '保護者様の氏名（漢字）') // 追加
  {
    const Guardians_name = any;
    const text = Guardians_name + "さん\n入力ありがとうございます。\n保護者様の氏名\n（ふりがな）を入力してください。";
    const res = {
      "fulfillmentMessages": [
        {
          "text": {
            "text": [
              text
            ]
          }
        }
      ]
    };

    // next_Input = '保護者様の氏名（ふりがな）; 
    // sheet.getRange(2, 1).setValue('保護者様の氏名（ふりがな）');
    // sheet.getRange(4, 1).setValue(Guardians_name);

    return res;
  } // 追加
  else if(next_Input == '保護者様の氏名（ふりがな）') // 追加
  {
    const Guardians_furigana = any;
    const text = Guardians_furigana + "さん\n入力ありがとうございます。\nお住まいの市区町村\nを入力してください。";
    const res = {
      "fulfillmentMessages": [
        {
          "text": {
            "text": [
              text
            ]
          }
        }
      ]
    };

    // next_Input = 'お住まいの市区町村'; 
    sheet.getRange(2, 1).setValue('お住まいの市区町村');
    sheet.getRange(4, 2).setValue(Guardians_furigana);

    return res;
  } // 追加
  else // 追加 */
//  { // 追加

function handleWebhook(req) {

queryText = req.queryResult.queryText;

if(queryText == "イベントへ申し込む" || queryText == "続けて2人以降も申し込む。")
{
  sheet.getRange(2, 1).setValue('お子様の氏名（漢字）を入力しますか。');
}
else if(queryText == "子供の氏名（漢字）を入力します。")
{
  sheet.getRange(3, 1).setValue('お子様の氏名（漢字）を入力します。');
  sheet.getRange(2, 1).setValue('');
}
else if(queryText == "子供の氏名（ふりがな）を入力します。")
{
  sheet.getRange(3, 2).setValue('お子様の氏名（ふりがな）を入力します。');
  sheet.getRange(2, 2).setValue('');
    
  const text = 'ここまでの入力内容です。\nお子様の氏名（漢字）\n' + sheet.getRange(6, 1).getValue();
  const res = {
    "fulfillmentMessages": [
      {
        "text": {
          "text": [
            text
          ]
        }
      }
    ]
  };
  return res;
}
else if(queryText == "子供の学年（小学、中学）を入力します。")
{
  sheet.getRange(3, 3).setValue('お子様の学年（小学、中学）を入力します。');
  sheet.getRange(2, 3).setValue('');
    
  const text = 'ここまでの入力内容です。\nお子様の氏名（漢字）\n' + sheet.getRange(6, 1).getValue() + '\nお子様の氏名（ふりがな）\n' + sheet.getRange(6, 2).getValue();
  const res = {
    "fulfillmentMessages": [
      {
        "text": {
          "text": [
            text
          ]
        }
      }
    ]
  };
  return res;
}
else if(queryText == "保護者の氏名（漢字）を入力します。")
{
  sheet.getRange(3, 4).setValue('保護者の氏名（漢字）を入力します。');
  sheet.getRange(2, 4).setValue('');
    
  const text = 'ここまでの入力内容です。\nお子様の氏名（漢字）\n' + sheet.getRange(6, 1).getValue() + '\nお子様の氏名（ふりがな）\n' + sheet.getRange(6, 2).getValue() + '\nお子様の学年（小学、中学）\n' + sheet.getRange(6, 3).getValue();
  const res = {
    "fulfillmentMessages": [
      {
        "text": {
          "text": [
            text
          ]
        }
      }
    ]
  };
  return res;
}
else if(queryText == "保護者の氏名（ふりがな）を入力します。")
{
  sheet.getRange(3, 5).setValue('保護者の氏名（ふりがな）を入力します。');
  sheet.getRange(2, 5).setValue('');

  const text = 'ここまでの入力内容です。\nお子様の氏名（漢字）\n' + sheet.getRange(6, 1).getValue() + '\nお子様の氏名（ふりがな）\n' + sheet.getRange(6, 2).getValue() + '\nお子様の学年（小学、中学）\n' + sheet.getRange(6, 3).getValue() + '\n保護者様の氏名（漢字）\n' + sheet.getRange(6, 4).getValue();
  const res = {
    "fulfillmentMessages": [
      {
        "text": {
          "text": [
            text
          ]
        }
      }
    ]
  };
  return res;
}
else if(queryText == "住んでいる市区町村を入力します。")
{
  sheet.getRange(3, 6).setValue('住んでいる市区町村を入力します。');
  sheet.getRange(2, 6).setValue('');

  const text = 'ここまでの入力内容です。\nお子様の氏名（漢字）\n' + sheet.getRange(6, 1).getValue() + '\nお子様の氏名（ふりがな）\n' + sheet.getRange(6, 2).getValue() + '\nお子様の学年（小学、中学）\n' + sheet.getRange(6, 3).getValue() + '\n保護者様の氏名（漢字）\n' + sheet.getRange(6, 4).getValue() + '\n保護者様の氏名（ふりがな）\n' + sheet.getRange(6, 5).getValue();
  const res = {
    "fulfillmentMessages": [
      {
        "text": {
          "text": [
            text
          ]
        }
      }
    ]
  };
  return res;
}
else if(queryText == "連絡可能な携帯かメールを入力します。")
{
  sheet.getRange(3, 7).setValue('連絡可能な携帯かメールを入力します。');
  sheet.getRange(2, 7).setValue('');

  const text = 'ここまでの入力内容です。\nお子様の氏名（漢字）\n' + sheet.getRange(6, 1).getValue() + '\nお子様の氏名（ふりがな）\n' + sheet.getRange(6, 2).getValue() + '\nお子様の学年（小学、中学）\n' + sheet.getRange(6, 3).getValue() + '\n保護者様の氏名（漢字）\n' + sheet.getRange(6, 4).getValue() + '\n保護者様の氏名（ふりがな）\n' + sheet.getRange(6, 5).getValue()  + '\nお住まいの市区町村\n' + sheet.getRange(6, 6).getValue();
  const res = {
    "fulfillmentMessages": [
      {
        "text": {
          "text": [
            text
          ]
        }
      }
    ]
  };
  return res;
}
else if(queryText == "次回以降の案内を希望します。" || queryText == "次回以降の案内を希望しません。")
{
  // sheet.getRange(3, 8).setValue('次回以降の案内を希望を入力します。');
  sheet.getRange(2, 8).setValue('');

  const any = req.queryResult.parameters['any'];
  sheet.getRange(6, 8).setValue(any);
  sheet.getRange(2, 9).setValue('ご連絡事項を入力しますか。');
  // sheet.getRange(3, 8).setValue('');
}
else if(queryText == "連絡事項を入力します。")
{
  sheet.getRange(3, 9).setValue('連絡事項を入力します。');
  sheet.getRange(2, 9).setValue('');

  const text = 'ここまでの入力内容です。\nお子様の氏名（漢字）\n' + sheet.getRange(6, 1).getValue() + '\nお子様の氏名（ふりがな）\n' + sheet.getRange(6, 2).getValue() + '\nお子様の学年（小学、中学）\n' + sheet.getRange(6, 3).getValue() + '\n保護者様の氏名（漢字）\n' + sheet.getRange(6, 4).getValue() + '\n保護者様の氏名（ふりがな）\n' + sheet.getRange(6, 5).getValue()  + '\nお住まいの市区町村\n' + sheet.getRange(6, 6).getValue() + '\n連絡可能な携帯かメール\n' + sheet.getRange(6, 7).getValue() + '\n次回以降の案内について\n' + sheet.getRange(6, 8).getValue();

  const res = {
    "fulfillmentMessages": [
      {
        "text": {
          "text": [
            text
          ]
        }
      }
    ]
  };
  return res;
}
else if(queryText == "OKです。")
{
  sheet.appendRow([sheet.getRange(6, 1).getValue(), sheet.getRange(6, 2).getValue(), sheet.getRange(6, 3).getValue(), sheet.getRange(6, 4).getValue(), sheet.getRange(6, 5).getValue(), sheet.getRange(6, 6).getValue(), sheet.getRange(6, 7).getValue(), sheet.getRange(6, 8).getValue(), sheet.getRange(6, 9).getValue()]);

  sheet.getRange(2, 1).setValue('OKです。');
  sheet.getRange(2,10).setValue('10');
  sheet.getRange(6, 1).setValue('1');
  sheet.getRange(6, 2).setValue('2');
  sheet.getRange(6, 3).setValue('3');
  sheet.getRange(6, 4).setValue('4');
  sheet.getRange(6, 5).setValue('5');
  sheet.getRange(6, 6).setValue('6');
  sheet.getRange(6, 7).setValue('7');
  sheet.getRange(6, 8).setValue('8');
  sheet.getRange(6, 9).setValue('9');
}
else if(sheet.getRange(3, 1).getValue() == "お子様の氏名（漢字）を入力します。")
{
  const any = req.queryResult.parameters['any'];
  sheet.getRange(6, 1).setValue(any);
  sheet.getRange(2, 2).setValue('お子様の氏名（ふりがな）を入力しますか。');
  sheet.getRange(3, 1).setValue(''); 
}
else if(sheet.getRange(3, 2).getValue() == "お子様の氏名（ふりがな）を入力します。")
{
  const any = req.queryResult.parameters['any'];
  sheet.getRange(6, 2).setValue(any);
  sheet.getRange(2, 3).setValue('お子様の学年（小学、中学）を入力しますか。');
  sheet.getRange(3, 2).setValue(''); 
}
else if(sheet.getRange(3, 3).getValue() == "お子様の学年（小学、中学）を入力します。")
{
  const any = req.queryResult.parameters['any'];
  sheet.getRange(6, 3).setValue(any);
  sheet.getRange(2, 4).setValue('保護者の氏名（漢字）を入力しますか。');
  sheet.getRange(3, 3).setValue(''); 
}
else if(sheet.getRange(3, 4).getValue() == "保護者の氏名（漢字）を入力します。")
{
  const any = req.queryResult.parameters['any'];
  sheet.getRange(6, 4).setValue(any);
  sheet.getRange(2, 5).setValue('保護者の氏名（ふりがな）を入力しますか。');
  sheet.getRange(3, 4).setValue(''); 
}
else if(sheet.getRange(3, 5).getValue() == "保護者の氏名（ふりがな）を入力します。")
{
  const any = req.queryResult.parameters['any'];
  sheet.getRange(6, 5).setValue(any);
  sheet.getRange(2, 6).setValue('お住まいの市区町村を入力しますか。');
  sheet.getRange(3, 5).setValue(''); 
}
else if(sheet.getRange(3, 6).getValue() == "住んでいる市区町村を入力します。")
{
  const location = req.queryResult.parameters['location']['city'];
  sheet.getRange(6, 6).setValue(location);
  sheet.getRange(2, 7).setValue('連絡可能な携帯かメールを入力しますか。');
  sheet.getRange(3, 6).setValue(''); 
}
else if(sheet.getRange(3, 7).getValue() == "連絡可能な携帯かメールを入力します。")
{
  const any = String(req.queryResult.parameters['any']);
  sheet.getRange(6, 7).setValue(any);
  sheet.getRange(2, 8).setValue('次回以降の案内の希望を入力しますか。');
  sheet.getRange(3, 7).setValue(''); 
}
else if(sheet.getRange(3, 9).getValue() == "連絡事項を入力します。")
{
  const any = req.queryResult.parameters['any'];
  sheet.getRange(6, 9).setValue(any);
  sheet.getRange(2,10).setValue('OKですか。');
  sheet.getRange(3, 9).setValue(''); 
}
else if(sheet.getRange(3, 1).getValue() == '2人以降も氏名（漢字）を入力します。')
{
  const any = req.queryResult.parameters['any'];
  sheet.getRange(6, 1).setValue(any);
  sheet.getRange(2, 2).setValue('2人以降も氏名（ふりがな）を入力しますか。');
  sheet.getRange(3, 1).setValue('');
}
else if(sheet.getRange(3, 2).getValue() == "2人以降も氏名（ふりがな）を入力します。")
{
  const any = req.queryResult.parameters['any'];
  sheet.getRange(6, 2).setValue(any);
  sheet.getRange(2, 3).setValue('2人以降も学年（小学、中学）を入力しますか。');
  sheet.getRange(3, 2).setValue('');
}
else if(sheet.getRange(3, 3).getValue() == "2人以降も学年（小学、中学）を入力します。")
{
  const any = req.queryResult.parameters['any'];
  sheet.getRange(6, 2).setValue(any);
  sheet.getRange(2,10).setValue('2人以降もOKですか。');
  sheet.getRange(3, 2).setValue('');
}

}