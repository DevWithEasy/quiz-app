import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../../database/initDatabase";

export default async function handler(req,res){
    try {
        const categoryRef= doc(db,'qna_answers',req.query.id);
        const data = await getDoc(categoryRef);
        if(data.exists()){
            const q = query(collection(db,'qna_comments'),where("ansId", "==", req.query.id));
            const commentData = await getDocs(q)
            let comments =[]
            commentData.forEach(doc=> comments.push(doc.data()))
            res.status(200).json({
                success : true,
                status : 200,
                data : comments
            })
        }else{
            res.status(404).json({
                success : false,
                status : 404,
                message : 'No category with that name exists'
            })
        }
    } catch (error) {
        res.status(500).json({
            success : false,
            status : 500,
            message : error.message
        })
    }
}