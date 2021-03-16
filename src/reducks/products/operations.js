import { db, FirebaseTimestamp } from "../../firebase";
import {push} from 'connected-react-router';
import {fetchProductsAction} from './actions';

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

export {saveProduct, fetchProducts};