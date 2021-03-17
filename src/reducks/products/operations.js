import { db, FirebaseTimestamp } from "../../firebase";
import {push} from 'connected-react-router';
import {fetchProductsAction} from './actions';
import {deleteProductAction} from './actions';

const productsRef = db.collection("products")

const fetchProducts = () => {
    return async (dispatch) => {
        productsRef.orderBy("updated_at", "desc").get()
            .then(snapshots => {
                const productList = []
                snapshots.forEach(snapshot => {
                    const product = snapshot.data();
                    productList.push(product)
                })
                dispatch(fetchProductsAction(productList))
            })
    }
}

const orderProduct = (productsInCart, amount) => {
    return async (dispatch, getState) => {
        const uid = getState().users.uid;
        const userRef = db.collection("users").doc(uid);
        const timestamp = FirebaseTimestamp.now();

        let products = [];
        let soldOutProducts = []; //在庫がある商品だけを購入する実装のやり方
        
        let batch = db.batch(); //バグ対処用の修正

        for (const product of productsInCart) {
            const snapshot = await productsRef.doc(product.productId).get()
            const sizes = snapshot.data().sizes;
            // console.log("1",sizes)

            const updatedSizes = sizes.map(size => {
                if (size.size === product.size) {
                    if (size.quantity === 0){
                        soldOutProducts.push(product.name);
                        return size
                    }
                    return {
                        size: size.size,
                        quantity: size.quantity - 1 
                    }
                } else {
                    return size
                }
            })
            

            products.push({
                id: product.productId, //注文履歴用の商品データ
                images: product.images,
                name: product.name,
                price: product.price,
                size: product.size,
            });

            // console.log("2",product.size);
            // console.log("3",updatedSizes);
            batch.update(productsRef.doc(product.productId), {"sizes": updatedSizes})
            batch.delete(userRef.collection("cart").doc(product.cartId))
            batch.commit(); //バグ対処用の修正
            batch = db.batch(); //バグ対処用の修正
        }


        //在庫2点の商品を3回クリックしてカート内に3点の状態で注文すると、
        //エラーは出るけど在庫分の2点は注文が完了する状態になっている。
        //この場合ロールバックできてないのではないか？
        if (soldOutProducts.length > 0 ) {//バッチの処理内でエラーメッセージだして購入は発生しない
            const errorMessage = (soldOutProducts.lentgh > 1) ? soldOutProducts.join('と') : soldOutProducts[0];
            alert("申し訳ありません。" + errorMessage + "が在庫切れとなったため、注文処理を中断しました。")
            return false
        } else {
            batch.commit()
                .then(() => {
                    const orderRef = userRef.collection("orders").doc(); 
                    //ordersというコレクションに新しくドキュメントを作るリファレンスを作ってる
                    const date = timestamp.toDate();
                    const shippingDate = FirebaseTimestamp.fromDate(new Date(date.setDate(date.getDate() +3)));

                    const history = {
                        amount: amount,
                        created_at: timestamp,
                        id: orderRef.id,
                        products: products,
                        shipping_date: shippingDate,
                        updated_at: timestamp
                    }
                    orderRef.set(history);
                    dispatch(push("/order/complete"))


                }).catch(()=>{
                    alert("注文処理に失敗しました。通信環境を確認し、もう一度お試しください。")
                    return false
                })
        }
    }
}

const saveProduct = (id, name, description, category, gender, price, images, sizes) => {
    return async (dispatch) => {
        const timestamp = FirebaseTimestamp.now()

        const data = {
            category: category,
            description: description,
            gender: gender,
            images: images,
            name: name,
            price: parseInt(price, 10),
            sizes: sizes,
            updated_at: timestamp
        }

        if (id === ""){
            const ref = productsRef.doc();
            id = ref.id;
            data.id = id;
            data.created_at = timestamp; //新規作成の時のみ使うやつ
        }
        
        return productsRef.doc(id).set(data, {merge: true})　//{merge:true}をつけることによって修正された部分だけ更新される
            .then(()=>{
                dispatch(push("/"))
            }).catch((error) => {
                throw new Error(error)
            })

    }
}

const deleteProduct = (id) => {
    return async (dispatch, getState) => {
        productsRef.doc(id).delete() //DBから削除
            .then(()=>{ //reduxのストアの情報も更新
                const prevProducts = getState().products.list;
                const nextProducts = prevProducts.filter(product => product.id !== id);
                dispatch(deleteProductAction(nextProducts));
            })
    }
}



export {saveProduct, fetchProducts, deleteProduct, orderProduct};