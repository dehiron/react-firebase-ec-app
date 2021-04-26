const functions = require('firebase-functions');
const stripe = require('stripe')(functions.config().stripe.key);
const cors = require('cors')

const sendResponse = (response, statusCode, body) => {
    response.send({
        statusCode,
        headers: {"Access-control-Allow-Origin": "*"}, //cors対策
        body: JSON.stringify(body)
    })
}

// URL
// https://react-firebase-ec-app.web.app

/**
 * req {object} => {email: string, userId: string, paymentMethod: string}
 * の形のreqが渡ってくる
 */


exports.stripeCustomer = functions.https.onRequest((req, res) => {
    const corsHandler = cors({origin: true})

    corsHandler(req, res, () => {
        //POSTメソッドかどうか判定
        if (req.method !== 'POST'){
            sendResponse(res, 405, {error: "Invalid Reuest method"})
        }

        //POSTだった場合
        return stripe.customers.create({
            description: "EC App demo user", //なんの顧客なのかわかる様に
            email: req.body.email,
            //ユニークなデータをメタデータとして持たせることで重複の処理を防ぐ
            metadata: {userId: req.body.userId},
            payment_method: req.body.paymentMethod
        }).then((customer) => {
            sendResponse(res, 200, customer)
        }).catch((error) => {
            sendResponse(res, 500, {error: error})
        })
    })
})