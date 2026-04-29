import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { PortfolioItem } from "@/models/PortfolioItem";

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { message: "Seed only works in development" },
      { status: 403 }
    );
  }

  try {
    await connectDB();

    // Create admin user
    const existingAdmin = await User.findOne({ email: "admin@techman.dev" });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("admin123", 12);
      await User.create({
        name: "Admin User",
        email: "admin@techman.dev",
        password: hashedPassword,
        role: "admin",
      });
    }

    // Create demo user
    const existingUser = await User.findOne({ email: "user@demo.com" });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash("user123", 12);
      await User.create({
        name: "Demo User",
        email: "user@demo.com",
        password: hashedPassword,
        role: "user",
      });
    }

    // Create portfolio items
    const count = await PortfolioItem.countDocuments();
    if (count === 0) {
      const items = [
        {
          title: "Minimal E-Commerce Platform",
          category: "Web Development",
          imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80",
          description: "A clean, modern e-commerce experience built with Next.js.",
        },
        {
          title: "Fitness Tracker App",
          category: "Mobile App",
          imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&q=80",
          description: "Cross-platform fitness tracking with real-time analytics.",
        },
        {
          title: "Luxury Brand Identity",
          category: "Graphic Design",
          imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop&q=80",
          description: "Complete brand identity system for a luxury fashion label.",
        },
        {
          title: "Corporate Documentary",
          category: "Video Editing",
          imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop&q=80",
          description: "A cinematic corporate documentary for a Fortune 500 company.",
        },
        {
          title: "SaaS Analytics Dashboard",
          category: "Web Development",
          imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80",
          description: "Real-time analytics dashboard with data visualization.",
        },
        {
          title: "Social Media Platform",
          category: "Mobile App",
          imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&q=80",
          description: "Next-gen social platform with real-time messaging.",
        },
        {
          title: "Architectural Visualization",
          category: "Graphic Design",
          imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop&q=80",
          description: "Photorealistic 3D architectural renders for a design firm.",
        },
        {
          title: "Product Launch Film",
          category: "Video Editing",
          imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop&q=80",
          description: "4K product launch film with cinematic color grading.",
        },
      ];

      await PortfolioItem.insertMany(items);
    }

    return NextResponse.json({ message: "Database seeded successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Seed failed", error: error.message },
      { status: 500 }
    );
  }
}
