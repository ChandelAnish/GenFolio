import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { ref, get, set } from "firebase/database";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const username = decodeURIComponent((await params).username);
  const safeUsername = username.replace(/\./g, "%2E").replace(/@/g, "%40");

  console.log("safeUsername", safeUsername);
  console.log("safeUsername decoded", decodeURIComponent(safeUsername));
  
  const forwardedFor = req.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0] || "unknown";

  if (ip === "unknown") {
    return NextResponse.json({ message: "IP not found" }, { status: 400 });
  }

  const formattedIP = ip.replace(/\./g, "-"); // This replaces all dots . in the IP address with hyphens -. Firebase Realtime Database does not allow dots (periods) in its keys.
  const ipRef = ref(db, `${safeUsername}/visits/ips/${formattedIP}`);

  const snapshot = await get(ipRef);
  if (!snapshot.exists()) {
    await set(ipRef, true); // store it only once
  }

  const allIPsSnapshot = await get(ref(db, `${safeUsername}/visits/ips`));
  const count = allIPsSnapshot.exists()
    ? Object.keys(allIPsSnapshot.val()).length
    : 0;

  return NextResponse.json({ count });
}
