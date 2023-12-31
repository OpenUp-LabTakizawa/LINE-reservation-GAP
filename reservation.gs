// Googleスプレッドシート
const SS_ID = "SS_ID";
const SS = SpreadsheetApp.openById(SS_ID);

// Sheet名を一覧取得
const originSheet = SS.getSheetByName("シート名登録");
const lineName = originSheet.getRange("B3").getValue();
const alertName = originSheet.getRange("C3").getValue();
const quiryName = originSheet.getRange("D3").getValue();

const sheetLine = SS.getSheetByName(lineName);
const sheetAlert = SS.getSheetByName(alertName);
const sheetQuiry = SS.getSheetByName(quiryName);

/**
 * POSTメソッド
 */
function doPost(e) {
  const data = e.postData.getDataAsString();
  const req = JSON.parse(data);

  // reqの中身から
  // 抽選応募受付(reservation-followup)か
  // 次回開催お知らせ希望(nexteventalert-followup)かを判断
  const outputs = req.queryResult.outputContexts;

  // 抽選応募受付(reservation-followup)の時
  if (outputs.find(output => output.name.includes("reservation-followup")) != undefined) {
    const queryParameters = req.queryResult["outputContexts"].find(output => output.name.includes("reservation-followup")).parameters;
    const date = new Date();
    const PrivacyPolicy = queryParameters.PrivacyPolicy;
    const EventCondition = queryParameters.EventCondition;
    const ChildCount = queryParameters.ChildCount;
    const ChildName = queryParameters.ChildName;
    const ChildGrade = queryParameters.ChildGrade;
    const ParentName = queryParameters.ParentName;
    const Mail = queryParameters.Mail;
    const NextEvent = queryParameters.NextEvent;
    const Other = queryParameters.Other;

    // 「2023/10_LINE」のスプレッドシートに吐き出す
    sheetLine.appendRow([
      "",
      date,
      PrivacyPolicy,
      EventCondition,
      ChildCount,
      ChildName,
      ChildGrade,
      ParentName,
      Mail,
      NextEvent,
      Other
    ])

    if (NextEvent == "希望する") {
      // 「2023/10_LINE_次回開催お知らせ希望」のスプレッドシートに吐き出す
      sheetAlert.appendRow([
        "",
        date,
        PrivacyPolicy,
        ParentName,
        Mail,
        NextEvent
      ])
    }

    // 次回開催お知らせ希望(nexteventalert-followup)の時
  } else if (outputs.find(output => output.name.includes("nexteventalert-followup")) != undefined) {
    const queryParameters = req.queryResult["outputContexts"].find(output => output.name.includes("nexteventalert-followup")).parameters;
    const date = new Date();
    const PrivacyPolicy = queryParameters.PrivacyPolicy;
    const AlertParentName = queryParameters.AlertParentName;
    const AlertMail = queryParameters.AlertMail;
    const NextEvent = "希望する";

    // スプレッドシートに吐き出す
    sheetAlert.appendRow([
      "",
      date,
      PrivacyPolicy,
      AlertParentName,
      AlertMail,
      NextEvent
    ])
    // お問い合わせ(300_contact-quiry-followup)の時
  } else if (outputs.find(output => output.name.includes("300_contact-quiry-followup")) != undefined) {
    const queryParameters = req.queryResult["outputContexts"].find(output => output.name.includes("followup")).parameters;
    const date = new Date();
    const inquiry = queryParameters.any;

    sheetQuiry.appendRow([
      date,
      inquiry
    ])

    // 未読防止の LINE への通知設定
    const url = "URL"


    const yyyymmdd = new Intl.DateTimeFormat(
      "ja-JA",
      {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }
    )

    const data = {
      "value1": yyyymmdd.format(date),
      "value2": inquiry,
    }
    const headers = {
      "Content-Type": "application/json"
    }

    const options = {
      'method': 'post',
      'headers': headers,
      'payload': JSON.stringify(data)
    }

    UrlFetchApp.fetch(url, options)
  } else {
  }

  const res = {

  }

  return ContentService.createTextOutput(JSON.stringify(res));
}
