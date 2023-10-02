import {NextResponse} from "next/server";
import db from "../data.json";

export async function GET() {
  return NextResponse.json(db.tables)
}