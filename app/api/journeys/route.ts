import { NextResponse } from "next/server";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET() {
  try {
    const q = query(collection(db, "journeys"), orderBy("date_started", "asc"));

    const snapshot = await getDocs(q);

    const teams = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json(teams);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch journeys", error: String(error) },
      { status: 500 },
    );
  }
}
