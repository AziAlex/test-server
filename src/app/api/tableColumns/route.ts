import {NextResponse} from "next/server";
import {IColumns, IDataBase} from "@/app/api/types";
import {promises as fs} from 'fs';

export async function POST(request: Request) {
  const table: IColumns = await request.json();

  if (!table) {
    return NextResponse.json({error: "Post request failed"});
  }

  const data = await fs.readFile("src/app/api/data.json", "utf8",);
  const newData: IDataBase = JSON.parse(data)

  newData.tableColumns.push(table)

  try {
    await fs.writeFile("src/app/api/data.json", JSON.stringify(newData));
  } catch (error: any) {
    return NextResponse.json(error.message);
  }

  return NextResponse.json({message: "Post request succeeded"});
}