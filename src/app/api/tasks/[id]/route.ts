import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Task from "@/models/taskModel";
import { Types } from "mongoose";

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = context.params;
    const body = await req.json();

    await connectToDatabase();

    const updatedFields: any = { ...body };
    if (body.completed === true) {
      updatedFields.completedAt = new Date();
    } else {
      updatedFields.completedAt = null;
    }

    const updatedTask = await Task.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    if (!updatedTask) {
      return new Response(JSON.stringify({ error: "Task not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(updatedTask), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
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