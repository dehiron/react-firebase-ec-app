import { db, FirebaseTimestamp } from "../../firebase";
import {push} from 'connected-react-router';

const productsRef = db.collection("products")

const saveProduct = (name, description, category, gender, price, images) => {
    return async (dispatch) => {
        const timestamp = FirebaseTimestamp.now()

        const data = {
            category: category,
            description: description,
            gender: gender,
            images: images,
            name: name,
            price: parseInt(price, 10),
            updated_at: timestamp
        }

        
        const ref = productsRef.doc();
        const id = ref.id;
        data.id = id;
        data.created_at = timestamp; //新規作成の時のみ使うやつ
        // ↑
        // 事前に自動裁判されたIDを取得
        // ↓
        return productsRef.doc(id).set(data)　//新規作成の場合はmarge:trueいらない
            .then(()=>{
                dispatch(push("/"))
            }).catch((error) => {
                throw new Error(error)
            })

    }
}

export {saveProduct};