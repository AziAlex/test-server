import {NextRequest, NextResponse} from "next/server";
import db from "../../data.json";
import {IColumns, IDataBase} from "@/app/api/types";
import {promises as fs} from "fs";

export async function GET(
  request: NextRequest,
  {params}: { params: { id: string } }
) {

  return NextResponse.json(db.tableColumns[+params.id]);
}

export async function PUT(request: Request) {
  const table: IColumns = await request.json();

  if (!table) {
    return NextResponse.json({error: "Put request failed"});
  }

  const data = await fs.readFile("src/app/api/data.json", "utf8",);
  const newData: IDataBase = JSON.parse(data)

  newData.tableColumns[+table.id] = table

  try {
    await fs.writeFile("src/app/api/data.json", JSON.stringify(newData));
  } catch (error: any) {
    return NextResponse.json(error.message);
  }

  return NextResponse.json({message: "Post request succeeded"});
}

export async function DELETE(request: Request, {params}: { params: { id: string } }) {

  const data = await fs.readFile("src/app/api/data.json", "utf8",);
  const newData: IDataBase = JSON.parse(data)

  newData.tableColumns.splice(+params.id, 1)

  try {
    await fs.writeFile("src/app/api/data.json", JSON.stringify(newData));
  } catch (error: any) {
    return NextResponse.json(error.message);
  }

  return NextResponse.json({message: "Post request succeeded"});
}