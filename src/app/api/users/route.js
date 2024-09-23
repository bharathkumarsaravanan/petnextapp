import { NextResponse } from "next/server";

let users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
    { id: 4, name: "David" },
    { id: 5, name: "Eve" },
    { id: 6, name: "Frank" },
]

export async function GET(request) {
  return NextResponse.json(users);
}

export async function POST(request, response) {
  const user = await request.json();
  users.push(user);
  return NextResponse.json({ success: true, users: users });
};

export async function DELETE(request, response) {
  const { id } = await request.json();
  users = users.filter((user) => user.id !== id);
  return NextResponse.json({ success: true, users: users });
}