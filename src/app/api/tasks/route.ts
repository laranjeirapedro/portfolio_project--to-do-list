import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("todoApp");
        const tasks = await db.collection("tasks").find().toArray();

        return NextResponse.json({ tasks });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const client = await clientPromise;
        const db = client.db();
        const body = await req.json();

        const newTask = {
            text: body.text,
            completed: false,
            createdAt: new Date(),
        }

        const result = await db.collection("tasks").insertOne(newTask);
        return NextResponse.json({ insertedId: result.insertedId });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}