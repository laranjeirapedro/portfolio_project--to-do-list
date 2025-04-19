import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Task from "@/models/taskModel";
import { Types } from "mongoose";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {

  await connectToDatabase();

  const { id } = params;
  const { text, completed } = await req.json();

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { text, completed },
      { new: true }
    );

    if (!updatedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating task", error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();

  try {
    const { id } = params;

    // Verifica se o ID é válido
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid Task ID" }, { status: 400 });
    }

    await Task.findByIdAndDelete(id);
    return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    return NextResponse.json({ message: "Error deleting task" }, { status: 500 });
  }
}