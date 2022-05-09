import { doc, getDoc } from 'firebase/firestore';
import db from '../../../firebase';
import { toast } from '../../../utils/helpers';

export const userAPI = {
    findById: async uid => {
        const docRef = doc(db, "users", uid);
        const user = await getDoc(docRef);

        console.log(uid);

        if (!user.exists()) {
            toast({msg: 'User Not Found!'})
            throw new Error("User Not Found!")
        }

        return user.data()
    }
}