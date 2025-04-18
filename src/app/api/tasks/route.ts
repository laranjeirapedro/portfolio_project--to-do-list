import { NextResponse, NextRequest } from "next/server";
import clientPromise from "@/lib/mongodb";
import { connectToDatabase } from "@/lib/mongodb";
import Task from "@/models/taskModel";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const tasks = await db.collection("tasks").find({}).toArray();
    return NextResponse.json({ tasks });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await connectToDatabase();

    const newTask = new Task(body);
    const savedTask = await newTask.save();

    return new Response(JSON.stringify(savedTask), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating task:", error);
    return new Response("Failed to create task", { status: 500 });
  }
}