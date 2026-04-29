import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Project } from "@/models/Project";

// GET: user gets their own projects, admin gets all
export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const isAdmin = (session.user as any).role === "admin";
    const userEmail = (session.user as any).email;

    let projects;
    if (isAdmin) {
      projects = await Project.find().sort({ createdAt: -1 }).lean();
    } else {
      projects = await Project.find({ userEmail }).sort({ createdAt: -1 }).lean();
    }

    return NextResponse.json(projects);
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST: create a new project request
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, service, description, fileUrl, userEmail } = body;

    if (!name || !email || !service || !description || !userEmail) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    const project = await Project.create({
      name,
      email,
      service,
      description,
      fileUrl: fileUrl || "",
      userEmail,
    });

    return NextResponse.json(project, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Failed to create project" },
      { status: 500 }
    );
  }
}

// PUT: update project status (admin only)
export async function PUT(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const body = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "Project ID required" },
        { status: 400 }
      );
    }

    await connectDB();

    const updated = await Project.findByIdAndUpdate(
      id,
      { status: body.status },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { message: "Failed to update project" },
      { status: 500 }
    );
  }
}
