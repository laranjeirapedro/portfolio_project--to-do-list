import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Task from "@/models/taskModel";
import { Types } from "mongoose";

interface Params {
  id: string;
}

export async function PUT(request: NextRequest, context: { params: Params }) {
  const { id } = context.params;  // Agora context.params tem o tipo correto
  const { text, completed } = await request.json();

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { text, completed },
      { new: true }
    );

    if (!updatedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTask);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Error updating task", error: message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  await connectToDatabase();

  const { id } = await context.params;

  try {
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid Task ID" }, { status: 400 });
    }

    await Task.findByIdAndDelete(id);
    return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message: "Error deleting task", error: message }, { status: 500 });
  }
}