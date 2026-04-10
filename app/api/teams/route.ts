import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, "teams"));

    const teams = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(teams);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch teams" },
      { status: 500 },
    );
  }
}
