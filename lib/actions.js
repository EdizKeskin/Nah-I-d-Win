"use server";
import { revalidatePath } from "next/cache";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage, db } from "@/configs/firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  getDocs,
  startAfter,
  limit,
  getDoc,
} from "firebase/firestore";

export const createGojos = async (formData) => {
  const title = formData.get("title");
  const image = formData.get("image");

  if (!title || !image) {
    return { message: "title and image are required" };
  }

  const storageRef = ref(storage, `gojos/${image.name}`);

  try {
    await uploadBytes(storageRef, image);
    const imageUrl = await getDownloadURL(storageRef);
    const gojosRef = collection(db, "gojos");
    const newGojo = await addDoc(gojosRef, {
      title,
      imageUrl,
    });

    revalidatePath("/");

    return newGojo.id;
  } catch (error) {
    console.log(error);
    return { message: "error creating gojo" };
  }
};

export const deleteGojo = async (id) => {
  const gojoId = id.get("id");
  try {
    await deleteDoc(doc(db, "gojos", gojoId));

    revalidatePath("/");

    return "gojo deleted";
  } catch (error) {
    return { message: "error deleting gojo" };
  }
};

export const getRandomImage = async () => {
  const storageRef = ref(storage, "gojos");
  const listResult = await listAll(storageRef);
  const images = listResult.items;
  const randomIndex = Math.floor(Math.random() * images.length);
  const imageUrl = await getDownloadURL(images[randomIndex]);

  return imageUrl;
};

export const getPaginatedDocs = async ({ lastDocId }) => {
  const collectionRef = collection(db, "gojos");
  let status = "pending";
  let error = null;
  let docs = [];
  let newLastDocId = null;
  let loadNoMore = false;
  let q;

  try {
    if (lastDocId) {
      const lastDoc = await getDoc(doc(db, "gojos", lastDocId));
      if (!lastDoc.exists()) {
        throw new Error("Last document not found");
      }
      q = query(
        collectionRef,
        orderBy("title", "desc"),
        startAfter(lastDoc),
        limit(9)
      );
    } else {
      q = query(collectionRef, orderBy("title", "desc"), limit(9));
    }

    const snapshots = await getDocs(q);

    if (!snapshots.empty) {
      newLastDocId = snapshots.docs[snapshots.docs.length - 1].id;
      docs = snapshots.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (snapshots.docs.length < 9) {
        loadNoMore = true;
      }
    } else {
      loadNoMore = true;
    }

    status = "succeeded";
  } catch (err) {
    status = "failed";
    error = err.message;
  }

  return {
    status,
    error,
    docs,
    lastDocId: newLastDocId,
    loadNoMore,
  };
};
