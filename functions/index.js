const functions = require('firebase-functions');
const stripe = require('stripe')(functions.config().stripe.key);
const cors = require('cors')

// レスポンスを返すための関数
// 最終的にはどのAPIもサーバーからのレスポンスをこの関数を介してクライアント側にさらにレスポンスを返す
const sendResponse = (response, statusCode, body) => {
    response.send({
        statusCode,
        headers: {"Access-control-Allow-Origin": "*"}, //cors対策
        body: JSON.stringify(body)
    })
}

// URL
// https://react-firebase-ec-app.web.app

/*
 * req {object} => {email: string, userId: string, paymentMethod: string}
 * の形のreqが渡ってくる
 */

exports.stripeCustomer = functions.https.onRequest((req, res) => {
    //別のドメインを超えて処理ができる様になる
    const corsHandler = cors({origin: true})    

    corsHandler(req, res, () => {
        //POSTメソッドかどうか判定
        if (req.method !== 'POST'){
            sendResponse(res, 405, {error: "Invalid Reuest method"})
        }

        //POSTだった場合
        return stripe.customers.create({ //stripeのメソッド
            description: "EC App demo user", //なんの顧客なのかわかる様に
            email: req.body.email,
            //ユニークなデータをメタデータとして持たせることで重複の処理を防ぐ
            metadata: {userId: req.body.userId},
            payment_method: req.body.paymentMethod
        }).then((customer) => { //customerというResponse(react.stripe.js referenceの各APIのRESPONSEに記載されている部分) -> firebase.jsonのエンドポイント作り方にも繋がる
            sendResponse(res, 200, customer)
        }).catch((error) => {
            sendResponse(res, 500, {error: error})
        })
    })
})


exports.retrievePaymentMethod = functions.https.onRequest((req, res) => {
    const corsHandler = cors({origin: true})

    corsHandler(req, res, () => {
        //POSTメソッドかどうか判定
        if (req.method !== 'POST'){
            sendResponse(res, 405, {error: "Invalid Reuest method"})
        }

        return stripe.paymentMethods.retrieve(　//stripeのメソッド
            req.body.paymentMethodId
        ).then((paymentMethod) => { //ここで渡されるのはStripeのレスポンスとして決められている（https://stripe.com/docs/api/payment_methods/retrieve）-> firebase.jsonのエンドポイント作り方にも繋がる
            sendResponse(res, 200, paymentMethod)
        }).catch((error) => {
            sendResponse(res, 500, {error: error})
        })
    })
})

exports.updatePaymentMethod = functions.https.onRequest((req, res) => {
    const corsHandler = cors({origin: true})

    corsHandler(req, res, () => {
        //POSTメソッドかどうか判定
        if (req.method !== 'POST'){
            sendResponse(res, 405, {error: "Invalid Reuest method"})
        }

        return stripe.paymentMethods.detach(//今登録してある情報をまず削除
            //detachの際に必要な引数＝methodId
            req.body.prevPaymentMethodId
        ).then((paymentMethod) => {
            return stripe.paymentMethods.attach(
                req.body.nextPaymentMethodId,
                {customer: req.body.customerId}
            ).then((nextPaymentMethodId) => {
                sendResponse(res, 200, paymentMethod)
            })
        }).catch((error) => {
            sendResponse(res, 500, {error: error})
        })
    })
})

