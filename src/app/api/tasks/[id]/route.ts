import { connectToDatabase } from "@/lib/mongodb";
import Task from "@/models/taskModel";
import { NextRequest } from "next/server";
import { ObjectId } from "mongodb";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  console.log("params:", params);
  try {
    const id = params.id;
    const body = await req.json();

    await connectToDatabase();

    const result = await Task.findByIdAndUpdate(id, body, { new: true });

    if (!result) {
      return new Response(JSON.stringify({ error: "Task not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (err) {
    console.error("PUT error:", err);
    return new Response(JSON.stringify({ error: "Failed to update task" }), { status: 500 });
  }
}